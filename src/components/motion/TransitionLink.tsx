"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps, MouseEvent, Ref } from "react";
import { usePageTransition } from "./PageTransition";
import { useScrollTo } from "./SmoothScroll";

type Props = Omit<ComponentProps<typeof Link>, "href" | "ref"> & {
  href: string;
  ref?: Ref<HTMLAnchorElement>;
};

/**
 * Drop-in replacement for next/link that routes through the branded page
 * transition. Same-page anchors scroll smoothly instead of navigating.
 */
export function TransitionLink({
  href,
  onClick,
  onNavigate,
  ref,
  ...rest
}: Props) {
  const { navigate } = usePageTransition();
  const pathname = usePathname();
  const scrollTo = useScrollTo();

  const [path, hash] = href.split("#");
  const samePage = path === "" || path === pathname;

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;
    if (hash && samePage) {
      event.preventDefault();
      scrollTo(`#${hash}`);
      window.history.pushState(null, "", `#${hash}`);
    }
  };

  return (
    <Link
      ref={ref}
      href={href}
      onClick={handleClick}
      onNavigate={(event) => {
        onNavigate?.(event);
        if (samePage) return;
        event.preventDefault();
        navigate(href);
      }}
      {...rest}
    />
  );
}
