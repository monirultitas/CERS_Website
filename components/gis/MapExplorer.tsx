"use client";

import { useEffect, useRef, useState } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import type { Map as MapLibreMap, MapLayerMouseEvent } from "maplibre-gl";
import { gisLayers } from "./gis-layers-config";
import { fetchLiveNaturalEvents, fetchLiveEarthquakes, gibsTrueColorTileUrl } from "@/lib/live-data";

const DHAKA_CENTER: [number, number] = [90.4074, 23.78];
const BASEMAP_STYLE = "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";

const GIBS_DATE_LABEL = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(
  new Date(Date.now() - 24 * 60 * 60 * 1000)
);

type PanelLayer = {
  id: string;
  name: string;
  color: string;
  description: string;
  live?: boolean;
};

const livePanelLayers: PanelLayer[] = [
  {
    id: "satellite-view",
    name: `Satellite view (${GIBS_DATE_LABEL})`,
    color: "#334155",
    description: "NASA true-color satellite imagery, reprocessed daily (shows yesterday's pass).",
    live: true,
  },
  {
    id: "natural-events",
    name: "Active natural events",
    color: "#e0a458",
    description: "Storms, wildfires & floods currently tracked by NASA EONET across the region.",
    live: true,
  },
  {
    id: "earthquakes",
    name: "Recent earthquakes",
    color: "#dc2626",
    description: "Magnitude 4+ earthquakes in the last 90 days, from USGS.",
    live: true,
  },
];

const panelLayers: PanelLayer[] = [
  ...gisLayers.map((l) => ({ id: l.id, name: l.name, color: l.color, description: l.description })),
  ...livePanelLayers,
];

