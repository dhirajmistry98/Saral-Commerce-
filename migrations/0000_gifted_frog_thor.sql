

CREATE TABLE `adminsData` (
	`id` text PRIMARY KEY NOT NULL,
	`username` text NOT NULL,
	`email` text NOT NULL,
	`hashedPassword` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `otps` (
	`id` text PRIMARY KEY NOT NULL,
	`reset_otp` text,
	`reset_otp_expires` text
);
--> statement-breakpoint
CREATE TABLE `usersData` (
	`id` text PRIMARY KEY NOT NULL,
	`username` text NOT NULL,
	`email` text NOT NULL,
	`accountType` text NOT NULL,
	`hashedPassword` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `adminsData_email_unique` ON `adminsData` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `usersData_email_unique` ON `usersData` (`email`);