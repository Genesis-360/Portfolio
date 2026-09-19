"use client";

import { Button } from "@/components/ui/Button";
import { PiArrowRightBold } from "react-icons/pi";

type Props = {
  /** Eyebrow line above the heading. Defaults to "Get started". */
  eyebrow?: string;
  /** Main heading text. */
  heading: string;
  /** Supporting paragraph below the heading. */
  body: string;
  /** Primary CTA label. Defaults to "Book a discovery call". */
  primaryLabel?: string;
  /** Primary CTA href. Defaults to Cal.com booking. */
  primaryHref?: string;
  /** Secondary CTA label. Defaults to "All services". */
  secondaryLabel?: string;
  /** Secondary CTA href. Defaults to the services index. */
  secondaryHref?: string;
};

/**
 * Editorial call-to-action card.
 *
 * Layout-agnostic: it renders a single `<div>` card with no surrounding
 * `container-edge` wrapper, so it can be dropped inside any section without
 * double-padding. The parent should add its own padding.
 */
export function CallToAction({
  eyebrow = "Get started",
  heading,
  body,
  primaryLabel = "Book a discovery call",
  primaryHref = "https://cal.com/oreenza/discovery-call",
  secondaryLabel = "All services",
  secondaryHref = "/services",
}: Props) {
  return (
    <div className="relative overflow-hidden border border-accent/30 bg-accent/[0.05] p-8 text-center lg:p-14">
      {/* Decorative corner ticks — give the panel a print/poster feel */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-3 top-3 h-4 w-px bg-accent/60"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute left-3 top-3 h-px w-4 bg-accent/60"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute right-3 top-3 h-4 w-px bg-accent/60"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute right-3 top-3 h-px w-4 bg-accent/60"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-3 left-3 h-4 w-px bg-accent/60"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-3 left-3 h-px w-4 bg-accent/60"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-3 right-3 h-4 w-px bg-accent/60"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-3 right-3 h-px w-4 bg-accent/60"
      />

      <p
        id="cta-heading"
        className="flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.32em] text-cream/45"
      >
        <span className="h-px w-8 bg-accent" />
        {eyebrow}
        <span className="h-px w-8 bg-accent" />
      </p>

      <h2 className="mt-6 font-anton text-[clamp(1.9rem,5vw,3.25rem)] uppercase leading-[0.9] tracking-tight text-cream">
        {heading}
      </h2>

      <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-cream/65 lg:text-lg">
        {body}
      </p>

      <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
        <Button href={primaryHref} variant="primary" cursorLabel="Book" className="w-full justify-center sm:w-auto">
          {primaryLabel}
          <PiArrowRightBold className="ml-2 inline-block text-base" aria-hidden />
        </Button>
        <Button href={secondaryHref} variant="outline" className="w-full justify-center sm:w-auto">
          {secondaryLabel}
          <PiArrowRightBold className="ml-2 inline-block text-base" aria-hidden />
        </Button>
      </div>
    </div>
  );
}
