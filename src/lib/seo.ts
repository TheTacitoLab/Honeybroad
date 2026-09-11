import type { Metadata } from "next";
import { site } from "@/data/site";
import ogImageFile from "@/app/opengraph-image.png";

/**
 * The single source of truth for the share image. Importing the file gives
 * a content-hashed URL, so social caches refresh when the card is replaced.
 */
export const ogImage = {
  url: ogImageFile.src,
  width: ogImageFile.width,
  height: ogImageFile.height,
  alt: "Honeybroad Homes - contemporary homes in Cornwall and the South West",
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
      images: [ogImage],
    },
  };
}
