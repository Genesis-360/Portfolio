"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
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
  primary: "bg-accent text-cream hover:bg-[#ff4f1a]",
  outline: "border border-cream/30 text-cream hover:border-accent hover:text-accent",
  ghost: "text-cream/70 hover:text-cream",
};

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

  if (href) {
    return (
      <motion.a
        href={href}
        onClick={onClick}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        data-cursor="hover"
        data-cursor-label={cursorLabel}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        whileTap={{ scale: 0.97 }}
        className={cls}
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
      data-cursor="hover"
      data-cursor-label={cursorLabel}
      whileTap={{ scale: 0.97 }}
      className={cls}
    >
      {inner}
    </motion.button>
  );
}
