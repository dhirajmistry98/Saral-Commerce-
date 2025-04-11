import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const usersData = sqliteTable("usersData", {
  id: text("id").primaryKey().notNull(),
  username: text("username").notNull(),
  email: text("email").notNull().unique(),
  accountType: text("accountType").notNull(),
  hashedPassword: text("hashedPassword").notNull(),
});

export const otps = sqliteTable("otps", {
  id: text("id").primaryKey().notNull(),
  reset_otp: text("reset_otp"),
  reset_otp_expires: text("reset_otp_expires"),
});

export const adminsData = sqliteTable("adminsData", {
  id: text("id").primaryKey().notNull(),
  username: text("username").notNull(),
  email: text("email").notNull().unique(),
  hashedPassword: text("hashedPassword").notNull(),
});