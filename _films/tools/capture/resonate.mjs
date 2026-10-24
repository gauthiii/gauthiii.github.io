// Resonate (audio-studio): real FastAPI backend (librosa analysis + Demucs htdemucs stems, all local) + real UI.
// Track: an Apple royalty-free jingle mixed with Kokoro TTS lines, so the vocals stem has real content.
// usage: node tools/capture/resonate.mjs
import path from "node:path";
import { fileURLToPath } from "node:url";
import { launch, newPage, settle, shooter, serve, wait } from "./lib.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const APP = "/Users/gauthamsmacbook/Apps/React Apps/Claude Apps/audio-studio";
const TRACK = path.join(HERE, "Night-Drive-demo.mp3");
const PORT = 5307;

const api = await serve(`${APP}/backend/.venv/bin/uvicorn`, ["app.main:app", "--host", "127.0.0.1", "--port", "8000"], { cwd: `${APP}/backend`, url: "http://127.0.0.1:8000/api/health" });
const web = await serve("npx", ["vite", "--port", String(PORT), "--strictPort", "--host", "127.0.0.1"], { cwd: `${APP}/frontend`, url: `http://127.0.0.1:${PORT}/` });
const browser = await launch();
const shot = shooter("resonate");
const clickText = (page, t) => page.evaluate(t => { const b = [...document.querySelectorAll("button")].find(b => b.textContent.trim().startsWith(t)); b?.click(); return Boolean(b); }, t);
try {
  const page = await newPage(browser, { width: 1440, height: 900 });
  await page.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: "networkidle2" });
  await settle(page, 1500);
  await shot(page, "01-upload");

  await (await page.$("input[type=file]")).uploadFile(TRACK);
  await page.waitForFunction(() => [...document.querySelectorAll("button")].some(b => b.textContent.includes("Split audio")), { timeout: 180000 });
  await settle(page, 2500);
  await shot(page, "02-analysis");

  await page.evaluate(() => document.querySelector('[role=radiogroup] [role=radio]:nth-child(9)')?.click()); // +2 semitones
  await wait(2500);
  await shot(page, "03-pitch");

  await clickText(page, "Split audio");
  await wait(1500);
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await wait(500);
  await shot(page, "04-splitting");

  const t0 = Date.now();
  await page.waitForFunction(() => /Play stems/.test(document.body.innerText), { timeout: 20 * 60000, polling: 2000 });
  console.log(`stems ready in ${Math.round((Date.now() - t0) / 1000)} s`);
  await settle(page, 3000);
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await wait(600);
  await shot(page, "05-stems");

  // Mute drums, solo vocals: the mixer's own buttons.
  await page.evaluate(() => {
    const rows = [...document.querySelectorAll("button")].filter(b => /^(M|Mute)$/i.test(b.textContent.trim()) || b.getAttribute("title") === "Mute");
    rows[1]?.click();
  });
  await wait(800);
  await shot(page, "06-mixer");
  await page.evaluate(() => window.scrollTo(0, 0));
  await wait(500);
  await shot(page, "07-top");
} finally {
  await browser.close();
  web.stop();
  api.stop();
}
console.log("resonate: done");
