import assert from "node:assert/strict";
import test from "node:test";
import { manualDuplicateUrls, markManualDuplicate, removeManualDuplicate } from "../../app/lib/manual-duplicate-store";

class Database {
  rows = new Set<string>();
  failWrites = false;

  prepare(query: string) {
    return {
      bind: (...values: unknown[]) => ({ query, values }),
      all: async () => ({ results: [...this.rows].map((canonical_url) => ({ canonical_url })) }),
    };
  }

  async batch(statements: { query: string; values: unknown[] }[]) {
    if (this.failWrites) throw new Error("Database unavailable");
    for (const { query, values } of statements) {
      if (query.startsWith("INSERT")) this.rows.add(values[0] as string);
      if (query.startsWith("DELETE")) for (const value of values) this.rows.delete(value as string);
    }
    return statements.map(() => ({ results: [] }));
  }
}

test("lists saved duplicate decisions and restores legacy ATS URLs after a later visit", async () => {
  const database = new Database();
  Object.assign(globalThis, { __SCOUTER_RUNTIME__: { DB: database } });
  await markManualDuplicate("https://employer.com/jobs/123");
  assert.equal((await manualDuplicateUrls()).has("employer.com/jobs/123"), true);
  await removeManualDuplicate("https://employer.com/jobs/123");
  assert.equal((await manualDuplicateUrls()).has("employer.com/jobs/123"), false);

  database.rows.add("boards.greenhouse.io/example/jobs/123?gh_jid=123");
  await removeManualDuplicate("https://boards.greenhouse.io/example/jobs/123?gh_jid=123");
  assert.equal(database.rows.size, 0);

  await markManualDuplicate("https://employer.com/jobs/456");
  database.failWrites = true;
  await assert.rejects(removeManualDuplicate("https://employer.com/jobs/456"));
  assert.equal((await manualDuplicateUrls()).has("employer.com/jobs/456"), true);
});
