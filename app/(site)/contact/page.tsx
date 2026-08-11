import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import Container from "@/components/layout/Container";
import ContactForm from "@/components/contact/ContactForm";
import LocationMap from "@/components/contact/LocationMap";
import { siteConfig } from "@/lib/site-config";
import { aboutImage } from "@/lib/media";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with CERS — Center for Environmental Research & Sustainability.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk about geospatial evidence for your work."
        description="Whether it's a partnership, a data request, or a question about our research, we'd like to hear from you."
        image={aboutImage.src}
        imageAlt={aboutImage.alt}
        photoCredit={aboutImage.credit}
      />

      <section className="bg-white py-20">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <h2 className="font-display text-2xl font-bold text-ink-900">Send a message</h2>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>

          <div className="space-y-8 lg:col-span-2">
            <div className="rounded-2xl border border-ink-100 bg-ink-50/60 p-8">
              <h3 className="font-display text-lg font-semibold text-ink-900">Reach us directly</h3>
              <dl className="mt-6 space-y-5">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-ink-400">
                    Address
                  </dt>
                  <dd className="mt-1 text-sm text-ink-700">{siteConfig.address}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-ink-400">
                    Email
                  </dt>
                  <dd className="mt-1 text-sm">
                    <a href={`mailto:${siteConfig.email}`} className="text-brand-700 hover:underline">
                      {siteConfig.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-ink-400">
                    Phone
                  </dt>
                  <dd className="mt-1 space-y-1 text-sm">
                    {siteConfig.phones.map((phone) => (
                      <a
                        key={phone}
                        href={`tel:${phone.replace(/\s/g, "")}`}
                        className="block text-brand-700 hover:underline"
                      >
                        {phone}
                      </a>
                    ))}
                  </dd>
                </div>
              </dl>
            </div>

            <div>
              <h3 className="font-display mb-3 text-lg font-semibold text-ink-900">
                Find our office
              </h3>
              <LocationMap />
              <p className="mt-2 text-xs text-ink-400">Approximate location.</p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
