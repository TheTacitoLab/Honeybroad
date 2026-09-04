import { images } from "@/data/images";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Copy } from "@/components/ui/Copy";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { ScrollSection } from "@/components/motion/ScrollSection";

export function ArchitecturalApproach() {
  return (
    <Section tone="deep" curve padding="loose" aria-labelledby="architecture">
      <div className="wrap gutter">
        <ScrollSection
          sticky={
            <>
              <SectionHeading id="architecture" eyebrow="How we build" size="lg">
                Cornish, without pretending it&rsquo;s 1820.
              </SectionHeading>
              <Copy size="lede" className="mt-10 text-cream/85 md:mt-14">
                <p>
                  We take cues from Cornish cottages, farmsteads, barns, slate
                  roofs, stone walls and simple pitched forms.
                </p>
                <p>Then we make houses for the way people live now.</p>
                <p>
                  The result should feel familiar without becoming pastiche.
                </p>
              </Copy>
            </>
          }
        >
          <ImageReveal
            direction="up"
            parallax={7}
            className="aspect-[4/5] md:w-[74%]"
          >
            <EditorialImage
              image={images.homeArchitecture1}
              sizes="(min-width: 1024px) 36vw, (min-width: 768px) 74vw, 100vw"
            />
          </ImageReveal>
          <ImageReveal
            direction="left"
            parallax={5}
            className="aspect-[4/3] md:w-[92%] md:self-end"
          >
            <EditorialImage
              image={images.homeArchitecture2}
              sizes="(min-width: 1024px) 46vw, (min-width: 768px) 92vw, 100vw"
            />
          </ImageReveal>
          <ImageReveal
            direction="up"
            parallax={8}
            className="aspect-[4/5] md:ml-[12%] md:w-[64%]"
          >
            <EditorialImage
              image={images.homeArchitecture3}
              sizes="(min-width: 1024px) 32vw, (min-width: 768px) 64vw, 100vw"
            />
          </ImageReveal>
        </ScrollSection>
      </div>
    </Section>
  );
}
