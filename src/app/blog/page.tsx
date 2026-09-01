import type { Metadata } from "next";
import Link from "next/link";
import { Sidebar } from "@/components/layout/Sidebar";
import { Reveal } from "@/components/ui/Reveal";
import { Footer } from "@/components/sections/Footer";
import { getSite, getPosts } from "@/lib/content";
import { BlogIndex } from "@/components/blog/BlogIndex";
import { absoluteUrl, siteUrl } from "@/lib/url";

export const metadata: Metadata = {
  title: { absolute: "Blog — Insights on design, performance & SEO | OREENZA" },
  description:
    "Practical thinking on design, performance, and SEO from the OREENZA team — for founders, marketers, and design-curious humans.",
  keywords: [
    "design blog",
    "web performance",
    "SEO insights",
    "branding articles",
    "OREENZA blog",
    "design studio blog",
  ],
  alternates: { canonical: "/blog" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    title: "Blog — Insights on design, performance & SEO | OREENZA",
    description:
      "Practical thinking on design, performance, and SEO from the OREENZA team.",
    url: "/blog",
    type: "website",
    siteName: "OREENZA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog — Insights on design, performance & SEO | OREENZA",
    description: "Practical thinking on design, performance, and SEO from the OREENZA team.",
  },
};

export default async function BlogIndexPage() {
  const [site, posts] = await Promise.all([getSite(), getPosts()]);

  const blogJsonLd = {
    "@context": "https://schema.org" as const,
    "@type": "Blog",
    name: "OREENZA Blog",
    description:
      "Practical thinking on design, performance, and SEO from the OREENZA team.",
    url: absoluteUrl("/blog"),
    publisher: {
      "@type": "Organization",
      name: "OREENZA",
      logo: { "@type": "ImageObject", url: `${siteUrl}/logo.svg` },
      sameAs: site.socials.map((s) => s.href),
    },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting" as const,
      headline: p.title,
      description: p.excerpt,
      url: `${siteUrl}/blog/${p.slug}`,
      datePublished: p.date,
      author: { "@type": "Person", name: p.author },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org" as const,
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl("/blog") },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />

      <div className="lg:flex lg:items-start">
        <Sidebar
          variant="sub"
          content="blog"
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
          <nav aria-label="Breadcrumb" className="container-edge pt-10">
            <ol className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-cream/40">
              <li>
                <Link href="/" className="transition-colors hover:text-accent">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-cream/70">
                Blog
              </li>
            </ol>
          </nav>

          <header className="container-edge pt-12">
            <Reveal className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-cream/45">
              <span className="h-px w-10 bg-accent" />
              Field notes
            </Reveal>
            <h1 className="font-anton text-[clamp(2.4rem,9vw,6.5rem)] uppercase leading-[0.88] tracking-tight text-cream">
              Insights.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/60">
              Practical thinking on design, performance, and SEO from the team
              doing the work. No fluff, no filler.
            </p>
          </header>

          <div id="latest" className="container-edge mt-14 pb-10 lg:mt-20 lg:pb-18">
            <BlogIndex posts={posts} />
          </div>

          <Footer socials={site.socials} />
        </main>
      </div>
    </>
  );
}
