"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function PageIntro() {
  const [done, setDone] = useState(false);

  // Any first interaction dismisses the splash so it never traps the visitor.
  useEffect(() => {
    if (done) return;
    const skip = () => setDone(true);
    const opts = { once: true } as const;
    window.addEventListener("pointerdown", skip, opts);
    window.addEventListener("keydown", skip, opts);
    window.addEventListener("wheel", skip, opts);
    window.addEventListener("touchstart", skip, opts);
    // Hard fallback: guarantees the splash is removed even if rAF-driven
    // animation callbacks are throttled (background tabs, some headless runs).
    const fallback = setTimeout(() => setDone(true), 1000);
    return () => {
      window.removeEventListener("pointerdown", skip);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("wheel", skip);
      window.removeEventListener("touchstart", skip);
      clearTimeout(fallback);
    };
  }, [done]);

  // The intro is fully pointer-transparent: clicks pass straight through to
  // the page underneath. We unmount it on first interaction (or after the
  // 1s fallback) so the painted-out state doesn't keep a heavy subtree in
  // the React tree on subsequent renders.
  if (done) return null;

  return (
    <motion.div
      aria-hidden
      // pointer-events-none is the critical perf fix. Without it, the
      // first click on a project link is captured by the intro overlay
      // (which only sets `done` to dismiss itself), so the link click is
      // lost and the user has to click again. With it, the click passes
      // through to the link underneath and navigation happens immediately.
      className="pointer-events-none fixed inset-0 z-90 overflow-hidden border-4 border-cream/70 bg-accent"
      initial={{ y: 0 }}
      animate={{ y: "-100%" }}
      onAnimationComplete={() => {
        (window as unknown as { __oreenzaIntroDone?: boolean }).__oreenzaIntroDone =
          true;
        window.dispatchEvent(new CustomEvent("oreenza:intro-done"));
        setDone(true);
      }}
      transition={{ duration: 0.55, ease: [0.83, 0, 0.17, 1], delay: 0.2 }}>
      <motion.div
        className="relative h-full w-full"
        initial={{ opacity: 0, scale: 0.992 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
        <motion.div
          className="absolute left-0 right-0 top-0 flex items-start justify-between px-6 pt-5 text-cream sm:px-10 sm:pt-8"
          initial={{ y: -18, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}>
          <p className="font-body text-sm uppercase leading-[0.95] tracking-tight sm:text-[21px]">
            OREENZA
            <br />
            AGENCY
          </p>
          <p className="font-anton text-xl tracking-tight text-cream sm:text-[40px]">
            +91 94576 33238
          </p>
          <p className="hidden font-body text-right text-sm uppercase leading-[0.95] tracking-tight sm:block sm:text-[21px]">
            OREENZA
            <br />
            AGENCY
          </p>
        </motion.div>

        <motion.div
          className="absolute inset-x-0 top-[18%] text-center sm:top-[22%]"
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}>
          <h2 className="font-anton text-[24vw] uppercase leading-[0.78] tracking-tight text-cream sm:text-[30vw] lg:text-[31vw]">
            OREENZA
          </h2>
          <motion.p
            className="pointer-events-none absolute left-1/2 top-[47%] -translate-x-1/2 -translate-y-1/2 font-script text-[11vw] leading-none text-ink sm:text-[13.8vw] lg:text-[12.2vw]"
            initial={{ opacity: 0, y: 20, rotate: -2 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.2,
            }}>
            Agency
          </motion.p>
        </motion.div>

        <p className="absolute left-[4%] top-[62%] hidden -translate-y-1/2 -rotate-90 sm:block font-body text-[18px] uppercase tracking-[0.04em] text-accent/95">
          OREENZA
        </p>
        <p className="absolute left-[4%] top-[28%] hidden -rotate-90 sm:block font-body text-[18px] uppercase tracking-[0.12em] text-accent/95 ">
          AGENCY
        </p>
        <p className="absolute right-[3%] top-[34%] hidden rotate-90 sm:block font-body text-[18px] uppercase tracking-[0.12em] text-accent/95 ">
          DESIGNING
        </p>
        <p className="absolute right-[6.5%] top-[60%] hidden font-body sm:block text-[18px] uppercase tracking-[0.12em] text-accent/95">
          WEBSITES
        </p>

        <motion.p
          className="absolute left-1/2 top-[74.5%] w-[94%] -translate-x-1/2 text-center font-body text-base uppercase leading-tight text-ink sm:top-[76.8%] sm:w-[90%] sm:text-[3.7rem]  lg:text-[32px]"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}>
          THE COMPLETE DIGITAL STOREFRONT FOR RESTAURANTS &amp; CAFES
        </motion.p>
        <motion.div
          className="absolute left-0 right-0 bottom-0 flex items-start justify-between px-6 pb-5 text-cream sm:px-10 sm:pt-8"
          initial={{ y: -18, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}>
          <p className="font-body text-sm uppercase leading-[0.95] tracking-tight sm:text-[21px]">
            OREENZA
            <br />
            AGENCY
          </p>
          <p className="font-anton text-sm tracking-tight text-cream sm:text-[40px]">
            hello@oreenza.com
          </p>
          <p className="hidden font-body text-right text-sm uppercase leading-[0.95] tracking-tight sm:block sm:text-[21px]">
            OREENZA
            <br />
            AGENCY
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
