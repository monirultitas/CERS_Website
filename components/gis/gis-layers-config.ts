export type GisLayerConfig = {
  id: string;
  name: string;
  areaSlug: string;
  url: string;
  geometryType: "point" | "polygon";
  color: string;
  description: string;
  popupTitleKey: string;
  popupFields: { key: string; label: string }[];
};

export const gisLayers: GisLayerConfig[] = [
  {
    id: "water-quality",
    name: "Water Quality Monitoring",
    areaSlug: "urban-water-quality",
    url: "/data/water-quality-points.geojson",
    geometryType: "point",
    color: "#1e7290",
    description: "Water quality index readings across major urban water bodies.",
    popupTitleKey: "name",
    popupFields: [
      { key: "wqi", label: "Water Quality Index" },
      { key: "status", label: "Status" },
      { key: "note", label: "Note" },
    ],
  },
  {
    id: "flood-risk",
    name: "Flood Risk Zones",
    areaSlug: "geoai-remote-sensing",
    url: "/data/flood-risk-zones.geojson",
    geometryType: "polygon",
    color: "#457a38",
    description: "GeoAI-derived seasonal flood risk corridors.",
    popupTitleKey: "name",
    popupFields: [
      { key: "risk", label: "Risk level" },
      { key: "note", label: "Note" },
    ],
  },
  {
    id: "rainwater-sites",
    name: "Rainwater Harvesting Sites",
    areaSlug: "water-sustainability",
    url: "/data/rainwater-sites.geojson",
    geometryType: "point",
    color: "#5b9a48",
    description: "Candidate & active rainwater harvesting sites by suitability.",
    popupTitleKey: "name",
    popupFields: [
      { key: "suitability", label: "Suitability" },
      { key: "note", label: "Note" },
    ],
  },
  {
    id: "climate-health",
    name: "Climate & Health Risk Districts",
    areaSlug: "climate-health",
    url: "/data/climate-health-districts.geojson",
    geometryType: "polygon",
    color: "#b45309",
    description: "District-level climate-linked health risk indicators.",
    popupTitleKey: "name",
    popupFields: [
      { key: "riskIndex", label: "Risk index" },
      { key: "note", label: "Note" },
    ],
  },
];
