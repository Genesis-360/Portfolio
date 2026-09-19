import type { Metadata } from "next";
import Link from "next/link";
import { Sidebar } from "@/components/layout/Sidebar";
import { Reveal } from "@/components/ui/Reveal";
import { Footer } from "@/components/sections/Footer";
import { getSite } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy Policy — OREENZA",
  description:
    "Privacy Policy for OREENZA. Learn how we collect, use, and protect your personal information when you use our services.",
  alternates: { canonical: "/privacy" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    title: "Privacy Policy — OREENZA",
    description:
      "Privacy Policy for OREENZA. Learn how we collect, use, and protect your personal information.",
    url: "/privacy",
    type: "website",
    siteName: "OREENZA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy — OREENZA",
    description: "Privacy Policy for OREENZA.",
  },
};

export default async function PrivacyPage() {
  const site = await getSite();

  return (
    <>
      <div className="lg:flex lg:items-start">
        <Sidebar
          variant="sub"
          content="privacy"
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
                Privacy Policy
              </li>
            </ol>
          </nav>

          {/* Header */}
          <header className="container-edge pt-12 lg:pt-16">
            <Reveal className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-cream/45">
              <span className="h-px w-10 shrink-0 bg-accent" />
              Legal
            </Reveal>
            <h1 className="font-anton text-[clamp(2.4rem,9vw,6.5rem)] uppercase leading-[0.88] tracking-tight text-cream">
              Privacy Policy.
            </h1>
            <p className="mt-4 text-sm text-cream/40">Last updated: September 19, 2026</p>
          </header>

          {/* Content */}
          <article className="container-edge mt-12 max-w-3xl pb-20 lg:mt-16">
            <div className="space-y-10 text-base leading-[1.85] text-cream/75 lg:text-lg">
              <section>
                <h2 className="mb-4 font-anton text-xl uppercase tracking-tight text-cream lg:text-2xl">
                  1. Introduction
                </h2>
                <p className="space-y-4">
                  Welcome to OREENZA (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
                </p>
              </section>

              <section>
                <h2 className="mb-4 font-anton text-xl uppercase tracking-tight text-cream lg:text-2xl">
                  2. Information We Collect
                </h2>
                <p className="mb-4">
                  We may collect information about you in various ways, including:
                </p>
                <ul className="ml-6 list-inside space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span><strong>Personal Data:</strong> Name, email address, phone number, and other contact information you provide when filling out forms or contacting us.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span><strong>Usage Data:</strong> Information about how you use our website, including IP address, browser type, pages visited, and time spent on pages.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span><strong>Cookies:</strong> We use cookies and similar tracking technologies to track activity on our website and store certain information.</span>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="mb-4 font-anton text-xl uppercase tracking-tight text-cream lg:text-2xl">
                  3. How We Use Your Information
                </h2>
                <p className="mb-4">
                  We use the information we collect to:
                </p>
                <ul className="ml-6 list-inside space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>Provide, operate, and maintain our services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>Improve, personalize, and expand our services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>Understand and analyze how you use our services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>Communicate with you, including for customer service and marketing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>Process transactions and send related information</span>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="mb-4 font-anton text-xl uppercase tracking-tight text-cream lg:text-2xl">
                  4. Data Sharing
                </h2>
                <p>
                  We do not sell, trade, or otherwise transfer your personal information to outside parties except as described in this Privacy Policy. We may share your information with trusted third parties who assist us in operating our website and conducting our business, provided those parties agree to keep this information confidential.
                </p>
              </section>

              <section>
                <h2 className="mb-4 font-anton text-xl uppercase tracking-tight text-cream lg:text-2xl">
                  5. Data Security
                </h2>
                <p>
                  We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure.
                </p>
              </section>

              <section>
                <h2 className="mb-4 font-anton text-xl uppercase tracking-tight text-cream lg:text-2xl">
                  6. Your Rights
                </h2>
                <p className="mb-4">
                  Depending on your location, you may have the following rights:
                </p>
                <ul className="ml-6 list-inside space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>Access, update, or delete your personal information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>Request correction of your personal data</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>Object to processing of your personal data</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>Data portability</span>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="mb-4 font-anton text-xl uppercase tracking-tight text-cream lg:text-2xl">
                  7. Changes to This Policy
                </h2>
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
                </p>
              </section>

              <section>
                <h2 className="mb-4 font-anton text-xl uppercase tracking-tight text-cream lg:text-2xl">
                  8. Contact Us
                </h2>
                <p>
                  If you have questions about this Privacy Policy, please contact us at{" "}
                  <a href={`mailto:${site.email}`} className="text-accent hover:underline">
                    {site.email}
                  </a>
                  .
                </p>
              </section>
            </div>
          </article>

          <Footer socials={site.socials} footerLinks={site.footerLinks} />
        </main>
      </div>
    </>
  );
}
