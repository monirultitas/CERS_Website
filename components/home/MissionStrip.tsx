import Container from "@/components/layout/Container";

const values = [
  {
    title: "Scientific integrity",
    desc: "Peer-grounded methods behind every dataset and map we publish.",
  },
  {
    title: "Data innovation",
    desc: "Satellite imagery, GeoAI, and open geospatial tooling pushed into real workflows.",
  },
  {
    title: "Sustainability focus",
    desc: "Research aimed at durable environmental and public-health outcomes.",
  },
  {
    title: "Public impact",
    desc: "Findings translated into policy briefs, not left in the lab.",
  },
];

export default function MissionStrip() {
  return (
    <section className="border-b border-ink-100 bg-white py-20">
      <Container>
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-bold text-ink-900">
            Near things are more related than distant things.
          </h2>
          <p className="mt-2 text-sm text-ink-400">
            Tobler&rsquo;s First Law of Geography, the spatial premise behind everything CERS
            builds.
          </p>
          <p className="mt-6 text-justify text-base leading-relaxed text-ink-600">
            {`We're a Dhaka-based nonprofit that reads landscapes from orbit, turning satellite
            imagery and geospatial analysis into evidence policymakers can act on. Environmental
            chemistry, water quality, and pollution work sit downstream of that core geospatial
            capability, giving the numbers ground-truth.`}
          </p>
        </div>

        <dl className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <div key={v.title} className="border-l-2 border-brand-500 pl-5">
              <dt className="font-display text-base font-semibold text-ink-900">{v.title}</dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-ink-500">{v.desc}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
