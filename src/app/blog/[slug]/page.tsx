import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Sidebar } from "@/components/layout/Sidebar";
import { Reveal } from "@/components/ui/Reveal";
import { Footer } from "@/components/sections/Footer";
import { CallToAction } from "@/components/sections/CallToAction";
import { FaqSection } from "@/components/ui/FaqSection";
import { getPost, getPosts, getSite, getTeam } from "@/lib/content";
import { absoluteUrl, siteUrl } from "@/lib/url";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { AuthorBio } from "@/components/blog/AuthorBio";
import { RelatedBlogs } from "@/components/blog/RelatedBlogs";
import { ShareButtons } from "@/components/blog/ShareButtons";
import { AISummary } from "@/components/blog/AISummary";
import { Newsletter } from "@/components/blog/Newsletter";
import { QuickAnswer } from "@/components/blog/QuickAnswer";
import { KeyTakeaways } from "@/components/blog/KeyTakeaways";
import { OreenzaInsight } from "@/components/blog/OreenzaInsight";
import { RelatedServices } from "@/components/blog/RelatedServices";

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
    title: post.title,
    description: post.excerpt,
    keywords: [post.category, post.author, "OREENZA blog", ...post.tags],
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
      modifiedTime: post.updatedAt || post.date,
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
  const [post, site, allPosts, team] = await Promise.all([
    getPost(slug),
    getSite(),
    getPosts(),
    getTeam(),
  ]);
  if (!post) notFound();

  const related = allPosts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 2);
  const recent = allPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2);

  // Find author in team
  const author = team.find(
    (m) => m.name.toLowerCase() === post.author.toLowerCase()
  );

  // Extract headings for TOC (only H2s - important headings)
  const headings = post.content
    .filter((p) => p.startsWith("## "))
    .map((p) => {
      const text = p.replace(/^##\s+/, "");
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      return { id, text, level: 2 };
    });

  const articleJsonLd = {
    "@context": "https://schema.org" as const,
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.cover
      ? [`${siteUrl}${post.cover.startsWith("/") ? post.cover : `/${post.cover}`}`]
      : undefined,
    datePublished: post.date,
    dateModified: post.updatedAt || post.date,
    author: {
      "@type": "Person",
      name: post.author,
      jobTitle: author?.role,
      url: author ? `${siteUrl}/team#${author.slug}` : undefined,
    },
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
    keywords: [post.category, post.author, ...post.tags],
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

  const faqJsonLd =
    post.faq && post.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: post.faq.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.a,
            },
          })),
        }
      : null;

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
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

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
                <Link
                  href="/blog"
                  className="transition-colors hover:text-accent">
                  Blog
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="line-clamp-1 text-cream/70">
                {post.category}
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="line-clamp-1 text-cream/70">
                {post.title}
              </li>
            </ol>
          </nav>

          <header className="container-edge pt-10">
            <h1 className="font-anton text-[clamp(2rem,7vw,5rem)] uppercase leading-[0.92] tracking-tight text-cream">
              {post.title}
            </h1>
            <hr className="my-6 h-px border-none bg-cream/10" />
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[10px] uppercase tracking-[0.2em] text-accent">
              {post.updatedAt && post.updatedAt !== post.date && (
                <>
                  Last Update:
                  <span className="text-cream/45">
                    {new Date(post.updatedAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </>
              )}
            </div>
          </header>

          {post.cover && (
            <div className="container-edge mt-10">
              <div className="relative aspect-video overflow-hidden rounded-sm bg-cream/4">
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

          {/* Content*/}
          <div className="container-edge mt-10">
            <div className="flex gap-12">
              {/* Main Content */}
              <article className="flex-1 max-w-3xl">
                {post.excerpt && (
                  <p className="mb-10 text-xl leading-relaxed text-cream/85 lg:text-2xl">
                    {post.excerpt}
                  </p>
                )}
                <div className="space-y-6">
                  {post.content.map((paragraph, i) => {
                    // Check if OREENZA Insight should be inserted after this paragraph
                    const showInsight = i === 2 && post.oreenzaInsight;

                    // Render headings with proper styling
                    if (paragraph.startsWith("## ")) {
                      const text = paragraph.replace(/^##\s+/, "");
                      const id = text
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, "-")
                        .replace(/(^-|-$)/g, "");
                      return (
                        <div key={i}>
                          <h2
                            id={id}
                            className="pt-10 text-2xl font-bold text-cream lg:text-3xl">
                            {text}
                          </h2>
                        </div>
                      );
                    }
                    if (paragraph.startsWith("### ")) {
                      const text = paragraph.replace(/^###\s+/, "");
                      const id = text
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, "-")
                        .replace(/(^-|-$)/g, "");
                      return (
                        <h3
                          key={i}
                          id={id}
                          className="pt-8 text-xl font-semibold text-cream lg:text-2xl">
                          {text}
                        </h3>
                      );
                    }
                    // Render bullet points
                    if (paragraph.startsWith("- ")) {
                      return (
                        <li
                          key={i}
                          className="ml-4 list-disc text-base leading-[1.85] text-cream/75 lg:text-lg">
                          {paragraph.replace(/^-\s+/, "")}
                        </li>
                      );
                    }
                    return (
                      <div key={i}>
                        <p className="text-base leading-[1.85] text-cream/75 lg:text-lg">
                          {paragraph}
                        </p>
                        {showInsight && (
                          <OreenzaInsight insight={post.oreenzaInsight} />
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* FAQ Section */}
                {post.faq && post.faq.length > 0 && (
                  <div className="mt-12 max-w-3xl">
                    <FaqSection
                      heading="Frequently asked questions"
                      description="Common questions about this topic."
                      faqs={post.faq.map((item, i) => ({
                        id: `faq-${i}`,
                        q: item.q,
                        a: item.a,
                      }))}
                    />
                  </div>
                )}

                {/* Mobile Share Buttons */}
                <div className="mt-8 lg:hidden">
                  <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-accent">
                    Share
                  </p>
                  <ShareButtons title={post.title} url={`/blog/${post.slug}`} />
                </div>

                {/* Author Bio */}
                <div className="mt-12 max-w-3xl">
                  <AuthorBio author={author ?? null} />
                </div>
              </article>

              {/* Right Sidebar - TOC + Share + Newsletter + AI Summary (Desktop only) */}
              <aside className="hidden lg:block lg:w-70 lg:shrink-0">
                <div className="sticky top-24 space-y-10">
                  {/* Table of Contents */}
                  {headings.length > 0 && (
                    <TableOfContents headings={headings} />
                  )}

                  {/* Share */}
                  <div>
                    <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-accent">
                      Share
                    </p>
                    <ShareButtons
                      title={post.title}
                      url={`/blog/${post.slug}`}
                    />
                  </div>

                  {/* AI Summary */}
                  <AISummary
                    title={post.title}
                    url={`/blog/${post.slug}`}
                  />

                  {/* Newsletter */}
                  <Newsletter />
                </div>
              </aside>
            </div>
            <hr className="my-12 h-px border-none bg-cream/10" />
          </div>

          {/* Related Posts */}
          <div className="container-edge mt-14 pb-10 lg:mt-20 lg:pb-18">
            <RelatedBlogs
              related={related.length > 0 ? related : recent}
              type={related.length > 0 ? "Related posts" : "More posts"}
            />
          </div>

          <Footer socials={site.socials} footerLinks={site.footerLinks} />
        </main>
      </div>
    </>
  );
}
