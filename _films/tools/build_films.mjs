// Generate the HyperFrames film compositions (film-<id>.html, film-reel.html) and sync site assets.
// The scenes are the site's own builders (../scenes/scenes.js), played by the root timeline.
// usage: node tools/build_films.mjs <reel|forgeui|mathra|inboxpulse|prixie|resonate|gos>
// Writes index.html for that one film (HyperFrames allows exactly one root composition per project).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SITE = path.resolve(ROOT, "..");
const WEB = path.join(ROOT, "assets/web");

// 1. Sync: scenes + shots into the project (HyperFrames serves the project directory only).
fs.rmSync(WEB, { recursive: true, force: true });
fs.mkdirSync(WEB, { recursive: true });
fs.cpSync(path.join(SITE, "scenes"), WEB, { recursive: true });
fs.cpSync(path.join(SITE, "media/shots"), path.join(WEB, "shots"), { recursive: true });
fs.cpSync(path.join(SITE, "media/hero"), path.join(WEB, "hero"), { recursive: true });

const GOS_SERIAL = fs.readFileSync(path.join(SITE, "media/shots/gos/serial-excerpt.txt"), "utf8")
  .split("\n").filter(Boolean);
const PICK = [0, 1, 2, 3, 4, 14, 16, 20, 22]; // same lines as the site (boot → FAT32 → framebuffer → desktop)
const serial = PICK.map(i => GOS_SERIAL[i]).filter(Boolean);

const FILMS = [
  { id: "forgeui", name: "ForgeUI", line: "Pick an industry, pick a style, export a running React app.", url: "github.com/gauthiii/saas-prototype" },
  { id: "mathra", name: "Mathra", line: "A Class 12 maths tutor grounded in the NCERT textbook.", url: "github.com/gauthiii/cbseAI" },
  { id: "inboxpulse", name: "InboxPulse", line: "A read-only Gmail dashboard that sorts mail into nine categories.", url: "github.com/gauthiii/inboxPulse" },
  { id: "prixie", name: "Prixie", line: "A real-time overlay that coaches you during conversations.", url: "github.com/gauthiii/prixie-model" },
  { id: "resonate", name: "Resonate", line: "Upload a song, reshape it, split it into stems.", url: "github.com/gauthiii/audio-studio" },
  { id: "gos", name: "gOS", line: "An x86_64 operating system written from scratch.", url: "github.com/gauthiii/gOS" },
];
const esc = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

