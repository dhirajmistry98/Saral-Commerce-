CREATE TABLE usersData (
  id TEXT PRIMARY KEY NOT NULL,
  username TEXT NOT NULL,
  email TEXT NOT NULL,
  accountType TEXT NOT NULL,
  hashedPassword TEXT NOT NULL,
  reset_otp TEXT,
  reset_otp_expires TEXT
);
CREATE UNIQUE INDEX usersData_email_unique ON usersData (email);
