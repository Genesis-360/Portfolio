"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSideNav } from "./SideNavContext";
import { SideRail } from "./SideRail";
import Text3DFlip from "@/components/ui/Text3DFlip";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Team", href: "/team" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

function isActive(href: string, pathname: string) {
  if (href === "/" || href === "/#work") return pathname === "/";
  return pathname.startsWith(href.split("#")[0]);
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className="relative inline-block h-3 w-[18px] shrink-0">
      <span
        className={`absolute left-0 top-0 block h-[1.5px] w-full origin-left rounded-sm bg-current transition-all duration-300 ease-[cubic-bezier(0.7,0,0.2,1)] ${
          open ? "top-1/2 rotate-45 -translate-y-1/2" : "top-0 rotate-0"
        }`}
      />
      <span
        className={`absolute left-0 top-1/2 block h-[1.5px] w-full -translate-y-1/2 rounded-sm bg-current transition-all duration-300 ease-[cubic-bezier(0.7,0,0.2,1)] ${
          open ? "opacity-0 scale-x-0" : "opacity-100 scale-x-100"
        }`}
      />
      <span
        className={`absolute left-0 block h-[1.5px] w-full rounded-sm bg-current transition-all duration-300 ease-[cubic-bezier(0.7,0,0.2,1)] ${
          open ? "top-1/2 -rotate-45 -translate-y-1/2" : "top-full -translate-y-full"
        }`}
      />
    </span>
  );
}

export function SideNavTrigger() {
  const { isOpen, toggle } = useSideNav();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
      aria-controls="sidenav-panel"
      className="group inline-flex items-center gap-3 bg-transparent py-2 pr-1 text-sm font-bold uppercase tracking-[0.22em] text-cream/80 transition-colors duration-200 hover:text-accent"
      data-cursor="hover"
    >
      <MenuIcon open={isOpen} />
      <span className="leading-none">{isOpen ? "Close" : "Menu"}</span>
    </button>
  );
}

export function SideNavPanel({
  socials = [],
  slotsOpen = 0,
}: {
  socials?: { label: string; href: string }[];
  slotsOpen?: number;
}) {
  const pathname = usePathname();
  const { isOpen, close } = useSideNav();

  useEffect(() => {
    close();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-[2px] transition-opacity duration-300 ${
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={close}
        aria-hidden
      />

      {/* Panel: full-width header + below it: [64px side rail | main content] */}
      <aside
        id="sidenav-panel"
        aria-label="Navigation menu"
        aria-hidden={!isOpen}
        className={`fixed inset-y-0 left-0 z-60 flex w-full flex-col overflow-hidden bg-ink transition-transform duration-400 ease-[cubic-bezier(0.7,0,0.2,1)] lg:w-[30%] lg:max-w-[560px] ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header — mirrors main sidebar: 64px O cell with right border | flex-1 close area */}
        <header className="flex h-14 shrink-0 border-b border-cream/15 lg:h-16">
          <Link
            href="/"
            onClick={close}
            aria-label="OREENZA — homepage"
            className="flex h-full w-16 items-center justify-center border-r border-cream/15 font-anton text-xl text-cream/90 transition-colors duration-200 hover:text-accent"
          >
            O
          </Link>

          <div className="flex h-full flex-1 items-center justify-end px-5 lg:px-6">
            <button
              type="button"
              onClick={close}
              aria-label="Close menu"
              className="group inline-flex items-center gap-3 bg-transparent py-2 pl-1 text-sm font-bold uppercase tracking-[0.22em] text-cream/80 transition-colors duration-200 hover:text-accent"
            >
              <span className="leading-none">Close</span>
              <MenuIcon open={true} />
            </button>
          </div>
        </header>

        {/* Body: [64px side rail | main nav + footer] */}
        <div className="flex flex-1 overflow-hidden">
          {/* Vertical side rail */}
          <SideRail slotsOpen={slotsOpen} />

          {/* Nav + footer column */}
          <div className="flex min-w-0 flex-1 flex-col">
            {/* Nav */}
            <nav
              className="flex-1 overflow-y-auto px-5 py-10 lg:px-6 lg:py-12"
              aria-label="Primary navigation"
            >
              <ol className="flex flex-col gap-5">
                {NAV_ITEMS.map((item, i) => {
                  const active = isActive(item.href, pathname);
                  return (
                    <li
                      key={item.label}
                      style={{ animationDelay: `${0.1 + i * 0.07}s` }}
                      className="sidenav-rise"
                    >
                      <Link
                        href={item.href}
                        onClick={close}
                        className={`sidenav-item-link group flex flex-col items-start leading-none ${
                          active ? "is-active" : ""
                        }`}
                      >
                        <span className="sidenav-label-wrap">
                          <Text3DFlip
                            as="span"
                            rotateDirection="top"
                            textClassName={active ? "text-accent" : "text-cream"}
                            flipTextClassName="text-accent"
                            staggerDuration={0.025}
                            staggerFrom="first"
                            className="inline-flex font-anton text-[clamp(2.4rem,8vw,4.8rem)] font-bold uppercase tracking-[-0.02em] lg:text-[clamp(2.2rem,3.4vw,3.4rem)]"
                          >
                            {item.label}
                          </Text3DFlip>
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ol>
            </nav>

            {/* Footer: socials */}
            {socials.length > 0 && (
              <footer className="shrink-0 border-t border-cream/10 px-5 py-7 lg:px-6">
                <p className="mb-4 font-anton text-[10px] font-bold uppercase tracking-[0.28em] text-cream/30">
                  Elsewhere
                </p>
                <ul className="flex flex-wrap gap-x-5 gap-y-2">
                  {socials.map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-anton text-[11px] font-bold uppercase tracking-[0.16em] text-cream/60 transition-colors duration-200 hover:text-accent"
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </footer>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
