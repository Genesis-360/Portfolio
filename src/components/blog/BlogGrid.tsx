"use client";

import { useState } from "react";
import Image from "next/image";
import type { BlogPost } from "@/lib/content";

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

export function FilteredBlogGrid({
  posts,
  categories,
}: {
  posts: BlogPost[];
  categories: string[];
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

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {filtered.map((post) => (
        <article key={post.slug} className="group">
          <a
            href={`/blog/${post.slug}`}
            data-cursor="hover"
            data-cursor-label="Read">
            {post.cover && (
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-cream/[0.04]">
                <Image
                  src={post.cover}
                  alt={post.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-[1.03]"
                />
              </div>
            )}
            <div className="mt-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-cream/40">
                {post.category} · {post.readingTime}
              </p>
              <h2 className="mt-2 font-anton text-[clamp(1.1rem,2.5vw,1.6rem)] uppercase leading-[0.95] tracking-tight text-cream transition-colors group-hover:text-accent">
                {post.title}
              </h2>
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-cream/55">
                {post.excerpt}
              </p>
              <p className="mt-3 text-[10px] uppercase tracking-[0.15em] text-cream/30">
                {post.date ? new Date(post.date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }) : ""} · {post.author}
              </p>
            </div>
          </a>
        </article>
      ))}
    </div>
  );
}
