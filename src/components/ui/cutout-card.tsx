import * as React from "react";
import Image from "next/image";

/* ─────────────────────────────────────────
   Corner notch — SVG that creates the "cut-out"
   effect on the card's label/pin surfaces.
───────────────────────────────────────── */
type CutoutCornerProps = {
  className?: string;
  size?: number;
};

export function CutoutCorner({ className = "", size = 20 }: CutoutCornerProps) {
  return (
    <svg
      className={`pointer-events-none absolute fill-current ${className}`}
      height={size}
      viewBox="0 0 20 20"
      width={size}
      aria-hidden
    >
      <path d="M20 20V0C8.954 0 0 8.954 0 20h20z" />
    </svg>
  );
}

/* ─────────────────────────────────────────
   useCutoutContentStaggerVariants — animation
   preset for content reveal on hover/load.
───────────────────────────────────────── */
export function useCutoutContentStaggerVariants() {
  return {
    container: {
      hidden: {},
      show: {
        transition: {
          staggerChildren: 0.06,
          delayChildren: 0.05,
        },
      },
    },
    item: {
      hidden: { opacity: 0, y: 10 },
      show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] as const },
      },
    },
  };
}

/* ─────────────────────────────────────────
   Surface base class — reused by all cutout cards
───────────────────────────────────────── */
export const cutoutCardSurfaceClassName =
  "relative isolate overflow-hidden rounded-[20px] bg-card ring-1 ring-border transition-shadow duration-300 hover:shadow-[0_24px_60px_-20px_rgba(0,0,0,0.45)]";

/* ─────────────────────────────────────────
   CutoutCard — the main card shell
───────────────────────────────────────── */
export function CutoutCard({
  className = "",
  children,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`${cutoutCardSurfaceClassName} ${className}`} {...rest}>
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────
   Media (image + overlay + label + pin)
───────────────────────────────────────── */
export function CutoutCardMedia({
  className = "",
  children,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`relative overflow-hidden bg-muted ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}

export function CutoutCardImage({
  src,
  alt,
  className = "",
  sizes = "100vw",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <Image
      alt={alt}
      className={`absolute inset-0 h-full w-full object-cover ${className}`}
      fill
      priority={priority}
      sizes={sizes}
      src={src}
    />
  );
}

export function CutoutCardOverlay({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/40 ${className}`}
      aria-hidden
    />
  );
}

/* ─────────────────────────────────────────
   Inset label (e.g. "Featured") — has cut corner
───────────────────────────────────────── */
export function CutoutCardInsetLabel({
  className = "",
  children,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`absolute px-5 py-3 bg-card ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────
   Pin (e.g. "New") — top-right tag with cut corners
───────────────────────────────────────── */
export function CutoutCardPin({
  className = "",
  children,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`absolute px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold shadow-md ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────
   Content
───────────────────────────────────────── */
export function CutoutCardContent({
  className = "",
  children,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`p-6 ${className}`} {...rest}>
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────
   Footer (author + meta)
───────────────────────────────────────── */
export function CutoutCardFooter({
  className = "",
  children,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`flex items-center justify-between gap-4 ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────
   Action (e.g. "Read More" button) — bottom-right
───────────────────────────────────────── */
export function CutoutCardAction({
  className = "",
  children,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`absolute ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
