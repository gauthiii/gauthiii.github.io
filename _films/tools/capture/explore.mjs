// Look at an app before scripting a capture: first-screen screenshot + visible button/link labels.
// usage: node tools/capture/explore.mjs <dir> <port> <name> [route]
import path from "node:path";
import { launch, newPage, settle, serve } from "./lib.mjs";

const [dir, port, name, route = "/"] = process.argv.slice(2);
const server = await serve("npx", ["vite", "--port", port, "--strictPort"], { cwd: dir, url: `http://localhost:${port}/` });
const browser = await launch();
try {
  const page = await newPage(browser, { width: 1440, height: 900, scale: 1 });
  await page.goto(`http://localhost:${port}${route}`, { waitUntil: "networkidle2", timeout: 60000 });
  await settle(page, 2500);
  const out = path.join(process.env.OUT, `${name}.jpg`);
  await page.screenshot({ path: out, type: "jpeg", quality: 70 });
  const labels = await page.evaluate(() =>
    [...document.querySelectorAll("button, a, [role=tab], input[type=file]")]
      .map(e => (e.getAttribute("aria-label") || e.textContent || e.type || "").trim().replace(/\s+/g, " ").slice(0, 40))
      .filter(Boolean)
  );
  console.log(name, JSON.stringify([...new Set(labels)].slice(0, 60)));
} finally {
  await browser.close();
  server.stop();
}
