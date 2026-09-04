"use client";

import { usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import type { NavItem } from "@/data/navigation";
import { cn } from "@/lib/utils";
import { useHeaderTone } from "@/hooks/useHeaderTone";
import { Lockup } from "@/components/brand/Logo";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { DevelopmentDropdown } from "./DevelopmentDropdown";
import { MobileMenu } from "./MobileMenu";

/**
 * Fixed header. Transparent over hero sections, then a quiet ground in the
 * colour of whichever section is beneath it, with the logo and links
 * inverting so they always read.
 */
export function Header({ navigation }: { navigation: NavItem[] }) {
  const { tone, scrolled, pastHero } = useHeaderTone();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // Close the menu whenever the route changes.
  const [seenPath, setSeenPath] = useState(pathname);
  if (seenPath !== pathname) {
    setSeenPath(pathname);
    setMenuOpen(false);
  }

  const onDeep = tone === "deep";

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-500 ease-out",
          onDeep ? "text-cream" : "text-deep",
        )}
      >
        {/* An opaque ground with a short soft edge; never a frosted band across imagery. */}
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-x-0 top-0 -z-10 h-[calc(100%+0.5rem)] transition-[opacity,background-color] duration-500 ease-out [mask-image:linear-gradient(to_bottom,black_82%,transparent)]",
            onDeep ? "bg-deep" : tone === "cream" ? "bg-cream" : "bg-white",
            scrolled ? "opacity-100" : "opacity-0",
          )}
        />
        <div className="wrap gutter flex h-16 items-center justify-between md:h-20">
          <TransitionLink
            href="/"
            aria-label="Honeybroad home"
            aria-hidden={!pastHero || undefined}
            tabIndex={pastHero ? 0 : -1}
            className={cn(
              "block transition-opacity",
              // Quick to leave, slower to arrive, so it never overlaps the hero wordmark.
              pastHero ? "opacity-100 duration-500" : "pointer-events-none opacity-0 duration-150",
            )}
          >
            <Lockup className="h-[22px] w-auto md:h-[26px]" />
          </TransitionLink>

          <nav aria-label="Main" className="hidden md:block">
            <ul className="text-small flex items-center gap-9">
              {navigation.map((item) =>
                item.children ? (
                  <li key={item.href}>
                    <DevelopmentDropdown item={item} tone={tone} />
                  </li>
                ) : (
                  <li key={item.href}>
                    <TransitionLink
                      href={item.href}
                      aria-current={
                        !item.href.includes("#") && pathname === item.href ? "page" : undefined
                      }
                      className="link-line opacity-90 transition-opacity duration-300 hover:opacity-100 aria-[current=page]:opacity-100"
                    >
                      {item.label}
                    </TransitionLink>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <button
            type="button"
            className="text-small link-line md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(true)}
          >
            Menu
          </button>
        </div>
      </header>

      <MobileMenu navigation={navigation} open={menuOpen} onClose={closeMenu} />
    </>
  );
}
