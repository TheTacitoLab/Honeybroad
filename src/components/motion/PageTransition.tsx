"use client";

import { m, useReducedMotion } from "framer-motion";
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
import { easeInOutSoft } from "@/lib/motion";
import { useLenis } from "./SmoothScroll";

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

const COVER_MS = 420;
const REVEAL_MS = 520;
/** If the next route takes too long, reveal anyway rather than trap the visitor. */
const FAILSAFE_MS = 4000;

const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * A Deep Water panel rises to cover the viewport, the next page resolves
 * underneath, then the panel lifts away. Roughly 600 to 700ms in total.
 * With reduced motion the panel is skipped and navigation is immediate.
 */
export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const lenisRef = useLenis();
  const reduced = useReducedMotion();

  const [phase, setPhase] = useState<Phase>("idle");
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
      setPhase("covering");
    },
    [reduced, router],
  );

  /* When the cover is complete, push the route. */
  const handleCovered = useCallback(() => {
    const href = pendingHref.current;
    if (!href) {
      setPhase("idle");
      return;
    }
    coveredPath.current = pathname;
    setPhase("covered");
    router.push(href);
    failsafe.current = window.setTimeout(() => setPhase("revealing"), FAILSAFE_MS);
  }, [router, pathname]);

  /* When the new route has rendered beneath the panel, reset scroll and lift it. */
  useIsomorphicLayoutEffect(() => {
    if (phase !== "covered" || coveredPath.current === pathname) return;
    clearFailsafe();

    const hash = pendingHref.current?.split("#")[1];
    const target = hash ? document.getElementById(hash) : null;
    const top = target ? target.getBoundingClientRect().top + window.scrollY : 0;

    window.scrollTo({ top, behavior: "instant" });
    lenisRef.current?.scrollTo(top, { immediate: true, force: true });

    pendingHref.current = null;
    coveredPath.current = null;

    // Let the new page paint once beneath the panel before lifting it.
    const frame = window.requestAnimationFrame(() => setPhase("revealing"));
    return () => window.cancelAnimationFrame(frame);
  }, [pathname, phase, lenisRef]);

  useEffect(() => clearFailsafe, []);

  const covering = phase === "covering" || phase === "covered";

  return (
    <PageTransitionContext.Provider value={{ navigate, phase }}>
      {children}
      <m.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[100] bg-deep"
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
