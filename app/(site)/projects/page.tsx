import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/layout/PageHero";
import Container from "@/components/layout/Container";
import ProjectImpactMap from "@/components/gis/ProjectImpactMap";
import { projects } from "@/lib/projects-content";
import { getResearchDetail } from "@/lib/research-content";
import { areaImages } from "@/lib/media";

export const metadata: Metadata = {
  title: "Projects",
  description: "Active and completed CERS research projects across GIS, water, and climate & health.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Projects"
        title="Research in the field, mapped from orbit."
        description="A working record of CERS's active and completed projects, each anchored to one of our four research pillars."
        image={areaImages["water-sustainability"].src}
        imageAlt={areaImages["water-sustainability"].alt}
        photoCredit={areaImages["water-sustainability"].credit}
      />

      <section className="bg-white pt-16">
        <Container>
          <h2 className="font-display text-2xl font-bold text-ink-900">Where we work</h2>
          <p className="mt-2 max-w-2xl text-ink-500">
            Every CERS project on one map. Filter by research theme or status, and click a marker
            to open the project.
          </p>
          <div className="mt-6">
            <ProjectImpactMap />
          </div>
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container>
          <h2 className="font-display text-2xl font-bold text-ink-900">All projects</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            {projects.map((project) => {
              const area = getResearchDetail(project.areaSlug);
              const image = areaImages[project.areaSlug];
              return (
                <Link
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-ink-100 transition-all hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg"
                >
                  {image && (
                    <div className="relative aspect-[16/9] w-full overflow-hidden">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-7">
                    <div className="flex items-center justify-between gap-3">
                      <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                        {area?.name ?? project.areaSlug}
                      </span>
                      <span
                        className={`text-xs font-semibold ${
                          project.status === "Ongoing" ? "text-moss-600" : "text-ink-400"
                        }`}
                      >
                        {project.status}
                      </span>
                    </div>
                    <h2 className="font-display mt-4 text-xl font-semibold text-ink-900 group-hover:text-brand-700">
                      {project.title}
                    </h2>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-500">
                      {project.summary}
                    </p>
                    <div className="mt-5 flex items-center justify-between text-xs text-ink-400">
                      <span>{project.location}</span>
                      <span>{project.timeframe}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}
