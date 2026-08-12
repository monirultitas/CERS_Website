import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import Container from "@/components/layout/Container";
import Quiz from "@/components/shared/Quiz";
import SpotTheLocationGame from "@/components/gis-lab/SpotTheLocationGame";
import { areaImages } from "@/lib/media";
import { quizQuestions } from "@/lib/gis-lab-content";

const heroImage = areaImages["urban-water-quality"];

export const metadata: Metadata = {
  title: "GIS Lab",
  description:
    "Learn GIS and remote sensing playfully: test your knowledge with a quiz and try to pinpoint Dhaka landmarks on the map.",
};

export default function GisLabPage() {
  return (
    <>
      <PageHero
        eyebrow="Learn by playing"
        title="GIS Lab"
        description="Two quick games: one tests what you know about GIS and remote sensing, the other tests how well you know Dhaka's geography."
        image={heroImage.src}
        imageAlt={heroImage.alt}
        photoCredit={heroImage.credit}
      />

      <section className="bg-white py-16">
        <Container className="space-y-16">
          <div>
            <h2 className="font-display text-2xl font-bold text-ink-900">Spot the location</h2>
            <p className="mt-2 max-w-2xl text-justify text-ink-500">
              We&rsquo;ll name a Dhaka landmark. Click where you think it is. Closer guesses score
              more points.
            </p>
            <div className="mt-6">
              <SpotTheLocationGame />
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-ink-900">GIS &amp; remote sensing quiz</h2>
            <p className="mt-2 max-w-2xl text-ink-500">
              Eight questions covering the concepts behind our research, from raster data to
              GeoAI.
            </p>
            <div className="mt-6 max-w-xl">
              <Quiz
                questions={quizQuestions}
                perfectMessage="Perfect score! You think in pixels and polygons."
                passMessage="Solid grasp of the fundamentals."
                failMessage="A good start. The concepts sink in fast with practice."
              />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
