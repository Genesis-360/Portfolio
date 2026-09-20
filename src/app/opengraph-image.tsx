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
          background: "#000000",
          color: "#F5F5F5",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "64px 72px",
            height: "100%",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Top — Eyebrow + Brand */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <div
                style={{
                  fontSize: 13,
                  letterSpacing: 5,
                  color: "#F58327",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                AI-Powered Agency
              </div>
              <div
                style={{
                  fontSize: 48,
                  fontWeight: 900,
                  letterSpacing: -2,
                  lineHeight: 1,
                  color: "#F5F5F5",
                  textTransform: "uppercase",
                }}
              >
                OREENZA
              </div>
            </div>

            {/* Slots indicator */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#F58327",
                }}
              />
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 800,
                  color: "#F5F5F5",
                  lineHeight: 1,
                }}
              >
                4
              </div>
              <div
                style={{
                  fontSize: 9,
                  letterSpacing: 2,
                  color: "rgba(245,245,245,0.5)",
                  textTransform: "uppercase",
                }}
              >
                Slots
              </div>
            </div>
          </div>

          {/* Center — Main headline */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 24,
              marginTop: -20,
            }}
          >
            <div
              style={{
                fontSize: 64,
                fontWeight: 900,
                letterSpacing: -3,
                lineHeight: 1.05,
                color: "#F5F5F5",
                textTransform: "uppercase",
                maxWidth: 900,
              }}
            >
              Design &amp; Development
            </div>
            <div
              style={{
                display: "flex",
                gap: 24,
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 2,
                  background: "#F58327",
                }}
              />
              <div
                style={{
                  fontSize: 18,
                  color: "rgba(245,245,245,0.6)",
                  letterSpacing: 1,
                }}
              >
                For B2B, D2C &amp; Tech Brands
              </div>
            </div>
          </div>

          {/* Bottom — Services + URL */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            {/* Services */}
            <div
              style={{
                display: "flex",
                gap: 20,
                fontSize: 13,
                letterSpacing: 3,
                color: "rgba(245,245,245,0.45)",
                textTransform: "uppercase",
              }}
            >
              <span>Brand</span>
              <span style={{ color: "#F58327" }}>·</span>
              <span>Web</span>
              <span style={{ color: "#F58327" }}>·</span>
              <span>AI</span>
              <span style={{ color: "#F58327" }}>·</span>
              <span>SEO</span>
            </div>

            {/* URL + Location */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: 4,
              }}
            >
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: "#F5F5F5",
                  letterSpacing: 1,
                }}
              >
                oreenza.com
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "rgba(245,245,245,0.4)",
                  letterSpacing: 2,
                  textTransform: "uppercase",
                }}
              >
                Remote · Worldwide
              </div>
            </div>
          </div>
        </div>

        {/* Left accent bar */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 4,
            background: "#F58327",
          }}
        />
      </div>
    ),
    size,
  );
}
