import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSessionFromRequest } from "@/lib/auth";

/**
 * Next.js 16+ Proxy Function
 * Replaces the older middleware system for optimized request interception.
 */
export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Protect /admin routes
    if (pathname.startsWith("/admin")) {
        const session = await getSessionFromRequest(request);
        if (!session) {
            return NextResponse.redirect(new URL("/logintoadmin", request.url));
        }
    }

    // Security: Prevent indexing admin, login, and internal API routes
    const response = NextResponse.next();
    if (
        pathname.startsWith("/admin") ||
        pathname.startsWith("/logintoadmin") ||
        pathname.startsWith("/api/admin")
    ) {
        response.headers.set("X-Robots-Tag", "noindex, nofollow");
    }

    return response;
}

/**
 * Proxy Configuration
 * Restricts the proxy to specific segments to improve performance.
 */
export const config = {
    matcher: ["/admin/:path*", "/logintoadmin", "/api/admin/:path*"],
};
