"use client";

import {
  useEffect,
  useRef,
  type ElementType,
  type ReactNode,
} from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  delay?: number;
  y?: number;
};

/** Simple fade + rise on scroll. */
export function Reveal({
  children,
  className,
  as: Tag = "div",
  delay = 0,
  y = 40,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(el, {
        y,
        autoAlpha: 0,
        duration: 1,
        delay,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%" },
      });
    });
    return () => mm.revert();
  }, [delay, y]);

  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  );
}

type MaskTextProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  delay?: number;
  stagger?: boolean;
};

/** Masked text reveal — lines/words slide up from behind a clip. */
export function MaskText({
  children,
  className,
  as: Tag = "div",
  delay = 0,
  stagger = false,
}: MaskTextProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = stagger
      ? Array.from(el.querySelectorAll<HTMLElement>("[data-word]"))
      : [el.querySelector<HTMLElement>("[data-inner]") ?? el];

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.set(targets, { yPercent: 110 });
      gsap.to(targets, {
        yPercent: 0,
        duration: 1.05,
        delay,
        ease: "power4.out",
        stagger: stagger ? 0.08 : 0,
        scrollTrigger: { trigger: el, start: "top 90%" },
      });
    });
    return () => mm.revert();
  }, [delay, stagger]);

  if (stagger) {
    return (
      <Tag ref={ref as never} className={className} aria-label={typeof children === "string" ? children : undefined}>
        {typeof children === "string"
          ? children.split(" ").map((w, i) => (
              <span key={i} className="reveal-mask inline-block align-bottom">
                <span data-word className="inline-block">
                  {w}&nbsp;
                </span>
              </span>
            ))
          : children}
      </Tag>
    );
  }

  return (
    <Tag ref={ref as never} className={className}>
      <span data-inner className="block">
        {children}
      </span>
    </Tag>
  );
}

type StaggerProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  selector?: string;
  stagger?: number;
};

/** Animates direct children (or selector matches) with a stagger on scroll. */
export function Stagger({
  children,
  className,
  as: Tag = "div",
  selector = "[data-stagger-item]",
  stagger = 0.12,
}: StaggerProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = Array.from(el.querySelectorAll<HTMLElement>(selector));
    if (!items.length) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(items, {
        y: 50,
        autoAlpha: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger,
        scrollTrigger: { trigger: el, start: "top 82%" },
      });
    });
    return () => mm.revert();
  }, [selector, stagger]);

  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  );
}

type RevealMediaProps = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

/** Image that clip-reveals (scale + rise) as it scrolls into view. */
export function RevealMedia({
  src,
  alt,
  className,
  priority,
  sizes,
}: RevealMediaProps) {
  const wrap = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapEl = wrap.current;
    const innerEl = inner.current;
    if (!wrapEl || !innerEl) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        innerEl,
        { yPercent: 14, scale: 1.14 },
        {
          yPercent: 0,
          scale: 1,
          duration: 1.3,
          ease: "power3.out",
          scrollTrigger: { trigger: wrapEl, start: "top 88%" },
        }
      );
    });
    return () => mm.revert();
  }, []);

  return (
    <div ref={wrap} className={`relative overflow-hidden bg-cream/5 ${className ?? ""}`}>
      <div ref={inner} className="absolute inset-0">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes ?? "(max-width: 1024px) 100vw, 58vw"}
          className="object-contain p-4 sm:object-cover sm:p-0"
        />
      </div>
    </div>
  );
}
