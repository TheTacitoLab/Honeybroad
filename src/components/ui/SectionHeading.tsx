import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { TextReveal } from "@/components/motion/TextReveal";

type Props = {
  children: ReactNode;
  /** Small line above the heading, e.g. a section number. Use sparingly. */
  eyebrow?: ReactNode;
  as?: "h1" | "h2" | "h3";
  size?: "xl" | "lg" | "md" | "sm";
  /** Classes for the wrapper (use for grid placement). */
  className?: string;
  /** Classes for the heading element itself (use for measure, e.g. max-w-[16ch]). */
  headingClassName?: string;
  id?: string;
  delay?: number;
};

const sizes = {
  xl: "text-display-xl",
  lg: "text-display-lg",
  md: "text-display-md",
  sm: "text-display-sm",
};

/** A headline in the editorial serif, revealed once as it enters view. */
export function SectionHeading({
  children,
  eyebrow,
  as: Tag = "h2",
  size = "lg",
  className,
  headingClassName,
  id,
  delay = 0,
}: Props) {
  return (
    <TextReveal className={className} delay={delay}>
      {eyebrow ? (
        <p className="text-label mb-5 opacity-70 md:mb-7">{eyebrow}</p>
      ) : null}
      <Tag id={id} className={cn(sizes[size], headingClassName)}>
        {children}
      </Tag>
    </TextReveal>
  );
}
