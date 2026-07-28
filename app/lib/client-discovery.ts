import { type DiscoverableOpening } from "./opening-order";

type StoredDiscovery = {
  firstSeenAt: string;
  isBaseline: boolean;
};

type StoredDiscoveries = {
  version: 1;
  openings: Record<string, StoredDiscovery>;
};

type ReadWriteStorage = Pick<Storage, "getItem" | "setItem">;

const STORAGE_KEY = "scouter.opening-discoveries.v1";
const NEW_DISCOVERY_WINDOW_MS = 7 * 24 * 60 * 60 * 1000;

function isRecent(value: string, now: number) {
  const timestamp = Date.parse(value);
  return Number.isFinite(timestamp) && now - timestamp >= 0 && now - timestamp < NEW_DISCOVERY_WINDOW_MS;
}

function readDiscoveries(storage: ReadWriteStorage) {
  try {
    const stored = storage.getItem(STORAGE_KEY);
    if (!stored) return null;
    const value = JSON.parse(stored) as StoredDiscoveries;
    return value.version === 1 && value.openings && typeof value.openings === "object" ? value : null;
  } catch {
    return null;
  }
}

// Vercel's serverless runtime has no configured durable database. This keeps a
// viewer's first-seen history so a newly fetched opening still receives the
// same new signal and ordering as the durable server path.
export function annotateClientDiscoveries<T extends DiscoverableOpening & { id: string }>(
  openings: T[],
  storage: ReadWriteStorage,
  now = Date.now(),
) {
  const stored = readDiscoveries(storage);
  const isBaseline = !stored;
  const next: StoredDiscoveries = stored ?? { version: 1, openings: {} };
  const timestamp = new Date(now).toISOString();

  const annotated = openings.map((opening) => {
    const existing = next.openings[opening.id];
    if (!existing) {
      next.openings[opening.id] = {
        firstSeenAt: opening.discoveredAt || timestamp,
        isBaseline: isBaseline && !opening.isNew,
      };
    }

    const discovery = next.openings[opening.id];
    return {
      ...opening,
      discoveredAt: discovery.firstSeenAt,
      isNew: opening.isNew || (!discovery.isBaseline && isRecent(discovery.firstSeenAt, now)),
    };
  });

  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Browser storage is an enhancement; the server result remains usable.
  }

  return annotated;
}
