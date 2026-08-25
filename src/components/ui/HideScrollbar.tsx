"use client";

import { useEffect } from "react";

/** Hides the window scrollbar while mounted; scrolling still works. */
export function HideScrollbar() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("hide-scrollbar");
    return () => root.classList.remove("hide-scrollbar");
  }, []);

  return null;
}
