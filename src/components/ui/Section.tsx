import type { ElementType, ReactNode } from "react";
import { cn, toneClasses, type Tone } from "@/lib/utils";

type Props = {
  tone: Tone;
  children: ReactNode;
  id?: string;
  className?: string;
  as?: ElementType;
  /**
   * Softly curve the top edge and overlap the previous section, so one
   * ground appears to rise over the other rather than butting against it.
   */
  curve?: boolean;
  /** Vertical padding preset. */
  padding?: "none" | "tight" | "default" | "loose";
  "aria-labelledby"?: string;
};

const paddings = {
  none: "",
  tight: "py-[clamp(4rem,9vw,8rem)]",
  default: "py-[clamp(5.5rem,12vw,11rem)]",
  loose: "py-[clamp(7rem,15vw,14rem)]",
};

/**
 * Full-width band of colour. Every section announces its ground colour via
 * `data-tone` so the header can keep itself readable as the page scrolls.
 */
export function Section({
  tone,
  children,
  id,
  className,
  as: Tag = "section",
  curve = false,
  padding = "default",
  ...rest
}: Props) {
  return (
    <Tag
      id={id}
      data-tone={tone}
      className={cn(
        "relative z-[1] w-full",
        toneClasses[tone],
        curve && "-mt-8 rounded-t-[2rem] md:-mt-14 md:rounded-t-[3.5rem]",
        paddings[padding],
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
