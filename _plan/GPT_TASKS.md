# GPT / Codex tasks

Run G1–G3 now (in any order). Run G4 only after Claude reports that index8.html is built (step C6).
Save every file at the exact path given, relative to the repo root `gauthiii.github.io/`.

Shared palette for every image: stage #05070B, accent blue #1f80ff, ink #F2F5F9, muted #8A94A6.
No other hues. No gradients outside that palette. No lens flares, no stock "AI brain" or robot imagery, no circuit boards.

---

## G1 — OG share card

- Output: `media/og/og-card.png`, exactly 1200×630 px, PNG.
- Prompt:

> A minimal dark social preview card, 1200×630. Solid near-black background #05070B with a very subtle
> radial glow of blue #1f80ff at 8% opacity behind the right third. Left-aligned text block with generous margins (96 px):
> line 1 "Gautham Vijayaraj" in a geometric grotesk typeface (Space Grotesk style), bold, 76 px, colour #F2F5F9;
> line 2 "AI Engineer" in the same typeface, regular, 40 px, colour #1f80ff;
> line 3 "gauthiii.github.io" in a monospace typeface, 26 px, colour #8A94A6, placed near the bottom-left.
> On the right third, six thin-outlined rounded rectangles (1.5 px white lines at 35% opacity) arranged as a 3×2 grid
> of app windows, slightly tilted in 3D perspective, as if a wireframe of six products. Flat, crisp, editorial, no photo,
> no people, no extra text, no logos.

- Acceptance: the three text lines are spelled exactly as above; nothing else is written anywhere.

## G2 — GV monogram

- Output: `media/brand/gv-mark.png`, 1024×1024 px, PNG with transparent background.
- Prompt:

> A minimal monogram of the letters "G" and "V" for a software engineer's personal brand. Geometric, single-weight
> strokes, the V nested inside or sharing a stroke with the G, constructed on a grid like a modern tech wordmark.
> Colour: solid #F2F5F9 strokes with one small element (a dot or one stroke end) in #1f80ff. Transparent background,
> centred, occupying about 70% of the canvas. Flat vector look, no gradients, no shadows, no 3D, no extra text.

- Acceptance: reads as "GV" at 32×32 px (Claude will test favicon sizes); transparent background.

## G3 — Six cover stills (film posters + reduced-motion stills)

- Output: `media/covers/forgeui.png`, `mathra.png`, `inboxpulse.png`, `prixie.png`, `resonate.png`, `gos.png`,
  each exactly 1920×1080 px, PNG.
- Shared style line, prepend to every prompt:

> Abstract cinematic still, 16:9, 1920×1080. Near-black background #05070B, one accent colour blue #1f80ff, highlights
> in #F2F5F9. Dark, premium, minimal, soft volumetric light, shallow depth of field, large calm negative space on the
> left 40% (copy will sit there). No text, no letters, no numbers, no logos, no people, no robots, no brains.

- Per project (append one):
  - forgeui: "Dozens of floating translucent glass interface panels of different styles fanned in a 3D arc on the right, one panel in sharp focus with a blue edge light."
  - mathra: "Elegant floating mathematical structure on the right: a glowing blue matrix grid and a smooth 3D surface plot made of fine light lines, like a chalk diagram rendered in light."
  - inboxpulse: "Hundreds of tiny glowing envelope-shaped cards streaming from the right and sorting themselves into nine neat vertical columns of light."
  - prixie: "A thin horizontal sound waveform of blue light on the right, with small translucent speech-bubble cards rising from its peaks."
  - resonate: "A single audio waveform on the right splitting into four parallel ribbons of light, each a slightly different brightness of blue and white."
  - gos: "A retro-futuristic desktop of overlapping simple windows made of fine light lines on the right, a blinking cursor glow, faint pixel grid."

- Acceptance: no text or letter-like glyphs anywhere; the left 40% stays mostly empty and dark.

## G4 — Codex review of index8.html (after C6)

- Output: `_plan/CODEX_REVIEW.md`.
- Prompt for Codex:

> Review `index8.html` and `scenes/*.js` in this repo. Do not edit files. Report findings as a Markdown table:
> severity (high/med/low), file:line, problem, concrete fix. Check:
> 1. Accessibility: heading order, focus visibility, keyboard reachability of every link/button and the film modal
>    (focus trap, Esc closes, focus returns), alt text, colour contrast ≥ 4.5:1 for body text against #05070B,
>    `prefers-reduced-motion` fallback actually removes pinning and scrubbing.
> 2. Performance: anything above the fold heavier than needed, images without width/height, videos not lazy,
>    ScrollTrigger instances not refreshed after fonts/images load, layout thrash in scroll handlers.
> 3. Mobile at 390×844: horizontal overflow, text overlapping media, pinned sections taller than needed, tap targets < 44 px.
> 4. Correctness: broken links (every GitHub URL), console errors, timelines using Math.random or Date.now.
> List only real problems you can point to by line. No style opinions.
