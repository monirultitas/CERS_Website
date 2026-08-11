import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/layout/PageHero";
import Container from "@/components/layout/Container";
import { getProject, projects } from "@/lib/projects-content";
import { getResearchDetail } from "@/lib/research-content";
import { areaImages } from "@/lib/media";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: project.title, description: project.summary };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const area = getResearchDetail(project.areaSlug);
  const image = areaImages[project.areaSlug];

  return (
    <>
      <PageHero
        eyebrow={area?.name ?? "Project"}
        title={project.title}
        description={project.summary}
        image={image?.src}
        imageAlt={image?.alt}
        photoCredit={image?.credit}
      />

      <section className="bg-white py-20">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="font-display text-2xl font-bold text-ink-900">About this project</h2>
            <div className="mt-4 space-y-5 text-base leading-relaxed text-ink-600">
              {project.description.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <h2 className="font-display mt-12 text-2xl font-bold text-ink-900">Highlights</h2>
            <ul className="mt-4 space-y-3">
              {project.highlights.map((item) => (
                <li key={item} className="flex gap-3 text-base leading-relaxed text-ink-600">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-moss-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-ink-100 bg-ink-50/60 p-8">
              <dl className="space-y-5">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-ink-400">
                    Status
                  </dt>
                  <dd
                    className={`mt-1 text-sm font-medium ${
                      project.status === "Ongoing" ? "text-moss-600" : "text-ink-600"
                    }`}
                  >
                    {project.status}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-ink-400">
                    Timeframe
                  </dt>
                  <dd className="mt-1 text-sm text-ink-700">{project.timeframe}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-ink-400">
                    Location
                  </dt>
                  <dd className="mt-1 text-sm text-ink-700">{project.location}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-ink-400">
                    Research pillar
                  </dt>
                  <dd className="mt-1 text-sm text-ink-700">
                    {area && (
                      <Link href={`/research/${area.slug}`} className="text-brand-700 hover:underline">
                        {area.name}
                      </Link>
                    )}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-ink-400">
                    Partners
                  </dt>
                  <dd className="mt-1 text-sm text-ink-700">{project.partners.join(", ")}</dd>
                </div>
              </dl>
            </div>
          </aside>
        </Container>

        <Container className="mt-16 border-t border-ink-100 pt-10">
          <Link href="/projects" className="text-sm font-semibold text-brand-700 hover:text-brand-800">
            ← All projects
          </Link>
        </Container>
      </section>
    </>
  );
}
