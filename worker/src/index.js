/* "Ask AI" relay. The widget posts { messages: [{ role, content }, ...] } to /chat; the Worker adds the portfolio
   system prompt, asks Groq, and streams the answer back as plain text. The Groq key lives only here, as a secret. */
import { SYSTEM_PROMPT } from "./portfolio.js";

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const MAX_TURNS = 12;      // only the latest turns are sent on
const MAX_CHARS = 1500;    // per message

const isLocal = (origin) => /^http:\/\/(localhost|127\.0\.0\.1|\[::1\])(:\d+)?$/.test(origin);

function corsFor(origin, env) {
  const list = (env.ALLOWED_ORIGINS || "").split(",").map((s) => s.trim()).filter(Boolean);
  if (!origin || !(list.includes(origin) || isLocal(origin))) return null;
  return { "Access-Control-Allow-Origin": origin, Vary: "Origin" };
}

const json = (body, status, headers) =>
  new Response(JSON.stringify(body), { status, headers: { ...headers, "Content-Type": "application/json" } });

// keep only well-formed user/assistant turns, newest last, trimmed to size
function clean(messages) {
  if (!Array.isArray(messages)) return null;
  const out = messages
    .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string" && m.content.trim())
    .slice(-MAX_TURNS)
    .map((m) => ({ role: m.role, content: m.content.trim().slice(0, MAX_CHARS) }));
  while (out.length && out[0].role !== "user") out.shift();
  return out.length && out[out.length - 1].role === "user" ? out : null;
}

function ask(env, model, messages) {
  return fetch(GROQ_URL, {
    method: "POST",
    headers: { Authorization: `Bearer ${env.GROQ_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model,
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      stream: true,
      temperature: 0.4,
      max_completion_tokens: 1024,
      reasoning_effort: "low",
      include_reasoning: false,
    }),
  });
}

// Groq streams OpenAI-style server-sent events; pass on only the answer text
function textOnly(body) {
  const dec = new TextDecoder(), enc = new TextEncoder();
  let buf = "";
  const take = (line, ctrl) => {
    if (!line.startsWith("data:")) return;
    const data = line.slice(5).trim();
    if (!data || data === "[DONE]") return;
    try {
      const piece = JSON.parse(data).choices?.[0]?.delta?.content;
      if (piece) ctrl.enqueue(enc.encode(piece));
    } catch {}
  };
  return body.pipeThrough(new TransformStream({
    transform(chunk, ctrl) {
      buf += dec.decode(chunk, { stream: true });
      const lines = buf.split("\n");
      buf = lines.pop();
      lines.forEach((l) => take(l, ctrl));
    },
    flush(ctrl) { take(buf, ctrl); },
  }));
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const cors = corsFor(origin, env);

    if (request.method === "OPTIONS") {
      if (!cors) return new Response(null, { status: 403 });
      return new Response(null, { status: 204, headers: { ...cors, "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type", "Access-Control-Max-Age": "86400" } });
    }
    if (new URL(request.url).pathname !== "/chat") return json({ error: "Not found" }, 404, cors || {});
    if (request.method !== "POST") return json({ error: "Use POST" }, 405, cors || {});
    if (!cors) return json({ error: "Origin not allowed" }, 403, {});
    if (!env.GROQ_API_KEY) return json({ error: "The assistant isn't configured yet." }, 500, cors);

    if (env.LIMITER) {
      const { success } = await env.LIMITER.limit({ key: request.headers.get("CF-Connecting-IP") || "anon" });
      if (!success) return json({ error: "That's a lot of questions at once. Give it a minute and try again." }, 429, cors);
    }

    let messages;
    try { messages = clean((await request.json()).messages); } catch {}
    if (!messages) return json({ error: "Send { messages: [...] } ending with a user message." }, 400, cors);

    let res = await ask(env, env.MODEL, messages);
    if (res.status === 429 && env.FALLBACK_MODEL) res = await ask(env, env.FALLBACK_MODEL, messages);
    if (!res.ok || !res.body) {
      console.log("groq error", res.status, (await res.text()).slice(0, 500));
      const busy = res.status === 429;
      return json({ error: busy ? "The assistant is busy right now. Try again in a minute." : "The assistant couldn't answer just now." }, busy ? 429 : 502, cors);
    }

    return new Response(textOnly(res.body), {
      headers: { ...cors, "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" },
    });
  },
};
