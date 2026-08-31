"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import NextLink from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  variant?: "primary" | "outline" | "ghost";
  className?: string;
  cursorLabel?: string;
  external?: boolean;
};

const base =
  "group relative inline-flex items-center justify-center gap-2 border border-accent px-7 py-3.5 text-sm font-bold uppercase tracking-[0.12em] transition-colors duration-300";

const variants: Record<string, string> = {
  primary: "bg-accent text-ink hover:bg-[#ff4f1a]",
  outline: "border border-cream/30 text-cream hover:border-accent hover:text-accent",
  ghost: "text-cream/70 hover:text-cream",
};

function isInternalHref(href: string): boolean {
  return href.startsWith("/") && !href.startsWith("//");
}

export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  cursorLabel,
  external,
}: ButtonProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 250, damping: 18, mass: 0.4 });
  const tx = useTransform(sx, (v) => `${v}px`);
  const ty = useTransform(sy, (v) => `${v}px`);

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.35);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.35);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const cls = `${base} ${variants[variant]} ${className}`;
  const inner = (
    <motion.span style={{ x: tx, y: ty }} className="inline-flex items-center gap-2">
      {children}
    </motion.span>
  );

  const cursorProps = {
    "data-cursor": "hover",
    "data-cursor-label": cursorLabel,
  } as const;

  if (href) {
    const isExternal = external ?? !isInternalHref(href);
    if (!isExternal) {
      // Use next/link for internal routes so navigation is client-side
      // (no full page reload) and the destination prefetches in the
      // background. This is the perf fix for "contact link takes ages".
      return (
        <NextLink
          href={href}
          onClick={onClick}
          prefetch
          className={cls}
          {...cursorProps}
        >
          <motion.span
            style={{ x: tx, y: ty }}
            onMouseMove={handleMove}
            onMouseLeave={reset}
            className="inline-flex items-center gap-2"
          >
            {children}
          </motion.span>
        </NextLink>
      );
    }
    return (
      <motion.a
        href={href}
        onClick={onClick}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        target="_blank"
        rel="noopener noreferrer"
        whileTap={{ scale: 0.97 }}
        className={cls}
        {...cursorProps}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      whileTap={{ scale: 0.97 }}
      className={cls}
      {...cursorProps}
    >
      {inner}
    </motion.button>
  );
}
