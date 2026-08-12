import type { Comparison } from "@/lib/fun-facts-content";

const barColors = ["bg-brand-600", "bg-moss-500"];

export default function CompareBars({ comparison }: { comparison: Comparison }) {
  const max = Math.max(...comparison.stats.map((s) => s.value));

  return (
    <div className="rounded-2xl border border-ink-100 p-6">
      <p className="font-display text-sm font-semibold text-ink-900">{comparison.title}</p>
      <p className="text-xs text-ink-400">{comparison.unit}</p>
      <div className="mt-5 space-y-4">
        {comparison.stats.map((stat, i) => (
          <div key={stat.label}>
            <div className="mb-1.5 flex items-center justify-between text-xs">
              <span className="font-medium text-ink-700">{stat.label}</span>
              <span className="font-display font-bold text-ink-900">{stat.displayValue}</span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-ink-50">
              <div
                className={`h-full rounded-full ${barColors[i % barColors.length]}`}
                style={{ width: `${Math.max(6, (stat.value / max) * 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
