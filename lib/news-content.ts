// Placeholder news/blog content standing in for Sanity `post` documents until Phase 8.
// `body` is a simple paragraph array now; Phase 8 swaps this for Portable Text without
// changing the page shell.

export type NewsPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  author: string;
  tags: string[];
  body: string[];
};

export const newsPosts: NewsPost[] = [
  {
    slug: "geoai-flood-risk-modeling",
    title: "GeoAI Models for Seasonal Flood Risk",
    excerpt:
      "Combining satellite-derived land cover with machine learning to flag high-risk flood corridors ahead of monsoon season.",
    category: "GeoAI & Remote Sensing",
    date: "2026-03-27",
    author: "Shuvo Kumar Chowdhury",
    tags: ["GeoAI", "Flood Risk", "Remote Sensing"],
    body: [
      "Ahead of this year's monsoon season, our GIS team trained a machine-learning model over fused Sentinel-1 radar and Sentinel-2 optical imagery to flag flood-prone corridors across greater Dhaka before the rains arrive.",
      "Radar imagery lets the model see through cloud cover, which is exactly when optical satellites are least useful — during active storm systems. Combining both data sources gives a more reliable all-weather read on where water is likely to pool.",
      "The resulting risk map has been shared with local disaster-management offices as an early-warning input, and we'll be publishing an accuracy assessment once this season's ground-truth data comes in.",
    ],
  },
  {
    slug: "dhaka-water-body-pollution-2019-2025",
    title: "Mapping Organic Pollution & Eutrophication in Dhaka's Water Bodies",
    excerpt:
      "A six-year remote sensing time series (2019–2025) built on Google Earth Engine and Python to track urban water health.",
    category: "Urban Water Quality",
    date: "2026-05-02",
    author: "Asraf Khan",
    tags: ["Water Quality", "Google Earth Engine", "Time Series"],
    body: [
      "Six years of satellite imagery, processed entirely in Google Earth Engine, now form a continuous record of organic pollution and eutrophication across Dhaka's urban canals and lakes.",
      "Rather than relying on periodic field surveys alone, this project builds satellite-derived water quality indices for every water body in the metro area, updated on a rolling basis and validated against lab-tested field samples.",
      "The findings are stark: several urban water bodies show a measurable acceleration in eutrophication since 2022, correlating closely with unplanned settlement expansion along their banks. A full policy brief is in preparation.",
    ],
  },
  {
    slug: "rainwater-harvesting-urban-resilience",
    title: "Rainwater Harvesting for Urban Resilience",
    excerpt:
      "How decentralized rainwater capture can ease groundwater pressure as Dhaka's urban footprint keeps expanding.",
    category: "Water Sustainability",
    date: "2026-06-18",
    author: "Subrata Debnath",
    tags: ["Rainwater Harvesting", "Groundwater", "Urban Planning"],
    body: [
      "Dhaka's groundwater table has been in steady decline for decades, driven by an urban footprint that keeps outpacing natural recharge. Decentralized rainwater harvesting is one of the few interventions that can be deployed at the building or block level, fast.",
      "Our site suitability mapping identifies where harvesting infrastructure would have the greatest recharge impact, factoring in roof area, soil permeability, and proximity to depleted aquifer zones.",
      "We're now piloting the approach with community partners in a handful of priority wards, with monitoring wells in place to track recharge impact directly.",
    ],
  },
  {
    slug: "climate-health-early-warning-pilot",
    title: "Piloting a Climate-Linked Health Early-Warning Indicator",
    excerpt:
      "A first look at overlaying nutrition surveillance and heat exposure data to flag districts at elevated climate-health risk.",
    category: "Climate & Health",
    date: "2026-02-11",
    author: "Md Sayem Ahmmed Ripon",
    tags: ["Climate & Health", "Public Health", "Spatial Epidemiology"],
    body: [
      "Heat, flooding, and water access don't affect health outcomes uniformly — risk concentrates in specific districts shaped by infrastructure, income, and exposure. This pilot overlays nutrition surveillance data with satellite-derived heat and flood exposure layers to surface where that risk is highest.",
      "Early results point to a small number of flood-prone, low-infrastructure districts carrying a disproportionate share of climate-linked health risk — useful signal for agencies deciding where to prioritize interventions with limited resources.",
    ],
  },
  {
    slug: "dhaka-metro-land-cover-baseline-published",
    title: "Dhaka Metro Land Cover Baseline Now Published",
    excerpt:
      "Our multi-year land-cover classification dataset — the foundation several other CERS projects build on — is now complete.",
    category: "GeoAI & Remote Sensing",
    date: "2025-11-30",
    author: "Zia Mohammad Nazim Uddin",
    tags: ["Land Cover", "Dataset", "Urban Growth"],
    body: [
      "After two years of work, our Dhaka Metro land cover change detection project has reached completion, producing a classified, multi-year dataset built from Landsat and Sentinel-2 imagery.",
      "The headline finding: measurable, accelerating loss of green space and water body area to urban expansion over the study period. But just as important, this dataset now underpins the flood-risk and water-quality work published since.",
      "The classified layers are available to research and policy partners on request — reach out via our contact page.",
    ],
  },
];

export function getNewsPost(slug: string) {
  return newsPosts.find((p) => p.slug === slug);
}

export function latestNews(count: number) {
  return [...newsPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
}
