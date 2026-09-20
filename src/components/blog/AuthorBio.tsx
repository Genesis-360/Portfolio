"use client";

import Image from "next/image";
import Link from "next/link";
import type { TeamMember } from "@/lib/content";

export function AuthorBio({ author }: { author: TeamMember | null }) {
  if (!author) {
    return (
      <div className="py-6">
        {/* Mobile: stacked layout */}
        <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-cream/10 sm:h-20 sm:w-20">
            <Image
              src="/team/siddhartha.avif"
              alt="OREENZA"
              fill
              className="object-cover"
            />
          </div>
          <div className="mt-4 sm:ml-5 sm:mt-0 sm:flex-1">
            <p className="text-[10px] uppercase tracking-[0.2em] text-cream/40">
              Written by
            </p>
            <Link
              href="/team"
              className="mt-1 block text-base font-medium text-cream transition-colors hover:text-accent sm:text-lg"
            >
              OREENZA Team
            </Link>
            <p className="mt-1 text-xs text-cream/50 sm:text-sm">
              AI-Powered Design & Development Agency
            </p>
            <p className="mt-2 text-xs leading-relaxed text-cream/60 sm:text-sm">
              We build high-performance websites that rank, convert, and scale.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6">
      {/* Mobile: stacked layout */}
      <div className="flex flex-col  sm:flex-row sm:items-center sm:text-left">
        <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-full bg-cream/10 sm:h-48 sm:w-48">
          <Image
            src={author.photo || "/team/siddhartha.avif"}
            alt={author.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="mt-4 sm:ml-5 sm:mt-0 sm:flex-1">
          <Link
            href={`/team#${author.slug}`}
            className="mt-2 block text-2xl font-medium text-cream transition-colors hover:text-accent sm:text-4xl"
          >
            {author.name}
          </Link>
          <p className="mt-2 text-lg text-cream/50 sm:text-xl">
            {author.role}
          </p>
          {author.bio && (
            <p className="mt-8 text-sm leading-relaxed text-cream/60 sm:text-md">
              {author.bio}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
