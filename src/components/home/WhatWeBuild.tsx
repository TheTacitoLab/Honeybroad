import { images } from "@/data/images";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Copy } from "@/components/ui/Copy";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { Parallax } from "@/components/motion/Parallax";

export function WhatWeBuild() {
  return (
    <Section tone="cream" curve id="about" padding="loose" aria-labelledby="what-we-build">
      <div className="wrap gutter">
        <div className="grid-editorial">
          <SectionHeading
            id="what-we-build"
            eyebrow="What we build"
            size="lg"
            className="col-span-12 lg:col-span-7"
          >
            Proper homes. Interesting places.
          </SectionHeading>

          <Parallax
            distance={-56}
            className="col-span-12 mt-12 md:col-span-8 md:col-start-5 lg:col-span-4 lg:col-start-9 lg:mt-3"
          >
            <Copy size="lede">
              <p>
                Honeybroad develops small residential sites across Cornwall
                and the South West.
              </p>
              <p>Every project starts with the same question:</p>
              <p className="text-display-sm italic">What belongs here?</p>
              <p>
                We look at the landscape, the surrounding buildings, the
                community and the way people actually want to live.
              </p>
              <p>Then we build from there.</p>
            </Copy>
          </Parallax>
        </div>

        <div className="grid-editorial mt-[clamp(4rem,10vw,9rem)]">
          <ImageReveal
            direction="up"
            parallax={6}
            className="col-span-12 aspect-[3/2] md:col-span-10 md:col-start-3 lg:col-span-8 lg:col-start-5"
          >
            <EditorialImage
              image={images.homeWhatWeBuild}
              sizes="(min-width: 1024px) 60vw, (min-width: 768px) 80vw, 100vw"
            />
          </ImageReveal>
        </div>
      </div>
    </Section>
  );
}
