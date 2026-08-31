import type { Metadata, Viewport } from "next";
import { anton, openSauce, amsterdam } from "./fonts";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { PageIntro } from "@/components/ui/PageIntro";
import { HideScrollbar } from "@/components/ui/HideScrollbar";
import { absoluteUrl, siteUrl } from "@/lib/url";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "OREENZA — Performance-first design & development studio",
    template: "%s — OREENZA",
  },
  description:
    "OREENZA is an independent design & development studio building brands, websites, products and motion for ambitious teams.",
  // Note: alternates.canonical and openGraph.url are intentionally NOT set
  // here. Per Next.js 16, root-layout metadata is shallowly merged into
  // every child route, so defining them at the root would force every
  // other page to canonicalize to the homepage (and de-index itself).
  // Each route sets its own. The default title/description above are
  // overridden by child pages that define a `description` or `title`.
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
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "OREENZA",
  url: siteUrl,
  email: "hello@oreenza.com",
  description:
    "An independent design & development studio building brands, websites, products and motion for ambitious teams.",
  // sameAs is filled in from the CMS in a server component below.
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${openSauce.variable} ${amsterdam.variable} antialiased`}
    >
      <body className="min-h-screen bg-ink text-cream">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-sm focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:uppercase focus:tracking-[0.14em] focus:text-ink"
        >
          Skip to main content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              ...orgJsonLd,
              "@context": "https://schema.org",
              url: absoluteUrl("/"),
            }),
          }}
        />
        <MotionProvider>
          <SmoothScroll>
            <HideScrollbar />
            <CustomCursor />
            <PageIntro />
            {children}
          </SmoothScroll>
        </MotionProvider>
      </body>
    </html>
  );
}
