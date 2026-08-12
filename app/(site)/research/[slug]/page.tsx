import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/layout/PageHero";
import Container from "@/components/layout/Container";
import { getResearchDetail, researchDetails } from "@/lib/research-content";
import { areaImages } from "@/lib/media";

export function generateStaticParams() {
  return researchDetails.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const area = getResearchDetail(slug);
  if (!area) return {};
  return { title: area.name, description: area.tagline };
}

export default async function ResearchDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const area = getResearchDetail(slug);
  if (!area) notFound();
  const image = areaImages[area.slug];

  return (
    <>
      <PageHero
        eyebrow={area.isCore ? "Core Research Focus" : "Research"}
        title={area.name}
        description={area.tagline}
        image={image?.src}
        imageAlt={image?.alt}
        photoCredit={image?.credit}
      />

      <section className="bg-white py-20">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="font-display text-2xl font-bold text-ink-900">Overview</h2>
            <p className="mt-4 text-justify text-base leading-relaxed text-ink-600">{area.overview}</p>

            <h2 className="font-display mt-12 text-2xl font-bold text-ink-900">Focus areas</h2>
            <ul className="mt-4 space-y-3">
              {area.focusAreas.map((item) => (
                <li key={item} className="flex gap-3 text-base leading-relaxed text-ink-600">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <aside className="space-y-8">
            <div className="rounded-2xl border border-ink-100 bg-ink-50/60 p-8">
              <h3 className="font-display text-lg font-semibold text-ink-900">
                Tools &amp; methods
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {area.toolsAndMethods.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-ink-600 ring-1 ring-ink-100"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-brand-700 p-8 text-white">
              <h3 className="font-display text-lg font-semibold">See it on the map</h3>
              <p className="mt-2 text-sm text-brand-100">
                Explore live geospatial layers tied to this research area.
              </p>
              <Link
                href="/gis-explorer"
                className="mt-4 inline-block rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-brand-800 hover:bg-brand-50"
              >
                Open GIS Explorer →
              </Link>
            </div>
          </aside>
        </Container>

        <Container className="mt-16 border-t border-ink-100 pt-10">
          <Link href="/research" className="text-sm font-semibold text-brand-700 hover:text-brand-800">
            ← All research pillars
          </Link>
        </Container>
      </section>
    </>
  );
}