const HEAD = (id, dur) => `<!doctype html>
<html lang="en" data-resolution="landscape">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=1920, height=1080" />
<script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
<script src="assets/web/scenes.js"></script>
<link rel="stylesheet" href="assets/web/scenes.css" />
<style>
  @font-face { font-family: 'Space Grotesk'; src: url('assets/fonts/SpaceGrotesk.ttf') format('truetype'); font-weight: 300 700; }
  @font-face { font-family: 'Inter'; src: url('assets/fonts/Inter.ttf') format('truetype'); font-weight: 100 900; }
  @font-face { font-family: 'JetBrains Mono'; src: url('assets/fonts/JetBrainsMono.ttf') format('truetype'); font-weight: 100 800; }
  :root{--display:"Space Grotesk",sans-serif;--body:Inter,sans-serif;--mono:"JetBrains Mono",monospace;--stage:#05070B;--surface:#0C1017;--surface-2:#111722;--line:rgba(242,245,249,.10);--line-2:rgba(242,245,249,.18);--ink:#F2F5F9;--ink-2:#8A94A6;--accent:#1f80ff;--accent-soft:rgba(31,128,255,.14)}
  *{margin:0;padding:0;box-sizing:border-box}
  html,body{width:1920px;height:1080px;overflow:hidden;background:#05070B;color:#F2F5F9;font-family:Inter,sans-serif}
  #root{position:relative;width:100%;height:100%;background:radial-gradient(50% 50% at 50% 55%,rgba(31,128,255,.10),transparent 70%),#05070B}
  .layer{position:absolute;inset:0;width:100%;height:100%}
  .card{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:28px;width:100%;height:100%;padding:120px 200px;text-align:center}
  .name{font-family:"Space Grotesk",sans-serif;font-weight:700;letter-spacing:-.04em;font-size:150px;line-height:.95}
  .name .ch{display:inline-block;white-space:pre}
  .line{font-family:"Space Grotesk",sans-serif;font-weight:500;font-size:46px;letter-spacing:-.02em;max-width:1300px;line-height:1.2}
  .line .w{display:inline-block}
  .by{font-size:34px;color:#8A94A6}
  .by b{color:#F2F5F9;font-weight:600}
  .url{font-family:"JetBrains Mono",monospace;font-size:30px;color:#1f80ff}
  .role{font-family:"JetBrains Mono",monospace;font-size:28px;letter-spacing:.16em;text-transform:uppercase;color:#8A94A6}
  .stagewrap{display:flex;align-items:center;justify-content:center;width:100%;height:100%;padding:80px 160px}
  .stagewrap .sc-root{width:1600px;height:920px}
  .stagewrap .sc-root .sc-device{width:min(100%,calc(900px * 1.6))}
  .stagewrap .sc-root:has(.sc-device[style*="16 / 9"]) .sc-device{width:min(100%,calc(900px * 16 / 9))}
  .stagewrap .sc-note,.stagewrap .sc-label-item{font-size:28px;padding:12px 24px}
  .stagewrap .sc-label{height:62px;min-width:320px}
  .stagewrap .sc-term{font-size:28px;padding:40px 44px}
  .poster{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:top;opacity:.2;filter:blur(8px)}
  .reel .sc-note{display:none}
  .stagewrap.lowered{padding:190px 160px 50px}
  .stagewrap.lowered .sc-root{height:840px}
  .stagewrap.lowered .sc-root .sc-device{width:min(100%,calc(820px * 1.6))}
  .stagewrap.lowered .sc-root:has(.sc-device[style*="16 / 9"]) .sc-device{width:min(100%,calc(820px * 16 / 9))}
  .lockup{position:absolute;left:160px;top:56px;display:flex;align-items:baseline;gap:28px}
  .lockup .n{font-family:"Space Grotesk",sans-serif;font-weight:700;font-size:56px;letter-spacing:-.03em}
  .lockup .l{font-size:30px;color:#c9d1dc;max-width:1180px}
  .dot{position:absolute;left:50%;top:50%;width:16px;height:16px;margin:-8px 0 0 -8px;border-radius:50%;background:#1f80ff;box-shadow:0 0 40px 12px rgba(31,128,255,.55)}
  .wire{position:absolute;left:50%;top:50%;width:1500px;height:660px;transform:translate(-50%,-50%);display:grid;grid-template-columns:repeat(3,1fr);gap:28px}
  .wire .win{position:relative;border-radius:16px;overflow:hidden}
  .wire .win img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:top}
  .wire svg{position:absolute;inset:0;width:100%;height:100%;overflow:visible}
  .wire rect{fill:none;stroke:rgba(242,245,249,.4);stroke-width:2;vector-effect:non-scaling-stroke}
</style>
</head>
<body>
<div id="root" class="${id === "film-reel" ? "reel" : ""}" data-composition-id="${id}" data-start="0" data-duration="${dur}" data-width="1920" data-height="1080">
`;

const splitChars = t => [...t].map(c => `<span class="ch">${esc(c)}</span>`).join("");
const splitWords = t => t.split(" ").map(w => `<span class="w">${esc(w)}</span>`).join(" ");

