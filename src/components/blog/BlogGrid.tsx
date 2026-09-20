"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { BlogPost, TeamMember } from "@/lib/content";

const CATEGORIES = ["All", "Design", "SEO", "Performance", "Insights"];

export function BlogFilter({
  onFilter,
}: {
  posts: BlogPost[];
  onFilter: (cats: string[]) => void;
}) {
  const [active, setActive] = useState<string[]>([]);

  function toggle(cat: string) {
    let next: string[];
    if (cat === "All") {
      next = active.includes("All") ? [] : ["All"];
    } else {
      next = active.includes(cat)
        ? active.filter((c) => c !== cat)
        : [...active.filter((c) => c !== "All"), cat];
      if (next.length === 0) next = ["All"];
    }
    setActive(next);
    onFilter(next.includes("All") ? [] : next);
  }

  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
      {CATEGORIES.map((cat) => {
        const isActive = active.includes(cat) || (cat === "All" && active.length === 0);
        return (
          <button
            key={cat}
            type="button"
            onClick={() => toggle(cat)}
            className={`rounded-full border px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] transition-colors ${
              isActive
                ? "border-accent bg-accent text-ink"
                : "border-cream/15 text-cream/55 hover:border-cream/40 hover:text-cream/80"
            }`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}

/* ── Featured (first) post: hero card spanning full row ───────────── */
function FeaturedPost({ post, team }: { post: BlogPost; team: TeamMember[] }) {
  const author = team.find(
    (m) => m.name.toLowerCase() === post.author.toLowerCase()
  );

  return (
    <Link
      href={`/blog/${post.slug}`}
      data-cursor="hover"
      className="group block border-b border-cream/10 pb-12 mb-12"
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
        <div className="relative aspect-[4/3] overflow-hidden bg-cream/5 lg:aspect-auto lg:h-full min-h-[300px]">
          {post.cover ? (
            <Image
              src={post.cover}
              alt={post.title}
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-[1.03]"
              priority
            />
          ) : (
            <div className="flex h-full min-h-[280px] w-full items-center justify-center">
              <span className="font-anton text-[clamp(3rem,10vw,7rem)] uppercase leading-none text-cream/8">
                {post.title.slice(0, 2)}
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.22em] text-cream/40">
            <span className="text-accent">{post.category}</span>
            <span className="h-px w-6 bg-cream/20" />
            <span>{post.readingTime}</span>
          </div>

          <h2 className="mt-5 text-[clamp(2rem,5vw,3.6rem)] uppercase leading-none tracking-[-0.02em] text-cream transition-colors group-hover:text-accent">
            {post.title}
          </h2>

          <p className="mt-5 max-w-prose text-base leading-relaxed text-cream/60">
            {post.excerpt}
          </p>
        
          <div className="mt-8 flex items-center gap-3">
            {author && (
              <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full bg-cream/10">
                <Image
                  src={author.photo || "/team/siddhartha.avif"}
                  alt={author.name}
                  fill
                  sizes="32px"
                  className="object-cover"
                />
              </div>
            )}
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-cream/80">
                {post.author}
              </span>
              {author && (
                <span className="text-[9px] uppercase tracking-[0.15em] text-cream/40">
                  {author.role}
                </span>
              )}
            </div>
            <span className="h-px w-4 bg-cream/20" />
            <span className="text-[10px] uppercase tracking-[0.18em] text-cream/40">
              {post.date
                ? new Date(post.date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                : ""}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ── Standard post card: editorial grid item ─────────────────────── */
function StandardPost({ post, index, team }: { post: BlogPost; index: number; team: TeamMember[] }) {
  const author = team.find(
    (m) => m.name.toLowerCase() === post.author.toLowerCase()
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}>
      <Link
        href={`/blog/${post.slug}`}
        data-cursor="hover"
        className="group flex flex-col">
        <div className="relative aspect-4/3 overflow-hidden bg-cream/5">
          {post.cover ?
            <Image
              src={post.cover}
              alt={post.title}
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-[1.04]"
            />
          : <div className="flex h-full w-full items-center justify-center">
              <span className="font-anton text-6xl uppercase leading-none text-cream/8">
                {post.title.slice(0, 2)}
              </span>
            </div>
          }
        </div>

        <div className="mt-5 flex flex-col">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-cream/40">
            <span className="text-accent">{post.category}</span>
            <span className="h-px w-3 bg-cream/20" />
            <span>{post.readingTime}</span>
          </div>

          <h3 className="mt-3 text-[clamp(1.1rem,2.4vw,1.6rem)] tracking-[-0.01em] text-cream transition-colors group-hover:text-accent">
            {post.title}
          </h3>

          <div className="mt-4 flex items-center gap-2">
            {author && (
              <div className="relative h-6 w-6 shrink-0 overflow-hidden rounded-full bg-cream/10">
                <Image
                  src={author.photo || "/team/siddhartha.avif"}
                  alt={author.name}
                  fill
                  sizes="24px"
                  className="object-cover"
                />
              </div>
            )}
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-cream/70">
                {post.author}
              </span>
              {author && (
                <span className="text-[9px] uppercase tracking-[0.15em] text-cream/40">
                  {author.role}
                </span>
              )}
            </div>
            <span className="h-px w-3 bg-cream/20" />
            <span className="text-[10px] uppercase tracking-[0.18em] text-cream/35">
              {post.date ?
                new Date(post.date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })
              : ""}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function FilteredBlogGrid({
  posts,
  categories,
  team,
}: {
  posts: BlogPost[];
  categories: string[];
  team: TeamMember[];
}) {
  const filtered =
    categories.length === 0
      ? posts
      : posts.filter((p) => categories.includes(p.category));

  if (filtered.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="font-anton text-xl uppercase tracking-tight text-cream/40">
          No posts in this category yet.
        </p>
        <p className="mt-2 text-sm text-cream/30">Check back soon.</p>
      </div>
    );
  }

  const [featured, ...rest] = filtered;
  const showFeatured = categories.length === 0 && filtered.length > 1;

  return (
    <div className="pb-4 lg:pb-2">
      {showFeatured && <FeaturedPost post={featured} team={team} />}

      <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2">
        {(showFeatured ? rest : filtered).map((post, index) => (
          <StandardPost key={post.slug} post={post} index={index} team={team} />
        ))}
      </div>
    </div>
  );
}
