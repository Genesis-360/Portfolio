import { notFound } from "next/navigation";
import Link from "next/link";
import { EMAIL, PROJECTS, getProject, getNextProject } from "@/lib/data";
import { Sidebar } from "@/components/layout/Sidebar";
import { MaskText, Reveal, RevealMedia } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

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
        <div className="lg:flex lg:gap-10">
          {/* Left — project detail + CTA */}
          <div className="container-edge lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-[38%] lg:flex-col lg:justify-center lg:py-16">
            <Reveal className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-cream/45">
              <span className="h-px w-10 bg-accent" />
              Selected work / {project.index}
            </Reveal>

            <MaskText
              as="h1"
              className="font-anton text-[clamp(2.2rem,4.5vw,4rem)] uppercase leading-[0.9] tracking-tight text-cream"
            >
              {project.title}
            </MaskText>

            <Reveal>
              <p className="mt-5 font-script text-2xl leading-snug text-cream/85">
                {project.intro}
              </p>
            </Reveal>

            <Reveal className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-cream/10 pt-6">
              <div>
                <p className="mb-1 text-[10px] uppercase tracking-[0.2em] text-cream/40">
                  Client
                </p>
                <p className="text-sm text-cream/80">{project.client}</p>
              </div>
              <div>
                <p className="mb-1 text-[10px] uppercase tracking-[0.2em] text-cream/40">
                  Industry
                </p>
                <p className="text-sm text-cream/80">{project.category}</p>
              </div>
              <div>
                <p className="mb-1 text-[10px] uppercase tracking-[0.2em] text-cream/40">
                  Year
                </p>
                <p className="text-sm text-cream/80">{project.year}</p>
              </div>
              <div>
                <p className="mb-1 text-[10px] uppercase tracking-[0.2em] text-cream/40">
                  Services
                </p>
                <p className="text-sm leading-relaxed text-cream/80">
                  {project.services.join(", ")}
                </p>
              </div>
            </Reveal>

            <Reveal className="mt-8 space-y-4 border-t border-cream/10 pt-6">
              {project.description.map((para, i) => (
                <p key={i} className="text-sm leading-relaxed text-cream/60">
                  {para}
                </p>
              ))}
            </Reveal>

            <Reveal className="mt-9 flex flex-wrap items-center gap-5">
              <Button
                href="/contact#book"
                className="border-accent bg-accent text-ink hover:bg-cream"
              >
                Book a 15-min call
              </Button>
              <a
                href={`mailto:${EMAIL}`}
                data-cursor="hover"
                className="text-sm text-cream/50 underline-offset-4 transition-colors hover:text-accent"
              >
                {EMAIL}
              </a>
            </Reveal>
          </div>

          {/* Right — mockups */}
          <div className="space-y-4 pb-16 lg:flex-1 lg:py-16 lg:pr-6">
            <RevealMedia
              src={project.cover}
              alt={`${project.title} — cover mockup`}
              priority
              className="aspect-[16/11] lg:aspect-[4/3]"
            />
            {project.gallery.map((src, i) => (
              <RevealMedia
                key={i}
                src={src}
                alt={`${project.title} — mockup ${i + 1}`}
                className="aspect-[16/11] lg:aspect-[4/3]"
              />
            ))}
          </div>
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
