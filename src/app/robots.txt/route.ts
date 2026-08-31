import { NextResponse } from "next/server";
import { siteUrl } from "@/lib/url";

const ROBOTS = `User-agent: *
Allow: /

# Admin editor, CMS API and internal agent resources are not for crawlers
Disallow: /keystatic
Disallow: /api/
Disallow: /md/

# Content-Signal: declare AI usage preferences for all crawlers.
# (Group-member lines bind to the preceding User-agent block, so this
# would only apply to Bytespider if it lived after its block. Hoisted.)
Content-Signal: ai-train=no, search=yes, ai-input=no

# --- AI crawler permissions ---
User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ClaudeBot
Allow: /

# Google-Extended exists solely to opt in/out of Gemini training on
# Google-indexed content. Saying "Allow: /" here explicitly opts in
# to AI training. Remove this block if you'd rather opt out.
User-agent: Google-Extended
Disallow: /

# Bytespider has a poor reputation for crawl-storming. Slow it down
# by removing its access entirely.
User-agent: Bytespider
Disallow: /

Sitemap: ${siteUrl}/sitemap.xml
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
