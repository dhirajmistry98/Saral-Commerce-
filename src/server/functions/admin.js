
import { db } from '@/server/db';
import { eq } from 'drizzle-orm';
import { adminsData } from '../db/schema';
import { revalidatePath } from 'next/cache';

export const runtime = 'edge';

export const getAdminByEmail = async (email) => {
  'use server';

  return await db.select().from(adminsData).where(eq(adminsData.email, email)).get();
};

export const getAdminById = async (id) => {
  'use server';
  
  return await db.select().from(adminsData).where(eq(adminsData.id, id)).get();
};


export const createAdmin = async ( id, username, email,  hashedPassword) => {
  'use server';

  try {
    // Check if email already exists
    const existingUser = await getAdminByEmail(email);
    if (existingUser) {
      throw new Error('Email already in use');
    }

    // Insert new user
    await db.insert(adminsData).values({ id, username, email,  hashedPassword }).run();

    console.log('User registered successfully.');
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  } finally {
    revalidatePath('/');
  }
};
