"use client";

import { useEffect, useRef } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import type { Map as MapLibreMap } from "maplibre-gl";
import { mapFacts } from "@/lib/fun-facts-content";

const BANGLADESH_CENTER: [number, number] = [90.4, 23.4];

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export default function FunFactsMap() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MapLibreMap | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const maplibregl = await import("maplibre-gl");
      if (cancelled || !containerRef.current) return;

      const map = new maplibregl.Map({
        container: containerRef.current,
        style: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
        center: BANGLADESH_CENTER,
        zoom: 6.2,
        attributionControl: false,
      });

      map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");
      map.addControl(
        new maplibregl.AttributionControl({
          compact: true,
          customAttribution: "© CARTO © OpenStreetMap contributors",
        }),
        "bottom-right"
      );

      for (const item of mapFacts) {
        const el = document.createElement("button");
        el.setAttribute("aria-label", item.title);
        el.style.cssText = `
          width: 40px; height: 40px; border-radius: 999px; border: 2px solid white;
          background: #185c76; display: flex; align-items: center; justify-content: center;
          font-size: 18px; cursor: pointer; box-shadow: 0 2px 8px rgba(0,0,0,0.25);
        `;
        el.textContent = item.emoji;

        const popup = new maplibregl.Popup({ closeButton: true, maxWidth: "260px", offset: 24 }).setHTML(
          `<div style="font-family: var(--font-inter), sans-serif; font-size: 13px;">
            <div style="font-weight:700; font-size:14px; color:#0b2530; margin-bottom:4px;">${escapeHtml(
              item.title
            )}</div>
            <div style="color:#3b5c6c; line-height:1.5;">${escapeHtml(item.fact)}</div>
          </div>`
        );

        new maplibregl.Marker({ element: el })
          .setLngLat(item.coordinates)
          .setPopup(popup)
          .addTo(map);
      }

      mapRef.current = map;
    })();

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-[420px] w-full overflow-hidden rounded-2xl border border-ink-100"
    />
  );
}
