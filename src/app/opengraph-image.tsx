import { ImageResponse } from "next/og";

export const alt = "OREENZA — AI-Powered Design & Development Agency";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#F58327",
          color: "#F5F5F5",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
          overflow: "hidden",
          border: "4px solid rgba(245,245,245,0.7)",
        }}
      >
        {/* Top bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            padding: "32px 48px",
            position: "relative",
            zIndex: 2,
          }}
        >
          <div
            style={{
              fontSize: 16,
              fontWeight: 500,
              letterSpacing: 1,
              lineHeight: 1.2,
              textTransform: "uppercase",
            }}
          >
            OREENZA
            <br />
            AGENCY
          </div>
          <div
            style={{
              fontSize: 14,
              letterSpacing: 2,
              color: "rgba(245,245,245,0.9)",
              textTransform: "uppercase",
            }}
          >
            AI-POWERED
            <br />
            DESIGN &amp; DEV
          </div>
        </div>

        {/* Center — Big OREENZA text */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            position: "relative",
          }}
        >
          <div
            style={{
              fontSize: 160,
              fontWeight: 900,
              letterSpacing: -6,
              lineHeight: 0.85,
              textTransform: "uppercase",
              textAlign: "center",
            }}
          >
            OREENZA
          </div>
          <div
            style={{
              fontSize: 72,
              fontWeight: 400,
              fontStyle: "italic",
              marginTop: -20,
              color: "#000000",
            }}
          >
            Agency
          </div>
        </div>

        {/* Side labels */}
        <div
          style={{
            position: "absolute",
            left: 20,
            top: "50%",
            transform: "translateY(-50%) rotate(-90deg)",
            fontSize: 14,
            letterSpacing: 3,
            color: "rgba(245,245,245,0.8)",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}
        >
          OREENZA
        </div>
        <div
          style={{
            position: "absolute",
            right: 20,
            top: "50%",
            transform: "translateY(-50%) rotate(90deg)",
            fontSize: 14,
            letterSpacing: 3,
            color: "rgba(245,245,245,0.8)",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}
        >
          DESIGNING WEBSITES
        </div>

        {/* Bottom tagline */}
        <div
          style={{
            position: "absolute",
            bottom: 80,
            left: 0,
            right: 0,
            textAlign: "center",
            fontSize: 20,
            fontWeight: 500,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#000000",
          }}
        >
          AI-POWERED DESIGN &amp; DEVELOPMENT AGENCY
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            padding: "32px 48px",
            position: "relative",
            zIndex: 2,
          }}
        >
          <div
            style={{
              fontSize: 14,
              letterSpacing: 3,
              color: "rgba(245,245,245,0.7)",
              textTransform: "uppercase",
            }}
          >
            Brand · Web · AI · SEO
          </div>
          <div
            style={{
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: 1,
            }}
          >
            oreenza.com
          </div>
        </div>
      </div>
    ),
    size,
  );
}
