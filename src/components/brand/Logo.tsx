import type { SVGProps } from "react";
import { lockup, monogram, wordmarkHomes, type BrandMark } from "./marks";

type MarkProps = SVGProps<SVGSVGElement> & {
  /** Accessible name. Omit to hide the mark from assistive technology. */
  title?: string;
};

function Mark({ mark, title, ...rest }: MarkProps & { mark: BrandMark }) {
  return (
    <svg
      viewBox={mark.viewBox}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      <path d={mark.d} fill="currentColor" fillRule="evenodd" />
    </svg>
  );
}

/** "Honeybroad homes" wordmark. Colour follows `currentColor`. */
export function Wordmark(props: MarkProps) {
  return <Mark mark={wordmarkHomes} {...props} />;
}

/** Circular H monogram. Colour follows `currentColor`. */
export function Monogram(props: MarkProps) {
  return <Mark mark={monogram} {...props} />;
}

/** Monogram + "Honeybroad" lockup used in the header. Colour follows `currentColor`. */
export function Lockup(props: MarkProps) {
  return <Mark mark={lockup} {...props} />;
}
