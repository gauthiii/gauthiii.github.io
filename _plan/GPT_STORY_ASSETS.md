# GPT story asset handoff

S0 was approved by Gautham before S1–S6 began. All **63 requested PNGs** are now saved under `media/story-src/` (109.7 MiB). Generated with the built-in image tool; no API/CLI fallback and no green-screen fallback. No application HTML, CSS or JavaScript was edited. No commit was made.

## Prompt set and references

Used the shared STYLE, CHARACTER, LIGHT, CUTOUT, SCREEN and NO blocks and each applicable per-file prompt in [GPT_STORY_TASKS.md](GPT_STORY_TASKS.md), in S1→S6 order after approval. Prompts repeated exact dimensions, blank surfaces, no lettering, safe margins, camera direction and portrait copy-space constraints. Only the explicitly required tree-in-circle chest emblem was permitted on the character. Portraits attached their matching landscape plate and were recomposed rather than mechanically cropped.

In the table, **sheet** means `media/story-src/ref/character-sheet.png`; `frameN.webp` means `story/frameN.webp`; other short references are relative to `media/story-src/`. **prior version** means that image's previous generation was attached as the edit target. Original discarded generations remain in the image tool's default output directory, not as extra PNGs in the delivery tree.

## Files

| Saved path | Pixels | KiB | Alpha | Green-screen fallback | Attached references |
| --- | --- | ---: | --- | --- | --- |
| `media/story-src/ref/character-sheet.png` | 1536×1024 | 1862.9 | no | no | frame2, frame3, frame5, frame9, frame10 |
| `media/story-src/cast/arms-crossed.png` | 1024×1536 | 1781.9 | yes | no | sheet, frame2.webp |
| `media/story-src/cast/box.png` | 1024×1536 | 1878.9 | yes | no | sheet, frame2.webp |
| `media/story-src/cast/chair-back.png` | 1024×1536 | 1742.9 | yes | no | sheet, frame2.webp |
| `media/story-src/cast/crates.png` | 1024×1536 | 1765.0 | yes | no | sheet, frame2.webp |
| `media/story-src/cast/era-2017.png` | 1024×1536 | 1841.1 | yes | no | sheet, frame2.webp |
| `media/story-src/cast/era-2021.png` | 1024×1536 | 1876.7 | yes | no | sheet, frame2.webp |
| `media/story-src/cast/era-2023.png` | 1024×1536 | 1911.2 | yes | no | sheet, frame2.webp |
| `media/story-src/cast/era-2025a.png` | 1024×1536 | 1704.0 | yes | no | sheet, frame2.webp |
| `media/story-src/cast/era-2025b.png` | 1024×1536 | 1442.2 | yes | no | sheet, frame2.webp |
| `media/story-src/cast/era-2026.png` | 1024×1536 | 1859.8 | yes | no | sheet, frame2.webp |
| `media/story-src/cast/glance.png` | 1024×1536 | 2807.1 | yes | no | cast/hello-neutral.png, sheet, frame2.webp; prior glance for repairs |
| `media/story-src/cast/grad-proud.png` | 1024×1536 | 1887.8 | yes | no | sheet, frame2.webp |
| `media/story-src/cast/hello-blink.png` | 1024×1536 | 2839.4 | yes | no | cast/hello-neutral.png, sheet, frame2.webp |
| `media/story-src/cast/hello-neutral.png` | 1024×1536 | 2004.6 | yes | no | sheet, frame2.webp |
| `media/story-src/cast/hello-smile.png` | 1024×1536 | 2842.0 | yes | no | cast/hello-neutral.png, sheet, frame2.webp |
| `media/story-src/cast/laptop-lift.png` | 1024×1536 | 1891.9 | yes | no | sheet, frame2.webp |
| `media/story-src/cast/laptop-open.png` | 1024×1536 | 1766.4 | yes | no | sheet, frame2.webp |
| `media/story-src/cast/ots-back.png` | 1536×1024 | 1306.7 | yes | no | sheet, frame2.webp |
| `media/story-src/cast/point.png` | 1024×1536 | 1717.2 | yes | no | sheet, frame2.webp |
| `media/story-src/cast/push-away.png` | 1024×1536 | 1749.9 | yes | no | sheet, frame2.webp |
| `media/story-src/cast/stare.png` | 1024×1536 | 2113.6 | yes | no | sheet, frame2.webp |
| `media/story-src/cast/typing.png` | 1024×1536 | 1593.8 | yes | no | sheet, frame2.webp |
| `media/story-src/cast/unbothered.png` | 1024×1536 | 1640.2 | yes | no | sheet, frame2.webp |
| `media/story-src/cast/wink.png` | 1024×1536 | 2276.9 | yes | no | sheet, frame2.webp, frame10.webp |
| `media/story-src/fg/city-desk.png` | 1536×1024 | 822.7 | yes | no | none |
| `media/story-src/fg/dorm-desk.png` | 1536×1024 | 1148.4 | yes | no | none |
| `media/story-src/fg/office-desk.png` | 1536×1024 | 967.3 | yes | no | none |
| `media/story-src/fg/studio-desk.png` | 1536×1024 | 1105.5 | yes | no | prior version, frame2.webp |
| `media/story-src/plates/archiveshelf-land.png` | 1536×1024 | 1709.3 | no | no | none |
| `media/story-src/plates/archiveshelf-port.png` | 1024×1536 | 1774.2 | no | no | prior version, plates/archiveshelf-land.png |
| `media/story-src/plates/campus-land.png` | 1536×1024 | 2392.5 | no | no | none |
| `media/story-src/plates/campus-port.png` | 1024×1536 | 2031.6 | no | no | plates/campus-land.png |
| `media/story-src/plates/certwall-land.png` | 1536×1024 | 1893.7 | no | no | none |
| `media/story-src/plates/certwall-port.png` | 1024×1536 | 1746.3 | no | no | prior version, plates/certwall-land.png |
| `media/story-src/plates/city-land.png` | 1536×1024 | 1758.4 | no | no | none |
| `media/story-src/plates/city-port.png` | 1024×1536 | 1727.4 | no | no | plates/city-land.png |
| `media/story-src/plates/dorm-land.png` | 1536×1024 | 1690.1 | no | no | none |
| `media/story-src/plates/dorm-port.png` | 1024×1536 | 1599.0 | no | no | plates/dorm-land.png |
| `media/story-src/plates/eyes-land.png` | 1536×1024 | 2107.2 | no | no | sheet, frame2.webp, frame8.webp |
| `media/story-src/plates/eyes-port.png` | 1024×1536 | 2172.6 | no | no | sheet, frame2.webp, frame8.webp |
| `media/story-src/plates/gradcrowd-land.png` | 1536×1024 | 2095.2 | no | no | sheet, frame2.webp |
| `media/story-src/plates/gradcrowd-port.png` | 1024×1536 | 1926.8 | no | no | plates/gradcrowd-land.png, sheet, frame2.webp |
| `media/story-src/plates/gradstage-land.png` | 1536×1024 | 1481.0 | no | no | none |
| `media/story-src/plates/gradstage-port.png` | 1024×1536 | 1497.5 | no | no | plates/gradstage-land.png |
| `media/story-src/plates/labwall-land.png` | 1536×1024 | 1807.6 | no | no | none |
| `media/story-src/plates/labwall-port.png` | 1024×1536 | 1881.6 | no | no | plates/labwall-land.png |
| `media/story-src/plates/monitorwall-land.png` | 1536×1024 | 1600.7 | no | no | none |
| `media/story-src/plates/monitorwall-port.png` | 1024×1536 | 1739.2 | no | no | prior version, plates/monitorwall-land.png |
| `media/story-src/plates/office-land.png` | 1536×1024 | 1730.9 | no | no | none |
| `media/story-src/plates/office-port.png` | 1024×1536 | 1714.5 | no | no | plates/office-land.png |
| `media/story-src/plates/secops-land.png` | 1536×1024 | 1712.6 | no | no | none |
| `media/story-src/plates/secops-port.png` | 1024×1536 | 1767.9 | no | no | plates/secops-land.png |
| `media/story-src/plates/shelves-land.png` | 1536×1024 | 2053.5 | no | no | none |
| `media/story-src/plates/shelves-port.png` | 1024×1536 | 1950.3 | no | no | plates/shelves-land.png |
| `media/story-src/plates/studio-land.png` | 1536×1024 | 1866.3 | no | no | frame2.webp |
| `media/story-src/plates/studio-ots-land.png` | 1536×1024 | 1542.0 | no | no | frame2.webp |
| `media/story-src/plates/studio-ots-port.png` | 1024×1536 | 1635.3 | no | no | plates/studio-ots-land.png |
| `media/story-src/plates/studio-port.png` | 1024×1536 | 1804.5 | no | no | plates/studio-land.png |
| `media/story-src/plates/warroom-land.png` | 1536×1024 | 2044.2 | no | no | none |
| `media/story-src/plates/warroom-port.png` | 1024×1536 | 2004.5 | no | no | plates/warroom-land.png |
| `media/story-src/props/envelope-a.png` | 1024×1024 | 868.8 | yes | no | none |
| `media/story-src/props/envelope-b.png` | 1024×1024 | 833.6 | yes | no | props/envelope-a.png |

