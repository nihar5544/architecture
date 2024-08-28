import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const authToken = request.cookies.get("authToken")?.value;

  console.log("Auth Token:", authToken);
  console.log("Requested Path:", pathname);

  const isAuthRoute = ["/login"].includes(pathname);
  const isProtectedRoute = ["/admin/create", "/admin"].some((route) =>
    pathname.startsWith(route)
  );

  if (authToken && isAuthRoute) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }
  if (!authToken && isProtectedRoute) {
    if (pathname.startsWith("/api")) {
      return NextResponse.json(
        { message: "Access Denied !!", success: false },
        { status: 401 }
      );
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/admin",
    "/admin/create",
    "/admin/inquiry-details",
    "/admin/projects",
    "/contact",
    "/login",
    "/services",
    "/projects",
    "/api/:path*",
  ],
};
