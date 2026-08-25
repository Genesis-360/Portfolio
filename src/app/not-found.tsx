"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

/* ------------------------------------------------------------------ */
/* Intro sync — the PageIntro curtain lifts at ~3.1s; the 404 show     */
/* starts the moment it clears (flag + event + fallback).              */
/* ------------------------------------------------------------------ */

function useIntroDone() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const w = window as unknown as { __oreenzaIntroDone?: boolean };
    const onDone = () => setReady(true);
    if (w.__oreenzaIntroDone) {
      const t = setTimeout(onDone, 0);
      return () => clearTimeout(t);
    }
    window.addEventListener("oreenza:intro-done", onDone);
    const fallback = setTimeout(onDone, 4000);
    return () => {
      window.removeEventListener("oreenza:intro-done", onDone);
      clearTimeout(fallback);
    };
  }, []);

  return ready;
}

/* ------------------------------------------------------------------ */
/* Stick figures (self-contained, brand-stroked)                      */
/* ------------------------------------------------------------------ */

type Pose = "run" | "flail" | "leap" | "wave";

const POSE_PATHS: Record<Pose, string[]> = {
  run: [
    "M32 12 m-6.5 0 a6.5 6.5 0 1 0 13 0 a6.5 6.5 0 1 0 -13 0",
    "M32 18.5 L31 37",
    "M32 24 L21 31",
    "M32 24 L43 20",
    "M31 37 L20 47",
    "M31 37 L43 43"
  ],
  flail: [
    "M32 12 m-6.5 0 a6.5 6.5 0 1 0 13 0 a6.5 6.5 0 1 0 -13 0",
    "M32 18.5 L31 37",
    "M32 24 L23 13",
    "M32 24 L41 13",
    "M31 37 L23 49",
    "M31 37 L39 49"
  ],
  leap: [
    "M32 12 m-6.5 0 a6.5 6.5 0 1 0 13 0 a6.5 6.5 0 1 0 -13 0",
    "M32 18.5 L31 37",
    "M32 24 L20 18",
    "M32 24 L44 28",
    "M31 37 L18 41",
    "M31 37 L45 34"
  ],
  wave: [
    "M32 12 m-6.5 0 a6.5 6.5 0 1 0 13 0 a6.5 6.5 0 1 0 -13 0",
    "M32 18.5 L32 40",
    "M32 24 L22 34",
    "M32 24 L42 14",
    "M32 40 L24 52",
    "M32 40 L40 52"
  ]
};

