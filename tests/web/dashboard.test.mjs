import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("redirects unauthenticated visitors to the owner screen", async () => {
  const response = await render();
  assert.equal(response.status, 307);
  assert.equal(response.headers.get("location"), "http://localhost/login");
});

test("server-renders the owner password screen", async () => {
  const response = await render("/login");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>scouter<\/title>/i);
  assert.match(html, /owner access/i);
  assert.match(html, /Enter password/i);
  assert.match(html, /autoComplete="current-password"/);
  assert.match(html, /Scouter is private/i);
  assert.match(html, /made by shlok\.fyi/i);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("keeps the product metadata and deployment setup explicit", async () => {
  const [layout, page, dashboard, rolesRoute, auth, loginRoute, icon, gitignore, license, readme, packageJson, vercelConfig] = await Promise.all([
    readFile(new URL("../../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../../app/components/scouter-dashboard.tsx", import.meta.url), "utf8"),
    readFile(new URL("../../app/api/roles/route.ts", import.meta.url), "utf8"),
    readFile(new URL("../../app/lib/owner-auth.ts", import.meta.url), "utf8"),
    readFile(new URL("../../app/api/auth/login/route.ts", import.meta.url), "utf8"),
    readFile(new URL("../../app/icon.svg", import.meta.url), "utf8"),
    readFile(new URL("../../.gitignore", import.meta.url), "utf8"),
    readFile(new URL("../../LICENSE", import.meta.url), "utf8"),
    readFile(new URL("../../README.md", import.meta.url), "utf8"),
    readFile(new URL("../../package.json", import.meta.url), "utf8"),
    readFile(new URL("../../vercel.json", import.meta.url), "utf8"),
  ]);

  assert.match(layout, /title: "scouter"/);
  assert.match(layout, /Manrope/);
  assert.match(layout, /Space_Mono/);
  assert.match(layout, /metadataBase/);
  assert.match(page, /hasOwnerSession/);
  assert.match(page, /redirect\("\/login"\)/);
  assert.doesNotMatch(dashboard, /localStorage|ApplicationStatus|status-select/);
  assert.match(rolesRoute, /sndsh404\/summer-2027-internships/);
  assert.match(rolesRoute, /speedyapply\/2027-SWE-College-Jobs/);
  assert.match(rolesRoute, /vanshb03\/Summer2027-Internships/);
  assert.match(rolesRoute, /Chieler\/Summer-2027-SWE-Internships/);
  assert.match(rolesRoute, /parseVanshb03/);
  assert.match(rolesRoute, /parseChieler/);
  assert.match(rolesRoute, /dedupe\(\[\.\.\.sndshOpenings, \.\.\.speedyOpenings, \.\.\.vanshOpenings, \.\.\.chielerOpenings\]\)/);
  assert.match(rolesRoute, /graduateOnlySignal/);
  assert.match(rolesRoute, /explicitlySummer2027/);
  assert.match(rolesRoute, /isSummer2027Confirmed/);
  assert.match(rolesRoute, /hasUndergraduateSignal/);
  assert.match(rolesRoute, /summer2027Confirmed/);
  assert.match(rolesRoute, /companyKey/);
  assert.match(rolesRoute, /roleTokens/);
  assert.match(rolesRoute, /isSameRole/);
  assert.match(rolesRoute, /keepBestOpening/);
  assert.match(rolesRoute, /companyPriority/);
  assert.match(dashboard, /type="range"/);
  assert.match(dashboard, /watchlist/);
  assert.match(dashboard, /href="\/login"/);
  assert.match(dashboard, /last refresh/);
  assert.match(dashboard, /confirmed 2027/);
  assert.match(dashboard, /confirmedOnly/);
  assert.match(dashboard, /type="checkbox"/);
  assert.match(dashboard, /confirmed 2027 \+ undergraduate/);
  assert.match(dashboard, /made by shlok\.fyi/);
  assert.match(auth, /SCOUTER_OWNER_PASSWORD/);
  assert.match(auth, /crypto\.subtle/);
  assert.doesNotMatch(auth, new RegExp("Demo" + "123"));
  assert.match(loginRoute, /httpOnly: true/);
  assert.match(icon, /<text[^>]*>s<\/text>/);
  assert.match(icon, /#ff7043/);
  assert.match(icon, /rx="14"/);
  assert.match(gitignore, /\*\.md/);
  assert.match(gitignore, /!README\.md/);
  assert.match(gitignore, /\/\.openai\//);
  assert.match(gitignore, /\.env\*/);
  assert.match(gitignore, /\/secrets\//);
  assert.match(license, /MIT License/);
  assert.match(readme, /\[MIT License\]\(\.\/LICENSE\)/);
  assert.match(packageJson, /"name": "scouter"/);
  assert.match(packageJson, /"build": "next build"/);
  assert.match(packageJson, /"build:cloudflare": "WRANGLER_LOG_PATH=.*vinext build"/);
  assert.match(vercelConfig, /"framework": "nextjs"/);
  assert.match(vercelConfig, /"outputDirectory": "\.next"/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});
