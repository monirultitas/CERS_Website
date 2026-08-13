// Config for the Before/After Satellite Comparator.
// All imagery comes from NASA GIBS (free, no API key). MODIS Corrected
// Reflectance is 250m resolution — regional scale, which is exactly where
// year-over-year change in Bangladesh (monsoon flood extent, river migration,
// seasonal vegetation) is most visible.

export type ComparatorLocation = {
  id: string;
  name: string;
  center: [number, number];
  zoom: number;
  note: string;
};

export const comparatorLocations: ComparatorLocation[] = [
  {
    id: "bangladesh",
    name: "Bangladesh (national)",
    center: [90.4, 23.7],
    zoom: 6.2,
    note: "Whole-country view — best for monsoon flood extent and delta-wide change.",
  },
  {
    id: "dhaka-region",
    name: "Greater Dhaka & rivers",
    center: [90.4, 23.8],
    zoom: 8,
    note: "The capital and its surrounding river network.",
  },
  {
    id: "sundarbans",
    name: "Sundarbans & southern coast",
    center: [89.4, 22.2],
    zoom: 7.5,
    note: "Mangrove forest and the cyclone-exposed southern coastline.",
  },
  {
    id: "brahmaputra",
    name: "Brahmaputra–Jamuna corridor",
    center: [89.7, 24.8],
    zoom: 7.5,
    note: "One of the most active braided river systems on Earth.",
  },
  {
    id: "haor",
    name: "Sylhet haor basin",
    center: [91.3, 24.5],
    zoom: 8,
    note: "Seasonal wetlands that flood dramatically each monsoon.",
  },
];

export type ComparatorLayer = {
  id: string;
  name: string;
  gibsLayer: string;
  note: string;
};

export const comparatorLayers: ComparatorLayer[] = [
  {
    id: "truecolor",
    name: "True colour",
    gibsLayer: "MODIS_Terra_CorrectedReflectance_TrueColor",
    note: "Natural colour, as the eye would see from orbit.",
  },
  {
    id: "bands721",
    name: "Water & vegetation (7-2-1)",
    gibsLayer: "MODIS_Terra_CorrectedReflectance_Bands721",
    note: "False colour: water is dark blue, vegetation bright green, bare ground tan — flood extent stands out sharply.",
  },
];

// MODIS Terra has good coverage from ~2012 onward for these layers.
export const comparatorYears: number[] = [2012, 2014, 2016, 2018, 2020, 2022, 2024, 2025];

// A clear-sky-ish dry-season default date within a given year, so both sides
// are comparable seasons (mid-January = post-monsoon, usually low cloud).
export function dateForYear(year: number): string {
  return `${year}-01-15`;
}

export function gibsTileUrl(gibsLayer: string, date: string): string {
  return (
    `https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/${gibsLayer}` +
    `/default/${date}/GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpg`
  );
}
