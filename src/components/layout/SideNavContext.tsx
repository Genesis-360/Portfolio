"use client";

import { createContext, useContext, useState } from "react";

interface SideNavCtx {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

const SideNavContext = createContext<SideNavCtx>({
  isOpen: false,
  open: () => {},
  close: () => {},
  toggle: () => {},
});

export function useSideNav() {
  return useContext(SideNavContext);
}

export function SideNavProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <SideNavContext.Provider
      value={{
        isOpen,
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
        toggle: () => setIsOpen((v) => !v),
      }}
    >
      {children}
    </SideNavContext.Provider>
  );
}
