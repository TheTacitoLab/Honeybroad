"use client";

import Lenis from "lenis";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
  type RefObject,
} from "react";

type LenisRef = RefObject<Lenis | null>;

const LenisContext = createContext<LenisRef>({ current: null });

/**
 * Smooth scrolling on pointer devices only. Touch devices keep native
 * scrolling (it is already smooth and far cheaper), and visitors who prefer
 * reduced motion never get Lenis at all.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (reduced || !finePointer) return;

    const instance = new Lenis({
      autoRaf: true,
      lerp: 0.085,
      wheelMultiplier: 0.95,
      smoothWheel: true,
    });
    lenisRef.current = instance;

    return () => {
      instance.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisRef}>{children}</LenisContext.Provider>
  );
}

/** The live Lenis instance, or null when native scrolling is in use. Read it inside effects and handlers. */
export function useLenis(): LenisRef {
  return useContext(LenisContext);
}

/**
 * Scroll to a target (selector, element or pixel offset) using Lenis when it
 * is running, otherwise the browser's own smooth scrolling.
 */
export function useScrollTo() {
  const lenisRef = useLenis();

  return useCallback(
    (
      target: string | HTMLElement | number,
      options: { immediate?: boolean; offset?: number } = {},
    ) => {
      const { immediate = false, offset = 0 } = options;
      const lenis = lenisRef.current;

      if (lenis) {
        lenis.scrollTo(target, { immediate, offset, duration: 1.4, force: immediate });
        return;
      }

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const behavior: ScrollBehavior = immediate || reduced ? "instant" : "smooth";

      if (typeof target === "number") {
        window.scrollTo({ top: target + offset, behavior });
        return;
      }

      const el =
        typeof target === "string" ? document.querySelector(target) : target;
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top, behavior });
    },
    [lenisRef],
  );
}
