"""Measure in-world surfaces on the story plates (screens, certificate papers, box labels, crate fronts)
and write fractional rects + corner quads to <outdir>/surfaces.json (input for encode_story.py), plus debug overlays.
usage: python measure.py <outdir> ; python encode_story.py <outdir>/surfaces.json  (needs pillow, numpy, scipy)"""
import json, sys
import numpy as np
from PIL import Image, ImageDraw
from scipy import ndimage

ROOT = "/Users/gauthamsmacbook/Apps/React Apps/gauthiii.github.io"
SRC = ROOT + "/media/story-src/plates/"
DBG = sys.argv[1]

def load(name):
    im = Image.open(SRC + name).convert("RGB")
    return im, np.asarray(im).astype(np.float32)

def comps(mask, expect, min_frac, fill_min=0.7, open_iter=2, close_iter=0):
    m = mask
    if close_iter: m = ndimage.binary_closing(m, iterations=close_iter)
    if open_iter: m = ndimage.binary_opening(m, iterations=open_iter)
    m = ndimage.binary_fill_holes(m)
    lab, n = ndimage.label(m)
    H, W = m.shape
    out = []
    for i, sl in enumerate(ndimage.find_objects(lab), 1):
        ys, xs = sl
        h, w = ys.stop - ys.start, xs.stop - xs.start
        area = (lab[sl] == i).sum()
        if area < min_frac * H * W or area / (h * w) < fill_min: continue
        py, px = np.nonzero(lab == i)
        s, d = px + py, px - py
        quad = [(px[s.argmin()], py[s.argmin()]), (px[d.argmax()], py[d.argmax()]),
                (px[s.argmax()], py[s.argmax()]), (px[d.argmin()], py[d.argmin()])]   # tl, tr, br, bl
        out.append({"rect": [xs.start / W, ys.start / H, w / W, h / H],
                    "quad": [[round(x / W, 4), round(y / H, 4)] for x, y in quad], "area": int(area)})
    out.sort(key=lambda r: -r["area"])
    out = out[:expect]
    # reading order: rows (by centre y, tolerance 6% of height), then x
    out.sort(key=lambda r: (round((r["rect"][1] + r["rect"][3] / 2) / 0.06), r["rect"][0]))
    for r in out:
        r["rect"] = [round(v, 4) for v in r["rect"]]; del r["area"]
    return out

def lum(a): return 0.2126 * a[..., 0] + 0.7152 * a[..., 1] + 0.0722 * a[..., 2]
def sat(a): mx, mn = a.max(-1), a.min(-1); return (mx - mn) / (mx + 1)

JOBS = {
    # dark, unsaturated screen glass
    "screens": (["studio-ots", "monitorwall"], lambda a: a.max(-1) < 22, 0.004, 0.8),
    # cream certificate paper
    "papers": (["certwall"], lambda a: (lum(a) > 150) & (sat(a) < 0.45), 0.002, 0.75),
    # white box labels
    "labels": (["archiveshelf"], lambda a: (lum(a) > 90) & (a[..., 2] > 0.6 * a[..., 0]), 0.0015, 0.75),
    # wooden crate fronts (warm mid tones)
    "crates": (["shelves"], lambda a: (a[..., 0] > 85) & (a[..., 0] > a[..., 2] * 1.25) & (lum(a) > 55), 0.008, 0.6),
}
EXPECT = {"studio-ots": 1, "monitorwall": 5, "certwall": 7, "archiveshelf": 10, "shelves": 7}

result = {}
for kind, (plates, fn, minf, fillmin) in JOBS.items():
    for p in plates:
        for o in ("land", "port"):
            im, a = load(f"{p}-{o}.png")
            rs = comps(fn(a), EXPECT[p], minf, fillmin, open_iter=6 if kind == "screens" else 2, close_iter=3 if kind == "crates" else 0)
            result.setdefault(p, {})[o] = rs
            d = ImageDraw.Draw(im)
            for k, r in enumerate(rs):
                q = [(x * im.width, y * im.height) for x, y in r["quad"]]
                d.polygon(q, outline=(0, 255, 0), width=4)
                d.text((q[0][0] + 6, q[0][1] + 4), str(k + 1), fill=(0, 255, 0))
            im.save(f"{DBG}/{p}-{o}.png")
            print(p, o, len(rs), "/", EXPECT[p])

json.dump(result, open(DBG + "/surfaces.json", "w"), indent=1)
