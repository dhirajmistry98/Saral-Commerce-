import { verifyToken } from "@/lib/verifyToken";
import { getUserByID } from "@/server/functions/users";
import { parse } from "cookie";

export const runtime = "edge";

export async function GET(request) {
  try {
    const cookies = parse(request.headers.get('cookie') || '');
    const token = cookies.token; // Get the JWT from cookies (cookie name is 'token')

    if (!token) {
      return new Response('Unauthorized: No token found', { status: 401 });
    }

    // Verify the JWT
    const payload = await verifyToken(token);

    const userId = payload.userId

    const userData = await getUserByID(userId)

    // Continue with the protected content logic
    return new Response(JSON.stringify({ success: true, userData: userData }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error in JWT verification:', error);
    return new Response('Unauthorized: ' + error.message, { status: 401 });
  }
}