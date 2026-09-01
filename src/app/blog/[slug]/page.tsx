import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Sidebar } from "@/components/layout/Sidebar";
import { Reveal } from "@/components/ui/Reveal";
import { Footer } from "@/components/sections/Footer";
import { CallToAction } from "@/components/sections/CallToAction";
import { getPost, getPosts, getSite } from "@/lib/content";
import { absoluteUrl, siteUrl } from "@/lib/url";

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
    keywords: [post.category, post.author, "OREENZA blog", "design blog", "performance", "SEO"],
    authors: [{ name: post.author }],
    alternates: { canonical: `/blog/${post.slug}` },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      siteName: "OREENZA",
      images: post.cover
        ? [
            {
              url: post.cover,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : undefined,
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
    "@context": "https://schema.org" as const,
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.cover
      ? [`${siteUrl}${post.cover.startsWith("/") ? post.cover : `/${post.cover}`}`]
      : undefined,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Person", name: post.author },
    publisher: {
      "@type": "Organization",
      name: "OREENZA",
      logo: { "@type": "ImageObject", url: `${siteUrl}/logo.svg` },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(`/blog/${post.slug}`),
    },
    articleSection: post.category,
    keywords: [post.category, post.author],
    inLanguage: "en",
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org" as const,
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: absoluteUrl(`/blog/${post.slug}`) },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

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
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="container-edge pt-10">
            <ol className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-cream/40">
              <li>
                <Link href="/" className="transition-colors hover:text-accent">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href="/blog" className="transition-colors hover:text-accent">
                  Blog
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="line-clamp-1 text-cream/70">
                {post.title}
              </li>
            </ol>
          </nav>

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
          <div className="container-edge mt-16 py-16 lg:py-24">
            <CallToAction
              eyebrow="Like this?"
              heading="Let's work together."
              body="We write about the work we do. Want us to do the work for you?"
              primaryLabel="Book a call"
              secondaryLabel="See services"
            />
          </div>

          {/* Related */}
          {(related.length > 0 ? related : recent).length > 0 && (
            <div className="container-edge mt-14 pb-10 lg:mt-20 lg:pb-18">
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
                    <p className="mt-2 font-bold text-base uppercase leading-tight tracking-tight text-cream transition-colors group-hover:text-accent">
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
        </main>
      </div>
    </>
  );
}
