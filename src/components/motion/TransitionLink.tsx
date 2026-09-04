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
      // Next frame so anything the click closed (the mobile menu, which
      // pauses Lenis) has released the page first.
      window.requestAnimationFrame(() => {
        scrollTo(`#${hash}`);
        window.history.pushState(null, "", `#${hash}`);
        const target = document.getElementById(hash);
        if (target) focusHashTarget(target);
      });
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
