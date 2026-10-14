import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = "Zohaib Murtaza | Developer Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
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
          background: "linear-gradient(135deg, #0b0b10 0%, #1a1740 100%)",
          color: "#ededf3",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#a78bfa" }}>
          Developer Portfolio
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 88,
            fontWeight: 700,
            marginTop: 16,
          }}
        >
          {siteConfig.name}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 34,
            marginTop: 24,
            color: "#9a9aad",
          }}
        >
          {siteConfig.education} · {siteConfig.location}
        </div>
      </div>
    ),
    { ...size }
  );
}
