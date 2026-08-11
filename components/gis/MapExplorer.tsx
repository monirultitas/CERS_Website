"use client";

import { useEffect, useRef, useState } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import type { Map as MapLibreMap, MapLayerMouseEvent } from "maplibre-gl";
import { gisLayers } from "./gis-layers-config";

const DHAKA_CENTER: [number, number] = [90.4074, 23.78];
const BASEMAP_STYLE = "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";

function escapeHtml(value: unknown) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export default function MapExplorer() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const [activeLayers, setActiveLayers] = useState<Set<string>>(
    () => new Set(gisLayers.map((l) => l.id))
  );
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const maplibregl = await import("maplibre-gl");
      if (cancelled || !containerRef.current) return;

      const map = new maplibregl.Map({
        container: containerRef.current,
        style: BASEMAP_STYLE,
        center: DHAKA_CENTER,
        zoom: 11,
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

      map.on("error", (e) => {
        console.error("MapLibre error:", e.error?.message ?? e);
      });

      map.on("load", async () => {
        try {
          for (const layer of gisLayers) {
            const res = await fetch(layer.url);
            const data = await res.json();

            map.addSource(layer.id, { type: "geojson", data });

            if (layer.geometryType === "point") {
              map.addLayer({
                id: layer.id,
                type: "circle",
                source: layer.id,
                paint: {
                  "circle-radius": 8,
                  "circle-color": layer.color,
                  "circle-stroke-width": 2,
                  "circle-stroke-color": "#ffffff",
                },
              });
            } else {
              map.addLayer({
                id: `${layer.id}-fill`,
                type: "fill",
                source: layer.id,
                paint: { "fill-color": layer.color, "fill-opacity": 0.35 },
              });
              map.addLayer({
                id: layer.id,
                type: "line",
                source: layer.id,
                paint: { "line-color": layer.color, "line-width": 1.5 },
              });
            }

            const clickTargets =
              layer.geometryType === "point" ? [layer.id] : [`${layer.id}-fill`];
            for (const targetId of clickTargets) {
              map.on("click", targetId, (e: MapLayerMouseEvent) => {
                const feature = e.features?.[0];
                if (!feature) return;
                const props = feature.properties ?? {};
                const rows = layer.popupFields
                  .map(
                    (f) =>
                      `<div style="margin-top:4px;"><span style="color:#7f9dab;font-weight:600;">${escapeHtml(
                        f.label
                      )}:</span> ${escapeHtml(props[f.key] ?? "—")}</div>`
                  )
                  .join("");
                new maplibregl.Popup({ closeButton: true, maxWidth: "260px" })
                  .setLngLat(e.lngLat)
                  .setHTML(
                    `<div style="font-family: var(--font-inter), sans-serif; font-size: 13px;">
                      <div style="font-weight:700; font-size:14px; color:#0b2530;">${escapeHtml(
                        props[layer.popupTitleKey] ?? layer.name
                      )}</div>
                      ${rows}
                    </div>`
                  )
                  .addTo(map);
              });
              map.on("mouseenter", targetId, () => {
                map.getCanvas().style.cursor = "pointer";
              });
              map.on("mouseleave", targetId, () => {
                map.getCanvas().style.cursor = "";
              });
            }
          }
        } catch (err) {
          console.error("GIS Explorer layer load failed:", err);
        } finally {
          setReady(true);
        }
      });

      mapRef.current = map;
    })();

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  function toggleLayer(id: string) {
    setActiveLayers((prev) => {
      const next = new Set(prev);
      const isVisible = next.has(id);
      const map = mapRef.current;
      const layer = gisLayers.find((l) => l.id === id);
      if (map && layer) {
        const ids = layer.geometryType === "polygon" ? [id, `${id}-fill`] : [id];
        for (const layerId of ids) {
          if (map.getLayer(layerId)) {
            map.setLayoutProperty(layerId, "visibility", isVisible ? "none" : "visible");
          }
        }
      }
      if (isVisible) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className="relative flex h-[75vh] min-h-[520px] w-full flex-col overflow-hidden rounded-2xl border border-ink-100 lg:flex-row">
      <div ref={containerRef} className="h-full w-full flex-1" />

      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center bg-ink-50/80 lg:right-[280px]">
          <span className="text-sm font-medium text-ink-400">Loading map layers…</span>
        </div>
      )}

      <aside className="flex w-full shrink-0 flex-col gap-1 border-t border-ink-100 bg-white p-5 lg:w-[280px] lg:border-l lg:border-t-0">
        <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-ink-500">
          Layers
        </h3>
        <p className="mt-1 text-xs text-ink-400">Illustrative sample data.</p>
        <div className="mt-4 flex flex-col gap-3">
          {gisLayers.map((layer) => (
            <label
              key={layer.id}
              className="flex cursor-pointer items-start gap-3 rounded-lg p-2 hover:bg-ink-50"
            >
              <input
                type="checkbox"
                checked={activeLayers.has(layer.id)}
                onChange={() => toggleLayer(layer.id)}
                className="mt-1 h-4 w-4 shrink-0 rounded border-ink-300 accent-brand-700"
              />
              <span>
                <span className="flex items-center gap-2 text-sm font-medium text-ink-900">
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: layer.color }}
                  />
                  {layer.name}
                </span>
                <span className="mt-0.5 block text-xs leading-snug text-ink-400">
                  {layer.description}
                </span>
              </span>
            </label>
          ))}
        </div>
      </aside>
    </div>
  );
}
