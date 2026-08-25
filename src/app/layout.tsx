import type { Metadata, Viewport } from "next";
import { anton, openSauce, amsterdam } from "./fonts";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { PageIntro } from "@/components/ui/PageIntro";

export const metadata: Metadata = {
  title: "OREENZA — Performance First Creative Agency",
  description:
    "OREENZA is an independent design & development studio crafting brands, products and motion for ambitious teams.",
  openGraph: {
    title: "OREENZA — Performance First Creative Agency",
    description:
      "An independent studio crafting brands, products and motion.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${openSauce.variable} ${amsterdam.variable} antialiased`}
    >
      <body className="min-h-screen bg-ink text-cream">
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
