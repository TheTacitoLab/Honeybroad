"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps, MouseEvent, Ref } from "react";
import { focusHashTarget, usePageTransition } from "./PageTransition";
import { useScrollTo } from "./SmoothScroll";

type Props = Omit<ComponentProps<typeof Link>, "href" | "ref"> & {
  href: string;
  ref?: Ref<HTMLAnchorElement>;
};

/**
 * Drop-in replacement for next/link that routes through the branded page
 * transition. Same-page anchors scroll smoothly instead of navigating, and a
 * link to the page you are already on scrolls back to the top. Modifier
 * clicks are left to the browser so they open new tabs as expected.
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
    if (event.defaultPrevented || !samePage) return;

    const modified =
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      (rest.target !== undefined && rest.target !== "_self");
    if (modified) return;

    event.preventDefault();
    // Next frame so anything the click closed (the mobile menu, which
    // pauses Lenis) has released the page first.
    window.requestAnimationFrame(() => {
      if (hash) {
        scrollTo(`#${hash}`);
        window.history.pushState(null, "", `#${hash}`);
        const target = document.getElementById(hash);
        if (target) focusHashTarget(target);
      } else {
        scrollTo(0);
        if (window.location.hash) {
          window.history.replaceState(null, "", path || pathname);
        }
      }
    });
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
