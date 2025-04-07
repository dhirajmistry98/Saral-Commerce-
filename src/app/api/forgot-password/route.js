import { handleErrorResponse } from "@/lib/utils";
import { getUserByEmail, updateUserOtp } from "@/server/functions/users";

export const runtime = 'nodejs'; // Ensure Node.js runtime to support SendGrid

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return handleErrorResponse("Email is required", 400);
    }

    const user = await getUserByEmail(email);
    if (!user) {
      return Response.json({
        success: true,
        message: "If your email is in our system, you will receive a password reset code",
      });
    }

    const otp = generateOTP();
    const otpExpiry = new Date();
    otpExpiry.setMinutes(otpExpiry.getMinutes() + 15);

    await updateUserOtp(user.id, otp, otpExpiry);

    const sgMail = (await import('@sendgrid/mail')).default;
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
      to: email,
      from: process.env.FROM_EMAIL || 'dhirajmistry1368@gmail.com',
      subject: 'Password Reset Code - Saral Ecommerce',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Reset Your Password</h2>
          <p>We received a request to reset your password for your Saral Ecommerce account.</p>
          <p>Your verification code is: <strong style="font-size: 24px;">${otp}</strong></p>
          <p>This code will expire in 15 minutes.</p>
          <p>If you didn't request this code, you can safely ignore this email.</p>
        </div>
      `,
    };

    await sgMail.send(msg);

    return Response.json({
      success: true,
      message: "Password reset code sent to your email",
    });
  } catch (error) {
    console.error("Error in forgot-password route:", error);
    return handleErrorResponse("Internal server error", 500);
  }
}
