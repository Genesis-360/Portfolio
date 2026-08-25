"use client";

import { useSmoothScroll } from "@/components/providers/SmoothScroll";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { LogoLoop, type LogoItem } from "@/components/ui/LogoLoop";
import OptionWheel from "@/components/ui/OptionWheel";
import { CLIENTS, EMAIL, SERVICES, SOCIALS } from "@/lib/data";

const BASE =
  "sticky top-0 z-40 flex w-full flex-col overflow-hidden border-b border-cream/15 bg-ink lg:h-screen lg:w-[30%] lg:max-w-[560px] lg:border-b-0 lg:border-r";

type SidebarProject = {
  title: string;
  category: string;
  year: string;
  services: string[];
};

type SidebarProps = {
  variant?: "home" | "sub";
  content?: "home" | "contact" | "project";
  project?: SidebarProject;
};

/* ------------------------------------------------------------------ */
/* Nav bars (top + bottom spine caps)                                 */
/* ------------------------------------------------------------------ */

const NAV_LINK =
  "flex items-center justify-center border-cream/15 text-xs font-bold uppercase tracking-[0.16em] text-cream transition-colors hover:text-accent";

function NavRow({ variant }: { variant: "home" | "sub" }) {
  const { scrollTo } = useSmoothScroll();
  const isHome = variant === "home";
  return (
    <div className="grid min-h-14 grid-cols-[48px_1fr_1fr] border-cream/15 lg:min-h-16 lg:grid-cols-[56px_1fr_1fr]">
      <Link
        href="/"
        data-cursor="hover"
        className="flex items-center justify-center border-r border-cream/15 bg-ink font-anton text-lg text-cream/90">
        O
      </Link>
      <Link
        href="/"
        onClick={isHome ? (e) => { e.preventDefault(); scrollTo("#work", { offset: -20 }); } : undefined}
        data-cursor="hover"
        className={`${NAV_LINK} border-r`}>
        Home
      </Link>
      <Link href="/contact" data-cursor="hover" className={NAV_LINK}>
        Contact
      </Link>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Vertical rail (Oreenza wordmark + slots open + equalizer)          */
/* ------------------------------------------------------------------ */

function SideRail() {
  return (
    <div className="relative hidden border-r border-cream/15 lg:block">
      <p className="absolute left-1/2 top-18 -translate-x-1/2 -rotate-90 whitespace-nowrap font-body text-2xl tracking-tight text-cream/60">
        Oreenza
      </p>
      <div className="absolute left-1/2 bottom-[12%] flex -translate-x-1/2 flex-col items-center gap-3 pt-4">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
        </span>
        <div className="text-center">
          <p className="font-anton text-2xl leading-none text-cream">10</p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-cream/45">
            Slots open
          </p>
        </div>
      </div>
      <div className="absolute left-1/2 bottom-[5%] flex -translate-x-1/2 items-end gap-1">
        <span className="h-7 w-0.5 bg-accent" />
        <span className="h-7 w-0.5 bg-accent" />
        <span className="h-7 w-0.5 bg-cream/25" />
        <span className="h-7 w-0.5 bg-cream/25" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page content                                                       */
/* ------------------------------------------------------------------ */

function HomeContent({ isHome }: { isHome: boolean }) {
  const { scrollTo } = useSmoothScroll();
  const clientLogos: LogoItem[] = CLIENTS.map((client) => ({
    node: (
      <span className="font-medium uppercase tracking-[0.12em] text-cream/65">
        {client.name}
      </span>
    ),
  }));

  return (
    <div className="flex h-full min-h-0 flex-col px-5 pt-8 pb-7 lg:px-7 lg:pt-10 lg:pb-8">
      {/* Hero */}
      <h2 className="max-w-[15ch] font-body text-[clamp(1.9rem,2.6vw,3.4rem)] leading-[0.95] tracking-tight text-cream">
        Performance-first creative agency for ambitious brands.
      </h2>

      <Button
        href={isHome ? "#work" : "/#work"}
        onClick={
          isHome ?
            (e) => {
              e.preventDefault();
              scrollTo("#work", { offset: -20 });
            }
          : undefined
        }
        className="mt-8 self-start border-cream/20 bg-accent text-ink hover:bg-cream">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ink opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-ink" />
        </span>
        Book a call
      </Button>

      {/* Flexible breathing room — absorbs leftover space on tall screens */}
      <div aria-hidden className="min-h-12 flex-1" />

      {/* Trusted by */}
      <section className="border-t border-cream/15 pt-6">
        <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-cream/45">
          <span className="relative flex h-2 w-2">
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          <span className="h-px w-6 bg-cream/15" />
          Trusted by
        </p>
        <p className="mt-2.5 text-xs leading-relaxed text-cream/55">
          50+ brands across SAAS, hospitality &amp; B2B.
        </p>
        <div className="relative mt-6 overflow-hidden">
          <LogoLoop
            logos={clientLogos}
            speed={22}
            direction="left"
            logoHeight={17}
            gap={48}
            pauseOnHover
            scaleOnHover
            fadeOut
            fadeOutColor="#000000"
            ariaLabel="Trusted clients"
          />
        </div>
      </section>

      {/* What we do — spinning wheel */}
      <section className="mt-7 border-t border-cream/15 pt-6">
        <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-cream/45">
          <span className="relative flex h-2 w-2">
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          <span className="h-px w-6 bg-cream/15" />
          What we do
        </p>
        <div className="mt-3 h-48 sm:h-52 [@media(min-height:900px)]:h-64 [@media(min-height:1050px)]:h-72">
          <OptionWheel
            items={SERVICES.map((s) => s.title)}
            defaultSelected={0}
            side="left"
            fontSize={1.55}
            spacing={1.3}
            tilt={7}
            curve={1}
            blur={1.5}
            fade={0.32}
            minOpacity={0.08}
            inset={24}
            textColor="#7a7868"
            activeColor="#fffae5"
            soundUrl="/sounds/click-soft.wav"
            soundVolume={0.5}
          />
        </div>
      </section>
    </div>
  );
}

function ContactContent() {
  const { scrollTo } = useSmoothScroll();
  return (
    <div className="flex h-full min-h-0 flex-col justify-center px-5 py-10 lg:px-6">
      <p className="mb-5 flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-cream/45">
      <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
        <span className="h-px w-6 bg-cream/15" />
        Get in touch
      </p>
      <h2 className="font-anton text-[clamp(2rem,3vw,3.4rem)] uppercase leading-[0.9] tracking-tight text-cream">
        Let&apos;s build together.
      </h2>

      <a
        href={`mailto:${EMAIL}`}
        data-cursor="hover"
        className="mt-6 inline-block w-fit text-3xl text-cream/85 transition-colors hover:text-accent">
        {EMAIL}
      </a>

      <a
        href="#book"
        onClick={(e) => {
          e.preventDefault();
          scrollTo("#book", { offset: -20 });
        }}
        data-cursor="hover"
        className="mt-7 inline-flex w-fit items-center gap-2 border border-accent bg-accent px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-ink transition-colors duration-300 hover:bg-cream">
        Book a discovery call ↓
      </a>

      <div className="mt-10 border-t border-cream/15 pt-5">
        <p className="mb-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-cream/45">
        <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          <span className="h-px w-6 bg-cream/15" />
          Elsewhere
        </p>
        <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-cream/15 bg-cream/10">
          {SOCIALS.slice(0, 4).map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noreferrer noopener"
                data-cursor="hover"
                className="flex items-center justify-between bg-ink px-4 py-3 text-xs uppercase tracking-[0.14em] text-cream/70 transition-colors hover:bg-cream/[0.04] hover:text-cream">
                {s.label}
                <span className="text-cream/30 transition-transform group-hover:translate-x-0.5">↗</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ProjectContent({ project }: { project?: SidebarProject }) {
  return (
    <div className="flex h-full min-h-0 flex-col justify-center px-5 py-10 lg:px-6">
      <p className="mb-5 flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-cream/45">
        <span className="text-accent">00</span>
        <span className="h-px w-6 bg-cream/15" />
        Selected project
      </p>
      <h2 className="font-anton text-[clamp(2rem,3vw,3.2rem)] uppercase leading-[0.9] tracking-tight text-cream">
        {project?.title ?? "Selected Project"}
      </h2>

      <p className="mt-4 flex items-center gap-3 text-xs uppercase tracking-[0.14em] text-cream/55">
        {project?.category ?? "Category"}
        <span className="h-1 w-1 rounded-full bg-cream/30" />
        {project?.year ?? "Year"}
      </p>

      <div className="mt-8 border-t border-cream/15 pt-5">
        <p className="mb-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-cream/45">
          <span className="text-accent">01</span>
          <span className="h-px w-6 bg-cream/15" />
          Scope
        </p>
        <ul className="flex flex-col gap-2">
          {(project?.services ?? []).slice(0, 4).map((service, i) => (
            <li
              key={service}
              className="flex items-center gap-3 text-xs uppercase tracking-[0.14em] text-cream/70">
              <span className="font-anton text-sm text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              {service}
            </li>
          ))}
        </ul>
      </div>

      <Link
        href="/#work"
        data-cursor="hover"
        className="mt-8 inline-flex w-fit items-center gap-2 text-xs uppercase tracking-[0.16em] text-cream/60 transition-colors hover:text-accent">
        ← All work
      </Link>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Shell — spine: top nav, content, bottom nav                        */
/* ------------------------------------------------------------------ */

export function Sidebar({
  variant = "home",
  content = "home",
  project,
}: SidebarProps) {
  const pageContent =
    content === "contact" ? (
      <ContactContent />
    ) : content === "project" ? (
      <ProjectContent project={project} />
    ) : (
      <HomeContent isHome={variant === "home"} />
    );

  return (
    <aside className={BASE}>
      <div className="border-b border-cream/15">
        <NavRow variant={variant} />
      </div>

      <div className="flex min-h-0 flex-1 border-b border-cream/15 lg:grid lg:grid-cols-[56px_1fr]">
        <SideRail />
        <main className="min-h-0 flex-1">{pageContent}</main>
      </div>
    </aside>
  );
}

export default Sidebar;
