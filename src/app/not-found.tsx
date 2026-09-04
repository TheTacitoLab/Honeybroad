import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Copy } from "@/components/ui/Copy";
import { TextLink } from "@/components/ui/TextLink";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <Section tone="deep" padding="none" aria-labelledby="not-found" className="z-0">
      <div className="wrap gutter flex min-h-svh flex-col justify-center pb-24 pt-36">
        <SectionHeading as="h1" id="not-found" size="lg" immediate>
          That page isn&rsquo;t here.
        </SectionHeading>
        <Copy size="lede" className="mt-8 text-cream/85">
          <p>It may have moved, or the address may be wrong.</p>
        </Copy>
        <div className="mt-10 flex flex-col gap-4 md:flex-row md:gap-10">
          <TextLink href="/" className="text-body">
            Go to the homepage
          </TextLink>
          <TextLink href="/developments" className="text-body">
            See developments
          </TextLink>
        </div>
      </div>
    </Section>
  );
}
