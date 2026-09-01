import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Sidebar } from "@/components/layout/Sidebar";
import { Reveal } from "@/components/ui/Reveal";
import { Footer } from "@/components/sections/Footer";
import { getSite, getTeam } from "@/lib/content";

export const metadata: Metadata = {
  title: { absolute: "Team — The humans behind OREENZA" },
  description:
    "Meet the small, senior team behind OREENZA. Designers, engineers, and writers who care about craft, performance, and outcomes.",
  alternates: { canonical: "/team" },
  openGraph: {
    title: "Team — The humans behind OREENZA",
    description: "Meet the small, senior team behind OREENZA.",
    url: "/team",
    type: "website",
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

  return (
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
        {/* Hero */}
        <header className="container-edge pt-24 lg:pt-32">
          <Reveal className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-cream/45">
            <span className="h-px w-10 bg-accent" />
            Built by humans
          </Reveal>
          <h1 className="font-anton text-[clamp(2.4rem,9vw,6.5rem)] uppercase leading-[0.88] tracking-tight text-cream">
            Small team.<br/>Big craft.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/60">
            A small group of designers, engineers, and writers who&apos;ve
            shipped for brands from cafés to SaaS. We work remote-first, ship
            on time, and answer our emails.
          </p>
        </header>

        {/* Team grid */}
        <div className="container-edge mt-14 lg:mt-20">
          {team.length === 0 ? (
            <p className="py-20 text-center text-cream/40">
              Team roster coming soon. Reach out at <a href={`mailto:${site.email}`} className="text-accent hover:underline">{site.email}</a>.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {team.map((member) => (
                <article
                  key={member.slug}
                  className="group relative overflow-hidden rounded-sm border border-cream/10 bg-cream/[0.03]"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-ink">
                    {member.photo ? (
                      <Image
                        src={member.photo}
                        alt={member.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-[1.04]"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <span className="font-anton text-7xl text-cream/15">
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)
                            .toUpperCase()}
                        </span>
                      </div>
                    )}
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/60 to-transparent p-5">
                      <p className="font-anton text-lg uppercase leading-tight tracking-tight text-cream">
                        {member.name}
                      </p>
                      {member.role && (
                        <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-accent">
                          {member.role}
                        </p>
                      )}
                    </div>
                  </div>
                  {member.bio && (
                    <p className="p-5 text-sm leading-relaxed text-cream/65">
                      {member.bio}
                    </p>
                  )}
                </article>
              ))}
            </div>
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
        <div className="container-edge mt-20 py-14">
          <div className="rounded-sm border border-accent/30 bg-accent/[0.06] p-8 text-center lg:p-14">
            <h2 className="font-anton text-[clamp(1.8rem,5vw,3rem)] uppercase leading-[0.9] tracking-tight text-cream">
              Want to work with us?
            </h2>
            <p className="mt-4 max-w-xl mx-auto text-base leading-relaxed text-cream/65">
              We take on a few projects each quarter. The earlier you reach
              out, the more time we can spend on yours.
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
                What we do →
              </Link>
            </div>
          </div>
        </div>

        <Footer socials={site.socials} />
      </main>
    </div>
  );
}
