import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/layout/PageHero";
import Container from "@/components/layout/Container";
import { latestNews } from "@/lib/news-content";
import { areaImages, categoryToAreaSlug } from "@/lib/media";

export const metadata: Metadata = {
  title: "News",
  description: "Research updates and field notes from CERS, across GIS, water quality, and climate & health.",
};

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

export default function NewsPage() {
  const posts = latestNews(50);

  return (
    <>
      <PageHero
        eyebrow="News"
        title="Field notes, from the pixel grid to the ground."
        description="Updates from active research: new datasets, published findings, and what we're seeing in the field."
        image={areaImages["climate-health"].src}
        imageAlt={areaImages["climate-health"].alt}
        photoCredit={areaImages["climate-health"].credit}
      />

      <section className="bg-white py-20">
        <Container>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => {
              const image = areaImages[categoryToAreaSlug[post.category]];
              return (
                <Link
                  key={post.slug}
                  href={`/news/${post.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-ink-100 transition-all hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg"
                >
                  {image && (
                    <div className="relative aspect-[16/9] w-full overflow-hidden">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <span className="text-xs font-semibold uppercase tracking-wider text-moss-600">
                      {post.category}
                    </span>
                    <h2 className="font-display mt-3 text-lg font-semibold text-ink-900 group-hover:text-brand-700">
                      {post.title}
                    </h2>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-500">
                      {post.excerpt}
                    </p>
                    <div className="mt-5 flex items-center justify-between text-xs text-ink-400">
                      <span>{post.author}</span>
                      <time dateTime={post.date}>{dateFormatter.format(new Date(post.date))}</time>
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
