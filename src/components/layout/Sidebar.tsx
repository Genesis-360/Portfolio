"use client";

import { useSmoothScroll } from "@/components/providers/SmoothScroll";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
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
  industries: { name: string }[];
  email: string;
  phone: string;
  slotsOpen: number;
  socials: { label: string; href: string }[];
};

type SidebarProps = {
  variant?: "home" | "sub";
  content?: "home" | "contact" | "project" | "services" | "blog" | "team";
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

  const NAV_ITEMS = [
    { label: "Home", href: "/" },
    { label: "Work", href: "/", scrollTarget: "#work" },
    { label: "Services", href: "/services" },
    { label: "Team", href: "/team" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <div className="grid min-h-14 grid-cols-[56px_1fr_1fr_1fr_1fr_1fr] border-cream/15 lg:min-h-16">
      <Link
        href="/"
        aria-label="OREENZA — go to homepage"
        data-cursor="hover"
        className="flex items-center justify-center border-r border-cream/15 bg-ink font-anton text-lg text-cream/90">
        O
      </Link>
      {NAV_ITEMS.map((item, i) => (
        <Link
          key={item.label}
          href={item.href}
          onClick={
            isHome && item.scrollTarget
              ? (e) => { e.preventDefault(); scrollTo(item.scrollTarget, { offset: -20 }); }
              : undefined
          }
          data-cursor="hover"
          className={`${NAV_LINK} ${i < NAV_ITEMS.length - 1 ? "border-r" : ""}`}>
          <Text3DFlip
            as="span"
            textClassName="text-cream"
            flipTextClassName="text-accent"
            staggerDuration={0.04}
            rotateDirection="top"
          >
            {item.label}
          </Text3DFlip>
        </Link>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Vertical rail (Oreenza wordmark + slots open + equalizer)          */
/* ------------------------------------------------------------------ */

function SideRail({ slotsOpen }: { slotsOpen: number }) {
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
          <p className="font-anton text-2xl leading-none text-cream" aria-label={`${slotsOpen} project slots open`}>
            {slotsOpen}
          </p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-cream/55">
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

function SideRailMobile({ slotsOpen }: { slotsOpen: number }) {
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
            <p className="font-anton text-lg leading-none text-cream" aria-label={`${slotsOpen} project slots open`}>
              {slotsOpen}
            </p>
            <p className="text-[9px] uppercase tracking-[0.14em] text-cream/55">
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
  return (
    <div className="flex h-full min-h-0 flex-col px-5 pt-8 pb-7 lg:px-7 lg:pt-10 lg:pb-8">
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

      <div aria-hidden className="min-h-12 flex-1" />

      {/* Industries served — generic verticals, not a fake client list. */}
      <section className="border-t border-cream/15 pt-6">
        <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-cream/55">
          <span className="relative flex h-2 w-2">
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          <span className="h-px w-6 bg-cream/15" />
          Industries we serve
        </p>
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Industries we serve">
          {data.industries.map((i) => (
            <li
              key={i.name}
              className="rounded-full border border-cream/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-cream/65"
            >
              {i.name}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-7 border-t border-cream/15 pt-6">
        <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-cream/55">
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
              icon: <ServiceIcon title={title} />,
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
      <p className="mb-5 flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-cream/55">
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

      {data.phone ? (
        <a
          href={`tel:${data.phone.replace(/[^\d+]/g, "")}`}
          data-cursor="hover"
          className="mt-3 inline-block w-fit text-base text-cream/65 transition-colors hover:text-accent"
        >
          {data.phone}
        </a>
      ) : null}

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
        <p className="mb-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-cream/55">
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
      <p className="mb-6 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.24em] text-cream/55">
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

      <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.24em] text-cream/55">
        {project?.year ?? "Year"}
        <span className="mx-2.5 text-accent">·</span>
        {project?.category ?? "Industry"}
      </p>

      {project?.description && (
        <p className="mt-6 max-w-[36ch] text-[15px] leading-[1.75] text-cream/65">
          {project.description}
        </p>
      )}

      {(project?.services?.length ?? 0) > 0 && (
        <ul className="mt-7 flex flex-wrap gap-2">
          {project!.services.map((service) => (
            <li
              key={service}
              className="rounded-full border border-cream/15 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-cream/65 transition-colors duration-300 hover:border-accent/60 hover:text-accent">
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
          className="mt-6 inline-flex w-fit items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.2em] text-cream/65 transition-colors duration-300 hover:text-accent"
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

function ServicesContent({ data }: { data: SidebarData }) {
  return (
    <div className="flex h-full min-h-0 flex-col justify-center px-5 py-10 lg:px-6">
      <p className="mb-5 flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-cream/55">
        <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
        <span className="h-px w-6 bg-cream/15" />
        What we do
      </p>
      <h2 className="font-anton text-[clamp(2rem,3vw,3.2rem)] uppercase leading-[0.9] tracking-tight text-cream">
        Performance-first services.
      </h2>
      <p className="mt-4 text-[15px] leading-relaxed text-cream/65">
        Brand, web, and growth — built to load fast, rank well, and convert.
      </p>

      <ul className="mt-7 space-y-1.5">
        {data.serviceTitles.slice(0, 6).map((s, i) => (
          <li key={s}>
            <Link
              href={`/services#${slugify(s)}`}
              data-cursor="hover"
              className="group flex items-center justify-between border-b border-cream/10 py-2.5 text-[12px] font-bold uppercase tracking-[0.18em] text-cream/65 transition-colors hover:text-accent">
              <span className="flex items-center gap-3">
                <span className="text-accent/70 font-anton">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {s}
              </span>
              <span className="text-cream/30 transition-transform group-hover:translate-x-0.5 group-hover:text-accent" aria-hidden>
                ↗
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <Button
          href="/contact#book"
          className="border-accent bg-accent text-ink hover:bg-cream">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ink opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-ink" />
          </span>
          Book a call
        </Button>
      </div>
    </div>
  );
}

function TeamContent({ data }: { data: SidebarData }) {
  return (
    <div className="flex h-full min-h-0 flex-col justify-center px-5 py-10 lg:px-6">
      <p className="mb-5 flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-cream/55">
        <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
        <span className="h-px w-6 bg-cream/15" />
        Built by humans
      </p>
      <h2 className="font-anton text-[clamp(2rem,3vw,3.2rem)] uppercase leading-[0.9] tracking-tight text-cream">
        Small team. Big craft.
      </h2>
      <p className="mt-4 text-[15px] leading-relaxed text-cream/65">
        A small group of designers, engineers and writers who&apos;ve shipped
        for brands from cafés to SaaS.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-cream/15 bg-cream/10">
        <a
          href="mailto:hello@oreenza.com"
          data-cursor="hover"
          className="bg-ink p-4 text-xs uppercase tracking-[0.14em] text-cream/70 transition-colors hover:text-accent">
          <p className="text-[9px] text-cream/40">Email</p>
          <p className="mt-1 normal-case tracking-normal">{data.email}</p>
        </a>
        <a
          href={`tel:${data.phone.replace(/[^\d+]/g, "")}`}
          data-cursor="hover"
          className="bg-ink p-4 text-xs uppercase tracking-[0.14em] text-cream/70 transition-colors hover:text-accent">
          <p className="text-[9px] text-cream/40">Phone</p>
          <p className="mt-1 normal-case tracking-normal">{data.phone}</p>
        </a>
      </div>

      <div className="mt-7">
        <Button
          href="/contact#book"
          className="border-accent bg-accent text-ink hover:bg-cream">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ink opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-ink" />
          </span>
          Book a call
        </Button>
      </div>
    </div>
  );
}

function BlogContent() {
  return (
    <div className="flex h-full min-h-0 flex-col justify-center px-5 py-10 lg:px-6">
      <p className="mb-5 flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-cream/55">
        <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
        <span className="h-px w-6 bg-cream/15" />
        Field notes
      </p>
      <h2 className="font-anton text-[clamp(2rem,3vw,3.2rem)] uppercase leading-[0.9] tracking-tight text-cream">
        Insights.
      </h2>
      <p className="mt-4 text-[15px] leading-relaxed text-cream/65">
        Practical thinking on design, performance, and SEO — straight from
        the people doing the work.
      </p>

      <div className="mt-7">
        <Button
          href="/blog#latest"
          className="border-accent bg-accent text-ink hover:bg-cream">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ink opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-ink" />
          </span>
          Read the latest
        </Button>
      </div>
    </div>
  );
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function Sidebar({
  variant = "home",
  content = "home",
  project,
  data,
}: SidebarProps) {
  const pageContent = (() => {
    switch (content) {
      case "contact":
        return <ContactContent data={data} />;
      case "project":
        return <ProjectContent project={project} />;
      case "services":
        return <ServicesContent data={data} />;
      case "team":
        return <TeamContent data={data} />;
      case "blog":
        return <BlogContent />;
      default:
        return <HomeContent isHome={variant === "home"} data={data} />;
    }
  })();

  return (
    <aside className={BASE}>
      <div className="border-b border-cream/15">
        <NavRow variant={variant} />
      </div>

      <div className="flex min-h-0 flex-1 border-b border-cream/15 lg:grid lg:grid-cols-[56px_1fr]">
        <SideRail slotsOpen={data.slotsOpen} />
        <div className="min-h-0 flex-1">{pageContent}</div>
      </div>

      <SideRailMobile slotsOpen={data.slotsOpen} />
    </aside>
  );
}

export default Sidebar;
