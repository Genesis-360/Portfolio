import { NextResponse } from "next/server";
import { getProjects } from "@/lib/content";
import { absoluteUrl } from "@/lib/url";

export async function GET() {
  const projects = await getProjects();

  const linkset = [
    {
      anchor: absoluteUrl("/"),
      "service-doc": [
        { href: absoluteUrl("/"), type: "text/html", title: "OREENZA — homepage" },
      ],
      "service-desc": [
        { href: absoluteUrl("/"), type: "text/html", title: "OREENZA — site documentation" },
      ],
      describedby: [
        { href: absoluteUrl("/robots.txt"), type: "text/plain" },
        { href: absoluteUrl("/sitemap.xml"), type: "application/xml" },
      ],
      sitemap: [{ href: absoluteUrl("/sitemap.xml"), type: "application/xml" }],
      "api-catalog": [
        { href: absoluteUrl("/.well-known/api-catalog"), type: "application/linkset+json" },
      ],
      alternate: [
        { href: absoluteUrl("/"), type: "text/markdown", title: "Markdown representation" },
      ],
    },
    {
      anchor: absoluteUrl("/contact"),
      "service-doc": [
        { href: absoluteUrl("/contact"), type: "text/html", title: "Contact OREENZA" },
      ],
      alternate: [
        { href: absoluteUrl("/contact"), type: "text/markdown", title: "Markdown representation" },
      ],
    },
    ...projects.map((p) => ({
      anchor: absoluteUrl(`/project/${p.slug}`),
      "service-doc": [
        {
          href: absoluteUrl(`/project/${p.slug}`),
          type: "text/html",
          title: `Project — ${p.title}`,
        },
      ],
      alternate: [
        {
          href: absoluteUrl(`/project/${p.slug}`),
          type: "text/markdown",
          title: "Markdown representation",
        },
      ],
    })),
  ];

  return new NextResponse(JSON.stringify({ linkset }, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/linkset+json; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
