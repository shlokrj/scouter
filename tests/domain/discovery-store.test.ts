import assert from "node:assert/strict";
import test from "node:test";
import { annotateDiscoveries } from "../../app/lib/discovery-store";

type Row = {
  fingerprint: string;
  company: string;
  position: string;
  apply_url: string;
  is_baseline: number;
  first_seen_at: string;
  last_seen_at: string;
};

class FakeStatement {
  constructor(
    private readonly database: FakeDatabase,
    private readonly query: string,
    private readonly values: unknown[] = [],
  ) {}

  bind(...values: unknown[]) {
    return new FakeStatement(this.database, this.query, values);
  }

  async first<T>() {
    if (this.query.startsWith("SELECT COUNT")) return { count: this.database.rows.size } as T;
    const row = this.database.rows.get(this.values[0] as string);
    return (row
      ? { fingerprint: row.fingerprint, first_seen_at: row.first_seen_at, is_baseline: row.is_baseline }
      : null) as T | null;
  }

  async results() {
    if (this.query.startsWith("SELECT")) {
      return this.values.flatMap((id) => {
        const row = this.database.rows.get(id as string);
        return row ? [row] : [];
      });
    }

    for (let index = 0; index < this.values.length; index += 7) {
      const [fingerprint, company, position, applyUrl, isBaseline, firstSeenAt, lastSeenAt] = this.values.slice(index, index + 7) as [string, string, string, string, number, string, string];
      const existing = this.database.rows.get(fingerprint);
      this.database.rows.set(fingerprint, {
        fingerprint,
        company,
        position,
        apply_url: applyUrl,
        is_baseline: existing?.is_baseline ?? isBaseline,
        first_seen_at: existing?.first_seen_at ?? firstSeenAt,
        last_seen_at: lastSeenAt,
      });
    }
    return [];
  }
}

class FakeDatabase {
  rows = new Map<string, Row>();
  statementCount = 0;

  prepare(query: string) {
    return new FakeStatement(this, query);
  }

  async batch(statements: FakeStatement[]) {
    this.statementCount += statements.length;
    return Promise.all(statements.map(async (statement) => ({ results: await statement.results() })));
  }
}

test("marks only openings discovered after the baseline as new", async () => {
  const database = new FakeDatabase();
  (globalThis as typeof globalThis & { __SCOUTER_RUNTIME__?: { DB?: FakeDatabase } }).__SCOUTER_RUNTIME__ = { DB: database };

  const baseline = await annotateDiscoveries([
    { id: "company:software-engineer", company: "Company", position: "Software Engineer Intern", applyUrl: "https://example.com/a" },
  ]);
  assert.equal(baseline[0].isNew, false);
  assert.match(baseline[0].discoveredAt, /^\d{4}-\d{2}-\d{2}T/);

  const nextScan = await annotateDiscoveries([
    { id: "company:software-engineer", company: "Company", position: "Software Engineer Intern", applyUrl: "https://example.com/a" },
    { id: "company:systems-analyst", company: "Company", position: "Systems Analyst Intern", applyUrl: "https://example.com/b" },
  ]);
  assert.equal(nextScan[0].isNew, false);
  assert.equal(nextScan[1].isNew, true);
  assert.equal(nextScan[0].discoveredAt, baseline[0].discoveredAt);
});

test("records a large co-op feed in bounded database statements", async () => {
  const database = new FakeDatabase();
  (globalThis as typeof globalThis & { __SCOUTER_RUNTIME__?: { DB?: FakeDatabase } }).__SCOUTER_RUNTIME__ = { DB: database };
  const rows = Array.from({ length: 1500 }, (_, index) => ({ id: `job-${index}`, company: "Example", position: `Co-op ${index}`, applyUrl: `https://example.com/${index}` }));
  await annotateDiscoveries(rows);
  assert.equal(database.rows.size, 1500);
  assert.ok(database.statementCount < 150);
});
