export const siteConfig = {
  shortName: "CERS",
  fullName: "Center for Environmental Research & Sustainability",
  tagline: "Geospatial Intelligence for Climate Resilience in Bangladesh",
  description:
    "CERS is a Bangladesh-based nonprofit turning satellite data and geospatial analysis into evidence-based environmental policy with applied environmental chemistry (water quality, pollution) as supporting context.",
  url: "https://cersbd.org",
  email: "info@cersbd.org",
  phones: ["+880 1811-617885", "+880 1911-617885"],
  address: "House 17-18, Road 03, Chandrima Model Town, Mohammadpur, Dhaka 1207, Bangladesh",
} as const;

export type NavItem = {
  label: string;
  href: string;
};

// Flat list, used by the footer.
export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Research", href: "/research" },
  { label: "Projects", href: "/projects" },
  { label: "GIS Explorer", href: "/gis-explorer" },
  { label: "Satellite Comparator", href: "/satellite-comparator" },
  { label: "GIS Lab", href: "/gis-lab" },
  { label: "Fun Facts", href: "/fun-facts" },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
];

// Grouped structure, used by the header's dropdown menus. Only real, live pages
// are listed; new sub-items get added to their group as each is built out.
export type NavLink = { label: string; href: string; description?: string };
export type NavGroup = { label: string; items: NavLink[] };
export type NavEntry = NavLink | NavGroup;

export function isNavGroup(entry: NavEntry): entry is NavGroup {
  return (entry as NavGroup).items !== undefined;
}

export const navigation: NavEntry[] = [
  {
    label: "Research",
    items: [
      { label: "Research Themes", href: "/research", description: "Our four research pillars" },
      { label: "Projects", href: "/projects", description: "Active & completed work, mapped" },
    ],
  },
  {
    label: "Data & Tools",
    items: [
      { label: "GIS Explorer", href: "/gis-explorer", description: "Live interactive map layers" },
      {
        label: "Satellite Comparator",
        href: "/satellite-comparator",
        description: "Before & after imagery",
      },
      { label: "GIS Lab", href: "/gis-lab", description: "Learn GIS by playing" },
    ],
  },
  {
    label: "Knowledge Hub",
    items: [
      { label: "News & Events", href: "/news", description: "Field notes and updates" },
      { label: "Fun Facts", href: "/fun-facts", description: "Bangladesh, from orbit" },
    ],
  },
  { label: "About", href: "/about" },
];

export type ResearchArea = {
  slug: string;
  name: string;
  short: string;
  isCore: boolean;
};

export const researchAreas: ResearchArea[] = [
  {
    slug: "geoai-remote-sensing",
    name: "GeoAI & Remote Sensing",
    short: "Satellite imagery, machine learning, and spatial analysis at the core of everything we build.",
    isCore: true,
  },
  {
    slug: "urban-water-quality",
    name: "Urban Water Quality",
    short: "Pollution monitoring and water health assessment, grounded in environmental chemistry.",
    isCore: false,
  },
  {
    slug: "water-sustainability",
    name: "Water Sustainability",
    short: "Rainwater harvesting and groundwater solutions for a rapidly urbanizing Bangladesh.",
    isCore: false,
  },
  {
    slug: "climate-health",
    name: "Climate & Health",
    short: "Nutrition surveillance and disease mapping under a changing climate.",
    isCore: false,
  },
];
