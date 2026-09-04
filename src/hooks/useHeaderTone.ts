"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Tone } from "@/lib/utils";

const PROBE_Y = 36;

/**
 * Works out which section sits beneath the header and whether the page has
 * scrolled, so the header can invert its colours and add a ground behind
 * itself without a single hard-coded breakpoint per page.
 */
export function useHeaderTone(defaultTone: Tone = "deep") {
  const pathname = usePathname();
  const [tone, setTone] = useState<Tone>(defaultTone);
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(true);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const sections = document.querySelectorAll<HTMLElement>("[data-tone]");
      let found: Tone | null = null;
      sections.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= PROBE_Y && rect.bottom > PROBE_Y) {
          // Later elements paint above earlier ones, so the last match wins.
          found = el.dataset.tone as Tone;
        }
      });
      if (found) setTone(found);

      setScrolled(window.scrollY > 24);

      const heroMark = document.querySelector<HTMLElement>("[data-hero-wordmark]");
      if (heroMark) {
        const rect = heroMark.getBoundingClientRect();
        setPastHero(rect.bottom < PROBE_Y + 8);
      } else {
        setPastHero(true);
      }
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return { tone, scrolled, pastHero };
}
