import { notFound } from "next/navigation";
import Link from "next/link";
import { EMAIL, PROJECTS, getProject, getNextProject } from "@/lib/data";
import { Sidebar } from "@/components/layout/Sidebar";
import { MaskText, Reveal } from "@/components/ui/Reveal";
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
        {/* Header */}
        <section className="container-edge pb-10 pt-24 lg:pt-32">
          <Reveal className="mb-8 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-cream/45">
            <span className="h-px w-10 bg-accent" />
            Selected work / {project.index}
          </Reveal>

          <MaskText
            as="h1"
            className="font-anton text-[clamp(2.8rem,9vw,7rem)] uppercase leading-[0.86] tracking-tight text-cream"
          >
            {project.title}
          </MaskText>

          <div className="mt-10 grid grid-cols-2 gap-6 border-t border-cream/10 pt-8 text-sm sm:grid-cols-4">
            <div>
              <p className="mb-1 text-[11px] uppercase tracking-[0.2em] text-cream/40">
                Client
              </p>
              <p className="text-cream/80">{project.client}</p>
            </div>
            <div>
              <p className="mb-1 text-[11px] uppercase tracking-[0.2em] text-cream/40">
                Category
              </p>
              <p className="text-cream/80">{project.category}</p>
            </div>
            <div>
              <p className="mb-1 text-[11px] uppercase tracking-[0.2em] text-cream/40">
                Year
              </p>
              <p className="text-cream/80">{project.year}</p>
            </div>
            <div>
              <p className="mb-1 text-[11px] uppercase tracking-[0.2em] text-cream/40">
                Services
              </p>
              <p className="text-cream/80">{project.services.join(", ")}</p>
            </div>
          </div>
        </section>

        {/* Cover */}
        <RevealMedia
          src={project.cover}
          alt={project.title}
          priority
          className="container-edge aspect-[16/11] lg:aspect-[16/9]"
        />

        {/* Intro */}
        <section className="container-edge py-16 lg:py-24">
          <Reveal>
            <p className="max-w-3xl font-script text-3xl leading-snug text-cream/90 lg:text-4xl">
              {project.intro}
            </p>
          </Reveal>
        </section>

        {/* Description + services */}
        <section className="container-edge grid grid-cols-1 gap-10 border-t border-cream/10 py-16 lg:grid-cols-12">
          <h2 className="font-anton text-sm uppercase tracking-[0.2em] text-cream/40 lg:col-span-3">
            The Work
          </h2>
          <div className="space-y-6 lg:col-span-6">
            {project.description.map((para, i) => (
              <Reveal key={i}>
                <p className="text-lg leading-relaxed text-cream/70">{para}</p>
              </Reveal>
            ))}
          </div>
          <ul className="flex flex-col gap-3 lg:col-span-3">
            {project.services.map((s) => (
              <li
                key={s}
                className="flex items-center gap-3 border-b border-cream/10 pb-3 text-sm text-cream/70"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {s}
              </li>
            ))}
          </ul>
        </section>

        {/* Gallery */}
        {project.gallery.length > 0 && (
          <section className="container-edge space-y-6 pb-16">
            {project.gallery.map((src, i) => (
              <RevealMedia
                key={i}
                src={src}
                alt={`${project.title} — visual ${i + 1}`}
                className="aspect-[16/11] lg:aspect-[16/9]"
              />
            ))}
          </section>
        )}

        {/* Next project */}
        <Link
          href={`/project/${next.slug}`}
          data-cursor="hover"
          data-cursor-label="Next"
          className="group container-edge block border-t border-cream/10 py-20 transition-colors hover:bg-cream/[0.02]"
        >
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-cream/45">
            Next Project
          </p>
          <MaskText
            as="h2"
            className="font-anton text-[clamp(2.4rem,8vw,6rem)] uppercase leading-[0.9] tracking-tight text-cream transition-colors duration-500 group-hover:text-accent"
          >
            {next.title}
          </MaskText>
          <p className="mt-4 text-sm text-cream/50">
            {next.category} — {next.year} →
          </p>
        </Link>

        {/* CTA */}
        <section className="container-edge border-t border-cream/10 py-16">
          <Reveal>
            <p className="font-script text-3xl text-cream/80">
              Have a project in mind?
            </p>
            <a
              href={`mailto:${EMAIL}`}
              data-cursor="hover"
              className="mt-4 inline-block font-anton text-2xl uppercase text-accent underline-offset-4 hover:underline"
            >
              {EMAIL}
            </a>
          </Reveal>
        </section>
      </main>
    </div>
  );
}
