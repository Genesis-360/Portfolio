"use client";

import { useMemo, useState } from "react";
import type { BlogPost } from "@/lib/content";
import { BlogFilter, FilteredBlogGrid } from "./BlogGrid";

export function BlogIndex({ posts }: { posts: BlogPost[] }) {
  const [categories, setCategories] = useState<string[]>([]);

  const allCategories = useMemo(() => {
    const set = new Set(posts.map((p) => p.category));
    return Array.from(set);
  }, [posts]);

  return (
    <div className="space-y-10">
      {allCategories.length > 1 && (
        <BlogFilter posts={posts} onFilter={setCategories} />
      )}
      <FilteredBlogGrid posts={posts} categories={categories} />
    </div>
  );
}
