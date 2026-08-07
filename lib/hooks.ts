"use client";

import { useEffect, useState } from "react";

export function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(query.matches);

    const handleChange = (event: MediaQueryListEvent) => setPrefersReducedMotion(event.matches);
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  return prefersReducedMotion;
}

export function useIsTouchOrNarrow(breakpointPx = 1024) {
  const [isTouchOrNarrow, setIsTouchOrNarrow] = useState(true);

  useEffect(() => {
    const coarsePointer = window.matchMedia("(pointer: coarse)");
    const narrowScreen = window.matchMedia(`(max-width: ${breakpointPx}px)`);

    const update = () => setIsTouchOrNarrow(coarsePointer.matches || narrowScreen.matches);
    update();

    coarsePointer.addEventListener("change", update);
    narrowScreen.addEventListener("change", update);
    return () => {
      coarsePointer.removeEventListener("change", update);
      narrowScreen.removeEventListener("change", update);
    };
  }, [breakpointPx]);

  return isTouchOrNarrow;
}
