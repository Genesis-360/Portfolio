import { ImageResponse } from "next/og";

export const alt = "OREENZA — AI-Powered Design & Development Agency";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "#f63b05",
        color: "#fffae5",
        fontFamily: "anton",
        position: "relative",
        overflow: "hidden",
        border: "4px solid rgba(245,245,245,0.7)",
      }}>
      {/* Top bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          padding: "32px 48px",
        }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 16,
            fontWeight: 500,
            letterSpacing: 1,
            lineHeight: 1.2,
            textTransform: "uppercase",
          }}>
          <span>OREENZA</span>
          <span>AGENCY</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 32,
            fontWeight: 800,
            letterSpacing: -1,
            lineHeight: 1,
            textTransform: "uppercase",
          }}>
          <span>+91 94576 33238</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 16,
            letterSpacing: 1,
            color: "rgba(245,245,245,0.9)",
            textTransform: "uppercase",
            textAlign: "right",
          }}>
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
          marginTop: -40,
        }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
          }}>
          <div
            style={{
              fontSize: 180,
              fontWeight: 900,
              letterSpacing: -8,
              lineHeight: 0.78,
              textTransform: "uppercase",
              textAlign: "center",
              color: "#F5F5F5",
            }}>
            OREENZA
          </div>
          <div
            style={{
              fontSize: 80,
              fontWeight: 400,
              fontStyle: "italic",
              marginTop: -10,
              color: "#000000",
            }}>
            Agency
          </div>
        </div>
      </div>

      {/* Side labels */}
      <div
        style={{
          position: "absolute",
          left: 24,
          top: "50%",
          fontSize: 14,
          letterSpacing: 4,
          color: "rgba(245,245,245,0.8)",
          textTransform: "uppercase",
          whiteSpace: "nowrap",
          transform: "rotate(-90deg) translateX(-50%)",
          transformOrigin: "left center",
        }}>
        OREENZA
      </div>
      <div
        style={{
          position: "absolute",
          right: 24,
          top: "50%",
          fontSize: 14,
          letterSpacing: 4,
          color: "rgba(245,245,245,0.8)",
          textTransform: "uppercase",
          whiteSpace: "nowrap",
          transform: "rotate(90deg) translateX(50%)",
          transformOrigin: "right center",
        }}>
        DESIGNING WEBSITES
      </div>

      {/* Bottom tagline */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingBottom: 70,
        }}>
        <div
          style={{
            fontSize: 24,
            fontWeight: 500,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#000000",
          }}>
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
        }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 16,
            fontWeight: 500,
            letterSpacing: 1,
            lineHeight: 1.2,
            textTransform: "uppercase",
          }}>
          <span>OREENZA</span>
          <span>AGENCY</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 32,
            fontWeight: 800,
            letterSpacing: -1,
            lineHeight: 1,
            textTransform: "uppercase",
          }}>
          <span>hello@oreenza.com</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 16,
            letterSpacing: 1,
            color: "rgba(245,245,245,0.9)",
            textTransform: "uppercase",
            textAlign: "right",
          }}>
          <span>AI-POWERED</span>
          <span>DESIGN &amp; DEV</span>
        </div>
      </div>
    </div>,
    size,
  );
}
