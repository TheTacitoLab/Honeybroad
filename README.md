# Honeybroad Homes

The brochure website for Honeybroad Homes, a small residential developer in Cornwall and the South West. Built with Next.js 16, TypeScript, Tailwind CSS 4 and Framer Motion.

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
npm run lint     # eslint
```

Node 20 or newer.

## Where things are

```
src/app/                     routes, metadata, sitemap, robots, icons, OG image
  page.tsx                   homepage
  developments/page.tsx      developments portfolio
  developments/[slug]/       one page per development, generated from data
  contact/                   contact page + server action for the form
src/data/
  developments.ts            every development. Add a project here and it appears
                             in the nav dropdown, the developments page, the
                             homepage (if featured) and gets its own page.
  images.ts                  the image registry (see Photography below)
  navigation.ts, site.ts     nav structure and site-wide details
src/components/
  home/                      the seven homepage sections
  developments/              DevelopmentCard, DevelopmentHero, ProjectStats,
                             ProjectTimeline, DevelopmentOptions
  layout/                    Header, DevelopmentDropdown, MobileMenu, Footer
  motion/                    PageTransition, TransitionLink, TextReveal,
                             ImageReveal, Parallax, ScrollSection, SmoothScroll
  ui/                        Section, SectionHeading, Copy, EditorialImage, TextLink
  brand/                     the traced logo marks (Wordmark, Monogram, Lockup)
public/brand/                the same marks as standalone SVGs, cream and deep
public/images/placeholders/  flat brand-toned stand-ins for photography
```

## Photography

Every image on the site is registered in `src/data/images.ts`. The current files are placeholders: flat brand-toned images with a small caption describing the intended shot. To replace one:

1. Drop the photograph into `public/images/`.
2. In `src/data/images.ts` update `src`, `width`, `height` and write a real `alt`.
3. Set `placeholder: false`. The caption disappears.

Crops are handled by `object-fit: cover`, so supply generous, well-composed images (landscape shots at least 2000px wide, portraits at least 1400px wide). Next.js resizes and converts them at request time.

## Adding a development

Add an object to the `developments` array in `src/data/developments.ts`. Required: `slug`, `name`, `location`, `status`, `shortDescription`, `heroImage`. Optional: `description`, `year`, `numberOfHomes`, `tags`, `featured` (shows on the homepage), and the project-page content blocks (`intro`, `site`, `opportunity`, `waterAndLandscape`, `options`, `architecture`, `timeline`, `holdStrategy`). Sections of the project page only render when their data is present, so a new development can start with just a hero and an intro.

## Contact form

The form posts to a server action in `src/app/contact/actions.ts`. Delivery uses [Resend](https://resend.com) when these environment variables are set:

```
RESEND_API_KEY=re_...
CONTACT_TO_EMAIL=hello@honeybroad.com          # optional, defaults to hello@honeybroad.com
CONTACT_FROM_EMAIL="Honeybroad website <website@honeybroad.com>"   # optional; the domain must be verified in Resend
```

Without a key the form still validates and then offers the visitor a pre-filled email link instead, so nothing is lost. Any other provider can be swapped in by replacing the `fetch` call in the action.

## Brand

Colours: Deep Water `#1D617A`, Honey Cream `#FCF9DA`, White `#FFFFFF`. These, and two near-tints for image placeholders, are the whole palette (`src/app/globals.css`). Type: DM Serif Display for headlines, DM Sans for everything else, self-hosted through `next/font`.

## Motion and accessibility

Reveals, parallax, the sticky story sections, the page transition and smooth scrolling are all in `src/components/motion/`. Smooth scrolling (Lenis) only runs on devices with a fine pointer. Visitors who prefer reduced motion get fades in place of movement, an immediate page change instead of the transition, and native scrolling.

## Deploying

The site is fully static apart from the contact form action, so it runs anywhere Next.js runs. Set the environment variables above on the host. `metadataBase` in `src/app/layout.tsx` is `https://www.honeybroad.com`; change it if the site moves.
