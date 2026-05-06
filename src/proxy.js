import { NextResponse } from "next/server";

export function proxy(request) {
  const { pathname } = request.nextUrl;
  const authToken = request.cookies.get("authToken")?.value;

  // Protect all /admin routes — redirect to login if not authenticated
  if (pathname.startsWith("/admin") && !authToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If already logged in, skip the login page
  if (pathname === "/login" && authToken) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
