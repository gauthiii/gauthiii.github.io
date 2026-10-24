// InboxPulse (client): real UI, fictional mailbox served in the server's exact response shapes.
// Counts and insights are computed with the same rules as server/src/routes/{emails,insights}.js.
// usage: node tools/capture/inboxpulse.mjs
import { launch, mockFetch, newPage, settle, shooter, serve, wait } from "./lib.mjs";

const CLIENT = "/Users/gauthamsmacbook/Apps/React Apps/Claude Apps/inboxpulse/client";
const PORT = 5302;
const CATEGORIES = ["dangerous", "immediate_attention", "free_trials_ending", "immediate_bills", "subscription_plans", "job_updates", "promo_codes", "personal", "suspected_spam"];

const accounts = [
  { id: 1, email: "maya.okafor.mail@gmail.com", connected_at: 0 },
  { id: 2, email: "maya@okafor-studio.io", connected_at: 0 },
];
const H = 3600000;
const now = Date.now();
const day = n => new Date(now + n * 86400000).toISOString().slice(0, 10);

// [account, category, classifiedBy, fromName, fromEmail, subject, snippet, hoursAgo, unread, meta, summary]
const RAW = [
  [1, "immediate_attention", "llm", "Priya Raman", "priya@harborline.co", "Can you sign off on the Q4 roadmap today?", "We need your approval before the 4pm review so engineering can lock scope…", 2, 1, {}, "Priya needs your sign-off on the Q4 roadmap before today's 4pm review."],
  [2, "immediate_attention", "rules", "Daniel Cho", "daniel@brightfold.com", "Contract redlines — reply needed by EOD", "Attached are the final redlines. Legal is waiting on your confirmation…", 5, 1, {}, "Daniel is waiting on your confirmation of the contract redlines by end of day."],
  [1, "immediate_attention", "llm", "Lena Fischer", "lena@kitepoint.dev", "Production deploy blocked on your review", "PR #482 is the last blocker for tonight's release…", 9, 0, {}, "Your review on PR #482 is the last blocker for tonight's release."],
  [1, "immediate_bills", "rules", "Northwind Energy", "billing@northwind-energy.com", "Your electricity bill is ready", "Amount due $142.80 · Due " + day(3), 14, 1, { amount: 142.8, currency: "USD", dueDate: day(3) }, "Electricity bill of $142.80 is due in 3 days."],
  [2, "immediate_bills", "rules", "Cobalt Mobile", "pay@cobaltmobile.com", "Statement available: payment due soon", "Your balance of $68.00 is due " + day(5), 30, 1, { amount: 68, currency: "USD", dueDate: day(5) }, "Mobile statement of $68.00 is due in 5 days."],
  [1, "immediate_bills", "llm", "Atlas Property Mgmt", "rent@atlaspm.com", "Rent reminder for November", "Monthly rent of $1,950.00 is due on " + day(6), 40, 0, { amount: 1950, currency: "USD", dueDate: day(6) }, "November rent of $1,950.00 is due in 6 days."],
  [1, "subscription_plans", "rules", "Streamly", "receipts@streamly.tv", "Your Streamly Premium receipt", "Thanks for renewing. You were charged $15.99…", 20, 0, { amount: 15.99, currency: "USD" }, "Streamly Premium renewed for $15.99."],
  [2, "subscription_plans", "rules", "Lumen Cloud", "billing@lumencloud.io", "Invoice for Lumen Cloud Pro", "Your monthly plan of $24.00 has been renewed…", 50, 0, { amount: 24, currency: "USD" }, "Lumen Cloud Pro renewed for $24.00 this month."],
  [1, "subscription_plans", "llm", "Fitloop", "hello@fitloop.app", "Your membership renews next week", "Fitloop Plus will renew at $12.99/month…", 70, 0, { amount: 12.99, currency: "USD" }, "Fitloop Plus renews next week at $12.99/month."],
  [2, "free_trials_ending", "rules", "Inkwell Notes", "team@inkwellnotes.com", "Your free trial ends in 2 days", "After your trial you'll be charged $9.99/month unless you cancel…", 18, 1, { amount: 9.99, currency: "USD", dueDate: day(2) }, "Inkwell Notes trial converts to $9.99/month in 2 days."],
  [1, "free_trials_ending", "llm", "Soundcrate", "billing@soundcrate.fm", "Trial ending soon — keep your playlists", "Your 30-day trial ends " + day(4) + ". Plan: $10.99/month…", 44, 0, { amount: 10.99, currency: "USD", dueDate: day(4) }, "Soundcrate trial ends in 4 days, then $10.99/month."],
  [1, "job_updates", "rules", "Harborline Careers", "careers@harborline.co", "Interview confirmed: Senior AI Engineer", "Your panel interview is scheduled for Thursday at 10:00 AM…", 6, 1, {}, "Panel interview for Senior AI Engineer is confirmed for Thursday at 10:00."],
  [1, "job_updates", "llm", "Brightfold Talent", "talent@brightfold.com", "Next steps for your application", "Thanks for completing the take-home. The team would like to schedule…", 26, 0, {}, "Brightfold wants to schedule the next round after your take-home."],
  [2, "job_updates", "rules", "Kitepoint Recruiting", "jobs@kitepoint.dev", "Application received", "We've received your application for ML Platform Engineer…", 60, 0, {}, "Kitepoint received your ML Platform Engineer application."],
  [1, "promo_codes", "rules", "Driftwood Outfitters", "deals@driftwood.shop", "25% off everything this weekend", "Use code DRIFT25 at checkout. Ends Sunday…", 12, 0, { promoCode: "DRIFT25", expiryDate: day(2) }, "25% off sitewide with code DRIFT25, ends Sunday."],
  [2, "promo_codes", "rules", "Cafe Lumo", "rewards@cafelumo.com", "A free drink is waiting for you", "Show code LUMOFREE at any store before " + day(7) + "…", 36, 0, { promoCode: "LUMOFREE", expiryDate: day(7) }, "Free drink with code LUMOFREE within the week."],
  [1, "promo_codes", "llm", "Pagewise Books", "hello@pagewise.store", "Members save 15% on new releases", "Code READ15 applies to all preorders…", 80, 0, { promoCode: "READ15" }, "15% off new releases with code READ15."],
  [1, "personal", "llm", "Amara Okafor", "amara.okafor@gmail.com", "Sunday lunch?", "Mum is making jollof — are you coming over around 1?", 4, 1, {}, "Amara is asking if you're coming to Sunday lunch around 1pm."],
  [2, "personal", "llm", "Tomás Reyes", "tomas.reyes@gmail.com", "Photos from the hike", "Uploaded the album from Saturday, the summit shots came out great…", 22, 0, {}, "Tomás shared the photo album from Saturday's hike."],
  [1, "suspected_spam", "rules", "Prize Center", "noreply@winners-daily.biz", "You've been selected!!!", "Claim your reward within 24 hours…", 16, 0, {}, "Unsolicited prize offer; likely spam."],
  [2, "suspected_spam", "rules", "SEO Growth Team", "growth@rank-boost.top", "Page 1 on Google guaranteed", "We noticed your website could rank higher…", 52, 0, {}, "Unsolicited SEO pitch."],
  [1, "dangerous", "rules", "Account Security", "alerts@verify-acct-center.net", "Unusual sign-in: verify your account now", "Your account will be suspended in 12 hours unless you confirm your password…", 8, 1, {}, "Phishing attempt asking for your password; do not click any links."],
  [2, "dangerous", "llm", "Payroll Department", "payroll@hr-portal-update.com", "Action required: update direct deposit", "Please re-enter your banking details using the secure form…", 34, 0, {}, "Fraudulent request for banking details; sender domain is not your employer."],
];

