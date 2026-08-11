import { ReactNode } from "react";
import Image from "next/image";
import Container from "./Container";

export default function PageHero({
  eyebrow,
  title,
  description,
  children,
  image,
  imageAlt,
  photoCredit,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  children?: ReactNode;
  /** Optional full-bleed background photo, e.g. from /public/images */
  image?: string;
  imageAlt?: string;
  /** e.g. "Photo: ESA / CC BY-SA 3.0 IGO" — shown as a small caption over the image */
  photoCredit?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-ink-950 py-20">
      {image && (
        <>
          <Image
            src={image}
            alt={imageAlt ?? ""}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/80 to-ink-950/40" />
        </>
      )}
      <div className="bg-geo-grid absolute inset-0 opacity-15" />
      <Container className="relative">
        <span className="inline-flex items-center gap-2 rounded-full border border-brand-700/60 bg-brand-950/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-300">
          {eyebrow}
        </span>
        <h1 className="font-display mt-5 max-w-2xl text-4xl font-bold leading-tight text-white sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-300">{description}</p>
        )}
        {children}
      </Container>
      {image && photoCredit && (
        <span className="absolute bottom-3 right-4 text-[11px] text-ink-400">{photoCredit}</span>
      )}
    </section>
  );
}
