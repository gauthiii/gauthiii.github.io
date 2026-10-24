// Mathra (cbseAI/front): real UI, chat stream replayed in-page in the backend's own event format.
// usage: node tools/capture/mathra.mjs
import fs from "node:fs";
import { launch, mockFetch, newPage, settle, shooter, serve, chunk, wait } from "./lib.mjs";

const FRONT = "/Users/gauthamsmacbook/Apps/React Apps/Claude Apps/cbseAI/front";
const PORT = 5301;
const chapters = JSON.parse(fs.readFileSync(new URL("./mathra-chapters.json", import.meta.url)));

// Same question as Mathra's own "Solve a problem" starter. Worked answer is checked by hand:
// A·A⁻¹ = [[2·3+5·(−1), 2·(−5)+5·2],[1·3+3·(−1), 1·(−5)+3·2]] = I.
const QUESTION = "Solve: find the inverse of the matrix [[2, 5], [1, 3]] using elementary operations.";
const ANSWER = String.raw`We use row operations on $A = IA$ (NCERT Chapter 3, inverse of a matrix by elementary operations).

$$\begin{bmatrix} 2 & 5 \\ 1 & 3 \end{bmatrix} = \begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix} A$$

**Step 1.** $R_1 \to R_1 - R_2$

$$\begin{bmatrix} 1 & 2 \\ 1 & 3 \end{bmatrix} = \begin{bmatrix} 1 & -1 \\ 0 & 1 \end{bmatrix} A$$

**Step 2.** $R_2 \to R_2 - R_1$

$$\begin{bmatrix} 1 & 2 \\ 0 & 1 \end{bmatrix} = \begin{bmatrix} 1 & -1 \\ -1 & 2 \end{bmatrix} A$$

**Step 3.** $R_1 \to R_1 - 2R_2$

$$\begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix} = \begin{bmatrix} 3 & -5 \\ -1 & 2 \end{bmatrix} A$$

So $A^{-1} = \begin{bmatrix} 3 & -5 \\ -1 & 2 \end{bmatrix}$.

**Check:** $AA^{-1} = \begin{bmatrix} 6-5 & -10+10 \\ 3-3 & -5+6 \end{bmatrix} = I$ ✓`;

const events = [
  { type: "tool", name: "matrices", title: "Chapter 3: Matrices" },
  { type: "status", message: "Reading Chapter 3: Matrices…" },
  ...chunk(ANSWER, 6).map(text => ({ type: "token", text })),
  { type: "done" },
];

const server = await serve("npx", ["vite", "--port", String(PORT), "--strictPort"], { cwd: FRONT, url: `http://localhost:${PORT}/` });
const browser = await launch();
const shot = shooter("mathra");
try {
  const page = await newPage(browser, { width: 1440, height: 900 });
  await mockFetch(page, {
    "/api/providers": {
      json: {
        available: ["anthropic", "openai", "gemini"],
        default: "anthropic",
        models: {
          anthropic: ["claude-opus-4-8", "claude-sonnet-4-6", "claude-haiku-4-5-20251001"],
          openai: ["gpt-4.1", "gpt-4o", "gpt-4o-mini"],
          gemini: ["gemini-2.5-pro", "gemini-2.5-flash"],
        },
        default_model: { anthropic: "claude-sonnet-4-6", openai: "gpt-4.1", gemini: "gemini-2.5-pro" },
      },
    },
    "/api/chapters": { json: { chapters } },
    "/api/health": { json: { status: "ok", mcp_connected: true, chapter_count: chapters.length } },
    "/api/chat": { sse: events },
  });
  await page.goto(`http://localhost:${PORT}/`, { waitUntil: "networkidle0" });
  await settle(page, 900);
  await shot(page, "01-empty");

  // Type the question in three visible steps.
  await page.click("textarea");
  const thirds = [QUESTION.slice(0, 28), QUESTION.slice(28, 58), QUESTION.slice(58)];
  for (const [i, part] of thirds.entries()) {
    await page.type("textarea", part, { delay: 0 });
    await wait(150);
    await shot(page, `02-typing-${i + 1}`);
  }

  await page.keyboard.press("Enter");
  await wait(250);
  await shot(page, "03-thinking");

  // Tool badge + "Reading Chapter 3" status.
  await page.evaluate(() => (window.__gate = 2));
  await wait(400);
  await shot(page, "04-tool");

  // Stream the answer; capture at fixed fractions of the token list.
  const total = events.length;
  const marks = [0.12, 0.28, 0.45, 0.62, 0.8, 1];
  for (const [i, f] of marks.entries()) {
    await page.evaluate(n => (window.__gate = n), Math.round(2 + (total - 2) * f));
    await wait(f === 1 ? 900 : 450);
    await shot(page, `05-stream-${i + 1}`);
  }
  await page.close();
} finally {
  await browser.close();
  server.stop();
}
console.log("mathra: done");
