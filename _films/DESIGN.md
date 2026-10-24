# DESIGN — Gautham Vijayaraj portfolio (site + films)

## Style Prompt
Dark, calm, product-led launch-film look (the ForgeUI film's language). Real product footage on a near-black stage,
one blue accent used sparingly for emphasis, crisp white type, generous negative space. Motion is precise and
quiet: things arrive fast and settle, landed text holds still, the camera drifts slowly.

## Colors
| Role | Hex |
|---|---|
| Stage (background) | #05070B |
| Surface (panels, cards) | #0C1017 |
| Line (hairlines, wireframes) | rgba(242,245,249,0.14) |
| Ink (primary text) | #F2F5F9 |
| Ink-2 (secondary text) | #8A94A6 |
| Accent (one emphasis per frame) | #1f80ff |

## Typography
- Display: Space Grotesk 500/700, tight tracking (-0.03em), headlines 60px+ in films.
- Body: Inter 400/500.
- Code / terminal / labels: JetBrains Mono 400/500, used only for real code, terminal lines and small indices.

## Motion
- Arrivals: expo.out 0.5–0.8 s. Secondary: power3.out. Camera: power2.inOut, slow.
- Text: per letter (names) or per word (taglines), blur 8px → 0 + y 20 → 0.
- Style/screen changes: diagonal clip-path wipe 0.28 s with a 2px accent light edge.
- Wireframes: stroke-dashoffset draw, 0.6–1.2 s per group.
- Landed text holds still; no idle wobble.

## What NOT to Do
- No second accent hue (no orange/ember, no purple), no neon glows, no full-screen linear gradients (H.264 banding).
- No uppercase letter-spaced micro-labels except the 01/06 index.
- No fake UI that pretends to be a real product; app footage is real captures (data may be fictional).
- No Math.random / Date.now in timelines; no repeat: -1.
- No cartoon avatar frames.
