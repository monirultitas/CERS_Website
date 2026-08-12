// Live, publicly-open data sources (no API key required) — refreshed on every
// page load, so "updated daily" happens naturally rather than via a cron job.

// Loosely covers South/Southeast Asia so the feeds usually have something to show.
const REGION_BBOX = { west: 60, south: -10, east: 105, north: 40 };

export type LiveFeatureCollection = {
  type: "FeatureCollection";
  features: Array<{
    type: "Feature";
    geometry: { type: "Point"; coordinates: [number, number] };
    properties: Record<string, unknown>;
  }>;
};

// NASA EONET — active natural events (storms, wildfires, volcanoes, floods).
export async function fetchLiveNaturalEvents(): Promise<LiveFeatureCollection> {
  const bbox = `${REGION_BBOX.west},${REGION_BBOX.north},${REGION_BBOX.east},${REGION_BBOX.south}`;
  const res = await fetch(
    `https://eonet.gsfc.nasa.gov/api/v3/events?status=open&days=120&bbox=${bbox}&limit=30`
  );
  const data = await res.json();

  type EonetEvent = {
    title: string;
    link: string;
    categories?: { title: string }[];
    geometry?: { type: string; date: string; coordinates: [number, number] }[];
  };

  const features = ((data.events ?? []) as EonetEvent[])
    .map((event) => {
      const point = event.geometry?.[event.geometry.length - 1];
      if (!point || point.type !== "Point") return null;
      return {
        type: "Feature" as const,
        geometry: { type: "Point" as const, coordinates: point.coordinates },
        properties: {
          title: event.title,
          category: event.categories?.[0]?.title ?? "Natural event",
          date: point.date,
          link: event.link,
        },
      };
    })
    .filter((f): f is NonNullable<typeof f> => f !== null);

  return { type: "FeatureCollection", features };
}

// USGS — earthquakes magnitude 4+ in the region over the last 90 days.
export async function fetchLiveEarthquakes(): Promise<LiveFeatureCollection> {
  const since = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  const res = await fetch(
    `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${since}` +
      `&minmagnitude=4&minlatitude=${REGION_BBOX.south}&maxlatitude=${REGION_BBOX.north}` +
      `&minlongitude=${REGION_BBOX.west}&maxlongitude=${REGION_BBOX.east}&limit=40`
  );
  const data = await res.json();

  type UsgsFeature = {
    geometry: { coordinates: [number, number, number] };
    properties: { mag: number; place: string; time: number; url: string };
  };

  const features = ((data.features ?? []) as UsgsFeature[]).map((f) => ({
    type: "Feature" as const,
    geometry: { type: "Point" as const, coordinates: [f.geometry.coordinates[0], f.geometry.coordinates[1]] as [number, number] },
    properties: {
      magnitude: f.properties.mag,
      place: f.properties.place,
      time: new Date(f.properties.time).toISOString().slice(0, 10),
      link: f.properties.url,
    },
  }));

  return { type: "FeatureCollection", features };
}

// NASA GIBS — true-color satellite imagery tiles, reprocessed daily.
export function gibsTrueColorTileUrl(): string {
  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  return (
    `https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/MODIS_Terra_CorrectedReflectance_TrueColor` +
    `/default/${yesterday}/GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpg`
  );
}
