"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

/**
 * Spring-physics custom cursor: an arrow that tracks the pointer with a tight
 * spring, a label chip that trails on a looser spring, and a slight lean into
 * the direction of travel. Active across the whole site on fine pointers.
 */
export function CustomCursor() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [pressed, setPressed] = useState(false);

  // Start at 0,0 on both server and client (deterministic HTML), then jump to
  // the viewport center before the cursor becomes visible.
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Tight spring for the arrow, loose spring for the chip so it trails behind.
  const arrowX = useSpring(x, { stiffness: 550, damping: 45, mass: 0.6 });
  const arrowY = useSpring(y, { stiffness: 550, damping: 45, mass: 0.6 });
  const chipX = useSpring(x, { stiffness: 210, damping: 24, mass: 0.8 });
  const chipY = useSpring(y, { stiffness: 210, damping: 24, mass: 0.8 });

  // Lean into horizontal movement.
  const velocityX = useVelocity(x);
  const rotation = useSpring(
    useTransform(velocityX, [-1400, 1400], [-14, 14]),
    { stiffness: 300, damping: 40 }
  );

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const root = rootRef.current;
    if (!root) return;

    // Jump to the viewport center without animating from 0,0.
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    x.jump(cx);
    y.jump(cy);
    arrowX.jump(cx);
    arrowY.jump(cy);
    chipX.jump(cx);
    chipY.jump(cy);

    root.classList.add("is-active");
    document.documentElement.classList.add("has-custom-cursor");

    const interactiveSel = 'a, button, [data-cursor="hover"], input, textarea';

    let hovering = false;
    let label: string | null = null;

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const interactive = t.closest(interactiveSel) as HTMLElement | null;
      const nextHovering = !!interactive;
      const nextLabel = interactive?.getAttribute("data-cursor-label") ?? null;
      if (nextHovering === hovering && nextLabel === label) return;
      hovering = nextHovering;
      label = nextLabel;
      setHovering(hovering);
      setLabel(label);
    };

    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onDocLeave = () => root.classList.remove("is-active");
    const onDocEnter = () => root.classList.add("is-active");

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onDocLeave);
    document.documentElement.addEventListener("mouseenter", onDocEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onDocLeave);
      document.documentElement.removeEventListener("mouseenter", onDocEnter);
      root.classList.remove("is-active");
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [x, y, arrowX, arrowY, chipX, chipY]);

  return (
    <motion.div
      ref={rootRef}
      aria-hidden
      className="cursor-root pointer-events-none fixed inset-0 z-[100]"
    >
      {/* Label chip — trails the pointer on a loose spring */}
      <motion.div className="absolute left-0 top-0" style={{ x: chipX, y: chipY }}>
        <div className="translate-x-6 translate-y-7">
          <AnimatePresence>
            {hovering && label && (
              <motion.div
                key="cursor-chip"
                initial={{ scale: 0.3, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.3, opacity: 0 }}
                transition={{ ease: "easeInOut", duration: 0.18 }}
                className="origin-top-left whitespace-nowrap border border-ink bg-accent px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.18em] text-ink"
              >
                {label}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Arrow — tight spring + velocity lean */}
      <motion.div
        className="absolute left-0 top-0"
        style={{ x: arrowX, y: arrowY, rotate: rotation }}
      >
        <motion.div
          animate={{ scale: pressed ? 0.8 : hovering ? 1.2 : 1 }}
          transition={{ type: "spring", stiffness: 420, damping: 26 }}
          className="-translate-x-[10%] -translate-y-[9%]"
          style={{ transformOrigin: "10% 9%" }}
        >
          <svg
            width="26"
            height="31"
            viewBox="0 0 26 31"
            fill="none"
            className="drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]"
          >
            <path
              d="M21.993 14.425 2.549 2.935l4.444 23.108 4.653-10.002z"
              className="fill-accent stroke-cream"
              strokeWidth={2}
              strokeLinecap="square"
            />
          </svg>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
