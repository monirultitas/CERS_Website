import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import Container from "@/components/layout/Container";
import ProcessSteps from "@/components/about/ProcessSteps";
import TeamGrid from "@/components/about/TeamGrid";
import { aboutImage } from "@/lib/media";

export const metadata: Metadata = {
  title: "About",
  description:
    "CERS is a Dhaka-based nonprofit turning satellite imagery and geospatial analysis into evidence-based environmental policy for Bangladesh.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About CERS"
        title="A geospatial research group with its feet in the field."
        description="We read landscapes from orbit, then walk them — pairing remote sensing with environmental chemistry to give policymakers evidence they can trust."
        image={aboutImage.src}
        imageAlt={aboutImage.alt}
        photoCredit={aboutImage.credit}
      />

      <section className="bg-white py-20">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="font-display text-3xl font-bold text-ink-900">Our story</h2>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-ink-600">
              <p>
                CERS — the Center for Environmental Research &amp; Sustainability — was founded
                on a simple premise: Bangladesh&rsquo;s environmental and public-health challenges
                are fundamentally spatial. Water pollution, flood risk, groundwater stress, and
                heat exposure all vary block by block across a rapidly urbanizing landscape, and
                policy built on averages misses that variation entirely.
              </p>
              <p>
                So we lead with geospatial intelligence — satellite imagery, GeoAI, and spatial
                analysis — to see where problems actually concentrate. Environmental chemistry and
                field sampling then ground-truth what the imagery shows, turning pixels into
                defensible, publishable evidence.
              </p>
              <p>
                That evidence feeds directly into the policy process: water utilities, city
                planners, and public-health agencies working across urban water quality, water
                sustainability, and climate &amp; health.
              </p>
            </div>
          </div>

          <aside className="rounded-2xl border border-ink-100 bg-ink-50/60 p-8">
            <h3 className="font-display text-lg font-semibold text-ink-900">At a glance</h3>
            <dl className="mt-6 space-y-5">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-ink-400">
                  Based in
                </dt>
                <dd className="mt-1 text-sm text-ink-700">Dhaka, Bangladesh</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-ink-400">
                  Core discipline
                </dt>
                <dd className="mt-1 text-sm text-ink-700">GIS &amp; Remote Sensing</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-ink-400">
                  Supporting discipline
                </dt>
                <dd className="mt-1 text-sm text-ink-700">Environmental Chemistry</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-ink-400">
                  Structure
                </dt>
                <dd className="mt-1 text-sm text-ink-700">Registered nonprofit</dd>
              </div>
            </dl>
          </aside>
        </Container>
      </section>

      <ProcessSteps />
      <TeamGrid />
    </>
  );
}
