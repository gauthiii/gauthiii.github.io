"""Encode media/story-src → media/story (WebP) and write scenes/story-map.js
(surface rects from measure.py + cut-out trim boxes and aspect ratios)."""
import json, os, sys
import numpy as np
from PIL import Image

ROOT = "/Users/gauthamsmacbook/Apps/React Apps/gauthiii.github.io"
SRC, OUT = ROOT + "/media/story-src/", ROOT + "/media/story/"
surfaces = json.load(open(sys.argv[1]))   # surfaces.json written by measure.py

def save(im, path, q, alpha=False):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    im.save(path, "WEBP", quality=q, method=6, alpha_quality=90 if alpha else 100)
    return os.path.getsize(path)

total, cast = 0, {}
for f in sorted(os.listdir(SRC + "plates")):
    im = Image.open(SRC + "plates/" + f).convert("RGB")
    total += save(im, OUT + "plates/" + f.replace(".png", ".webp"), 74)

for f in sorted(os.listdir(SRC + "cast")):
    im = Image.open(SRC + "cast/" + f).convert("RGBA")
    a = np.asarray(im)[..., 3]
    ys, xs = np.nonzero(a > 10)
    box = (int(xs.min()), int(ys.min()), int(xs.max()) + 1, int(ys.max()) + 1)
    t = im.crop(box)
    if t.height > 1200: t = t.resize((round(t.width * 1200 / t.height), 1200), Image.LANCZOS)
    total += save(t, OUT + "cast/" + f.replace(".png", ".webp"), 80, True)
    W, H = im.size
    cast[f[:-4]] = {"aspect": round((box[2] - box[0]) / (box[3] - box[1]), 4),
                    "box": [round(box[0] / W, 4), round(box[1] / H, 4), round(box[2] / W, 4), round(box[3] / H, 4)]}

for d in ("fg", "props"):
    for f in sorted(os.listdir(SRC + d)):
        im = Image.open(SRC + d + "/" + f).convert("RGBA")
        if d == "props":
            a = np.asarray(im)[..., 3]; ys, xs = np.nonzero(a > 10)
            im = im.crop((int(xs.min()), int(ys.min()), int(xs.max()) + 1, int(ys.max()) + 1))
            im = im.resize((im.width // 2, im.height // 2), Image.LANCZOS)
        total += save(im, OUT + d + "/" + f.replace(".png", ".webp"), 80, True)

# screens keep corner quads; labels/papers/crates use rects
smap = {}
for plate, o in surfaces.items():
    smap[plate] = {k: [r["quad"] if plate in ("studio-ots", "monitorwall") else r["rect"] for r in v] for k, v in o.items()}
open(ROOT + "/scenes/story-map.js", "w").write(
    "/* Generated from media/story-src by _films/tools/story/encode_story.py — surface positions (fractions of the plate) and cut-out trim boxes. */\n"
    "window.STORY_MAP = " + json.dumps({"surfaces": smap, "cast": cast}, separators=(",", ":")) + ";\n")
print("total web KB", total // 1024)
