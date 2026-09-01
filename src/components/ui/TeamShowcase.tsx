"use client";

import { useState } from "react";
import Image from "next/image";
import type { TeamMember } from "@/lib/content";

// ─── Social icons (inline SVG, no extra deps) ──────────────────────────────
function IconLinkedIn() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3" aria-hidden>
      <path d="M19 0h-14C2.24 0 0 2.24 0 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5V5c0-2.76-2.24-5-5-5zM8 19H5V8h3v11zM6.5 6.73c-.97 0-1.75-.79-1.75-1.76s.78-1.76 1.75-1.76 1.75.79 1.75 1.76-.78 1.76-1.75 1.76zM20 19h-3v-5.6c0-3.36-4-3.11-4 0V19h-3V8h3v1.77c1.4-2.59 7-2.78 7 2.47V19z" />
    </svg>
  );
}

function IconTwitter() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3" aria-hidden>
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07c-1.28.06-2.15.26-2.91.55-.79.31-1.46.72-2.13 1.39C1.34 2.68.93 3.35.62 4.14.33 4.9.13 5.77.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.28.26 2.15.55 2.91.31.79.72 1.46 1.39 2.13.67.67 1.34 1.08 2.13 1.39.76.29 1.63.49 2.91.55C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.28-.06 2.15-.26 2.91-.55.79-.31 1.46-.72 2.13-1.39.67-.67 1.08-1.34 1.39-2.13.29-.76.49-1.63.55-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.28-.26-2.15-.55-2.91-.31-.79-.72-1.46-1.39-2.13C21.32 1.34 20.65.93 19.86.62c-.76-.29-1.63-.49-2.91-.55C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 100 12.32 6.16 6.16 0 000-12.32zM12 16a4 4 0 110-8 4 4 0 010 8zm6.41-11.85a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z" />
    </svg>
  );
}

function IconGithub() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3" aria-hidden>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function IconBehance() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3" aria-hidden>
      <path d="M7.5 11.25c.965 0 1.815-.29 2.55-.87.75-.585 1.125-1.425 1.125-2.52 0-.99-.345-1.77-1.035-2.34C9.735 5.1 8.88 4.8 7.875 4.8H3.75v12h4.5V11.25zM4.5 9.75h3c.63 0 1.125.165 1.485.495.36.33.54.81.54 1.44 0 .63-.18 1.11-.54 1.44-.36.33-.855.495-1.485.495H4.5V9.75zm8.25 6c-.705 0-1.29-.225-1.755-.675-.465-.45-.705-1.095-.72-1.935h4.755c.03.18.045.375.045.585 0 1.08-.3 1.905-.9 2.475-.585.555-1.425.84-2.52.84v-2.52c.705 0 1.275-.225 1.71-.675.45-.45.675-1.095.675-1.935 0-.84-.225-1.485-.675-1.935-.45-.45-1.02-.675-1.71-.675-.84 0-1.53.315-2.07.945-.525.615-.795 1.425-.81 2.43H5.34c.015-.96.315-1.71.9-2.25C6.81 7.8 7.64 7.5 8.625 7.5c.99 0 1.83.285 2.52.855.69.555 1.035 1.35 1.035 2.385 0 1.05-.345 1.875-1.035 2.475-.69.585-1.575.87-2.655.87v2.52zm0-3.15c.78 0 1.38-.21 1.8-.63.42-.42.63-.99.63-1.71s-.21-1.29-.63-1.71c-.42-.42-1.02-.63-1.8-.63-.78 0-1.38.21-1.8.63-.42.42-.63.99-.63 1.71s.21 1.29.63 1.71c.42.42 1.02.63 1.8.63zM21 6H3v2.25h18V6zm-1.5 4.5c.84 0 1.53.255 2.07.765.555.51.84 1.2.855 2.07H15.36c.045-.375.18-.705.405-.99.24-.3.57-.45.99-.45.375 0 .705.105.99.315.3.21.51.495.63.855h2.31a4.5 4.5 0 01-1.515 2.01c-.615.48-1.365.72-2.25.72-1.185 0-2.13-.345-2.835-1.035-.705-.69-1.065-1.65-1.08-2.88 0-1.245.375-2.22 1.125-2.925C17.4 7.38 18.36 7.05 19.5 7.05v2.55c-.84 0-1.5.225-1.98.675-.465.435-.705 1.02-.72 1.755h3.75v1.47z" />
    </svg>
  );
}

