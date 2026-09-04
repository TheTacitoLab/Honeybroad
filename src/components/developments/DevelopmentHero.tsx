"use client";

import { m, useScroll, useTransform } from "framer-motion";
import { useRef, type CSSProperties } from "react";
import type { Development } from "@/data/developments";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const riseDelay = (seconds: number) =>
  ({ "--rise-delay": `${seconds}s` }) as CSSProperties;

/**
 * Opening of a project page: the name at full size, the place and stage
 * beneath it, and the site itself filling the lower half of the viewport.
 * Entrances are CSS so they start at first paint; the image drifts a little
 * slower than the page as the visitor leaves.
 */
export function DevelopmentHero({ development }: { development: Development }) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "14%"]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -40]);

  return (
    <section
      ref={ref}
      data-tone="deep"
      aria-labelledby="development-title"
      className="tone-deep relative z-0 flex min-h-svh flex-col bg-deep text-cream"
    >
      <m.div
        style={{ y: textY }}
        className="wrap gutter flex flex-1 flex-col justify-end pb-12 pt-32 md:pb-16 md:pt-40"
      >
        <h1
          id="development-title"
          className="text-display-xl rise"
          style={riseDelay(0.05)}
        >
          {development.name}
        </h1>

        <div className="grid-editorial mt-8 items-end gap-y-6 md:mt-12">
          <p className="text-lede rise col-span-12 lg:col-span-6" style={riseDelay(0.2)}>
            {development.location.settlement}
            <br />
            <span className="text-cream/85">{development.location.area}</span>
          </p>
          <p
            className="text-label rise col-span-12 opacity-85 lg:col-span-4 lg:col-start-9"
            style={riseDelay(0.3)}
          >
            {development.status}
          </p>
        </div>
      </m.div>

      <div
        className="rise relative mt-10 h-[46svh] w-full overflow-hidden md:mt-14 md:h-[54svh]"
        style={riseDelay(0.15)}
      >
        <m.div style={{ y: imageY }} className="absolute inset-x-0 -top-[14%] bottom-0">
          <EditorialImage
            image={development.heroImage}
            priority
            fetchPriority="high"
            sizes="100vw"
          />
        </m.div>
      </div>
    </section>
  );
}
