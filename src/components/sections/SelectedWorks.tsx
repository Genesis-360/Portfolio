"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/lib/content";

export function SelectedWorks({ projects }: { projects: Project[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  return (
    <section
      id="work"
      ref={sectionRef}
      className="scroll-mt-24 py-0"
    >
      <div className="flex flex-col gap-2 lg:gap-3">
        {projects.map((p) => (
          <article key={p.slug} className="group">
            <Link href={`/project/${p.slug}`} data-cursor="hover" data-cursor-label="View Project">
                <div className="relative aspect-video overflow-hidden bg-ink">
                  <Image
                    src={p.cover}
                    alt={p.title}
                    fill
                    priority={p.index === 1}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-ink/10 transition-colors group-hover:bg-ink/0" />

                <div className="absolute bottom-2 right-2 rounded-sm border border-cream/10 bg-ink/80 px-2.5 py-1.5 text-right shadow-[0_10px_35px_rgba(0,0,0,0.55)] backdrop-blur-md transition-transform duration-300 ease-smooth group-hover:-translate-y-1 sm:bottom-4 sm:right-4 sm:px-5 sm:py-3">
                  <p className="text-[9px] uppercase tracking-[0.18em] text-cream/45 sm:text-[10px] sm:tracking-[0.2em]">
                    {p.year}
                  </p>
                  <p className="mt-0.5 text-[11px] uppercase tracking-[0.02em] text-cream sm:mt-1 sm:text-sm sm:tracking-[0.04em]">
                    {p.title}
                    <span className="ml-0.5 align-super text-[0.55em] font-bold text-cream/50">
                      ™
                    </span>
                    <span className="mx-1 text-accent sm:mx-1.5">·</span>
                    <span className="text-accent">{p.industry}</span>
                  </p>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
