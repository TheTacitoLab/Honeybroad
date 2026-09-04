"use client";

import { m } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";
import { easeInOutSoft } from "@/lib/motion";
import { useLenis } from "./SmoothScroll";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type Phase = "idle" | "covering" | "covered" | "revealing";

type PageTransitionContextValue = {
  /** Navigate with the branded cover transition. */
  navigate: (href: string) => void;
  phase: Phase;
};

const PageTransitionContext = createContext<PageTransitionContextValue>({
  navigate: () => {},
  phase: "idle",
});

const COVER_MS = 280;
const REVEAL_MS = 340;
/** If the next route takes too long, reveal anyway rather than trap the visitor. */
const FAILSAFE_MS = 4000;

/** Move keyboard focus to a hash target without scrolling it again. */
export function focusHashTarget(el: HTMLElement) {
  if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
  el.focus({ preventScroll: true });
}

/**
 * A Deep Water panel rises to cover the viewport, the next page resolves
 * underneath, then the panel lifts away. About 620 to 680ms from click to
 * fully uncovered (280ms cover, one frame, 340ms reveal, plus route
 * resolution). With reduced motion the panel is skipped and navigation is
 * immediate.
 */
export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const lenisRef = useLenis();
  const reduced = usePrefersReducedMotion();

  const [phase, setPhaseState] = useState<Phase>("idle");
  // Mirrored in a ref so click handlers can read the current phase synchronously.
  const phaseRef = useRef<Phase>("idle");
  const setPhase = useCallback((next: Phase) => {
    phaseRef.current = next;
    setPhaseState(next);
  }, []);
  const pendingHref = useRef<string | null>(null);
  const coveredPath = useRef<string | null>(null);
  const failsafe = useRef<number | null>(null);

  const clearFailsafe = () => {
    if (failsafe.current) {
      window.clearTimeout(failsafe.current);
      failsafe.current = null;
    }
  };

  const navigate = useCallback(
    (href: string) => {
      if (reduced) {
        router.push(href);
        return;
      }
      pendingHref.current = href;
      router.prefetch(href);
      // A second click while the panel is up: just re-route beneath it.
      if (phaseRef.current === "covered") {
        router.push(href);
        return;
      }
      if (phaseRef.current === "covering") return; // handleCovered pushes the latest href
      setPhase("covering");
    },
    [reduced, router, setPhase],
  );

  /* When the cover is complete, push the route. */
  const handleCovered = useCallback(() => {
    clearFailsafe();
    const href = pendingHref.current;
    if (!href) {
      setPhase("idle");
      return;
    }
    coveredPath.current = pathname;
    setPhase("covered");
    router.push(href);
    failsafe.current = window.setTimeout(() => {
      pendingHref.current = null;
      coveredPath.current = null;
      setPhase("revealing");
    }, FAILSAFE_MS);
  }, [router, pathname, setPhase]);

  /* When the new route has rendered beneath the panel, reset scroll and lift it. */
  useLayoutEffect(() => {
    if (phase !== "covered" || coveredPath.current === pathname) return;
    clearFailsafe();

    const hash = pendingHref.current?.split("#")[1];
    const target = hash ? document.getElementById(hash) : null;
    const top = target ? target.getBoundingClientRect().top + window.scrollY : 0;

    window.scrollTo({ top, behavior: "instant" });
    // Lenis still holds the previous page's scroll limit and any wheel
    // inertia; reset it and re-measure so it adopts the native position.
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.stop();
      lenis.start();
      lenis.resize();
    }
    if (target) focusHashTarget(target);

    pendingHref.current = null;
    coveredPath.current = null;

    // Let the new page paint once beneath the panel before lifting it.
    const frame = window.requestAnimationFrame(() => setPhase("revealing"));
    return () => window.cancelAnimationFrame(frame);
  }, [pathname, phase, lenisRef, setPhase]);

  useEffect(() => clearFailsafe, []);

  const covering = phase === "covering" || phase === "covered";

  return (
    <PageTransitionContext.Provider value={{ navigate, phase }}>
      {children}
      <m.div
        aria-hidden
        className={cn("fixed inset-0 z-[100] bg-deep", !covering && "pointer-events-none")}
        initial={false}
        animate={covering ? "cover" : phase === "revealing" ? "reveal" : "hidden"}
        variants={{
          hidden: {
            clipPath: "inset(100% 0 0 0)",
            transition: { duration: 0 },
          },
          cover: {
            clipPath: "inset(0 0 0 0)",
            transition: { duration: COVER_MS / 1000, ease: easeInOutSoft },
          },
          reveal: {
            clipPath: "inset(0 0 100% 0)",
            transition: { duration: REVEAL_MS / 1000, ease: easeInOutSoft },
          },
        }}
        onAnimationComplete={(definition) => {
          if (definition === "cover") handleCovered();
          if (definition === "reveal") setPhase("idle");
        }}
      />
    </PageTransitionContext.Provider>
  );
}

export function usePageTransition() {
  return useContext(PageTransitionContext);
}
