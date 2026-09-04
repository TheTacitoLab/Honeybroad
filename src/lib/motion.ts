import type { Transition } from "framer-motion";

/** Easings shared across the site. Slow starts, soft landings. */
export const easeOutSoft = [0.22, 1, 0.36, 1] as const;
export const easeInOutSoft = [0.76, 0, 0.24, 1] as const;

export const reveal: Transition = {
  duration: 0.9,
  ease: easeOutSoft,
};

export const revealSlow: Transition = {
  duration: 1.2,
  ease: easeOutSoft,
};

/** Viewport options for once-only reveals that fire just before an element is fully visible. */
export const viewportOnce = { once: true, amount: 0.2 } as const;
