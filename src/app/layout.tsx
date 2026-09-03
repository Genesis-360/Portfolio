import type { Metadata, Viewport } from "next";
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

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "OREENZA — Performance-first design & development agency",
    template: "%s — OREENZA",
  },
  description:
    "OREENZA is an independent design & development agency building brands, websites, products and motion for ambitious teams.",
  keywords: [
    "design agency",
    "web development studio",
    "brand identity",
    "performance web design",
    "creative studio",
    "Next.js development",
    "brand guidelines",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "OREENZA",
    title: "OREENZA — Performance-first design & development studio",
    description:
      "OREENZA is an independent design & development studio building brands, websites, products and motion for ambitious teams.",
  },
  twitter: {
    card: "summary_large_image",
    title: "OREENZA — Performance-first design & development studio",
    description:
      "OREENZA is an independent design & development studio building brands, websites, products and motion for ambitious teams.",
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

  return (
    <html
      lang="en"
      className={`${anton.variable} ${openSauce.variable} ${amsterdam.variable} antialiased`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
      </head>
      <body className="min-h-screen bg-ink text-cream">
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
