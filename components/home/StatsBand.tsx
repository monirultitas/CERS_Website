import Container from "@/components/layout/Container";
import { impactStats } from "@/lib/placeholder-data";

export default function StatsBand() {
  return (
    <section className="bg-brand-950 py-16">
      <Container>
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {impactStats.map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-4xl font-bold text-brand-300">{stat.value}</p>
              <p className="mt-2 text-sm leading-snug text-ink-300">{stat.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
