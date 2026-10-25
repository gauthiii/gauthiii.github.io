"""Batch-2 in-between frames → clean, registered cut-outs on their base pose's canvas.

GPT delivered media/story-src/cast2/*.png on green screen, redrawn (not pixel-stable) and not registered. For each frame:
  1. key: tolerant chroma key on green-dominance + green-spill removal (the character has no green in him)
  2. register: scale + translate search maximising silhouette IoU with the base pose (coarse ¼-res, then full-res refine)
  3. graft (blink / smile / wink: face only; head turn: head + neck): paste only that region, feathered, onto the
     ORIGINAL base pose, so the body stays pixel-identical while the face animates
Crowd frames are normalised to one subject height and floor line instead.
Writes media/story-src/cast2-clean/<name>.png and a review sheet.
usage: python prep_cast2.py <review_dir>   (needs pillow, numpy, scipy)
"""
import json, os, sys
import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage, signal

ROOT = "/Users/gauthamsmacbook/Apps/React Apps/gauthiii.github.io/media/story-src/"
SRC, BASE, OUT = ROOT + "cast2/", ROOT + "cast/", ROOT + "cast2-clean/"
REVIEW = sys.argv[1]
os.makedirs(OUT, exist_ok=True); os.makedirs(REVIEW, exist_ok=True)

FRAMES = {   # name: (base pose, mode)
    "blink-1": ("hello-neutral", "face"), "blink-2": ("hello-neutral", "face"),
    "smile-1": ("hello-neutral", "face"), "smile-2": ("hello-neutral", "face"),
    "turn-1": ("hello-neutral", "head"), "turn-2": ("hello-neutral", "head"),
    "walk-1": ("era-2023", "full"), "walk-2": ("era-2023", "full"), "walk-3": ("era-2023", "full"), "walk-4": ("era-2023", "full"),
    "laptop-1": ("laptop-lift", "full"), "laptop-2": ("laptop-open", "full"), "laptop-3": ("laptop-open", "full"),
    "sweep-1": ("unbothered", "full"), "sweep-2": ("push-away", "full"),
    "wink-0": ("wink", "face"), "wink-1": ("wink", "face"),
}


def key(path):
    a = np.asarray(Image.open(path).convert("RGB")).astype(np.float32)
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    greenness = g - np.maximum(r, b)                      # background ≈ 215, subject ≤ ~30
    alpha = np.clip((110.0 - greenness) / 70.0, 0, 1)     # opaque below 40, clear above 110
    alpha = ndimage.binary_fill_holes(alpha > 0.5) * 1.0 * alpha + (alpha > 0.5) * 0   # keep soft edge, fill interior holes
    hard = ndimage.binary_erosion(alpha > 0.5, iterations=1)
    alpha = np.maximum(alpha * (ndimage.binary_dilation(hard, iterations=2)), hard * 1.0)
    alpha = ndimage.gaussian_filter(alpha, 0.6)
    g2 = np.minimum(g, np.maximum(r, b))                  # despill: no channel lets green exceed red/blue
    rgb = np.stack([r, g2, b], -1)
    return np.dstack([rgb, alpha * 255]).clip(0, 255).astype(np.uint8)


def load_base(name):
    return np.asarray(Image.open(BASE + name + ".png").convert("RGBA"))


def place(rgba, s, dx, dy, shape):
    """scale an RGBA frame by s and paste its top-left at (dx, dy) on a canvas of `shape`"""
    im = Image.fromarray(rgba)
    im = im.resize((round(im.width * s), round(im.height * s)), Image.LANCZOS)
    canvas = Image.new("RGBA", (shape[1], shape[0]), (0, 0, 0, 0))
    canvas.alpha_composite(im, (int(dx), int(dy))) if dx >= 0 and dy >= 0 else canvas.paste(im, (int(dx), int(dy)), im)
    return np.asarray(canvas)


def iou(A, B):
    inter = np.logical_and(A, B).sum(); return inter / max(1, np.logical_or(A, B).sum())


# GPT drew every hello-neutral edit at the same reduced size (blink/smile all register at 1.08); the head-turn search
# drifts when the hair silhouette changes, so pin it to that scale and search translation only
FIXED_SCALE = {"turn-1": 1.08, "turn-2": 1.08}


def register(frame, base, region=None, scales=None):
    """best (s, dx, dy) mapping frame → base canvas. region: optional row slice (in base coords) to weight the head."""
    A = base[..., 3] > 128
    F = frame[..., 3] > 128
    if region is not None:
        A = A.copy(); A[region[1]:] = False
    q = 4
    Aq = A[::q, ::q].astype(np.float32)
    best = (-1, 1, 0, 0)
    for s in (scales if scales is not None else np.arange(0.86, 1.15, 0.01)):
        Fq = np.asarray(Image.fromarray((F * 255).astype(np.uint8)).resize((max(1, round(F.shape[1] * s / q)), max(1, round(F.shape[0] * s / q))), Image.NEAREST)) > 127
        if region is not None:
            Fq = Fq.copy(); Fq[int(region[1] / q * 1.15):] = False   # compare head band to head band (allow drift)
        corr = signal.fftconvolve(Aq, Fq[::-1, ::-1].astype(np.float32), mode="full")
        k = np.unravel_index(np.argmax(corr), corr.shape)
        dy, dx = k[0] - (Fq.shape[0] - 1), k[1] - (Fq.shape[1] - 1)
        inter = corr[k]; score = inter / (Aq.sum() + Fq.sum() - inter)
        if score > best[0]: best = (score, s, dx * q, dy * q)
    _, s, dx, dy = best
    # full-res refine of the translation (±4 px)
    Fs = np.asarray(Image.fromarray((F * 255).astype(np.uint8)).resize((round(F.shape[1] * s), round(F.shape[0] * s)), Image.NEAREST)) > 127
    top = (-1, dx, dy)
    for ddy in range(-4, 5):
        for ddx in range(-4, 5):
            C = np.zeros_like(A)
            y0, x0 = dy + ddy, dx + ddx
            ys, xs = max(0, y0), max(0, x0)
            ye, xe = min(A.shape[0], y0 + Fs.shape[0]), min(A.shape[1], x0 + Fs.shape[1])
            if ye <= ys or xe <= xs: continue
            C[ys:ye, xs:xe] = Fs[ys - y0:ye - y0, xs - x0:xe - x0]
            if region is not None: C[region[1]:] = False
            sc = iou(A, C)
            if sc > top[0]: top = (sc, dx + ddx, dy + ddy)
    return s, top[1], top[2], top[0]


