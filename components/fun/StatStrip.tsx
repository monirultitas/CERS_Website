import { bdVsWorld } from "@/lib/fun-facts-content";

export default function StatStrip() {
  return (
    <div className="grid grid-cols-1 gap-6 rounded-2xl bg-brand-950 p-8 sm:grid-cols-2 lg:grid-cols-4">
      {bdVsWorld.map((stat) => (
        <div key={stat.label}>
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-300">
            {stat.label}
          </p>
          <p className="font-display mt-2 text-xl font-bold text-white">{stat.bd}</p>
          <p className="mt-1 text-xs text-ink-300">{stat.comparison}</p>
        </div>
      ))}
    </div>
  );
}
