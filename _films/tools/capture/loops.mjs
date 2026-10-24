// "More products" loops: a real-time screencast (≈8 s) of each app doing its job + one 2x hero still.
// usage: node tools/capture/loops.mjs [pdfcraft,globalstocks,cognabite]
import fs from "node:fs";
import path from "node:path";
import { launch, newPage, settle, shooter, serve, wait, SHOTS } from "./lib.mjs";

const D = "/Users/gauthamsmacbook/Apps/React Apps/Claude Apps";
const SAMPLE_PDF = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/%20/g, " ")), "Field-Notes.pdf");
const only = (process.argv[2] || "pdfcraft,globalstocks,cognabite,playlistbridge").split(",");
import { mockFetch } from "./lib.mjs";

const clickText = (page, text, sel = "button, a, [role=tab], [role=button]") =>
  page.evaluate((t, s) => {
    const el = [...document.querySelectorAll(s)].find(e => e.textContent.trim().replace(/\s+/g, " ").startsWith(t));
    el?.click();
    return Boolean(el);
  }, text, sel);

async function glide(page, from, to, steps = 24) {
  await page.mouse.move(from.x, from.y);
  await page.mouse.down();
  for (let i = 1; i <= steps; i++) {
    await page.mouse.move(from.x + ((to.x - from.x) * i) / steps, from.y + ((to.y - from.y) * i) / steps);
    await wait(16);
  }
  await page.mouse.up();
}

async function record(browser, name, { cwd, port, route = "/", prepare, act, still, cmd }) {
  const [bin, ...args] = cmd || ["npx", "vite", "--port", String(port), "--strictPort"];
  const server = await serve(bin, args, { cwd, url: `http://localhost:${port}${route}` });
  try {
    // Warm-up visit: lets Vite finish dependency optimisation (it reloads the page once).
    const warm = await newPage(browser, { width: 1440, height: 900, scale: 1 });
    await warm.goto(`http://localhost:${port}${route}`, { waitUntil: "networkidle2", timeout: 90000 });
    await wait(3000);
    await warm.close();

    const page = await newPage(browser, { width: 1440, height: 900, scale: 1 });
    if (prepare) await prepare(page);
    await page.goto(`http://localhost:${port}${route}`, { waitUntil: "networkidle2", timeout: 90000 });
    await settle(page, 1200);
    const dir = path.join(SHOTS, name);
    fs.mkdirSync(dir, { recursive: true });
    const rec = await page.screencast({ path: path.join(dir, "loop-raw.webm") });
    await act(page);
    await rec.stop();

    const hi = await newPage(browser, { width: 1440, height: 900, scale: 2 });
    if (prepare) await prepare(hi);
    await hi.goto(`http://localhost:${port}${route}`, { waitUntil: "networkidle2", timeout: 90000 });
    await settle(hi, 1200);
    await still(hi, shooter(name));
    await page.close();
    await hi.close();
  } finally {
    server.stop();
  }
}

