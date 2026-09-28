export type ServiceTestimonial = {
  id: number;
  quote: string;
  author: string;
  role: string;
  company: string;
  image: string;
};

const serviceTestimonials: Record<string, ServiceTestimonial[]> = {
"brand-strategy-identity": [
    {
      id: 1,
      quote:
        "They ran a naming sprint that gave us three ownable options in two weeks. We picked one, cleared trademark, and launched — no back-and-forth drama.",
      author: "Priya Malhotra",
      role: "Founder",
      company: "Kora Skincare",
      image: "/clients/Priya Malhotra.avif",
    },
    {
      id: 2,
      quote:
        "The brand guidelines PDF alone was worth the engagement. Our freelancers finally stopped asking what colours and fonts to use.",
      author: "Arjun Mehta",
      role: "Marketing Lead",
      company: "Fieldwork Coffee",
      image: "/clients/Arjun Mehta.avif",
    },
    {
      id: 3,
      quote:
        "Logo system, voice document, sample copy — delivered in five weeks exactly as scoped. The reversed and condensed marks actually work at favicon size.",
      author: "Nisha Kapoor",
      role: "Co-Founder",
      company: "Orbit Finance",
      image: "/clients/Nisha Kapoor.avif",
    },
  ],
  "web-design--ux": [
    {
      id: 1,
      quote:
        "They redesigned our checkout flow and conversion jumped 34% in the first month. Every decision traced back to a real user need, not a Dribbble trend.",
      author: "Sofia Andersson",
      role: "Head of Product",
      company: "Cartly",
      image: "/clients/Sofia Andersson.avif",
    },
    {
      id: 2,
      quote:
        "The component library they handed off let our engineers ship three new landing pages without redesigning anything. That alone paid for the project.",
      author: "Marcus Webb",
      role: "Head of Design",
      company: "Minimal Co",
      image: "/clients/Marcus Webb.avif",
    },
    {
      id: 3,
      quote:
        "Wireframes before pixels, always. The site feels considered — not assembled from a template. Mobile scores are the best we've ever had.",
      author: "James Walker",
      role: "Founder",
      company: "Maison Atelier",
      image: "/clients/James Walker.avif",
    },
  ],
  "web-development": [
    {
      id: 1,
      quote:
        "95+ Lighthouse on mobile out of the box. Our previous site was at 42. Organic traffic climbed within weeks of the migration.",
      author: "Emma Hartley",
      role: "CTO",
      company: "Stackform",
      image: "/clients/Emma Hartley.avif",
    },
    {
      id: 2,
      quote:
        "They set up Keystatic, trained our content team, and left documentation. We publish blog posts weekly without touching a developer.",
      author: "Thomas Mueller",
      role: "Content Lead",
      company: "Brightpath",
      image: "/clients/Thomas Mueller.avif",
    },
    {
      id: 3,
      quote:
        "Scroll animations that actually feel smooth on mid-range phones. They code-split aggressively and it shows — pages load under 1.5s.",
      author: "Tanvi Rao",
      role: "Product Manager",
      company: "Lumen Health",
      image: "/clients/Tanvi Rao.avif",
    },
  ],
  "ai-automations": [
    {
      id: 1,
      quote:
        "We reclaimed roughly 18 hours a week on captions and scheduling. The AI drafts still sound like us — because they trained it on our voice.",
      author: "Freya Johansson",
      role: "Social Media Manager",
      company: "Bloom Retail",
      image: "/clients/Freya Johansson.avif",
    },
    {
      id: 2,
      quote:
        "The 30-day content calendar aligns with our product drops perfectly. It's not generic filler — it maps to our actual launch cycle.",
      author: "Mateo Rossi",
      role: "Brand Manager",
      company: "Nova Athletics",
      image: "/clients/Mateo Rossi.avif",
    },
    {
      id: 3,
      quote:
        "Community automation handles the FAQ comments so our team only jumps in for real conversations. Sentiment alerts caught a PR issue early.",
      author: "Aditya Bose",
      role: "Community Lead",
      company: "Thread & Co",
      image: "/clients/Aditya Bose.avif",
    },
  ],
  "ai-powered-seo": [
    {
      id: 1,
      quote:
        "They clustered our keyword landscape into a map we actually use. Not a 2,000-row spreadsheet — an actionable content plan.",
      author: "Farah Khan",
      role: "Growth Lead",
      company: "Vantage SaaS",
      image: "/clients/Farah Khan.avif",
    },
    {
      id: 2,
      quote:
        "Technical fixes landed in three weeks and Core Web Vitals went green. Content rankings followed around month four, exactly as they predicted.",
      author: "Yuki Tanaka",
      role: "Marketing Director",
      company: "Helio Finance",
      image: "/clients/Yuki Tanaka.avif",
    },
    {
      id: 3,
      quote:
        "Weekly rank tracking with alerts means we catch drops before traffic collapses. Transparent reporting on every change — no black box.",
      author: "Rashid Al-Mansour",
      role: "Head of SEO",
      company: "ParcelPro",
      image: "/clients/Rashid Al-Mansour.avif",
    },
  ],
  "ai-search-visibility": [
    {
      id: 1,
      quote:
        "Our Google Business Profile was half-empty. They filled every field, fixed categories, and we hit the map pack for our main keyword in six weeks.",
      author: "Marcus Chen",
      role: "Owner",
      company: "UrbanNest Interiors",
      image: "/clients/Marcus Chen.avif",
    },
    {
      id: 2,
      quote:
        "Review requests on autopilot took us from 12 to 80 reviews in four months. Click-through from Maps nearly tripled.",
      author: "Deepa Menon",
      role: "Practice Manager",
      company: "CareFirst Dental",
      image: "/clients/Deepa Menon.avif",
    },
    {
      id: 3,
      quote:
        "They manage responses for every review — positive and negative — in our voice. Multi-location setup was seamless across three clinics.",
      author: "Rahul Trivedi",
      role: "Regional Director",
      company: "ClearView Optics",
      image: "/clients/Rahul Trivedi.avif",
    },
  ],
};

export const defaultTestimonials: ServiceTestimonial[] = [
  {
    id: 1,
    quote:
      "The attention to detail and creative vision transformed our brand identity completely.",
    author: "Ingrid Nilsson",
    role: "Creative Director",
    company: "Studio Forma",
    image: "/clients/Ingrid Nilsson.avif",
  },
  {
    id: 2,
    quote:
      "Working with them felt like a true creative partnership from day one.",
    author: "Marcus Webb",
      role: "Head of Design",
      company: "Minimal Co",
      image: "/clients/Marcus Webb.avif",
  },
  {
    id: 3,
    quote:
      "They understand that great design is invisible yet unforgettable.",
    author: "Lars Voss",
    role: "Art Director",
    company: "Pixel & Co",
    image: "/clients/Lars Voss.avif",
  },
];

export function getServiceTestimonials(
  slug: string
): ServiceTestimonial[] {
  return serviceTestimonials[slug] ?? defaultTestimonials;
}
