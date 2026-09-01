import { ImageResponse } from "next/og";

export const alt = "OREENZA — Performance-first design & development studio";
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
          justifyContent: "space-between",
          padding: "72px",
          background: "#000000",
          color: "#fffae5",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 24,
            letterSpacing: 6,
            color: "#f63b05",
            textTransform: "uppercase",
            fontWeight: 700,
          }}
        >
          Independent design &amp; development studio
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 8,
          }}
        >
          <div
            style={{
              fontSize: 200,
              fontWeight: 900,
              letterSpacing: -6,
              lineHeight: 0.85,
              color: "#fffae5",
              textTransform: "uppercase",
            }}
          >
            OREENZA
          </div>
          <div
            style={{
              display: "flex",
              gap: 32,
              marginTop: 32,
              fontSize: 28,
              color: "#fffae5",
              opacity: 0.75,
            }}
          >
            <span>Brand</span>
            <span style={{ color: "#f63b05" }}>·</span>
            <span>Web</span>
            <span style={{ color: "#f63b05" }}>·</span>
            <span>App</span>
            <span style={{ color: "#f63b05" }}>·</span>
            <span>SEO</span>
            <span style={{ color: "#f63b05" }}>·</span>
            <span>Motion</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 22,
            color: "#fffae5",
            opacity: 0.55,
            textTransform: "uppercase",
            letterSpacing: 3,
          }}
        >
          <span>oreenza.com</span>
          <span>Remote · Worldwide</span>
        </div>
      </div>
    ),
    size,
  );
}
