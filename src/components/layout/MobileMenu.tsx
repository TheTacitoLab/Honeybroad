"use client";

import { AnimatePresence, m } from "framer-motion";
import { useCallback, useEffect, useRef } from "react";
import type { NavItem } from "@/data/navigation";
import { site } from "@/data/site";
import { easeInOutSoft, easeOutSoft } from "@/lib/motion";
import { Lockup } from "@/components/brand/Logo";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { useLenis } from "@/components/motion/SmoothScroll";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type Props = {
  navigation: NavItem[];
  open: boolean;
  onClose: () => void;
};

/**
 * Full-screen menu: Deep Water ground, large cream serif links that arrive a
 * beat apart. Nothing else. Focus stays inside while it is open.
 */
export function MobileMenu({ navigation, open, onClose }: Props) {
  const lenisRef = useLenis();
  const reduced = usePrefersReducedMotion();
  const dialog = useRef<HTMLDivElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);
  const previouslyFocused = useRef<Element | null>(null);

  useEffect(() => {
    if (!open) return;
    previouslyFocused.current = document.activeElement;
    const lenis = lenisRef.current;
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const items = dialog.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (!items?.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const focusTimer = window.setTimeout(() => firstLink.current?.focus(), 300);

    return () => {
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(focusTimer);
      document.documentElement.style.overflow = "";
      lenis?.start();
      if (previouslyFocused.current instanceof HTMLElement) {
        previouslyFocused.current.focus();
      }
    };
  }, [open, onClose, lenisRef]);

  // Release the page before a link acts, so same-page anchors can scroll.
  const closeAndRelease = useCallback(() => {
    lenisRef.current?.start();
    onClose();
  }, [lenisRef, onClose]);

  // Flatten navigation into: About, Developments, (Newmills…), Contact
  const rows = navigation.flatMap((item) => {
    const primary = { label: item.label, href: item.href, sub: false };
    const subs =
      item.children
        ?.filter((c) => c.href !== item.href)
        .map((c) => ({ label: c.label, href: c.href, sub: true })) ?? [];
    return [primary, ...subs];
  });

  return (
    <AnimatePresence>
      {open ? (
        <m.div
          key="mobile-menu"
          id="mobile-menu"
          ref={dialog}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-[80] flex flex-col bg-deep text-cream"
          initial={reduced ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
          animate={reduced ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
          exit={
            reduced
              ? { opacity: 0, transition: { duration: 0.2 } }
              : { clipPath: "inset(0 0 100% 0)", transition: { duration: 0.45, ease: easeInOutSoft } }
          }
          transition={{ duration: 0.6, ease: easeInOutSoft }}
        >
          <div className="gutter flex h-16 items-center justify-between md:h-20">
            <TransitionLink href="/" onClick={closeAndRelease} aria-label="Honeybroad home">
              <Lockup className="h-[22px] w-auto" />
            </TransitionLink>
            <button
              type="button"
              onClick={onClose}
              className="text-small link-line opacity-90"
            >
              Close
            </button>
          </div>

          <nav
            aria-label="Main"
            className="gutter flex flex-1 flex-col justify-center pb-16"
          >
            <ul className="flex flex-col">
              {rows.map((row, i) => (
                <m.li
                  key={row.href}
                  initial={{ opacity: 0, y: reduced ? 0 : 22 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      delay: 0.22 + i * 0.07,
                      duration: 0.75,
                      ease: easeOutSoft,
                    },
                  }}
                  exit={{ opacity: 0, transition: { duration: 0.15 } }}
                  className={row.sub ? "mt-2 pl-6" : i === 0 ? "" : "mt-4"}
                >
                  <TransitionLink
                    ref={i === 0 ? firstLink : undefined}
                    href={row.href}
                    onClick={closeAndRelease}
                    className={
                      row.sub
                        ? "text-display-sm -my-1.5 block py-1.5 opacity-85"
                        : "text-display-lg block"
                    }
                  >
                    {row.label}
                  </TransitionLink>
                </m.li>
              ))}
            </ul>
          </nav>

          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.7, duration: 0.6 } }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            className="gutter text-small flex flex-col gap-1 pb-8 text-cream/85"
          >
            <a href={`mailto:${site.email}`} className="link-underline self-start">
              {site.email}
            </a>
            <span>{site.region}</span>
          </m.div>
        </m.div>
      ) : null}
    </AnimatePresence>
  );
}