const browser = await launch();
try {
  if (only.includes("pdfcraft")) {
    await record(browser, "pdfcraft", {
      cwd: `${D}/pdfcraft`, port: 5303,
      act: async page => {
        await wait(600);
        await (await page.$("input[type=file]")).uploadFile(SAMPLE_PDF);
        await wait(2200);
        const cards = await page.$$eval("main [class*=grid] > *, [data-rbd-draggable-id]", els => els.slice(0, 8).map(e => { const r = e.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; }));
        if (cards.length >= 8) {
          await page.mouse.move(cards[2].x, cards[2].y, { steps: 12 });
          await wait(400);
          await clickText(page, "", "button[aria-label='Rotate right'], button[title='Rotate right']");
          await wait(700);
          await glide(page, cards[7], cards[1], 30);
          await wait(900);
        }
        await clickText(page, "Split");
        await wait(1400);
      },
      still: async (page, shot) => {
        await (await page.$("input[type=file]")).uploadFile(SAMPLE_PDF);
        await wait(2500);
        await shot(page, "still");
      },
    });
  }

  if (only.includes("globalstocks")) {
    // corsproxy.io now answers 401, so the same Yahoo Finance URL is fetched directly from Node (real data).
    const prepare = async page => {
      await page.evaluateOnNewDocument(() => localStorage.setItem("gs-theme", "dark"));
      await page.setRequestInterception(true);
      page.on("request", async req => {
        const u = req.url();
        if (!u.startsWith("https://corsproxy.io/")) return req.continue();
        try {
          const target = decodeURIComponent(new URL(u).searchParams.get("url"));
          const r = await fetch(target, { headers: { "User-Agent": "Mozilla/5.0" } });
          req.respond({ status: r.status, contentType: "application/json", headers: { "Access-Control-Allow-Origin": "*" }, body: await r.text() });
        } catch { req.abort(); }
      });
    };
    await record(browser, "globalstocks", {
      cwd: `${D}/globalStocks`, port: 5304, route: "/globalStocks/", prepare,
      act: async page => {
        await wait(2500);
        await clickText(page, "1Y"); await wait(1500);
        await clickText(page, "🇺🇸 US Stocks"); await wait(1800);
        await page.mouse.wheel({ deltaY: 380 }); await wait(1200);
        await clickText(page, "🇮🇳 India Stocks"); await wait(1800);
      },
      still: async (page, shot) => {
        await wait(4000);
        await shot(page, "still");
      },
    });
  }

  if (only.includes("cognabite")) {
    await record(browser, "cognabite", {
      cwd: `${D}/cognabite`, port: 5305, route: "/cognaBite/",
      act: async page => {
        await wait(500);
        await clickText(page, "Sign in"); await wait(2200);
        await clickText(page, "Price Watcher"); await wait(1800);
        await clickText(page, "Review Analyzer"); await wait(1800);
        await clickText(page, "Ghost Kitchen"); await wait(1600);
      },
      still: async (page, shot) => {
        await clickText(page, "Sign in"); await wait(2500);
        await shot(page, "still");
      },
    });
  }
  if (only.includes("playlistbridge")) {
    // Fictional library: invented playlists, artists and tracks; covers are generated gradients.
    const cover = i => {
      const hues = [212, 168, 280, 24, 340, 120, 196, 48];
      const h = hues[i % hues.length];
      const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='hsl(${h},70%,55%)'/><stop offset='1' stop-color='hsl(${(h + 60) % 360},70%,30%)'/></linearGradient></defs><rect width='300' height='300' fill='url(#g)'/><circle cx='220' cy='80' r='46' fill='rgba(255,255,255,.18)'/></svg>`;
      return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
    };
    const pl = (provider, i, name, description, trackCount) => ({ id: `${provider}-${i}`, provider, name, description, thumbnail: cover(i + (provider === "youtube" ? 4 : 0)), trackCount, owner: "Maya Okafor", url: "#" });
    const spotify = [pl("spotify", 0, "Late Night Drive", "Synth and slow grooves", 42), pl("spotify", 1, "Focus Flow", "Instrumental for deep work", 64), pl("spotify", 2, "Sunday Morning", "Coffee and acoustic", 28), pl("spotify", 3, "Gym Rotation", "High energy", 51)];
    const youtube = [pl("youtube", 0, "Live Sessions", "Favourite live sets", 23), pl("youtube", 1, "Lo-fi Study", "Beats to study to", 37)];
    const songs = [
      ["Glass Horizon", "Neon Harbor"], ["Paper Satellites", "Juniper Lane"], ["Midnight Signal", "The Velvet Static"], ["Coastline Radio", "Aria Moss"],
      ["Low Tide", "Northbound"], ["Afterglow Avenue", "Kite & Crown"], ["Slow Motion City", "Neon Harbor"], ["Blue Hour", "Lumen Drift"],
      ["Static Hearts", "The Velvet Static"], ["Night Bus Home", "Ola Brightwater"],
    ];
    const tr = (provider, i, title, artist) => ({ id: `${provider}-t${i}`, title, artist, durationMs: 180000 + i * 7000, thumbnail: cover(i), raw: `${artist} ${title}` });
    const status = i => (i === 6 ? "review" : i === 9 ? "unmatched" : "matched");
    const matches = songs.map(([t, a], i) => {
      const src = tr("spotify", i, t, a);
      const best = { track: tr("youtube", i, `${t} (Official Audio)`, a), score: status(i) === "review" ? 0.71 : 0.9 + (i % 3) * 0.03 };
      const alt = { track: tr("youtube", i + 20, `${t} (Live)`, a), score: 0.62 };
      return status(i) === "unmatched"
        ? { source: src, chosen: null, candidates: [], status: "unmatched" }
        : { source: src, chosen: best, candidates: [best, alt], status: status(i) };
    });
    const stats = { total: 10, matched: 8, review: 1, unmatched: 1 };
    const prepare = async page => {
      // The app's font-sans starts with var(--font-geist-sans), which its layout never defines (the browser
      // then falls back to Times). Define it as the app's own fallback stack so the capture shows the intended sans.
      await page.evaluateOnNewDocument(() => document.addEventListener("DOMContentLoaded", () => {
        const st = document.createElement("style");
        st.textContent = ":root{--font-geist-sans:ui-sans-serif,system-ui,-apple-system,sans-serif;--font-geist-mono:ui-monospace,monospace}";
        document.head.appendChild(st);
      }));
      return mockFetch(page, {
      "/api/auth/session": { json: { spotify: { connected: true, displayName: "Maya Okafor", avatar: null }, youtube: { connected: true, displayName: "Maya Okafor", avatar: null } } },
      "/api/playlists": { json: { spotify, youtube, errors: {} } },
      "/api/convert/match": { json: { source: "spotify", target: "youtube", matches, stats }, waitGate: 1 },
      "/api/convert/commit": { json: { playlist: { id: "yt-new", url: "#" }, added: 9, failed: [] } },
      });
    };
    await record(browser, "playlistbridge", {
      cwd: `${D}/spotifyToYT`, port: 5306, route: "/convert",
      cmd: ["npx", "next", "dev", "-p", "5306"],
      prepare,
      act: async page => {
        await wait(4000); // Next.js dev hydration
        await clickText(page, "Late Night Drive", "button"); await wait(900);
        await clickText(page, "Match & review"); await wait(1400);
        await page.evaluate(() => (window.__gate = 1)); await wait(1800);
        await page.mouse.wheel({ deltaY: 360 }); await wait(1400);
        await clickText(page, "Create"); await wait(1800);
      },
      still: async (page, shot) => {
        await wait(4000);
        await clickText(page, "Late Night Drive", "button"); await wait(600);
        await clickText(page, "Match & review"); await wait(400);
        await page.evaluate(() => (window.__gate = 1)); await wait(1500);
        await shot(page, "still");
      },
    });
  }

} finally {
  await browser.close();
}
console.log("loops: done", only.join(","));
