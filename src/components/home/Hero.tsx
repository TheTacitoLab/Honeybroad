"use client";

import {
  m,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { easeOutSoft } from "@/lib/motion";
import { Wordmark } from "@/components/brand/Logo";
import { TextLink } from "@/components/ui/TextLink";

const entrance = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1.1, ease: easeOutSoft, delay },
});

/**
 * The homepage opening. It stays pinned while the first statement gives way
 * to the second, then the next section rises over it.
 *
 * Structure: this section is `sticky` inside <main>, followed by a spacer that
 * holds it in place for half a viewport before the cream section arrives.
 */
export function Hero() {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const viewport = useRef(900);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const set = () => {
      viewport.current = window.innerHeight;
    };
    set();
    window.addEventListener("resize", set);
    return () => window.removeEventListener("resize", set);
  }, []);

  // First statement fades as the visitor begins to scroll; second arrives beneath it.
  const firstOpacity = useTransform(scrollY, (v) =>
    reduced ? 1 : 1 - Math.min(1, Math.max(0, v / (viewport.current * 0.28))),
  );
  const firstY = useTransform(scrollY, (v) =>
    reduced ? 0 : -Math.min(1, Math.max(0, v / (viewport.current * 0.28))) * 24,
  );
  const secondOpacity = useTransform(scrollY, (v) => {
    const t = (v - viewport.current * 0.18) / (viewport.current * 0.32);
    return reduced ? (v > viewport.current * 0.2 ? 1 : 0) : Math.min(1, Math.max(0, t));
  });
  const secondY = useTransform(scrollY, (v) => {
    const t = Math.min(1, Math.max(0, (v - viewport.current * 0.18) / (viewport.current * 0.32)));
    return reduced ? 0 : (1 - t) * 20;
  });
  const chromeOpacity = useTransform(scrollY, (v) =>
    1 - Math.min(1, Math.max(0, (v - viewport.current * 0.55) / (viewport.current * 0.35))),
  );

  // Once fully covered, take the pinned hero out of the compositor's hands.
  useMotionValueEvent(scrollY, "change", (v) => {
    const shouldHide = v > viewport.current * 1.6;
    if (shouldHide !== hidden) setHidden(shouldHide);
  });

  return (
    <>
      <section
        data-tone="deep"
        aria-label="Introduction"
        className="tone-deep sticky top-0 z-0 h-svh w-full overflow-hidden bg-deep text-cream"
        style={{ visibility: hidden ? "hidden" : "visible" }}
      >
        <div className="wrap gutter flex h-full flex-col justify-between pb-8 pt-24 md:pb-12 md:pt-32">
          <m.div {...entrance(0.1)} data-hero-wordmark className="self-start">
            <Wordmark
              title="Honeybroad homes"
              className="h-auto w-[min(62vw,22rem)] md:w-[min(34vw,26rem)]"
            />
          </m.div>

          <div className="relative py-6 md:py-10">
            <m.h1
              {...entrance(0.35)}
              style={{ opacity: firstOpacity, y: firstY }}
              className="text-display-xl max-w-[13ch]"
            >
              Homes that belong where they&rsquo;re built.
            </m.h1>

            <m.p
              style={{ opacity: secondOpacity, y: secondY }}
              className="text-display-lg absolute inset-x-0 top-6 max-w-[16ch] md:top-10"
            >
              Residential first.
              <br />
              Beautiful enough to go away to.
            </m.p>
          </div>

          <m.div
            {...entrance(0.6)}
            style={{ opacity: chromeOpacity }}
            className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
          >
            <p className="text-small max-w-[20rem] text-cream/80 md:order-2 md:max-w-[22rem] md:text-right">
              We build small collections of contemporary homes across Cornwall
              and the South West.
            </p>
            <div className="flex items-end gap-5 md:order-1">
              <span
                aria-hidden
                className="scroll-line relative hidden h-10 w-px overflow-hidden text-cream md:block"
              />
              <TextLink href="/#about" arrow="down" className="text-small whitespace-nowrap">
                Explore Honeybroad
              </TextLink>
            </div>
          </m.div>
        </div>
      </section>

      {/* Holds the hero in place before the next section rises over it. */}
      <div aria-hidden data-tone="deep" className="relative z-0 h-[85svh]" />
    </>
  );
}
