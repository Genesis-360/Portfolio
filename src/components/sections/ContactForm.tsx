"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PiCaretDownBold, PiCheckBold, PiPaperPlaneTiltBold } from "react-icons/pi";

const fieldCls =
  "w-full border-b border-cream/30 bg-transparent py-3 text-lg text-cream outline-none transition-colors duration-300 placeholder:text-cream/40 focus:border-accent";

const labelCls = "mb-1 block text-[11px] uppercase tracking-[0.2em] text-cream/55";

const BUDGET_OPTIONS = [
  { value: "under-5k", label: "Under $5,000" },
  { value: "5k-15k", label: "$5,000 – $15,000" },
  { value: "15k-50k", label: "$15,000 – $50,000" },
  { value: "50k-plus", label: "$50,000+" },
];

const SERVICE_OPTIONS = [
  "Branding",
  "Website Design",
  "Web Development",
  "AI Automations",
  "AI SEO",
  "Motion",
];

type Status = "idle" | "sending" | "ok" | "error";

export function ContactForm({ email: siteEmail }: { email: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [services, setServices] = useState<string[]>([]);
  const [budget, setBudget] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const toggleService = (service: string) =>
    setServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service],
    );

  const selectColor = (value: string) => ({
    color: value ? "#F5F5F5" : "rgba(245, 245, 245, 0.4)",
  });

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
          company,
          services,
          budget,
          message,
          website: "",
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (!res.ok || !data.ok) {
        setStatus("error");
        setErrorMsg(data.error ?? `Something went wrong. Email us at ${siteEmail}.`);
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
    setCompany("");
    setServices([]);
    setBudget("");
    setMessage("");
  };

  return (
    <motion.form
      onSubmit={onSubmit}
      noValidate
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-6"
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
              className="flex h-14 w-14 items-center justify-center rounded-full bg-accent"
            >
              <PiCheckBold className="h-7 w-7 text-ink" />
            </motion.div>
            <h3 className="mt-5 font-anton text-2xl uppercase text-cream">
              Enquiry Sent
            </h3>
            <p className="mt-3 max-w-sm text-sm text-cream/60">
              Thanks — we&apos;ll get back within 24 hours. Confirmation is in
              your inbox.
            </p>
            <button
              type="button"
              onClick={resetForm}
              className="mt-5 text-sm text-accent underline-offset-4 hover:underline"
            >
              Send another
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col gap-6"
          >
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className={labelCls}>
                  Name <span className="text-accent">*</span>
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
                <label htmlFor="contact-email" className={labelCls}>
                  Email <span className="text-accent">*</span>
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

            <div>
              <label htmlFor="contact-company" className={labelCls}>
                Company
              </label>
              <input
                id="contact-company"
                name="company"
                type="text"
                autoComplete="organization"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                disabled={status === "sending"}
                className={fieldCls}
                placeholder="Brand or company"
              />
            </div>

            <div>
              <span className={labelCls} id="contact-services-label">
                Services
              </span>
              <div
                role="group"
                aria-labelledby="contact-services-label"
                className="mt-2 flex flex-wrap gap-2"
              >
                {SERVICE_OPTIONS.map((service) => {
                  const active = services.includes(service);
                  return (
                    <button
                      key={service}
                      type="button"
                      aria-pressed={active}
                      onClick={() => toggleService(service)}
                      disabled={status === "sending"}
                      className={`border px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.08em] transition-all duration-200 ${
                        active
                          ? "border-accent bg-accent/10 text-accent"
                          : "border-cream/20 text-cream/55 hover:border-cream/40 hover:text-cream"
                      } disabled:opacity-60`}
                    >
                      {service}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label htmlFor="contact-budget" className={labelCls}>
                Budget
              </label>
              <div className="relative">
                <select
                  id="contact-budget"
                  name="budget"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  disabled={status === "sending"}
                  className={`${fieldCls} cursor-pointer appearance-none pr-10`}
                  style={selectColor(budget)}
                >
                  <option value="" className="bg-ink text-cream">
                    Select a range
                  </option>
                  {BUDGET_OPTIONS.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                      className="bg-ink text-cream"
                    >
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

            <div>
              <label htmlFor="contact-message" className={labelCls}>
                Project <span className="text-accent">*</span>
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={3}
                autoComplete="off"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={status === "sending"}
                className={`${fieldCls} resize-y`}
                placeholder="A few lines on what you need…"
              />
            </div>

            {/* Honeypot */}
            <div aria-hidden="true" className="hidden">
              <label htmlFor="contact-website">Website</label>
              <input
                id="contact-website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value=""
                onChange={() => {}}
              />
            </div>

            <div className="flex flex-col items-center gap-3">
              <button
                type="submit"
                disabled={status === "sending"}
                className="group inline-flex items-center gap-3 bg-accent px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] text-ink transition-all duration-300 ease-smooth hover:scale-[1.03] hover:bg-accent/90 disabled:opacity-60 disabled:hover:scale-100"
              >
                {status === "sending" ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-ink border-t-transparent" />
                    Sending…
                  </>
                ) : (
                  <>
                    Send enquiry
                    <PiPaperPlaneTiltBold
                      className="text-[14px] transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5"
                      aria-hidden
                    />
                  </>
                )}
              </button>
              <p
                role="status"
                aria-live="polite"
                className="max-w-md text-center text-[13px] leading-relaxed text-cream/45"
              >
                {status === "error" ? (
                  <span className="text-accent">{errorMsg}</span>
                ) : (
                  <>
                    <span className="block">
                      By sending, you agree to our{" "}
                      <a
                        href="/terms"
                        className="text-cream/70 underline underline-offset-2 transition-colors hover:text-accent"
                      >
                        Terms of Service
                      </a>{" "}
                      &amp;{" "}
                      <a
                        href="/privacy"
                        className="text-cream/70 underline underline-offset-2 transition-colors hover:text-accent"
                      >
                        Privacy Policy
                      </a>
                      .
                    </span>
                    <span className="mt-1 block">
                      Prefer email?{" "}
                      <a
                        href={`mailto:${siteEmail}`}
                        className="text-cream/70 underline underline-offset-2 transition-colors hover:text-accent"
                      >
                        {siteEmail}
                      </a>
                    </span>
                  </>
                )}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.form>
  );
}
