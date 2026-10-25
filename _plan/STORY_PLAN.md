# R2 — The story film (character-led scroll reel)

Status: **built (A0–A5 done, 2026-10-24); not committed**. GPT delivered all 63 assets (`GPT_STORY_ASSETS.md`); S0 sheet approved by Gautham.

## 1. Why

The R1 reel (commit 8e998c3) is one scrubbed timeline, but it reads as a generic product site: typography over UI captures. The old "Built Different" page had a stronger idea: an animated version of Gautham in a red/blue neon studio, carrying the story frame by frame. R2 brings that idea back across the **whole** reel. New, better images; more of them; layered so the camera can move.

## 2. Decisions (2026-10-24, all chosen by Gautham from options)

| Topic | Decision |
|---|---|
| Structure | The character narrates the entire reel. Every chapter is a scene in one illustrated world. Real product captures play **inside in-world screens** (mapped by code, never AI-drawn) |
| Look | Same character as `story/frame1–10.webp`, upgraded: film-quality stylised animation still, consistent proportions, more frames. Red + blue neon signature kept for the story; site UI stays single-blue |
| Build method | Layered 2.5D: background plates + transparent character cut-outs + foreground desk layers + props, composited and scrubbed with GSAP (parallax, push-ins, pull-backs, light sweeps) |
| Jokes | Visual gags + the three lines verbatim: graduation pull-back into a crowd of identical graduates; two offer envelopes ($300k / 600k) pushed away; the wink |
| Old story lines | All return verbatim: "I don't just vibe code." · "Agents that coordinate tools and context. RAG that ships. Automation that sticks." · the build terminal ending "your model has been deployed" |
| Dense chapters | Illustrated settings: Lab = node wall, More products = monitor wall (real loops mapped), Stack = labelled crates, Credentials = framed certificates, Archive = shelf of project boxes. All text stays real HTML on top (readable, clickable) |
| Mobile | Separate portrait set: every background plate also at 1024×1536. Cut-outs, desk layers and props are shared |
| Likeness | The 10 old frames are the identity reference → GPT makes a character sheet first → every later image attaches that sheet |
| Text in images | None. Every word on screen is HTML (captions, labels, envelope amounts, certificate names) |
| Kept from R1 | One sticky stage + one master timeline, scrub bar with chapters and timecode, Details drawer, Play film buttons, reduced-motion static page, per-chapter lazy loading |

## 3. Layer model

```
z0  background plate        moves slowest  (parallax 0.3)
z1  character cut-out       medium         (parallax 0.6) + pose swaps (cross-fade / blink / smile)
z2  foreground desk layer   fastest        (parallax 1.0)  — sits in front of seated poses
z3  props                   tweened freely (envelopes slide, fly off)
z4  in-world screens        real captures / scene builders mapped onto measured screen rects
z5  light FX                red/blue light sweeps, dark dips, grain (CSS)
z6  HTML                    captions, labels, buttons, drawer triggers
```

Screens in plates are drawn as flat, frontal, solid `#0A0D12` rectangles. Claude measures their corners from the delivered PNGs and positions the real captures there (landscape and portrait measured separately).

## 4. Shot list (the reel, in order)

Captions in quotes are verbatim; dates/roles come from the résumé exactly as in R1.

| # | Scene | Layers (asset ids) | Motion | On-screen text |
|---|---|---|---|---|
| 01 | Studio, wide | `studio` + `hello-neutral` + `studio-desk` | slow push-in, blink, smile builds | "Hi, I'm Gautham." · "AI Engineer" |
| 02 | Studio, medium | `studio` + `glance` + `studio-desk` | head turns camera-right, red light sweep | "I build AI systems that actually work." · "Agents that coordinate tools and context. RAG that ships. Automation that sticks." |
| 03 | Studio, close | `studio` (blurred) + `stare` | dark dip, punch-in | "I don't just vibe code." |
| 04 | 2017 · study room | `dorm` + `era-2017` + `dorm-desk` | light sweep wipe in, year counter 2017 | 2017 – 2021 · B.Tech, Computer Science Engineering · SRM Institute of Science & Technology |
| 05 | 2021 · office | `office` + `era-2021` + `office-desk` | lateral dolly | TCS caption + subtext |
| 06 | 2023 · campus at night | `campus` + `era-2023` | character walks across (x tween), palms parallax | ASU caption + "2024 · Software Engineer Intern · HCLTech" + subtext |
| 07 | 2025 · city window | `city` + `era-2025a` + `city-desk` | skyline parallax | Reveille caption + subtext |
| 08 | 2025 · agent war room | `warroom` + `era-2025b` | node wall pulses (CSS glow), push-in | Santan AI Engineer caption + 3 subtexts |
| 09 | 2026 · security ops | `secops` + `era-2026` | shield wall light-up | AI Security Engineer caption + 3 subtexts |
| 10 | Studio · build mode | `studio` + `laptop-lift` → `laptop-open` → `typing` + `studio-desk` | pose-to-pose, terminal types (HTML) | old terminal 5 lines verbatim → "Six products, built end to end." |
| 11–16 | Studio · over the shoulder | `studio-ots` + `ots-back` + screen rect | push into the monitor, the R1 scene builder plays inside it, pull out; product copy panel on the left | ForgeUI … gOS copy (as R1), Play film + links |
| 17 | Agent Lab | `labwall` + `point` | HTML node graph drawn on the wall, cards cycle | Lab title + 7 cards |
| 18 | More products | `monitorwall` + `chair-back` | five real loops mapped on the five screens, camera pans | 5 product names + links |
| 19 | Stack | `shelves` + `crates` | camera tracks along the shelf, HTML labels on crate fronts | 7 groups |
| 20 | Credentials | `certwall` + `arms-crossed` | frames light up one by one, HTML titles in frames | 7 certs (verify links) |
| 21 | Archive | `archiveshelf` + `box` | boxes highlight in turn, HTML labels | 10 projects (repo links) |
| 22 | Joke 1a | `gradstage` + `grad-proud` | spotlight snap on | "I have a Master's Degree from ASU." |
| 23 | Joke 1b | `gradcrowd` (+ `grad-proud` shrinking into it) | fast pull-back, he becomes one of hundreds | "Well... who doesn't?" |
| 24 | Joke 2 | `studio` + `unbothered` → `push-away` + `studio-desk` + `envelope-a`, `envelope-b` | envelopes slide in (HTML "$300k" / "600k" on them), hand sweep, envelopes fly off-frame | "Google tried to offer me $300k annual package . Open AI tried to poach me for 600k. And I said no." |
| 25 | Joke 3 | `studio` (blurred) + `wink` | punch-in on the wink | "If you wanna buy more bullshit like that, Let's Talk." |
| 26 | Contact | `eyes` (flat frame) → pull out to `studio` + `hello-smile` | extreme close-up opens, pull back | "Let's build something." + email, GitHub, LinkedIn, Résumé |

