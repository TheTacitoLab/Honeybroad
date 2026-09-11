import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/data/site";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Copy } from "@/components/ui/Copy";
import { TextReveal } from "@/components/motion/TextReveal";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Talk to Honeybroad about land, development opportunities, partnerships or anything else. hello@honeybroad.com",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <Section tone="deep" padding="none" aria-labelledby="contact-title" className="z-0">
      <div className="wrap gutter grid-editorial min-h-svh pb-24 pt-36 md:pb-32 md:pt-44">
        <div className="col-span-12 lg:col-span-6">
          <SectionHeading as="h1" id="contact-title" size="xl" immediate>
            Talk to us.
          </SectionHeading>
          <Copy size="lede" delay={0.15} immediate className="mt-10 text-cream/85 md:mt-14">
            <p>
              For land, development opportunities, partnerships or anything
              else Honeybroad related:
            </p>
          </Copy>
          <TextReveal delay={0.25} immediate className="mt-8">
            <a
              href={`mailto:${site.email}`}
              className="link-underline text-display-sm"
            >
              {site.email}
            </a>
          </TextReveal>
          <TextReveal delay={0.35} immediate className="text-body mt-12 text-cream/85">
            <p>{site.name}</p>
            <p>{site.region}</p>
          </TextReveal>
        </div>

        <div className="col-span-12 mt-20 lg:col-span-5 lg:col-start-8 lg:mt-3">
          <TextReveal delay={0.3} immediate>
            <ContactForm />
          </TextReveal>
        </div>
      </div>
    </Section>
  );
}
