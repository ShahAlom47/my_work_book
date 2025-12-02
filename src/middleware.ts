import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const pathname = req.nextUrl.pathname.toLowerCase();
    const token = req.nextauth.token;
    const role = token?.role;



    // -------------------
    // 1️⃣ Public Routes
    // -------------------
    const publicRoutes = ["/", "/login", "/register"];
    const publicApis = ["/api/public", "/api/health"];

    if (
      publicRoutes.includes(pathname) ||
      publicApis.includes(pathname) ||
      pathname.startsWith("/api/auth")
    ) {
      return NextResponse.next();
    }

    // -------------------
    // 2️⃣ Require login for private routes
    // -------------------
    if (!token) {
      const redirectTo = req.nextUrl.pathname + req.nextUrl.search;
      return NextResponse.redirect(
        new URL(`/login?redirect=${encodeURIComponent(redirectTo)}`, req.url)
      );
    }

    // -------------------
    // 3️⃣ Admin-only pages & APIs
    // -------------------
    if ((pathname.startsWith("/dashboard/admin") || ["/api/admin/users","/api/admin/stats"].includes(pathname)) && role === "admin") {
      return NextResponse.next();
    }

    // -------------------
    // 4️⃣ User-only pages
    // -------------------
    if (pathname.startsWith("/dashboard/user") && (role === "user" || role === "admin")) {
      return NextResponse.next();
    }

    // -------------------
    // 5️⃣ General dashboard — any logged-in user
    // -------------------
    if (pathname === "/dashboard") {
      return NextResponse.next();
    }

    // -------------------
    // 6️⃣ MyBook pages & APIs — any logged-in user
    // -------------------
    if (pathname.startsWith("/my-book") || pathname.startsWith("/api/my-books")) {
      return NextResponse.next();
    }

    // -------------------
    // 7️⃣ Settings page — any logged-in user
    // -------------------
    if (pathname.startsWith("/user/settings")|| pathname.startsWith("/api/user/update-name")) {
      return NextResponse.next();
    }

    // -------------------
    // ❌ Default: Unauthorized
    // -------------------
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  },
  {
    callbacks: {
      authorized({ token, req }) {
        const path = req.nextUrl.pathname.toLowerCase();

        const publicRoutes = ["/", "/login", "/register"];
        const publicApis = ["/api/public", "/api/health"];

        if (
          publicRoutes.includes(path) ||
          publicApis.includes(path) ||
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

// -------------------
// Middleware matcher
// -------------------
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/api/:path*",
    "/user/:path*",   // covers /user/settings
    "/my-book/:path*",
  ],
};
