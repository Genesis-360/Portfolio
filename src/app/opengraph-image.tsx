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
          justifyContent: "center",
          padding: "80px",
          background: "#000000",
          color: "#fffae5",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: 6,
            color: "#f63b05",
            textTransform: "uppercase",
          }}
        >
          Independent design &amp; development studio
        </div>
        <div
          style={{
            fontSize: 150,
            fontWeight: 800,
            letterSpacing: -4,
            marginTop: 24,
            lineHeight: 1,
          }}
        >
          OREENZA
        </div>
        <div style={{ fontSize: 40, marginTop: 20, color: "#fffae5" }}>
          Performance-first design &amp; development studio.
        </div>
      </div>
    ),
    size,
  );
}