Estimated runtime on the timecode: ~3:00. Reading holds as in R1.

## 5. Asset budget (63 images, all from GPT)

- 1 character sheet (reference only, not shown on the site)
- 24 character cut-outs (transparent)
- 15 background plates × 2 orientations = 30
- 1 flat close-up frame × 2 orientations = 2 (`eyes`)
- 4 foreground desk layers (transparent)
- 2 props (transparent)

Originals land in `media/story-src/` (gitignored, local only). Claude encodes web copies to `media/story/` (WebP, ~1600 px long edge, cut-outs with alpha).

## 6. Claude's steps after the assets arrive

| Step | Work |
|---|---|
| A0 | Verify deliveries against GPT_STORY_TASKS.md acceptance (sizes, alpha, no text, likeness vs sheet); list re-dos for GPT if any |
| A1 | Key out any green-screen fallbacks, trim cut-outs, encode WebP, measure screen/frame/crate/box rects (landscape + portrait) into `scenes/story-map.json` |
| A2 | Story stage: layered scene component (plate / cast / fg / props / screens / FX / HTML) with parallax camera, pose swaps, light sweeps |
| A3 | Rebuild the master timeline on the shot list above; reuse R1 scene builders inside the studio monitor; real loops on the monitor wall |
| A4 | Portrait layouts (plates swap at ≤ 900 px wide, text stacks below the safe zone) |
| A5 | QA at 1440×900, 1280×720, 390×844: errors, clipping, first-load weight, rewind, drawer, film, reduced-motion static page |
| A6 | Report; commit only when asked (no co-author line) |

## 7. Risks and how they are handled

- **Character drift across 24 cut-outs** → sheet first; every prompt attaches it; pose variants (blink/smile/glance) are made by editing the base image, not regenerating; acceptance check per image.
- **AI-garbled text** → no text in any image; all words are HTML.
- **Screens not rectangular** → plates specify flat frontal screens; Claude measures corners and can apply a perspective transform if a screen is slightly off.
- **Weight** → plates load per chapter (R1 lazy system); WebP; first load stays light (studio only).
- **Transparency unsupported in a given tool** → fallback: solid #00FF00 background, Claude keys it out.

## 8. Build notes (A0–A5)

- **A0 review:** all 63 files accepted. Plates already contain desks/chairs (studio, dorm, city): cut-outs sit in front of the chairs and behind the desk layers. No GPT re-dos needed.
- **A1:** `_films/tools/story/measure.py` finds every in-world surface from pixels (screens: max channel < 22; certificate papers: bright cream; box labels: lum > 90 with blue ≥ 0.6·red; crates: warm wood) — 1/5/7/10/7 found in both orientations. `encode_story.py` writes `media/story/` (WebP, ~5 MB total, cut-outs trimmed to alpha) and `scenes/story-map.js` (surface quads/rects + cut-out aspect/trim).
- **A2–A4 (index.html):** each chapter holds shots; a shot is a camera box sized to cover (landscape) or full-width/top-anchored (portrait, 118vw) so plate fractions map 1:1. Cut-outs placed by centre-x / bottom / height in plate fractions; pose swaps are timeline cross-fades; camera = scale push + per-layer parallax; FX = red/blue light sweep + dark dip. Real captures: R1 scene builders run inside the studio monitor; the five loops play on the monitor wall.
- **Deviations from §4, decided during build:** the studio desk layer is clipped to its desk band (its boom mic covered his face in every seated pose); Credentials has no cut-out in landscape (no free floor between copy and frames; phones keep it); Stack/Archive cut-outs stand at the right edge, partly out of frame, so no label is covered.
- **A5 QA:** 1440×900, 1280×720, 390×844: 0 console errors, 0 horizontal overflow, nothing clipped at chapter holds; mid-chapter beats checked (glance, stare, terminal, products playing on the monitor, graduation, crowd pull-back, envelopes, push-away, wink, eyes). Interactions: nav, rewind, scrub bar keys/click, drawer, Tab focus jumps, film modal, `#products` deep link, reduced-motion static page (each chapter = its last shot), index7/index8 unaffected. Timecode 2:57. First load ~1.07 MB (the five hero poses + next chapter).
