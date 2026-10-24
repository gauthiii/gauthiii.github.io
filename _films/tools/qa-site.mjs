// QA for index8.html: console errors + screenshots at scroll positions.
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
const total = await page.evaluate(() => document.documentElement.scrollHeight);
const vh = +h;
const marks = await page.evaluate(() => {
  const top = s => { const e = document.querySelector(s); return e ? e.getBoundingClientRect().top + scrollY : null; };
  return { hero: 0, forge: top("#f-forgeui"), mathra: top("#f-mathra"), inbox: top("#f-inboxpulse"), prixie: top("#f-prixie"), resonate: top("#f-resonate"), gos: top("#f-gos"), lab: top("#lab"), products: top("#products"), stack: top("#stack"), archive: top("#archive"), credits: top("#credits"), contact: top("#contact") };
});
const shots = [["00-load", 0], ["01-hero-35", vh * 0.7], ["02-hero-60", vh * 1.2], ["03-hero-90", vh * 1.85]];
for (const k of ["forge", "mathra", "inbox", "prixie", "resonate", "gos"]) {
  shots.push([`${k}-a`, marks[k] + vh * 0.3], [`${k}-b`, marks[k] + vh * 1.1], [`${k}-c`, marks[k] + vh * 2.0]);
}
for (const k of ["lab", "products", "stack", "archive"]) shots.push([k, marks[k] + 40]);
shots.push(["credits-a", marks.credits + vh * 0.4], ["credits-b", marks.credits + vh * 1.3], ["credits-c", marks.credits + vh * 2.3], ["contact", marks.contact]);

let i = 0;
for (const [name, y] of shots) {
  await page.evaluate(y => window.scrollTo(0, y), Math.max(0, Math.round(y)));
  await wait(1100);
  await page.screenshot({ path: path.join(out, `${String(i++).padStart(2, "0")}-${name}.jpg`), type: "jpeg", quality: 70 });
}
const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
fs.writeFileSync(path.join(out, "report.json"), JSON.stringify({ total, marks, overflow, errors }, null, 1));
console.log(JSON.stringify({ total, overflow, errors: errors.slice(0, 20) }, null, 1));
await browser.close();
