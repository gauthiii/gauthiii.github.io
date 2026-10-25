# Portfolio rebuild — plan (approved decisions, 2026-10-24)

Goal: replace the 1960vh cartoon scroll story with a modern, product-led portfolio whose sections are
HyperFrames-style compositions (paused GSAP timelines) scrubbed by scroll on the live site, and rendered to
silent MP4 films with the HyperFrames CLI from the same scene code.

## 1. Diagnosis of the current index.html

| # | Problem | Where |
|---|---|---|
| 1 | Hero is `height:1960vh`: ~20 screens of scrolling before any work is visible | index.html:92 |
| 2 | Cartoon avatar is the centrepiece; clashes with a product-led AI-engineer message | index.html:826-833 |
| 3 | Decorative fake UI (deploy.log, Claude Code/Codex panel, GRC table, "$5 Visa credit") is not proof of real work | index.html:852-923, 1195 |
| 4 | 15 near-identical AI infographic thumbnails, 2–3 MB PNG each | p1.png … p15.png |
| 5 | Mono, uppercase, letter-spaced micro-labels everywhere: no type hierarchy | whole file |
| 6 | Capabilities = 8-slide arrow carousel of CSS-drawn boxes | index.html:1171-1387 |
| 7 | Unpinned CDN (`unpkg.com/splitting` without version), Font Awesome kit, newest work (ForgeUI, gOS, Mathra…) missing | index.html:21-25 |

## 2. Decision log

| Topic | Decision |
|---|---|
| HyperFrames use | Live scroll-scrubbed compositions on the site + same scene code rendered to MP4 |
| Avatar | Retired (story/frame*.webp no longer used by the new page) |
| Joke credit beat | Kept verbatim; staged as typographic end credits right before Contact; no image |
| Look | Dark stage `#05070B`, single accent `#1f80ff`, ink `#F2F5F9`, ink-2 `#8A94A6`; Space Grotesk (display), Inter (body), JetBrains Mono (code only) |
| Hero copy | "Hi, I'm Gautham." → "I build AI systems that actually work." Role line: **AI Engineer** |
| Page title | `Gautham Vijayaraj — AI Engineer` |
| Flagships (scene + film) | ForgeUI, Mathra, InboxPulse, Prixie, Resonate, gOS |
| Agent Lab | The 6 A2A/MCP repos grouped into one interactive graph |
| More products tier | PDFcraft, GlobalStocks, CognaBite, Playlist Bridge (no link), Watch Party: capture cards + silent loop clip, no film |
| Archive | The 9 remaining current-site projects as compact rows |
| Experience | From Resume_Gautham_2026.pdf: 5 roles, résumé wording, first 3 bullets + "Show all"; clients named as on the résumé. The old site's ASU AI Lead role is not on the résumé, so it is not shown |
| Résumé PDF | Published as `Resumes/Gautham_Vijayaraj_Resume_2026.pdf`, linked from header, Experience and Contact |
| Education + certifications | Added (2 degrees, 7 certifications with verify links); Stack mirrors the résumé's 7 skill groups |
| Role line | Stays "AI Engineer" (user decision, 2026-10-24) |
| Footage | Claude runs each app locally and captures it. Fictional data (no labels) for InboxPulse, Playlist Bridge, Watch Party. **No paid API calls**: any LLM output on screen is fictional text |
| Prixie | The real PyQt6 overlay (`prixie/overlay.py`) rendered offscreen and fed fictional coaching lines through its own signals: no mic, no API calls |
| GlobalStocks | Live market data (corsproxy.io now returns 401, so captures fetch the same Yahoo URL directly). The AI-analysis panel is not shown: fictional analysis of real tickers would read as financial claims |
| Films | Silent, 30 fps, 1920×1080: one 30 s hero reel + six 15 s flagship films |
| Build | Static HTML + GSAP 3.14.2 + ScrollTrigger + Lenis 1.3.25, no build step, as `index8.html`, then swapped on approval: new page → `index.html`, previous page → `index8.html` (`index7.html` untouched) |
| GPT tasks | OG card, GV monogram, 6 cover stills, Codex review pass (see GPT_TASKS.md) |
| Whole-page reel (R1, 2026-10-24) | The entire page is one reel: one sticky full-screen stage, one master GSAP timeline scrubbed by scroll (down = forward, up = rewind), free scrub with reading holds |
| Reel story order | Chronological: Hello → 2017 SRM → 2021 TCS → 2023 ASU (+ 2024 HCLTech) → 2025 Reveille → 2025 Santan AI Engineer → 2026 AI Security Engineer → Work → 6 flagships → Agent Lab → More products → Stack → Credentials → Archive → Credits → Contact (21 chapters, ~2:30 timecode) |
| Reel captions | Résumé facts only (dates, role, company, city, 1–3 condensed bullets); no invented narration. Other chapters reuse the existing site lines |
| Reel detail | Headlines + subtexts on stage; a "Details" drawer holds full résumé bullets, stack, certifications (with verify links) and archive (with demo/video links) |
| Reel UI | Bottom scrub bar: chapter ticks, timecode, chapter name; click/drag to seek, arrow keys step chapters; nav links and keyboard focus jump to the chapter |
| Films after R1 | "Watch the 30 s reel" button removed (the page is the reel); each flagship keeps "Play film". `media/films/reel.mp4` stays in the repo, unlinked |
| Mobile | Same reel, stacked phone layouts |
| R2 story film (2026-10-24) | Character-led reel: the old studio character (new GPT art, layered 2.5D) narrates every chapter; real captures play on in-world screens; jokes as visual gags. Full plan: `STORY_PLAN.md`; GPT prompts: `GPT_STORY_TASKS.md`; GPT handoff: `GPT_STORY_ASSETS.md`. Built 2026-10-24 (see STORY_PLAN §8) |

