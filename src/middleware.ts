import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Static files and internal routes bypass
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/images") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const roleCookie =
    request.cookies.get("tanyaternak_role")?.value ||
    request.cookies.get("chickyai_role")?.value;

  // 1. STRICT ADMIN ROLE LOCK:
  // Jika akun adalah ADMIN dan belum logout, ADMIN HANYA BISA MENGAKSES /admin/*
  if (roleCookie === "ADMIN") {
    // Jika admin membuka halaman non-admin (misal: /, /about, /riset, /login, /dashboard)
    // atau sedang di halaman /admin/login padahal sudah login
    if (!pathname.startsWith("/admin") || pathname === "/admin/login") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  // 2. PROTEKSI ROUTE ADMIN (/admin/* kecuali /admin/login untuk yang belum login)
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    if (!roleCookie) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (roleCookie !== "ADMIN") {
      // Regular user yang mencoba masuk ke admin -> redirect ke /dashboard
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
  }

  // 3. JIKA USER BIASA SUDAH LOGIN MEMBUKA /login ATAU /register -> redirect ke /dashboard
  if (roleCookie === "USER" && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // 4. PROTECTED USER ROUTES (/dashboard, /chat, /profile)
  const isProtectedUserRoute =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/chat") ||
    pathname.startsWith("/profile");

  if (isProtectedUserRoute) {
    if (!roleCookie) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes
     * - _next/static, _next/image
     * - images, favicon, static files
     */
    "/((?!api|_next/static|_next/image|images|favicon.ico|.*\\..*).*)",
  ],
};
