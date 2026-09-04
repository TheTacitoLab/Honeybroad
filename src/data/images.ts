/**
 * Image registry.
 *
 * Every photograph on the site is referenced from here so the client can
 * replace placeholders without touching components. To swap an image:
 *
 *   1. Drop the photograph into /public/images/<name>.jpg
 *   2. Change that entry from  ph("name.jpg", "note")
 *                       to     photo("name.jpg", "Real alt text")
 *
 * The on-image caption disappears because the new entry is not a placeholder.
 * Crops are handled by object-fit, so supply generous, well-composed images.
 *
 * `note` describes the intended shot for whoever is commissioning or
 * selecting photography. It is only rendered while `placeholder` is true.
 */
export type ImageAsset = {
  src: string;
  alt: string;
  /** Intended photograph — shown as a small caption while placeholder is true. */
  note?: string;
  placeholder?: boolean;
};

/** A brand-toned stand-in with a caption describing the shot to commission. */
const ph = (file: string, note: string): ImageAsset => ({
  src: `/images/placeholders/${file}`,
  alt: "",
  note,
  placeholder: true,
});

/** A real photograph in /public/images. */
export const photo = (file: string, alt: string): ImageAsset => ({
  src: `/images/${file}`,
  alt,
  placeholder: false,
});

export const images = {
  // Homepage
  homeWhatWeBuild: ph(
    "stone-barn-winter.jpg",
    "Rendered and stone gable in low winter light, wet slate, hedged lane behind",
  ),
  homeResidentialInterior: ph(
    "interior-fireplace.jpg",
    "Warm interior in the evening: a fireplace, a deep window seat, rain on the glass",
  ),
  homeArchitecture1: ph(
    "slate-roof-detail.jpg",
    "Slate roof and chimney against a grey sky, close and textural",
  ),
  homeArchitecture2: ph(
    "courtyard-glazing.jpg",
    "Sheltered courtyard with a large, simple pane of glazing and a stone wall",
  ),
  homeArchitecture3: ph(
    "window-reveal.jpg",
    "Deep window reveal in lime-toned render, looking out to fields",
  ),
  homeNewmillsCard: ph(
    "newmills-landscape.jpg",
    "The Newmills site: the stream, its banks and the fields beyond, January",
  ),

  // Developments landing
  developmentsNewmills: ph(
    "newmills-landscape-wide.jpg",
    "Wide view across the Newmills site towards Poundstock, overcast",
  ),

  // Newmills project page
  newmillsHero: ph(
    "newmills-aerial.jpg",
    "Aerial or elevated view of the site showing the road, the stream and the field boundaries",
  ),
  newmillsStream: ph(
    "newmills-stream.jpg",
    "The stream itself: water, stones, bank vegetation, after rain",
  ),
  newmillsSitePlan: ph(
    "newmills-site-plan.jpg",
    "Site plan to be supplied. The boundary and the stream will be shown exactly as drawn.",
  ),
  newmillsArchitecture1: ph(
    "cornish-farmstead.jpg",
    "A Cornish farmstead: simple pitched forms, stone, a strong chimney",
  ),
  newmillsArchitecture2: ph(
    "render-and-slate.jpg",
    "Lime-toned render meeting slate, rain running off a deep eave",
  ),
  newmillsLandscape: ph(
    "north-cornwall-fields.jpg",
    "North Cornwall fields and hedgebanks in winter, no sun required",
  ),
} as const satisfies Record<string, ImageAsset>;
