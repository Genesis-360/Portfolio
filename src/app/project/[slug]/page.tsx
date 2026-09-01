import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getNextProject, getProject, getProjects, getSite } from "@/lib/content";
import { Sidebar } from "@/components/layout/Sidebar";
import { Reveal, RevealMedia } from "@/components/ui/Reveal";
import { CaseStudy } from "@/components/ui/CaseStudy";
import { caseStudyMetadata } from "@/components/ui/caseStudyMetadata";
import { CallToAction } from "@/components/sections/CallToAction";
import { absoluteUrl } from "@/lib/url";

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p: { slug: string }) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/project/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) {
    return {
      title: "Project not found",
      robots: { index: false, follow: false },
    };
  }

  const caseDescription = [project.intro, project.problem, project.outcome]
    .filter(Boolean)
    .join(" ")
    .slice(0, 160);

  const base = caseStudyMetadata(project);
  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      title: `${project.title} — ${project.client} Case Study | Oreenza`,
      description: caseDescription,
      url: `/project/${project.slug}`,
      type: "article",
      images: [
        {
          url: project.cover,
          width: 1200,
          height: 630,
          alt: `${project.title} — case study cover`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} case study`,
      description: caseDescription,
    },
  };
}

export default async function ProjectPage({
  params,
}: PageProps<"/project/[slug]">) {
  const { slug } = await params;
  const [project, site] = await Promise.all([getProject(slug), getSite()]);
  if (!project) notFound();
  const next = await getNextProject(slug);

  // Build a real ISO date for schema. project.year is "2024" — we pin to
  // Jan 1 of that year. This is a project page (not a blog post), so
  // `datePublished` is informational, not editorial.
  const datePublished = `${project.year}-01-01`;

  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    headline: project.title,
    description: project.intro?.trim() || project.description.join(" ").slice(0, 160),
    image: [
      project.cover,
      ...(project.gallery ?? []),
    ],
    datePublished,
    dateModified: datePublished,
    keywords: project.services.join(", "),
    url: absoluteUrl(`/project/${project.slug}`),
    author: { "@type": "Organization", name: "OREENZA" },
    publisher: {
      "@type": "Organization",
      name: "OREENZA",
      logo: { "@type": "ImageObject", url: "/logo.svg" },
    },
    about: {
      "@type": "Service",
      serviceType: project.services.join(", "),
      provider: { "@type": "Organization", name: "OREENZA" },
    },
    inLanguage: "en",
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: project.title, item: absoluteUrl(`/project/${project.slug}`) },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
      />

      <div className="lg:flex lg:items-start">
        <Sidebar
          variant="sub"
          content="project"
          project={{
            title: project.title,
            category: project.industry,
            year: project.year,
            services: project.services,
            liveUrl: project.liveUrl,
            description: project.description.join(" "),
            index: String(project.index).padStart(2, "0"),
          }}
          data={{
            serviceTitles: [],
            industries: [],
            email: site.email,
            phone: site.phone,
            slotsOpen: site.slotsOpen,
            socials: site.socials,
          }}
        />

        <main id="main" className="w-full lg:w-[70%] lg:flex-1">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="container-edge pt-10">
            <ol className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-cream/40">
              <li>
                <Link href="/" className="transition-colors hover:text-accent">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-cream/70">
                {project.title}
              </li>
            </ol>
          </nav>

          <header className="container-edge pt-10 lg:pt-16">
            <Reveal className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-cream/55">
              <span className="h-px w-10 bg-accent" />
              {project.industry} · {project.year}
            </Reveal>
            <h1 className="font-anton text-[clamp(2.4rem,7vw,5.5rem)] uppercase leading-[0.9] tracking-tight text-cream">
              {project.title}
            </h1>
          </header>

          <CaseStudy project={project} />

          <div className="container-edge mt-10 space-y-4 lg:pr-6">
            <RevealMedia
              src={project.cover}
              alt={`${project.title} — cover`}
              priority
              className="aspect-video"
            />
            {project.gallery.map((src, i) => (
              <RevealMedia
                key={i}
                src={src}
                alt={`${project.title} — mockup ${i + 1} of ${project.gallery.length}`}
                className="aspect-video"
              />
            ))}
          </div>

          {/* Next project */}
          <Link
            href={`/project/${next.slug}`}
            data-cursor="hover"
            data-cursor-label="Next"
            className="group container-edge flex items-center justify-between border-t border-cream/10 py-8"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-cream/45">
              Next project
            </span>
            <span className="font-anton text-xl uppercase tracking-[0.04em] text-cream transition-colors duration-300 group-hover:text-accent">
              {next.title}
              <span className="ml-0.5 align-super font-body text-[0.5em] font-bold text-cream/50">
                ™
              </span>{" "}
              →
            </span>
          </Link>
        </main>
      </div>
    </>
  );
}
