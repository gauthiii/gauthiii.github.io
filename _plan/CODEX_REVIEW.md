# Codex review

Reviewed after C6 was marked done in `PLAN.md`. Source review of `index8.html`, `scenes/scenes.js`, and shared scene CSS; local Chrome verification at 390×844 with normal and reduced motion. No application source files were edited.

| Severity | File:line | Problem | Concrete fix |
| --- | --- | --- | --- |
| med | index8.html:61 | The hidden fixed header remains keyboard focusable. After scrolling down to 2000 px and focusing the Work link, its viewport y position is −43 px: the focus indicator is offscreen. | Reveal the header with `.hdr:focus-within { transform: none; }` and keep it visible while focus is inside it. |
| med | index8.html:871 | The hero copy fades to opacity 0 but its reel button remains in the tab order (`tabIndex` 0). Keyboard users can focus an invisible control after the hero fades. | Make the faded copy inert once its scroll transition finishes, restore it when scrolling back, and ensure focusing the reel brings visible copy into view. |
| med | index8.html:775 | Product loops autoplay even with `prefers-reduced-motion: reduce`. Chrome confirmed three videos playing after scrolling to products with reduced motion enabled. The preference is checked later only for GSAP setup. | Check the motion preference before observing/playing loop videos; retain the poster images for reduced motion and pause loops when that preference changes. |
| med | index8.html:116 | Many mobile controls miss the task's 44 px minimum: `.btn` is 42 px tall, archive icons are 38×38 px (line 211), the home mark is 28×28 px, nav links are about 20 px tall, credential links about 23 px, and some lab nodes about 42 px. | Give interactive elements a minimum 44×44 px hit area using padding/min-height/min-width, including mobile nav, lab nodes, summaries, credential links and dialog close. |

Checks: all 25 distinct GitHub URLs returned HTTP 200. At 390×844 there was no document horizontal overflow and no uncaught JavaScript error. Reduced motion produced zero ScrollTrigger instances and removed hero pinning. The native modal opened with focus on its close button; Escape closed it and returned focus to the reel button. Scene timelines use no `Math.random()` or `Date.now()`. Hero and scene images lack intrinsic dimensions, but their absolutely positioned, explicitly sized containers reserve layout space; no resulting layout-shift defect was established. Browser checks used a local file URL; production hosting behavior was not tested.

## Resolution (Claude, 2026-10-24) — all four fixed and verified in Chrome

| Finding | Fix | Verified |
| --- | --- | --- |
| Hidden header keeps focusable links offscreen | `.hdr:focus-within{transform:none}` | Header top = 0 px when a nav link is focused after scrolling 2600 px |
| Faded hero copy stays in the tab order | Hero timeline `onUpdate` sets `#heroCopy.inert` once copy is faded (t > 3.5 s), clears it when scrolling back | `inert` = true past the hero, false at the top |
| Product loops autoplay under reduced motion | Loops are never observed/loaded when `prefers-reduced-motion: reduce`; a `change` listener pauses them if the preference turns on; posters remain | Reduced motion: 5/5 paused, no `src` loaded. Normal: visible loops play |
| Controls under 44 px on mobile | 44 px min height/width on `.btn`, nav links, Résumé pill, brand link, archive icons, lab nodes, "Show all" summaries, credential links, footer link | 0 interactive elements under 44×44 at 390×844 |
