"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PiListBold, PiXBold } from "react-icons/pi";

type TOCItem = {
  id: string;
  text: string;
  level: number;
};

export function TableOfContents({ headings }: { headings: TOCItem[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -80% 0px" }
    );

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-ink shadow-lg lg:hidden"
        aria-label="Toggle table of contents"
      >
        {isOpen ? <PiXBold className="h-5 w-5" /> : <PiListBold className="h-5 w-5" />}
      </button>

      {/* Mobile TOC overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed inset-x-4 bottom-20 z-40 rounded-lg border border-cream/10 bg-ink/95 p-4 backdrop-blur-sm lg:hidden"
          >
            <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-accent">
              On this page
            </p>
            <nav className="space-y-2">
              {headings.map((heading) => (
                <a
                  key={heading.id}
                  href={`#${heading.id}`}
                  onClick={() => setIsOpen(false)}
                  className={`block text-sm transition-colors ${
                    activeId === heading.id
                      ? "text-accent"
                      : "text-cream/50 hover:text-cream"
                  }`}
                  style={{ paddingLeft: `${(heading.level - 1) * 12}px` }}
                >
                  {heading.text}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop TOC */}
      <div className="hidden lg:block">
        <p className="mb-4 text-[10px] uppercase tracking-[0.2em] text-accent">
          On this page
        </p>
        <nav className="space-y-2 border-l border-cream/10">
          {headings.map((heading) => (
            <a
              key={heading.id}
              href={`#${heading.id}`}
              className={`block text-sm transition-all duration-200 ${
                activeId === heading.id
                  ? "border-l border-accent pl-4 text-accent"
                  : "pl-4 text-cream/40 hover:text-cream"
              }`}
            >
              {heading.text}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
