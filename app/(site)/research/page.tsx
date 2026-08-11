import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/layout/PageHero";
import Container from "@/components/layout/Container";
import { researchDetails } from "@/lib/research-content";
import { areaImages } from "@/lib/media";

export const metadata: Metadata = {
  title: "Research",
  description:
    "CERS research pillars: GeoAI & Remote Sensing at the core, with Urban Water Quality, Water Sustainability, and Climate & Health as applied focus areas.",
};

export default function ResearchPage() {
  return (
    <>
      <PageHero
        eyebrow="Research"
        title="GIS and remote sensing lead. Everything else builds on it."
        description="Four research pillars, ordered by how our workflow actually runs — from orbit down to policy."
      />

      <section className="bg-white py-20">
        <Container className="space-y-6">
          {researchDetails.map((area, i) => {
            const image = areaImages[area.slug];
            return (
              <Link
                key={area.slug}
                href={`/research/${area.slug}`}
                className={`group flex flex-col gap-5 rounded-2xl border p-8 transition-all hover:-translate-y-0.5 hover:shadow-lg sm:flex-row sm:items-center sm:justify-between ${
                  area.isCore
                    ? "border-brand-700 bg-brand-700 text-white"
                    : "border-ink-100 bg-white hover:border-brand-200"
                }`}
              >
                {image && (
                  <div className="relative h-20 w-32 shrink-0 overflow-hidden rounded-xl sm:order-first">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="128px"
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span
                      className={`font-display text-sm font-bold ${
                        area.isCore ? "text-brand-200" : "text-ink-300"
                      }`}
                    >
                      0{i + 1}
                    </span>
                    {area.isCore && (
                      <span className="rounded-full bg-moss-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                        Core Focus
                      </span>
                    )}
                  </div>
                  <h2
                    className={`font-display mt-2 text-2xl font-bold ${
                      area.isCore ? "text-white" : "text-ink-900"
                    }`}
                  >
                    {area.name}
                  </h2>
                  <p className={`mt-2 max-w-xl ${area.isCore ? "text-brand-100" : "text-ink-500"}`}>
                    {area.tagline}
                  </p>
                </div>
                <span
                  className={`shrink-0 text-sm font-semibold ${
                    area.isCore ? "text-white" : "text-brand-700"
                  }`}
                >
                  Explore →
                </span>
              </Link>
            );
          })}
        </Container>
      </section>
    </>
  );
}
