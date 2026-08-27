import { NextResponse } from "next/server";
import { getProjects } from "@/lib/content";

const BASE = "https://oreenza.com";

export async function GET() {
  const projects = await getProjects();

  const linkset = [
    {
      anchor: `${BASE}/`,
      "service-doc": [
        { href: `${BASE}/`, type: "text/html", title: "OREENZA — homepage" },
      ],
      "service-desc": [
        { href: `${BASE}/`, type: "text/html", title: "OREENZA — site documentation" },
      ],
      describedby: [
        { href: `${BASE}/robots.txt`, type: "text/plain" },
        { href: `${BASE}/sitemap.xml`, type: "application/xml" },
      ],
      sitemap: [{ href: `${BASE}/sitemap.xml`, type: "application/xml" }],
      "api-catalog": [
        { href: `${BASE}/.well-known/api-catalog`, type: "application/linkset+json" },
      ],
      alternate: [
        { href: `${BASE}/`, type: "text/markdown", title: "Markdown representation" },
      ],
    },
    {
      anchor: `${BASE}/contact`,
      "service-doc": [
        { href: `${BASE}/contact`, type: "text/html", title: "Contact OREENZA" },
      ],
      alternate: [
        { href: `${BASE}/contact`, type: "text/markdown", title: "Markdown representation" },
      ],
    },
    ...projects.map((p) => ({
      anchor: `${BASE}/project/${p.slug}`,
      "service-doc": [
        {
          href: `${BASE}/project/${p.slug}`,
          type: "text/html",
          title: `Project — ${p.title}`,
        },
      ],
      alternate: [
        {
          href: `${BASE}/project/${p.slug}`,
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
