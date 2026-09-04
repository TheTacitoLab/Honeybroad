import type { TimelineStep } from "@/data/developments";
import { cn } from "@/lib/utils";
import { TextReveal } from "@/components/motion/TextReveal";

const stateLabel: Record<TimelineStep["state"], string | null> = {
  done: "Complete",
  active: "Active",
  next: "Next",
  later: null,
};

/**
 * Where a project is. One line per stage; the current stage is the only one
 * at full strength, so it is obvious how early things are.
 */
export function ProjectTimeline({ steps }: { steps: TimelineStep[] }) {
  return (
    <ol className="border-t border-deep/15">
      {steps.map((step, i) => {
        const emphasis =
          step.state === "active"
            ? "opacity-100"
            : step.state === "next"
              ? "opacity-80"
              : step.state === "done"
                ? "opacity-60"
                : "opacity-40";
        return (
          <TextReveal
            key={step.label}
            as="li"
            y={14}
            delay={i * 0.05}
            amount={0.6}
            className={cn(
              "grid grid-cols-12 items-baseline gap-4 border-b border-deep/15 py-5 md:py-6",
              emphasis,
            )}
          >
            <span className="text-label col-span-2 md:col-span-1">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span
              className={cn(
                "col-span-7 md:col-span-8",
                step.state === "active" ? "text-display-sm" : "text-lede",
              )}
              aria-current={step.state === "active" ? "step" : undefined}
            >
              {step.label}
            </span>
            <span className="text-label col-span-3 text-right uppercase tracking-[0.08em] md:col-span-3">
              {stateLabel[step.state]}
            </span>
          </TextReveal>
        );
      })}
    </ol>
  );
}
