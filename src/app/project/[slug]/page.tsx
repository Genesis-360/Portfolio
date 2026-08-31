import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getNextProject, getProject, getProjects, getSite } from "@/lib/content";
import { Sidebar } from "@/components/layout/Sidebar";
import { Reveal, RevealMedia } from "@/components/ui/Reveal";
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
  const description =
    project.intro?.trim() || project.description.join(" ").slice(0, 160);
  return {
    title: project.title,
    description,
    alternates: { canonical: `/project/${project.slug}` },
    openGraph: {
      title: project.title,
      description,
      url: `/project/${project.slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description,
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

  return (
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
        {/* h1 — the primary SEO heading lives in the main column on
            project pages (the sidebar <h2> is the secondary). Previously
            the project page had no <h1> at all, which killed its
            indexing for the project's own name. */}
        <header className="container-edge pt-20 lg:pt-28">
          <Reveal className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-cream/55">
            <span className="h-px w-10 bg-accent" />
            {project.industry} · {project.year}
          </Reveal>
          <h1 className="font-anton text-[clamp(2.4rem,7vw,5.5rem)] uppercase leading-[0.9] tracking-tight text-cream">
            {project.title}
          </h1>
          {project.intro ? (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/70">
              {project.intro}
            </p>
          ) : null}
        </header>

        {/* Mockup stack */}
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

        {/* Per-project JSON-LD so the project actually surfaces in
            structured-data search results. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CreativeWork",
              name: project.title,
              url: absoluteUrl(`/project/${project.slug}`),
              datePublished: project.year,
              about: project.industry,
              keywords: project.services.join(", "),
              author: { "@type": "Organization", name: "OREENZA" },
            }),
          }}
        />

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
  );
}
