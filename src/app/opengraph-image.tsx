import { ImageResponse } from "next/og";

export const alt = "OREENZA — Performance First Creative Agency";
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
          color: "#f5f1e8",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 6, color: "#e8533a" }}>
          INDEPENDENT DESIGN &amp; DEVELOPMENT STUDIO
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
        <div style={{ fontSize: 40, marginTop: 20, color: "#f5f1e8" }}>
          Performance-first creative agency for ambitious brands.
        </div>
      </div>
    ),
    size,
  );
}
