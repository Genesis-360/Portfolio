import { notFound } from "next/navigation";
import Link from "next/link";
import { PROJECTS, getProject, getNextProject } from "@/lib/data";
import { Sidebar } from "@/components/layout/Sidebar";
import { RevealMedia } from "@/components/ui/Reveal";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/project/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found — OREENZA" };
  return {
    title: `${project.title} — OREENZA`,
    description: project.intro,
  };
}

export default async function ProjectPage({
  params,
}: PageProps<"/project/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const next = getNextProject(slug);

  return (
    <div className="lg:flex lg:items-start">
      <Sidebar
        variant="sub"
        content="project"
        project={{
          title: project.title,
          category: project.category,
          year: project.year,
          services: project.services,
        }}
      />

      <main className="w-full lg:w-[70%] lg:flex-1">
        {/* Mockup stack */}
        <div className="space-y-4 lg:pr-6">
          <RevealMedia
            src={project.cover}
            alt={`${project.title} — cover mockup`}
            priority
            className="aspect-[16/11] lg:aspect-[16/10]"
          />
          {project.gallery.map((src, i) => (
            <RevealMedia
              key={i}
              src={src}
              alt={`${project.title} — mockup ${i + 1}`}
              className="aspect-[16/11] lg:aspect-[16/10]"
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
            {next.title} →
          </span>
        </Link>
      </main>
    </div>
  );
}
