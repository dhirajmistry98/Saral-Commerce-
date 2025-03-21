CREATE TABLE `usersData` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `usersData_email_unique` ON `usersData` (`email`);--> statement-breakpoint
DROP TABLE `adminReview`;--> statement-breakpoint
DROP TABLE `customer`;--> statement-breakpoint
DROP TABLE `merchant`;--> statement-breakpoint
DROP TABLE `shop`;