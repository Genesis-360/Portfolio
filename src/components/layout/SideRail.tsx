"use client";

/**
 * Vertical 64px rail used in the main sidebar AND inside the sidenav panel.
 * Shows: vertical "Oreenza" wordmark (top), slots counter (bottom-mid), equalizer (bottom).
 * Hidden on small viewports — replaced by SideRailMobile in those cases.
 */
export function SideRail({ slotsOpen }: { slotsOpen: number }) {
  return (
    <div className="relative hidden w-16 shrink-0 border-r border-cream/15 lg:block">
      <p className="absolute left-1/2 top-18 -translate-x-1/2 -rotate-90 whitespace-nowrap font-body text-2xl tracking-tight text-cream/60">
        Oreenza
      </p>
      <div className="absolute left-1/2 bottom-[12%] flex -translate-x-1/2 flex-col items-center gap-3 pt-4">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
        </span>
        <div className="text-center">
          <p
            className="font-anton text-2xl leading-none text-cream"
            aria-label={`${slotsOpen} project slots open`}
          >
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

export function SideRailMobile({ slotsOpen }: { slotsOpen: number }) {
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
            <p
              className="font-anton text-lg leading-none text-cream"
              aria-label={`${slotsOpen} project slots open`}
            >
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
