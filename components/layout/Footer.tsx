import Link from "next/link";
import Container from "./Container";
import Logo from "./Logo";
import { navItems, researchAreas, siteConfig } from "@/lib/site-config";

export default function Footer() {
  return (
    <footer className="bg-ink-950 text-ink-200">
      <Container className="grid grid-cols-1 gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo variant="light" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-300">
            {siteConfig.description}
          </p>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
            Navigate
          </h3>
          <ul className="mt-4 space-y-2.5">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-ink-300 hover:text-brand-300">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
            Research
          </h3>
          <ul className="mt-4 space-y-2.5">
            {researchAreas.map((area) => (
              <li key={area.slug}>
                <Link
                  href={`/research/${area.slug}`}
                  className="text-sm text-ink-300 hover:text-brand-300"
                >
                  {area.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
            Contact
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm text-ink-300">
            <li>{siteConfig.address}</li>
            <li>
              <a href={`mailto:${siteConfig.email}`} className="hover:text-brand-300">
                {siteConfig.email}
              </a>
            </li>
            {siteConfig.phones.map((phone) => (
              <li key={phone}>
                <a href={`tel:${phone.replace(/\s/g, "")}`} className="hover:text-brand-300">
                  {phone}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="border-t border-ink-800">
        <Container className="flex flex-col items-center justify-between gap-2 py-6 text-xs text-ink-400 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.fullName} ({siteConfig.shortName}). All
            rights reserved.
          </p>
          <p>Dhaka, Bangladesh</p>
        </Container>
      </div>
    </footer>
  );
}
