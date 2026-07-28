import assert from "node:assert/strict";
import test from "node:test";
import { annotateClientDiscoveries } from "../../app/lib/client-discovery";
import { orderOpeningsByDiscovery } from "../../app/lib/opening-order";

class MemoryStorage {
  private readonly values = new Map<string, string>();

  getItem(key: string) {
    return this.values.get(key) ?? null;
  }

  setItem(key: string, value: string) {
    this.values.set(key, value);
  }
}

const opening = (id: string, postedAt: string) => ({
  id,
  company: "Company",
  position: "Intern",
  postedAt,
  discoveredAt: "",
  isNew: false,
});

test("marks newly fetched client openings and places them before older postings", () => {
  const storage = new MemoryStorage();
  const baseline = annotateClientDiscoveries([opening("old", "2026-07-25")], storage, Date.parse("2026-07-28T12:00:00Z"));
  assert.equal(baseline[0].isNew, false);

  const next = annotateClientDiscoveries([
    opening("old", "2026-07-25"),
    opening("backdated-new", "2026-06-01"),
  ], storage, Date.parse("2026-07-28T12:05:00Z"));
  const ordered = orderOpeningsByDiscovery(next);

  assert.equal(next.find((item) => item.id === "backdated-new")?.isNew, true);
  assert.equal(ordered[0].id, "backdated-new");
});