function flagshipFilm(f) {
  const id = `film-${f.id}`;
  return `${HEAD(id, 15)}
  <div id="title" class="layer clip" data-start="0" data-duration="15" data-track-index="1">
    <img class="poster" id="poster" src="assets/web/hero/${f.id}.webp" alt="" />
    <div class="card" style="position:relative"><h1 class="name">${splitChars(f.name)}</h1></div>
  </div>
  <div id="stage" class="layer clip" data-start="0" data-duration="15" data-track-index="2">
    <div class="stagewrap lowered"><div class="sc-root" id="scene"></div></div>
    <div class="lockup" id="lockup"><span class="n">${esc(f.name)}</span><span class="l">${esc(f.line)}</span></div>
  </div>
  <div id="end" class="layer clip" data-start="0" data-duration="15" data-track-index="3">
    <div class="card"><h2 class="name" style="font-size:120px">${esc(f.name)}</h2><p class="by">by <b>Gautham Vijayaraj</b></p><p class="url">${esc(f.url)}</p></div>
  </div>
</div>
<script>
  window.__timelines = window.__timelines || {};
  var tl = gsap.timeline({ paused: true });
  var scene = gsap.timeline({ paused: true });
  Scenes[${JSON.stringify(f.id)}](document.getElementById("scene"), scene, { base: "assets/web/shots/", serial: ${JSON.stringify(serial)} });
  // Frame 0 already shows the product, dimmed behind the title (social thumbnail).
  gsap.set("#stage", { opacity: 0.22, filter: "blur(6px)" });
  gsap.set("#lockup", { opacity: 0 });
  gsap.set("#end", { opacity: 0 });
  // Title (0–2.5 s): name per letter, line per word, blur 8px → 0.
  tl.from("#title .ch", { opacity: 0, y: 30, filter: "blur(8px)", duration: 0.7, ease: "expo.out", stagger: 0.04 }, 0.2);
  // Transition into the product: the title lifts away as the stage rises.
  tl.to("#title", { opacity: 0, y: -60, filter: "blur(10px)", duration: 0.5, ease: "power2.in" }, 2.2);
  tl.to("#poster", { opacity: 0, duration: 0.4 }, 2.2);
  tl.fromTo("#stage", { opacity: 0.22, filter: "blur(6px)", y: 40, scale: 0.97 }, { opacity: 1, filter: "blur(0px)", y: 0, scale: 1, duration: 0.6, ease: "expo.out" }, 2.35);
  // The name and line stay readable as a lockup for the whole product section.
  tl.fromTo("#lockup", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, 2.5);
  // The product (2.5–12 s): the site's scene timeline, played at real speed.
  tl.add(scene.tweenFromTo(0, Scenes.DURATION, { duration: 9.5, ease: "none" }), 2.5);
  // End card (12–15 s).
  tl.to("#stage", { opacity: 0, scale: 0.96, filter: "blur(8px)", duration: 0.5, ease: "power2.inOut" }, 12.3);
  tl.fromTo("#end", { opacity: 0 }, { opacity: 1, duration: 0.01 }, 12.5);
  tl.from("#end .name", { opacity: 0, y: 30, filter: "blur(8px)", duration: 0.7, ease: "expo.out" }, 12.55);
  tl.from("#end .by", { opacity: 0, y: 16, duration: 0.5, ease: "power3.out" }, 12.8);
  tl.from("#end .url", { opacity: 0, y: 12, duration: 0.5, ease: "power2.out" }, 12.75);
  // The end card holds to the last frame (closing lines need 2 s+ on screen).
  window.__timelines[${JSON.stringify(id)}] = tl;
</script>
</body>
</html>
`;
}

