import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// Only one middleware function should be exported.
export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  // Scenario 1: User is logged in.
  // Redirect them away from auth pages to the dashboard.
  if (
    token &&
    (url.pathname.startsWith("/sign-in") ||
      url.pathname.startsWith("/sign-up") ||
      url.pathname.startsWith("/verify") ||
      url.pathname === "/") // Important: Check for the exact root path
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Scenario 2: User is NOT logged in and is trying to access a protected route.
  // Redirect them to the sign-in page.
  if (!token && url.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // If neither of the above, allow the request to continue.
  return NextResponse.next();
}

// This config specifies which paths the middleware will run on.
export const config = {
  matcher: [
    "/sign-in",
    "/sign-up",
    "/",
    "/dashboard/:path*",
    "/verify/:path*",
  ],
};
