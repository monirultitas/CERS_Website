"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Container from "./Container";
import Logo from "./Logo";
import { navigation, isNavGroup, type NavEntry } from "@/lib/site-config";

function entryIsActive(entry: NavEntry, pathname: string | null): boolean {
  if (!pathname) return false;
  if (isNavGroup(entry)) {
    return entry.items.some((i) =>
      i.href === "/" ? pathname === "/" : pathname.startsWith(i.href)
    );
  }
  return entry.href === "/" ? pathname === "/" : pathname.startsWith(entry.href);
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement | null>(null);

  // Close any open desktop dropdown on route change.
  useEffect(() => {
    setOpenGroup(null);
    setMobileOpen(false);
  }, [pathname]);

  // Close desktop dropdown on outside click / Escape.
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenGroup(null);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenGroup(null);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-ink-100 bg-white/90 backdrop-blur-md">
      <Container className="flex h-18 items-center justify-between py-3">
        <Link href="/" className="shrink-0">
          <Logo />
        </Link>

        {/* Desktop nav */}
        <nav ref={navRef} className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {navigation.map((entry) => {
            const active = entryIsActive(entry, pathname);
            if (!isNavGroup(entry)) {
              return (
                <Link
                  key={entry.href}
                  href={entry.href}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "bg-brand-50 text-brand-700"
                      : "text-ink-600 hover:bg-ink-50 hover:text-ink-900"
                  }`}
                >
                  {entry.label}
                </Link>
              );
            }
            const isOpen = openGroup === entry.label;
            return (
              <div key={entry.label} className="relative">
                <button
                  type="button"
                  onClick={() => setOpenGroup(isOpen ? null : entry.label)}
                  aria-expanded={isOpen}
                  className={`flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    active || isOpen
                      ? "bg-brand-50 text-brand-700"
                      : "text-ink-600 hover:bg-ink-50 hover:text-ink-900"
                  }`}
                >
                  {entry.label}
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  >
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {isOpen && (
                  <div className="absolute left-0 top-full mt-2 w-64 rounded-2xl border border-ink-100 bg-white p-2 shadow-xl">
                    {entry.items.map((item) => {
                      const itemActive =
                        item.href === "/" ? pathname === "/" : pathname?.startsWith(item.href);
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`block rounded-xl px-3 py-2.5 transition-colors ${
                            itemActive ? "bg-brand-50" : "hover:bg-ink-50"
                          }`}
                        >
                          <span
                            className={`block text-sm font-semibold ${
                              itemActive ? "text-brand-700" : "text-ink-900"
                            }`}
                          >
                            {item.label}
                          </span>
                          {item.description && (
                            <span className="mt-0.5 block text-xs text-ink-400">
                              {item.description}
                            </span>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <Link
            href="/contact"
            className="rounded-full bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-800"
          >
            Get in touch
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-label="Toggle navigation menu"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-ink-700 hover:bg-ink-50 lg:hidden"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            {mobileOpen ? (
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </Container>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-ink-100 bg-white lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {navigation.map((entry) => {
              if (!isNavGroup(entry)) {
                return (
                  <Link
                    key={entry.href}
                    href={entry.href}
                    className="rounded-lg px-4 py-3 text-base font-medium text-ink-700 hover:bg-ink-50"
                  >
                    {entry.label}
                  </Link>
                );
              }
              return (
                <div key={entry.label} className="border-t border-ink-50 pt-2 first:border-t-0 first:pt-0">
                  <span className="block px-4 pb-1 pt-2 text-xs font-semibold uppercase tracking-wider text-ink-400">
                    {entry.label}
                  </span>
                  {entry.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block rounded-lg px-4 py-2.5 text-base font-medium text-ink-700 hover:bg-ink-50"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              );
            })}
            <Link
              href="/contact"
              className="mt-3 rounded-full bg-brand-700 px-5 py-3 text-center text-base font-semibold text-white"
            >
              Get in touch
            </Link>
          </Container>
        </div>
      )}
    </header>
  );
}
