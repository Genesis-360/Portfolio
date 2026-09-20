import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { anton, openSauce, amsterdam } from "./fonts";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { PageIntro } from "@/components/ui/PageIntro";
import { HideScrollbar } from "@/components/ui/HideScrollbar";
import { SiteShell } from "@/components/layout/SiteShell";
import { getSite } from "@/lib/content";
import { absoluteUrl, siteUrl } from "@/lib/url";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "OREENZA — AI-Powered Design & Development Agency",
    template: "%s — OREENZA",
  },
  description:
    "OREENZA is an AI-powered design & development agency building performance-first brands, websites, and products for ambitious B2B, D2C, and tech teams.",
  keywords: [
    "design agency",
    "web development agency",
    "AI growth agency",
    "brand identity",
    "performance web design",
    "creative agency",
    "Next.js development",
    "SEO with AI",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "OREENZA",
    title: "OREENZA — AI-Powered Design & Development Agency",
    description:
      "OREENZA is an AI-powered design & development agency building performance-first brands, websites, and products for ambitious B2B, D2C, and tech teams.",
  },
  twitter: {
    card: "summary_large_image",
    title: "OREENZA — AI-Powered Design & Development Agency",
    description:
      "OREENZA is an AI-powered design & development agency building performance-first brands, websites, and products for ambitious B2B, D2C, and tech teams.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const site = await getSite();

  const sameAs = site.socials.map((s) => s.href);

  const orgJsonLd = {
    "@context": "https://schema.org" as const,
    "@type": "Organization",
    name: "OREENZA",
    url: absoluteUrl("/"),
    email: site.email,
    telephone: site.phone,
    description:
      "An independent design & development studio building brands, websites, products and motion for ambitious teams.",
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}/wordmark.svg`,
    },
    image: `${siteUrl}/header-logo.svg`,
    sameAs,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Remote",
      addressCountry: "WW",
    },
  };

  const localBusinessJsonLd = {
    "@context": "https://schema.org" as const,
    "@type": "ProfessionalService",
    name: "OREENZA",
    description:
      "AI-powered design & development agency building performance-first brands, websites, and products for ambitious B2B, D2C, and tech teams.",
    url: absoluteUrl("/"),
    email: site.email,
    telephone: site.phone,
    priceRange: "$$$$",
    serviceType: [
      "Brand Identity",
      "Web Design",
      "Web Development",
      "AI Automations",
      "SEO",
      "Search Visibility",
    ],
    areaServed: "Worldwide",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "OREENZA Services",
      itemListElement: site.services.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title,
        },
      })),
    },
  };

  return (
    <html
      lang="en"
      className={`${anton.variable} ${openSauce.variable} ${amsterdam.variable} antialiased`}
    >
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/avif" sizes="32x32" href="/favicon-32x32.avif" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <meta name="p:domain_verify" content="ad8f627efe4acfa3feb2891b29709e0d"/>
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLMs.txt" />
      </head>
      <body className="min-h-screen bg-ink text-cream">
        {/* Google Analytics */}
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-sm focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:uppercase focus:tracking-[0.14em] focus:text-ink"
        >
          Skip to main content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <MotionProvider>
          <SmoothScroll>
            <HideScrollbar />
            <CustomCursor />
            <PageIntro />
            <SiteShell socials={site.socials} slotsOpen={site.slotsOpen}>
              {children}
            </SiteShell>
          </SmoothScroll>
        </MotionProvider>
      </body>
    </html>
  );
}
