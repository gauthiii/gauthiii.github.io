// Second-level look: PDFcraft after upload, CognaBite after sign-in.
import path from "node:path";
import { launch, newPage, settle, serve, wait } from "./lib.mjs";

const D = "/Users/gauthamsmacbook/Apps/React Apps/Claude Apps";
const OUT = process.env.OUT;
const labels = page => page.evaluate(() =>
  [...new Set([...document.querySelectorAll("button, a, [role=tab]")].map(e => (e.getAttribute("aria-label") || e.textContent || "").trim().replace(/\s+/g, " ").slice(0, 40)).filter(Boolean))].slice(0, 70));

const browser = await launch();
try {
  {
    const s = await serve("npx", ["vite", "--port", "5303", "--strictPort"], { cwd: `${D}/pdfcraft`, url: "http://localhost:5303/" });
    const page = await newPage(browser, { width: 1440, height: 900, scale: 1 });
    await page.goto("http://localhost:5303/", { waitUntil: "networkidle2" });
    const input = await page.$("input[type=file]");
    await input.uploadFile(path.join(OUT, "pdf/Field-Notes.pdf"));
    await settle(page, 3000);
    await page.screenshot({ path: path.join(OUT, "pdf-after.jpg"), type: "jpeg", quality: 70 });
    console.log("pdfcraft", JSON.stringify(await labels(page)));
    s.stop();
  }
  {
    const s = await serve("npx", ["vite", "--port", "5305", "--strictPort"], { cwd: `${D}/cognabite`, url: "http://localhost:5305/" });
    const page = await newPage(browser, { width: 1440, height: 900, scale: 1 });
    await page.goto("http://localhost:5305/", { waitUntil: "networkidle2" });
    await page.evaluate(() => [...document.querySelectorAll("button")].find(b => b.textContent.trim() === "Sign in")?.click());
    await settle(page, 2500);
    await page.screenshot({ path: path.join(OUT, "cogna-after.jpg"), type: "jpeg", quality: 70 });
    console.log("cognabite", page.url(), JSON.stringify(await labels(page)));
    s.stop();
  }
} finally {
  await browser.close();
}
