"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PiArrowRightBold, PiCaretDownBold, PiCheckBold, PiPaperPlaneTiltBold } from "react-icons/pi";

const fieldCls =
  "w-full border-b border-cream/30 bg-transparent py-3 text-lg text-cream outline-none transition-colors duration-300 placeholder:text-cream/40 focus:border-accent";

const BUDGET_OPTIONS = [
  { value: "under-1k", label: "Under $1,000" },
  { value: "1k-5k", label: "$1,000 – $5,000" },
  { value: "5k-10k", label: "$5,000 – $10,000" },
  { value: "10k-plus", label: "$10,000+" },
];

type Status = "idle" | "sending" | "ok" | "error";

export function ContactForm({ email: siteEmail }: { email: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [budget, setBudget] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          budget,
          company: "",
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (!res.ok || !data.ok) {
        setStatus("error");
        setErrorMsg(
          data.error ?? `Something went wrong. Email us at ${siteEmail}.`,
        );
        return;
      }
      setStatus("ok");
    } catch {
      setStatus("error");
      setErrorMsg(`Network error. Email us at ${siteEmail}.`);
    }
  };

  const resetForm = () => {
    setStatus("idle");
    setName("");
    setEmail("");
    setMessage("");
    setBudget("");
  };

  return (
    <motion.form
      onSubmit={onSubmit}
      noValidate
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-7"
    >
      <AnimatePresence mode="wait">
        {status === "ok" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="flex flex-col items-center py-12 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-accent"
            >
              <PiCheckBold className="h-8 w-8 text-ink" />
            </motion.div>
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 font-anton text-2xl uppercase text-cream"
            >
              Message Sent
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-3 max-w-sm text-sm text-cream/60"
            >
              Thanks for reaching out. We&apos;ll get back to you within 24 hours.
              Check your inbox for a confirmation.
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              type="button"
              onClick={resetForm}
              className="mt-6 text-sm text-accent underline-offset-4 hover:underline"
            >
              Send another message
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-1 block text-[11px] uppercase tracking-[0.2em] text-cream/55"
                >
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={status === "sending"}
                  className={fieldCls}
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="mb-1 block text-[11px] uppercase tracking-[0.2em] text-cream/55"
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === "sending"}
                  className={fieldCls}
                  placeholder="you@company.com"
                />
              </div>
            </div>

            <div className="mt-7">
              <label
                htmlFor="contact-budget"
                className="mb-1 block text-[11px] uppercase tracking-[0.2em] text-cream/55"
              >
                Estimated Budget
              </label>
              <div className="relative">
                <select
                  id="contact-budget"
                  name="budget"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  disabled={status === "sending"}
                  className={`${fieldCls} cursor-pointer appearance-none border-b border-cream/30 pr-10`}
                  style={{
                    color: budget ? "#F5F5F5" : "rgba(245, 245, 245, 0.4)",
                  }}
                >
                  <option value="" className="bg-ink text-cream">
                    Select a budget range
                  </option>
                  {BUDGET_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value} className="bg-ink text-cream">
                      {option.label}
                    </option>
                  ))}
                </select>
                <PiCaretDownBold
                  className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-sm text-cream/40"
                  aria-hidden
                />
              </div>
            </div>

            <div className="mt-7">
              <label
                htmlFor="contact-message"
                className="mb-1 block text-[11px] uppercase tracking-[0.2em] text-cream/55"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                autoComplete="off"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={status === "sending"}
                className={`${fieldCls} resize-y`}
                placeholder="Tell us about the project…"
              />
            </div>

            {/* Honeypot */}
            <div aria-hidden="true" className="hidden">
              <label htmlFor="contact-company">Company</label>
              <input
                id="contact-company"
                name="company"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value=""
                onChange={() => {}}
              />
            </div>

            <div className="mt-7 flex flex-col items-center gap-4">
              <button
                type="submit"
                disabled={status === "sending"}
                className="group inline-flex items-center gap-3 bg-accent px-6 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-ink transition-all duration-300 ease-smooth hover:scale-[1.03] hover:bg-accent/90 disabled:opacity-60 disabled:hover:scale-100"
              >
                {status === "sending" ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-ink border-t-transparent" />
                    Sending…
                  </>
                ) : (
                  <>
                    Send enquiry
                    <PiPaperPlaneTiltBold className="text-[14px] transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" aria-hidden />
                  </>
                )}
              </button>

              <p
                role="status"
                aria-live="polite"
                className="text-sm text-cream/40"
              >
                {status === "error" && (
                  <span className="text-accent">{errorMsg}</span>
                )}
                {status === "idle" &&
                  `Or write to ${siteEmail} — we read every message.`}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.form>
  );
}
