/**
 * Image registry.
 *
 * Every photograph on the site is referenced from here so the client can
 * replace placeholders without touching components. To swap an image:
 *
 *   1. Drop the photograph into /public/images/<name>.jpg
 *   2. Update `src`, `width`, `height` and `alt` below
 *   3. Set `placeholder: false` (this removes the on-image caption)
 *
 * `note` describes the intended shot for whoever is commissioning or
 * selecting photography. It is only rendered while `placeholder` is true.
 */
export type ImageAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Intended photograph — shown as a small caption while placeholder is true. */
  note?: string;
  placeholder?: boolean;
};

const ph = (
  file: string,
  width: number,
  height: number,
  note: string,
): ImageAsset => ({
  src: `/images/placeholders/${file}`,
  alt: "",
  width,
  height,
  note,
  placeholder: true,
});

export const images = {
  // Homepage
  homeWhatWeBuild: ph(
    "stone-barn-winter.jpg",
    1600,
    1067,
    "Rendered and stone gable in low winter light, wet slate, hedged lane behind",
  ),
  homeResidentialInterior: ph(
    "interior-fireplace.jpg",
    1200,
    1500,
    "Warm interior in the evening: a fireplace, a deep window seat, rain on the glass",
  ),
  homeArchitecture1: ph(
    "slate-roof-detail.jpg",
    1400,
    1750,
    "Slate roof and chimney against a grey sky, close and textural",
  ),
  homeArchitecture2: ph(
    "courtyard-glazing.jpg",
    1600,
    1200,
    "Sheltered courtyard with a large, simple pane of glazing and a stone wall",
  ),
  homeArchitecture3: ph(
    "window-reveal.jpg",
    1400,
    1750,
    "Deep window reveal in lime-toned render, looking out to fields",
  ),
  homeNewmillsCard: ph(
    "newmills-landscape.jpg",
    1800,
    1125,
    "The Newmills site: the stream, its banks and the fields beyond, January",
  ),

  // Developments landing
  developmentsNewmills: ph(
    "newmills-landscape-wide.jpg",
    2000,
    1125,
    "Wide view across the Newmills site towards Poundstock, overcast",
  ),

  // Newmills project page
  newmillsHero: ph(
    "newmills-aerial.jpg",
    2400,
    1350,
    "Aerial or elevated view of the site showing the road, the stream and the field boundaries",
  ),
  newmillsStream: ph(
    "newmills-stream.jpg",
    1600,
    2000,
    "The stream itself: water, stones, bank vegetation, after rain",
  ),
  newmillsSitePlan: ph(
    "newmills-site-plan.jpg",
    1600,
    1200,
    "Site plan to be supplied. The boundary and the stream will be shown exactly as drawn.",
  ),
  newmillsArchitecture1: ph(
    "cornish-farmstead.jpg",
    1600,
    1200,
    "A Cornish farmstead: simple pitched forms, stone, a strong chimney",
  ),
  newmillsArchitecture2: ph(
    "render-and-slate.jpg",
    1400,
    1750,
    "Lime-toned render meeting slate, rain running off a deep eave",
  ),
  newmillsLandscape: ph(
    "north-cornwall-fields.jpg",
    2000,
    1125,
    "North Cornwall fields and hedgebanks in winter, no sun required",
  ),
} as const satisfies Record<string, ImageAsset>;

export type ImageKey = keyof typeof images;
