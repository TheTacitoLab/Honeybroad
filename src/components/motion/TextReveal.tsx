"use client";

import { m } from "framer-motion";
import { createElement, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { easeOutSoft } from "@/lib/motion";

const tags = {
  div: m.div,
  p: m.p,
  h1: m.h1,
  h2: m.h2,
  h3: m.h3,
  span: m.span,
  li: m.li,
  figure: m.figure,
} as const;

type Props = {
  children: ReactNode;
  as?: keyof typeof tags;
  className?: string;
  /** Seconds. */
  delay?: number;
  /** Travel distance in pixels. Kept small on purpose. */
  y?: number;
  /** How much of the element must be visible before revealing (0 to 1). */
  amount?: number;
  once?: boolean;
  /**
   * Final opacity. The animated inline opacity overrides any `opacity-*`
   * utility on the same element, so pass the muted value here instead.
   */
  to?: number;
  /**
   * First-viewport content: animate with CSS from first paint instead of
   * waiting for hydration. Use for page titles and anything above the fold.
   */
  immediate?: boolean;
  id?: string;
};

/**
 * Fades and lifts content a short distance into place as it enters the
 * viewport. With reduced motion only the fade remains (MotionConfig makes
 * the transform instant).
 */
export function TextReveal({
  children,
  as = "div",
  className,
  delay = 0,
  y = 28,
  amount = 0.25,
  once = true,
  to = 1,
  immediate = false,
  id,
}: Props) {
  if (immediate) {
    return createElement(
      as,
      {
        id,
        className: cn("rise", className),
        style: { "--rise-delay": `${delay}s` } as CSSProperties,
      },
      children,
    );
  }

  const Tag = tags[as];

  return (
    <Tag
      id={id}
      data-reveal=""
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: to, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: 0.95, ease: easeOutSoft, delay }}
    >
      {children}
    </Tag>
  );
}
