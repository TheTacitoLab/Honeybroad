import { images, type ImageAsset } from "./images";

export type DevelopmentStatus =
  | "Early feasibility"
  | "Pre-application"
  | "Planning"
  | "Detailed design"
  | "Under construction"
  | "Complete";

export type TimelineState = "active" | "next" | "later" | "done";

export type TimelineStep = {
  label: string;
  state: TimelineState;
};

export type DevelopmentOption = {
  label: string;
  homes: number;
  summary: string;
  points: string[];
};

export type DevelopmentSection = {
  heading: string;
  paragraphs: string[];
};

export type Development = {
  slug: string;
  name: string;
  location: {
    settlement: string;
    area: string;
  };
  status: DevelopmentStatus;
  shortDescription: string;
  /** Longer card copy, used where there is room. */
  description?: string;
  heroImage: ImageAsset;
  /** Alternative crops for the cards; each falls back to heroImage. */
  cardImages?: {
    home?: ImageAsset;
    portfolio?: ImageAsset;
  };
  year?: number;
  numberOfHomes?: string;
  tags?: string[];
  /** Whether to feature on the homepage. */
  featured?: boolean;

  /* ---- Project page content (all optional; sections render when present) ---- */
  intro?: string[];
  site?: DevelopmentSection & {
    areaHectares?: number;
    areaAcres?: number;
    addressLines?: string[];
    plan?: ImageAsset;
    /** Shown beneath the plan. Keep it true whether or not a real plan is in place. */
    planCaption?: string;
  };
  opportunity?: DevelopmentSection;
  waterAndLandscape?: DevelopmentSection & { images?: ImageAsset[] };
  options?: {
    heading: string;
    stage: string;
    intro: string;
    items: DevelopmentOption[];
    note?: string;
  };
  architecture?: DevelopmentSection & {
    references?: string[];
    images?: ImageAsset[];
  };
  timeline?: TimelineStep[];
  /** A plain sentence about where the project really is, shown with the timeline. */
  statusNote?: string;
  holdStrategy?: DevelopmentSection;
};

/**
 * All Honeybroad developments.
 *
 * Add a new object to this array and it will appear in the navigation
 * dropdown, the developments page and (if `featured`) the homepage.
 * The project page at /developments/<slug> is generated automatically;
 * each optional content block below renders only when it is present.
 */
export const developments: Development[] = [
  {
    slug: "newmills",
    name: "Newmills",
    location: {
      settlement: "Poundstock",
      area: "North Cornwall",
    },
    status: "Early feasibility",
    shortDescription:
      "A small residential development beside an existing stream near Poundstock.",
    description:
      "We are exploring a collection of contemporary Cornish cottages positioned around the site's landscape and flood constraints rather than fighting them.",
    heroImage: images.newmillsHero,
    cardImages: {
      home: images.homeNewmillsCard,
      portfolio: images.developmentsNewmills,
    },
    year: 2026,
    numberOfHomes: "2 to 4",
    tags: ["Stream", "Small site", "Contemporary Cornish"],
    featured: true,

    intro: [
      "A small site in North Cornwall with a stream running through its centre.",
      "Our starting point is simple: work with it rather than against it.",
    ],

    site: {
      heading: "A road, a stream and a boundary that stays where it is.",
      areaHectares: 0.27,
      areaAcres: 0.66,
      addressLines: ["Poundstock", "North Cornwall", "EX23 0DY"],
      paragraphs: [
        "The site sits beside an existing road with a stream crossing the land.",
        "The stream and the existing site boundary are fixed parts of the design. Everything else is still open.",
      ],
      plan: images.newmillsSitePlan,
      planCaption:
        "The existing site boundary and the stream are fixed parts of the design. Neither will be altered.",
    },

    opportunity: {
      heading: "A small group of cottages, and a stream that stays.",
      paragraphs: [
        "We are exploring a small group of contemporary Cornish cottages.",
        "The houses will sit on the safest and most appropriate part of the site, while the stream and the surrounding landscape remain an important part of the development.",
        "Instead of treating the watercourse as leftover land, we want it to become part of what makes the place good to live in.",
      ],
    },

    waterAndLandscape: {
      heading: "Water shapes the plan.",
      paragraphs: [
        "Newmills sits within an area of known flood risk.",
        "That means the stream isn't something we design around at the end. It comes first.",
        "Homes, vehicle access and essential infrastructure will be located according to detailed flood-risk and topographical work.",
        "The stream will remain in its existing course. The landscape around it can then provide habitat, flood resilience and a better outlook for the homes.",
      ],
      images: [images.newmillsStream, images.newmillsLandscape],
    },

    options: {
      heading: "Two, three or four homes. Nothing drawn yet.",
      stage: "Early feasibility",
      intro:
        "We are currently considering three broad approaches. None of them is drawn yet. No house positions have been decided.",
      items: [
        {
          label: "Option A",
          homes: 2,
          summary: "The simplest and most conservative approach.",
          points: [
            "Larger plots",
            "More landscape",
            "Lower planning and development complexity",
          ],
        },
        {
          label: "Option B",
          homes: 3,
          summary: "The current preferred direction to investigate.",
          points: [
            "A small group of cottages",
            "A better balance between residential value, rental income, landscape and development cost",
          ],
        },
        {
          label: "Option C",
          homes: 4,
          summary: "The upper scenario currently worth testing.",
          points: [
            "Potentially stronger overall rental income",
            "Only if four homes can be accommodated without weakening the planning case, flood strategy, gardens, parking or the overall quality of the development",
          ],
        },
      ],
      note: "These are scenarios for testing, not proposals. The right answer will come out of the flood and topographical work, not the other way round.",
    },

    architecture: {
      heading: "Modern Cornish homes with historic taste.",
      paragraphs: [
        "We aren't interested in building imitation old cottages. But there is plenty to learn from them.",
        "Simple forms. Good proportions. Local materials. Buildings that make sense in the weather.",
        "We want Newmills to feel unmistakably of Cornwall while still feeling like somewhere you'd want to live now.",
      ],
      references: [
        "Cornish cottages",
        "Agricultural buildings",
        "Stone",
        "Lime-toned render",
        "Slate roofs",
        "Pitched roofs",
        "Strong chimneys",
        "Sheltered courtyards",
        "Deep window reveals",
        "Restrained contemporary glazing",
        "Simple forms",
      ],
      images: [images.newmillsArchitecture1, images.newmillsArchitecture2],
    },

    timeline: [
      { label: "Site feasibility", state: "active" },
      { label: "Topographical + flood assessment", state: "next" },
      { label: "Concept design", state: "later" },
      { label: "Pre-application / planning strategy", state: "later" },
      { label: "Planning", state: "later" },
      { label: "Detailed design", state: "later" },
      { label: "Build", state: "later" },
    ],
    statusNote:
      "This is an early-stage development. No planning application has been made and no layout has been fixed.",

    holdStrategy: {
      heading: "Built with the long term in mind.",
      paragraphs: [
        "Our plan is generally to keep the homes we build.",
        "That changes the decisions we make.",
        "We care about maintenance, energy use, landscaping, materials and how the houses perform years after the builders leave.",
      ],
    },
  },
];

export const getDevelopment = (slug: string) =>
  developments.find((d) => d.slug === slug);

export const featuredDevelopments = developments.filter((d) => d.featured);