const emails = RAW.map((r, i) => ({
  accountId: r[0],
  accountEmail: accounts.find(a => a.id === r[0]).email,
  id: `m${1000 + i}`,
  threadId: `t${1000 + i}`,
  fromName: r[3], fromEmail: r[4], subject: r[5], snippet: r[6],
  date: now - r[7] * H,
  unread: Boolean(r[8]),
  category: r[1], classifiedBy: r[2], meta: r[9], summary: null,
}));
const counts = Object.fromEntries(CATEGORIES.map(c => [c, { total: 0, unread: 0 }]));
for (const e of emails) { counts[e.category].total++; if (e.unread) counts[e.category].unread++; }

const sum = (xs, f) => Math.round(xs.reduce((s, x) => s + (f(x) || 0), 0) * 100) / 100;
const by = c => emails.filter(e => e.category === c);
const bills = by("immediate_bills"), subs = by("subscription_plans"), trials = by("free_trials_ending"), dangerous = by("dangerous");
const subSenders = [...new Set([...subs, ...trials].map(e => e.fromEmail.split("@")[1]))];
const dangerousByAccount = {};
for (const e of dangerous) dangerousByAccount[e.accountEmail] = (dangerousByAccount[e.accountEmail] || 0) + 1;
const insights = {
  range: { from: now - 7 * 86400000, to: now },
  accountsAnalyzed: accounts.length,
  emailsAnalyzed: emails.length,
  bills: { count: bills.length, totalFlagged: sum(bills, e => e.meta.amount), items: bills.slice(0, 5).map(e => ({ from: e.fromName, subject: e.subject, amount: e.meta.amount ?? null, dueDate: e.meta.dueDate ?? null })) },
  subscriptions: { activeCount: subSenders.length, trialsEnding: trials.length, monthlyFlagged: sum(subs, e => e.meta.amount), vendors: subSenders.slice(0, 12) },
  security: { dangerousCount: dangerous.length, byAccount: dangerousByAccount, headline: `${dangerous.length} dangerous emails flagged across ${Object.keys(dangerousByAccount).length} accounts.` },
};
const detailMap = Object.fromEntries(emails.map((e, i) => [`/api/emails/${e.accountId}/${e.id}`, { ...e, summary: RAW[i][10], bodyHtml: null, bodyText: `${e.snippet}\n\n— ${e.fromName}` }]));

