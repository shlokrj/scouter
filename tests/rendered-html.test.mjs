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
  assert.match(html, />scouter<\/a>/i);
  assert.match(html, /Internship openings/);
  assert.match(html, /undergraduate · united states · summer 2027/i);
  assert.match(html, /Loading undergraduate Summer 2027 openings/);
  assert.match(html, /aria-label="Company priority"/);
  assert.match(html, />companies<\/button>/);
  assert.match(html, /date posted/);
  assert.doesNotMatch(html, /applications imported|application calendar|status-select/i);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("keeps the product metadata and private-doc policy explicit", async () => {
  const [layout, page, dashboard, rolesRoute, icon, gitignore, license, packageJson] = await Promise.all([
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/scouter-dashboard.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/api/roles/route.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/icon.svg", import.meta.url), "utf8"),
    readFile(new URL("../.gitignore", import.meta.url), "utf8"),
    readFile(new URL("../LICENSE", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(layout, /title: "scouter"/);
  assert.match(layout, /Manrope/);
  assert.match(layout, /Space_Mono/);
  assert.match(layout, /metadataBase/);
  assert.match(page, /ScouterDashboard/);
  assert.doesNotMatch(dashboard, /localStorage|ApplicationStatus|status-select/);
  assert.match(rolesRoute, /sndsh404\/summer-2027-internships/);
  assert.match(rolesRoute, /speedyapply\/2027-SWE-College-Jobs/);
  assert.match(rolesRoute, /dedupe\(\[\.\.\.sndshOpenings, \.\.\.speedyOpenings\]\)/);
  assert.match(rolesRoute, /graduateOnlySignal/);
  assert.match(rolesRoute, /explicitlySummer2027/);
  assert.match(rolesRoute, /companyPriority/);
  assert.match(dashboard, /type="range"/);
  assert.match(dashboard, /watchlist/);
  assert.match(icon, /<text[^>]*>s<\/text>/);
  assert.match(icon, /#ff7043/);
  assert.match(icon, /rx="14"/);
  assert.match(gitignore, /\*\.md/);
  assert.match(gitignore, /!README\.md/);
  assert.match(license, /MIT License/);
  assert.match(packageJson, /"name": "scouter"/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});
