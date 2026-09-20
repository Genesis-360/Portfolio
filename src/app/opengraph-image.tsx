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
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 16,
              fontWeight: 500,
              letterSpacing: 1,
              lineHeight: 1.2,
              textTransform: "uppercase",
            }}
          >
            <span>OREENZA</span>
            <span>AGENCY</span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 14,
              letterSpacing: 2,
              color: "rgba(245,245,245,0.9)",
              textTransform: "uppercase",
              textAlign: "right",
            }}
          >
            <span>AI-POWERED</span>
            <span>DESIGN &amp; DEV</span>
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
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
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
        </div>

        {/* Bottom tagline */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: 60,
          }}
        >
          <div
            style={{
              fontSize: 20,
              fontWeight: 500,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#000000",
            }}
          >
            AI-POWERED DESIGN &amp; DEVELOPMENT AGENCY
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            padding: "32px 48px",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 12,
              fontSize: 14,
              letterSpacing: 3,
              color: "rgba(245,245,245,0.7)",
              textTransform: "uppercase",
            }}
          >
            <span>Brand</span>
            <span>·</span>
            <span>Web</span>
            <span>·</span>
            <span>AI</span>
            <span>·</span>
            <span>SEO</span>
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
