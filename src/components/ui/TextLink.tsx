import type { ReactNode } from "react";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { cn } from "@/lib/utils";

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
  /** Arrow direction; "none" uses the sliding underline instead. */
  arrow?: "right" | "down" | "none";
  onClick?: () => void;
};

/**
 * The site's one link style: plain text with a small arrow that nudges on
 * hover, or a hairline underline that slides away. No pills, no buttons.
 */
export function TextLink({
  href,
  children,
  className,
  arrow = "right",
  onClick,
}: Props) {
  if (arrow === "none") {
    return (
      <TransitionLink
        href={href}
        onClick={onClick}
        className={cn("link-line", className)}
      >
        {children}
      </TransitionLink>
    );
  }

  return (
    <TransitionLink
      href={href}
      onClick={onClick}
      className={cn("link-arrow", className)}
    >
      <span>{children}</span>
      <span
        aria-hidden
        className={cn("arrow", arrow === "down" && "arrow-down")}
      >
        {arrow === "down" ? "↓" : "→"}
      </span>
    </TransitionLink>
  );
}
