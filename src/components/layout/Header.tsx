"use client";

import { usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import { navigation } from "@/data/navigation";
import { cn } from "@/lib/utils";
import { useHeaderTone } from "@/hooks/useHeaderTone";
import { Lockup } from "@/components/brand/Logo";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { DevelopmentDropdown } from "./DevelopmentDropdown";
import { MobileMenu } from "./MobileMenu";

/**
 * Fixed header. Transparent over hero sections, then a soft ground in the
 * colour of whichever section is beneath it, with the logo and links
 * inverting so they always read.
 */
export function Header() {
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
          "fixed inset-x-0 top-0 z-50 transition-[background-color,color] duration-500 ease-out",
          onDeep ? "text-cream" : "text-deep",
          scrolled
            ? onDeep
              ? "bg-deep/85 backdrop-blur-md"
              : tone === "cream"
                ? "bg-cream/85 backdrop-blur-md"
                : "bg-white/85 backdrop-blur-md"
            : "bg-transparent",
        )}
      >
        <div className="wrap gutter flex h-16 items-center justify-between md:h-20">
          <TransitionLink
            href="/"
            aria-label="Honeybroad home"
            className={cn(
              "block transition-opacity duration-500",
              pastHero ? "opacity-100" : "pointer-events-none opacity-0",
            )}
            tabIndex={pastHero ? 0 : -1}
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
                      className="link-line opacity-80 transition-opacity duration-300 hover:opacity-100 aria-[current=page]:opacity-100"
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

      <MobileMenu open={menuOpen} onClose={closeMenu} />
    </>
  );
}
