import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const authToken = request.cookies.get("authToken")?.value;

  // Define routes
  const isAuthRoute = ["/login"].includes(pathname);
  const isProtectedRoute = ["/admin/create", "/admin"].some((route) =>
    pathname.startsWith(route)
  );
  // Redirect authenticated users away from auth pages
  if (authToken && isAuthRoute) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }
  // Redirect unauthenticated users to login page or return 401 for API routes
  if (!authToken && isProtectedRoute) {
    if (pathname.startsWith("/api")) {
      return NextResponse.json(
        { message: "Access Denied !!", success: false },
        { status: 401 }
      );
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Allow the request to proceed
  return NextResponse.next();
}

// Configure paths where middleware should run
export const config = {
  matcher: [
    "/admin",
    "/login",
    "/signup",
    "/add-task",
    "/show-tasks",
    "/profile/:path*",
    "/api/:path*",
  ],
};
