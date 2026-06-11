import MobileDetect from "mobile-detect";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function isMobileOrTablet(userAgent: string): boolean {
  const md = new MobileDetect(userAgent);
  return md.mobile() !== null || md.tablet() !== null;
}

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const pathname = request.nextUrl.pathname;
  const userAgent = request.headers.get("user-agent") || "";
  const url = request.nextUrl;

  // Skip middleware for static assets and Next.js internal routes
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/static/') ||
    pathname.includes('.') // Skip files with extensions
  ) {
    return NextResponse.next();
  }

  const isMobile = isMobileOrTablet(userAgent);
  const isAuthRoute = pathname.startsWith("/auth");
  
  // Handle authentication first
  if (!token && pathname.startsWith("/dashboard")) {
    const redirectUrl = isMobile ? "/mobile" : "/auth/login";
    return NextResponse.redirect(new URL(redirectUrl, request.url));
  }

  if (token && isAuthRoute) {
    const redirectUrl = isMobile ? "/mobile" : "/dashboard";
    return NextResponse.redirect(new URL(redirectUrl, request.url));
  }

  // Handle mobile/desktop routing
  if (isMobile) {
    // Only redirect to /mobile if user is not already on a mobile route
    if (!pathname.startsWith("/mobile") && !isAuthRoute) {
      return NextResponse.redirect(new URL("/mobile", request.url));
    }
  } else {
    // Desktop user on mobile route - redirect to desktop
    if (pathname.startsWith("/mobile")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};