## 3. Architecture

```
gauthiii.github.io/
├── index8.html              new page (promoted to index.html on approval)
├── scenes/                  shared scene builders: build(stage, tl) → used by site AND films
│   ├── hero.js  forgeui.js  mathra.js  inboxpulse.js  prixie.js  resonate.js  gos.js
├── media/
│   ├── shots/<id>/*.webp    real captures, 2400w, q80
│   ├── loops/<id>.mp4       5 "more products" loops, 1280w H.264, muted, 6–8 s, + .webp poster
│   ├── films/<id>.mp4       7 rendered films, H.264 CRF 23, faststart, ≤ 8 MB each
│   ├── covers/<id>.webp     GPT cover stills (film posters, reduced-motion stills)
│   ├── brand/               GV mark + favicons
│   └── og/og-card.png
├── _films/                  HyperFrames project (Jekyll-ignored), renders/ gitignored
│   ├── index.html  compositions/*.html  tools/capture/*.mjs  tools/sync_scenes.mjs
└── _plan/                   this plan, GPT tasks, Codex review (Jekyll-ignored)
```

Scrub mechanics (site): each scene section is pinned; `ScrollTrigger({scrub:true, onUpdate: s => tl.progress(s.progress)})`
drives the scene's paused timeline, the same way HyperFrames seeks it frame by frame when rendering.
Rules shared with HyperFrames: deterministic timelines only (no `Math.random`, no `Date.now`), one paused
timeline per scene.

Fallbacks: `prefers-reduced-motion` and no-JS show a static layout (cover still + copy per project).
Mobile (≤ 760px): scenes shorten to 140vh, stage stacks under copy, 3D wall becomes a horizontal swipe row.

Budgets: LCP < 2.5 s on 4G; first-load transfer < 1.5 MB (films, loops and below-fold shots lazy);
CLS 0; no console errors.

## 4. Page map and content

