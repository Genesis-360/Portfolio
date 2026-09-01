import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Sidebar } from "@/components/layout/Sidebar";
import { Reveal } from "@/components/ui/Reveal";
import { Footer } from "@/components/sections/Footer";
import { ServiceIcon } from "@/components/ui/ServiceIcons";
import { CallToAction } from "@/components/sections/CallToAction";
import {
  getProjects,
  getService,
  getServices,
  getSite,
} from "@/lib/content";
import { siteUrl } from "@/lib/url";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getService(slug);

  if (!service) {
    return { title: "Service not found", robots: { index: false, follow: false } };
  }

  const title = `${service.title} — Services | OREENZA`;
  const description = service.intro || `${service.title} by OREENZA.`;
  const url = `${siteUrl}/services/${slug}`;

  return {
    title,
    description,
    keywords: [service.title, ...service.sections.map((s) => s.heading), "OREENZA"],
    alternates: { canonical: url },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      siteName: "OREENZA",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

/* ── JSON-LD for detail page ──────────────────────────────── */
function ServiceDetailJsonLd({
  slug,
  serviceName,
  description,
  sections,
  faq,
}: {
  slug: string;
  serviceName: string;
  description: string;
  sections: { heading: string; body: string }[];
  faq?: { q: string; a: string }[];
}) {
  const url = `${siteUrl}/services/${slug}`;

  const graph: object[] = [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Services", item: `${siteUrl}/services` },
        { "@type": "ListItem", position: 3, name: serviceName, item: url },
      ],
    },
    {
      "@type": "Service",
      name: serviceName,
      description,
      url,
      provider: {
        "@type": "Organization",
        name: "OREENZA",
        url: siteUrl,
        logo: { "@type": "ImageObject", url: `${siteUrl}/logo.svg` },
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: `${serviceName} — OREENZA`,
        itemListElement: sections.map((s, i) => ({
          "@type": "Offer",
          position: i + 1,
          itemOffered: { "@type": "Service", name: s.heading, description: s.body },
        })),
      },
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }),
      }}
    />
  );
}

/* ── Page ────────────────────────────────────────────────── */
export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const [site, services] = await Promise.all([
    getSite(),
    getServices(),
    getProjects(),
  ]);

  const service = await getService(slug);
  if (!service) notFound();

  // Resolve the deliverable items from the site singleton (keyed by title)
  const siteService = site.services.find((s) => s.title === service.title);
  const items = siteService?.items ?? [];

  return (
    <>
      <ServiceDetailJsonLd
        slug={slug}
        serviceName={service.title}
        description={service.intro}
        sections={service.sections}
        faq={service.faq}
      />

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
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="container-edge pt-10">
            <ol className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-cream/40">
              <li>
                <Link href="/services" className="transition-colors hover:text-accent">
                  Services
                </Link>
              </li>
              <li aria-hidden className="select-none">/</li>
              <li aria-current="page" className="text-cream/70">
                {service.title}
              </li>
            </ol>
          </nav>

          {/* Header */}
          <header className="container-edge pt-12 lg:pt-16">
            <Reveal className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-cream/45">
              <span className="h-px w-10 shrink-0 bg-accent" />
              {service.title}
            </Reveal>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[auto_1fr] lg:gap-12 lg:items-start">
              <div
                aria-hidden
                className="hidden h-16 w-16 items-center justify-center border border-cream/15 lg:flex"
              >
                <ServiceIcon title={service.title} className="h-8 w-8 text-accent" />
              </div>
              <div>
                <h1 className="font-anton text-[clamp(2.4rem,9vw,6.5rem)] uppercase leading-[0.88] tracking-tight text-cream">
                  {service.title}
                </h1>
                {service.intro && (
                  <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/65 lg:text-xl">
                    {service.intro}
                  </p>
                )}
              </div>
            </div>
          </header>

          {/* Long-form sections */}
          {service.sections.length > 0 && (
            <div className="container-edge mt-16 space-y-0 lg:mt-24">
              {service.sections.map((section) => (
                <article
                  key={section.heading}
                  className="grid grid-cols-1 gap-6 border-t border-cream/10 py-10 lg:grid-cols-[1fr_2.5fr] lg:gap-12 lg:py-12"
                >
                  <div>
                    <h2 className="font-anton text-xl uppercase leading-tight tracking-tight text-cream lg:text-2xl">
                      {section.heading}
                    </h2>
                    <div aria-hidden className="mt-3 h-px w-8 bg-accent" />
                  </div>
                  <p className="text-base leading-[1.7] text-cream/70 lg:text-lg">
                    {section.body}
                  </p>
                </article>
              ))}
            </div>
          )}

          {/* What's included grid */}
          {items.length > 0 && (
            <div className="container-edge mt-16 lg:mt-24">
              <h2 className="mb-8 text-[10px] uppercase tracking-[0.32em] text-cream/40">
                What&apos;s included
              </h2>
              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {items.map((item) => (
                  <li
                    key={item}
                    className="border border-cream/10 bg-cream/[0.03] px-4 py-4 text-center"
                  >
                    <p className="text-xs font-bold uppercase tracking-[0.1em] text-cream/70">
                      {item}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* CTA — shared component, identical to the /services index */}
          <div className="container-edge mt-16 py-16 lg:py-24">
            <CallToAction
              eyebrow="Get started"
              heading={`Start with a ${service.title.toLowerCase()} call.`}
              body={`We'll figure out if ${service.title.toLowerCase()} is the right starting point for where you are — no upsell if it isn't.`}
            />
          </div>

          <Footer socials={site.socials} />
        </main>
      </div>
    </>
  );
}
