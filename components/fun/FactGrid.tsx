import { funFacts } from "@/lib/fun-facts-content";

export default function FactGrid() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {funFacts.map((item) => (
        <div
          key={item.title}
          className="rounded-2xl border border-ink-100 p-6 transition-colors hover:border-brand-200"
        >
          <span className="text-3xl" aria-hidden="true">
            {item.emoji}
          </span>
          <h3 className="font-display mt-3 text-base font-semibold text-ink-900">
            {item.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-500">{item.fact}</p>
        </div>
      ))}
    </div>
  );
}
