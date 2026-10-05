import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = `${siteConfig.name} - ${siteConfig.tagline}`;
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
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            "radial-gradient(ellipse 70% 60% at 100% 0%, rgba(180,35,24,0.45), transparent 60%), #0f1a28",
          color: "white",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.65)",
          }}
        >
          {siteConfig.address.localityLabel}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 96, fontWeight: 700 }}>
            {siteConfig.name}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 20,
              fontSize: 44,
              color: "rgba(255,255,255,0.85)",
            }}
          >
            Hyundai ve Kia Yedek Parça
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", fontSize: 30 }}>
          <div
            style={{
              display: "flex",
              width: 14,
              height: 14,
              borderRadius: 7,
              background: "#b42318",
              marginRight: 16,
            }}
          />
          Orijinal sıfır ve orijinal çıkma parça
        </div>
      </div>
    ),
    size,
  );
}
