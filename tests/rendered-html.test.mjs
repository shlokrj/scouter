import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const templateRoot = new URL("../", import.meta.url);

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
  assert.match(html, /<title>Scouter — Internship Intelligence<\/title>/i);
  assert.match(html, />scouter</i);
  assert.match(html, /Relevant roles/);
  assert.match(html, /Live source ingestion is the next build phase/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("keeps the product metadata and private-doc policy explicit", async () => {
  const [layout, page, gitignore, packageJson] = await Promise.all([
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../.gitignore", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(layout, /Scouter — Internship Intelligence/);
  assert.match(layout, /Manrope/);
  assert.match(layout, /Space_Mono/);
  assert.match(layout, /metadataBase/);
  assert.match(page, /ScouterDashboard/);
  assert.match(gitignore, /\*\.md/);
  assert.match(gitignore, /!README\.md/);
  assert.match(packageJson, /"name": "scouter"/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});
