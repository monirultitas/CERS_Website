// Placeholder project content standing in for Sanity `project` documents until Phase 8.

export type ProjectStatus = "Ongoing" | "Completed";

export type Project = {
  slug: string;
  title: string;
  areaSlug: string;
  status: ProjectStatus;
  timeframe: string;
  location: string;
  summary: string;
  description: string[];
  partners: string[];
  highlights: string[];
};

export const projects: Project[] = [
  {
    slug: "dhaka-water-body-health-monitoring",
    title: "Dhaka Water Body Health Monitoring",
    areaSlug: "urban-water-quality",
    status: "Ongoing",
    timeframe: "2019 – Present",
    location: "Dhaka Metropolitan Area",
    summary:
      "A six-year satellite time series tracking organic pollution and eutrophication across Dhaka's urban canals and lakes.",
    description: [
      "This project builds a continuous, satellite-derived record of water quality across Dhaka's urban water bodies, combining Google Earth Engine processing with field-based chemistry sampling for validation.",
      "The resulting time series lets city agencies see not just where water quality is poor, but how fast it's deteriorating, and where interventions have measurably helped.",
    ],
    partners: ["Local water utilities", "City environmental agencies"],
    highlights: [
      "Six years of continuous satellite-derived water quality indices",
      "Field-validated against lab water chemistry",
      "Feeding directly into pollution-source policy briefs",
    ],
  },
  {
    slug: "geoai-flood-risk-mapping",
    title: "GeoAI Flood Risk Mapping",
    areaSlug: "geoai-remote-sensing",
    status: "Ongoing",
    timeframe: "2024 – Present",
    location: "Greater Dhaka & river corridors",
    summary:
      "Machine learning models over satellite land cover to flag high-risk flood corridors ahead of monsoon season.",
    description: [
      "Combining Sentinel-1 radar and Sentinel-2 optical imagery with elevation and land-cover data, this project trains machine-learning models to forecast flood-prone corridors before monsoon onset.",
      "Outputs are packaged as risk maps for early-warning use by local disaster-management offices.",
    ],
    partners: ["Disaster management offices"],
    highlights: [
      "Radar + optical satellite fusion for all-weather monitoring",
      "Pre-monsoon risk maps delivered on a seasonal cadence",
      "Open geospatial pipeline built on Google Earth Engine & Python",
    ],
  },
  {
    slug: "urban-rainwater-harvesting-resilience",
    title: "Urban Rainwater Harvesting for Groundwater Resilience",
    areaSlug: "water-sustainability",
    status: "Ongoing",
    timeframe: "2023 – Present",
    location: "Mohammadpur & surrounding wards",
    summary:
      "Site suitability mapping and groundwater modeling to ease urban aquifer pressure through decentralized rainwater capture.",
    description: [
      "As Dhaka's built footprint expands, groundwater recharge keeps shrinking. This project maps viable rainwater harvesting sites at the ward level and models their potential contribution to aquifer recharge.",
      "We work directly with communities and local utilities to pilot decentralized harvesting infrastructure at priority sites.",
    ],
    partners: ["Ward-level community groups", "Local utilities"],
    highlights: [
      "GIS suitability mapping down to the ward level",
      "Groundwater recharge potential modeling",
      "Active community pilot sites",
    ],
  },
  {
    slug: "climate-linked-nutrition-disease-surveillance",
    title: "Climate-Linked Nutrition & Disease Surveillance",
    areaSlug: "climate-health",
    status: "Ongoing",
    timeframe: "2022 – Present",
    location: "Dhaka & flood-prone districts",
    summary:
      "Mapping nutrition and disease patterns against climate and environmental stressors to target public-health interventions.",
    description: [
      "Heat, flooding, and water access shape health outcomes in ways that are highly local. This project overlays nutrition surveillance and disease-incidence data with environmental and climate layers to identify where risk concentrates.",
      "The resulting maps support early-warning indicators for public-health agencies working in climate-vulnerable districts.",
    ],
    partners: ["Public health agencies"],
    highlights: [
      "Spatial epidemiology combined with satellite environmental data",
      "District-level early-warning indicators",
      "Supports targeted, rather than blanket, intervention planning",
    ],
  },
  {
    slug: "dhaka-metro-land-cover-change",
    title: "Dhaka Metro Land Cover Change Detection",
    areaSlug: "geoai-remote-sensing",
    status: "Completed",
    timeframe: "2021 – 2023",
    location: "Dhaka Metropolitan Area",
    summary:
      "A baseline land-cover change dataset tracking urban expansion, green space loss, and water body shrinkage across metro Dhaka.",
    description: [
      "This foundational study built a multi-year land-cover classification of the Dhaka metro area from Landsat and Sentinel-2 imagery, establishing the baseline dataset that later projects build on.",
      "Findings quantified the rate of green space and water body loss to rapid urban expansion, informing subsequent water and climate research.",
    ],
    partners: ["Urban planning bodies"],
    highlights: [
      "Multi-year land-cover classification baseline",
      "Quantified green space & water body loss",
      "Dataset reused across multiple later CERS projects",
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
