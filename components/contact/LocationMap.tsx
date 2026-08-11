"use client";

import { useEffect, useRef } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import type { Map as MapLibreMap } from "maplibre-gl";

// Approximate coordinates for Chandrima Model Town, Mohammadpur, Dhaka.
const OFFICE_LOCATION: [number, number] = [90.3505, 23.7658];

export default function LocationMap() {
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
        center: OFFICE_LOCATION,
        zoom: 14,
        attributionControl: false,
        interactive: true,
      });

      map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");
      map.addControl(
        new maplibregl.AttributionControl({
          compact: true,
          customAttribution: "© CARTO © OpenStreetMap contributors",
        }),
        "bottom-right"
      );

      new maplibregl.Marker({ color: "#185c76" }).setLngLat(OFFICE_LOCATION).addTo(map);

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
      className="h-72 w-full overflow-hidden rounded-2xl border border-ink-100"
    />
  );
}