function StickFigure({ pose }: { pose: Pose }) {
  const paths = POSE_PATHS[pose];
  return (
    <svg viewBox="0 0 64 64" className="h-auto w-full" fill="none">
      {/* Cream casing so figures read on the dark phase... */}
      {paths.map((d, i) => (
        <path
          key={`casing-${i}`}
          d={d}
          stroke="#fffae5"
          strokeWidth={i === 0 ? 6.5 : 7}
          strokeLinecap="round"
        />
      ))}
      {/* ...ink core so they read on the cream flood. */}
      {paths.map((d, i) => (
        <path
          key={`core-${i}`}
          d={d}
          stroke={i === 0 ? "#f63b05" : "#000000"}
          strokeWidth={i === 0 ? 3 : 3.5}
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}

type FigureConfig = {
  top?: string;
  bottom?: string;
  pose: Pose;
  fly: number;
  spin?: number;
  delay: number;
};

const FIGURES: FigureConfig[] = [
  { top: "2%", pose: "run", fly: 4200, delay: -1200 },
  { top: "13%", pose: "flail", fly: 6800, spin: 1700, delay: -3400 },
  { top: "25%", pose: "leap", fly: 9200, spin: 2600, delay: -5200 },
  { top: "38%", pose: "flail", fly: 5400, spin: 1300, delay: -2200 },
  { top: "55%", pose: "run", fly: 7600, spin: 3400, delay: -6100 },
  { top: "70%", pose: "leap", fly: 8400, spin: 2200, delay: -4600 },
  { bottom: "3%", pose: "wave", fly: 0, delay: 0 }
];

function CharactersAnimation({ ready }: { ready: boolean }) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap || !ready) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const figures = wrap.querySelectorAll<HTMLDivElement>("[data-figure]");
    const animations: Animation[] = [];

    figures.forEach((el) => {
      const fly = Number(el.dataset.fly);
      const spin = el.dataset.spin ? Number(el.dataset.spin) : 0;
      const delay = Number(el.dataset.delay) || 0;
      if (!fly) return;

      // Endless parade — each figure loops across at its own pace.
      animations.push(
        el.animate(
          [{ left: "106%" }, { left: "-26%" }],
          { duration: fly, delay, easing: "linear", iterations: Infinity }
        )
      );
      if (spin) {
        animations.push(
          el.animate(
            [{ transform: "rotate(0deg)" }, { transform: "rotate(-360deg)" }],
            { duration: spin, easing: "linear", iterations: Infinity }
          )
        );
      }
    });

    return () => animations.forEach((a) => a.cancel());
  }, [ready]);

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-10"
    >
      {FIGURES.map((f, i) => (
        <div
          key={i}
          data-figure
          data-fly={f.fly}
          data-spin={f.spin ?? ""}
          data-delay={f.delay}
          className="absolute w-[13%] max-w-[150px] sm:w-[15%]"
          style={{ top: f.top, bottom: f.bottom, left: f.fly ? "106%" : "6%" }}
        >
          <StickFigure pose={f.pose} />
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Circle field (canvas) — burst in, then drift forever               */
/* ------------------------------------------------------------------ */

type Circle = { x: number; y: number; size: number; color: string; phase: number };

function CircleAnimation({ ready }: { ready: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!ready) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    let circles: Circle[] = [];
    let timer = 0;
    let raf: number | null = null;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const initArr = () => {
      circles = Array.from({ length: 340 }, (_, i) => ({
        x:
          Math.random() * (canvas.width * 3 - canvas.width * 1.2) +
          canvas.width * 1.2,
        y:
          Math.random() * (canvas.height - canvas.height * -0.2) +
          canvas.height * -0.2,
        size: canvas.width / 900,
        color: i % 25 === 0 ? "#f63b05" : "#fffae5",
        phase: Math.random() * Math.PI * 2
      }));
    };

    const draw = () => {
      timer++;
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.clearRect(0, 0, canvas.width, canvas.height);

      const distanceX = canvas.width / 80;
      const growthRate = canvas.width / 900;
      const bob = canvas.height * 0.006;

      for (const c of circles) {
        context.beginPath();
        context.fillStyle = c.color;
        if (timer < 65) {
          c.x -= distanceX;
          c.size += growthRate;
        } else {
          // Ambient: gentle perpetual drift, wrapping at the left edge.
          c.x -= distanceX * 0.018;
          if (c.x < -c.size * 2) {
            c.x = canvas.width + c.size * 2 + Math.random() * canvas.width * 0.4;
            c.y =
              Math.random() * (canvas.height - canvas.height * -0.2) +
              canvas.height * -0.2;
          }
        }
        const y = c.y + Math.sin(timer * 0.012 + c.phase) * bob;
        context.arc(c.x, y, c.size, 0, Math.PI * 2);
        context.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    const start = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      timer = 0;
      initArr();
      if (reduced) {
        timer = 500;
        draw();
        raf = null;
      } else {
        raf = requestAnimationFrame(draw);
      }
    };

    const handleResize = () => {
      if (raf !== null) cancelAnimationFrame(raf);
      raf = null;
      start();
    };

    start();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, [ready]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 z-0 h-full w-full"
    />
  );
}

/* ------------------------------------------------------------------ */
/* Message                                                            */
/* ------------------------------------------------------------------ */

function MessageDisplay({ ready }: { ready: boolean }) {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ready) return;
    const timer = setTimeout(() => setIsVisible(true), 400);
    return () => clearTimeout(timer);
  }, [ready]);

  return (
    <div className="absolute inset-0 z-100 flex flex-col items-center justify-center px-6">
      <div
        className={`relative flex flex-col items-center text-center transition-all duration-700 ease-smooth ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <div
          aria-hidden
          className="absolute -inset-x-24 -inset-y-20 -z-10 rounded-full bg-cream/60 blur-3xl"
        />

        <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-ink/60">
          <span className="h-px w-8 bg-ink/30" />
          Page not found
          <span className="h-px w-8 bg-ink/30" />
        </p>

        <h1 className="mt-4 font-anton text-[clamp(6rem,22vw,15rem)] leading-[0.85] tracking-tight text-ink">
          4<span className="text-accent">0</span>4
        </h1>

        <p className="mt-6 max-w-md text-sm font-medium leading-relaxed text-ink/70">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => router.back()}
            data-cursor="hover"
            data-cursor-label="Back"
            className="group flex items-center gap-2 border-2 border-ink/50 px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] text-ink transition-all duration-300 ease-smooth hover:bg-ink hover:text-cream"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-300 group-hover:-translate-x-1"
            >
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
            Go back
          </button>
          <Link
            href="/"
            data-cursor="hover"
            data-cursor-label="Home"
            className="group flex items-center gap-2 bg-accent px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] text-ink transition-all duration-300 ease-smooth hover:bg-ink hover:text-cream"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-300 group-hover:-translate-y-0.5"
            >
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                               */
/* ------------------------------------------------------------------ */

export default function NotFound() {
  const ready = useIntroDone();

  return (
    <div className="relative flex h-svh w-full items-center justify-center overflow-hidden bg-ink">
      <CircleAnimation ready={ready} />
      <CharactersAnimation ready={ready} />
      <MessageDisplay ready={ready} />
    </div>
  );
}
