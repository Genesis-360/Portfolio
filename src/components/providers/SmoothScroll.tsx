"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type ScrollTarget = string | number | HTMLElement;

type LenisContextValue = {
  scrollTo: (target: ScrollTarget, opts?: { offset?: number }) => void;
};

const LenisContext = createContext<LenisContextValue>({
  scrollTo: () => {},
});

export const useSmoothScroll = () => useContext(LenisContext);

export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      ScrollTrigger.refresh();
      return;
    }

    const instance = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    });

    lenisRef.current = instance;

    instance.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => {
      instance.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(raf);
      instance.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollTo = (target: ScrollTarget, opts?: { offset?: number }) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, {
        offset: opts?.offset ?? 0,
        duration: 1.2,
      });
    } else if (typeof target === "string") {
      const el = document.querySelector(target);
      el?.scrollIntoView({ behavior: "smooth" });
    } else if (typeof target === "number") {
      window.scrollTo({ top: target, behavior: "smooth" });
    }
  };

  return (
    <LenisContext.Provider value={{ scrollTo }}>
      {children}
    </LenisContext.Provider>
  );
}
