import { PiLightbulbBold } from "react-icons/pi";

export function OreenzaInsight({ insight }: { insight: string }) {
  if (!insight) return null;

  return (
    <div className="my-8 rounded-sm border border-accent/20 bg-accent/5 p-5">
      <div className="flex items-center gap-2 mb-3">
        <PiLightbulbBold className="h-4 w-4 text-accent" />
        <p className="text-[10px] uppercase tracking-[0.3em] text-accent">
          OREENZA Insight
        </p>
      </div>
      <p className="text-sm leading-relaxed text-cream/80 italic">
        {insight}
      </p>
    </div>
  );
}
