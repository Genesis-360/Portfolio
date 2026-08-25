import type { Metadata } from "next";
import Image from "next/image";
import { Sidebar } from "@/components/layout/Sidebar";
import { MaskText, Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/sections/ContactForm";
import { Footer } from "@/components/sections/Footer";
import { CalInline } from "@/components/ui/CalInline";
import { CAL_EMBED, EMAIL, SOCIALS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact — OREENZA",
  description:
    "Start a project with OREENZA — an independent design & development studio.",
};

function Detail({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-2 text-[11px] uppercase tracking-[0.2em] text-cream/40">
        {label}
      </p>
      <div className="text-cream/80">{children}</div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <div className="lg:flex lg:items-start">
      <Sidebar variant="sub" content="contact" />

      <main className="w-full lg:w-[70%] lg:flex-1">
        {/* Header */}
        <section className="container-edge pb-10 pt-24 lg:pt-32">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-stretch lg:justify-between">
            <div>
              <Reveal className="mb-8 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-cream/45">
                <span className="h-px w-10 bg-accent" />
                Get in touch — slots open
              </Reveal>

              <MaskText
                as="h1"
                className="font-anton text-[clamp(2.8rem,9vw,7rem)] uppercase leading-[0.86] tracking-tight text-cream">
                Let&apos;s talk.
              </MaskText>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/60">
                Whether it&apos;s a brand, a product or a one-off campaign —
                tell us what you&apos;re building and we&apos;ll tell you how
                we&apos;d make it unforgettable.
              </p>
            </div>

            <Reveal className="flex-none">
              <Image
                src="/whatsapp-qr.png"
                alt="WhatsApp QR code — scan to chat with Oreenza"
                width={512}
                height={512}
                className="h-64 w-64 object-contain max-lg:mx-auto lg:h-full lg:w-auto"
              />
            </Reveal>
          </div>
        </section>

        {/* Booking calendar — embedded, no need to leave the site */}
        <section
          id="book"
          className="container-edge scroll-mt-24 border-t border-cream/10 py-16">
          <Reveal className="mb-8 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-cream/45">
            <span className="h-px w-10 bg-accent" />
            Prefer to talk?
          </Reveal>

          <MaskText
            as="h2"
            className="font-anton text-[clamp(2rem,5vw,3.6rem)] uppercase leading-[0.9] tracking-tight text-cream">
            Book a call.
          </MaskText>

          <Reveal className="mt-8">
            <CalInline calLink={CAL_EMBED} />
          </Reveal>
        </section>

        {/* Form + details */}
        <section className="container-edge grid grid-cols-1 gap-12 border-t border-cream/10 pb-20 pt-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <Reveal className="mb-8 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-cream/45">
              <span className="h-px w-10 bg-accent" />
              Prefer to write?
            </Reveal>

            <MaskText
              as="h2"
              className="font-anton text-[clamp(2rem,5vw,3.6rem)] uppercase leading-[0.9] tracking-tight text-cream">
              Send a message.
            </MaskText>

            <div className="mt-10">
              <ContactForm />
            </div>
          </div>

          <div className="space-y-8 lg:col-span-5">
            <Detail label="Email">
              <a
                href={`mailto:${EMAIL}`}
                data-cursor="hover"
                className="text-2xl text-cream/90 underline-offset-4 transition-colors hover:text-accent">
                {EMAIL}
              </a>
            </Detail>

            <Detail label="Quick call">
              <a
                href="#book"
                data-cursor="hover"
                className="group inline-flex w-fit items-center gap-3 bg-accent px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-ink transition-transform duration-300 ease-smooth hover:scale-[1.03]">
                <span className="flex h-8 w-8 flex-none items-center justify-center overflow-hidden rounded-md border border-ink/25 bg-ink text-[9px] font-bold text-cream">
                  You
                </span>
                <span className="flex max-w-0 items-center gap-1.5 overflow-hidden opacity-0 transition-all duration-300 ease-smooth group-hover:max-w-16 group-hover:opacity-100">
                  <span className="text-sm">+</span>
                  <span className="flex h-8 w-8 flex-none items-center justify-center overflow-hidden rounded-md border border-ink/25 bg-ink">
                    <Image
                      src="/mascot-avatar.webp"
                      alt="Oreenza mascot"
                      width={32}
                      height={32}
                      className="h-full w-full object-cover"
                    />
                  </span>
                </span>
                Book a 15-min call
              </a>
            </Detail>

            <Detail label="Socials">
              <ul className="flex flex-col gap-2">
                {SOCIALS.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="hover"
                      className="text-sm uppercase tracking-[0.12em] text-cream/55 transition-colors hover:text-accent">
                      {s.label} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </Detail>

            <Detail label="Agency">
              <p className="text-base">Remote-first · Working worldwide</p>
            </Detail>

            <Detail label="Availability">
              <p className="text-base text-cream/80">Slots open — 2026</p>
            </Detail>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}
