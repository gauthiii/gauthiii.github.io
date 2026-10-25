# GPT / Codex tasks — R2 story film assets

Context: `_plan/STORY_PLAN.md`. These images become a layered, scroll-scrubbed animated film about Gautham.
Work from the repo root `gauthiii.github.io/`. Save every file at the exact path given (PNG). Create folders as needed.

**Order matters.** Run S0, then **stop and show Gautham `character-sheet.png` for approval**. Only after approval run S1 → S6.
When everything is saved, write the handoff report described in S7.

---

## Shared blocks (paste these into every prompt where indicated)

**[STYLE]**
> Stylised animated-film still, the look of a high-end 2D/2.5D animated feature: clean confident linework, soft painterly
> shading, rich cinematic lighting, subtle film grain. Consistent proportions. Crisp, high detail, no blur except where asked.

**[CHARACTER]** (for any image that shows him)
> The same character as the attached reference images and character sheet: a young man in his late twenties with warm brown
> skin, thick voluminous wavy black hair, thick dark eyebrows, dark brown eyes, a light stubble beard and moustache.
> Outfit (always the same): a black button-up overshirt worn open, over a mustard-orange crew-neck T-shirt with a small
> simple white tree-in-a-circle emblem on the chest (emblem only, no lettering), and white wired earphones in his ears with
> the cable hanging down. Match the face, hair shape and outfit of the references exactly.

