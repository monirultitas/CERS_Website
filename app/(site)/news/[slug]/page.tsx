import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/layout/PageHero";
import Container from "@/components/layout/Container";
import { getNewsPost, newsPosts } from "@/lib/news-content";
import { areaImages, categoryToAreaSlug } from "@/lib/media";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

export function generateStaticParams() {
  return newsPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getNewsPost(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getNewsPost(slug);
  if (!post) notFound();
  const image = areaImages[categoryToAreaSlug[post.category]];

  return (
    <>
      <PageHero
        eyebrow={post.category}
        title={post.title}
        image={image?.src}
        imageAlt={image?.alt}
        photoCredit={image?.credit}
      >
        <div className="mt-6 flex items-center gap-3 text-sm text-ink-300">
          <span>{post.author}</span>
          <span aria-hidden="true">&middot;</span>
          <time dateTime={post.date}>{dateFormatter.format(new Date(post.date))}</time>
        </div>
      </PageHero>

      <section className="bg-white py-20">
        <Container className="max-w-3xl">
          <div className="space-y-5 text-justify text-base leading-relaxed text-ink-600">
            {post.body.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-ink-50 px-3 py-1.5 text-xs font-medium text-ink-600 ring-1 ring-ink-100"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-16 border-t border-ink-100 pt-10">
            <Link href="/news" className="text-sm font-semibold text-brand-700 hover:text-brand-800">
              ← All news
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
