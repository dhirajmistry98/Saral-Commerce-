-- migrations/0000_gifted_frog_thor.sql
DROP TABLE IF EXISTS `usersData`;
CREATE TABLE `usersData` (
    `id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
    `email` text NOT NULL,
    `password` text NOT NULL
);
CREATE UNIQUE INDEX `usersData_email_unique` ON `usersData` (`email`);