"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

const getSnapshot = () => window.matchMedia(QUERY).matches;
/** Server (and first client render) assume motion is fine, so markup hydrates identically. */
const getServerSnapshot = () => false;

/**
 * Hydration-safe reduced-motion preference. Returns false during server
 * rendering and hydration, then the real preference immediately afterwards.
 * Only use it for values that don't change the rendered markup on first paint.
 */
export function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
