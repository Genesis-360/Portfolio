"use client";

import { SideNavProvider } from "@/components/layout/SideNavContext";
import { SideNavPanel } from "@/components/layout/SideNav";

export function SiteShell({
  children,
  socials,
  slotsOpen = 0,
}: {
  children: React.ReactNode;
  socials?: { label: string; href: string }[];
  slotsOpen?: number;
}) {
  return (
    <SideNavProvider>
      <SideNavPanel socials={socials ?? []} slotsOpen={slotsOpen} />
      {children}
    </SideNavProvider>
  );
}
