import type { Metadata } from "next";
import Link from "next/link";
import { Sidebar } from "@/components/layout/Sidebar";
import { Reveal } from "@/components/ui/Reveal";
import { Footer } from "@/components/sections/Footer";
import { getSite } from "@/lib/content";

export const metadata: Metadata = {
  title: "Terms of Service — OREENZA",
  description:
    "Terms of Service for OREENZA. Read the terms and conditions governing your use of our website and services.",
  alternates: { canonical: "/terms" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    title: "Terms of Service — OREENZA",
    description:
      "Terms of Service for OREENZA. Read the terms and conditions governing your use of our services.",
    url: "/terms",
    type: "website",
    siteName: "OREENZA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service — OREENZA",
    description: "Terms of Service for OREENZA.",
  },
};

export default async function TermsPage() {
  const site = await getSite();

  return (
    <>
      <div className="lg:flex lg:items-start">
        <Sidebar
          variant="sub"
          content="terms"
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
                Terms of Service
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
              Terms of Service.
            </h1>
            <p className="mt-4 text-sm text-cream/40">Last updated: September 19, 2026</p>
          </header>

          {/* Content */}
          <article className="container-edge mt-12 max-w-3xl pb-20 lg:mt-16">
            <div className="space-y-10 text-base leading-[1.85] text-cream/75 lg:text-lg">
              <section>
                <h2 className="mb-4 font-anton text-xl uppercase tracking-tight text-cream lg:text-2xl">
                  1. Acceptance of Terms
                </h2>
                <p>
                  By accessing and using the OREENZA website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our services.
                </p>
              </section>

              <section>
                <h2 className="mb-4 font-anton text-xl uppercase tracking-tight text-cream lg:text-2xl">
                  2. Services
                </h2>
                <p>
                  OREENZA provides design, development, and digital growth services including brand identity, web design, web development, AI automations, SEO, and search visibility services. We reserve the right to modify, suspend, or discontinue any part of our services at any time.
                </p>
              </section>

              <section>
                <h2 className="mb-4 font-anton text-xl uppercase tracking-tight text-cream lg:text-2xl">
                  3. Intellectual Property
                </h2>
                <p className="mb-4">
                  All content, designs, code, and materials created by OREENZA as part of our services remain the intellectual property of OREENZA until full payment is received. Upon full payment:
                </p>
                <ul className="ml-6 list-inside space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>Client receives full ownership of final deliverables</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>OREENZA retains the right to display work in portfolios</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>Source code and design files are transferred to the client</span>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="mb-4 font-anton text-xl uppercase tracking-tight text-cream lg:text-2xl">
                  4. Payment Terms
                </h2>
                <p className="mb-4">
                  Payment terms are outlined in individual project proposals and invoices. Generally:
                </p>
                <ul className="ml-6 list-inside space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>A deposit is required before work begins</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>Milestone payments are due as outlined in the proposal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>Final payment is due before delivery of final files</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>Late payments may incur a 1.5% monthly fee</span>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="mb-4 font-anton text-xl uppercase tracking-tight text-cream lg:text-2xl">
                  5. Project Timeline
                </h2>
                <p>
                  Timelines are estimates and may vary based on project scope, client feedback delays, or unforeseen circumstances. We will communicate any delays promptly and work to minimize impact on delivery dates.
                </p>
              </section>

              <section>
                <h2 className="mb-4 font-anton text-xl uppercase tracking-tight text-cream lg:text-2xl">
                  6. Limitation of Liability
                </h2>
                <p>
                  OREENZA shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services. Our total liability shall not exceed the amount paid by you for the specific service giving rise to the claim.
                </p>
              </section>

              <section>
                <h2 className="mb-4 font-anton text-xl uppercase tracking-tight text-cream lg:text-2xl">
                  7. Termination
                </h2>
                <p>
                  Either party may terminate a project with written notice. In the event of termination, the client is responsible for payment for all work completed up to the termination date.
                </p>
              </section>

              <section>
                <h2 className="mb-4 font-anton text-xl uppercase tracking-tight text-cream lg:text-2xl">
                  8. Confidentiality
                </h2>
                <p>
                  Both parties agree to keep confidential any proprietary information shared during the course of the project. This includes business strategies, technical specifications, and any other non-public information.
                </p>
              </section>

              <section>
                <h2 className="mb-4 font-anton text-xl uppercase tracking-tight text-cream lg:text-2xl">
                  9. Governing Law
                </h2>
                <p>
                  These terms shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in India.
                </p>
              </section>

              <section>
                <h2 className="mb-4 font-anton text-xl uppercase tracking-tight text-cream lg:text-2xl">
                  10. Changes to Terms
                </h2>
                <p>
                  We reserve the right to update these terms at any time. Changes will be effective immediately upon posting. Your continued use of our services constitutes acceptance of the updated terms.
                </p>
              </section>

              <section>
                <h2 className="mb-4 font-anton text-xl uppercase tracking-tight text-cream lg:text-2xl">
                  11. Contact
                </h2>
                <p>
                  For questions about these Terms of Service, contact us at{" "}
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
