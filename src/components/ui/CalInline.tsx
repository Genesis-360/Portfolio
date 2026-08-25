"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

/**
 * Official @calcom/embed-react inline calendar — renders the scheduling UI
 * on the page so visitors book without leaving the site.
 */
export function CalInline({
  calLink,
  className = "h-170 w-full",
}: {
  calLink: string;
  className?: string;
}) {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "discovery-call" });
      cal("ui", {
        hideEventTypeDetails: false,
        layout: "month_view",
        theme: "dark",
      });
    })();
  }, []);

  return (
    <div className={className}>
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
    </div>
  );
}
