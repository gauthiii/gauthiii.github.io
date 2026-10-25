# GPT story assets — batch 2 handoff

All **19 named PNGs** generated with the **built-in image_gen tool**, using existing poses as edit targets and `media/story-src/ref/character-sheet.png` as identity reference. No CLI/API fallback used.

**Status: generation delivered; strict animation acceptance is PARTIAL.** These are reviewable source frames, not verified drop-in animation frames. Do not describe the overlay checks as passing.

## Locations

- Requested outputs: `media/story-src/cast2/` (19 PNGs, approximately 29 MB).
- Original lit edit drafts: `media/story-src/cast2-review/` (19 PNGs, approximately 33 MB). These retain painted backgrounds and are alternatives for localized compositing, not cutouts.
- Preview: `GPT_STORY_CONTACT_SHEET_2.jpg`.
- Exact initial prompts: `GPT_STORY_PROMPTS_2.json`.
- Exact selected cleanup prompts and crowd retry prompts: `GPT_STORY_CLEANUP_PROMPTS_2.json`.
- Numeric checks: `GPT_STORY_CHECKS_2.json`.

## Background / overlay findings

All selected deliverables use the allowed **green-screen fallback**. Alpha is fully opaque (255 everywhere), so key green before encoding. The tool did not supply alpha despite repeated requests. Green is visually uniform but **not exactly #00FF00**: top-left samples vary roughly R=14–29, G=239–244, B=16–29. Use a tolerant chroma key with edge cleanup, not exact RGB replacement. Preserve red and blue subject rim lighting and inspect green spill at hair edges.

Canvas dimensions pass: 17 portraits at 1024×1536 and two crowd landscapes at 1536×1024. Every selected output was visually reviewed in the contact sheet, with representative frames also inspected full size. No visible text or extra people.

**Outside-region pixel identity fails.** The tool redrew texture, edges, cable and clothing details outside the requested changes. The table reports the percentage of pixels changing by more than 8/255 in at least one RGB channel in an intended unchanged subject probe; lower is better, zero would pass. Probe boxes and original-draft comparison results are in the checks JSON. These are diagnostics, not registration corrections. Background replacement is excluded by selecting probes inside the subject. Crowd frames are new compositions, so a pixel overlay with grad-proud is not meaningful.

## File manifest

All output names below are relative to `media/story-src/cast2/`; all bases are relative to `media/story-src/cast/`. Every row uses green-screen, not alpha.

| Output | Base | Background | Outside-region overlay check |
|---|---|---|---|
| `blink-1.png` | `hello-neutral.png` | Green-screen | FAIL: 92.08% changed in probe |
| `blink-2.png` | `hello-neutral.png` | Green-screen | FAIL: 92.73% changed in probe |
| `smile-1.png` | `hello-neutral.png` | Green-screen | FAIL: 93.84% changed in probe |
| `smile-2.png` | `hello-neutral.png` | Green-screen | FAIL: 92.61% changed in probe |
| `turn-1.png` | `hello-neutral.png` | Green-screen | FAIL: 93.41% changed in probe |
| `turn-2.png` | `hello-neutral.png` | Green-screen | FAIL: 93.80% changed in probe |
| `walk-1.png` | `era-2023.png` | Green-screen | FAIL: 73.00% changed in probe |
| `walk-2.png` | `era-2023.png` | Green-screen | FAIL: 84.07% changed in probe |
| `walk-3.png` | `era-2023.png` | Green-screen | FAIL: 75.22% changed in probe |
| `walk-4.png` | `era-2023.png` | Green-screen | FAIL: 76.18% changed in probe |
| `laptop-1.png` | `laptop-lift.png` | Green-screen | FAIL: 87.46% changed in probe |
| `laptop-2.png` | `laptop-open.png` | Green-screen | FAIL: 61.79% changed in probe |
| `laptop-3.png` | `laptop-open.png` | Green-screen | FAIL: 84.98% changed in probe |
| `sweep-1.png` | `unbothered.png` | Green-screen | FAIL: 97.05% changed in probe |
| `sweep-2.png` | `push-away.png` | Green-screen | FAIL: 92.97% changed in probe |
| `crowd-me-1.png` | `grad-proud.png` | Green-screen | N/A: new landscape composition |
| `crowd-me-2.png` | `grad-proud.png` | Green-screen | N/A: new landscape composition |
| `wink-0.png` | `wink.png` | Green-screen | FAIL: 96.94% changed in probe |
| `wink-1.png` | `wink.png` | Green-screen | FAIL: 96.64% changed in probe |

## Sequence-specific limits and integration notes for Claude

- **Blink / smile:** requested expression states are present, but use localized face patches or registration to keep the torso, hands and background stable. The blink and smile bases already have a small neutral smile, so the first smile is deliberately subtle.
- **Head turn:** both heads turn camera-right; the 10°/20° values are approximate. Torso/emblem/cable redraw means these are not pixel-stable layers.
- **Walk:** the base ends at mid-thigh, so feet cannot be visible while preserving the original crop. These frames imply contact/down/passing/up through visible leg and arm positions. They do not establish a validated seamless walk loop; normalize and preview before looping. Head scale/placement has small differences.
- **Laptop:** the closed laptop is lowered, then the lid is partially open, then fully open with focus. Lid angle is approximate; face/body details drift between frames.
- **Sweep:** hands lower from the relaxed pose and the sweep hand starts near the body. These still need registration with their separate start/end bases.
- **Crowd:** both requested poses are present (rear shoulder glance, then front-facing raised diploma). After size retries, keyed bounds measure **230 px** and **266 px** high, about **22.5%** and **26.0%** of the 1024px canvas, rather than the requested 15%. Their bottom coordinates are 651 and 636. Normalize scale and anchor during compositing; a suitable common target is 154px subject height with feet at y=610. Do not use the source positions as an aligned pair.
- **Wink:** `wink-0` has both eyes open; corrected `wink-1` visibly shows the iris through the half-closed character-left eye (camera-right). The original lit `cast2-review/wink-1.png` was too closed; use the selected green-screen version.

Before swapping sequences into the film, key and clean edges, register to the batch-1 poses, retain original pixels outside the animation region where practical, then preview motion and normalize crowd scale. The encoder currently reads only `cast/`, so these files are not automatically picked up. This handoff does **not** claim an end-to-end film regression or device/sound validation.

No HTML, CSS, JS, existing batch-1 source assets, or integration scripts were edited by this delivery. Existing unrelated working-copy changes were left in place. Nothing committed or pushed. Both source folders are covered by an existing gitignore rule, so the PNGs are present locally but do not appear in ordinary git status; do not assume a future commit includes them.