### 0. Header
GV monogram (left) · nav: Work · Products · Stack · Contact (right). Hidden on scroll down, shown on scroll up.

### 1. Hero (pinned, 300vh)
- On load (not scroll-tied): a blue point at centre → "Hi, I'm Gautham." letter by letter (blur 8px → 0, expo.out)
  → "I build AI systems that actually work." word by word → "AI Engineer" (mono, ink-2).
- Scroll 0–35%: thin white strokes draw a 3×2 wireframe of six app windows behind the type.
- 35–70%: the windows fill with the six flagship captures under a diagonal light sweep.
- 70–100%: the grid tilts into a 3D wall (rotateX 55°, rotateZ −12°) and drifts into the Work section.

### 2. Work intro
Eyebrow "Selected work" · heading "Six products, built end to end." · 01–06 index rail.

### 3. Flagship scenes (each pinned 220vh; copy column + composition stage)
Each has: index (01/06), name, one line, three facts, stack chips, links, "Play film" (modal, MP4).

| # | Project | One line | Facts (source: project README) | Stage composition | Links |
|---|---|---|---|---|---|
| 01 | ForgeUI | Pick an industry, pick a style, export a running React app. | 23 industries · 69 sub-categories · 92 templates / 16 design styles, restyled live / Exports a Vite + React + TS project and a PPTX walkthrough deck | Real dashboard capture; each scroll step = diagonal clip-path wipe to the next real style capture (Modern → Glassmorphism → Neo-Brutalism → Cyber → Aurora → Liquid Glass) with its name label | github.com/gauthiii/saas-prototype · gauthiii.github.io/saas-prototype |
| 02 | Mathra | A Class 12 maths tutor grounded in the NCERT textbook. | An MCP server with 19 context tools: all 13 NCERT chapters, appendices and answer keys / Claude by default, switchable to GPT or Gemini / Streams step-by-step answers with KaTeX math | Real chat UI capture: a question types in → tool-call chip (e.g. `matrices`) lights → chapter context slides in → a correct worked answer streams (fictional text, mathematically correct) | github.com/gauthiii/cbseAI |
| 03 | InboxPulse | A read-only Gmail dashboard that sorts mail into nine categories. | Strictly read-only `gmail.readonly` scope / Hybrid rules + LLM pipeline, live Claude ⇄ OpenAI toggle / Mail stays in local SQLite; tokens AES-256-GCM encrypted | Real dashboard with fictional emails: mails fly in, rules pass, then LLM pass, nine category counters tick up | github.com/gauthiii/inboxPulse |
| 04 | Prixie | A real-time overlay that coaches you during conversations. | Local Whisper ⇄ Google Speech transcription / Streams coaching from Claude: jargon, replies, tone checks / Say "Prixie, …" to switch to direct-advisor mode | Frames of the real overlay: transcript lines appear, coaching cards stream in, the "Prixie, …" trigger flips the mode badge | github.com/gauthiii/prixie-model |
| 05 | Resonate | Upload a song, reshape it, split it into stems. | Instant BPM and key/scale analysis (librosa) / Tempo and pitch via Rubber Band / 4 AI stems with Demucs: vocals, drums, bass, other | Real waveform capture; BPM/key readout counts in; the waveform splits into four stem lanes; mute/solo toggles light | github.com/gauthiii/audio-studio |
| 06 | gOS | An x86_64 operating system written from scratch. | UEFI boot via Limine into a higher-half 64-bit kernel / Own compositor, FAT32 and ATA PIO drivers, all hand-written / Ring 3, ELF64 loader, preemptive round-robin scheduling | Real QEMU boot capture: `make run` terminal → desktop → File Manager → text editor → windows drag/maximize | github.com/gauthiii/gOS |

