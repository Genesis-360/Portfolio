import { notFound } from "next/navigation";
import Link from "next/link";
import { getNextProject, getProject, getProjects, getSite } from "@/lib/content";
import { Sidebar } from "@/components/layout/Sidebar";
import { RevealMedia } from "@/components/ui/Reveal";
import { HideScrollbar } from "@/components/ui/HideScrollbar";

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/project/[slug]">) {
  const { slug } = await params;
  const [project] = await Promise.all([getProject(slug), getSite()]);
  if (!project) return { title: "Project not found — OREENZA" };
    return {
      title: `${project.title} — OREENZA`,
      description: project.description.join(" "),
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
      <HideScrollbar />
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
          clients: [],
          email: site.email,
          socials: site.socials,
        }}
      />

      <main className="w-full lg:w-[70%] lg:flex-1">
        {/* Mockup stack */}
        <div className="space-y-4 lg:pr-6">
          <RevealMedia
            src={project.cover}
            alt={`${project.title} — cover mockup`}
            priority
            className="aspect-video"
          />
          {project.gallery.map((src, i) => (
            <RevealMedia
              key={i}
              src={src}
              alt={`${project.title} — mockup ${i + 1}`}
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
  );
}
