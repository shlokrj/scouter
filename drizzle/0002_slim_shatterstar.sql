CREATE TABLE `manual_duplicate_overrides` (
	`canonical_url` text PRIMARY KEY NOT NULL,
	`apply_url` text NOT NULL,
	`marked_at` text NOT NULL
);
