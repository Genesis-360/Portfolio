import type { ReactNode } from "react";

const ICONS: Record<string, ReactNode> = {
  brand: (
    <>
      <path d="M12 3l7 3.5v5c0 4.6-3 7.7-7 9.5-4-1.8-7-4.9-7-9.5v-5L12 3z" />
      <path d="M9.2 12l2 2 3.6-4.2" />
    </>
  ),
  web: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 9.5h18" />
      <path d="M6 7.2h.01M9 7.2h.01" />
    </>
  ),
  social: (
    <>
      <path d="M4 5.5h16v10.5H9.5L4 20V5.5z" />
      <path d="M8 9h8M8 12h5" />
    </>
  ),
  gbp: (
    <>
      <path d="M12 21s-7-5.4-7-11a7 7 0 0114 0c0 5.6-7 11-7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  app: (
    <>
      <rect x="7" y="3" width="10" height="18" rx="2.5" />
      <path d="M11 17.5h2" />
    </>
  ),
  seo: (
    <>
      <path d="M11 4l1.6 4.4L17 10l-4.4 1.6L11 16l-1.6-4.4L5 10l4.4-1.6L11 4z" />
      <path d="M18 14.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7.7-1.8z" />
    </>
  ),
};

const MATCHERS: [string, string][] = [
  ["brand", "brand"],
  ["web", "web"],
  ["social", "social"],
  ["gbp", "gbp"],
  ["app", "app"],
  ["seo", "seo"],
];

/** Icon for a service title, matched by keyword. */
export function ServiceIcon({
  title,
  className = "h-full w-full",
}: {
  title: string;
  className?: string;
}) {
  const t = title.toLowerCase();
  const key = MATCHERS.find(([needle]) => t.includes(needle))?.[1] ?? "seo";
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {ICONS[key]}
    </svg>
  );
}
