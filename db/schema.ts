import { index, integer, text, sqliteTable } from "drizzle-orm/sqlite-core";

export const discoveredOpenings = sqliteTable(
  "discovered_openings",
  {
    fingerprint: text("fingerprint").primaryKey(),
    company: text("company").notNull(),
    position: text("position").notNull(),
    applyUrl: text("apply_url").notNull(),
    isBaseline: integer("is_baseline", { mode: "boolean" }).notNull().default(false),
    firstSeenAt: text("first_seen_at").notNull(),
    lastSeenAt: text("last_seen_at").notNull(),
  },
  (table) => [index("discovered_openings_last_seen_idx").on(table.lastSeenAt)],
);