// The reel: point → wireframe → name → six products (3.5 s each, each scene's key range) → end card.
const REEL_RANGES = { forgeui: [1.8, 7.0], mathra: [3.0, 8.6], inboxpulse: [1.4, 7.9], prixie: [1.6, 7.4], resonate: [4.6, 9.5], gos: [0, 6.2] };
function reel() {
  const id = "film-reel";
  const layers = FILMS.map((f, i) => `  <div id="s${i}" class="layer clip" data-start="0" data-duration="30" data-track-index="${10 + i}">
    <div class="stagewrap"><div class="sc-root" id="scene${i}"></div></div>
    <p class="role" style="position:absolute;left:160px;bottom:40px;color:#F2F5F9;letter-spacing:.08em">${String(i + 1).padStart(2, "0")} · ${esc(f.name)}</p>
  </div>`).join("\n");
  return `${HEAD(id, 30)}
  <div id="intro" class="layer clip" data-start="0" data-duration="30" data-track-index="1">
    <span class="dot" id="dot"></span>
    <div class="wire" id="wire">${FILMS.map(f => `<div class="win"><img src="assets/web/hero/${f.id}.webp" alt="" /><svg preserveAspectRatio="none"><rect x="1" y="1" width="99%" height="99%" rx="16" pathLength="1"/></svg></div>`).join("")}</div>
    <div class="card" style="position:absolute;inset:0"><h1 class="name">${splitChars("Gautham Vijayaraj")}</h1><p class="role" id="role">AI Engineer</p></div>
  </div>
${layers}
  <div id="end" class="layer clip" data-start="0" data-duration="30" data-track-index="3">
    <div class="card"><h2 class="name" style="font-size:120px">Gautham Vijayaraj</h2><p class="role">AI Engineer</p><p class="url">gauthiii.github.io</p></div>
  </div>
</div>
<script>
  window.__timelines = window.__timelines || {};
  var tl = gsap.timeline({ paused: true });
  var ids = ${JSON.stringify(FILMS.map(f => f.id))};
  var ranges = ${JSON.stringify(REEL_RANGES)};
  gsap.set("#end", { opacity: 0 });
  gsap.set(".wire img", { opacity: 0 });
  gsap.set(".wire rect", { strokeDasharray: 1, strokeDashoffset: 1 });
  // 0–3 s: point, wireframe draws.
  tl.from("#dot", { scale: 0, duration: 0.6, ease: "expo.out" }, 0.2);
  tl.to(".wire rect", { strokeDashoffset: 0, duration: 1.1, ease: "power2.inOut", stagger: 0.12 }, 0.8);
  tl.to("#dot", { opacity: 0, scale: 0.4, duration: 0.4 }, 1.6);
  // 3–6 s: name per letter + role; the windows fill behind it.
  tl.from("#intro .ch", { opacity: 0, y: 30, filter: "blur(8px)", duration: 0.7, ease: "expo.out", stagger: 0.035 }, 3.0);
  tl.from("#role", { opacity: 0, y: 14, duration: 0.6, ease: "power3.out" }, 3.7);
  tl.to(".wire img", { opacity: 0.32, duration: 0.8, stagger: 0.08 }, 3.4);
  tl.to("#intro", { opacity: 0, scale: 1.04, filter: "blur(10px)", duration: 0.5, ease: "power2.in" }, 5.7);
  // 6–27 s: six products, 3.5 s each, cross-fading.
  ids.forEach(function (id, i) {
    var s = gsap.timeline({ paused: true });
    Scenes[id](document.getElementById("scene" + i), s, { base: "assets/web/shots/", serial: ${JSON.stringify(serial)} });
    var at = 6 + i * 3.5;
    gsap.set("#s" + i, { opacity: 0 });
    tl.fromTo("#s" + i, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.45, ease: "expo.out" }, at - 0.15);
    tl.add(s.tweenFromTo(ranges[id][0], ranges[id][1], { duration: 3.5, ease: "none" }), at);
    tl.to("#s" + i, { opacity: 0, duration: 0.3, ease: "power1.in" }, at + 3.3);
  });
  // 27–30 s: end card.
  tl.fromTo("#end", { opacity: 0 }, { opacity: 1, duration: 0.01 }, 27.0);
  tl.from("#end .name", { opacity: 0, y: 30, filter: "blur(8px)", duration: 0.7, ease: "expo.out" }, 27.05);
  tl.from("#end .role", { opacity: 0, y: 14, duration: 0.5, ease: "power3.out" }, 27.35);
  tl.from("#end .url", { opacity: 0, y: 12, duration: 0.5, ease: "power2.out" }, 27.45);
  window.__timelines[${JSON.stringify(id)}] = tl;
</script>
</body>
</html>
`;
}

const which = process.argv[2] || "reel";
const film = which === "reel" ? reel() : flagshipFilm(FILMS.find(f => f.id === which) || (() => { throw new Error(`unknown film: ${which}`); })());
for (const f of fs.readdirSync(ROOT)) if (/^film-.*\.html$/.test(f)) fs.rmSync(path.join(ROOT, f));
fs.writeFileSync(path.join(ROOT, "index.html"), film);
console.log(`index.html = film-${which} | serial lines: ${serial.length}`);
