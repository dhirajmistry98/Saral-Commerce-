import { handleErrorResponse } from '@/lib/utils';
import { createUser, getUserByEmail } from '@/server/functions/users';
import { nanoid } from 'nanoid';

const { subtle } = globalThis.crypto;


export const runtime = 'edge';

async function hashPassword(password) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.digest("SHA-256", encoder.encode(password));

  return Array.from(new Uint8Array(key))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function POST(request) {
  try {
    const { email, password, username, accountType } = await request.json(); // Destructure email and password

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return handleErrorResponse("Email already in use", 400);
    }

    
    const id = nanoid(21)

    const hashedPassword = await hashPassword(password);

    await createUser(id, email, hashedPassword, username, accountType);

    return new Response(
      JSON.stringify({ success: true, message: "User registered successfully" }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error in registration route:", error);
    return handleErrorResponse("Internal server error", 500);
  }
}