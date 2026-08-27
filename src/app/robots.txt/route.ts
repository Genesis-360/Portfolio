import { NextResponse } from "next/server";

const BASE = "https://oreenza.com";

const ROBOTS = `User-agent: *
Allow: /

# Admin editor, CMS API and internal agent resources are not for crawlers
Disallow: /keystatic
Disallow: /api/
Disallow: /md/

# --- AI crawler permissions ---
User-agent: GPTBot
Allow: /
Disallow: /keystatic
Disallow: /api/

User-agent: OAI-SearchBot
Allow: /
Disallow: /keystatic
Disallow: /api/

User-agent: Claude-Web
Allow: /
Disallow: /keystatic
Disallow: /api/

User-agent: anthropic-ai
Allow: /
Disallow: /keystatic
Disallow: /api/

User-agent: ClaudeBot
Allow: /
Disallow: /keystatic
Disallow: /api/

User-agent: Google-Extended
Allow: /
Disallow: /keystatic
Disallow: /api/

User-agent: Bytespider
Allow: /
Disallow: /keystatic
Disallow: /api/

# --- Content Signals: declare AI usage preferences ---
# See https://contentsignals.org/
Content-Signal: ai-train=no, search=yes, ai-input=no

Sitemap: ${BASE}/sitemap.xml
`;

export function GET() {
  return new NextResponse(ROBOTS, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
