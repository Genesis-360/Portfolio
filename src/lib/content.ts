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
  intro: string;
  description: string[];
  services: string[];
  cover: string;
  gallery: string[];
};

export type Site = {
  email: string;
  calLink: string;
  calEmbedPath: string;
  socials: { label: string; href: string }[];
  clients: string[];
  services: { title: string; items: string[] }[];
};

export async function getProjects(): Promise<Project[]> {
  const all = await reader.collections.projects.all();
  return all
    .map(({ slug, entry: project }) => ({
      slug,
      title: project.title,
      index: project.index ?? 0,
      industry: project.industry,
      year: project.year,
      client: project.client,
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
  const site = (await reader.singletons.site.read()) as Partial<Site> | null ?? {};
  return {
    email: site.email ?? "hello@oreenza.com",
    calLink: site.calLink ?? "https://cal.com/oreenza/discovery-call",
    calEmbedPath: site.calEmbedPath ?? "oreenza/discovery-call",
    socials: site.socials ? site.socials.map((x) => ({ label: x.label, href: x.href })) : [],
    clients: [...(site.clients ?? [])],
    services: site.services ? site.services.map((x) => ({ title: x.title, items: [...x.items] })) : [],
  };
}
