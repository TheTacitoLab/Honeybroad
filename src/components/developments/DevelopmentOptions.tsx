import type { Development } from "@/data/developments";
import { cn } from "@/lib/utils";
import { TextReveal } from "@/components/motion/TextReveal";

type Options = NonNullable<Development["options"]>;

/**
 * The scenarios being tested. Deliberately no plan, no footprints, no
 * drawings: just the numbers and the reasoning, each marked with its stage.
 */
export function DevelopmentOptions({ options }: { options: Options }) {
  return (
    <div>
      <ol className="grid grid-cols-1 gap-px border-t border-deep/15 md:grid-cols-3 md:border-t-0">
        {options.items.map((item, i) => (
          <TextReveal
            key={item.label}
            as="li"
            delay={i * 0.12}
            className={cn(
              "flex flex-col border-b border-deep/15 py-10 md:border-b-0 md:border-t md:py-12",
              i > 0 && "md:pl-10",
            )}
          >
            <p className="text-label flex items-center justify-between gap-4 opacity-70">
              <span>{item.label}</span>
              <span className="uppercase tracking-[0.08em]">{options.stage}</span>
            </p>
            <p className="text-display-lg mt-8">
              {item.homes}
              <span className="text-display-sm ml-2 opacity-70">
                {item.homes === 1 ? "home" : "homes"}
              </span>
            </p>
            <p className="text-lede mt-6 max-w-[22rem]">
              {item.summary}
              {item.preferred ? null : null}
            </p>
            <ul className="text-body mt-6 flex max-w-[24rem] flex-col gap-2 opacity-80">
              {item.points.map((pt) => (
                <li key={pt} className="flex gap-3">
                  <span aria-hidden className="mt-[0.7em] h-px w-4 shrink-0 bg-current opacity-60" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </TextReveal>
        ))}
      </ol>
      {options.note ? (
        <TextReveal as="p" delay={0.2} className="text-body mt-12 max-w-[38rem] opacity-80">
          {options.note}
        </TextReveal>
      ) : null}
    </div>
  );
}
