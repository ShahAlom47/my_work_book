import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const pathname = req.nextUrl.pathname.toLowerCase();
    const token = req.nextauth.token;
    const role = token?.role;

    // Public pages
    const publicRoutes = ["/", "/login", "/register"];

    // Public APIs
    const publicApi = ["/api/public", "/api/health"];

    // Admin-only APIs
    const adminApi = ["/api/admin/users", "/api/admin/stats"];

    // 🚀 1) Public routes allowed (No Auth Required)
    if (
      publicRoutes.includes(pathname) ||
      publicApi.includes(pathname) ||
      pathname.startsWith("/api/auth")
    ) {
      return NextResponse.next();
    }

    // ❌ 2) Require Login for all private routes
    if (!token) {
      const redirectTo = req.nextUrl.pathname + req.nextUrl.search;
      return NextResponse.redirect(
        new URL(`/login?redirect=${encodeURIComponent(redirectTo)}`, req.url)
      );
    }

    // 🚀 3) Admin-only pages
    if (pathname.startsWith("/dashboard/admin") && role === "admin") {
      return NextResponse.next();
    }

    // 🚀 4) Admin-only APIs
    if (adminApi.includes(pathname) && role === "admin") {
      return NextResponse.next();
    }

    // 🚀 5) User-only pages
    if (
      pathname.startsWith("/dashboard/user") &&
      (role === "user" || role === "admin")
    ) {
      return NextResponse.next();
    }

    // 🚀 6) General dashboard — logged-in users only
    if (pathname === "/dashboard" && (role === "user" || role === "admin")) {
      return NextResponse.next();
    }

    // 🚀 7) MyBook routes — logged-in users only
    if (pathname.startsWith("/my-book")) {
      return NextResponse.next();
    }

    // ❌ 8) Unauthorized for others
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  },
  {
    callbacks: {
      authorized({ token, req }) {
        const path = req.nextUrl.pathname.toLowerCase();

        const publicRoutes = ["/", "/login", "/register"];
        const publicApi = ["/api/public", "/api/health"];

        if (
          publicRoutes.includes(path) ||
          publicApi.includes(path) ||
          path.startsWith("/api/auth")
        ) {
          return true;
        }

        // Private routes must have login
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/api/:path*",
    "/user/:path*",
    "/my-book/:path*"
  ],
};
