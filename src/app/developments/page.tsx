import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { developments } from "@/data/developments";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Copy } from "@/components/ui/Copy";
import { TextLink } from "@/components/ui/TextLink";
import { TextReveal } from "@/components/motion/TextReveal";
import { DevelopmentCard } from "@/components/developments/DevelopmentCard";

export const metadata: Metadata = pageMetadata({
  title: "Honeybroad Developments | Cornwall",
  description:
    "Small sites. Good homes. Built with the place in mind. Honeybroad's current and upcoming developments across Cornwall and the South West.",
  path: "/developments",
  absoluteTitle: true,
});

export default function DevelopmentsPage() {
  const [first, ...rest] = developments;

  return (
    <>
      <Section tone="deep" padding="none" aria-labelledby="developments-title" className="z-0">
        <div className="wrap gutter flex min-h-[72svh] flex-col justify-end pb-16 pt-36 md:min-h-[78svh] md:pb-24 md:pt-44">
          <div className="grid-editorial items-end">
            <SectionHeading
              as="h1"
              id="developments-title"
              size="xl"
              immediate
              className="col-span-12 lg:col-span-7"
            >
              Developments
            </SectionHeading>
            <Copy size="lede" delay={0.2} immediate className="col-span-12 mt-10 lg:col-span-4 lg:col-start-9 lg:mt-0">
              <p>
                Small sites.
                <br />
                Good homes.
                <br />
                Built with the place in mind.
              </p>
            </Copy>
          </div>
        </div>
      </Section>

      <Section tone="cream" curve aria-label="Projects">
        <div className="wrap gutter">
          {first ? (
            <DevelopmentCard
              development={first}
              image={first.cardImages?.portfolio}
              variant="feature"
              headingLevel="h2"
              priority
            />
          ) : null}

          {rest.length > 0 ? (
            <div className="mt-24 grid grid-cols-1 gap-x-10 gap-y-20 md:mt-32 md:grid-cols-2">
              {rest.map((d) => (
                <DevelopmentCard
                  key={d.slug}
                  development={d}
                  image={d.cardImages?.portfolio}
                  variant="grid"
                  headingLevel="h2"
                />
              ))}
            </div>
          ) : null}
        </div>
      </Section>

      <Section tone="deep" curve padding="tight" aria-label="Work with us">
        <div className="wrap gutter grid-editorial">
          <TextReveal className="text-lede col-span-12 md:col-span-6 lg:col-span-5">
            <p>
              We are a small company. There will only ever be a handful of
              projects on this page at once, and each one gets our full
              attention.
            </p>
          </TextReveal>
          <TextReveal delay={0.1} className="col-span-12 mt-8 md:col-span-5 md:col-start-8 md:mt-0">
            <p className="text-body max-w-[26rem] text-cream/85">
              If you have land or a site in Cornwall or the South West that
              might suit this way of working, we would like to hear about it.
            </p>
            <TextLink href="/contact" className="text-body mt-6">
              Talk to us
            </TextLink>
          </TextReveal>
        </div>
      </Section>
    </>
  );
}
