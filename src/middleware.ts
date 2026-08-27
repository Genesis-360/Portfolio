import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accept = request.headers.get("accept") ?? "";

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
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/contact", "/project/:path*", "/auth.md"],
};
