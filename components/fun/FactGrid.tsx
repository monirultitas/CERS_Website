"use client";

import { useState } from "react";
import { funFacts } from "@/lib/fun-facts-content";

export default function FactGrid() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
      {funFacts.map((item, i) => {
        const open = openIndex === i;
        return (
          <button
            key={item.title}
            type="button"
            onClick={() => setOpenIndex(open ? null : i)}
            aria-expanded={open}
            className={`flex flex-col items-center rounded-2xl border p-5 text-center transition-all ${
              open
                ? "col-span-2 row-span-1 border-brand-300 bg-brand-50 sm:col-span-3 lg:col-span-3"
                : "border-ink-100 hover:border-brand-200 hover:shadow-md"
            }`}
          >
            <span className="text-4xl" aria-hidden="true">
              {item.emoji}
            </span>
            <span className="font-display mt-3 text-sm font-semibold text-ink-900">
              {item.short}
            </span>
            {open && (
              <span className="mt-3 block text-justify text-xs leading-relaxed text-ink-600">
                <span className="font-display block text-sm font-semibold text-ink-900">
                  {item.title}
                </span>
                <span className="mt-1.5 block">{item.fact}</span>
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
