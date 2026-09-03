import {
  PiPalette,
  PiBrowser,
  PiShareNetwork,
  PiStorefront,
  PiDeviceMobile,
  PiSparkle,
} from "react-icons/pi";

const MATCHERS: [string, typeof PiPalette][] = [
  ["brand", PiPalette],
  ["web", PiBrowser],
  ["social", PiShareNetwork],
  ["gbp", PiStorefront],
  ["app", PiDeviceMobile],
  ["seo", PiSparkle],
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
  const Icon = MATCHERS.find(([needle]) => t.includes(needle))?.[1] ?? PiSparkle;
  return <Icon className={className} aria-hidden />;
}
