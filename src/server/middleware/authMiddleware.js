
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  const token = request.cookies.get("token")?.value; // Get token from cookies

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url), { headers: { "Cache-Control": "no-store" } });
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret); // Decode JWT

    // Attach user data to headers
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("user_id", payload.userId);

    // Forward the modified request with "no-store" cache control
    const response = NextResponse.next();
    response.headers.set("Cache-Control", "no-store");
    response.headers.set("user_id", payload.userId);

    return response;
  } catch (error) {
    return NextResponse.redirect(new URL("/login", request.url), { headers: { "Cache-Control": "no-store" } });
  }
}

export const config = {
  matcher: ["/dashboard/:path*"], // Protect dashboard & API routes
};
