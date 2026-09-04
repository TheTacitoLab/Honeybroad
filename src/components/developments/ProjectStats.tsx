import { cn } from "@/lib/utils";
import { TextReveal } from "@/components/motion/TextReveal";

export type Stat = {
  label: string;
  value: string;
  detail?: string;
};

/** A quiet row of facts. Numbers in the serif, labels in the sans. */
export function ProjectStats({ stats, className }: { stats: Stat[]; className?: string }) {
  return (
    <dl className={cn("grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-3", className)}>
      {stats.map((s, i) => (
        <TextReveal key={s.label} delay={i * 0.08} className="flex flex-col">
          <dt className="text-label order-2 mt-3 opacity-70">{s.label}</dt>
          <dd className="text-display-sm order-1">
            {s.value}
            {s.detail ? (
              <span className="text-body mt-1 block opacity-75">{s.detail}</span>
            ) : null}
          </dd>
        </TextReveal>
      ))}
    </dl>
  );
}
