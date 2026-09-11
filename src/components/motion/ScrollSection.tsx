import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  /** Content that stays put while the rest scrolls past. */
  sticky: ReactNode;
  children: ReactNode;
  className?: string;
  /** Put the sticky column on the right instead. */
  reverse?: boolean;
};

/**
 * A sticky story: text holds still for a while as imagery moves alongside it.
 * Native CSS sticky, so nothing is scroll-jacked and mobile stacks naturally.
 */
export function ScrollSection({ sticky, children, className, reverse }: Props) {
  return (
    <div className={cn("grid-editorial", className)}>
      <div
        className={cn(
          "col-span-12 lg:col-span-6",
          reverse && "lg:order-2 lg:col-start-7",
        )}
      >
        <div className="lg:sticky lg:top-[22vh]">{sticky}</div>
      </div>
      <div
        className={cn(
          "col-span-12 mt-16 flex flex-col gap-[14vh] lg:col-span-6 lg:col-start-7 lg:mt-0",
          reverse && "lg:order-1 lg:col-start-1",
        )}
      >
        {children}
      </div>
    </div>
  );
}
