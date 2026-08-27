"use client";

import { useSmoothScroll } from "@/components/providers/SmoothScroll";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { LogoLoop, type LogoItem } from "@/components/ui/LogoLoop";
import OptionWheel from "@/components/ui/OptionWheel";
import { Text3DFlip } from "@/components/ui/Text3DFlip";
import { ServiceIcon } from "@/components/ui/ServiceIcons";


const BASE =
  "relative z-40 flex w-full flex-col overflow-hidden border-b border-cream/15 bg-ink lg:sticky lg:top-0 lg:h-screen lg:w-[30%] lg:max-w-[560px] lg:border-b-0 lg:border-r";

type SidebarProject = {
  title: string;
  category: string;
  year: string;
  services: string[];
  liveUrl?: string;
  description?: string;
  index?: string;
};

export type SidebarData = {
  serviceTitles: string[];
  clients: { name: string; logo?: string }[];
  email: string;
  socials: { label: string; href: string }[];
};

type SidebarProps = {
  variant?: "home" | "sub";
  content?: "home" | "contact" | "project";
  project?: SidebarProject;
  data: SidebarData;
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
        <Text3DFlip
          as="span"
          textClassName="text-cream"
          flipTextClassName="text-accent"
          staggerDuration={0.04}
          rotateDirection="top"
        >
          Home
        </Text3DFlip>
      </Link>
      <Link href="/contact" data-cursor="hover" className={NAV_LINK}>
        <Text3DFlip
          as="span"
          textClassName="text-cream"
          flipTextClassName="text-accent"
          staggerDuration={0.04}
          rotateDirection="top"
        >
          Contact
        </Text3DFlip>
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

function SideRailMobile() {
  return (
    <div className="flex items-center justify-between px-5 py-4 lg:hidden">
      <p className="font-body text-lg tracking-tight text-cream/60">Oreenza</p>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          <div className="flex items-baseline gap-1.5">
            <p className="font-anton text-lg leading-none text-cream">10</p>
            <p className="text-[9px] uppercase tracking-[0.14em] text-cream/45">
              Slots open
            </p>
          </div>
        </div>
        <div className="flex items-end gap-1">
          <span className="h-5 w-0.5 bg-accent" />
          <span className="h-5 w-0.5 bg-accent" />
          <span className="h-5 w-0.5 bg-cream/25" />
          <span className="h-5 w-0.5 bg-cream/25" />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page content                                                       */
/* ------------------------------------------------------------------ */

function HomeContent({ data }: { isHome: boolean; data: SidebarData }) {
  const clientLogos: LogoItem[] = data.clients.map((client) => ({
    node: (
      <span className="flex items-center gap-2.5 opacity-70 transition-opacity duration-300 hover:opacity-100">
        {client.logo && (
          <Image
            src={client.logo}
            alt=""
            width={20}
            height={20}
            className="h-5 w-auto flex-none"
          />
        )}
        <span className="whitespace-nowrap font-body text-sm font-semibold tracking-wide text-cream/85">
          {client.name}
        </span>
      </span>
    ),
  }));

  return (
    <div className="flex h-full min-h-0 flex-col px-5 pt-8 pb-7 lg:px-7 lg:pt-10 lg:pb-8">
      {/* Hero */}
      <h1 className="max-w-[15ch] font-body text-[clamp(1.9rem,2.6vw,3.4rem)] leading-[0.95] tracking-tight text-cream">
        Performance-first creative agency for ambitious brands.
      </h1>

      <Button
        href="/contact"
        className="mt-8 self-start border-cream/20 bg-accent text-ink hover:bg-cream">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ink opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-ink" />
        </span>
        Book a free call
      </Button>

      {/* Flexible breathing room — absorbs leftover space on tall screens */}
      <div aria-hidden className="min-h-12 flex-1" />

      {/* Trusted brands */}
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

      {/* Services — spinning wheel */}
      <section className="mt-7 border-t border-cream/15 pt-6">
        <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-cream/45">
          <span className="relative flex h-2 w-2">
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          <span className="h-px w-6 bg-cream/15" />
          Services we offer
        </p>
        <div className="mt-3 h-48 sm:h-52 [@media(min-height:900px)]:h-64 [@media(min-height:1050px)]:h-72">
          <OptionWheel
            items={data.serviceTitles.map((title) => ({
              label: title,
              icon: <ServiceIcon title={title} />
            }))}
            defaultSelected={0}
            side="left"
            fontSize={1.4}
            spacing={1.35}
            tilt={7}
            curve={1}
            blur={1.5}
            fade={0.32}
            minOpacity={0.08}
            inset={20}
            textColor="#7a7868"
            activeColor="#fffae5"
            loop
            autoRotate
            autoRotateMs={2200}
          />
        </div>
      </section>
    </div>
  );
}

function ContactContent({ data }: { data: SidebarData }) {
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
        href={`mailto:${data.email}`}
        data-cursor="hover"
        className="mt-6 inline-block w-fit text-3xl text-cream/85 transition-colors hover:text-accent">
        {data.email}
      </a>
      
      <div className="mt-10">
        <Button
          href="/contact#book"
          className="border-accent bg-accent text-ink hover:bg-cream">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ink opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-ink" />
          </span>
          Book a discovery call
        </Button>
      </div>

      <div className="mt-10 border-t border-cream/15 pt-5">
        <p className="mb-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-cream/45">
          <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          <span className="h-px w-6 bg-cream/15" />
          Elsewhere
        </p>
        <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-cream/15 bg-cream/10">
          {data.socials.slice(0, 4).map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noreferrer noopener"
                data-cursor="hover"
                className="flex items-center justify-between bg-ink px-4 py-3 text-xs uppercase tracking-[0.14em] text-cream/70 transition-colors hover:bg-cream/4 hover:text-cream">
                {s.label}
                <span className="text-cream/30 transition-transform group-hover:translate-x-0.5">
                  ↗
                </span>
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
      <p className="mb-6 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.24em] text-cream/40">
        <span className="text-accent">{project?.index ?? "00"}</span>
        <span className="h-px w-8 bg-cream/15" />
        Featured Project
      </p>

      <h2 className="font-anton text-[clamp(2rem,3vw,3.2rem)] uppercase leading-[0.92] tracking-tight text-cream">
        {project?.title ?? "Selected Project"}
        <span className="ml-1 align-super font-body text-[0.42em] font-bold tracking-normal text-cream/50">
          ™
        </span>
      </h2>

      <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.24em] text-cream/45">
        {project?.year ?? "Year"}
        <span className="mx-2.5 text-accent">·</span>
        {project?.category ?? "Industry"}
      </p>

      {project?.description && (
        <p className="mt-6 max-w-[36ch] text-[15px] leading-[1.75] text-cream/60">
          {project.description}
        </p>
      )}

      {(project?.services?.length ?? 0) > 0 && (
        <ul className="mt-7 flex flex-wrap gap-2">
          {project!.services.map((service) => (
            <li
              key={service}
              className="rounded-full border border-cream/15 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-cream/60 transition-colors duration-300 hover:border-accent/60 hover:text-accent">
              {service}
            </li>
          ))}
        </ul>
      )}

      {project?.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="hover"
          data-cursor-label="Live"
          className="mt-6 inline-flex w-fit items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.2em] text-cream/60 transition-colors duration-300 hover:text-accent"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          Visit live site
          <span aria-hidden>↗</span>
        </a>
      )}

      <div className="mt-10">
        <Button
          href="/contact#book"
          className="border-accent bg-accent text-ink hover:bg-cream">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ink opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-ink" />
          </span>
          Book a 15-min call
        </Button>
      </div>
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
  data,
}: SidebarProps) {
  const pageContent =
    content === "contact" ? (
      <ContactContent data={data} />
    ) : content === "project" ? (
      <ProjectContent project={project} />
    ) : (
      <HomeContent isHome={variant === "home"} data={data} />
    );

  return (
    <aside className={BASE}>
      <div className="border-b border-cream/15">
        <NavRow variant={variant} />
      </div>

      <div className="flex min-h-0 flex-1 border-b border-cream/15 lg:grid lg:grid-cols-[56px_1fr]">
        <SideRail />
        <div className="min-h-0 flex-1">{pageContent}</div>
      </div>

      <SideRailMobile />
    </aside>
  );
}

export default Sidebar;
