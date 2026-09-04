"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Tone } from "@/lib/utils";

const PROBE_Y = 36;

/**
 * Works out which section sits beneath the header, whether the page has
 * scrolled, and whether a page's own hero wordmark is still doing the job of
 * the header logo. The header uses this to invert its colours, add a ground
 * behind itself and fade its logo in without a single hard-coded breakpoint.
 */
export function useHeaderTone(defaultTone: Tone = "deep") {
  const pathname = usePathname();
  const [tone, setTone] = useState<Tone>(defaultTone);
  const [scrolled, setScrolled] = useState(false);
  // Only the homepage carries a hero wordmark, so it is the only route that
  // starts with the header logo hidden. Resolves identically on server and client.
  const [pastHero, setPastHero] = useState(pathname !== "/");

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const sections = document.querySelectorAll<HTMLElement>("[data-tone]");
      let found: HTMLElement | null = null;
      sections.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= PROBE_Y && rect.bottom > PROBE_Y) {
          // Later elements paint above earlier ones, so the last match wins.
          found = el;
        }
      });
      const foundEl = found as HTMLElement | null;
      if (foundEl) setTone(foundEl.dataset.tone as Tone);

      setScrolled(window.scrollY > 24);

      // The header logo appears the moment something other than the pinned
      // hero (or its spacer) sits beneath the header.
      const heroMark = document.querySelector("[data-hero-wordmark]");
      setPastHero(!heroMark || (foundEl !== null && !foundEl.hasAttribute("data-hero")));
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
