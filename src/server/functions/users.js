'use server';

import { db } from '@/server/db';
import { usersData } from '@/server/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export const runtime = 'edge';

/**
 * Get user by email
 */
export const getUserByEmail = async (email) => {
  return await db.select().from(usersData).where(eq(usersData.email, email)).get();
};

/**
 * Get user by ID
 */
export const getUserByID = async (id) => {
  return await db.select().from(usersData).where(eq(usersData.id, id)).get();
};

/**
 * Create a new user
 */
export const createUser = async (id, email, hashedPassword, username, accountType) => {
  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) throw new Error('Email already in use');

    await db.insert(usersData).values({
      id,
      email,
      hashedPassword,
      username,
      accountType
    }).run();

    console.log('User registered successfully.');
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  } finally {
    revalidatePath('/');
  }
};

/**
 * Update user's OTP and expiry
 */
export const updateUserOtp = async (userId, otp, expiryTime) => {
  return await db.update(usersData)
    .set({
      reset_otp: otp,
      reset_otp_expires: expiryTime.toISOString()
    })
    .where(eq(usersData.id, userId))
    .run();
};

/**
 * Verify OTP and expiry
 */
export const verifyOtp = async (userId, otp) => {
  const user = await getUserByID(userId);
  if (!user) return false;

  const currentTime = new Date();
  const expiryTime = new Date(user.reset_otp_expires);

  return user.reset_otp === otp && currentTime < expiryTime;
};

/**
 * Update user password and clear OTP fields
 */
export const updateUserPassword = async (userId, hashedPassword) => {
  return await db.update(usersData)
    .set({
      hashedPassword,
      reset_otp: null,
      reset_otp_expires: null
    })
    .where(eq(usersData.id, userId))
    .run();
};