function IconDribbble() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3" aria-hidden>
      <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.814zm-11.62-2.58c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248-1.698-3.018-3.53-5.558-3.8-5.928-2.868 1.35-5.01 3.99-5.676 7.17zM9.6 2.052c.282.38 2.145 2.914 3.822 6 3.645-1.365 5.19-3.44 5.373-3.702-1.81-1.61-4.19-2.586-6.795-2.586-.825 0-1.63.1-2.4.285zm10.335 3.483c-.218.29-1.935 2.493-5.724 4.04.24.49.465.995.67 1.505.09.22.18.432.265.647 3.41-.43 6.8.26 7.14.33-.02-2.42-.88-4.64-2.35-6.52z" />
    </svg>
  );
}

const SOCIAL_CONFIG: Record<
  string,
  { icon: React.ReactNode; label: string; color: string }
> = {
  linkedin: { icon: <IconLinkedIn />, label: "LinkedIn", color: "#0077B5" },
  twitter: { icon: <IconTwitter />, label: "X / Twitter", color: "#000000" },
  instagram: { icon: <IconInstagram />, label: "Instagram", color: "#E1306C" },
  github: { icon: <IconGithub />, label: "GitHub", color: "#181717" },
  behance: { icon: <IconBehance />, label: "Behance", color: "#1769FF" },
  dribbble: { icon: <IconDribbble />, label: "Dribbble", color: "#EA4C89" },
};

