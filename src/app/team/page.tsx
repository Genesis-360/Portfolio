import type { Metadata } from "next";
import Link from "next/link";
import { Sidebar } from "@/components/layout/Sidebar";
import { Reveal } from "@/components/ui/Reveal";
import { Footer } from "@/components/sections/Footer";
import { CallToAction } from "@/components/sections/CallToAction";
import { TeamShowcase } from "@/components/ui/TeamShowcase";
import { getSite, getTeam } from "@/lib/content";
import { siteUrl } from "@/lib/url";

export const metadata: Metadata = {
  title: { absolute: "Team — The humans behind OREENZA" },
  description:
    "Meet the senior team behind OREENZA — a small, focused group of designers, engineers, and writers. Small team. Big craft.",
  keywords: [
    "OREENZA team",
    "design team",
    "creative agency team",
    "web development team",
    "brand agency",
  ],
  alternates: { canonical: "/team" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    title: "Team — The humans behind OREENZA",
    description:
      "Meet the senior team behind OREENZA — a small group of designers, engineers, and writers. Small team. Big craft.",
    url: "/team",
    type: "profile",
    siteName: "OREENZA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Team — OREENZA",
    description:
      "Small team. Big craft. Meet the people behind OREENZA.",
  },
};

const VALUES = [
  {
    title: "Craft over volume",
    body: "We'd rather ship one excellent project than ten forgettable ones. Every line, every pixel, every word earns its place.",
  },
  {
    title: "Performance is a feature",
    body: "A site that loads in 1.4 seconds converts more than one that loads in 4.2. The same applies to design, copy, and code.",
  },
  {
    title: "Small by choice",
    body: "We stay small so the people you talk to are the people doing the work. No account managers, no hand-offs, no lost context.",
  },
];

export default async function TeamPage() {
  const [site, team] = await Promise.all([getSite(), getTeam()]);

  const personSchema = team.map((member) => ({
    "@type": "Person" as const,
    name: member.name,
    jobTitle: member.role,
    description: member.bio,
    image: member.photo || undefined,
    url: `${siteUrl}/team#${member.slug}`,
    worksFor: {
      "@type": "Organization",
      name: "OREENZA",
      url: siteUrl,
    },
  }));

  const teamJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Team", item: `${siteUrl}/team` },
        ],
      },
      {
        "@type": "AboutPage",
        name: "Team — OREENZA",
        description:
          "Meet the senior team behind OREENZA — a small group of designers, engineers, and writers.",
        publisher: {
          "@type": "Organization",
          name: "OREENZA",
          logo: { "@type": "ImageObject", url: `${siteUrl}/logo.svg` },
          sameAs: site.socials.map((s) => s.href),
        },
        mainEntity: personSchema,
      },
      ...personSchema,
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(teamJsonLd) }}
      />

      <div className="lg:flex lg:items-start">
        <Sidebar
          variant="sub"
          content="team"
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
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="container-edge pt-10"
          >
            <ol className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-cream/40">
              <li>
                <Link href="/" className="transition-colors hover:text-accent">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-cream/70">
                Team
              </li>
            </ol>
          </nav>

          {/* Hero */}
          <header className="container-edge pt-12 lg:pt-20">
            <Reveal className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-cream/45">
              <span className="h-px w-10 shrink-0 bg-accent" />
              Built by humans
            </Reveal>
            <h1 className="font-anton text-[clamp(2.4rem,9vw,6.5rem)] uppercase leading-[0.88] tracking-tight text-cream">
              Small team.<br />Big craft.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/60">
              A senior group of {team.length} designers, engineers, and writers
              who&apos;ve shipped for brands from cafés to SaaS. We work
              remote-first, ship on time, and answer our emails.
            </p>
          </header>

          {/* Team showcase */}
          <div className="container-edge mt-12 lg:mt-16">
            {team.length === 0 ? (
              <p className="py-20 text-center text-cream/40">
                No team members found. Reach out at{" "}
                <a href={`mailto:${site.email}`} className="text-accent hover:underline">
                  {site.email}
                </a>
                .
              </p>
            ) : (
              <TeamShowcase members={team} />
            )}
          </div>

          {/* Values */}
          <div className="container-edge mt-20 lg:mt-28">
            <div className="border-t border-cream/10 pt-14">
              <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-cream/35">
                How we work
              </p>
              <h2 className="font-anton text-[clamp(1.8rem,4vw,2.6rem)] uppercase leading-[0.9] tracking-tight text-cream">
                Three things we don&apos;t compromise on.
              </h2>
              <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
                {VALUES.map((v, i) => (
                  <div
                    key={v.title}
                    className="border-t border-cream/10 pt-6"
                  >
                    <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-cream/35">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="font-anton text-xl uppercase leading-tight tracking-tight text-cream">
                      {v.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-cream/65">
                      {v.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="container-edge mt-16 py-16 lg:py-24">
            <CallToAction
              eyebrow="Work with us"
              heading="Want to work with us?"
              body="We take on a few projects each quarter. The earlier you reach out, the more time we can spend on yours."
              primaryLabel="Book a free call"
              secondaryLabel="What we do"
              secondaryHref="/services"
            />
          </div>

          <Footer socials={site.socials} />
        </main>
      </div>
    </>
  );
}
