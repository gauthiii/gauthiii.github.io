# GPT / Codex tasks — story film, batch 2: in-between frames

Context: `_plan/STORY_PLAN.md`, batch 1 in `GPT_STORY_TASKS.md` (all 63 delivered). The film now moves between still
poses with code (cross-fade + settle + motion blur, breathing, sway). These frames replace the biggest jumps with true
in-betweens, so the motion reads as animation instead of a cut.

Work from the repo root `gauthiii.github.io/`. Save every file at the exact path given (PNG). Use the same shared blocks
as batch 1 — **[STYLE] [CHARACTER] [LIGHT] [CUTOUT] [NO]** — copied verbatim from `GPT_STORY_TASKS.md`.

## Rules for every in-between (read first)

1. **Edit, don't regenerate.** Open the named base image in the editor and change only what the row says.
   Canvas size, framing, scale, the position of the waist/bottom edge, lighting, outfit and transparency must match
   the base exactly, so frames can be stacked on the same spot.
2. Attach `media/story-src/ref/character-sheet.png` and the base image to every edit.
3. Each row is one frame of a sequence; keep the motion small and even between consecutive frames.
4. No text anywhere. Transparent background (or flat #00FF00 if transparency is unavailable).
5. Canvas: 1024×1536 unless stated.

## B1 — Blink (base `cast/hello-neutral.png`)

| File (`media/story-src/cast2/…`) | Change only |
|---|---|
| `blink-1.png` | Eyelids half closed. |
| `blink-2.png` | Eyelids nearly closed (a thin line of eye visible). |

(`hello-blink.png` from batch 1 is the fully closed frame.)

## B2 — Smile build (base `cast/hello-neutral.png`)

| File | Change only |
|---|---|
| `smile-1.png` | The faintest smile: mouth corners lifted slightly, eyes unchanged. |
| `smile-2.png` | A half smile, cheeks lifting a little, eyes starting to narrow. |

(`hello-smile.png` is the full smile.)

## B3 — Head turn to the glance (base `cast/hello-neutral.png`)

| File | Change only |
|---|---|
| `turn-1.png` | Head turned about 10° toward camera-right, eyes leading the turn. Neck and earphone cable follow naturally. |
| `turn-2.png` | Head turned about 20° toward camera-right, slight smile starting. |

(`glance.png` is the end of the turn at about 30°.)

## B4 — Walk cycle (base `cast/era-2023.png`)

Four frames of one walking step toward camera-right, three-quarter body, same scale and same bottom edge as the base.
| File | Change only |
|---|---|
| `walk-1.png` | Contact: front (right) foot just landing, arms swinging opposite. |
| `walk-2.png` | Down: weight on the front leg, body slightly lower. |
| `walk-3.png` | Passing: legs crossing under the body, body at its highest. |
| `walk-4.png` | Up: back leg pushing off, the other arm forward. |

## B5 — Laptop: lift → open → type (bases as named)

| File | Base | Change only |
|---|---|---|
| `laptop-1.png` | `cast/laptop-lift.png` | Laptop lowered halfway toward desk height, still closed. |
| `laptop-2.png` | `cast/laptop-open.png` | Lid half open (about 45°), hands on the lid edge. |
| `laptop-3.png` | `cast/laptop-open.png` | Lid fully open, hands moving to the keyboard, smile fading into focus. |

## B6 — The offers sweep (base `cast/unbothered.png` → `cast/push-away.png`)

| File | Base | Change only |
|---|---|---|
| `sweep-1.png` | `cast/unbothered.png` | Eyes open, hands coming down from behind his head. |
| `sweep-2.png` | `cast/push-away.png` | Arm at the start of the sweep, hand near his body at desk height. |

## B7 — Crowd turn (new, landscape 1536×1024, transparent)

| File | Prompt line |
|---|---|
| `crowd-me-1.png` | Small figure (about 15% of the canvas height) of the same character in the black graduation gown and cap from `cast/grad-proud.png`, seen from behind among nothing else, starting to turn his head over his shoulder toward the camera. |
| `crowd-me-2.png` | Same small figure turned fully toward the camera, diploma raised, grinning. |

## B8 — Wink build (base `cast/wink.png`)

| File | Change only |
|---|---|
| `wink-0.png` | Both eyes open, the same smirk starting. |
| `wink-1.png` | Left eye half closed. |

## Delivery

Save under `media/story-src/cast2/`. Write `_plan/GPT_STORY_ASSETS_2.md`: every file, the base image used, whether
transparency or green-screen was used, and an overlay check (outside the changed region the frame should match its base).
Do not edit HTML, CSS or JS. Do not commit.

**Total: 19 frames** (B1 2 · B2 2 · B3 2 · B4 4 · B5 3 · B6 2 · B7 2 · B8 2). Batch-1 images serve as the start/end frames of each sequence.

After delivery, Claude encodes them with `_films/tools/story/encode_story.py`, measures trims, and swaps each code
cross-fade for the real frame sequence on the timeline (blink, smile, head turn, walk, laptop, sweep, crowd turn, wink).
