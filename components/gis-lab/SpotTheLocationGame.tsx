"use client";

import { useEffect, useRef, useState } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import type { Map as MapLibreMap, Marker } from "maplibre-gl";
import { dhakaLandmarks } from "@/lib/gis-lab-content";
import { haversineDistanceKm, shuffle } from "@/lib/geo-utils";

const DHAKA_CENTER: [number, number] = [90.4074, 23.76];

export default function SpotTheLocationGame() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const guessMarkerRef = useRef<Marker | null>(null);
  const answerMarkerRef = useRef<Marker | null>(null);

  // Deterministic on first render so server and client markup match; shuffled
  // client-side after mount (see effect below) to avoid a hydration mismatch.
  const [order, setOrder] = useState(dhakaLandmarks);
  const [round, setRound] = useState(0);
  const [guessed, setGuessed] = useState(false);
  const [lastDistance, setLastDistance] = useState<number | null>(null);
  const [lastPoints, setLastPoints] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [mapReady, setMapReady] = useState(false);

  const current = order[round];
  const isLastRound = round === order.length - 1;

  useEffect(() => {
    setOrder(shuffle(dhakaLandmarks));
  }, []);

  // Create the map once.
  useEffect(() => {
    let cancelled = false;

    (async () => {
      const maplibregl = await import("maplibre-gl");
      if (cancelled || !containerRef.current) return;

      const map = new maplibregl.Map({
        container: containerRef.current,
        style: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
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

      map.on("load", () => {
        mapRef.current = map;
        setMapReady(true);
      });
    })();

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  // Attach a one-shot click handler for the active round.
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapReady || guessed) return;

    async function handleClick(e: { lngLat: { lng: number; lat: number } }) {
      const maplibregl = await import("maplibre-gl");
      const guessCoords: [number, number] = [e.lngLat.lng, e.lngLat.lat];
      const distance = haversineDistanceKm(guessCoords, current.coordinates);
      const points = Math.max(0, Math.round(100 - distance * 8));

      guessMarkerRef.current?.remove();
      answerMarkerRef.current?.remove();

      guessMarkerRef.current = new maplibregl.Marker({ color: "#b45309" })
        .setLngLat(guessCoords)
        .addTo(map!);
      answerMarkerRef.current = new maplibregl.Marker({ color: "#457a38" })
        .setLngLat(current.coordinates)
        .addTo(map!);

      setLastDistance(distance);
      setLastPoints(points);
      setTotalScore((s) => s + points);
      setGuessed(true);
    }

    map.on("click", handleClick);
    return () => {
      map.off("click", handleClick);
    };
  }, [guessed, mapReady, current]);

  function nextRound() {
    if (isLastRound) {
      setOrder(shuffle(dhakaLandmarks));
      setRound(0);
      setTotalScore(0);
    } else {
      setRound((r) => r + 1);
    }
    guessMarkerRef.current?.remove();
    answerMarkerRef.current?.remove();
    setGuessed(false);
    setLastDistance(null);
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-ink-100">
      <div className="flex flex-col gap-3 border-b border-ink-100 bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-400">
            Round {round + 1} / {order.length} &middot; Score: {totalScore}
          </p>
          <h3 className="font-display mt-1 text-lg font-semibold text-ink-900">
            {guessed ? current.name : `Find: ${current.name}`}
          </h3>
          <p className="mt-1 max-w-md text-sm text-ink-500">{current.hint}</p>
        </div>
        {guessed ? (
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-display text-2xl font-bold text-brand-700">+{lastPoints}</p>
              <p className="text-xs text-ink-400">{lastDistance?.toFixed(1)} km off</p>
            </div>
            <button
              onClick={nextRound}
              className="rounded-full bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-800"
            >
              {isLastRound ? "Play again" : "Next"}
            </button>
          </div>
        ) : (
          <span className="text-sm font-medium text-ink-400">Click the map to guess →</span>
        )}
      </div>
      <div ref={containerRef} className="h-[420px] w-full" />
    </div>
  );
}
