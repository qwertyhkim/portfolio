"use client";

import { useEffect } from "react";
import { track } from "@/lib/track";

// Fires `section_view` once per section when ≥40% of it is visible.
// Any element with data-section="name" is tracked.
export default function SectionTracker() {
  useEffect(() => {
    const seen = new Set<string>();
    const els = document.querySelectorAll<HTMLElement>("[data-section]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const name = (e.target as HTMLElement).dataset.section!;
          if (e.isIntersecting && !seen.has(name)) {
            seen.add(name);
            track("section_view", { section_name: name });
          }
        });
      },
      { threshold: 0.4 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
