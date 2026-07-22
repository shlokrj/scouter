import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the Scouter dashboard", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>scouter<\/title>/i);
  assert.match(html, /aria-label="scouter home"/i);
  assert.match(html, /Open internships/);
  assert.match(html, /Checking company career pages now/);
  assert.match(html, /724(?:<!-- -->)? companies tracked/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("keeps the product metadata and private-doc policy explicit", async () => {
  const [layout, page, dashboard, rolesRoute, applications, watchlist, gitignore, license, packageJson] = await Promise.all([
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/scouter-dashboard.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/api/roles/route.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/data/applications.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/data/watchlist.ts", import.meta.url), "utf8"),
    readFile(new URL("../.gitignore", import.meta.url), "utf8"),
    readFile(new URL("../LICENSE", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(layout, /title: "scouter"/);
  assert.match(layout, /Manrope/);
  assert.match(layout, /Space_Mono/);
  assert.match(layout, /metadataBase/);
  assert.match(page, /ScouterDashboard/);
  assert.match(dashboard, /localStorage/);
  assert.match(dashboard, /application\.firstSeenAt/);
  assert.match(rolesRoute, /boards-api\.greenhouse\.io/);
  assert.match(rolesRoute, /api\.ashbyhq\.com/);
  assert.match(applications, /firstSeenAt: "2026-07-20"/);
  assert.match(watchlist, /"name": "Amazon"/);
  assert.match(watchlist, /"name": "Google"/);
  assert.match(gitignore, /\*\.md/);
  assert.match(gitignore, /!README\.md/);
  assert.match(license, /MIT License/);
  assert.match(packageJson, /"name": "scouter"/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});
