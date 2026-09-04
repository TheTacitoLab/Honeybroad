import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/data/site";
import { Hero } from "@/components/home/Hero";
import { WhatWeBuild } from "@/components/home/WhatWeBuild";
import { ResidentialFirst } from "@/components/home/ResidentialFirst";
import { ArchitecturalApproach } from "@/components/home/ArchitecturalApproach";
import { OurApproach } from "@/components/home/OurApproach";
import { CurrentDevelopments } from "@/components/home/CurrentDevelopments";
import { Closing } from "@/components/home/Closing";

export const metadata: Metadata = pageMetadata({
  title: "Honeybroad Homes | Contemporary Homes in Cornwall",
  description: site.description,
  path: "/",
  absoluteTitle: true,
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhatWeBuild />
      <ResidentialFirst />
      <ArchitecturalApproach />
      <OurApproach />
      <CurrentDevelopments />
      <Closing />
    </>
  );
}
