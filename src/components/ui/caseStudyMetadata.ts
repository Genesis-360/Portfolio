import type { Metadata } from "next";

type Metric = { label: string; value: string; context: string };

type ProjectMeta = {
  slug: string;
  title: string;
  client: string;
  industry: string;
  year: string;
  services: string[];
  cover: string;
  intro: string;
  problem: string;
  outcome: string;
  description: string[];
};

export function caseStudyMetadata(project: ProjectMeta): Metadata {
  const fullDescription = [project.intro, project.problem, project.outcome]
    .filter(Boolean)
    .join(" ")
    .slice(0, 160);

  return {
    title: `${project.title} case study — ${project.client} | OREENZA`,
    description: fullDescription,
    keywords: [project.industry, project.client, ...project.services, "case study"],
    alternates: { canonical: `/project/${project.slug}` },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
    openGraph: {
      title: `${project.title} case study — ${project.client}`,
      description: fullDescription,
      url: `/project/${project.slug}`,
      type: "article",
      siteName: "OREENZA",
      images: [
        {
          url: project.cover,
          width: 1200,
          height: 630,
          alt: `${project.title} — case study cover`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} case study`,
      description: fullDescription,
      images: [project.cover],
    },
  };
}
