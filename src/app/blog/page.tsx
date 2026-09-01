import type { Metadata } from "next";
import { Sidebar } from "@/components/layout/Sidebar";
import { Reveal } from "@/components/ui/Reveal";
import { Footer } from "@/components/sections/Footer";
import { getSite, getPosts } from "@/lib/content";
import { BlogIndex } from "@/components/blog/BlogIndex";

export const metadata: Metadata = {
  title: { absolute: "Blog — Insights on design, performance & SEO | OREENZA" },
  description:
    "Practical thinking on design, performance, and SEO from the OREENZA team — for founders, marketers, and design-curious humans.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog — Insights on design, performance & SEO | OREENZA",
    description:
      "Practical thinking on design, performance, and SEO from the OREENZA team.",
    url: "/blog",
    type: "website",
  },
};

export default async function BlogIndexPage() {
  const [site, posts] = await Promise.all([getSite(), getPosts()]);

  return (
    <div className="lg:flex lg:items-start">
      <Sidebar
        variant="sub"
        content="blog"
        data={{
          serviceTitles: site.services.map((s) => s.title),
          industries: site.industries,
          email: site.email,
          phone: site.phone,
          slotsOpen: site.slotsOpen,
          socials: site.socials,
        }}
      />

      <main id="main" className="w-full lg:w-[70%] lg:flex-1">
        <header className="container-edge pt-24 lg:pt-32">
          <Reveal className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-cream/45">
            <span className="h-px w-10 bg-accent" />
            Field notes
          </Reveal>
          <h1 className="font-anton text-[clamp(2.4rem,9vw,6.5rem)] uppercase leading-[0.88] tracking-tight text-cream">
            Insights.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/60">
            Practical thinking on design, performance, and SEO from the team
            doing the work. No fluff, no filler.
          </p>
        </header>

        <div id="latest" className="container-edge mt-14 lg:mt-20">
          <BlogIndex posts={posts} />
        </div>

        <Footer socials={site.socials} />
      </main>
    </div>
  );
}
