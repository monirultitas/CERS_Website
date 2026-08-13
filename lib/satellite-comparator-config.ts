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

// VIIRS (rather than MODIS) has a wide ~3000km swath, so single-day imagery
// over Bangladesh is gap-free — no black no-data wedges between orbits.
export const comparatorLayers: ComparatorLayer[] = [
  {
    id: "truecolor",
    name: "True colour",
    gibsLayer: "VIIRS_SNPP_CorrectedReflectance_TrueColor",
    note: "Natural colour, as the eye would see from orbit.",
  },
  {
    id: "falsecolor",
    name: "Water & vegetation",
    gibsLayer: "VIIRS_SNPP_CorrectedReflectance_BandsM11-I2-I1",
    note: "False colour: water is dark blue, vegetation bright green, bare ground tan — flood extent stands out sharply.",
  },
];

// VIIRS SNPP has reliable daily coverage in GIBS from 2016 onward.
export const comparatorYears: number[] = [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];

// Season is what actually drives visible change over Bangladesh at 250m: the
// difference between dry-season low water and monsoon flooding is dramatic,
// whereas two dry-season days years apart look almost identical. Each season
// maps to a representative date.
export type Season = {
  id: string;
  name: string;
  monthDay: string;
  note: string;
};

export const comparatorSeasons: Season[] = [
  { id: "dry", name: "Dry season (Feb)", monthDay: "02-10", note: "low water, exposed sand & bare fields" },
  { id: "premonsoon", name: "Pre-monsoon (Apr)", monthDay: "04-15", note: "rising rivers, early rains" },
  { id: "monsoon", name: "Monsoon (Aug)", monthDay: "08-20", note: "peak flooding and swollen rivers" },
  { id: "postmonsoon", name: "Post-monsoon (Nov)", monthDay: "11-10", note: "receding water, lush vegetation" },
];

export function dateFor(year: number, seasonId: string): string {
  const season = comparatorSeasons.find((s) => s.id === seasonId) ?? comparatorSeasons[0];
  return `${year}-${season.monthDay}`;
}

export function gibsTileUrl(gibsLayer: string, date: string): string {
  return (
    `https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/${gibsLayer}` +
    `/default/${date}/GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpg`
  );
}