## Regenerations and corrections

| Final file | Reason for another generation/edit |
| --- | --- |
| `media/story-src/cast/typing.png` | First version cropped the laptop lid at right edge. |
| `media/story-src/cast/era-2025b.png` | First version showed front of torso rather than side-back. |
| `media/story-src/cast/stare.png` | First version framed waist-up rather than head-and-shoulders. |
| `media/story-src/cast/chair-back.png` | First version turned head toward camera instead of only slightly right. |
| `media/story-src/cast/unbothered.png` | First version clipped both elbows at the side edges. |
| `media/story-src/cast/wink.png` | First version closed the viewer-left eye instead of the character’s anatomical left eye. |
| `media/story-src/cast/push-away.png` | First version looked toward camera-right rather than away to camera-left. |
| `media/story-src/plates/gradcrowd-land.png` | First pass included different hair silhouettes instead of identical clones. |
| `media/story-src/plates/studio-land.png` | First pass baked a microphone into the plate; microphone should be on the separate foreground layer. |
| `media/story-src/plates/monitorwall-land.png` | First pass made the bottom two monitors larger than the top three. |
| `media/story-src/plates/gradstage-land.png` | First pass placed a podium in the character’s spotlight. |
| `media/story-src/plates/dorm-land.png` | First pass placed the desk lamp at right instead of the requested left. |
| `media/story-src/plates/archiveshelf-port.png` | Last row of boxes slightly intruded into the lower 42% copy area. |
| `media/story-src/plates/monitorwall-port.png` | First portrait pass retained landscape three-plus-two layout. |
| `media/story-src/plates/certwall-port.png` | Seven frames were correct, but the last frame extended into lower 42% copy space. |
| `media/story-src/plates/certwall-port.png` | Second portrait correction: lowest frame still crossed y=890; requested tighter upper-half composition. |
| `media/story-src/fg/studio-desk.png` | Initial studio foreground included the reference character and desk band too low; remove character completely and raise band to bottom22%. |
| `media/story-src/cast/glance.png` | Additional image-tool edits repaired the neck/earphone transition and extracted a clean alpha matte after a grey-background contact sheet exposed a rectangular halo. The matte was applied without replacing the original red/blue subject lighting. |

