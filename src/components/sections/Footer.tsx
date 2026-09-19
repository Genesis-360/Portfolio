"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import {
  FaInstagram,
  FaDribbble,
  FaLinkedin,
  FaBehance,
  FaYoutube,
  FaGithub,
  FaFacebook,
  FaXTwitter,
} from "react-icons/fa6";


const SOCIAL_ICONS: Record<string, { icon: React.ReactNode; color: string }> = {
  Instagram: { icon: <FaInstagram />, color: "#E4405F" },
  Dribbble: { icon: <FaDribbble />, color: "#EA4C89" },
  LinkedIn: { icon: <FaLinkedin />, color: "#0A66C2" },
  "X / Twitter": { icon: <FaXTwitter />, color: "#FFFFFF" },
  Behance: { icon: <FaBehance />, color: "#1769FF" },
  YouTube: { icon: <FaYoutube />, color: "#FF0000" },
  GitHub: { icon: <FaGithub />, color: "#333333" },
  Facebook: { icon: <FaFacebook />, color: "#1877F2" },
};

const FOOTER_LINKS = [
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

type FooterProps = {
  socials: { label: string; href: string }[];
  footerLinks?: { title: string; links: { label: string; href: string }[] }[];
};

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

export function Footer({ socials, footerLinks = [] }: FooterProps) {
  const year = new Date().getFullYear();
  const links = footerLinks.length > 0 ? footerLinks : FOOTER_LINKS;

  return (
    <footer id="contact" className="border-t border-cream/10">
      <motion.div
        className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="flex flex-col gap-4 md:flex-row">
          {/* Left Card — Accent */}
          <motion.div
            className="relative flex min-h-75 w-full flex-col justify-between overflow-hidden rounded-2xl bg-accent p-5 md:min-h-150 md:w-1/3 md:p-6"
            variants={itemVariants}
          >
            {/* Noise overlay */}
            <svg
              className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-90 mix-blend-multiply"
              xmlns="http://www.w3.org/2000/svg"
            >
              <filter id="noiseFilter">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.65"
                  numOctaves="4"
                  stitchTiles="stitch"
                />
              </filter>
              <rect width="100%" height="100%" filter="url(#noiseFilter)" />
            </svg>

            {/* Top — Logo */}
            <div className="relative z-10">
              <Link href="/" className="flex w-full items-center justify-center rounded-xl bg-ink p-4">
                <Image
                  src="/wordmark.svg"
                  alt="OREENZA"
                  width={140}
                  height={30}
                  className="h-7 w-auto"
                  priority
                />
              </Link>
            </div>

            {/* Bottom — Title, Socials, Copyright */}
            <div className="relative z-10 space-y-6 rounded-xl bg-ink p-6">
              <h3 className="text-lg capitalize text-cream">
                Engineering digital dominance for high-growth brands.
              </h3>

              {/* Social icons */}
              <div className="flex flex-wrap gap-4">
                {socials.map((s) => {
                  const iconData = SOCIAL_ICONS[s.label];
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={s.label}
                      className="flex items-center justify-center transition-all duration-200 hover:scale-110"
                      style={{ color: iconData?.color || "#F5F5F5" }}
                    >
                      <span className="text-2xl">
                        {iconData?.icon || s.label.charAt(0)}
                      </span>
                    </a>
                  );
                })}
              </div>

              <p className="text-xs text-cream/60">
                &copy; {year} OREENZA, All rights reserved
              </p>
            </div>
          </motion.div>

          {/* Right Card — Dark */}
          <motion.div
            className="flex w-full flex-col justify-between rounded-2xl border border-cream/10 bg-ink p-5 md:min-h-150 md:w-2/3 md:p-6"
            variants={itemVariants}
          >
            {/* Links Grid — 4 columns */}
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-10 pb-10">
              {links.map((section, idx) => (
                <div key={idx} className="flex flex-col space-y-6">
                  <h4 className="text-lg text-cream">
                    {section.title}
                  </h4>
                  <ul className="flex flex-col space-y-3 text-cream/50">
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
            <div className="mt-12 space-y-4 border-t border-cream/10 pt-8 md:mt-0">
              <h4 className="text-lg text-cream">Newsletter</h4>
              <div className="flex w-full max-w-md flex-col gap-4 sm:flex-row">
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  className="flex-1 rounded-md border border-cream/20 bg-transparent px-4 py-3 text-sm text-cream placeholder:text-cream/40 focus:outline-none focus:ring-1 focus:ring-cream"
                />
                <button className="rounded-md bg-cream px-8 py-3 text-sm text-ink transition-opacity hover:opacity-90">
                  Submit
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </footer>
  );
}
