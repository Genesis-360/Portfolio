import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getProjects, getSite } from "@/lib/content";
import { absoluteUrl } from "@/lib/url";

function mdResponse(body: string) {
  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Vary": "Accept",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

function bullets(items: Array<string | null | undefined>): string {
  return items
    .filter(Boolean)
    .map((i) => `- ${i}`)
    .join("\n");
}

async function homeMarkdown(): Promise<string> {
  const site = await getSite();
  const projects = await getProjects();

  const lines = [
    "# OREENZA",
    "",
    "Performance-first creative agency for ambitious brands.",
    "",
    "## Services",
    bullets(site.services.map((s) => s.title)),
    "",
    "## Selected works",
    bullets(
      projects.map(
        (p) => `[${p.title}](${absoluteUrl(`/project/${p.slug}`)}) — ${p.client ?? ""} ${p.year ?? ""}`.trim()
      )
    ),
    "",
    "## Contact",
    `- Email: ${site.email}`,
    bullets(site.socials.map((s) => `[${s.label}](${s.href})`)),
    `- Website: ${absoluteUrl("/")}`,
    "",
  ];
  return lines.join("\n");
}

async function contactMarkdown(): Promise<string> {
  const site = await getSite();
  const lines = [
    "# Contact — OREENZA",
    "",
    "Start a project with OREENZA — an independent design & development studio.",
    "",
    `- Email: ${site.email}`,
    "- Book a call: see the embedded calendar on the contact page",
    bullets(site.socials.map((s) => `[${s.label}](${s.href})`)),
    "",
    `Web: ${absoluteUrl("/contact")}`,
    "",
  ];
  return lines.join("\n");
}

async function projectMarkdown(slug: string): Promise<string | null> {
  const projects = await getProjects();
  const p = projects.find((x) => x.slug === slug);
  if (!p) return null;

  const desc = Array.isArray(p.description) ? p.description.join("\n\n") : p.description ?? "";
  const lines = [
    `# ${p.title}`,
    "",
    `Client: ${p.client ?? "—"}`,
    `Year: ${p.year ?? "—"}`,
    p.services?.length ? `Services: ${p.services.join(", ")}` : "",
    "",
    desc,
    "",
    `Project page: ${absoluteUrl(`/project/${p.slug}`)}`,
    "",
  ].filter((l) => l !== "");
  return lines.join("\n");
}

const AUTH_MD = `# auth.md

OREENZA is a static portfolio site for an independent design & development studio.
It publishes no authenticated agent APIs and exposes no protected resources.

## Agent audience

This document describes how automated agents may interact with the public site.

## Public, unauthenticated resources

- Website (HTML): ${absoluteUrl("/")}
- Markdown representation: negotiated via \`Accept: text/markdown\`
- API catalog: ${absoluteUrl("/.well-known/api-catalog")} (application/linkset+json)
- robots.txt: ${absoluteUrl("/robots.txt")}
- sitemap.xml: ${absoluteUrl("/sitemap.xml")}

## Contact (agent-initiated)

Agents may surface the public contact channel to humans or other agents:

- Email: see ${absoluteUrl("/contact")} for the current address
- Social links: see ${absoluteUrl("/contact")}

No programmatic account registration, provisioning, or credential issuance is
offered, so \`POST /agent/auth\` is not implemented and no OAuth Protected
Resource Metadata is published.

## Notes

AI crawler permissions and Content-Signal preferences are declared in robots.txt.
`;

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug?: string[] }> }
) {
  const { slug } = await params;

  if (!slug || slug.length === 0) {
    return mdResponse(await homeMarkdown());
  }

  if (slug[0] === "auth") {
    return mdResponse(AUTH_MD);
  }

  if (slug[0] === "contact") {
    return mdResponse(await contactMarkdown());
  }

  if (slug[0] === "project" && slug[1]) {
    const body = await projectMarkdown(slug[1]);
    if (body) return mdResponse(body);
  }

  return new NextResponse("# Not found\n", {
    status: 404,
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
