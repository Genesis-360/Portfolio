"use client";

import React from "react";
import {
  PiInstagramLogo,
  PiDribbbleLogo,
  PiLinkedinLogo,
  PiXLogo,
  PiBehanceLogo,
  PiYoutubeLogo,
  PiGithubLogo,
  PiFacebookLogo,
} from "react-icons/pi";

const SOCIALS = [
  { label: "Instagram", icon: PiInstagramLogo, href: "https://instagram.com/oreenza_agency" },
  { label: "Dribbble", icon: PiDribbbleLogo, href: "https://dribbble.com/oreenza" },
  { label: "LinkedIn", icon: PiLinkedinLogo, href: "https://www.linkedin.com/company/oreenza/" },
  { label: "X / Twitter", icon: PiXLogo, href: "https://x.com/oreenza" },
  { label: "Behance", icon: PiBehanceLogo, href: "https://www.behance.net/oreenza_agency" },
  { label: "YouTube", icon: PiYoutubeLogo, href: "https://www.youtube.com/@oreenza" },
  { label: "GitHub", icon: PiGithubLogo, href: "https://github.com/Oreenza" },
  { label: "Facebook", icon: PiFacebookLogo, href: "https://www.facebook.com/Oreenza/" },
];

type SocialCloudProps = {
  className?: string;
};

export function SocialCloud({ className = "" }: SocialCloudProps) {
  return (
    <div className={`flex flex-wrap ${className}`}>
      {SOCIALS.map((social) => {
        const Icon = social.icon;
        return (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            title={social.label}
            className="flex h-9 w-9 items-center justify-center rounded-full transition-transform hover:scale-110"
          >
            <Icon className="h-4 w-4" />
          </a>
        );
      })}
    </div>
  );
}
