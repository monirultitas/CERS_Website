export type ResearchDetail = {
  slug: string;
  name: string;
  tagline: string;
  isCore: boolean;
  overview: string;
  focusAreas: string[];
  toolsAndMethods: string[];
};

export const researchDetails: ResearchDetail[] = [
  {
    slug: "geoai-remote-sensing",
    name: "GeoAI & Remote Sensing",
    tagline: "The engine behind every CERS study: satellite imagery turned into spatial evidence.",
    isCore: true,
    overview:
      "This is the discipline everything else at CERS is built on. We process multispectral and radar satellite imagery, build machine-learning models over spatial data, and turn raw pixels into land cover, water extent, and change-detection layers that the rest of our research runs on top of.",
    focusAreas: [
      "Satellite-derived land cover and land-use change detection",
      "Machine learning models for flood and erosion risk",
      "Cloud-based geospatial processing at scale (Google Earth Engine, Python)",
      "Open geospatial data pipelines for reproducible research",
    ],
    toolsAndMethods: [
      "Google Earth Engine",
      "Python (rasterio, geopandas, scikit-learn)",
      "Sentinel-1/2 & Landsat imagery",
      "QGIS / spatial statistics",
    ],
  },
  {
    slug: "urban-water-quality",
    name: "Urban Water Quality",
    tagline: "Pollution monitoring and water health assessment, grounded in environmental chemistry.",
    isCore: false,
    overview:
      "Applying remote sensing and field-based environmental chemistry together to track pollution and eutrophication in Dhaka's urban water bodies. Satellite-derived water quality indices are validated against lab-tested samples, giving policymakers a defensible read on where water health is deteriorating fastest.",
    focusAreas: [
      "Organic pollution and eutrophication dynamics in urban canals and lakes",
      "Satellite-derived water quality indices, ground-truthed with field sampling",
      "Long-term monitoring time series (2019–present)",
      "Pollution source mapping to support enforcement and policy",
    ],
    toolsAndMethods: [
      "Google Earth Engine water quality indices",
      "Field water sampling & lab chemistry",
      "Time-series trend analysis (Python)",
      "GIS-based source mapping",
    ],
  },
  {
    slug: "water-sustainability",
    name: "Water Sustainability",
    tagline: "Rainwater harvesting and groundwater solutions for a rapidly urbanizing Bangladesh.",
    isCore: false,
    overview:
      "Dhaka's groundwater table is under sustained pressure from urban expansion. We map viable rainwater harvesting sites, model groundwater recharge potential, and work with communities and utilities on decentralized water solutions that ease that pressure.",
    focusAreas: [
      "Site suitability mapping for rainwater harvesting infrastructure",
      "Groundwater recharge and depletion modeling",
      "Urban resilience planning for water scarcity",
      "Community and utility partnership on decentralized solutions",
    ],
    toolsAndMethods: [
      "GIS suitability analysis",
      "Hydrological modeling",
      "Satellite-derived precipitation data",
      "Stakeholder mapping",
    ],
  },
  {
    slug: "climate-health",
    name: "Climate & Health",
    tagline: "Nutrition surveillance and disease mapping under a changing climate.",
    isCore: false,
    overview:
      "Climate variables, including heat, flooding, and water access, shape public health outcomes in ways that are highly local. We map disease and nutrition patterns against environmental and climate data to surface where interventions matter most.",
    focusAreas: [
      "Spatial mapping of climate-sensitive disease patterns",
      "Nutrition surveillance linked to environmental stressors",
      "Heat exposure and vulnerability mapping",
      "Early-warning indicators for climate-linked health risk",
    ],
    toolsAndMethods: [
      "Spatial epidemiology methods",
      "Climate & satellite environmental data",
      "GIS vulnerability mapping",
      "Statistical modeling (R / Python)",
    ],
  },
];

export function getResearchDetail(slug: string) {
  return researchDetails.find((r) => r.slug === slug);
}
