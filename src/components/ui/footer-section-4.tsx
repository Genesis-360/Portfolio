"use client";

import React from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { SocialCloud } from "@/components/ui/footer-section-4-utils/social-cloud";

const FOOTER_TITLE = "Engineering digital dominance for high-growth brands.";

const OreenzaLogo = ({ className }: { className?: string }) => {
  return (
    <svg
      className={className}
      width="64"
      height="38"
      viewBox="0 0 64 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 20.1032L39.8387 20.1032C44.7808 20.1032 48.7871 24.1095 48.7871 29.0516C48.7871 33.9937 44.7808 38 39.8387 38L1.56459e-06 38L0 20.1032Z"
        fill="currentColor"
      />
      <path
        d="M63.4968 17.8968L23.6581 17.8968C18.716 17.8968 14.7097 13.8904 14.7097 8.94839C14.7097 4.00633 18.716 0 23.6581 0L63.4968 0V17.8968Z"
        fill="currentColor"
      />
    </svg>
  );
};

type FooterLink = {
  title: string;
  links: { label: string; href: string }[];
};

const FOOTER_LINKS: FooterLink[] = [
  {
    title: "Services",
    links: [
      { label: "Brand Strategy", href: "/services/brand-strategy-identity" },
      { label: "Web Design & UX", href: "/services/web-design--ux" },
      { label: "Web Development", href: "/services/web-development" },
      { label: "AI Automations", href: "/services/ai-automations" },
      { label: "AI-Powered SEO", href: "/services/ai-powered-seo" },
      { label: "AI Search Visibility", href: "/services/ai-search-visibility" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: "Team", href: "/team" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
  {
    title: "Socials",
    links: [
      { label: "Instagram", href: "https://instagram.com/oreenza_agency" },
      { label: "LinkedIn", href: "https://www.linkedin.com/company/oreenza/" },
      { label: "X / Twitter", href: "https://x.com/oreenza" },
      { label: "Behance", href: "https://www.behance.net/oreenza_agency" },
      { label: "YouTube", href: "https://www.youtube.com/@oreenza" },
      { label: "GitHub", href: "https://github.com/Oreenza" },
    ],
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function FooterSection4() {
  return (
    <section className="px-4 py-12 [--color-primary:#F58327]">
      <motion.div
        className="container mx-auto max-w-7xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="flex h-full flex-col gap-4 md:flex-row">
          {/* Left Card — Accent */}
          <motion.div
            className="relative flex min-h-[300px] w-full flex-col justify-between overflow-hidden rounded-2xl bg-(--color-primary) p-8 md:min-h-[600px] md:w-1/3 md:p-10"
            variants={itemVariants}
          >
            {/* SVG Noise Overlay */}
            <svg
              className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-90 mix-blend-multiply"
              xmlns="http://www.w3.org/2000/svg"
            >
              <filter id="noiseFilter2">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.65"
                  numOctaves="4"
                  stitchTiles="stitch"
                />
              </filter>
              <rect width="100%" height="100%" filter="url(#noiseFilter2)" />
            </svg>

            {/* Top Logo */}
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-ink">
                <OreenzaLogo className="h-7 w-auto" />
                <span className="text-xl font-bold tracking-tight">
                  OREENZA
                </span>
              </div>
            </div>

            {/* Bottom Content */}
            <div className="relative z-10 space-y-6">
              <h3 className="text-lg font-bold capitalize text-ink">
                {FOOTER_TITLE}
              </h3>
              <SocialCloud className="gap-4 text-ink/80" />
              <p className="text-xs text-ink/60">
                &copy; {new Date().getFullYear()} OREENZA, All rights reserved
              </p>
            </div>
          </motion.div>

          {/* Right Card — Dark */}
          <motion.div
            className="flex w-full flex-col justify-between rounded-2xl border border-cream/10 bg-ink p-8 md:min-h-[600px] md:w-2/3 md:p-12"
            variants={itemVariants}
          >
            {/* Top Categories Grid */}
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-10">
              {FOOTER_LINKS.map((section, idx) => (
                <div key={idx} className="flex flex-col space-y-6">
                  <h4 className="text-lg font-bold text-cream">
                    {section.title}
                  </h4>
                  <ul className="flex flex-col space-y-3 font-medium text-cream/50">
                    {section.links.map((link, linkIdx) => (
                      <li key={linkIdx}>
                        <Link
                          href={link.href}
                          className="transition-colors hover:text-cream"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Bottom Newsletter */}
            <div className="mt-12 space-y-4 md:mt-0">
              <h4 className="text-lg font-bold text-cream">Newsletter</h4>
              <div className="flex w-full max-w-md flex-col gap-4 sm:flex-row">
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  className="flex-1 rounded-md border border-cream/20 bg-transparent px-4 py-3 text-sm text-cream placeholder:text-cream/40 focus:outline-none focus:ring-1 focus:ring-cream"
                />
                <button className="rounded-md bg-cream px-8 py-3 text-sm font-medium text-ink transition-opacity hover:opacity-90">
                  Submit
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
