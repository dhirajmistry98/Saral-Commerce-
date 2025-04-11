
import { handleErrorResponse } from "@/lib/utils";
import { getUserByEmail } from "@/server/functions/users";
import { SignJWT } from 'jose';


export const runtime = "edge";

// Function to hash the password using SHA-256
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const hashBuffer = await crypto.subtle.digest("SHA-256", encoder.encode(password));

  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function POST(request) {
    try {
      const body = await request.json();
      console.log('Login request body:', body);
      
      const { email, password } = body;

      if (!email || !password) {
        console.log('Missing credentials:', { email: !!email, password: !!password });
        return handleErrorResponse("Missing email or password", 400);
      }

      // Fetch user from the database
      const user = await getUserByEmail(email);
      console.log('User found:', user);
      
      if (!user) {
        console.log('User not found for email:', email);
        return handleErrorResponse("User doesn't exist", 400);
      }

      const storedHash = user.hashedPassword;
      const storedUserId = user.id;
      const inputHashedPassword = await hashPassword(password);

      if (inputHashedPassword === storedHash) {
        if (!process.env.JWT_SECRET) {
          console.error('JWT_SECRET is not set');
          throw new Error("JWT_SECRET is not set in environment variables");
        }
        
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        console.log('JWT secret created successfully');

        const jwt = await new SignJWT({ userId: storedUserId })
          .setProtectedHeader({ alg: 'HS256' })
          .setExpirationTime('1h')
          .sign(secret);
          
        console.log('JWT token created successfully');
        
        return new Response(
          JSON.stringify({ success: true, message: "Login successful" }),
          {
            status: 200,
            headers: {
              "Content-Type": "application/json",
              "Set-Cookie": `token=${jwt}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=3600`
            }
          }
        );
      } else {
        console.log('Password mismatch for user:', email);
        return handleErrorResponse("Invalid password", 401);
      }
    } catch (error) {
      console.error("Error in login route:", error);
      return handleErrorResponse("Internal server error", 500);
    }
}
