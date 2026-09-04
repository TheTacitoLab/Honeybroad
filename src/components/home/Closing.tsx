import { site } from "@/data/site";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextReveal } from "@/components/motion/TextReveal";
import { Parallax } from "@/components/motion/Parallax";
import { Monogram } from "@/components/brand/Logo";

export function Closing() {
  return (
    <Section tone="deep" curve padding="loose" aria-labelledby="closing" className="overflow-hidden">
      <div className="wrap gutter">
        <SectionHeading id="closing" size="xl" headingClassName="max-w-[16ch]">
          We&rsquo;d rather build fewer good houses than more average ones.
        </SectionHeading>

        <div className="grid-editorial mt-[clamp(4rem,10vw,9rem)] items-end">
          <TextReveal className="text-body col-span-6 md:col-span-3">
            <p>{site.name}</p>
            <p className="text-cream/70">{site.region}</p>
          </TextReveal>

          <TextReveal delay={0.1} className="text-body col-span-6 md:col-span-3">
            <p>Contact</p>
            <p>
              <a href={`mailto:${site.email}`} className="link-underline">
                {site.email}
              </a>
            </p>
            <p>
              <a href={site.url} className="link-underline text-cream/70">
                {site.url.replace("https://", "")}
              </a>
            </p>
          </TextReveal>

          <Parallax
            distance={-30}
            className="col-span-12 mt-16 flex justify-end md:col-span-5 md:col-start-8 md:mt-0"
          >
            <TextReveal delay={0.2} y={20}>
              <Monogram
                title="Honeybroad monogram"
                className="h-auto w-[min(34vw,11rem)] md:w-[min(16vw,13rem)]"
              />
            </TextReveal>
          </Parallax>
        </div>
      </div>
    </Section>
  );
}
