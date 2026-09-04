import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo";
import { developments, getDevelopment } from "@/data/developments";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Copy } from "@/components/ui/Copy";
import { TextLink } from "@/components/ui/TextLink";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { TextReveal } from "@/components/motion/TextReveal";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { ScrollSection } from "@/components/motion/ScrollSection";
import { DevelopmentHero } from "@/components/developments/DevelopmentHero";
import { ProjectStats, type Stat } from "@/components/developments/ProjectStats";
import { ProjectTimeline } from "@/components/developments/ProjectTimeline";
import { DevelopmentOptions } from "@/components/developments/DevelopmentOptions";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return developments.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const development = getDevelopment(slug);
  if (!development) return {};
  return pageMetadata({
    title: `${development.name} | Honeybroad Homes`,
    description: `${development.shortDescription} Currently at ${development.status.toLowerCase()}.`,
    path: `/developments/${development.slug}`,
    absoluteTitle: true,
  });
}

/**
 * A development story page. Every block is driven by the development's data
 * and renders only when that data is present, so a new project needs nothing
 * more than an entry in developments.ts.
 */
export default async function DevelopmentPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const development = getDevelopment(slug);
  if (!development) notFound();

  const {
    intro,
    site,
    opportunity,
    waterAndLandscape,
    options,
    architecture,
    timeline,
    statusNote,
    holdStrategy,
  } = development;

  const stats: Stat[] = [];
  if (site?.areaHectares) {
    stats.push({
      label: "Approximate site area",
      value: `${site.areaHectares} hectares`,
      detail: site.areaAcres ? `${site.areaAcres} acres` : undefined,
    });
  }
  if (site?.addressLines?.length) {
    stats.push({
      label: "Location",
      value: site.addressLines[0],
      detail: site.addressLines.slice(1).join(", "),
    });
  }
  stats.push({ label: "Stage", value: development.status });

  return (
    <>
      <DevelopmentHero development={development} />

      {intro ? (
        <Section tone="cream" curve padding="loose" aria-label="Introduction">
          <div className="wrap gutter grid-editorial">
            <div className="col-span-12 lg:col-span-8 lg:col-start-3">
              {intro.map((line, i) => (
                <TextReveal
                  key={line}
                  as="p"
                  delay={i * 0.12}
                  to={i > 0 ? 0.85 : 1}
                  className={i > 0 ? "text-display-md mt-8 md:mt-10" : "text-display-md"}
                >
                  {line}
                </TextReveal>
              ))}
            </div>
          </div>
        </Section>
      ) : null}

      {site ? (
        <Section tone="white" curve aria-labelledby="the-site">
          <div className="wrap gutter">
            <div className="grid-editorial">
              <SectionHeading id="the-site" eyebrow="The site" size="lg" className="col-span-12 lg:col-span-6">
                {site.heading}
              </SectionHeading>
              <Copy size="lede" className="col-span-12 mt-10 lg:col-span-5 lg:col-start-8 lg:mt-3">
                {site.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </Copy>
            </div>

            <ProjectStats stats={stats} className="mt-16 md:mt-24" />

            {site.plan ? (
              <div className="grid-editorial mt-16 md:mt-24">
                <ImageReveal
                  direction="up"
                  parallax={3}
                  className="col-span-12 aspect-[4/3] lg:col-span-10 lg:col-start-2"
                >
                  <EditorialImage
                    image={site.plan}
                    noteTone="deep"
                    sizes="(min-width: 1024px) 80vw, 100vw"
                  />
                </ImageReveal>
                {site.planCaption ? (
                  <TextReveal as="p" to={0.85} className="text-small col-span-12 mt-4 lg:col-span-10 lg:col-start-2">
                    {site.planCaption}
                  </TextReveal>
                ) : null}
              </div>
            ) : null}
          </div>
        </Section>
      ) : null}

      {opportunity ? (
        <Section tone="cream" curve aria-labelledby="the-opportunity">
          <div className="wrap gutter grid-editorial">
            <SectionHeading id="the-opportunity" eyebrow="The opportunity" size="lg" className="col-span-12 lg:col-span-7">
              {opportunity.heading}
            </SectionHeading>
            <Copy size="lede" className="col-span-12 mt-10 lg:col-span-4 lg:col-start-9 lg:mt-3">
              {opportunity.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </Copy>
          </div>
        </Section>
      ) : null}

      {waterAndLandscape ? (
        <Section tone="deep" curve padding="loose" aria-labelledby="water">
          <div className="wrap gutter">
            <ScrollSection
              sticky={
                <>
                  <SectionHeading id="water" eyebrow="Flood and landscape" size="lg">
                    {waterAndLandscape.heading}
                  </SectionHeading>
                  <Copy size="lede" className="mt-10 text-cream/85 md:mt-14">
                    {waterAndLandscape.paragraphs.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                  </Copy>
                </>
              }
            >
              {waterAndLandscape.images?.map((image, i) =>
                i % 2 === 0 ? (
                  <ImageReveal key={image.src} direction="up" parallax={7} className="aspect-[4/5] md:w-[80%]">
                    <EditorialImage image={image} sizes="(min-width: 1024px) 40vw, (min-width: 768px) 80vw, 100vw" />
                  </ImageReveal>
                ) : (
                  <ImageReveal key={image.src} direction="left" parallax={5} className="aspect-[16/10] md:w-[92%] md:self-end">
                    <EditorialImage image={image} sizes="(min-width: 1024px) 46vw, (min-width: 768px) 92vw, 100vw" />
                  </ImageReveal>
                ),
              )}
            </ScrollSection>
          </div>
        </Section>
      ) : null}

      {options ? (
        <Section tone="white" curve aria-labelledby="options">
          <div className="wrap gutter">
            <div className="grid-editorial">
              <SectionHeading id="options" eyebrow="Development options" size="lg" className="col-span-12 lg:col-span-7">
                {options.heading}
              </SectionHeading>
              <Copy size="lede" className="col-span-12 mt-10 lg:col-span-4 lg:col-start-9 lg:mt-3">
                <p>{options.intro}</p>
              </Copy>
            </div>
            <div className="mt-16 md:mt-24">
              <DevelopmentOptions options={options} />
            </div>
          </div>
        </Section>
      ) : null}

      {architecture ? (
        <Section tone="cream" curve padding="loose" aria-labelledby="architecture">
          <div className="wrap gutter">
            <div className="grid-editorial">
              <SectionHeading id="architecture" eyebrow="Architecture" size="lg" className="col-span-12 lg:col-span-7">
                {architecture.heading}
              </SectionHeading>
              <Copy size="lede" className="col-span-12 mt-10 lg:col-span-4 lg:col-start-9 lg:mt-3">
                {architecture.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </Copy>
            </div>

            {architecture.images?.length ? (
              <div className="grid-editorial mt-16 items-start gap-y-10 md:mt-24">
                <ImageReveal direction="up" parallax={5} className="col-span-12 aspect-[4/3] md:col-span-7">
                  <EditorialImage image={architecture.images[0]} sizes="(min-width: 768px) 58vw, 100vw" />
                </ImageReveal>
                {architecture.images[1] ? (
                  <ImageReveal direction="up" parallax={8} delay={0.1} className="col-span-12 aspect-[4/5] md:col-span-4 md:col-start-9 md:mt-24">
                    <EditorialImage image={architecture.images[1]} sizes="(min-width: 768px) 33vw, 100vw" />
                  </ImageReveal>
                ) : null}
              </div>
            ) : null}

            {architecture.references?.length ? (
              <div className="grid-editorial mt-16 md:mt-24">
                <TextReveal as="p" to={0.85} className="text-label col-span-12 md:col-span-3">
                  What we keep looking at
                </TextReveal>
                <ul className="col-span-12 mt-6 grid grid-cols-2 gap-x-8 gap-y-3 md:col-span-8 md:col-start-5 md:mt-0 md:grid-cols-3">
                  {architecture.references.map((r, i) => (
                    <TextReveal key={r} as="li" y={14} delay={i * 0.04} className="text-lede">
                      {r}
                    </TextReveal>
                  ))}
                </ul>
                <TextReveal as="p" delay={0.2} to={0.85} className="text-body col-span-12 mt-10 max-w-[36rem] md:col-span-8 md:col-start-5">
                  These references inform the design. They are not copied.
                </TextReveal>
              </div>
            ) : null}
          </div>
        </Section>
      ) : null}

      {timeline ? (
        <Section tone="white" curve aria-labelledby="status">
          <div className="wrap gutter grid-editorial">
            <div className="col-span-12 lg:col-span-4">
              <SectionHeading id="status" eyebrow="Development status" size="md">
                Where things are.
              </SectionHeading>
              {statusNote ? (
                <Copy className="mt-8">
                  <p>{statusNote}</p>
                </Copy>
              ) : null}
            </div>
            <div className="col-span-12 mt-12 lg:col-span-7 lg:col-start-6 lg:mt-0">
              <ProjectTimeline steps={timeline} />
            </div>
          </div>
        </Section>
      ) : null}

      {holdStrategy ? (
        <Section tone="deep" curve padding="loose" aria-labelledby="hold">
          <div className="wrap gutter grid-editorial">
            <SectionHeading id="hold" eyebrow="Hold strategy" size="lg" className="col-span-12 lg:col-span-7">
              {holdStrategy.heading}
            </SectionHeading>
            <Copy size="lede" className="col-span-12 mt-10 text-cream/85 lg:col-span-4 lg:col-start-9 lg:mt-3">
              {holdStrategy.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </Copy>
          </div>

          <div className="wrap gutter mt-[clamp(5rem,12vw,10rem)]">
            <TextReveal className="flex flex-col gap-5 border-t border-cream/20 pt-10 md:flex-row md:justify-between">
              <TextLink href="/developments" className="text-lede">
                Return to developments
              </TextLink>
              <TextLink href="/" className="text-lede">
                View Honeybroad
              </TextLink>
            </TextReveal>
          </div>
        </Section>
      ) : null}
    </>
  );
}
