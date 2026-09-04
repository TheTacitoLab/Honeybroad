import { Section } from "@/components/ui/Section";
import { TextReveal } from "@/components/motion/TextReveal";

const principles = [
  {
    statement: "Understand the site.",
    body: "Before anything is drawn, we spend time on the land itself. Levels, water, wind, light, access, the neighbours, what was there before. Most of the important decisions get made here.",
  },
  {
    statement: "Build what belongs there.",
    body: "Cornwall has a strong way of building. Stone, slate, render, simple pitched roofs. We use that language because it works, then adjust it for how people live now.",
  },
  {
    statement: "Spend money where people notice it.",
    body: "Good windows. Proper insulation. Kitchens and bathrooms that last. Landscaping that is finished rather than left for later. Less on things that only look good in a brochure.",
  },
  {
    statement: "Think about the next twenty years, not just completion day.",
    body: "We usually keep what we build. So we care how a house is to heat, maintain and live with long after the scaffolding has gone.",
  },
];

export function OurApproach() {
  return (
    <Section tone="cream" curve aria-labelledby="our-approach">
      <div className="wrap gutter">
        <TextReveal as="p" id="our-approach" className="text-label opacity-70">
          Our approach
        </TextReveal>

        <ol className="mt-10 md:mt-14">
          {principles.map((p, i) => (
            <li
              key={p.statement}
              className="grid-editorial border-t border-deep/15 py-10 md:py-14 lg:py-16"
            >
              <TextReveal
                as="span"
                y={16}
                className="text-label col-span-2 pt-2 opacity-60 md:col-span-1"
              >
                {String(i + 1).padStart(2, "0")}
              </TextReveal>
              <TextReveal
                as="h3"
                delay={0.05}
                className="text-display-md col-span-10 md:col-span-7 lg:col-span-6"
              >
                {p.statement}
              </TextReveal>
              <TextReveal
                as="p"
                delay={0.18}
                className="text-body col-span-12 mt-6 max-w-[30rem] md:col-span-4 md:col-start-9 md:mt-2 lg:col-span-4 lg:col-start-9"
              >
                {p.body}
              </TextReveal>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
