import Image from "next/image";
import Link from "next/link";
import Container from "@/components/layout/Container";
import Logo from "@/components/layout/Logo";
import { siteConfig } from "@/lib/site-config";
import { areaImages } from "@/lib/media";

const heroImage = areaImages["geoai-remote-sensing"];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink-950">
      <div className="bg-geo-grid absolute inset-0 opacity-20" />
      <div
        className="pointer-events-none absolute -right-40 -top-40 h-[560px] w-[560px] rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--color-brand-600), transparent 70%)" }}
      />

      <Container className="relative grid grid-cols-1 items-center gap-12 py-24 lg:grid-cols-2 lg:py-32">
        <div>
          <Logo variant="light" height={40} className="mb-7" />
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-700/60 bg-brand-950/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-300">
            GIS &amp; Remote Sensing Research
          </span>
          <h1 className="font-display mt-6 max-w-xl text-4xl font-bold leading-[1.1] text-white sm:text-5xl">
            {siteConfig.tagline}
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-300">
            {siteConfig.fullName} ({siteConfig.shortName}) turns satellite imagery and geospatial
            analysis into evidence-based environmental policy — with applied environmental
            chemistry, like water quality and pollution monitoring, as supporting context.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/gis-explorer"
              className="rounded-full bg-brand-500 px-6 py-3.5 text-center text-sm font-semibold text-ink-950 transition-colors hover:bg-brand-400"
            >
              Explore the GIS Map
            </Link>
            <Link
              href="/research"
              className="rounded-full border border-white/20 px-6 py-3.5 text-center text-sm font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/5"
            >
              Our Research
            </Link>
          </div>
        </div>

        <div className="relative mx-auto hidden aspect-[4/5] w-full max-w-md lg:block">
          <div className="absolute inset-0 overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
            <Image
              src={heroImage.src}
              alt={heroImage.alt}
              fill
              priority
              sizes="(min-width: 1024px) 28rem, 0px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/10 to-transparent" />
          </div>
          <span className="absolute left-5 top-5 rounded-full bg-ink-950/70 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-brand-200 backdrop-blur">
            Satellite radar imagery
          </span>
          <span className="absolute bottom-4 right-5 text-[11px] text-ink-300">
            {heroImage.credit}
          </span>
        </div>
      </Container>
    </section>
  );
}