### 4. Agent Lab
Heading "Agent Lab — A2A and MCP experiments." SVG node graph: centre node "MCP / A2A", six project nodes
(Reddit Insights, Vacation Planner, Currency & Stocks, Amazon Product Analysis, Multi-Server MCP, Agentic Research).
Hover/tap a node → card with its existing description, details and repo link (text from current `projects` array).

### 5. More products
Heading "More things I've shipped." Five cards; the loop plays when the card is in view (muted, playsinline).

| Project | One line (source: README) | Footage | Link |
|---|---|---|---|
| PDFcraft | A PDF studio that runs entirely in the browser. | Real app: reorder, rotate, split | github.com/gauthiii/pdfCraft |
| GlobalStocks | A US + India portfolio dashboard with AI research notes. | Real dashboard; research note text fictional | github.com/gauthiii/globalStocks |
| CognaBite | An AI agent layer for multi-channel restaurant operations. | Real dashboard (ships with its own mock data) | github.com/gauthiii/cognaBite |
| Playlist Bridge | Move playlists between Spotify and YouTube, with a review step. | Real UI, fictional playlists | none |
| Watch Party | Synced Netflix playback with chat, for friends on their own accounts. | Real sidebar UI next to a dark stand-in player with a fictional title | github.com/gauthiii/netflix-party-extension |

### 6. Stack
Four rows (no carousel): AI & agents · Data & ML · Backend · Frontend & delivery, items taken from the current `skills` data.

### 7. Experience: paused until the updated résumé arrives.

### 8. Archive
Compact rows (title · one line · tags · GitHub/demo/video icons), no images: Document Intelligence with AWS Bedrock,
Serverless Blog Generator, Content Summarization Tool, Customer Purchase Prediction (ANN), Multi-Agent Startup Copilot,
Automated Image Captioning (BLIP), F1 Safety Evolution Visualization, Twitter Sentiment Analysis, Music Recommendation System.

### 9. End credits (joke beat, verbatim)
Full-bleed dark stage, film-credit typography, each block word by word with a blur-in on scroll:
1. kicker "Academic credit": "I have a Master's Degree from ASU." / "Well... who doesn't?"
2. kicker "Recruiting credit": "Google tried to offer me $300k annual package . Open AI tried to poach me for 600k. And I said no."
3. "If you wanna buy more bullshit like that, Let's Talk."

### 10. Contact
"Let's build something." · Email gvofficial99@gmail.com · GitHub · LinkedIn.

### 11. Footer
© year Gautham Vijayaraj · link to the classic site (index6.html).

## 5. Films (HyperFrames 0.8.185, silent, 1920×1080, 30 fps)

| Film | Length | Shots |
|---|---|---|
| reel | 30 s | 0–3 point + wireframe · 3–6 "Gautham Vijayaraj" + "AI Engineer" · 6–27 six flagships, 3.5 s each, using each scene's key beat · 27–30 end card: name, role, gauthiii.github.io |
| forgeui · mathra · inboxpulse · prixie · resonate · gos | 15 s each | 0–2.5 name + one line · 2.5–12 the scene's composition at full length · 12–15 end card: name, "by Gautham Vijayaraj", repo URL |

Motion grammar (from the reference films): arrivals expo.out 0.5–0.8 s; text per letter/word blur 8px → 0;
camera moves power2.inOut; style changes = diagonal clip-path wipe 0.28 s with a 2px accent edge; landed text holds still.
QA: `npm run check` 0 errors; snapshots at every beat read before render.

## 6. Task split

### User
- U1 Send the updated résumé (unblocks Experience + Résumé button).
- U2 Run GPT/Codex tasks G1–G3 now (prompts in GPT_TASKS.md); G4 after C6.
- U3 Approve index8.html before promotion; approve the commit.

### GPT / Codex (exact prompts in GPT_TASKS.md)
- G1 OG share card → `media/og/og-card.png`
- G2 GV monogram → `media/brand/gv-mark.png`
- G3 Six cover stills → `media/covers/<id>.png`
- G4 Codex review of index8.html → `_plan/CODEX_REVIEW.md`

