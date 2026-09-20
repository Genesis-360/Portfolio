"use client";

import { OpenAI, Anthropic, Google, Grok, Perplexity } from "@lobehub/icons";
import {
  PiRobotBold,
  PiArrowUpRightBold,
} from "react-icons/pi";

type AISummaryProps = {
  title: string;
  url: string;
};

export function AISummary({ title, url }: AISummaryProps) {
  const fullUrl = `https://oreenza.com${url}`;
  const prompt = encodeURIComponent(`Summarize this article for me: ${fullUrl}`);

  const services = [
    {
      name: "ChatGPT",
      icon: <OpenAI size={18} />,
      href: `https://chat.openai.com/?q=${prompt}`,
    },
    {
      name: "Claude AI",
      icon: <Anthropic size={18} />,
      href: `https://claude.ai/new?q=${prompt}`,
    },
    {
      name: "Gemini",
      icon: <Google size={18} />,
      href: `https://gemini.google.com/app?q=${prompt}`,
    },
    {
      name: "Grok",
      icon: <Grok size={18} />,
      href: `https://grok.com/?q=${prompt}`,
    },
    {
      name: "Perplexity",
      icon: <Perplexity size={18} />,
      href: `https://www.perplexity.ai/search?q=${prompt}`,
    },
  ];

  return (
    <div className="rounded-lg border border-cream/10 bg-cream/[0.02] p-5">
      <div className="flex items-center gap-2">
        <PiRobotBold className="h-4 w-4 text-accent" />
        <span className="text-xs font-medium text-cream">AI Summary</span>
      </div>

      <p className="mt-2 text-[10px] text-cream/40">
        Open this article in your preferred AI to get a summary.
      </p>

      <div className="mt-3 space-y-1.5">
        {services.map((service) => (
          <a
            key={service.name}
            href={service.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-md px-3 py-2.5 transition-colors hover:bg-cream/5"
          >
            <span className="flex items-center justify-center">
              {service.icon}
            </span>
            <span className="flex-1 text-xs text-cream/70">
              {service.name}
            </span>
            <PiArrowUpRightBold className="h-3 w-3 text-cream/30" />
          </a>
        ))}
      </div>
    </div>
  );
}
