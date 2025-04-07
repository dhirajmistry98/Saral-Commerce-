import { handleErrorResponse } from "@/lib/utils";
import { getUserByEmail, verifyOtp, updateUserPassword } from "@/server/functions/users";

export const runtime = 'nodejs';

async function hashPassword(password) {
  const encoder = new TextEncoder();
  const hashBuffer = await crypto.subtle.digest("SHA-256", encoder.encode(password));

  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function POST(request) {
  try {
    const { email, otp, newPassword } = await request.json();

    if (!email || !otp || !newPassword) {
      return handleErrorResponse("Missing required fields", 400);
    }

    const user = await getUserByEmail(email);
    if (!user) {
      return handleErrorResponse("User not found", 404);
    }

    const isOtpValid = await verifyOtp(user.id, otp);
    if (!isOtpValid) {
      return handleErrorResponse("Invalid or expired OTP", 400);
    }

    const hashedPassword = await hashPassword(newPassword);
    await updateUserPassword(user.id, hashedPassword);

    return Response.json({
      success: true,
      message: "Password successfully reset",
    });
  } catch (error) {
    console.error("Error in reset password route:", error);
    return handleErrorResponse("Internal server error", 500);
  }
}
