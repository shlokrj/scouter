export type DiscoverableOpening = {
  company: string;
  position: string;
  postedAt: string | null;
  discoveredAt: string;
  isNew: boolean;
};

function timestamp(value: string | null) {
  const parsed = Date.parse(value ?? "");
  return Number.isFinite(parsed) ? parsed : 0;
}

export function orderOpeningsByDiscovery<T extends DiscoverableOpening>(openings: T[]) {
  return [...openings].sort((left, right) =>
    Number(right.isNew) - Number(left.isNew)
      || timestamp(right.discoveredAt) - timestamp(left.discoveredAt)
      || timestamp(right.postedAt) - timestamp(left.postedAt)
      || left.company.localeCompare(right.company)
      || left.position.localeCompare(right.position),
  );
}
