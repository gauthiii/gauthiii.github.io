// Shared capture helpers: real app UI in headless Chrome at 1920x1080 @2x (3840x2160 PNGs).
// API calls can be answered in-page with fictional data (no backend, no paid calls).
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
export const SHOTS = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../assets/shots");
export const wait = ms => new Promise(r => setTimeout(r, ms));

export async function launch() {
  return puppeteer.launch({ executablePath: CHROME, headless: true, args: ["--hide-scrollbars", "--force-color-profile=srgb"] });
}

// routes: { "/api/x": { json }, "/api/stream": { sse: [events...] } }.
// SSE events are released only up to window.__gate, so the caller decides which frame is captured.
export async function mockFetch(page, routes) {
  await page.evaluateOnNewDocument(routes => {
    window.__gate = 0;
    const orig = window.fetch.bind(window);
    window.fetch = async (input, init) => {
      const url = typeof input === "string" ? input : input.url;
      const p = new URL(url, location.href).pathname;
      const key = Object.keys(routes).find(k => (k.endsWith("*") ? p.startsWith(k.slice(0, -1)) : p === k));
      if (!key) return orig(input, init);
      const r = routes[key];
      // waitGate: hold the response until the caller raises window.__gate (captures loading states).
      if (r.waitGate) while (window.__gate < r.waitGate) await new Promise(res => setTimeout(res, 30));
      // map: per-path JSON for prefixed routes (e.g. one email detail per id).
      const payload = r.map ? r.map[decodeURIComponent(p)] : r.json;
      if (payload !== undefined) {
        return new Response(JSON.stringify(payload), { status: r.status ?? 200, headers: { "Content-Type": "application/json" } });
      }
      const enc = new TextEncoder();
      let i = 0;
      const body = new ReadableStream({
        start(ctrl) {
          const tick = () => {
            while (i < r.sse.length && i < window.__gate) ctrl.enqueue(enc.encode(`data: ${JSON.stringify(r.sse[i++])}\n\n`));
            if (i >= r.sse.length) return ctrl.close();
            setTimeout(tick, 20);
          };
          tick();
        },
      });
      return new Response(body, { headers: { "Content-Type": "text/event-stream" } });
    };
  }, routes);
}

export async function newPage(browser, { width = 1920, height = 1080, scale = 2 } = {}) {
  const page = await browser.newPage();
  await page.setViewport({ width, height, deviceScaleFactor: scale });
  return page;
}

export async function settle(page, ms = 700) {
  await page.evaluate(() => document.fonts.ready);
  await wait(ms);
}

export function shooter(app) {
  const dir = path.join(SHOTS, app);
  fs.mkdirSync(dir, { recursive: true });
  return (page, name) => page.screenshot({ path: path.join(dir, `${name}.png`) });
}

// Start a dev server and resolve once `url` answers HTTP. The child is killed with its process group.
export function serve(cmd, args, { cwd, url, env = {} }) {
  const child = spawn(cmd, args, { cwd, env: { ...process.env, ...env }, detached: true, stdio: ["ignore", "pipe", "pipe"] });
  let log = "";
  child.stdout.on("data", d => (log += d));
  child.stderr.on("data", d => (log += d));
  child.stop = () => { try { process.kill(-child.pid, "SIGTERM"); } catch {} };
  return new Promise((resolve, reject) => {
    const t0 = Date.now();
    const poll = async () => {
      try { const r = await fetch(url); if (r.status < 500) return resolve(child); } catch {}
      if (child.exitCode !== null) return reject(new Error(`${cmd} exited: ${log.slice(-800)}`));
      if (Date.now() - t0 > 120000) { child.stop(); return reject(new Error(`timeout: ${log.slice(-800)}`)); }
      setTimeout(poll, 400);
    };
    poll();
  });
}

// Split text into small streaming chunks (deterministic).
export function chunk(text, size = 4) {
  const out = [];
  for (let i = 0; i < text.length; i += size) out.push(text.slice(i, i + size));
  return out;
}
