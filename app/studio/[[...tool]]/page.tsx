import { isSanityConfigured } from "@/sanity/env";
import StudioClient from "./StudioClient";

export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 480 }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.75rem" }}>
            Sanity Studio isn&rsquo;t configured yet
          </h1>
          <p style={{ color: "#555", lineHeight: 1.6 }}>
            Create a free project at{" "}
            <a href="https://sanity.io" style={{ color: "#185c76" }}>
              sanity.io
            </a>
            , then set <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> and{" "}
            <code>NEXT_PUBLIC_SANITY_DATASET</code> in <code>.env.local</code> (see{" "}
            <code>.env.example</code>). Restart the dev server and this page will load the
            content studio.
          </p>
        </div>
      </div>
    );
  }

  return <StudioClient />;
}
