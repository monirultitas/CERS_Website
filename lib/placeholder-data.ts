// Placeholder content standing in for CMS-driven data until Sanity is wired up in Phase 8.
// News/blog content lives in lib/news-content.ts.

export type Stat = {
  label: string;
  value: string;
};

export const impactStats: Stat[] = [
  { value: "6+", label: "Years of continuous remote sensing time series" },
  { value: "15+", label: "Research & field projects across Bangladesh" },
  { value: "4", label: "Core research pillars, GIS & remote sensing first" },
  { value: "6", label: "Researchers, analysts & GIS specialists on staff" },
];

export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  bio: string;
  /** Path under /public, e.g. "/team/zia.jpg". Omit to fall back to an initials avatar. */
  photo?: string;
};

export const teamMembers: TeamMember[] = [
  {
    slug: "zia-mohammad-nazim-uddin",
    name: "Zia Mohammad Nazim Uddin",
    role: "Research and Program Director",
    bio: "Sets CERS's research agenda and steers projects from field design through to policy delivery.",
  },
  {
    slug: "shuvo-kumar-chowdhury",
    name: "Shuvo Kumar Chowdhury",
    role: "GIS Specialist & Technical Lead",
    bio: "Leads the geospatial pipeline, from satellite data ingestion to the maps you see on this site.",
  },
  {
    slug: "asraf-khan",
    name: "Asraf Khan",
    role: "Geospatial Data Analyst",
    bio: "Processes and analyzes remote sensing datasets underpinning CERS's environmental monitoring work.",
  },
  {
    slug: "subrata-debnath",
    name: "Subrata Debnath",
    role: "Geospatial Research Associate",
    bio: "Supports spatial analysis and research design across CERS's active field projects.",
  },
  {
    slug: "md-sayem-ahmmed-ripon",
    name: "Md Sayem Ahmmed Ripon",
    role: "Geospatial Researcher",
    bio: "Focuses on applying GeoAI and remote sensing methods to urban and environmental research questions.",
  },
  {
    slug: "sabrina-mohammad-amin",
    name: "Sabrina Mohammad Amin",
    role: "Research and Program Associate",
    bio: "Coordinates research programs and helps translate findings into policy-facing outputs.",
  },
];