def face_mask(base, frac_top=0.36, pad=0.12, feather=10):
    """feathered ellipse over the face: skin pixels in the head band of the base pose"""
    a = base[..., 3] > 128
    ys, xs = np.nonzero(a); top, bot = ys.min(), ys.max(); H = bot - top
    r, g, b = [base[..., i].astype(int) for i in range(3)]
    skin = a & (r > 110) & (r > g) & (g > b) & (r - b > 40)
    skin[: top] = False; skin[top + int(H * frac_top):] = False
    sy, sx = np.nonzero(skin)
    y0, y1, x0, x1 = sy.min(), sy.max(), sx.min(), sx.max()
    cy, cx, ry, rx = (y0 + y1) / 2, (x0 + x1) / 2, (y1 - y0) / 2 * (1 + pad), (x1 - x0) / 2 * (1 + pad)
    Y, X = np.ogrid[: base.shape[0], : base.shape[1]]
    m = (((Y - cy) / ry) ** 2 + ((X - cx) / rx) ** 2 <= 1).astype(np.float32)
    return ndimage.gaussian_filter(m, feather), (int(y0), int(y1), int(x0), int(x1))


def head_mask(base, frac=0.43, feather=26):
    """head + neck band (everything above ~43% of the figure), feathered across the shoulders"""
    a = base[..., 3] > 128
    ys, _ = np.nonzero(a); top, bot = ys.min(), ys.max()
    m = np.zeros(base.shape[:2], np.float32); m[: top + int((bot - top) * frac)] = 1
    return ndimage.gaussian_filter(m, feather)


def graft(base, frame_reg, m):
    m = m[..., None]
    ba, fa = base[..., 3:4] / 255.0, frame_reg[..., 3:4] / 255.0
    a = ba * (1 - m) + fa * m
    rgb = (base[..., :3] * ba * (1 - m) + frame_reg[..., :3] * fa * m) / np.maximum(a, 1e-4)
    return np.dstack([rgb, a * 255]).clip(0, 255).astype(np.uint8)


report = {}
for name, (bname, mode) in FRAMES.items():
    base = load_base(bname)
    fr = key(SRC + name + ".png")
    head_rows = None
    if mode in ("face", "head"):
        ys = np.nonzero(base[..., 3] > 128)[0]
        head_rows = (0, ys.min() + int((ys.max() - ys.min()) * 0.45))
    s, dx, dy, score = register(fr, base, head_rows, [FIXED_SCALE[name]] if name in FIXED_SCALE else None)
    reg = place(fr, s, dx, dy, base.shape)
    if mode == "face":
        m, box = face_mask(base, 0.5 if bname == "wink" else 0.36)
        out = graft(base, reg, m)
    elif mode == "head":
        out = graft(base, reg, head_mask(base))
    else:
        out = reg
    Image.fromarray(out).save(OUT + name + ".png")
    report[name] = {"base": bname, "mode": mode, "scale": round(float(s), 3), "dx": int(dx), "dy": int(dy), "iou": round(float(score), 3)}
    print(f"{name:9s} base={bname:14s} {mode:4s} s={s:.2f} dx={dx:5d} dy={dy:5d} iou={score:.3f}")

# crowd: one subject height and one floor line (bottom-centre anchor), landscape canvas
for k in (1, 2):
    fr = key(SRC + f"crowd-me-{k}.png")
    a = fr[..., 3] > 128; ys, xs = np.nonzero(a)
    crop = Image.fromarray(fr).crop((xs.min(), ys.min(), xs.max() + 1, ys.max() + 1))
    H = 600   # normalised subject height (px) in the saved file; placement in the film sets the on-screen size
    crop = crop.resize((round(crop.width * H / crop.height), H), Image.LANCZOS)
    canvas = Image.new("RGBA", (420, H + 20), (0, 0, 0, 0))
    canvas.alpha_composite(crop, ((420 - crop.width) // 2, 20))
    canvas.save(OUT + f"crowd-me-{k}.png")
    report[f"crowd-me-{k}"] = {"mode": "crowd", "subject_h": H, "src_h": int(ys.max() - ys.min())}
    print(f"crowd-me-{k}: source subject {ys.max() - ys.min()}px → normalised {H}px, bottom-centre anchored")

json.dump(report, open(REVIEW + "/prep_report.json", "w"), indent=1)
# for encode_story.py: which base pose each frame stacks on (crowd frames trim on their own)
json.dump({n: v.get("base") for n, v in report.items()}, open(OUT + "frames.json", "w"), indent=1)
