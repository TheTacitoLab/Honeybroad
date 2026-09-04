import type { Development } from "@/data/developments";
import type { ImageAsset } from "@/data/images";
import { cn } from "@/lib/utils";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { TransitionLink } from "@/components/motion/TransitionLink";

type Props = {
  development: Development;
  /** Override the hero image, e.g. a crop that suits the homepage. */
  image?: ImageAsset;
  /** "feature" is a full-width, image-led card; "grid" is for the portfolio. */
  variant?: "feature" | "grid";
  /** Heading level, so the card sits correctly in each page's outline. */
  headingLevel?: "h2" | "h3";
  className?: string;
};

/**
 * One development, image first. The whole card is the link; the image eases
 * up a few percent on hover and the arrow nudges along.
 */
export function DevelopmentCard({
  development,
  image,
  variant = "feature",
  headingLevel: Heading = "h3",
  className,
}: Props) {
  const img = image ?? development.heroImage;
  const location = `${development.location.settlement}, ${development.location.area}`;

  return (
    <TransitionLink
      href={`/developments/${development.slug}`}
      className={cn("group block", className)}
      aria-label={`${development.name}, ${location}. ${development.status}. Explore ${development.name}`}
    >
      <ImageReveal
        parallax={4}
        className={cn(variant === "feature" ? "aspect-[16/9]" : "aspect-[4/3]")}
      >
        <div className="h-full w-full transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100">
          <EditorialImage
            image={img}
            sizes={variant === "feature" ? "(min-width: 1440px) 1400px, 100vw" : "(min-width: 1024px) 50vw, 100vw"}
          />
        </div>
      </ImageReveal>

      <div
        className={cn(
          "mt-8 md:mt-10",
          variant === "feature" ? "grid-editorial" : "flex flex-col gap-6",
        )}
      >
        <TextReveal
          delay={0.1}
          className={cn(variant === "feature" && "col-span-12 md:col-span-6")}
        >
          <Heading className="text-display-md">{development.name}</Heading>
          <p className="text-body mt-2 opacity-85">{location}</p>
        </TextReveal>

        <TextReveal
          delay={0.2}
          className={cn(
            variant === "feature" &&
              "col-span-12 mt-6 md:col-span-5 md:col-start-8 md:mt-0",
          )}
        >
          <p className="text-label opacity-85">{development.status}</p>
          <p className="text-body mt-4 max-w-[32rem]">
            {development.shortDescription}
          </p>
          {variant === "feature" && development.description ? (
            <p className="text-body mt-4 max-w-[32rem]">{development.description}</p>
          ) : null}
          <span className="link-arrow text-small mt-7 inline-flex" aria-hidden>
            <span>Explore {development.name}</span>
            <span className="arrow transition-transform duration-500 group-hover:translate-x-[0.3em]">
              →
            </span>
          </span>
        </TextReveal>
      </div>
    </TransitionLink>
  );
}
