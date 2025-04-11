
import { db } from '@/server/db';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { usersData } from '../db/schema';

export const runtime = 'edge';

export const getUserByEmail = async (email) => {
  'use server';

  return await db.select().from(usersData).where(eq(usersData.email, email)).get();
};

export const getUserByID = async (id) => {
  return await db.select().from(usersData).where(eq(usersData.id, id)).get();
};

export const createUser = async (id, email, hashedPassword, username, accountType) => {
  'use server';

  try {
    // Check if email already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      throw new Error('Email already in use');
    }

    // Insert new user
    await db.insert(usersData).values({ id, email, hashedPassword, username, accountType }).run();

    console.log('User registered successfully.');
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  } finally {
    revalidatePath('/');
  }
};
