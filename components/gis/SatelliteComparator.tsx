"use client";

import { useEffect, useRef, useState } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import type { Map as MapLibreMap } from "maplibre-gl";
import {
  comparatorLocations,
  comparatorLayers,
  comparatorYears,
  comparatorSeasons,
  dateFor,
  gibsTileUrl,
} from "@/lib/satellite-comparator-config";

export default function SatelliteComparator() {
  const beforeRef = useRef<HTMLDivElement | null>(null);
  const afterRef = useRef<HTMLDivElement | null>(null);
  const beforeMap = useRef<MapLibreMap | null>(null);
  const afterMap = useRef<MapLibreMap | null>(null);
  const syncing = useRef(false);

  // Default to the same recent year, dry season vs monsoon — the single most
  // dramatic, reliable change MODIS shows over Bangladesh.
  const [locationId, setLocationId] = useState(comparatorLocations[0].id);
  const [layerId, setLayerId] = useState("falsecolor");
  const [beforeYear, setBeforeYear] = useState(2023);
  const [beforeSeason, setBeforeSeason] = useState("dry");
  const [afterYear, setAfterYear] = useState(2023);
  const [afterSeason, setAfterSeason] = useState("monsoon");
  const [split, setSplit] = useState(50);
  const [ready, setReady] = useState(false);

  const location = comparatorLocations.find((l) => l.id === locationId) ?? comparatorLocations[0];
  const layer = comparatorLayers.find((l) => l.id === layerId) ?? comparatorLayers[0];
  const beforeSeasonObj =
    comparatorSeasons.find((s) => s.id === beforeSeason) ?? comparatorSeasons[0];
  const afterSeasonObj =
    comparatorSeasons.find((s) => s.id === afterSeason) ?? comparatorSeasons[0];

  // Create both maps once.
  useEffect(() => {
    let cancelled = false;

    (async () => {
      const maplibregl = await import("maplibre-gl");
      if (cancelled || !beforeRef.current || !afterRef.current) return;

      const makeMap = (container: HTMLDivElement) =>
        new maplibregl.Map({
          container,
          style: {
            version: 8,
            sources: {},
            layers: [{ id: "bg", type: "background", paint: { "background-color": "#0a222d" } }],
          },
          center: comparatorLocations[0].center,
          zoom: comparatorLocations[0].zoom,
          attributionControl: false,
          dragRotate: false,
        });

      const bMap = makeMap(beforeRef.current);
      const aMap = makeMap(afterRef.current);

      aMap.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");
      aMap.addControl(
        new maplibregl.AttributionControl({ compact: true, customAttribution: "NASA EOSDIS GIBS" }),
        "bottom-right"
      );

      // Keep the two maps locked together.
      const sync = (from: MapLibreMap, to: MapLibreMap) => {
        if (syncing.current) return;
        syncing.current = true;
        to.jumpTo({
          center: from.getCenter(),
          zoom: from.getZoom(),
          bearing: from.getBearing(),
          pitch: from.getPitch(),
        });
        syncing.current = false;
      };
      bMap.on("move", () => sync(bMap, aMap));
      aMap.on("move", () => sync(aMap, bMap));

      let loaded = 0;
      const onReady = () => {
        loaded += 1;
        if (loaded === 2 && !cancelled) setReady(true);
      };
      bMap.on("load", onReady);
      aMap.on("load", onReady);

      beforeMap.current = bMap;
      afterMap.current = aMap;
    })();

    return () => {
      cancelled = true;
      beforeMap.current?.remove();
      afterMap.current?.remove();
      beforeMap.current = null;
      afterMap.current = null;
    };
  }, []);

  // Swap the GIBS raster layer whenever the imagery type or either date changes.
  useEffect(() => {
    function setLayer(map: MapLibreMap | null, date: string) {
      if (!map || !map.isStyleLoaded()) return;
      const srcId = "gibs";
      if (map.getLayer("gibs-layer")) map.removeLayer("gibs-layer");
      if (map.getSource(srcId)) map.removeSource(srcId);
      map.addSource(srcId, {
        type: "raster",
        tiles: [gibsTileUrl(layer.gibsLayer, date)],
        tileSize: 256,
        maxzoom: 9,
      });
      map.addLayer({ id: "gibs-layer", type: "raster", source: srcId });
    }
    setLayer(beforeMap.current, dateFor(beforeYear, beforeSeason));
    setLayer(afterMap.current, dateFor(afterYear, afterSeason));
  }, [layer, beforeYear, beforeSeason, afterYear, afterSeason, ready]);

  // Fly both maps to a new location preset.
  useEffect(() => {
    beforeMap.current?.jumpTo({ center: location.center, zoom: location.zoom });
    afterMap.current?.jumpTo({ center: location.center, zoom: location.zoom });
  }, [location]);

  return (
    <div>
      {/* Controls */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Field label="Location">
          <select
            value={locationId}
            onChange={(e) => setLocationId(e.target.value)}
            className="w-full rounded-lg border border-ink-200 px-3 py-2 text-sm"
          >
            {comparatorLocations.map((l) => (
              <option key={l.id} value={l.id}>
                {l.name}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Imagery">
          <select
            value={layerId}
            onChange={(e) => setLayerId(e.target.value)}
            className="w-full rounded-lg border border-ink-200 px-3 py-2 text-sm"
          >
            {comparatorLayers.map((l) => (
              <option key={l.id} value={l.id}>
                {l.name}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Before (left)">
          <div className="flex gap-2">
            <select
              value={beforeSeason}
              onChange={(e) => setBeforeSeason(e.target.value)}
              className="w-full rounded-lg border border-ink-200 px-2 py-2 text-sm"
            >
              {comparatorSeasons.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
            <select
              value={beforeYear}
              onChange={(e) => setBeforeYear(Number(e.target.value))}
              className="rounded-lg border border-ink-200 px-2 py-2 text-sm"
            >
              {comparatorYears.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </Field>
        <Field label="After (right)">
          <div className="flex gap-2">
            <select
              value={afterSeason}
              onChange={(e) => setAfterSeason(e.target.value)}
              className="w-full rounded-lg border border-ink-200 px-2 py-2 text-sm"
            >
              {comparatorSeasons.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
            <select
              value={afterYear}
              onChange={(e) => setAfterYear(Number(e.target.value))}
              className="rounded-lg border border-ink-200 px-2 py-2 text-sm"
            >
              {comparatorYears.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </Field>
      </div>

      <p className="mt-3 text-justify text-xs text-ink-400">
        Tip: the clearest change is <strong>dry season vs monsoon</strong> ({beforeSeasonObj.note} on
        the left, {afterSeasonObj.note} on the right). {location.note} {layer.note}
      </p>

      {/* Comparator */}
      <div className="relative mt-4 h-[62vh] max-h-[620px] min-h-[420px] w-full overflow-hidden rounded-2xl border border-ink-100">
        {/* Before map (full, underneath) */}
        <div ref={beforeRef} className="absolute inset-0 h-full w-full" />
        {/* After map (clipped to the right of the divider) */}
        <div
          ref={afterRef}
          className="absolute inset-0 h-full w-full"
          style={{ clipPath: `inset(0 0 0 ${split}%)` }}
        />

        {/* Date labels */}
        <span className="pointer-events-none absolute left-3 top-3 z-10 rounded-full bg-ink-950/75 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
          {beforeSeasonObj.name.replace(/ \(.*\)/, "")} {beforeYear}
        </span>
        <span className="pointer-events-none absolute right-3 top-3 z-10 rounded-full bg-ink-950/75 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
          {afterSeasonObj.name.replace(/ \(.*\)/, "")} {afterYear}
        </span>

        {/* Divider + slider */}
        <div
          className="pointer-events-none absolute inset-y-0 z-10 w-0.5 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.3)]"
          style={{ left: `${split}%` }}
        >
          <div className="pointer-events-none absolute top-1/2 left-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink-700 shadow-lg">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M9 7l-4 5 4 5M15 7l4 5-4 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={split}
          onChange={(e) => setSplit(Number(e.target.value))}
          aria-label="Drag to compare years"
          className="absolute inset-x-0 top-1/2 z-20 h-9 w-full -translate-y-1/2 cursor-ew-resize appearance-none bg-transparent [&::-webkit-slider-thumb]:h-9 [&::-webkit-slider-thumb]:w-9 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:cursor-ew-resize [&::-webkit-slider-thumb]:rounded-full"
        />

        {!ready && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-ink-50/80">
            <span className="text-sm font-medium text-ink-400">Loading satellite imagery…</span>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-ink-400">
        {label}
      </span>
      {children}
    </label>
  );
}
