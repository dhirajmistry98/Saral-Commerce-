export const runtime = "edge";

export async function POST() {
  // Create a response with the cookie removal
  return new Response(
    JSON.stringify({ message: 'Logged out successfully' }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=Strict'
      }
    }
  );
}
  