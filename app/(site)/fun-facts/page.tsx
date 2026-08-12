import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import Container from "@/components/layout/Container";
import FunFactsMap from "@/components/fun/FunFactsMap";
import FactGrid from "@/components/fun/FactGrid";
import CompareBars from "@/components/fun/CompareBars";
import Quiz from "@/components/shared/Quiz";
import { comparisons, trivia } from "@/lib/fun-facts-content";
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
        description="Not every page here has to be a policy brief. Tap a pin, flip a card, or try the quiz."
        image={heroImage.src}
        imageAlt={heroImage.alt}
        photoCredit={heroImage.credit}
      />

      <section className="bg-white py-20">
        <Container className="space-y-16">
          <div>
            <h2 className="font-display text-2xl font-bold text-ink-900">Tap a pin</h2>
            <p className="mt-2 max-w-2xl text-ink-500">
              Four places on the map, four facts worth knowing.
            </p>
            <div className="mt-6">
              <FunFactsMap />
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-ink-900">At a glance</h2>
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {comparisons.map((c) => (
                <CompareBars key={c.title} comparison={c} />
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-ink-900">More to tap through</h2>
            <div className="mt-6">
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
                perfectMessage="Flawless! You could give the office tour."
                passMessage="Solid! You were paying attention."
                failMessage="Worth a re-read. The facts are right above."
              />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
