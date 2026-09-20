"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PiCheckBold, PiPaperPlaneTiltBold } from "react-icons/pi";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <div
      className="relative overflow-hidden rounded-lg border border-cream/10 bg-cream/2 p-5"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <h4 className="text-lg text-cream">Newsletter</h4>
      <p className="mt-1 text-sm text-cream/40">Weekly insights. No spam.</p>

      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mt-4 flex items-center gap-2"
          >
            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent">
              <PiCheckBold className="h-3 w-3 text-ink" />
            </div>
            <span className="text-sm text-accent">Thanks for subscribing!</span>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            className="mt-4 space-y-3"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email"
              required
              className="w-full rounded-md border border-cream/20 bg-transparent px-4 py-3 text-sm text-cream placeholder:text-cream/40 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/50"
            />
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-medium text-ink transition-all hover:bg-accent/90"
            >
              Subscribe
              <PiPaperPlaneTiltBold className="h-3.5 w-3.5" />
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
