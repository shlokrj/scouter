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
      const row = await this.first<Row>();
      return row ? [row] : [];
    }

    const [fingerprint, company, position, applyUrl, isBaseline, firstSeenAt, lastSeenAt] = this.values as [string, string, string, string, number, string, string];
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
    return [];
  }
}

class FakeDatabase {
  rows = new Map<string, Row>();

  prepare(query: string) {
    return new FakeStatement(this, query);
  }

  async batch(statements: FakeStatement[]) {
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

  const nextScan = await annotateDiscoveries([
    { id: "company:software-engineer", company: "Company", position: "Software Engineer Intern", applyUrl: "https://example.com/a" },
    { id: "company:systems-analyst", company: "Company", position: "Systems Analyst Intern", applyUrl: "https://example.com/b" },
  ]);
  assert.equal(nextScan[0].isNew, false);
  assert.equal(nextScan[1].isNew, true);
});
