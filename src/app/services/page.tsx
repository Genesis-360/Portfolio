import type { Metadata } from "next";
import Link from "next/link";
import { Sidebar } from "@/components/layout/Sidebar";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceIcon } from "@/components/ui/ServiceIcons";
import { Footer } from "@/components/sections/Footer";
import { getSite, getProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: { absolute: "Services — OREENZA" },
  description:
    "Brand identity, web design, social media management, GBP, app development, and SEO with AI — built to perform.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services — OREENZA",
    description:
      "Brand identity, web design, social media management, GBP, app development, and SEO with AI — built to perform.",
    url: "/services",
    type: "website",
  },
};

const SERVICE_DESCRIPTIONS: Record<string, string> = {
  "Brand Identity": "Naming, logo systems, visual guidelines, and brand voice — built to be remembered and reproduced consistently across every surface.",
  "Web Design": "UX/UI, design systems, Next.js builds, and CMS setup — sites that load fast, rank well, and convert visitors into clients.",
  "Social Media Management": "Content calendars, captions, community engagement, and analytics — a presence that compounds over time rather than disappearing into noise.",
  "GBP Management": "Profile setup, weekly posts, review responses, and local SEO — the foundation that keeps discovery local customers finding you.",
  "App Development": "iOS, Android, React Native, and API integrations — products that live on your users' home screens, not just their browser tabs.",
  "SEO With AI": "AI-powered keyword research, content optimization, technical SEO audits, and rank tracking — visibility work that feeds the rest.",
};

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default async function ServicesPage() {
  const [site, projects] = await Promise.all([getSite(), getProjects()]);
  const services = site.services;

  return (
    <div className="lg:flex lg:items-start">
      <Sidebar
        variant="sub"
        content="services"
        data={{
          serviceTitles: services.map((s) => s.title),
          industries: site.industries,
          email: site.email,
          phone: site.phone,
          slotsOpen: site.slotsOpen,
          socials: site.socials,
        }}
      />

      <main id="main" className="w-full lg:w-[70%] lg:flex-1">
        {/* Header */}
        <header className="container-edge pt-24 lg:pt-32">
          <Reveal className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-cream/45">
            <span className="h-px w-10 bg-accent" />
            What we do
          </Reveal>
          <h1 className="font-anton text-[clamp(2.4rem,9vw,6.5rem)] uppercase leading-[0.88] tracking-tight text-cream">
            Performance-first services.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/60">
            Every engagement starts with understanding the problem. Then we build
            what actually solves it — no bloat, no filler, no template.
          </p>
        </header>

        {/* Service blocks */}
        <div className="mt-14 lg:mt-20">
          {services.map((service, i) => {
            const id = slugify(service.title);
            const description =
              SERVICE_DESCRIPTIONS[service.title] ??
              `${service.items.slice(0, 2).join(", ")} and more.`;
            const relatedProjects = projects.filter((p) =>
              p.services.some((s) =>
                s.toLowerCase().includes(service.title.toLowerCase().split(" ")[0])
              )
            );

            return (
              <div
                key={service.title}
                id={id}
                className="border-t border-cream/10 first-of-type:border-t"
              >
                <div className="container-edge py-12 lg:py-16">
                  <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_2fr] lg:gap-16">
                    {/* Left — label + icon + nav */}
                    <div>
                      <div className="mb-6 flex items-center gap-4">
                        <div className="flex h-14 w-14 flex-none items-center justify-center rounded-sm border border-cream/15 bg-cream/[0.04]">
                          <ServiceIcon
                            title={service.title}
                            className="h-7 w-7 text-accent"
                          />
                        </div>
                        <div>
                          <span className="block font-anton text-xs uppercase tracking-[0.2em] text-cream/35">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                        </div>
                      </div>

                      <h2 className="font-anton text-[clamp(1.4rem,3vw,2.4rem)] uppercase leading-[0.9] tracking-tight text-cream">
                        {service.title}
                      </h2>

                      <ul className="mt-5 space-y-1.5">
                        {service.items.map((item) => (
                          <li
                            key={item}
                            className="flex items-center gap-3 text-sm text-cream/60"
                          >
                            <span className="h-1 w-1 flex-none rounded-full bg-accent" />
                            {item}
                          </li>
                        ))}
                      </ul>

                      <Link
                        href={`/services/${id}`}
                        data-cursor="hover"
                        className="group mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-cream/70 transition-colors hover:text-accent">
                        Learn more
                        <span aria-hidden className="transition-transform group-hover:translate-x-1">
                          →
                        </span>
                      </Link>
                    </div>

                    {/* Right — description + related projects */}
                    <div>
                      <p className="text-base leading-relaxed text-cream/65 lg:text-lg">
                        {description}
                      </p>

                      {relatedProjects.length > 0 && (
                        <div className="mt-8">
                          <p className="mb-4 text-[10px] uppercase tracking-[0.2em] text-cream/35">
                            Related work
                          </p>
                          <div className="grid grid-cols-2 gap-3">
                            {relatedProjects.slice(0, 2).map((p) => (
                              <Link
                                key={p.slug}
                                href={`/project/${p.slug}`}
                                data-cursor="hover"
                                className="group block overflow-hidden rounded-sm border border-cream/10 bg-cream/[0.03] p-4 transition-colors hover:border-accent/40">
                                <p className="text-[10px] uppercase tracking-[0.15em] text-cream/40">
                                  {p.industry}
                                </p>
                                <p className="mt-1 font-anton text-sm uppercase leading-tight tracking-tight text-cream transition-colors group-hover:text-accent">
                                  {p.title}
                                </p>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="container-edge py-20">
          <div className="rounded-sm border border-accent/30 bg-accent/[0.06] p-8 text-center lg:p-14">
            <h2 className="font-anton text-[clamp(1.8rem,5vw,3.2rem)] uppercase leading-[0.9] tracking-tight text-cream">
              Not sure where to start?
            </h2>
            <p className="mt-4 max-w-xl mx-auto text-base leading-relaxed text-cream/65">
              Most projects begin with a free 30-minute call. We figure out the
              right scope together — no pressure, no template proposals.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact#book"
                data-cursor="hover"
                className="inline-flex items-center gap-2 border border-accent bg-accent px-7 py-3.5 text-sm font-bold uppercase tracking-[0.12em] text-ink transition-colors hover:bg-[#ff4f1a]">
                Book a free call
              </Link>
              <Link
                href="/work"
                data-cursor="hover"
                className="inline-flex items-center gap-2 border border-cream/30 px-7 py-3.5 text-sm font-bold uppercase tracking-[0.12em] text-cream transition-colors hover:border-accent hover:text-accent">
                See our work →
              </Link>
            </div>
          </div>
        </div>

        <Footer socials={site.socials} />
      </main>
    </div>
  );
}
