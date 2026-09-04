import type { Metadata } from "next";
import { site } from "@/data/site";

const ogImage = {
  url: "/opengraph-image.png",
  width: 1200,
  height: 630,
  alt: "Honeybroad homes",
};

/**
 * Page metadata with the full OpenGraph and Twitter set. Next.js replaces a
 * parent's `openGraph` object wholesale when a page defines its own, so each
 * page spells out the image rather than relying on inheritance.
 */
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  path: string;
  /** Use the title as-is instead of the "%s | Honeybroad Homes" template. */
  absoluteTitle?: boolean;
}): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | Honeybroad Homes`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: "en_GB",
      url: path,
      title: fullTitle,
      description,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage.url],
    },
  };
}