### Claude
- C0 Scaffold `_plan/`, `_films/`, `scenes/`, `media/`; `.gitignore` for renders.
- C1 Capture all 11 apps (Playwright for web apps, QEMU for gOS, HTML rebuild for Prixie and the Watch Party sidebar), fictional seed data where decided.
- C2 Encode web assets (webp shots, mp4 loops, posters).
- C3 index8.html shell: tokens, type, Lenis, header, hero, reduced-motion, mobile.
- C4 Six flagship scenes, Agent Lab, More products, Stack, Archive, End credits, Contact.
- C5 HyperFrames films: compositions, check, snapshot QA, render, web encode.
- C6 QA in Chrome at 1440, 1024, 390 px; reduced motion; console; transfer budget.
- C7 Integrate G1–G3; fix G4 findings.
- C8 Promote and commit (only after U3).

## 7. Status (2026-10-24)

| Step | State | Notes |
|---|---|---|
| C0 Scaffold | done | `_films/` (HyperFrames 0.8.185, DESIGN.md), `scenes/`, `media/`, `.gitignore` |
| C1 Captures | done | Scripts in `_films/tools/capture/` (re-runnable). Fictional data: InboxPulse mailbox, Playlist Bridge library, Watch Party chat + "The Long Light" stand-in clip, Mathra/Prixie text. No paid API calls. Resonate stems are real Demucs output (local). gOS boot log is verbatim from a fresh QEMU boot |
| C2 Web assets | done | `bash _films/tools/encode.sh` → `media/shots`, `media/loops`, `media/hero` (~3.7 MB, lazy) |
| C3/C4 Site | done | `index8.html` + `scenes/scenes.js` + `scenes/scenes.css`. QA: 0 console errors, 0 failed requests, 0 horizontal overflow at 1440 and 390, reduced-motion static layout verified |
| C5 Films | done | `bash _films/tools/render_all.sh` → `media/films/*.mp4` + posters. `npm run check`: 0 errors per film |
| C6 QA | done | 1440 + 390: 0 errors, 0 overflow; first load 682 KB / 17 requests (scene frames lazy); film modal opens/plays/closes by keyboard with focus return |
| C7 GPT assets / Codex review | done | Favicons (16/32/180/512 on a dark tile), GV mark in header, OG card (`media/og/og-card.jpg`, 101 KB), cover stills as film posters. All 4 Codex findings fixed and verified (see CODEX_REVIEW.md) |
| C8 Promote + commit | done | Swapped: the new page is `index.html`, the previous "Built Different" page is now `index8.html`; `index7.html` untouched. Lean commit on main (raw captures + GPT PNG originals gitignored), no co-author line, not pushed |

| R1 Whole-page reel | done | `index.html` rebuilt as one stage + one master timeline (`window.__reel` exposes chapters for QA). Scene images load per chapter (`Scenes.lazy` → `data-src`). QA (`_films/tools/qa-site.mjs`) at 1440×900, 1280×720, 390×844: 0 errors, 0 overflow, nothing clipped at any chapter hold; first load ~191 KB. Verified: rewind, nav jumps, hash deep links, scrub bar click/keys, focus jumps, details drawer, film modal, reduced-motion static page (final frames), films `check` still passes |

Accepted HyperFrames warnings: `nested_structure_needs_subcomposition` (Studio timeline display only), `film_silent` (silent by decision), `line_unread` on per-letter names (each name is one word).

Found during the build (not fixed — outside this repo):
- GlobalStocks: `corsproxy.io` now returns 401, so the deployed app likely shows "N/A" prices.
- Playlist Bridge: `font-sans` uses `var(--font-geist-sans)`, which the layout never defines → text falls back to Times.
- gOS: the current `disk_images/gos_disk.img` logs "failed to decode WALLPAPR.BMP" and uses the gradient fallback.
