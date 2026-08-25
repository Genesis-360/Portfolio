"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { PROJECTS } from "@/lib/data";

export function SelectedWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  return (
    <section
      id="work"
      ref={sectionRef}
      className="scroll-mt-24 py-0"
    >
      <div className="flex flex-col gap-10 lg:gap-16">
        {PROJECTS.map((p) => (
          <article key={p.slug} className="group">
            <Link href={`/project/${p.slug}`} data-cursor="hover" data-cursor-label="View">
              <div className="relative aspect-16/19 overflow-hidden bg-ink lg:aspect-video">
                <Image
                  src={p.cover}
                  alt={p.title}
                  fill
                  priority={p.index === "01"}
                  sizes="(max-width: 1024px) 100vw, 1200px"
                  className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-ink/10 transition-colors group-hover:bg-ink/0" />
              </div>

              <div className="mt-4 flex items-center justify-between gap-4 border border-cream/15 px-5 py-4 transition-colors duration-300 group-hover:border-accent">
                <p className="font-anton text-sm uppercase tracking-[0.04em] text-cream">
                  {p.title}
                  <span className="mx-2 text-accent">.</span>
                  <span className="text-cream/50">{p.category}</span>
                </p>
                <p className="flex-none text-[10px] uppercase tracking-[0.2em] text-cream/45">
                  {p.year}
                </p>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
