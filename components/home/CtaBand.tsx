import Link from "next/link";
import Container from "@/components/layout/Container";

export default function CtaBand() {
  return (
    <section className="relative overflow-hidden bg-moss-900 py-20">
      <div className="bg-geo-grid absolute inset-0 opacity-10" />
      <Container className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
        <div className="max-w-xl">
          <h2 className="font-display text-3xl font-bold text-white">
            Working on climate, water, or land-use policy in Bangladesh?
          </h2>
          <p className="mt-3 text-moss-100">
            Let&rsquo;s talk about how satellite-derived data and geospatial analysis can support
            your work.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/contact"
            className="rounded-full bg-white px-6 py-3.5 text-center text-sm font-semibold text-moss-900 transition-colors hover:bg-moss-50"
          >
            Get in touch
          </Link>
          <Link
            href="/projects"
            className="rounded-full border border-white/30 px-6 py-3.5 text-center text-sm font-semibold text-white transition-colors hover:border-white/50 hover:bg-white/10"
          >
            See our projects
          </Link>
        </div>
      </Container>
    </section>
  );
}
