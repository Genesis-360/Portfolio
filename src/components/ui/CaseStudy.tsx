"use client";

type CaseStudyProps = {
  project: {
    client: string;
    location: string;
    timeline: string;
    platform: string;
    services: string[];
    problem: string;
    strategy: string;
    outcome: string;
    metrics: { label: string; value: string; context: string }[];
    testimonial?: { quote: string; author: string; role: string };
  };
};

export function CaseStudy({ project }: CaseStudyProps) {
  const {
    client,
    location,
    timeline,
    platform,
    services,
    problem,
    strategy,
    outcome,
    metrics,
    testimonial,
  } = project;

  return (
    <section className="container-edge mt-10 space-y-10 lg:mt-16 lg:space-y-14">
      {/* ── Fast facts ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {timeline && (
          <div className="rounded-sm border border-cream/10 bg-cream/3 p-5">
            <p className="text-[0.65rem] uppercase tracking-[0.25em] text-cream/45">Timeline</p>
            <p className="mt-1 font-body text-lg font-bold text-cream">{timeline}</p>
          </div>
        )}
        {platform && (
          <div className="rounded-sm border border-cream/10 bg-cream/3 p-5">
            <p className="text-[0.65rem] uppercase tracking-[0.25em] text-cream/45">Platform</p>
            <p className="mt-1 font-body text-lg font-bold text-cream">{platform}</p>
          </div>
        )}
        {location && (
          <div className="rounded-sm border border-cream/10 bg-cream/3 p-5">
            <p className="text-[0.65rem] uppercase tracking-[0.25em] text-cream/45">Location</p>
            <p className="mt-1 font-body text-lg font-bold text-cream">{location}</p>
          </div>
        )}
        <div className="rounded-sm border border-cream/10 bg-cream/3 p-5">
          <p className="text-[0.65rem] uppercase tracking-[0.25em] text-cream/45">Services</p>
          <p className="mt-1 font-body text-lg font-bold text-cream leading-tight">
            {services.join(", ")}
          </p>
        </div>
      </div>

      {/* ── Problem ── */}
      <div id="problem" className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 lg:gap-12 items-start">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-accent font-body">The problem</p>
          <div className="mt-3 h-px w-10 bg-accent" />
        </div>
        <p className="text-lg leading-relaxed text-cream/80">{problem}</p>
      </div>

      {/* ── Strategy ── */}
      <div id="strategy" className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 lg:gap-12 items-start">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-accent font-body">The strategy</p>
          <div className="mt-3 h-px w-10 bg-accent" />
        </div>
        <p className="text-lg leading-relaxed text-cream/80">{strategy}</p>
      </div>

      {/* ── Outcome ── */}
      <div id="outcome" className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 lg:gap-12 items-start">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-accent font-body">The outcome</p>
          <div className="mt-3 h-px w-10 bg-accent" />
        </div>
        <p className="text-lg leading-relaxed text-cream/80">{outcome}</p>
      </div>

      {/* ── Metrics ── */}
      {metrics.length > 0 && (
        <div className="border-t border-cream/10 pt-10">
          <p className="text-xs uppercase tracking-[0.3em] text-cream/45">Measurable results</p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {metrics.map((m) => (
              <div
                key={m.label}
                className="rounded-sm border border-cream/10 bg-cream/3 p-6"
              >
                <p className="font-anton text-3xl sm:text-4xl uppercase leading-none tracking-tight text-accent">
                  {m.value}
                </p>
                <p className="mt-2 font-body text-sm font-bold uppercase tracking-wider text-cream">
                  {m.label}
                </p>
                <p className="mt-1 font-body text-xs text-cream/50">{m.context}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Client testimonial ── */}
      {testimonial?.quote && (
        <figure className="border-t border-cream/10 pt-10">
          <p className="text-xs uppercase tracking-[0.3em] text-accent">
            From the client
          </p>
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 lg:gap-12 items-start">
            <div aria-hidden className="hidden lg:block">
              <span
                className="font-anton text-[100px] leading-none text-cream/10 select-none"
                style={{ fontFeatureSettings: '"tnum"' }}
              >
                &ldquo;
              </span>
            </div>
            <div>
              <blockquote className="text-lg leading-relaxed text-cream/80 lg:text-xl">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full ring-2 ring-cream/10">
                  <span className="font-body text-sm font-bold uppercase tracking-wider text-accent">
                    {testimonial.author
                      .split(" ")
                      .map((w) => w[0])
                      .slice(0, 2)
                      .join("")}
                  </span>
                </div>
                <div>
                  <p className="font-body font-medium text-cream">
                    {testimonial.author}
                  </p>
                  <p className="font-body text-sm text-cream/50">
                    {testimonial.role}
                    <span className="mx-2 text-cream/20">/</span>
                    <span className="text-cream/70">{client}</span>
                  </p>
                </div>
              </figcaption>
            </div>
          </div>
        </figure>
      )}
    </section>
  );
}
