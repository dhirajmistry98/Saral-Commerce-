CREATE TABLE `adminReview` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`shopId` integer,
	`adminId` integer,
	`decision` text NOT NULL,
	`reviewedAt` integer NOT NULL,
	FOREIGN KEY (`shopId`) REFERENCES `shop`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`adminId`) REFERENCES `merchant`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `merchant` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`businessName` text NOT NULL,
	`createdAt` integer NOT NULL,
	`isAdmin` integer DEFAULT false NOT NULL,
	`approved` integer DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `merchant_email_unique` ON `merchant` (`email`);--> statement-breakpoint
CREATE TABLE `shop` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`merchantId` integer,
	`createdAt` integer NOT NULL,
	`approved` integer DEFAULT false NOT NULL,
	FOREIGN KEY (`merchantId`) REFERENCES `merchant`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
DROP TABLE `customer`;