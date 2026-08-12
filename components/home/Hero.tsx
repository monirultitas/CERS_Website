import Image from "next/image";
import Link from "next/link";
import Container from "@/components/layout/Container";
import { siteConfig } from "@/lib/site-config";
import { areaImages } from "@/lib/media";

const heroImage = areaImages["geoai-remote-sensing"];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink-950">
      <Image
        src={heroImage.src}
        alt={heroImage.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/85 to-ink-950/50" />
      <div className="bg-geo-grid absolute inset-0 opacity-10" />

      <Container className="relative grid grid-cols-1 items-center gap-10 py-16 lg:grid-cols-2 lg:py-20">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-700/60 bg-brand-950/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-300">
            GIS &amp; Remote Sensing Research
          </span>
          <h1 className="font-display mt-5 max-w-lg text-2xl font-bold leading-[1.2] text-white sm:text-3xl">
            {siteConfig.tagline}
          </h1>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-200 sm:text-base">
            {siteConfig.fullName} ({siteConfig.shortName}) turns satellite imagery and geospatial
            analysis into evidence-based environmental policy — with applied environmental
            chemistry, like water quality and pollution monitoring, as supporting context.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/gis-explorer"
              className="rounded-full bg-brand-500 px-5 py-3 text-center text-sm font-semibold text-ink-950 transition-colors hover:bg-brand-400"
            >
              Explore the GIS Map
            </Link>
            <Link
              href="/research"
              className="rounded-full border border-white/20 px-5 py-3 text-center text-sm font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/5"
            >
              Our Research
            </Link>
          </div>
        </div>

        <div className="relative mx-auto hidden aspect-square w-full max-w-sm lg:block">
          <div className="animate-float-slow h-full w-full">
            <OrbitArt />
          </div>
          <p className="mt-2 max-w-xs text-right text-xs italic leading-snug text-ink-300">
            &ldquo;Near things are more related than distant things.&rdquo;{" "}
            <span className="not-italic text-ink-400">— Tobler&rsquo;s First Law of Geography</span>
          </p>
        </div>
      </Container>

      <span className="absolute bottom-4 right-5 text-[11px] text-ink-300">{heroImage.credit}</span>
    </section>
  );
}

function OrbitArt() {
  return (
    <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="200" cy="200" r="150" stroke="var(--color-brand-700)" strokeWidth="1" opacity="0.5" />

      <g className="animate-orbit-spin">
        <ellipse cx="200" cy="200" rx="150" ry="55" stroke="var(--color-brand-400)" strokeWidth="0.75" opacity="0.6" />
        <circle cx="350" cy="200" r="4.5" fill="var(--color-brand-300)" />
      </g>

      <g className="animate-orbit-spin-reverse">
        <ellipse cx="200" cy="200" rx="150" ry="100" stroke="var(--color-brand-400)" strokeWidth="0.75" opacity="0.5" />
        <circle cx="50" cy="200" r="4" fill="var(--color-moss-400)" />
      </g>

      <circle cx="200" cy="200" r="70" stroke="var(--color-brand-500)" strokeWidth="1" opacity="0.4" />
      <circle cx="200" cy="200" r="7" fill="var(--color-moss-400)" className="animate-pulse" />

      <g>
        <rect x="330" y="55" width="26" height="10" rx="2" fill="var(--color-brand-500)" />
        <rect x="317" y="58" width="10" height="4" fill="var(--color-brand-300)" />
        <rect x="359" y="58" width="10" height="4" fill="var(--color-brand-300)" />
        <circle cx="343" cy="60" r="3" fill="white" className="animate-pulse" />
      </g>
    </svg>
  );
}
