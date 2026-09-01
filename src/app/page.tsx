import type { Metadata } from "next";
import { Sidebar } from "@/components/layout/Sidebar";
import { SelectedWorks } from "@/components/sections/SelectedWorks";
import { Footer } from "@/components/sections/Footer";
import { getProjects, getSite } from "@/lib/content";
import { absoluteUrl, siteUrl } from "@/lib/url";

export const metadata: Metadata = {
  title: { absolute: "OREENZA — Performance-first design & development studio" },
  description:
    "Independent design & development studio building performance-first brands, websites, and products for ambitious teams worldwide. Brand identity, web design, SEO, and motion.",
  keywords: [
    "design agency",
    "web development studio",
    "performance-first design",
    "brand identity agency",
    "web design agency",
    "creative studio",
    "Next.js development",
    "SEO with AI",
  ],
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    title: "OREENZA — Performance-first design & development studio",
    description:
      "Independent design & development studio building performance-first brands, websites, and products for ambitious teams worldwide.",
    url: "/",
    type: "website",
    siteName: "OREENZA",
  },
  twitter: {
    card: "summary_large_image",
    title: "OREENZA — Performance-first design & development studio",
    description:
      "Independent design & development studio building performance-first brands, websites, and products for ambitious teams worldwide.",
  },
};

export default async function Home() {
  const [projects, site] = await Promise.all([getProjects(), getSite()]);

  const websiteJsonLd = {
    "@context": "https://schema.org" as const,
    "@type": "WebSite",
    name: "OREENZA",
    url: absoluteUrl("/"),
    description:
      "Independent design & development studio building performance-first brands, websites, and products.",
    publisher: {
      "@type": "Organization",
      name: "OREENZA",
      logo: { "@type": "ImageObject", url: `${siteUrl}/logo.svg` },
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/blog?search={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />

      <div className="lg:flex lg:items-start">
        <Sidebar
          variant="home"
          content="home"
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
          <SelectedWorks projects={projects} />
          <Footer socials={site.socials} />
        </main>
      </div>
    </>
  );
}
