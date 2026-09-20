"use client";

import { useState } from "react";
import {
  FaXTwitter,
  FaLinkedin,
  FaFacebook,
  FaLink,
  FaCheck,
} from "react-icons/fa6";

type ShareButtonsProps = {
  title: string;
  url: string;
};

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const fullUrl = `https://oreenza.com${url}`;

  const shareLinks = [
    {
      name: "X / Twitter",
      icon: <FaXTwitter />,
      color: "#FFFFFF",
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(fullUrl)}`,
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedin />,
      color: "#0A66C2",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`,
    },
    {
      name: "Facebook",
      icon: <FaFacebook />,
      color: "#1877F2",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`,
    },
  ];

  const copyLink = async () => {
    await navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-4">
      {shareLinks.map((link) => (
        <a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          title={link.name}
          className="flex items-center justify-center transition-all duration-200 hover:scale-110"
          style={{ color: link.color }}
        >
          <span className="text-lg">{link.icon}</span>
        </a>
      ))}
      <button
        onClick={copyLink}
        title="Copy link"
        className="flex items-center justify-center transition-all duration-200 hover:scale-110 text-cream/40 hover:text-accent"
      >
        <span className="text-lg">
          {copied ? <FaCheck className="text-green-500" /> : <FaLink />}
        </span>
      </button>
    </div>
  );
}
