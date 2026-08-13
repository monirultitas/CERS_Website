import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import Container from "@/components/layout/Container";
import SatelliteComparator from "@/components/gis/SatelliteComparator";
import { areaImages } from "@/lib/media";

const heroImage = areaImages["geoai-remote-sensing"];

export const metadata: Metadata = {
  title: "Satellite Comparator",
  description:
    "Drag to compare two years of NASA satellite imagery over Bangladesh — see monsoon flood extent, river migration, and seasonal change for yourself.",
};

export default function SatelliteComparatorPage() {
  return (
    <>
      <PageHero
        eyebrow="Before & After"
        title="See Bangladesh change from orbit."
        description="Pick a place, pick two years, and drag the slider. The imagery is live from NASA, updated continuously."
        image={heroImage.src}
        imageAlt={heroImage.alt}
        photoCredit={heroImage.credit}
      />

      <section className="bg-white py-16">
        <Container>
          <SatelliteComparator />
          <p className="mt-4 text-justify text-xs text-ink-400">
            Imagery: NASA EOSDIS GIBS (MODIS Terra Corrected Reflectance, 250m resolution). Both
            sides show mid-January of the chosen year, a low-cloud dry-season window that keeps the
            two dates comparable. At 250m, this view is built for regional change such as monsoon
            flood extent, river migration, and seasonal vegetation rather than street-level detail.
          </p>
        </Container>
      </section>
    </>
  );
}
