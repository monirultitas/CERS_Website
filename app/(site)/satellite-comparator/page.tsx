import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import Container from "@/components/layout/Container";
import SatelliteComparator from "@/components/gis/SatelliteComparator";
import { areaImages } from "@/lib/media";

const heroImage = areaImages["geoai-remote-sensing"];

export const metadata: Metadata = {
  title: "Satellite Comparator",
  description:
    "Drag to compare NASA satellite imagery of Bangladesh across seasons and years — watch dry-season land turn to monsoon floodwater for yourself.",
};

export default function SatelliteComparatorPage() {
  return (
    <>
      <PageHero
        eyebrow="Before & After"
        title="See Bangladesh change from orbit."
        description="Pick a place, pick two dates, and drag the slider. Dry season vs monsoon shows the most dramatic change. Imagery is live from NASA."
        image={heroImage.src}
        imageAlt={heroImage.alt}
        photoCredit={heroImage.credit}
      />

      <section className="bg-white py-16">
        <Container>
          <SatelliteComparator />
          <p className="mt-4 text-justify text-xs text-ink-400">
            Imagery: NASA EOSDIS GIBS (MODIS Terra Corrected Reflectance, 250m resolution). Each
            side shows a single day, so an occasional cloudy date may obscure the view — nudge the
            year if so. At 250m this is built for regional change such as monsoon flood extent,
            river migration, and seasonal vegetation rather than street-level detail. The starkest
            contrast is dry season against monsoon, when huge areas of land turn to water.
          </p>
        </Container>
      </section>
    </>
  );
}
