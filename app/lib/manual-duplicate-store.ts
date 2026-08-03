import { canonicalApplicationUrl, withoutManualDuplicates } from "./opening-dedupe";

type D1Result<T> = { results: T[] };

type D1Statement = {
  bind(...values: unknown[]): D1Statement;
  all<T>(): Promise<D1Result<T>>;
};

type D1Database = {
  prepare(query: string): D1Statement;
  batch<T = unknown>(statements: D1Statement[]): Promise<D1Result<T>[]>;
};

type DuplicateRuntime = { DB?: D1Database };
type StoredDuplicate = { canonical_url: string };

const memoryDuplicates = new Set<string>();

function database() {
  return (globalThis as typeof globalThis & { __SCOUTER_RUNTIME__?: DuplicateRuntime }).__SCOUTER_RUNTIME__?.DB ?? null;
}

export async function manualDuplicateUrls() {
  const db = database();
  if (!db) return new Set(memoryDuplicates);

  try {
    const result = await db.prepare("SELECT canonical_url FROM manual_duplicate_overrides").all<StoredDuplicate>();
    return new Set(result.results.map((row) => row.canonical_url));
  } catch {
    return new Set(memoryDuplicates);
  }
}

export async function markManualDuplicate(applyUrl: string) {
  const canonicalUrl = canonicalApplicationUrl(applyUrl);
  memoryDuplicates.add(canonicalUrl);
  const db = database();
  if (!db) return { canonicalUrl, persisted: false };

  try {
    await db.batch([
      db.prepare(
        "INSERT INTO manual_duplicate_overrides (canonical_url, apply_url, marked_at) VALUES (?, ?, ?) ON CONFLICT(canonical_url) DO NOTHING",
      ).bind(canonicalUrl, applyUrl, new Date().toISOString()),
    ]);
    return { canonicalUrl, persisted: true };
  } catch {
    return { canonicalUrl, persisted: false };
  }
}

export async function removeManualDuplicate(applyUrl: string) {
  const canonicalUrl = canonicalApplicationUrl(applyUrl);
  memoryDuplicates.delete(canonicalUrl);
  const db = database();
  if (!db) return { canonicalUrl, persisted: false };

  try {
    await db.batch([
      db.prepare("DELETE FROM manual_duplicate_overrides WHERE canonical_url = ?").bind(canonicalUrl),
    ]);
    return { canonicalUrl, persisted: true };
  } catch {
    return { canonicalUrl, persisted: false };
  }
}

export { withoutManualDuplicates };
