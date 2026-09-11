"use client";

import {
  m,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { Wordmark } from "@/components/brand/Logo";
import { TextLink } from "@/components/ui/TextLink";

const riseDelay = (seconds: number) =>
  ({ "--rise-delay": `${seconds}s` }) as CSSProperties;

const clamp = (t: number) => Math.min(1, Math.max(0, t));
const firstProgress = (y: number, h: number) => clamp(y / (h * 0.26));
const secondProgress = (y: number, h: number) => clamp((y - h * 0.3) / (h * 0.28));
const chromeProgress = (y: number, h: number) => clamp((y - h * 0.6) / (h * 0.3));

/**
 * The homepage opening. It stays pinned while the first statement gives way
 * to the second, then the next section rises over it.
 *
 * Structure: this section is `sticky` inside <main>, followed by a spacer
 * (85svh) that holds it in place before the cream section arrives. Entrance
 * animation is CSS (`.rise`) on wrapper elements so it starts at first paint
 * and never fights the scroll-driven opacity on the statements themselves.
 * On very short viewports a CSS rule lets the hero flow instead of pinning.
 */
export function Hero() {
  const reduced = usePrefersReducedMotion();
  const { scrollY } = useScroll();
  const vh = useMotionValue(900);
  const spacer = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const set = () => vh.set(window.innerHeight);
    set();
    window.addEventListener("resize", set);
    return () => window.removeEventListener("resize", set);
  }, [vh]);

  // The first statement fades out completely before the second arrives. The
  // crossfade is opacity only, so it stays with reduced motion; the drift does not.
  // Each value reads both scroll position and viewport height, so a resize re-evaluates it.
  const firstOpacity = useTransform(() => 1 - firstProgress(scrollY.get(), vh.get()));
  const firstY = useTransform(() =>
    reduced ? 0 : -firstProgress(scrollY.get(), vh.get()) * 24,
  );
  const secondOpacity = useTransform(() => secondProgress(scrollY.get(), vh.get()));
  const secondY = useTransform(() =>
    reduced ? 0 : (1 - secondProgress(scrollY.get(), vh.get())) * 20,
  );
  const chromeOpacity = useTransform(() => 1 - chromeProgress(scrollY.get(), vh.get()));
  // Keep the covered link out of the tab order once it can no longer be seen.
  const chromeVisibility = useTransform(chromeOpacity, (o) =>
    o <= 0.001 ? "hidden" : "visible",
  );

  // Once the next section has fully covered the pinned hero, take it out of
  // the compositor's hands. Measured from the spacer so it can never hide early.
  const sync = () => {
    const bottom = spacer.current?.getBoundingClientRect().bottom ?? Infinity;
    const shouldHide = bottom <= 0;
    setHidden((prev) => (prev === shouldHide ? prev : shouldHide));
  };
  useMotionValueEvent(scrollY, "change", sync);
  useMotionValueEvent(vh, "change", sync);

  return (
    <>
      <section
        data-tone="deep"
        data-hero
        aria-label="Introduction"
        className="tone-deep sticky top-0 z-0 h-svh w-full overflow-hidden bg-deep text-cream"
        style={{ visibility: hidden ? "hidden" : "visible" }}
      >
        <div className="wrap gutter flex h-full flex-col justify-between pb-8 pt-24 md:pb-12 md:pt-32">
          <div data-hero-wordmark className="rise self-start" style={riseDelay(0.1)}>
            <Wordmark
              title="Honeybroad homes"
              className="h-auto w-[min(62vw,22rem)] md:w-[min(34vw,26rem)]"
            />
          </div>

          <div className="rise relative py-6 md:py-10" style={riseDelay(0.15)}>
            {/* The statements keep visibility: visible so they stay in the accessibility tree when the section hides. */}
            <m.h1
              style={{ opacity: firstOpacity, y: firstY, visibility: "visible" }}
              className="text-display-xl max-w-[13ch]"
            >
              Homes that belong where they&rsquo;re built.
            </m.h1>

            <m.p
              data-reveal=""
              style={{ opacity: secondOpacity, y: secondY, visibility: "visible" }}
              className="text-display-lg absolute inset-x-0 top-6 max-w-[16ch] md:top-10"
            >
              Residential first.
              <br />
              Beautiful enough to go away to.
            </m.p>
          </div>

          <div className="rise" style={riseDelay(0.3)}>
            <m.div
              style={{ opacity: chromeOpacity, visibility: chromeVisibility }}
              className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
            >
              <p
                style={{ visibility: "visible" }}
                className="text-body max-w-[22rem] text-cream md:order-2 md:max-w-[26rem] md:text-right"
              >
                We build small collections of contemporary homes across
                Cornwall and the South West.
              </p>
              <div className="flex items-end gap-5 md:order-1">
                <span
                  aria-hidden
                  className="scroll-line relative hidden h-10 w-px overflow-hidden text-cream md:block"
                />
                <TextLink href="/#about" arrow="down" className="text-body whitespace-nowrap">
                  Explore Honeybroad
                </TextLink>
              </div>
            </m.div>
          </div>
        </div>
      </section>

      {/* Holds the hero in place before the next section rises over it. */}
      <div
        ref={spacer}
        aria-hidden
        data-tone="deep"
        data-hero
        className="hero-spacer pointer-events-none relative z-0 h-[85svh]"
      />
    </>
  );
}
