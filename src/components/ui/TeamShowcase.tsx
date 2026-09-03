"use client";

import { useState } from "react";
import Image from "next/image";
import type { TeamMember } from "@/lib/content";
import { PiLinkedinLogo, PiXLogo, PiInstagramLogo, PiGithubLogo, PiBehanceLogo, PiLink, PiDribbbleLogo } from "react-icons/pi";

// ─── Social icons (react-icons) ────────────────────────────────────────────────
const SOCIAL_CONFIG: Record<
  string,
  { icon: React.ReactNode; label: string; color: string }
> = {
  linkedin: { icon: <PiLinkedinLogo />, label: "LinkedIn", color: "#0077B5" },
  twitter: { icon: <PiXLogo />, label: "X / Twitter", color: "#000000" },
  instagram: { icon: <PiInstagramLogo />, label: "Instagram", color: "#E1306C" },
  github: { icon: <PiGithubLogo />, label: "GitHub", color: "#181717" },
  behance: { icon: <PiBehanceLogo />, label: "Behance", color: "#1769FF" },
  dribbble: { icon: <PiDribbbleLogo />, label: "Dribbble", color: "#EA4C89" },
  link: { icon: <PiLink />, label: "Link", color: "#000000" },
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
    <div className="flex w-full max-w-6xl flex-col items-start gap-8 px-4 py-8 mx-auto lg:flex-row lg:gap-10 lg:px-6">
      {/* ── Left: photo grid (3 columns, staggered heights) — desktop only ── */}
      <div className="hidden lg:flex flex-shrink-0 gap-3">
        <div className="flex flex-col gap-3">
          {col1.map((member) => (
            <PhotoCard
              key={member.slug}
              member={member}
              className="w-[155px] h-[165px]"
              hoveredSlug={hoveredSlug}
              onHover={setHoveredSlug}
            />
          ))}
        </div>

        <div className="flex flex-col gap-3 mt-[68px]">
          {col2.map((member) => (
            <PhotoCard
              key={member.slug}
              member={member}
              className="w-[172px] h-[182px]"
              hoveredSlug={hoveredSlug}
              onHover={setHoveredSlug}
            />
          ))}
        </div>

        <div className="flex flex-col gap-3 mt-8">
          {col3.map((member) => (
            <PhotoCard
              key={member.slug}
              member={member}
              className="w-[162px] h-[172px]"
              hoveredSlug={hoveredSlug}
              onHover={setHoveredSlug}
            />
          ))}
        </div>
      </div>

      {/* ── Right: member list ── */}
      <div className="flex w-full flex-1 flex-col gap-4 lg:gap-5">
        {members.map((member) => (
          <MemberRow
            key={member.slug}
            member={member}
            hoveredSlug={hoveredSlug}
            onHover={setHoveredSlug}
            isMobile
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
  isMobile = false,
}: {
  member: TeamMember;
  hoveredSlug: string | null;
  onHover: (slug: string | null) => void;
  isMobile?: boolean;
}) {
  const isActive = hoveredSlug === member.slug;
  const isDimmed = hoveredSlug !== null && !isActive;
  const socials = member.socials ?? [];
  const initials = member.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className={`cursor-pointer transition-opacity duration-300 ${
        isDimmed ? "opacity-50" : "opacity-100"
      }`}
      onMouseEnter={() => onHover(member.slug)}
      onMouseLeave={() => onHover(null)}
    >
      <div className="flex items-center gap-3">
        {/* Mobile: show avatar (photo or initials) to the left of name */}
        {isMobile && (
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md bg-cream/10 lg:hidden">
            {member.photo ? (
              <Image
                src={member.photo}
                alt={member.name}
                width={48}
                height={48}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <span className="font-anton text-sm text-cream/40">
                  {initials}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Desktop: dot indicator */}
        {!isMobile && (
          <span
            className={`h-3 flex-shrink-0 rounded-[5px] transition-all duration-300 ${
              isActive ? "w-5 bg-accent" : "w-4 bg-cream/25"
            }`}
          />
        )}

        <div className="flex flex-col">
          <div className="flex items-center gap-2.5">
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
            <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.2em] text-cream/35">
              {member.role}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
