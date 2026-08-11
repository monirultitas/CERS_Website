import Link from "next/link";
import type { ReactNode } from "react";
import Container from "@/components/layout/Container";
import { researchAreas } from "@/lib/site-config";

const icons: Record<string, ReactNode> = {
  "geoai-remote-sensing": (
    <path
      d="M4 14l5-5 3 3 7-7M19 5h-4M19 5v4M6 19l3-3M6 19H3M6 19v-3"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  "urban-water-quality": (
    <path
      d="M12 3s6 6.5 6 11a6 6 0 1 1-12 0c0-4.5 6-11 6-11z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  "water-sustainability": (
    <path
      d="M7 15a4 4 0 0 1 0-8 5 5 0 0 1 9.6-1.6A4.5 4.5 0 0 1 17 15H7z M9 18l-1 2 M13 18l-1 2 M17 18l-1 2"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  "climate-health": (
    <path
      d="M3 12h4l2-5 3 10 2-7 2 4h5"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
};

export default function ResearchGrid() {
  return (
    <section className="bg-ink-50/60 py-20">
      <Container>
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="font-display text-3xl font-bold text-ink-900">Research pillars</h2>
            <p className="mt-2 max-w-lg text-ink-500">
              GIS and remote sensing are the engine; environmental chemistry gives the context.
            </p>
          </div>
          <Link
            href="/research"
            className="text-sm font-semibold text-brand-700 hover:text-brand-800"
          >
            View all research →
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {researchAreas.map((area) => (
            <Link
              key={area.slug}
              href={`/research/${area.slug}`}
              className={`group relative flex flex-col rounded-2xl border p-6 transition-all hover:-translate-y-1 hover:shadow-lg ${
                area.isCore
                  ? "border-brand-700 bg-brand-700 text-white"
                  : "border-ink-100 bg-white text-ink-900 hover:border-brand-200"
              }`}
            >
              {area.isCore && (
                <span className="absolute -top-3 left-6 rounded-full bg-moss-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                  Core Focus
                </span>
              )}
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                className={area.isCore ? "text-brand-200" : "text-brand-600"}
              >
                {icons[area.slug]}
              </svg>
              <h3 className="font-display mt-4 text-lg font-semibold">{area.name}</h3>
              <p
                className={`mt-2 text-sm leading-relaxed ${
                  area.isCore ? "text-brand-100" : "text-ink-500"
                }`}
              >
                {area.short}
              </p>
              <span
                className={`mt-4 text-sm font-semibold ${
                  area.isCore ? "text-white" : "text-brand-700"
                }`}
              >
                Learn more →
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
