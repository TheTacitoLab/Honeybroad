"use client";

import { AnimatePresence, m } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import type { NavItem } from "@/data/navigation";
import { cn, type Tone } from "@/lib/utils";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { easeOutSoft } from "@/lib/motion";

type Props = {
  item: NavItem;
  tone: Tone;
  className?: string;
};

/**
 * A quiet dropdown for the Developments item. Opens on hover, focus or click;
 * closes on Escape, outside click or navigation. The panel always uses the
 * opposite ground to the header so it reads clearly over any section.
 */
export function DevelopmentDropdown({ item, tone, className }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const id = useId();
  const children = item.children ?? [];

  // Close whenever the route changes.
  const [seenPath, setSeenPath] = useState(pathname);
  if (seenPath !== pathname) {
    setSeenPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onClick);
    };
  }, [open]);

  const inverted = tone === "deep" ? "bg-cream text-deep" : "bg-deep text-cream";
  const active = pathname.startsWith(item.href);

  return (
    <div
      ref={ref}
      className={cn("relative", className)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={(e) => {
        if (!ref.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        onFocus={() => setOpen(true)}
        aria-current={active ? "page" : undefined}
        className="link-line inline-flex items-baseline gap-1.5 opacity-80 transition-opacity duration-300 hover:opacity-100 aria-[current=page]:opacity-100"
      >
        {item.label}
        <span
          aria-hidden
          className={cn(
            "inline-block text-[0.7em] transition-transform duration-300",
            open && "translate-y-0.5",
          )}
        >
          ↓
        </span>
      </button>

      <AnimatePresence>
        {open ? (
          <m.div
            id={id}
            role="menu"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.28, ease: easeOutSoft }}
            className="absolute left-0 top-full pt-4"
          >
            <ul className={cn("min-w-[13rem] px-5 py-4", inverted)}>
              {children.map((child) => (
                <li key={child.href} role="none">
                  <TransitionLink
                    role="menuitem"
                    href={child.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "text-small block py-1.5 transition-opacity duration-300 hover:opacity-100",
                      pathname === child.href ? "opacity-100" : "opacity-75",
                    )}
                  >
                    {child.label}
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </m.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
