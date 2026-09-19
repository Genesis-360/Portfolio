import type { Metadata } from "next";
import Link from "next/link";
import { PiArrowUpRightBold } from "react-icons/pi";
import { Sidebar } from "@/components/layout/Sidebar";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceIcon } from "@/components/ui/ServiceIcons";
import { Footer } from "@/components/sections/Footer";
import { CallToAction } from "@/components/sections/CallToAction";
import { getSite, getServices } from "@/lib/content";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://oreenza.com";

export const metadata: Metadata = {
  title: "Services — OREENZA",
  description:
    "Strategic brand architecture, high-speed web engineering, and advanced AI growth systems — built to load instantly, rank natively, and convert systematically.",
  keywords: [
    "brand identity agency",
    "web design agency",
    "social media management",
    "Google Business Profile",
    "app development",
    "SEO with AI",
    "AI SEO",
    "performance optimization",
    "brand building",
    "performance web design",
    "creative agency",
  ],
  alternates: { canonical: "/services" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    title: "Services — OREENZA",
    description:
      "Strategic brand architecture, high-speed web engineering, and advanced AI growth systems — built to load instantly, rank natively, and convert systematically.",
    url: "/services",
    type: "website",
    siteName: "OREENZA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services — OREENZA",
    description:
      "Strategic brand architecture, high-speed web engineering, and advanced AI growth systems — built to load instantly, rank natively, and convert systematically.",
  },
};

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/* ── JSON-LD ──────────────────────────────────────────────── */
export function ServicesJsonLd({ services }: { services: { title: string }[] }) {
  const serviceList = services.map((s, i) => ({
    "@type": "Offer",
    position: i + 1,
    name: s.title,
    url: `${SITE_URL}/services/${slugify(s.title)}`,
  }));

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
                { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
              ],
            },
            {
              "@type": "Service",
              name: "OREENZA Services",
              description:
                "Performance-first creative and technical services: brand identity, web design, social media management, GBP management, app development, and SEO with AI.",
              provider: {
                "@type": "Organization",
                name: "OREENZA",
                url: SITE_URL,
                logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.svg` },
              },
              areaServed: "Worldwide",
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "OREENZA Service Catalog",
                itemListElement: serviceList,
              },
            },
          ],
        }),
      }}
    />
  );
}

/* ── Hero ───────────────────────────────────────────────── */
function ServicesHero() {
  return (
    <header className="container-edge pt-24 lg:pt-32">
      <Reveal className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-cream/45">
        <span className="h-px w-10 shrink-0 bg-accent" />
        What we do
      </Reveal>

      <h1 className="font-anton text-[clamp(2.4rem,9vw,6.5rem)] uppercase leading-[0.88] tracking-tight text-cream">
        Services.
      </h1>

      <div className="mt-10 grid grid-cols-1 gap-8 border-t border-cream/10 pt-10 md:grid-cols-3 lg:mt-12">
        <p className="max-w-lg text-base leading-relaxed text-cream/55 md:col-span-2 md:text-lg">
          Strategic brand architecture, high-speed web engineering, and advanced
          AI growth systems — built to load instantly, rank natively, and convert
          systematically. Below: the six things we do, written by the people who
          do them.
        </p>
        <div className="flex items-end justify-start gap-8 md:justify-end">
          <div>
            <p className="font-anton text-4xl leading-none text-cream">6</p>
            <p className="mt-2 text-[10px] uppercase tracking-[0.22em] text-cream/40">Services</p>
          </div>
          <div>
            <p className="font-anton text-4xl leading-none text-cream">40+</p>
            <p className="mt-2 text-[10px] uppercase tracking-[0.22em] text-cream/40">Projects</p>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ── Standard service block ────────────────────────────────── */
function ServiceBlock({
  service,
  siteService,
  index,
  totalServices,
}: {
  service: { slug: string; title: string; intro: string };
  siteService?: { title: string; items: string[] };
  index: number;
  totalServices: number;
}) {
  const id = service.slug;

  return (
    <section
      id={id}
      aria-labelledby={`service-${id}-heading`}
      className="border-t border-cream/10 py-16 lg:py-24"
    >
      <div className="container-edge">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-12">
          {/* Left: meta + icon */}
          <div className="lg:col-span-3">
            <p className="text-[10px] uppercase tracking-[0.32em] text-cream/40">
              {String(index + 1).padStart(2, "0")} / {String(totalServices).padStart(2, "0")}
            </p>
            <div
              aria-hidden
              className="mt-6 flex h-16 w-16 items-center justify-center border border-cream/15"
            >
              <ServiceIcon title={service.title} className="h-7 w-7 text-accent" />
            </div>
          </div>

          {/* Right: title + body + deliverables + CTA */}
          <div className="lg:col-span-9">
            <h2
              id={`service-${id}-heading`}
              className="font-anton text-[clamp(2rem,5vw,3.6rem)] uppercase leading-[0.9] tracking-tight text-cream"
            >
              {service.title}
            </h2>

            <div className="mt-8 grid grid-cols-1 gap-8 lg:mt-10 lg:grid-cols-2 lg:gap-12">
              <p className="text-base leading-relaxed text-cream/65 lg:text-lg">
                {service.intro}
              </p>
              {siteService?.items && (
                <ul aria-label="Deliverables" className="space-y-2.5">
                  {siteService.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-baseline gap-3 text-sm leading-snug text-cream/60"
                    >
                      <span
                        aria-hidden
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <Link
              href={`/services/${id}`}
              data-cursor="hover"
              className="group mt-10 inline-flex items-center gap-3 rounded-sm border border-cream/20 bg-cream/[0.03] px-5 py-3 text-xs uppercase tracking-[0.18em] text-cream/70 transition-all hover:border-accent/50 hover:bg-accent/10 hover:text-accent"
            >
              <span className="flex items-center gap-2">
                Explore {service.title}
                <PiArrowUpRightBold className="text-[12px] transition-transform group-hover:translate-x-0.5" aria-hidden />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Page ────────────────────────────────────────────────── */
export default async function ServicesPage() {
  const [site, services] = await Promise.all([getSite(), getServices()]);

  return (
    <>
      <ServicesJsonLd services={services} />

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

        <main
          id="main"
          className="w-ful lg:w-[70%] lg:flex-1"
        >
          <ServicesHero />

          <div className="mt-16 lg:mt-20">
            {services.map((service, i) => (
              <ServiceBlock
                key={service.slug}
                service={service}
                siteService={site.services.find((s) => s.title === service.title)}
                index={i}
                totalServices={services.length}
              />
            ))}
          </div>

          <div className="container-edge mt-16 py-16 lg:py-24">
            <CallToAction
              heading="Not sure where to start?"
              body="Most projects begin with a strategy call. We figure out the right scope together — no pressure, no template proposals."
              secondaryLabel="See our work"
              secondaryHref="/"
            />
          </div>

          <Footer socials={site.socials} />
        </main>
      </div>
    </>
  );
}
