"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect, useRef, useState } from "react";

/**
 * Official @calcom/embed-react inline calendar — renders the scheduling UI
 * on the page so visitors book without leaving the site.
 *
 * The Cal.com embed script + iframe are heavy, so we only mount them once the
 * section scrolls near the viewport. This keeps the embed off the critical
 * render path (the contact page's text/form paint instantly) and avoids paying
 * the third-party cost on routes where the calendar is below the fold.
 */
export function CalInline({
  calLink,
  className = "h-170 w-full",
}: {
  calLink: string;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    (async function () {
      const cal = await getCalApi({ namespace: "discovery-call" });
      cal("ui", {
        hideEventTypeDetails: false,
        layout: "month_view",
        theme: "dark",
      });
    })();
  }, [inView]);

  return (
    <div ref={containerRef} className={className}>
      {inView && (
        <Cal
          namespace="discovery-call"
          calLink={calLink}
          style={{ width: "100%", height: "100%", overflow: "scroll" }}
          config={{
            layout: "month_view",
            useSlotsViewOnSmallScreen: "true",
            theme: "dark",
          }}
        />
      )}
    </div>
  );
}
