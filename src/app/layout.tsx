import type { Metadata, Viewport } from "next";
import { anton, openSauce, amsterdam } from "./fonts";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { PageIntro } from "@/components/ui/PageIntro";

export const metadata: Metadata = {
  metadataBase: new URL("https://oreenza.com"),
  title: {
    default: "OREENZA — Performance First Creative Agency",
    template: "%s — OREENZA",
  },
  description:
    "OREENZA is an independent design & development studio building brands, websites, products and motion. We help ambitious teams grow with SEO, social media and AI.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://oreenza.com",
    siteName: "OREENZA",
    title: "OREENZA — Performance First Creative Agency",
    description:
      "OREENZA is an independent design & development studio building brands, websites, products and motion. We help ambitious teams grow with SEO, social media and AI.",
  },
  twitter: {
    card: "summary_large_image",
    title: "OREENZA — Performance First Creative Agency",
    description:
      "OREENZA is an independent design & development studio building brands, websites, products and motion. We help ambitious teams grow with SEO, social media and AI.",
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
  url: "https://oreenza.com",
  email: "hello@oreenza.com",
  telephone: "+91 94576 33238",
  description:
    "An independent design & development studio crafting brands, products and motion for ambitious teams.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${openSauce.variable} ${amsterdam.variable} antialiased`}
    >
      <body className="min-h-screen bg-ink text-cream">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <MotionProvider>
          <SmoothScroll>
            <CustomCursor />
            <PageIntro />
            {children}
          </SmoothScroll>
        </MotionProvider>
      </body>
    </html>
  );
}
