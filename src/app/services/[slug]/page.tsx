import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Sidebar } from "@/components/layout/Sidebar";
import { Reveal } from "@/components/ui/Reveal";
import { Footer } from "@/components/sections/Footer";
import { getSite, getProjects } from "@/lib/content";

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const SERVICE_LONG_FORM: Record<string, { intro: string; sections: { heading: string; body: string }[] }> = {
  "brand-identity": {
    intro:
      "A brand is the first thing a customer sees before they read a single word. We build identities that carry meaning — not just logos that look good in a deck.",
    sections: [
      {
        heading: "Naming",
        body: "The hardest part. We run structured naming sprints to find names that are ownable, pronounceable, and don't collide with existing trademarks. We test for social handles, domains, and emotional resonance before we ever write them down formally.",
      },
      {
        heading: "Logo systems",
        body: "Not a single mark — a system. Primary logo, condensed logo for narrow spaces, favicon, watermark, reversed version. We deliver SVGs that scale to a billboard and a favicon without re-drawing.",
      },
      {
        heading: "Brand guidelines",
        body: "A PDF that your future self and any freelancer can open and understand. Colour codes with real-world usage notes, typography scales with specimen text, logo rules with examples of what breaks them.",
      },
      {
        heading: "Voice & tone",
        body: "How you write is part of how you're perceived. We define your voice — then write three sample pieces (an ad, a support response, and an email) to prove it works in context.",
      },
    ],
  },
  "web-design": {
    intro:
      "Your website is your best salesperson that never sleeps. We build it to load fast, rank in search, and turn visitors into enquiries — without the bloat that slows most sites down.",
    sections: [
      {
        heading: "UX/UI design",
        body: "We start with user flows and wireframes before any pixel. Every decision traces back to a user need or a business goal — not a template grid. The result is a site that feels considered, not assembled.",
      },
      {
        heading: "Design systems",
        body: "For projects that scale. We build a component library with documented states, variants, and usage rules — so engineering can ship new pages without re-designing the wheel every sprint.",
      },
      {
        heading: "Next.js development",
        body: "Server-rendered, statically generated, or hybrid — we pick the rendering strategy that matches your traffic pattern. Most client sites run at 95+ Lighthouse scores out of the box.",
      },
      {
        heading: "CMS setup",
        body: "We set up Keystatic or Sanity with your content model, train your team to use it, and leave documentation. You should be able to add a blog post without touching code.",
      },
    ],
  },
  "social-media-management": {
    intro:
      "Social media done right compounds. Done wrong, it's a time sink that produces nothing. We run accounts that grow because the content earns attention — not because an algorithm was tricked.",
    sections: [
      {
        heading: "Content calendars",
        body: "We build 30-day content plans around your product cycles, seasonal moments, and audience behaviour patterns. The calendar is built first — so posting never becomes reactive.",
      },
      {
        heading: "Captions & creative",
        body: "Written to your voice, not a copywriter's voice. We give you caption options with hooks, body, and CTAs — and explain why each version works for its goal.",
      },
      {
        heading: "Community engagement",
        body: "Responding to comments, DMs, and mentions in a way that builds trust — not just manages noise. We set up automations for the stuff that doesn't need a human and flag the stuff that does.",
      },
      {
        heading: "Analytics",
        body: "Monthly reporting with the numbers that matter: reach, saves, referral traffic, and follower quality — not vanity metrics. We tell you what's working and what's not in plain English.",
      },
    ],
  },
  "gbp-management": {
    intro:
      "Google Business Profile is the most underused local marketing tool in the world. For service-area businesses and brick-and-mortar locations, it is the business.",
    sections: [
      {
        heading: "Profile setup",
        body: "Every field completed correctly, photos uploaded, categories set, and Q&A populated with real answers. We fix the basics that most profiles get wrong.",
      },
      {
        heading: "Weekly posts",
        body: "Google rewards active profiles. We post weekly offers, events, or updates — the kind of content that moves the needle on local ranking without burning out your team.",
      },
      {
        heading: "Review management",
        body: "We set up automated review requests, write template responses (personalised for context), and monitor for new reviews daily. 50 real reviews can triple your click-through rate from Maps.",
      },
      {
        heading: "Local SEO",
        body: "NAP consistency across directories, local keyword targeting in post copy, and citation building — the foundation that Google uses to decide whether your business is real and relevant.",
      },
    ],
  },
  "app-development": {
    intro:
      "Mobile apps aren't just about presence on a home screen. Done well, they're the most direct relationship you can have with a user — no algorithm between you and the person who downloaded it.",
    sections: [
      {
        heading: "iOS & Android",
        body: "Native builds or cross-platform — we recommend the approach that matches your budget, timeline, and the complexity of what the app needs to do. Not every app needs to be native.",
      },
      {
        heading: "React Native",
        body: "For teams that want one codebase for both platforms without sacrificing performance. We use it for content apps, marketplaces, and internal tools where iteration speed matters more than platform-specific polish.",
      },
      {
        heading: "API integrations",
        body: "Connecting your app to your backend, payment processor, CRM, or third-party services. We design the integration layer to be maintainable — so a future developer doesn't have to re-do it.",
      },
      {
        heading: "Maintenance",
        body: "App store compliance, OS version support, and security updates. We offer monthly retainers for clients who need their app to stay current without hiring a dedicated mobile engineer.",
      },
    ],
  },
  "seo-with-ai": {
    intro:
      "SEO isn't a checklist — it's an ongoing strategy that feeds every other marketing channel you run. We use AI to scale the research and analysis that used to take weeks, then apply it with editorial judgment.",
    sections: [
      {
        heading: "AI keyword research",
        body: "We map your entire keyword landscape — commercial intent, informational, and long-tail — using AI to cluster semantically related terms. The result is an actionable keyword map, not a spreadsheet with 2,000 rows.",
      },
      {
        heading: "Content optimization",
        body: "Existing content audited against what's actually ranking, then rewritten to compete. We look at top-ranking pages, identify what Google rewards, and write to that bar — not above or below it.",
      },
      {
        heading: "Technical SEO",
        body: "Core Web Vitals, crawlability, indexation, structured data, hreflang, and canonical strategy. We run a full technical audit and fix the issues that actually affect ranking — not every warning that Screaming Frog throws.",
      },
      {
        heading: "Rank tracking",
        body: "Weekly position tracking for your target keywords, with trend reporting and alerts when rankings shift. We catch drops before they become traffic collapses.",
      },
    ],
  },
};

