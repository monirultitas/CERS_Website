import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import Container from "@/components/layout/Container";
import MapExplorer from "@/components/gis/MapExplorer";
import { areaImages } from "@/lib/media";

const heroImage = areaImages["geoai-remote-sensing"];

export const metadata: Metadata = {
  title: "GIS Explorer",
  description:
    "Explore CERS's geospatial layers: water quality monitoring, flood risk zones, rainwater harvesting sites, and climate & health risk districts across Dhaka.",
};

export default function GisExplorerPage() {
  return (
    <>
      <PageHero
        eyebrow="Interactive Map"
        title="GIS Explorer"
        description="Toggle layers to see how our four research pillars stack across the same city: water quality, flood risk, rainwater harvesting, and climate & health."
        image={heroImage.src}
        imageAlt={heroImage.alt}
        photoCredit={heroImage.credit}
      />

      <section className="bg-white py-16">
        <Container>
          <MapExplorer />
          <p className="mt-4 text-justify text-xs text-ink-400">
            The four research-pillar layers are illustrative sample data standing in for
            CERS&rsquo;s own monitoring feeds. The satellite view, natural events, and earthquake
            layers are live data pulled fresh from NASA and USGS on every visit. Click any point or
            shaded zone for details.
          </p>
        </Container>
      </section>
    </>
  );
}
