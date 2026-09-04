import { featuredDevelopments } from "@/data/developments";
import { images } from "@/data/images";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextLink } from "@/components/ui/TextLink";
import { TextReveal } from "@/components/motion/TextReveal";
import { DevelopmentCard } from "@/components/developments/DevelopmentCard";

export function CurrentDevelopments() {
  return (
    <Section tone="white" curve id="developments" aria-labelledby="current-developments">
      <div className="wrap gutter">
        <div className="flex items-end justify-between gap-8">
          <SectionHeading id="current-developments" size="lg">
            Current developments
          </SectionHeading>
          <TextReveal delay={0.15} className="hidden pb-3 md:block">
            <TextLink href="/developments" className="text-small">
              All developments
            </TextLink>
          </TextReveal>
        </div>

        <div className="mt-14 flex flex-col gap-24 md:mt-20">
          {featuredDevelopments.map((d) => (
            <DevelopmentCard
              key={d.slug}
              development={d}
              image={d.slug === "newmills" ? images.homeNewmillsCard : undefined}
            />
          ))}
        </div>

        <TextReveal className="mt-12 md:hidden">
          <TextLink href="/developments" className="text-small">
            All developments
          </TextLink>
        </TextReveal>
      </div>
    </Section>
  );
}
