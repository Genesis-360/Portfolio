"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const fieldCls =
  "w-full border-b border-cream/30 bg-transparent py-3 text-lg text-cream outline-none transition-colors duration-300 placeholder:text-cream/40 focus:border-accent";

type Status = "idle" | "sending" | "ok" | "error";

export function ContactForm({ email: siteEmail }: { email: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
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
          // Honeypot — empty for humans; bots fill it.
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
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
      setErrorMsg(`Network error. Email us at ${siteEmail}.`);
    }
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

      <div>
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

      {/* Honeypot field — visually hidden, kept in the DOM so bots see it. */}
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

      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="group inline-flex items-center gap-3 bg-accent px-6 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-ink transition-transform duration-300 ease-smooth hover:scale-[1.03] disabled:opacity-60 disabled:hover:scale-100"
        >
          {status === "sending" ? "Sending…" : "Send enquiry"}
          <span aria-hidden="true">→</span>
        </button>

        <p
          role="status"
          aria-live="polite"
          className={
            status === "ok"
              ? "text-sm text-accent"
              : status === "error"
                ? "text-sm text-accent"
                : "text-sm text-cream/40"
          }
        >
          {status === "ok" && "Sent. We'll reply within one working day."}
          {status === "error" && errorMsg}
          {status === "idle" &&
            `Or write to ${siteEmail} — we read every message.`}
        </p>
      </div>
    </motion.form>
  );
}
