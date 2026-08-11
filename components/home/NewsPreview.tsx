import Link from "next/link";
import Container from "@/components/layout/Container";
import { latestNews } from "@/lib/news-content";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

export default function NewsPreview() {
  const posts = latestNews(3);

  return (
    <section className="bg-white py-20">
      <Container>
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="font-display text-3xl font-bold text-ink-900">
              News &amp; field notes
            </h2>
            <p className="mt-2 max-w-lg text-ink-500">
              Latest research updates from the field and from the pixel grid.
            </p>
          </div>
          <Link href="/news" className="text-sm font-semibold text-brand-700 hover:text-brand-800">
            All updates →
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/news/${post.slug}`}
              className="group flex flex-col rounded-2xl border border-ink-100 p-6 transition-all hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg"
            >
              <span className="text-xs font-semibold uppercase tracking-wider text-moss-600">
                {post.category}
              </span>
              <h3 className="font-display mt-3 text-lg font-semibold text-ink-900 group-hover:text-brand-700">
                {post.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-500">{post.excerpt}</p>
              <time dateTime={post.date} className="mt-4 text-xs text-ink-400">
                {dateFormatter.format(new Date(post.date))}
              </time>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
