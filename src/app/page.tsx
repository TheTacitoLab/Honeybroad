import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { WhatWeBuild } from "@/components/home/WhatWeBuild";
import { ResidentialFirst } from "@/components/home/ResidentialFirst";
import { ArchitecturalApproach } from "@/components/home/ArchitecturalApproach";
import { OurApproach } from "@/components/home/OurApproach";
import { CurrentDevelopments } from "@/components/home/CurrentDevelopments";
import { Closing } from "@/components/home/Closing";

export const metadata: Metadata = {
  title: { absolute: "Honeybroad Homes | Contemporary Homes in Cornwall" },
  alternates: { canonical: "/" },
};

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
