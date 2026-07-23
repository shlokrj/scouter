export type DiscoveryOpening = {
  id: string;
  company: string;
  position: string;
  applyUrl: string;
};

type D1Result<T> = { results: T[] };

type D1Statement = {
  bind(...values: unknown[]): D1Statement;
  first<T>(): Promise<T | null>;
};

type D1Database = {
  prepare(query: string): D1Statement;
  batch<T = unknown>(statements: D1Statement[]): Promise<D1Result<T>[]>;
};

type DiscoveryRuntime = { DB?: D1Database };

type StoredOpening = { fingerprint: string; first_seen_at: string; is_baseline: number };
type MemoryDiscovery = { firstSeenAt: string; isBaseline: boolean };

const NEW_DISCOVERY_WINDOW_MS = 7 * 24 * 60 * 60 * 1000;
const memoryFirstSeen = new Map<string, MemoryDiscovery>();
let memoryBaselineComplete = false;

function database() {
  return (globalThis as typeof globalThis & { __SCOUTER_RUNTIME__?: DiscoveryRuntime }).__SCOUTER_RUNTIME__?.DB ?? null;
}

function discoveredRecently(firstSeenAt: string, now: number) {
  const timestamp = Date.parse(firstSeenAt);
  return Number.isFinite(timestamp) && now - timestamp >= 0 && now - timestamp < NEW_DISCOVERY_WINDOW_MS;
}

function annotateMemory<T extends DiscoveryOpening>(openings: T[], timestamp: string) {
  const isBaseline = !memoryBaselineComplete;
  const now = Date.parse(timestamp);

  for (const opening of openings) {
    if (!memoryFirstSeen.has(opening.id)) {
      memoryFirstSeen.set(opening.id, { firstSeenAt: timestamp, isBaseline });
    }
  }
  memoryBaselineComplete = true;

  return openings.map((opening) => ({
    ...opening,
    isNew: !isBaseline
      && !memoryFirstSeen.get(opening.id)?.isBaseline
      && discoveredRecently(memoryFirstSeen.get(opening.id)?.firstSeenAt ?? timestamp, now),
  }));
}

export async function annotateDiscoveries<T extends DiscoveryOpening>(openings: T[]) {
  const timestamp = new Date().toISOString();
  const db = database();
  if (!db || openings.length === 0) return annotateMemory(openings, timestamp);

  try {
    const count = await db.prepare("SELECT COUNT(*) AS count FROM discovered_openings").first<{ count: number | string }>();
    const existingCount = Number(count?.count ?? 0);
    const existing = await db.batch<StoredOpening>(openings.map((opening) =>
      db.prepare("SELECT fingerprint, first_seen_at, is_baseline FROM discovered_openings WHERE fingerprint = ?").bind(opening.id),
    ));
    const existingByFingerprint = new Map(
      existing.flatMap((result) => result.results).map((row) => [row.fingerprint, row]),
    );
    const isBaseline = existingCount === 0;

    await db.batch(openings.map((opening) =>
      db.prepare(
        "INSERT INTO discovered_openings (fingerprint, company, position, apply_url, is_baseline, first_seen_at, last_seen_at) VALUES (?, ?, ?, ?, ?, ?, ?) ON CONFLICT(fingerprint) DO UPDATE SET company = excluded.company, position = excluded.position, apply_url = excluded.apply_url, last_seen_at = excluded.last_seen_at",
      ).bind(
        opening.id,
        opening.company,
        opening.position,
        opening.applyUrl,
        isBaseline ? 1 : 0,
        existingByFingerprint.get(opening.id)?.first_seen_at ?? timestamp,
        timestamp,
      ),
    ));

    const now = Date.parse(timestamp);
    return openings.map((opening) => ({
      ...opening,
      isNew: !isBaseline
        && existingByFingerprint.get(opening.id)?.is_baseline !== 1
        && discoveredRecently(existingByFingerprint.get(opening.id)?.first_seen_at ?? timestamp, now),
    }));
  } catch {
    return annotateMemory(openings, timestamp);
  }
}
