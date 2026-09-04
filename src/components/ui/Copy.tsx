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
      className={cn(
        "copy max-w-[38rem]",
        size === "lede" ? "text-lede" : "text-body",
        muted && "opacity-80",
        className,
      )}
    >
      {children}
    </TextReveal>
  );
}
