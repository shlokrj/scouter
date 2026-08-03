import { canonicalApplicationUrl, withoutManualDuplicates } from "./opening-dedupe";

type DuplicateStorage = Pick<Storage, "getItem" | "setItem">;

const STORAGE_KEY = "scouter.manual-duplicates.v1";

function duplicateUrls(storage: DuplicateStorage) {
  try {
    const stored = storage.getItem(STORAGE_KEY);
    const values = stored ? JSON.parse(stored) : [];
    return new Set(Array.isArray(values) && values.every((value) => typeof value === "string") ? values : []);
  } catch {
    return new Set<string>();
  }
}

function saveDuplicateUrls(storage: DuplicateStorage, urls: Set<string>) {
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify([...urls].sort()));
  } catch {
    // This local fallback only supports an owner browser when no database is configured.
  }
}

export function filterClientDuplicates<T extends { applyUrl: string }>(openings: T[], storage: DuplicateStorage) {
  return withoutManualDuplicates(openings, duplicateUrls(storage));
}

export function markClientDuplicate(applyUrl: string, storage: DuplicateStorage) {
  const urls = duplicateUrls(storage);
  urls.add(canonicalApplicationUrl(applyUrl));
  saveDuplicateUrls(storage, urls);
}

export function removeClientDuplicate(applyUrl: string, storage: DuplicateStorage) {
  const urls = duplicateUrls(storage);
  urls.delete(canonicalApplicationUrl(applyUrl));
  saveDuplicateUrls(storage, urls);
}