## Verification

- Compared all paths and pixel dimensions against the task list: **63 expected, 63 present, zero missing or wrong-size files**.
- All **30** cast/foreground/prop files have an alpha channel and genuinely transparent pixels. The other **33** images are opaque. No green backing was used.
- Inspected generated images and all 30 transparent assets on grey. Removed the studio foreground's accidental character and the glance halo.
- Checked the composed object counts: five monitor screens, seven crates, seven certificate frames and ten archive boxes. Portrait arrangements are 2/2/1 monitors, 3/3/1 crates, 2/2/2/1 frames and five rows of two boxes.
- macOS Vision accurate OCR, language correction off, confidence threshold 0.35: **zero recognized text observations** over all 63 final images before the final alpha-only glance cleanup. That cleanup changed only alpha, not image RGB. OCR complements visual inspection; it is not a proof that every decorative stroke is non-letter-like.
- S2 used image-tool **edits of hello-neutral**, not fresh pose generation. A deterministic pixel-preservation pass restored the neutral image outside the edit regions. Decoded RGBA comparison found **zero changed pixels outside** each region: blink/smile `[300,260,755,675)`; glance `[185,65,870,800)` (left, top, right, bottom). The final glance alpha cleanup retained this invariant.
- Dimensions were normalized with macOS `sips` where the generator returned a different native size. PNG decoding and alpha/pixel checks were local. The approved S0 sheet was not changed.

## Remaining acceptance limitations for A0/A1

These are delivered originals for review, not a claim of perfect acceptance of every geometric constraint:

- The studio over-the-shoulder screens have slight perspective and tonal variation rather than mathematically perfect, uniformly `#0A0D12` rectangles. Measure their actual corners and rectify or map the real footage as anticipated in STORY_PLAN §7. Monitor, crate and frame dimensions also vary slightly; measure individual surfaces instead of assuming an exact repeated grid.
- Character silhouettes and face identity were checked visually against the approved sheet. The approximate 6% top-hair margin and waist/mid-thigh framing are not identical across all poses; for example, the wide-arm `unbothered` pose sits lower to keep both elbows visible, and `era-2021` retains some lap/chair area. Use per-pose trim/anchor measurements; request a tighter redraw if exact standardized framing is required.
- The turned-head `glance` edit includes an **upper-neck and earphone transition** inside the stated head-region rectangle. A literal face-only change was not achieved for this rotation. Outside that rectangle, the body, hands, clothing and transparency are pixel-identical to neutral.

The report records these constraints explicitly so A0 can accept them or request targeted re-dos before animation work. No footage, labels, captions, envelope amounts, certificates or UI text has been drawn into these assets.

