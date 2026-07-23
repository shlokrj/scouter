CREATE TABLE `discovered_openings` (
	`fingerprint` text PRIMARY KEY NOT NULL,
	`company` text NOT NULL,
	`position` text NOT NULL,
	`apply_url` text NOT NULL,
	`first_seen_at` text NOT NULL,
	`last_seen_at` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `discovered_openings_last_seen_idx` ON `discovered_openings` (`last_seen_at`);