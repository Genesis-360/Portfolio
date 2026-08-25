"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const fieldCls =
  "w-full border-b border-cream/20 bg-transparent py-3 text-lg text-cream outline-none transition-colors duration-300 placeholder:text-cream/30 focus:border-accent";

export function ContactForm({ email: siteEmail }: { email: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `New project enquiry — ${name || "Hello"}`;
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    window.location.href = `mailto:${siteEmail}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <motion.form
      onSubmit={onSubmit}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-8"
    >
      <div>
        <label
          htmlFor="cf-name"
          className="mb-1 block text-[11px] uppercase tracking-[0.2em] text-cream/40"
        >
          Name
        </label>
        <input
          id="cf-name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Jane Doe"
          className={fieldCls}
          data-cursor="hover"
        />
      </div>

      <div>
        <label
          htmlFor="cf-email"
          className="mb-1 block text-[11px] uppercase tracking-[0.2em] text-cream/40"
        >
          Email
        </label>
        <input
          id="cf-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="jane@studio.com"
          className={fieldCls}
          data-cursor="hover"
        />
      </div>

      <div>
        <label
          htmlFor="cf-message"
          className="mb-1 block text-[11px] uppercase tracking-[0.2em] text-cream/40"
        >
          Project
        </label>
        <textarea
          id="cf-message"
          required
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us what you're building…"
          className={`${fieldCls} resize-none`}
          data-cursor="hover"
        />
      </div>

      <button
        type="submit"
        data-cursor="hover"
        data-cursor-label="Send"
        className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-bold uppercase tracking-[0.12em] text-cream transition-colors duration-300 hover:bg-[#ff4f1a]"
      >
        Send enquiry →
      </button>
    </motion.form>
  );
}
