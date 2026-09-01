import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";

type Metric = { label: string; value: string; context: string };

type CaseStudyProps = {
  project: {
    slug: string;
    title: string;
    client: string;
    industry: string;
    year: string;
    location: string;
    timeline: string;
    platform: string;
    services: string[];
    problem: string;
    strategy: string;
    outcome: string;
    metrics: Metric[];
    cover: string;
    intro: string;
    liveUrl: string;
  };
};

export function CaseStudy({ project }: CaseStudyProps) {
  const {
    location,
    timeline,
    platform,
    services,
    problem,
    strategy,
    outcome,
    metrics,
  } = project;

  return (
    <section className="container-edge mt-10 space-y-10 lg:mt-16 lg:space-y-14">
      {/* ── Fast facts ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {timeline && (
          <div className="rounded-sm border border-cream/10 bg-cream/[0.03] p-5">
            <p className="text-[0.65rem] uppercase tracking-[0.25em] text-cream/45">Timeline</p>
            <p className="mt-1 font-body text-lg font-bold text-cream">{timeline}</p>
          </div>
        )}
        {platform && (
          <div className="rounded-sm border border-cream/10 bg-cream/[0.03] p-5">
            <p className="text-[0.65rem] uppercase tracking-[0.25em] text-cream/45">Platform</p>
            <p className="mt-1 font-body text-lg font-bold text-cream">{platform}</p>
          </div>
        )}
        {location && (
          <div className="rounded-sm border border-cream/10 bg-cream/[0.03] p-5">
            <p className="text-[0.65rem] uppercase tracking-[0.25em] text-cream/45">Location</p>
            <p className="mt-1 font-body text-lg font-bold text-cream">{location}</p>
          </div>
        )}
        <div className="rounded-sm border border-cream/10 bg-cream/[0.03] p-5">
          <p className="text-[0.65rem] uppercase tracking-[0.25em] text-cream/45">Services</p>
          <p className="mt-1 font-body text-lg font-bold text-cream leading-tight">
            {services.slice(0, 2).join(", ")}
          </p>
        </div>
      </div>

      {/* ── Problem ── */}
      <div id="problem" className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 lg:gap-12 items-start">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-accent font-body">
            The problem
          </p>
          <div className="mt-3 h-px w-10 bg-accent" />
        </div>
        <p className="text-lg leading-relaxed text-cream/80">
          {problem}
        </p>
      </div>

      {/* ── Strategy ── */}
      <div id="strategy" className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 lg:gap-12 items-start">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-accent font-body">
            The strategy
          </p>
          <div className="mt-3 h-px w-10 bg-accent" />
        </div>
        <p className="text-lg leading-relaxed text-cream/80">
          {strategy}
        </p>
      </div>

      {/* ── Outcome ── */}
      <div id="outcome" className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 lg:gap-12 items-start">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-accent font-body">
            The outcome
          </p>
          <div className="mt-3 h-px w-10 bg-accent" />
        </div>
        <p className="text-lg leading-relaxed text-cream/80">
          {outcome}
        </p>
      </div>

      {/* ── Metrics ── */}
      {metrics.length > 0 && (
        <div className="border-t border-cream/10 pt-10">
          <p className="text-xs uppercase tracking-[0.3em] text-cream/45">
            Measurable results
          </p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {metrics.map((m) => (
              <div
                key={m.label}
                className="rounded-sm border border-cream/10 bg-cream/[0.03] p-6"
              >
                <p className="font-anton text-3xl sm:text-4xl uppercase leading-none tracking-tight text-accent">
                  {m.value}
                </p>
                <p className="mt-2 font-body text-sm font-bold uppercase tracking-wider text-cream">
                  {m.label}
                </p>
                <p className="mt-1 font-body text-xs text-cream/50">
                  {m.context}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── CTA ── */}
      <div className="rounded-sm border border-accent/30 bg-accent/[0.06] p-6 sm:p-8 lg:p-10 text-center">
        <h3 className="font-anton text-[clamp(1.4rem,3vw,2.2rem)] uppercase leading-[0.92] tracking-tight text-cream">
          Ready for your own case study?
        </h3>
        <p className="mt-3 max-w-xl mx-auto font-body text-cream/70 leading-relaxed">
          Every project at Oreenza starts with a conversation about the
          problem before we ever touch a design tool.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <Button href="/contact" variant="primary" cursorLabel="Book">
            Book a discovery call
          </Button>
          <Button href="/services" variant="outline" cursorLabel="See">
            See what we do
          </Button>
        </div>
      </div>
    </section>
  );
}

export function caseStudyMetadata(
  project: CaseStudyProps["project"]
): Metadata {
  const fullDescription = [project.intro, project.problem, project.outcome]
    .filter(Boolean)
    .join(" ")
    .slice(0, 160);

  return {
    title: `${project.title} case study — ${project.client} | Oreenza`,
    description: fullDescription,
    alternates: { canonical: `/project/${project.slug}` },
    openGraph: {
      title: `${project.title} case study — ${project.client}`,
      description: fullDescription,
      url: `/project/${project.slug}`,
      type: "article",
      images: [project.cover],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} case study`,
      description: fullDescription,
    },
  };
}
