import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { TextReveal } from "@/components/motion/TextReveal";

type Props = {
  children: ReactNode;
  className?: string;
  size?: "lede" | "body";
  delay?: number;
  muted?: boolean;
};

/** A block of paragraphs with comfortable rhythm, revealed once in view. */
export function Copy({
  children,
  className,
  size = "body",
  delay = 0.1,
  muted = false,
}: Props) {
  return (
    <TextReveal
      delay={delay}
      to={muted ? 0.85 : 1}
      className={cn(
        "copy max-w-[38rem]",
        size === "lede" ? "text-lede" : "text-body",
        className,
      )}
    >
      {children}
    </TextReveal>
  );
}
