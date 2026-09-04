"use client";

import {
  m,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { easeOutSoft } from "@/lib/motion";

type Direction = "up" | "left" | "right";

/** The frame slides one way while the image inside counters it, so the
 *  photograph appears to be uncovered rather than moved. Transforms only,
 *  which stay smooth on phones. */
const moves: Record<Direction, { mask: { x?: string; y?: string }; counter: { x?: string; y?: string } }> = {
  up: { mask: { y: "101%" }, counter: { y: "-55%" } },
  left: { mask: { x: "-101%" }, counter: { x: "55%" } },
  right: { mask: { x: "101%" }, counter: { x: "-55%" } },
};

type Props = {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  /** Seconds. */
  delay?: number;
  /**
   * Parallax travel as a percentage of the image height (0 disables).
   * Values around 4 to 8 are enough; the brief asks for 5 to 10% at most.
   */
  parallax?: number;
  /** Initial zoom the image settles out of. */
  scaleFrom?: number;
};

/**
 * Reveals an image as it enters the viewport, then lets it drift gently
 * against the page as the visitor scrolls past. With reduced motion the
 * image simply fades in and never moves.
 */
export function ImageReveal({
  children,
  className,
  direction = "up",
  delay = 0,
  parallax = 6,
  scaleFrom = 1.06,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.2 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const travel = reduced ? 0 : parallax;
  const y = useTransform(scrollYProgress, [0, 1], [`${travel}%`, `${-travel}%`]);

  const move = moves[direction];
  const transition = { duration: 1.25, ease: easeOutSoft, delay };

  if (reduced) {
    return (
      <div ref={ref} className={cn("relative overflow-hidden", className)}>
        <m.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : undefined}
          transition={{ duration: 0.7, delay }}
        >
          {children}
        </m.div>
      </div>
    );
  }

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      {/* Mask: slides into place. */}
      <m.div
        className="absolute inset-0 overflow-hidden"
        initial={move.mask}
        animate={inView ? { x: "0%", y: "0%" } : undefined}
        transition={transition}
      >
        {/* Counter-move + settle from a slight zoom. */}
        <m.div
          className="absolute inset-0"
          initial={{ ...move.counter, scale: scaleFrom }}
          animate={inView ? { x: "0%", y: "0%", scale: 1 } : undefined}
          transition={{ ...transition, duration: 1.6 }}
        >
          {/* Parallax layer, oversized so the drift never shows an edge. */}
          <m.div
            className="absolute inset-x-0"
            style={{ y, top: `${-travel}%`, bottom: `${-travel}%` }}
          >
            {children}
          </m.div>
        </m.div>
      </m.div>
    </div>
  );
}
