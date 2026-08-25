export type Project = {
  slug: string;
  index: string;
  title: string;
  category: string;
  year: string;
  client: string;
  /** Local image in /public/projects/<slug>/<slug>.png */
  cover: string;
  /** Short tagline shown under the title. */
  intro: string;
  /** One or two paragraphs of case-study copy. */
  description: string[];
  services: string[];
  /** Local gallery images. Empty if you only have the cover. */
  gallery: string[];
};

export type Service = {
  id: string;
  title: string;
  desc: string;
  items: string[];
};

export type Client = {
  name: string;
};

export type Stat = {
  value: string;
  label: string;
};

// ---------------------------------------------------------------------------
// IMAGES
// Files live in: public/projects/<slug>/<slug>.webp  (converted from PNG,
// keep sources in /public/projects/<slug>/<slug>.png for re-exporting)
// To add gallery shots, drop e.g. 1.webp / 2.webp and list them in `gallery`.
// ---------------------------------------------------------------------------
const cover = (slug: string) => `/projects/${slug}/${slug}.webp`;

export const PROJECTS: Project[] = [
  {
    slug: "oestra",
    index: "01",
    title: "Oestra",
    category: "Brand & Web",
    year: "2025",
    client: "Oestra",
    cover: cover("oestra"),
    intro:
      "A confident identity and website for a modern wellness brand finding its voice.",
    description: [
      "We shaped Oestra's brand from the ground up — a calm, assured identity system and a website that turns a complex offer into something clear and human.",
      "The result reads premium without cold: considered type, restrained colour, and motion that guides rather than distracts.",
    ],
    services: ["Brand Identity", "Web Design", "Art Direction"],
    gallery: [],
  },
  {
    slug: "pizza_house",
    index: "02",
    title: "Pizza House",
    category: "Restaurant Brand",
    year: "2024",
    client: "Pizza House",
    cover: cover("pizza_house"),
    intro:
      "A warm, appetite-first rebrand for a neighbourhood favourite.",
    description: [
      "Pizza House needed to feel as good as it tastes. We built a friendly, tactile identity and a site that gets out of the way of the food.",
      "From menu to packaging, every touchpoint now shares one hungry, handwritten point of view.",
    ],
    services: ["Brand Identity", "Packaging", "Web Design"],
    gallery: [],
  },
  {
    slug: "tasteIt",
    index: "03",
    title: "TasteIt",
    category: "Product & Web",
    year: "2025",
    client: "TasteIt",
    cover: cover("tasteIt"),
    intro:
      "A food-discovery product designed to make choosing effortless.",
    description: [
      "TasteIt's challenge was decision fatigue. We designed the core flows and a flexible product system that makes browsing feel like a recommendation from a friend.",
      "Fast, focused, and a little playful — built to scale across devices without losing its charm.",
    ],
    services: ["Product Design", "Web Design", "Motion"],
    gallery: [],
  },
  {
    slug: "velvet_bean",
    index: "04",
    title: "Velvet Bean",
    category: "Beverage Brand",
    year: "2023",
    client: "Velvet Bean",
    cover: cover("velvet_bean"),
    intro:
      "A calm, premium identity for a coffee alternative.",
    description: [
      "Velvet Bean asked for quiet luxury. We delivered a soft, grounded brand world — muted palette, generous space, and a wordmark that feels like a deep breath.",
      "The system travels cleanly from can to campaign, always unhurried.",
    ],
    services: ["Brand Identity", "Packaging", "Campaign"],
    gallery: [],
  },
];

export const SERVICES: Service[] = [
  {
    id: "brand",
    title: "Brand Identity",
    desc: "Names, marks and systems built to outlast trends.",
    items: ["Naming", "Logo Systems", "Guidelines", "Voice"],
  },
  {
    id: "web",
    title: "Web Design",
    desc: "Editorial, performant sites with motion at the core.",
    items: ["UX/UI", "Design Systems", "Webflow", "Next.js"],
  },
  {
    id: "product",
    title: "Product",
    desc: "Interfaces and flows that feel inevitable.",
    items: ["Prototyping", "Design Eng", "Accessibility", "QA"],
  },
  {
    id: "motion",
    title: "Motion",
    desc: "Storytelling through considered, buttery animation.",
    items: ["Art Direction", "GSAP", "3D", "Video"],
  },
];

export const CLIENTS: Client[] = [
  { name: "NOVA" },
  { name: "KINDL" },
  { name: "ARC" },
  { name: "MÖBIUS" },
  { name: "FORM" },
  { name: "VESPER" },
];

export const STATS: Stat[] = [
  { value: "12+", label: "Years crafting" },
  { value: "180", label: "Projects shipped" },
  { value: "40", label: "Awards earned" },
  { value: "9", label: "Countries served" },
];

export const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Dribbble", href: "https://dribbble.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "X / Twitter", href: "https://x.com" },
];

export const EMAIL = "hello@oreenza.com";
export const CAL_LINK = "https://cal.com/oreenza/discovery-call";
/** cal.com link path used by the on-site inline embed. */
export const CAL_EMBED = "oreenza/discovery-call";

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getNextProject(slug: string): Project {
  const i = PROJECTS.findIndex((p) => p.slug === slug);
  return PROJECTS[(i + 1) % PROJECTS.length];
}
