"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import type { Map as MapLibreMap, Marker } from "maplibre-gl";
import { projects } from "@/lib/projects-content";
import { researchDetails } from "@/lib/research-content";

const DHAKA_CENTER: [number, number] = [90.41, 23.79];

const areaColors: Record<string, string> = {
  "geoai-remote-sensing": "#185c76",
  "urban-water-quality": "#2b8ca8",
  "water-sustainability": "#5b9a48",
  "climate-health": "#b45309",
};

function escapeHtml(value: unknown) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export default function ProjectImpactMap() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const markersRef = useRef<Marker[]>([]);
  const [ready, setReady] = useState(false);

  const [area, setArea] = useState<string>("all");
  const [status, setStatus] = useState<string>("all");

  const filtered = useMemo(
    () =>
      projects.filter(
        (p) =>
          (area === "all" || p.areaSlug === area) &&
          (status === "all" || p.status === status)
      ),
    [area, status]
  );

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const maplibregl = await import("maplibre-gl");
      if (cancelled || !containerRef.current) return;

      const map = new maplibregl.Map({
        container: containerRef.current,
        style: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
        center: DHAKA_CENTER,
        zoom: 10.5,
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
      map.on("load", () => {
        if (!cancelled) {
          mapRef.current = map;
          setReady(true);
        }
      });
    })();

    return () => {
      cancelled = true;
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  // Re-draw markers whenever the filtered set changes.
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !ready) return;

    let disposed = false;
    (async () => {
      const maplibregl = await import("maplibre-gl");
      if (disposed) return;

      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];

      for (const project of filtered) {
        const color = areaColors[project.areaSlug] ?? "#185c76";
        const el = document.createElement("div");
        el.style.cssText = `
          width: 20px; height: 20px; border-radius: 999px; border: 3px solid white;
          background: ${color}; cursor: pointer; box-shadow: 0 1px 5px rgba(0,0,0,0.35);
        `;
        const area = researchDetails.find((r) => r.slug === project.areaSlug);
        const popup = new maplibregl.Popup({ closeButton: true, maxWidth: "280px", offset: 16 })
          .setHTML(
            `<div style="font-family: var(--font-inter), sans-serif; font-size: 13px;">
              <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:${color};">${escapeHtml(
              area?.name ?? ""
            )} · ${escapeHtml(project.status)}</div>
              <div style="font-weight:700; font-size:14px; color:#0b2530; margin-top:3px;">${escapeHtml(
              project.title
            )}</div>
              <div style="color:#3b5c6c; line-height:1.5; margin-top:5px; text-align:justify;">${escapeHtml(
              project.summary
            )}</div>
              <div style="margin-top:8px;"><a href="/projects/${escapeHtml(
              project.slug
            )}" style="color:#185c76;font-weight:600;">View project →</a></div>
            </div>`
          );
        const marker = new maplibregl.Marker({ element: el })
          .setLngLat(project.coordinates)
          .setPopup(popup)
          .addTo(map);
        markersRef.current.push(marker);
      }
    })();

    return () => {
      disposed = true;
    };
  }, [filtered, ready]);

  return (
    <div className="overflow-hidden rounded-2xl border border-ink-100">
      <div className="flex flex-col gap-4 border-b border-ink-100 bg-white p-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-wrap gap-4">
          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-ink-400">
              Research theme
            </span>
            <select
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="rounded-lg border border-ink-200 px-3 py-2 text-sm"
            >
              <option value="all">All themes</option>
              {researchDetails.map((r) => (
                <option key={r.slug} value={r.slug}>
                  {r.name}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-ink-400">
              Status
            </span>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="rounded-lg border border-ink-200 px-3 py-2 text-sm"
            >
              <option value="all">All</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
            </select>
          </label>
        </div>
        <p className="text-sm text-ink-500">
          Showing <span className="font-semibold text-ink-800">{filtered.length}</span> of{" "}
          {projects.length} projects
        </p>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-x-5 gap-y-2 border-b border-ink-100 bg-ink-50/50 px-5 py-3">
        {researchDetails.map((r) => (
          <span key={r.slug} className="flex items-center gap-2 text-xs text-ink-600">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: areaColors[r.slug] }}
            />
            {r.name}
          </span>
        ))}
      </div>

      <div className="relative h-[60vh] max-h-[600px] min-h-[400px] w-full">
        <div ref={containerRef} className="h-full w-full" />
        {!ready && (
          <div className="absolute inset-0 flex items-center justify-center bg-ink-50/80">
            <span className="text-sm font-medium text-ink-400">Loading project map…</span>
          </div>
        )}
      </div>
    </div>
  );
}
