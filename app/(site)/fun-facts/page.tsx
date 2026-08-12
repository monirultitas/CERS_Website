import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import Container from "@/components/layout/Container";
import FactGrid from "@/components/fun/FactGrid";
import StatStrip from "@/components/fun/StatStrip";
import Quiz from "@/components/shared/Quiz";
import { trivia } from "@/lib/fun-facts-content";
import { areaImages } from "@/lib/media";

const heroImage = areaImages["urban-water-quality"];

export const metadata: Metadata = {
  title: "Fun Facts",
  description:
    "Interesting, surprising, and occasionally silly facts about Bangladesh's geography and environment, plus a trivia quiz to test them.",
};

export default function FunFactsPage() {
  return (
    <>
      <PageHero
        eyebrow="Just for fun"
        title="Bangladesh, from orbit and otherwise."
        description="Not every page here has to be a policy brief. A few things about Bangladesh's geography and environment that are just genuinely interesting — plus a trivia round to see what stuck."
        image={heroImage.src}
        imageAlt={heroImage.alt}
        photoCredit={heroImage.credit}
      />

      <section className="bg-white py-20">
        <Container className="space-y-16">
          <div>
            <h2 className="font-display text-2xl font-bold text-ink-900">At a glance</h2>
            <div className="mt-6">
              <StatStrip />
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-ink-900">Did you know?</h2>
            <p className="mt-2 max-w-2xl text-ink-500">
              Ten facts about Bangladesh&rsquo;s geography, environment, and the satellites that
              watch over it — verified, not just vibes.
            </p>
            <div className="mt-8">
              <FactGrid />
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-ink-900">Trivia round</h2>
            <p className="mt-2 max-w-2xl text-ink-500">
              See how many of the facts above actually stuck.
            </p>
            <div className="mt-6 max-w-xl">
              <Quiz
                questions={trivia}
                perfectMessage="Flawless — you could give the office tour."
                passMessage="Solid! You were paying attention."
                failMessage="Worth a re-read — the facts are right above."
              />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
