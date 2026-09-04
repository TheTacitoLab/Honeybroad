import Image from "next/image";
import type { ImageAsset } from "@/data/images";
import { cn } from "@/lib/utils";

type Props = {
  image: ImageAsset;
  className?: string;
  /** CSS aspect ratio, e.g. "4 / 3". Omit when the parent controls the size. */
  aspect?: string;
  sizes?: string;
  priority?: boolean;
  /** Set "high" on the largest contentful image of a page. */
  fetchPriority?: "high" | "low" | "auto";
  /** Colour of the placeholder caption. */
  noteTone?: "cream" | "deep";
};

/**
 * A photograph that fills its frame. While an image is a placeholder, a small
 * caption describes the intended shot so the layout can be reviewed honestly.
 */
export function EditorialImage({
  image,
  className,
  aspect,
  sizes = "100vw",
  priority = false,
  fetchPriority,
  noteTone = "cream",
}: Props) {
  return (
    <figure
      className={cn("relative h-full w-full overflow-hidden", className)}
      style={aspect ? { aspectRatio: aspect } : undefined}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        priority={priority}
        fetchPriority={fetchPriority}
        className="object-cover"
      />
      {image.placeholder && image.note ? (
        <figcaption
          className={cn(
            "text-label pointer-events-none absolute bottom-4 left-4 right-4 max-w-md opacity-70 md:bottom-5 md:left-5",
            noteTone === "cream" ? "text-cream" : "text-deep",
          )}
        >
          <span className="sr-only">Placeholder image. Intended photograph: </span>
          {image.note}
        </figcaption>
      ) : null}
    </figure>
  );
}
