import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const isProd = process.env.NODE_ENV === "production";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accept = request.headers.get("accept") ?? "";

  // Production-only: block the keystatic admin routes. The route handler
  // at src/app/api/keystatic/[[...params]]/route.ts also enforces this, but
  // this proxy entry is what makes the /keystatic UI bundle itself
  // unreachable. We respond 404 rather than 403 so the route's existence
  // isn't disclosed.
  if (
    isProd &&
    (pathname === "/keystatic" ||
      pathname.startsWith("/keystatic/") ||
      pathname === "/api/keystatic" ||
      pathname.startsWith("/api/keystatic/"))
  ) {
    return new NextResponse("Not Found", { status: 404 });
  }

  // Self-contained agent registration descriptor
  if (pathname === "/auth.md") {
    return NextResponse.rewrite(new URL("/md/auth", request.url));
  }

  // Markdown-for-Agents content negotiation (RFC 9727 / Cloudflare Markdown for Agents)
  if (accept.includes("text/markdown")) {
    const target = pathname === "/" ? "/md" : `/md${pathname}`;
    const res = NextResponse.rewrite(new URL(target, request.url));
    res.headers.set("Vary", "Accept");
    return res;
  }

  // Link response headers for agent discovery (RFC 8288 / RFC 9727)
  if (pathname === "/") {
    const res = NextResponse.next();
    res.headers.set(
      "Link",
      "</.well-known/api-catalog>; rel=\"api-catalog\", " +
        "</>; rel=\"service-doc\"; type=\"text/html\", " +
        "</>; rel=\"alternate\"; type=\"text/markdown\", " +
        "</robots.txt>; rel=\"robots\", " +
        "</sitemap.xml>; rel=\"sitemap\", " +
        "</sitemap.xml>; rel=\"describedby\", " +
        "</.well-known/api-catalog>; rel=\"describedby\""
    );
    res.headers.set("Vary", "Accept");
    return res;
  }

  // Every matched URL also has a markdown variant selected by the Accept
  // header. Without Vary: Accept here too, a shared cache can serve the
  // HTML response to a markdown client (or vice versa).
  if (pathname === "/contact" || pathname.startsWith("/project/")) {
    const res = NextResponse.next();
    res.headers.set("Vary", "Accept");
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/contact",
    "/project/:path*",
    "/auth.md",
    // Production-only gate: rewrite /keystatic and the /api/keystatic/*
    // traffic to a 404 so the admin is unreachable without a valid session
    // cookie. The handler at src/app/api/keystatic/[[...params]]/route.ts
    // enforces the same gate on the server side; this proxy entry is the
    // first line of defense (and the only one for the static /keystatic UI).
    "/keystatic",
    "/keystatic/:path*",
    "/api/keystatic",
    "/api/keystatic/:path*",
  ],
};
