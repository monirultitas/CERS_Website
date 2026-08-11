import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
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
          background: "#071219",
          backgroundImage:
            "linear-gradient(to right, rgba(126,197,214,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(126,197,214,0.15) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 999,
              background: "#185c76",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ width: 16, height: 16, borderRadius: 999, background: "#fff" }} />
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, color: "#fff" }}>{siteConfig.shortName}</div>
        </div>
        <div
          style={{
            marginTop: 40,
            fontSize: 56,
            fontWeight: 700,
            color: "#fff",
            lineHeight: 1.15,
            maxWidth: 900,
          }}
        >
          {siteConfig.tagline}
        </div>
        <div style={{ marginTop: 28, fontSize: 26, color: "#7ec5d6", maxWidth: 820 }}>
          {siteConfig.fullName}
        </div>
      </div>
    ),
    { ...size }
  );
}
