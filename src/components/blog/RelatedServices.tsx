import Link from "next/link";
import { PiArrowRightBold } from "react-icons/pi";

export function RelatedServices({ services }: { services: string[] }) {
  if (!services || services.length === 0) return null;

  return (
    <div className="my-8 rounded-sm border border-cream/10 bg-cream/[0.03] p-5">
      <p className="text-[10px] uppercase tracking-[0.3em] text-accent mb-4">
        Related Services
      </p>
      <div className="flex flex-wrap gap-2">
        {services.map((service) => (
          <Link
            key={service}
            href={`/services/${service.toLowerCase().replace(/\s+/g, "-")}`}
            className="group flex items-center gap-2 rounded-full border border-cream/15 px-4 py-2 text-sm text-cream/60 transition-all hover:border-accent hover:text-accent"
          >
            {service}
            <PiArrowRightBold className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
          </Link>
        ))}
      </div>
    </div>
  );
}
