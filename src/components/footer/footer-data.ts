export type FooterLink = {
  label: string;
  href: string;
};

export type FooterGroup = {
  title: string;
  links: FooterLink[];
};

export type FooterSocial = {
  label: string;
  href: string;
};

export type FooterData = {
  brand: {
    name: string;
    href: string;
  };
  groups: FooterGroup[];
  socials: FooterSocial[];
  copyright: string;
};

export const footerData: FooterData = {
  brand: {
    name: "OREENZA",
    href: "/",
  },
  groups: [
    {
      title: "Services",
      links: [
        { label: "Brand Strategy & Identity", href: "/services/brand-strategy-identity" },
        { label: "Web Design & UX", href: "/services/web-design--ux" },
        { label: "Web Development", href: "/services/web-development" },
        { label: "AI Automations", href: "/services/ai-automations" },
      ],
    },
    {
      title: "Growth",
      links: [
        { label: "AI-Powered SEO", href: "/services/ai-powered-seo" },
        { label: "AI Search Visibility", href: "/services/ai-search-visibility" },
        { label: "Case Studies", href: "/#work" },
        { label: "Testimonials", href: "/team" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Blog", href: "/blog" },
        { label: "Insights", href: "/blog" },
        { label: "Press & News", href: "/blog" },
        { label: "Documentation", href: "/blog" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "/team" },
        { label: "Careers", href: "/contact" },
        { label: "Partners", href: "/contact" },
        { label: "Contact", href: "/contact" },
      ],
    },
  ],
  socials: [
    { label: "Instagram", href: "https://instagram.com/oreenza_agency" },
    { label: "X", href: "https://x.com/oreenza" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/oreenza/" },
  ],
  copyright: `\u00A9 ${new Date().getFullYear()} OREENZA. All rights reserved.`,
};