export async function generateStaticParams() {
  const site = await getSite();
  return site.services.map((s) => ({ slug: slugify(s.title) }));
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const site = await getSite();
  const matched = site.services.find((s) => slugify(s.title) === slug);

  if (!matched) {
    return { title: "Service not found", robots: { index: false } };
  }

  const serviceContent = SERVICE_LONG_FORM[slug];
  const description = serviceContent
    ? serviceContent.intro
    : `${matched.items.slice(0, 3).join(", ")} and more. Built by OREENZA.`;

  return {
    title: `${matched.title} — Services | OREENZA`,
    description,
    alternates: { canonical: `/services/${slug}` },
    openGraph: {
      title: `${matched.title} — OREENZA`,
      description,
      url: `/services/${slug}`,
      type: "website",
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const [site, projects] = await Promise.all([getSite(), getProjects()]);

  const matched = site.services.find((s) => slugify(s.title) === slug);
  if (!matched) notFound();

  const content = SERVICE_LONG_FORM[slug];
  const relatedProjects = projects.filter((p) =>
    p.services.some(
      (s) =>
        s.toLowerCase().includes(matched.title.toLowerCase().split(" ")[0])
    )
  );

  return (
    <div className="lg:flex lg:items-start">
      <Sidebar
        variant="sub"
        content="services"
        data={{
          serviceTitles: site.services.map((s) => s.title),
          industries: site.industries,
          email: site.email,
          phone: site.phone,
          slotsOpen: site.slotsOpen,
          socials: site.socials,
        }}
      />

      <main id="main" className="w-full lg:w-[70%] lg:flex-1">
        {/* Back link */}
        <div className="container-edge pt-10">
          <Link
            href="/services"
            data-cursor="hover"
            className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-cream/45 transition-colors hover:text-accent">
            <span aria-hidden className="transition-transform group-hover:-translate-x-1">←</span>
            All services
          </Link>
        </div>

        {/* Header */}
        <header className="container-edge pt-12 lg:pt-16">
          <Reveal className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-cream/45">
            <span className="h-px w-10 bg-accent" />
            {matched.title}
          </Reveal>
          <h1 className="font-anton text-[clamp(2.4rem,9vw,6.5rem)] uppercase leading-[0.88] tracking-tight text-cream">
            {matched.title}
          </h1>
          {content && (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/65">
              {content.intro}
            </p>
          )}
        </header>

        {/* What you get */}
        {content && (
          <div className="container-edge mt-16 space-y-10 lg:mt-20 lg:space-y-12">
            {content.sections.map((section) => (
              <div
                key={section.heading}
                className="grid grid-cols-1 gap-6 border-t border-cream/10 py-8 lg:grid-cols-[1fr_2.5fr] lg:gap-12 lg:py-10">
                <div>
                  <h2 className="font-anton text-xl uppercase leading-tight tracking-tight text-cream lg:text-2xl">
                    {section.heading}
                  </h2>
                  <div className="mt-3 h-px w-8 bg-accent" />
                </div>
                <p className="text-base leading-relaxed text-cream/70 lg:text-lg">
                  {section.body}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Services grid — what you get */}
        <div className="container-edge mt-14 lg:mt-20">
          <p className="mb-6 text-[10px] uppercase tracking-[0.2em] text-cream/35">
            What&apos;s included
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {matched.items.map((item) => (
              <div
                key={item}
                className="rounded-sm border border-cream/10 bg-cream/[0.03] px-4 py-4 text-center">
                <p className="text-xs font-bold uppercase tracking-[0.1em] text-cream/70">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Related work */}
        {relatedProjects.length > 0 && (
          <div className="container-edge mt-14 lg:mt-20">
            <p className="mb-6 text-[10px] uppercase tracking-[0.2em] text-cream/35">
              Related work
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {relatedProjects.slice(0, 4).map((p) => (
                <Link
                  key={p.slug}
                  href={`/project/${p.slug}`}
                  data-cursor="hover"
                  className="group block overflow-hidden rounded-sm border border-cream/10 bg-cream/[0.03] p-5 transition-colors hover:border-accent/40">
                  <p className="text-[10px] uppercase tracking-[0.15em] text-cream/40">
                    {p.industry} · {p.year}
                  </p>
                  <p className="mt-2 font-anton text-base uppercase leading-tight tracking-tight text-cream transition-colors group-hover:text-accent">
                    {p.title}
                  </p>
                  {p.intro && (
                    <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-cream/50">
                      {p.intro}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="container-edge mt-14 py-20 lg:mt-20">
          <div className="rounded-sm border border-accent/30 bg-accent/[0.06] p-8 text-center lg:p-14">
            <h2 className="font-anton text-[clamp(1.8rem,5vw,3rem)] uppercase leading-[0.9] tracking-tight text-cream">
              Start with a free call.
            </h2>
            <p className="mt-4 max-w-xl mx-auto text-base leading-relaxed text-cream/65">
              We&apos;ll figure out if {matched.title.toLowerCase()} is the
              right starting point for where you are — no upsell if it isn&apos;t.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact#book"
                data-cursor="hover"
                className="inline-flex items-center gap-2 border border-accent bg-accent px-7 py-3.5 text-sm font-bold uppercase tracking-[0.12em] text-ink transition-colors hover:bg-[#ff4f1a]">
                Book a free call
              </Link>
              <Link
                href="/services"
                data-cursor="hover"
                className="inline-flex items-center gap-2 border border-cream/30 px-7 py-3.5 text-sm font-bold uppercase tracking-[0.12em] text-cream transition-colors hover:border-accent hover:text-accent">
                All services →
              </Link>
            </div>
          </div>
        </div>

        <Footer socials={site.socials} />
      </main>
    </div>
  );
}
