// Curated, properly-licensed photos (Wikimedia Commons) mapped by research area slug.
// Swap these paths for real CERS photography whenever it's available — same shape.

export type AreaImage = {
  src: string;
  alt: string;
  credit: string;
};

export const areaImages: Record<string, AreaImage> = {
  "geoai-remote-sensing": {
    src: "/images/hero-flood-radar.jpg",
    alt: "ESA Envisat radar satellite image showing flooding across Bangladesh and India",
    credit: "Photo: ESA / CC BY-SA 3.0 IGO",
  },
  "urban-water-quality": {
    src: "/images/water-quality-buriganga.jpg",
    alt: "The Buriganga River in Dhaka, Bangladesh",
    credit: "Photo: Alaminnayemhang / CC BY-SA 4.0",
  },
  "water-sustainability": {
    src: "/images/water-sustainability-rainwater-tank.jpg",
    alt: "A rainwater harvesting tank connected to a piped water supply",
    credit: "Photo: C. Rieck / SuSanA Secretariat / CC BY 2.0",
  },
  "climate-health": {
    src: "/images/climate-health-flood-rescue.jpg",
    alt: "A community member helping move a resident to safety during flash flooding in Sylhet, Bangladesh",
    credit: "Photo: Nayeemibnmatiur / CC BY-SA 4.0",
  },
};

// News posts store category as a display string; map it back to an area slug.
export const categoryToAreaSlug: Record<string, string> = {
  "GeoAI & Remote Sensing": "geoai-remote-sensing",
  "Urban Water Quality": "urban-water-quality",
  "Water Sustainability": "water-sustainability",
  "Climate & Health": "climate-health",
};

export const aboutImage: AreaImage = {
  src: "/images/about-dhaka-skyline.jpg",
  alt: "Dhaka skyline at night",
  credit: "Photo: Md. Ishtiaque Mahmood Rohan / CC BY 3.0",
};

export const projectsImage: AreaImage = {
  src: "/images/ganges-delta.jpg",
  alt: "Copernicus Sentinel-3 satellite image of the Ganges–Brahmaputra delta and the Bay of Bengal",
  credit: "Photo: ESA / CC BY-SA 3.0 IGO",
};
