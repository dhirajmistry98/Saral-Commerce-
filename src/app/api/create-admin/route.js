
import { handleErrorResponse } from '@/lib/utils';
import { createAdmin, getAdminByEmail } from '@/server/functions/admin';
import { nanoid } from 'nanoid';

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
    const { email, password, username, adminSecret } = await request.json();
    
    if (adminSecret !== process.env.ADMIN_SECRET) {
      return handleErrorResponse("Secret is incorrect", 400);
    }

    const existingUser = await getAdminByEmail(email);
    if (existingUser) {
      return handleErrorResponse("Email already in use", 400);
    }

    const id = nanoid(21);
    const hashedPassword = await hashPassword(password);

    await createAdmin(id, username, email, hashedPassword);

    return new Response(
      JSON.stringify({ success: true, message: "Admin registered successfully" }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error in registration route:", error);
    return handleErrorResponse("Internal server error", 500);
  }
}
