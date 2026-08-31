import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../../keystatic.config";

const reader = createReader(process.cwd(), keystaticConfig);

export type Project = {
  slug: string;
  title: string;
  index: number;
  industry: string;
  year: string;
  client: string;
  liveUrl: string;
  intro: string;
  description: string[];
  services: string[];
  cover: string;
  gallery: string[];
};

export type Site = {
  email: string;
  phone: string;
  slotsOpen: number;
  calLink: string;
  calEmbedPath: string;
  socials: { label: string; href: string }[];
  industries: { name: string }[];
  services: { title: string; items: string[] }[];
};

export async function getProjects(): Promise<Project[]> {
  let all: Awaited<ReturnType<typeof reader.collections.projects.all>> = [];
  try {
    all = await reader.collections.projects.all();
  } catch (err) {
    console.warn("[cms] failed to read projects:", err);
    return [];
  }
  return all
    .map(({ slug, entry: project }) => ({
      slug,
      title: project.title,
      index: project.index ?? 0,
      industry: project.industry,
      year: project.year,
      client: project.client,
      liveUrl: project.liveUrl ?? "",
      intro: project.intro,
      description: [...(project.description ?? [])],
      services: [...(project.services ?? [])],
      cover: project.cover ?? "",
      gallery: (project.gallery ?? []).filter((g): g is string => typeof g === 'string'),
    }))
    .sort((a, b) => a.index - b.index);
}

export async function getProject(slug: string): Promise<Project | undefined> {
  const projects = await getProjects();
  return projects.find((p) => p.slug === slug);
}

export async function getNextProject(slug: string): Promise<Project> {
  const projects = await getProjects();
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}

export async function getSite(): Promise<Site> {
  let site: Partial<Site> | null = null;
  try {
    site = (await reader.singletons.site.read()) as Partial<Site> | null;
  } catch (err) {
    console.warn("[cms] failed to read site settings:", err);
  }
  const s = site ?? {};
  return {
    email: s.email ?? "hello@oreenza.com",
    phone: s.phone ?? "+91 94576 33238",
    slotsOpen: s.slotsOpen ?? 4,
    calLink: s.calLink ?? "https://cal.com/oreenza/discovery-call",
    calEmbedPath: s.calEmbedPath ?? "oreenza/discovery-call",
    socials: s.socials
      ? s.socials.map((x) => ({ label: x.label, href: x.href }))
      : [],
    industries: (s.industries ?? []).map((i) => ({ name: i?.name ?? "" })),
    services: s.services
      ? s.services.map((x) => ({ title: x.title, items: [...x.items] }))
      : [],
  };
}
