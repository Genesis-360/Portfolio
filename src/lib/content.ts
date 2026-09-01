import { createReader } from "@keystatic/core/reader";
import { yaml } from "@/lib/yaml";
import { readFileSync } from "fs";
import { join } from "path";
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
  location: string;
  timeline: string;
  platform: string;
  problem: string;
  strategy: string;
  outcome: string;
  metrics: { label: string; value: string; context: string }[];
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

export type Service = {
  slug: string;
  title: string;
  order: number;
  intro: string;
  sections: { heading: string; body: string }[];
  faq: { q: string; a: string }[];
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  readingTime: string;
  cover: string;
  content: string[];
};

export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  bio: string;
  photo: string;
  order: number;
  socials?: { platform: string; url: string }[];
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
      location: project.location ?? "",
      timeline: project.timeline ?? "",
      platform: project.platform ?? "",
      problem: project.problem ?? "",
      strategy: project.strategy ?? "",
      outcome: project.outcome ?? "",
      metrics: (project.metrics ?? []).map((m) => ({
        label: m.label ?? "",
        value: m.value ?? "",
        context: m.context ?? "",
      })),
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

export async function getPosts(): Promise<BlogPost[]> {
  let all: Awaited<ReturnType<typeof reader.collections.blogs.all>> = [];
  try {
    all = await reader.collections.blogs.all();
  } catch (err) {
    console.warn("[cms] failed to read blogs:", err);
    return [];
  }
  return all
    .map(({ slug, entry: post }) => ({
      slug,
      title: post.title,
      excerpt: post.excerpt ?? "",
      date: post.date ?? "",
      author: post.author ?? "OREENZA",
      category: post.category ?? "Insights",
      readingTime: post.readingTime ?? "5 min read",
      cover: post.cover ?? "",
      content: [...(post.content ?? [])],
    }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPost(slug: string): Promise<BlogPost | undefined> {
  const posts = await getPosts();
  return posts.find((p) => p.slug === slug);
}

export async function getTeam(): Promise<TeamMember[]> {
  try {
    const filePath = join(process.cwd(), "src/content/team/index.yaml");
    const raw = readFileSync(filePath, "utf-8");
    const parsed = yaml(raw) as { members?: TeamMember[] };
    return (parsed.members ?? []).sort((a, b) => a.order - b.order);
  } catch (err) {
    console.warn("[cms] failed to read team:", err);
    return [];
  }
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

export async function getServices(): Promise<Service[]> {
  let all: Awaited<ReturnType<typeof reader.collections.services.all>> = [];
  try {
    all = await reader.collections.services.all();
  } catch (err) {
    console.warn("[cms] failed to read services:", err);
    return [];
  }
  return all
    .map(({ slug, entry: svc }) => ({
      slug,
      title: svc.title,
      order: svc.order ?? 0,
      intro: svc.intro ?? "",
      sections: [...(svc.sections ?? [])],
      faq: (svc.faq ?? []).map((f) => ({ q: f.q, a: f.a })),
    }))
    .sort((a, b) => a.order - b.order);
}

export async function getService(slug: string): Promise<Service | undefined> {
  try {
    return await reader.collections.services.read(slug) as Service | undefined;
  } catch {
    return undefined;
  }
}
