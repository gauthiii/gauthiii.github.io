// Watch Party: the real unpacked extension in two Chrome for Testing instances (two people),
// joined to one room on the local relay, playing a fictional stand-in clip on the repo's /test bench.
// Branded Chrome 137+ ignores --load-extension, hence Chrome for Testing.
// usage: node tools/capture/watchparty.mjs
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";
import { serve, wait, SHOTS } from "./lib.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO = "/Users/gauthamsmacbook/Apps/React Apps/Claude Apps/netflix-party-extension";
const EXT = `${REPO}/extension`;
const CFT = path.join(os.homedir(), ".cache/puppeteer/chrome/mac_arm-149.0.7827.22/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing");
const CLIP = path.join(HERE, "standin.mp4");
const ROOM = "HARBOR";
const OUT = path.join(SHOTS, "watchparty");
fs.mkdirSync(OUT, { recursive: true });

async function person(name, { width, height, scale }) {
  const browser = await puppeteer.launch({
    executablePath: CFT,
    headless: true,
    ignoreDefaultArgs: ["--disable-extensions"],
    args: [`--disable-extensions-except=${EXT}`, `--load-extension=${EXT}`, "--hide-scrollbars", "--autoplay-policy=no-user-gesture-required"],
    userDataDir: fs.mkdtempSync(path.join(os.tmpdir(), "wp-")),
  });
  const sw = await browser.waitForTarget(t => t.type() === "service_worker" && t.url().startsWith("chrome-extension://"), { timeout: 20000 });
  const extId = new URL(sw.url()).host;

  const page = await browser.newPage();
  await page.setViewport({ width, height, deviceScaleFactor: scale });
  await page.goto("http://localhost:8080/test", { waitUntil: "networkidle2" });
  await (await page.$("#file")).uploadFile(CLIP);
  // Present the test bench as a plain full-window player (page styling only; the extension UI is untouched).
  await page.addStyleTag({ content: "body{background:#000!important;margin:0}h1,.sub,.readout,.card:nth-of-type(2){display:none!important}.wrap{max-width:none!important;margin:0!important;padding:0!important}.card{border:0!important;padding:0!important;margin:0!important;background:#000!important}#v{position:fixed;top:0;left:0;bottom:0;width:calc(100vw - 336px);height:100vh;object-fit:cover;background:#000}" });
  await wait(800);

  const popup = await browser.newPage();
  await popup.goto(`chrome-extension://${extId}/src/popup.html`, { waitUntil: "domcontentloaded" });
  await wait(500);
  await popup.$eval("#name", (el, v) => (el.value = v), name);
  await popup.$eval("#server", el => (el.value = "ws://localhost:8080"));
  await popup.$eval("#room", (el, v) => (el.value = v), ROOM);
  await popup.click("#join");
  await wait(1500);
  await popup.close();
  await page.bringToFront();
  return { browser, page };
}

const inShadow = (page, fn, ...args) =>
  page.evaluate((src, ...a) => {
    const root = document.querySelector("#watch-party-root")?.shadowRoot;
    return root ? new Function("root", "args", src)(root, a) : null;
  }, fn, ...args);
const say = (page, text) =>
  inShadow(page, `const t = root.querySelector("textarea"); t.value = args[0]; t.dispatchEvent(new Event("input", { bubbles: true })); root.querySelector(".np-send").click();`, text);
const react = (page, i) => inShadow(page, `root.querySelectorAll(".np-reacts button")[args[0]]?.click();`, i);
const openPanel = page => inShadow(page, `const p = root.querySelector(".np-panel"); if (!p || !p.classList.contains("open")) root.querySelector(".np-fab")?.click();`);

const relay = await serve("node", ["server.js"], { cwd: `${REPO}/server`, url: "http://localhost:8080/health" });
let a, b;
try {
  a = await person("Maya", { width: 1440, height: 900, scale: 1 });
  b = await person("Tomás", { width: 1280, height: 800, scale: 1 });
  await openPanel(a.page);
  await openPanel(b.page);
  await wait(800);

  const rec = await a.page.screencast({ path: path.join(OUT, "loop-raw.webm") });
  await wait(700);
  await a.page.evaluate(() => document.querySelector("#v").play());
  await wait(1200);
  await say(b.page, "ok it's playing on mine too 🍿");
  await wait(1100);
  await say(a.page, "perfectly in sync. no 3-2-1 countdown needed");
  await wait(1000);
  await react(b.page, 2);
  await wait(900);
  await a.page.evaluate(() => { const v = document.querySelector("#v"); v.currentTime = 18; });
  await wait(1200);
  await say(b.page, "wait you skipped the intro 😭");
  await wait(1100);
  await react(a.page, 0);
  await wait(1200);
  await rec.stop();

  await a.page.screenshot({ path: path.join(OUT, "still-1x.png") });
  await b.page.screenshot({ path: path.join(OUT, "peer-1x.png") });
} finally {
  await a?.browser.close();
  await b?.browser.close();
  relay.stop();
}
console.log("watchparty: done");