function SocialIcon({
  platform,
  url,
}: {
  platform: string;
  url: string;
}) {
  const config = SOCIAL_CONFIG[platform.toLowerCase()];
  if (!config) return null;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      title={config.label}
      className="flex h-6 w-6 items-center justify-center rounded-md text-cream/45 transition-all duration-200 hover:scale-110 hover:bg-cream/10 hover:text-cream"
    >
      {config.icon}
    </a>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
export function TeamShowcase({ members }: { members: TeamMember[] }) {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  const col1 = members.filter((_, i) => i % 3 === 0);
  const col2 = members.filter((_, i) => i % 3 === 1);
  const col3 = members.filter((_, i) => i % 3 === 2);

  return (
    <div className="flex w-full max-w-6xl flex-col items-start gap-8 px-4 py-8 mx-auto md:flex-row md:gap-10 lg:gap-14 md:px-6">
      {/* ── Left: photo grid (3 columns, staggered heights) ── */}
      <div className="flex flex-shrink-0 gap-2 overflow-x-auto pb-1 md:gap-3 md:pb-0">
        <div className="flex flex-col gap-2 md:gap-3">
          {col1.map((member) => (
            <PhotoCard
              key={member.slug}
              member={member}
              className="w-[110px] h-[120px] sm:w-[130px] sm:h-[140px] md:w-[155px] md:h-[165px]"
              hoveredSlug={hoveredSlug}
              onHover={setHoveredSlug}
            />
          ))}
        </div>

        <div className="flex flex-col gap-2 mt-12 md:gap-3 sm:mt-14 md:mt-[68px]">
          {col2.map((member) => (
            <PhotoCard
              key={member.slug}
              member={member}
              className="w-[122px] h-[132px] sm:w-[145px] sm:h-[155px] md:w-[172px] md:h-[182px]"
              hoveredSlug={hoveredSlug}
              onHover={setHoveredSlug}
            />
          ))}
        </div>

        <div className="flex flex-col gap-2 mt-6 md:gap-3 sm:mt-7 md:mt-8">
          {col3.map((member) => (
            <PhotoCard
              key={member.slug}
              member={member}
              className="w-[115px] h-[125px] sm:w-[136px] sm:h-[146px] md:w-[162px] md:h-[172px]"
              hoveredSlug={hoveredSlug}
              onHover={setHoveredSlug}
            />
          ))}
        </div>
      </div>

      {/* ── Right: member list ── */}
      <div className="flex w-full flex-1 flex-col gap-4 pt-0 md:gap-5 md:pt-2 sm:grid sm:grid-cols-2 md:flex md:flex-col">
        {members.map((member) => (
          <MemberRow
            key={member.slug}
            member={member}
            hoveredSlug={hoveredSlug}
            onHover={setHoveredSlug}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Photo card ──────────────────────────────────────────────────────────── */
function PhotoCard({
  member,
  className = "",
  hoveredSlug,
  onHover,
}: {
  member: TeamMember;
  size?: "sm" | "md" | "lg";
  className?: string;
  hoveredSlug: string | null;
  onHover: (slug: string | null) => void;
}) {
  const isActive = hoveredSlug === member.slug;
  const isDimmed = hoveredSlug !== null && !isActive;

  return (
    <div
      className={`flex-shrink-0 cursor-pointer overflow-hidden rounded-xl transition-opacity duration-400 ${className} ${
        isDimmed ? "opacity-60" : "opacity-100"
      }`}
      onMouseEnter={() => onHover(member.slug)}
      onMouseLeave={() => onHover(null)}
    >
      {member.photo ? (
        <Image
          src={member.photo}
          alt={member.name}
          width={400}
          height={400}
          className="h-full w-full object-cover transition-[filter] duration-500"
          style={{
            filter: isActive ? "grayscale(0) brightness(1)" : "grayscale(1) brightness(0.77)",
          }}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-cream/5">
          <span className="font-anton text-4xl text-cream/20">
            {member.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()}
          </span>
        </div>
      )}
    </div>
  );
}

/* ── Member row ─────────────────────────────────────────────────────────── */
function MemberRow({
  member,
  hoveredSlug,
  onHover,
}: {
  member: TeamMember;
  hoveredSlug: string | null;
  onHover: (slug: string | null) => void;
}) {
  const isActive = hoveredSlug === member.slug;
  const isDimmed = hoveredSlug !== null && !isActive;
  const socials = member.socials ?? [];

  return (
    <div
      className={`cursor-pointer transition-opacity duration-300 ${
        isDimmed ? "opacity-50" : "opacity-100"
      }`}
      onMouseEnter={() => onHover(member.slug)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Name + dot */}
      <div className="flex items-center gap-2.5">
        <span
          className={`h-3 flex-shrink-0 rounded-[5px] transition-all duration-300 ${
            isActive ? "w-5 bg-accent" : "w-4 bg-cream/25"
          }`}
        />
        <span
          className={`text-base font-semibold leading-none tracking-tight transition-colors duration-300 md:text-[18px] ${
            isActive ? "text-accent" : "text-cream/80"
          }`}
        >
          {member.name}
        </span>

        {/* Social icons — slide in on hover */}
        {socials.length > 0 && (
          <div
            className={`ml-1 flex items-center gap-0.5 transition-all duration-200 ${
              isActive
                ? "translate-x-0 opacity-100"
                : "-translate-x-2 pointer-events-none opacity-0"
            }`}
          >
            {socials.map((s) => (
              <SocialIcon key={s.platform} platform={s.platform} url={s.url} />
            ))}
          </div>
        )}
      </div>

      {/* Role */}
      {member.role && (
        <p className="mt-1.5 pl-[27px] text-[7px] font-medium uppercase tracking-[0.2em] text-cream/35 md:text-[10px]">
          {member.role}
        </p>
      )}
    </div>
  );
}
