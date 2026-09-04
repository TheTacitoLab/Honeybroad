"use client";

import { m, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type { Development } from "@/data/developments";
import { easeOutSoft } from "@/lib/motion";
import { EditorialImage } from "@/components/ui/EditorialImage";

const entrance = (delay: number) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1.05, ease: easeOutSoft, delay },
});

/**
 * Opening of a project page: the name at full size, the place and stage
 * beneath it, and the site itself filling the lower half of the viewport.
 * The image drifts a little slower than the page as the visitor leaves.
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
        <m.h1 {...entrance(0.1)} id="development-title" className="text-display-xl">
          {development.name}
        </m.h1>

        <div className="mt-8 flex flex-col gap-6 md:mt-12 md:flex-row md:items-end md:justify-between">
          <m.p {...entrance(0.3)} className="text-lede">
            {development.location.settlement}
            <br />
            <span className="text-cream/75">{development.location.area}</span>
          </m.p>
          <m.p {...entrance(0.4)} className="text-label opacity-80">
            {development.status}
          </m.p>
        </div>
      </m.div>

      <m.div
        {...entrance(0.5)}
        className="relative mt-10 h-[46svh] w-full overflow-hidden md:mt-14 md:h-[54svh]"
      >
        <m.div style={{ y: imageY }} className="absolute inset-x-0 -top-[14%] bottom-0">
          <EditorialImage
            image={development.heroImage}
            priority
            sizes="100vw"
          />
        </m.div>
      </m.div>
    </section>
  );
}