const server = await serve("npx", ["vite", "--port", String(PORT), "--strictPort"], { cwd: CLIENT, url: `http://localhost:${PORT}/` });
const browser = await launch();
const shot = shooter("inboxpulse");
try {
  const page = await newPage(browser, { width: 1440, height: 900 });
  await page.emulateMediaFeatures([{ name: "prefers-color-scheme", value: "dark" }]);
  await mockFetch(page, {
    "/auth/accounts": { json: { accounts } },
    "/api/settings": { json: { active: "anthropic", available: { anthropic: true, openai: true }, models: { anthropic: "claude-haiku-4-5-20251001", openai: "gpt-4o-mini" } } },
    "/api/emails/*": { map: detailMap },
    "/api/emails": { json: { emails, counts, syncStats: accounts.map(a => ({ accountId: a.id, fetched: 0 })) }, waitGate: 1 },
    "/api/insights": { json: insights },
  });
  await page.goto(`http://localhost:${PORT}/`, { waitUntil: "domcontentloaded" });
  await settle(page, 900);
  await shot(page, "01-syncing");

  await page.evaluate(() => (window.__gate = 1));
  await wait(1400);
  await shot(page, "02-dashboard");

  // Scroll to the category grid + list.
  await page.evaluate(() => window.scrollTo(0, 520));
  await wait(600);
  await shot(page, "03-categories");

  // Open the Dangerous Mails category, then the first email's drawer (AI summary).
  const clickText = async text => page.evaluate(t => {
    const el = [...document.querySelectorAll("button, [role=button], a")].find(b => b.textContent.includes(t));
    el?.click();
    return Boolean(el);
  }, text);
  if (await clickText("Dangerous Mails")) { await wait(700); await shot(page, "04-dangerous"); }
  if (await clickText("Unusual sign-in")) { await wait(1000); await shot(page, "05-drawer"); }
  await page.close();
} finally {
  await browser.close();
  server.stop();
}
console.log("inboxpulse: done");
