"use client";

import { m, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
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
  id?: string;
};

/**
 * Fades and lifts content a short distance into place as it enters the
 * viewport. With reduced motion only the fade remains.
 */
export function TextReveal({
  children,
  as = "div",
  className,
  delay = 0,
  y = 28,
  amount = 0.25,
  once = true,
  id,
}: Props) {
  const reduced = useReducedMotion();
  const Tag = tags[as];

  return (
    <Tag
      id={id}
      className={className}
      initial={{ opacity: 0, y: reduced ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: reduced ? 0.5 : 0.95, ease: easeOutSoft, delay }}
    >
      {children}
    </Tag>
  );
}