// Which actual MapLibre layer ids each panel toggle controls.
const LAYER_TOGGLE_MAP: Record<string, string[]> = {
  ...Object.fromEntries(
    gisLayers.map((l) => [l.id, l.geometryType === "polygon" ? [l.id, `${l.id}-fill`] : [l.id]])
  ),
  "satellite-view": ["gibs-truecolor"],
  "natural-events": ["natural-events"],
  earthquakes: ["earthquakes"],
};

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
    () => new Set([...gisLayers.map((l) => l.id), "natural-events", "earthquakes"])
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
          customAttribution: "© CARTO © OpenStreetMap contributors, NASA EONET/GIBS, USGS",
        }),
        "bottom-right"
      );

      map.on("error", (e) => {
        console.error("MapLibre error:", e.error?.message ?? e);
      });

      map.on("load", async () => {
        try {
          // Satellite imagery raster, added first so it sits beneath every vector overlay.
          map.addSource("gibs-truecolor", {
            type: "raster",
            tiles: [gibsTrueColorTileUrl()],
            tileSize: 256,
            maxzoom: 9,
            attribution: "NASA EOSDIS GIBS",
          });
          map.addLayer({
            id: "gibs-truecolor",
            type: "raster",
            source: "gibs-truecolor",
            layout: { visibility: "none" },
            paint: { "raster-opacity": 0.85 },
          });

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

          // Live: NASA EONET natural events.
          const events = await fetchLiveNaturalEvents().catch(() => null);
          if (events) {
            map.addSource("natural-events", { type: "geojson", data: events });
            map.addLayer({
              id: "natural-events",
              type: "circle",
              source: "natural-events",
              paint: {
                "circle-radius": 7,
                "circle-color": "#e0a458",
                "circle-stroke-width": 2,
                "circle-stroke-color": "#ffffff",
              },
            });
            map.on("click", "natural-events", (e: MapLayerMouseEvent) => {
              const props = e.features?.[0]?.properties ?? {};
              new maplibregl.Popup({ closeButton: true, maxWidth: "260px" })
                .setLngLat(e.lngLat)
                .setHTML(
                  `<div style="font-family: var(--font-inter), sans-serif; font-size: 13px;">
                    <div style="font-weight:700; font-size:14px; color:#0b2530;">${escapeHtml(props.title)}</div>
                    <div style="margin-top:4px;"><span style="color:#7f9dab;font-weight:600;">Category:</span> ${escapeHtml(props.category)}</div>
                    <div style="margin-top:4px;"><span style="color:#7f9dab;font-weight:600;">Reported:</span> ${escapeHtml(String(props.date).slice(0, 10))}</div>
                    <div style="margin-top:6px;"><a href="${escapeHtml(props.link)}" target="_blank" rel="noopener noreferrer" style="color:#185c76;">NASA EONET source →</a></div>
                  </div>`
                )
                .addTo(map);
            });
            map.on("mouseenter", "natural-events", () => (map.getCanvas().style.cursor = "pointer"));
            map.on("mouseleave", "natural-events", () => (map.getCanvas().style.cursor = ""));
          }

          // Live: USGS earthquakes.
          const quakes = await fetchLiveEarthquakes().catch(() => null);
          if (quakes) {
            map.addSource("earthquakes", { type: "geojson", data: quakes });
            map.addLayer({
              id: "earthquakes",
              type: "circle",
              source: "earthquakes",
              paint: {
                "circle-radius": ["interpolate", ["linear"], ["get", "magnitude"], 4, 5, 7, 14],
                "circle-color": "#dc2626",
                "circle-opacity": 0.6,
                "circle-stroke-width": 1.5,
                "circle-stroke-color": "#dc2626",
              },
            });
            map.on("click", "earthquakes", (e: MapLayerMouseEvent) => {
              const props = e.features?.[0]?.properties ?? {};
              new maplibregl.Popup({ closeButton: true, maxWidth: "260px" })
                .setLngLat(e.lngLat)
                .setHTML(
                  `<div style="font-family: var(--font-inter), sans-serif; font-size: 13px;">
                    <div style="font-weight:700; font-size:14px; color:#0b2530;">M ${escapeHtml(props.magnitude)}, ${escapeHtml(props.place)}</div>
                    <div style="margin-top:4px;"><span style="color:#7f9dab;font-weight:600;">Date:</span> ${escapeHtml(props.time)}</div>
                    <div style="margin-top:6px;"><a href="${escapeHtml(props.link)}" target="_blank" rel="noopener noreferrer" style="color:#185c76;">USGS source →</a></div>
                  </div>`
                )
                .addTo(map);
            });
            map.on("mouseenter", "earthquakes", () => (map.getCanvas().style.cursor = "pointer"));
            map.on("mouseleave", "earthquakes", () => (map.getCanvas().style.cursor = ""));
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
      const mapLayerIds = LAYER_TOGGLE_MAP[id];
      if (map && mapLayerIds) {
        for (const layerId of mapLayerIds) {
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
    <div className="overflow-hidden rounded-2xl border border-ink-100">
      <div className="border-b border-ink-100 bg-white p-5">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-ink-500">
            Layers
          </h3>
          <span className="text-xs text-ink-400">Sample data + live NASA/USGS feeds</span>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {panelLayers.map((layer) => {
            const active = activeLayers.has(layer.id);
            return (
              <button
                key={layer.id}
                type="button"
                onClick={() => toggleLayer(layer.id)}
                aria-pressed={active}
                title={layer.description}
                className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                  active
                    ? "border-ink-200 bg-white text-ink-800"
                    : "border-ink-100 bg-ink-50 text-ink-400"
                }`}
              >
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: active ? layer.color : "#c7d2d8" }}
                />
                {layer.name}
                {layer.live && (
                  <span className="rounded-full bg-moss-100 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-moss-700">
                    Live
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="relative h-[65vh] max-h-[640px] min-h-[420px] w-full">
        <div ref={containerRef} className="h-full w-full" />

        {!ready && (
          <div className="absolute inset-0 flex items-center justify-center bg-ink-50/80">
            <span className="text-sm font-medium text-ink-400">Loading map layers…</span>
          </div>
        )}
      </div>
    </div>
  );
}
