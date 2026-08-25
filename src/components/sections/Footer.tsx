"use client";

export function Footer({ socials }: { socials: { label: string; href: string }[] }) {

  return (
    <footer
      id="contact"
      className="container-edge relative scroll-mt-24 overflow-hidden border-t border-cream/10 pt-24 lg:pt-2">
      <div className="flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-cream/40">
          © {new Date().getFullYear()} OREENZA Agency. All rights reserved.
        </p>
        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="text-sm uppercase tracking-[0.12em] text-cream/55 transition-colors hover:text-accent">
              {s.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
