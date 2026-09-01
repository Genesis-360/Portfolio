import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Sidebar } from "@/components/layout/Sidebar";
import { Reveal } from "@/components/ui/Reveal";
import { Footer } from "@/components/sections/Footer";
import { getPost, getPosts, getSite } from "@/lib/content";

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post not found", robots: { index: false } };

  return {
    title: `${post.title} — OREENZA Blog`,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      type: "article",
      images: post.cover ? [post.cover] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.cover ? [post.cover] : undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
}: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const [post, site, allPosts] = await Promise.all([
    getPost(slug),
    getSite(),
    getPosts(),
  ]);
  if (!post) notFound();

  const related = allPosts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 2);
  const recent = allPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.cover,
    datePublished: post.date,
    author: { "@type": "Organization", name: post.author },
    publisher: {
      "@type": "Organization",
      name: "OREENZA",
      logo: { "@type": "ImageObject", url: "/logo.svg" },
    },
    mainEntityOfPage: `/blog/${post.slug}`,
  };

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
        <div className="container-edge pt-10">
          <Link
            href="/blog"
            data-cursor="hover"
            className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-cream/45 transition-colors hover:text-accent">
            <span aria-hidden className="transition-transform group-hover:-translate-x-1">←</span>
            All posts
          </Link>
        </div>

        <header className="container-edge pt-10">
          <Reveal className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-cream/45">
            <span className="h-px w-10 bg-accent" />
            {post.category} · {post.readingTime}
          </Reveal>
          <h1 className="font-anton text-[clamp(2rem,7vw,5rem)] uppercase leading-[0.92] tracking-tight text-cream">
            {post.title}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[10px] uppercase tracking-[0.2em] text-cream/45">
            <span>{post.author}</span>
            <span>·</span>
            <span>
              {post.date ? new Date(post.date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              }) : ""}
            </span>
          </div>
        </header>

        {post.cover && (
          <div className="container-edge mt-10">
            <div className="relative aspect-[16/9] overflow-hidden rounded-sm bg-cream/[0.04]">
              <Image
                src={post.cover}
                alt={post.title}
                fill
                sizes="(max-width: 1024px) 100vw, 70vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        )}

        <article className="container-edge mt-12 max-w-3xl lg:mt-16">
          {post.excerpt && (
            <p className="mb-10 text-xl leading-relaxed text-cream/85 lg:text-2xl">
              {post.excerpt}
            </p>
          )}
          <div className="space-y-6">
            {post.content.map((paragraph, i) => (
              <p
                key={i}
                className="text-base leading-[1.85] text-cream/75 lg:text-lg">
                {paragraph}
              </p>
            ))}
          </div>
        </article>

        {/* CTA */}
        <div className="container-edge mt-16">
          <div className="rounded-sm border border-accent/30 bg-accent/[0.06] p-8 text-center">
            <h3 className="font-anton text-[clamp(1.4rem,3vw,2rem)] uppercase leading-[0.9] tracking-tight text-cream">
              Like this? Let&apos;s work together.
            </h3>
            <p className="mt-3 max-w-md mx-auto text-sm text-cream/65">
              We write about the work we do. Want us to do the work for you?
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/contact#book"
                data-cursor="hover"
                className="inline-flex items-center gap-2 border border-accent bg-accent px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-ink transition-colors hover:bg-[#ff4f1a]">
                Book a call
              </Link>
              <Link
                href="/services"
                data-cursor="hover"
                className="inline-flex items-center gap-2 border border-cream/30 px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-cream transition-colors hover:border-accent hover:text-accent">
                See services
              </Link>
            </div>
          </div>
        </div>

        {/* Related */}
        {(related.length > 0 ? related : recent).length > 0 && (
          <div className="container-edge mt-14 lg:mt-20">
            <p className="mb-6 text-[10px] uppercase tracking-[0.2em] text-cream/35">
              {related.length > 0 ? "Related posts" : "More posts"}
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {(related.length > 0 ? related : recent).map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  data-cursor="hover"
                  className="group block rounded-sm border border-cream/10 bg-cream/[0.03] p-5 transition-colors hover:border-accent/40">
                  <p className="text-[10px] uppercase tracking-[0.15em] text-cream/40">
                    {p.category} · {p.readingTime}
                  </p>
                  <p className="mt-2 font-anton text-base uppercase leading-tight tracking-tight text-cream transition-colors group-hover:text-accent">
                    {p.title}
                  </p>
                  <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-cream/50">
                    {p.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        <Footer socials={site.socials} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
      </main>
    </div>
  );
}
