// QA for index.html (the story film): console errors + a screenshot at every chapter hold and mid-transition.
// usage: node tools/qa-site.mjs <outDir> [width height]   (serve the repo on :5400 first)
import fs from "node:fs";
import path from "node:path";
import { launch, wait } from "./capture/lib.mjs";

const [out, w = "1440", h = "900"] = process.argv.slice(2);
fs.mkdirSync(out, { recursive: true });
const browser = await launch();
const page = await browser.newPage();
await page.setViewport({ width: +w, height: +h, deviceScaleFactor: 1 });
const errors = [];
page.on("console", m => { if (["error", "warning"].includes(m.type())) errors.push(`${m.type()}: ${m.text()}`); });
page.on("pageerror", e => errors.push(`pageerror: ${e.message}`));
page.on("requestfailed", r => errors.push(`requestfailed: ${r.url()} ${r.failure()?.errorText}`));
page.on("response", r => { if (r.status() >= 400) errors.push(`http ${r.status()}: ${r.url()}`); });

await page.goto("http://127.0.0.1:5400/index.html", { waitUntil: "networkidle0", timeout: 60000 });
await wait(2200);
const reel = await page.evaluate(() => window.__reel && { duration: window.__reel.duration, chapters: window.__reel.chapters });
if (!reel) { console.log(JSON.stringify({ error: "reel did not start", errors }, null, 1)); process.exit(1); }
const firstLoadKB = await page.evaluate(() => Math.round(performance.getEntriesByType("resource").reduce((s, r) => s + (r.transferSize || 0), 0) / 1024));

// jump the playhead (the film has no page scroll), then let lazy images land
const shot = async (name, time) => {
  await page.evaluate(t => window.__reel.jump(t), time);
  await wait(900);
  const info = await page.evaluate(() => {
    const on = document.querySelector(".ch.on");
    const clip = [];
    if (on) on.querySelectorAll("h2,h3,.btn,.jr-lines li,.cert,.arch-row,.stack-row").forEach(n => {
      const r = n.getBoundingClientRect(), s = getComputedStyle(n);
      if (+s.opacity > 0.5 && r.width && (r.bottom > innerHeight - 4 || r.top < 0)) clip.push((n.textContent || "").trim().slice(0, 40));
    });
    return { on: on && on.id, clip };
  });
  await page.screenshot({ path: path.join(out, `${name}.jpg`), type: "jpeg", quality: 70 });
  return info;
};

const report = [];
let i = 0;
for (const c of reel.chapters) {
  const n = String(i++).padStart(2, "0");
  report.push({ shot: `${n}-${c.id}`, ...(await shot(`${n}-${c.id}`, c.at)) });
  if (c.b != null) report.push({ shot: `${n}-${c.id}-out`, ...(await shot(`${n}-${c.id}-out`, c.b - 0.45)) });
}
// scrub backwards a long way to confirm the reel rewinds cleanly
report.push({ shot: "zz-rewind-hero", ...(await shot("zz-rewind-hero", 0.2)) });
const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
const result = { duration: reel.duration, chapters: reel.chapters.length, firstLoadKB, overflow, clipped: report.filter(r => r.clip.length), errors };
fs.writeFileSync(path.join(out, "report.json"), JSON.stringify({ ...result, report }, null, 1));
console.log(JSON.stringify(result, null, 1));
await browser.close();
