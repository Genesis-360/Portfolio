import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/content";

const BASE = "https://oreenza.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects();
  return [
    {
      url: `${BASE}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${BASE}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.8,
    },
    ...projects.map((p) => ({
      url: `${BASE}/project/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    })),
  ];
}
