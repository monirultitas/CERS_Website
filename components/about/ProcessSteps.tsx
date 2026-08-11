import Container from "@/components/layout/Container";

const steps = [
  {
    n: "01",
    title: "Capture from orbit",
    desc: "Satellite imagery and remote sensing time series form the base layer of every study.",
  },
  {
    n: "02",
    title: "Ground-truth in the field",
    desc: "Water quality sampling and environmental chemistry validate what the pixels show.",
  },
  {
    n: "03",
    title: "Model with GeoAI",
    desc: "Machine learning and spatial analysis turn raw layers into risk maps and forecasts.",
  },
  {
    n: "04",
    title: "Deliver for policy",
    desc: "Findings are packaged as briefs and dashboards decision-makers can actually use.",
  },
];

export default function ProcessSteps() {
  return (
    <section className="bg-ink-50/60 py-20">
      <Container>
        <h2 className="font-display text-3xl font-bold text-ink-900">How we work</h2>
        <p className="mt-2 max-w-lg text-ink-500">
          A geospatial-first pipeline, with environmental chemistry as ground-truth.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div key={step.n} className="relative">
              <span className="font-display text-4xl font-bold text-brand-200">{step.n}</span>
              <h3 className="font-display mt-3 text-lg font-semibold text-ink-900">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">{step.desc}</p>
              {i < steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute right-[-1rem] top-2 hidden text-brand-300 lg:block"
                >
                  →
                </span>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
