import Link from "next/link";
import Image from "next/image";
import type { BlogPost } from "@/lib/content";

export function RelatedBlogs({
  related,
  type = "See Our Related Blogs",
}: {
  related: BlogPost[];
  type?: string;
}) {
  if (related.length === 0) return null;

  return (
    <div>
      <p className="mb-6 text-[10px] uppercase tracking-[0.2em] text-cream/35">
        {type}
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {related.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            data-cursor="hover"
            className="group block rounded-sm border border-cream/10 bg-cream/3 overflow-hidden transition-colors hover:border-accent/40"
          >
            {post.cover && (
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={post.cover}
                  alt={post.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
            )}
            <div className="p-5">
              <p className="mt-2 font-bold text-base uppercase leading-tight tracking-tight text-cream transition-colors group-hover:text-accent">
                {post.title}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
