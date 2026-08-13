import type { Metadata } from "next";
import Link from "next/link";
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

          <Link
            href="/satellite-comparator"
            className="group mt-8 flex flex-col items-start justify-between gap-4 rounded-2xl bg-brand-700 p-6 text-white transition-colors hover:bg-brand-800 sm:flex-row sm:items-center"
          >
            <div>
              <h3 className="font-display text-lg font-semibold">
                Try the Before &amp; After Satellite Comparator
              </h3>
              <p className="mt-1 text-sm text-brand-100">
                Drag a slider between two years of NASA imagery and watch Bangladesh change from
                orbit.
              </p>
            </div>
            <span className="shrink-0 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-brand-800">
              Open comparator →
            </span>
          </Link>
        </Container>
      </section>
    </>
  );
}
