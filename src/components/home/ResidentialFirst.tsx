import { images } from "@/data/images";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Copy } from "@/components/ui/Copy";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { TextReveal } from "@/components/motion/TextReveal";

const memorable = [
  "A fireplace.",
  "A courtyard.",
  "A view.",
  "A sheltered place to eat outside.",
  "A really good bath.",
];

export function ResidentialFirst() {
  return (
    <Section tone="white" curve aria-labelledby="residential-first">
      <div className="wrap gutter grid-editorial">
        <div className="order-2 col-span-12 mt-16 md:col-span-6 lg:order-1 lg:col-span-4 lg:mt-0 lg:self-start lg:sticky lg:top-[18vh]">
          <ImageReveal direction="up" parallax={4} className="aspect-[4/5]">
            <EditorialImage
              image={images.homeResidentialInterior}
              sizes="(min-width: 1024px) 30vw, (min-width: 768px) 50vw, 100vw"
            />
          </ImageReveal>
        </div>

        <div className="order-1 col-span-12 lg:order-2 lg:col-span-7 lg:col-start-6">
          <SectionHeading
            id="residential-first"
            eyebrow="Residential first"
            size="lg"
          >
            A good holiday house should still be a very good house.
          </SectionHeading>

          <Copy size="lede" className="mt-10 md:mt-14">
            <p>
              Some of our homes may be used for holidays. Some will be rented
              long-term. Some may eventually be sold.
            </p>
            <p>The architecture has to work for all of them.</p>
            <p>
              That means proper bedrooms. Good kitchens. Storage. Gardens.
              Parking. Natural light. Privacy.
            </p>
            <p>The memorable bits come afterwards.</p>
          </Copy>

          <ul className="mt-12 flex flex-col gap-1 md:mt-16">
            {memorable.map((line, i) => (
              <TextReveal
                key={line}
                as="li"
                delay={i * 0.09}
                y={20}
                className="text-display-sm"
              >
                {line}
              </TextReveal>
            ))}
          </ul>

          <Copy size="lede" className="mt-12 md:mt-16">
            <p>
              Things you would enjoy on a weekend away, but still want on a
              Wednesday in November.
            </p>
          </Copy>
        </div>
      </div>
    </Section>
  );
}