**[LIGHT]**
> Signature lighting: a saturated red neon light (#E8213F) from camera-left and a cool blue neon rim light (#1F80FF) from
> camera-right, deep navy-black shadows (#05070B to #0B1020). Moody, high contrast, glowing practical lights.

**[NO]**
> No text, letters, numbers, logos, brand marks, watermarks or signatures anywhere in the image (screens, signs, clothing,
> papers and boxes must be blank). No extra people unless asked. No robots, no "AI brain" imagery, no circuit-board patterns.

**[CUTOUT]** (for transparent character / layer images)
> Transparent background (PNG with alpha). Only the subject, cleanly isolated, with soft natural edges on hair. No floor,
> no shadow, no background. If transparency is not available, use a perfectly flat solid #00FF00 background instead.

**[SCREEN]** (for any screen that will show real footage)
> Every screen meant for footage is a perfectly flat, frontal, undistorted rectangle filled with a solid, evenly lit very dark
> colour #0A0D12, with a thin bezel. No reflections, no glare, no interface drawn on it.

Sizes: landscape **1536×1024**, portrait **1024×1536**, cut-outs **1024×1536** (portrait canvas, subject centred,
top of hair about 6% below the top edge unless stated).

---

## S0 — Character sheet (reference; NOT shown on the site)

- Output: `media/story-src/ref/character-sheet.png`, 1536×1024.
- Attach: `story/frame2.webp`, `story/frame3.webp`, `story/frame5.webp`, `story/frame9.webp`, `story/frame10.webp`.
- Prompt: [STYLE] [CHARACTER] then:
> A clean character model sheet on a plain dark navy background (#0B1020), even neutral lighting with a faint red rim on the
> left and blue rim on the right. Top row: full-body turnaround of the character standing, front view, three-quarter view,
> side view, back view. Bottom row: six head-and-shoulders expressions: neutral, warm smile, side glance to his left,
> intense focused stare, smug wink with a half smile, eyes closed (blink). Same scale across the row. [NO]
- Acceptance: the face, hair volume, stubble and outfit clearly match the attached frames; every view is the same person.
- **STOP here. Show Gautham the sheet. Regenerate until he approves.** From now on attach `character-sheet.png` plus
  `story/frame2.webp` to every image that shows him.

---

## S1 — Base poses (cut-outs, transparent)

Each: 1024×1536, [STYLE] [CHARACTER] [LIGHT] [CUTOUT] [NO], then the line below. Attach the sheet + `story/frame2.webp`.
"Seated waist-up" means: framed from the waist up, as if sitting behind a desk (the desk itself is NOT drawn; the body simply
ends cleanly at the waist). "Three-quarter body" means from mid-thigh up, ending cleanly at the bottom edge.

| File (`media/story-src/cast/…`) | Pose line |
|---|---|
| `hello-neutral.png` | Seated waist-up, facing the camera, forearms resting forward at desk height, relaxed shoulders, calm friendly neutral face, looking straight into the lens. |
| `stare.png` | Head-and-shoulders close-up, leaning toward the camera, chin slightly down, intense focused stare straight into the lens, serious mouth. |
| `laptop-lift.png` | Seated waist-up, facing camera, lifting a closed dark grey laptop with both hands at chest height, eyebrows raised, curious half smile. |
| `laptop-open.png` | Seated waist-up, an open dark grey laptop in front of him at desk height (we see the back of the laptop lid, blank), hands on the keyboard, warm confident smile at the camera. |
| `typing.png` | Seated waist-up, three-quarter view turned to camera-right, typing on an open laptop, focused, lit from below by blue screen glow. |
| `ots-back.png` | Seen from behind, over-the-shoulder: the back of his head, hair, shoulders and the top of a dark office chair, framed so he fills the lower-left third. Head turned very slightly to the right. (Canvas 1536×1024 for this one.) |
| `era-2017.png` | Seated waist-up, chin resting on one hand, reading an open textbook held in the other hand, small amused smile, warm desk-lamp light added from the left. |
| `era-2021.png` | Seated waist-up, leaning back in an office chair, holding a coffee mug, looking off to camera-right at monitors, satisfied expression. |
| `era-2023.png` | Three-quarter body, walking toward camera-right, one hand holding a backpack strap on his shoulder, looking up and ahead with a hopeful expression. |
| `era-2025a.png` | Seated waist-up, leaning in toward an open laptop (back of lid visible, blank), one hand on the trackpad, slight smile. |
| `era-2025b.png` | Three-quarter body, seen from the side-back, arms crossed, looking up at something large on the wall to camera-right. |
| `era-2026.png` | Three-quarter body, facing the camera, one hand resting on a desk edge just out of frame, calm confident look into the lens. |
| `point.png` | Three-quarter body, side-on facing camera-right, one arm raised pointing up and to the right, engaged expression. |
| `chair-back.png` | Seated in a dark gaming chair seen from behind (chair back fills most of the figure), head and shoulders above the chair, head turned slightly right. |
| `crates.png` | Three-quarter body, hands in pockets, looking to camera-right with an amused expression. |
| `arms-crossed.png` | Three-quarter body, leaning back as if against a wall, arms crossed, proud smirk at the camera. |
| `box.png` | Three-quarter body, holding an open cardboard box at chest height (blank, no label), looking into it with a nostalgic smile. |
| `grad-proud.png` | Three-quarter body, wearing a black graduation gown and black mortarboard cap with a gold tassel over his usual outfit (collar of the black overshirt and mustard tee visible), holding a rolled diploma tied with a ribbon up high in one hand, huge proud grin. |
| `unbothered.png` | Seated waist-up, leaning back, both hands behind his head, eyes closed, calm smug half smile. |
| `push-away.png` | Seated waist-up, one arm sweeping outward across desk height toward camera-right as if pushing things off the desk, not looking at it, bored expression looking to camera-left. |
| `wink.png` | Head-and-shoulders close-up facing the camera, a clear wink with the left eye, one-sided smirk. |

Acceptance (every cut-out): same person and outfit as the sheet; clean alpha (or flat #00FF00); nothing cropped except where
the framing says; no text anywhere.

---

## S2 — Pose variants (EDIT the base image; do not regenerate)

Open the named base file in the image editor and change **only** what is listed. Framing, scale, pose, lighting, outfit and
background must stay pixel-identical elsewhere. Save as a new file.

| New file (`media/story-src/cast/…`) | Base | Change only |
|---|---|---|
| `hello-blink.png` | `hello-neutral.png` | Eyes closed in a natural blink. |
| `hello-smile.png` | `hello-neutral.png` | A warm, open smile (mouth and eyes); nothing else moves. |
| `glance.png` | `hello-neutral.png` | Head turned about 30° and eyes looking toward camera-right, slight knowing smile. |

Acceptance: overlaying the variant on the base, only the face/head area differs.

---

## S3 — Background plates, landscape (no character)

Each: 1536×1024, [STYLE] [LIGHT] [NO], then the line below. **No people** in any plate (except `gradcrowd`).
"Copy space" = a darker, low-detail area where HTML text will sit; keep it as described.

| File (`media/story-src/plates/…-land.png`) | Plate line |
|---|---|
| `studio-land.png` | The home podcast studio from the reference frames, empty: a red neon frame sign with a vertical sound-wave icon on the left wall, a blue vertical neon tube on the right, a dark bookshelf, a small plant, smoky atmosphere. Camera at seated eye height looking at an empty chair behind a desk (desk edge at bottom). Copy space: left 40%. Attach `story/frame2.webp` for the room. |
| `studio-ots-land.png` | Same studio, reverse angle: looking past an empty chair toward a large wall-mounted monitor centred slightly right, monitor occupies about 55% of the width. [SCREEN] Red neon spills from the left, blue from the right. Copy space: left 30%. |
| `dorm-land.png` | A small college study room at night: wooden desk edge at the bottom, stacked textbooks, a warm desk lamp on the left, a window with a dark blue night sky on the right, a red string light along a shelf. Copy space: left 40%. |
| `office-land.png` | A corporate open-plan office at dusk: rows of empty desks fading into the distance, dual monitors glowing with abstract blue charts (no text), ceiling lights, a red exit-style light glow on the left (no lettering). Copy space: left 40%. |
| `campus-land.png` | A desert university campus at night: palm trees, a wide walkway, modern brick buildings with warm windows, a deep blue night sky with a few stars, red light from a lamp post on the left. Walkway runs left to right across the lower third. Copy space: upper-left. |
| `city-land.png` | A modern apartment workspace at night: big window behind the desk showing a mid-size American city skyline with blue lights, a red neon accent strip on the left wall, desk edge at the bottom. Copy space: left 40%. |
| `warroom-land.png` | A dark operations room: one huge wall display showing a dense network of about seventy glowing nodes connected by thin lines (blue nodes, a few red), no text. Floor reflections. Copy space: left 35%. |
| `secops-land.png` | A security operations room: a wall of glowing shield and padlock icons arranged in a grid, a risk heat-map grid of red-to-blue cells on a side screen (no text), cool blue ambience with red alert accents. Copy space: left 35%. |
| `labwall-land.png` | A dark studio wall with a faint dot grid and soft blue glow in the centre-right (an HTML node graph will be drawn there, so leave that area clean and evenly dark). Red neon edge light on the left. Copy space: left 35%. |
| `monitorwall-land.png` | A wall of five identical monitors arranged three on top and two below, centred, all perfectly frontal and evenly spaced. [SCREEN] Dark room, red and blue spill on the bezels. Copy space: top 22%. |
| `shelves-land.png` | A long dark metal studio shelf seen frontally with seven identical plain wooden crates in a row (four on the upper shelf, three on the lower), crate fronts blank and evenly lit, facing the camera squarely. Copy space: top 25%. |
| `certwall-land.png` | A dark wall with seven identical black picture frames hung in two rows (four on top, three below), each with a blank cream paper inside, perfectly frontal, evenly lit by small picture lights. Copy space: left 30%. |
| `archiveshelf-land.png` | A storage shelf seen frontally with ten identical closed cardboard boxes (two rows of five), each with a blank white label area on the front facing the camera squarely. Copy space: top 22%. |
| `gradstage-land.png` | An empty graduation stage at night: a single hard white spotlight circle centre-right on the stage floor, dark auditorium, maroon curtains, faint red and blue rim light. Copy space: left 40%. |
| `gradcrowd-land.png` | A huge auditorium seen from high above and behind the stage: hundreds of identical graduates in black gowns and black caps with gold tassels, all standing in rows and all holding rolled diplomas up in the same pose, viewed small and from the back/side so faces are not detailed. Red and blue stage light. |

Acceptance: no people (except gradcrowd); screens/frames/crates/boxes/labels are blank, frontal and clearly separated;
copy space is dark and calm; no text anywhere.

---

## S4 — Background plates, portrait (phones)

Recreate every S3 plate at **1024×1536** with the same room, light and objects, recomposed for a tall screen:
the main subject area (where the character stands/sits, the monitor, the node area) sits in the **upper 58%**, and the
**lower 42%** is darker, low-detail copy space. File names: replace `-land` with `-port`
(e.g. `media/story-src/plates/studio-port.png`). Portrait-specific layouts:
- `monitorwall-port.png`: five monitors stacked two, two, one (centred), all frontal.
- `shelves-port.png`: seven crates as two rows of three plus one centred below.
- `certwall-port.png`: seven frames as rows of two, two, two, one (centred).
- `archiveshelf-port.png`: ten boxes as five rows of two.
- `studio-ots-port.png`: the monitor fills the upper half, frontal. [SCREEN]

Attach the matching `-land` file to each prompt so the room stays identical.

---

## S5 — Close-up frame `eyes` (flat, with background)

- Outputs: `media/story-src/plates/eyes-land.png` (1536×1024) and `eyes-port.png` (1024×1536).
- Attach the sheet + `story/frame8.webp` (composition reference).
- Prompt: [STYLE] [CHARACTER] [LIGHT] [NO] then:
> Extreme close-up of his eyes and eyebrows filling the frame, looking straight into the lens, calm and confident, red light
> on the left side of his face, blue on the right, wavy hair at the top edge.

---

## S6 — Foreground desk layers and props (transparent)

[STYLE] [LIGHT] [CUTOUT] [NO]. Desk layers are **1536×1024**: only the front edge of a desk as a band across the bottom
~22% of the canvas, everything above it transparent, so a seated character placed behind it looks like he sits at the desk.

| File | Line |
|---|---|
| `media/story-src/fg/studio-desk.png` | Dark wood desk front edge across the bottom, and a black podcast microphone on a boom arm rising from the right side of the desk up to about 45% of the canvas height. Attach `story/frame2.webp` for the mic. |
| `media/story-src/fg/dorm-desk.png` | Worn wooden desk front edge with a corner of a textbook and a pencil on it. |
| `media/story-src/fg/office-desk.png` | Light grey office desk front edge with a keyboard edge and a small plant pot on the right. |
| `media/story-src/fg/city-desk.png` | Sleek black desk front edge with a small red neon strip along its front lip. |
| `media/story-src/props/envelope-a.png` (1024×1024) | A single glowing sealed envelope seen slightly from above, crisp white paper with a blue (#1F80FF) glowing edge, blank (no text), floating. |
| `media/story-src/props/envelope-b.png` (1024×1024) | The same envelope design but with a red (#E8213F) glowing edge, blank. |

---

## S7 — Handoff report

Write `_plan/GPT_STORY_ASSETS.md`: a table of every file saved (path, size, alpha yes/no, green-screen fallback yes/no),
which references were attached, which images were regenerated and why, and any acceptance check that could not be met.
Do not edit any HTML, CSS or JS. Do not commit.

---

## Checklist (63 files)

- S0: 1 · S1: 21 · S2: 3 · S3: 15 · S4: 15 · S5: 2 · S6: 6 → **63**
