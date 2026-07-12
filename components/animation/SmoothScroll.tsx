"use client";

import { useLayoutEffect } from "react";
import Lenis from "lenis";

function prefersReducedMotion() {
  if (typeof window === "undefined") {
    return true;
  }

  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function SmoothScroll() {
  useLayoutEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    const resetScroll = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    };

    resetScroll();
    const resetFrame = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(resetScroll);
    });
    window.addEventListener("pageshow", resetScroll);

    if (prefersReducedMotion()) {
      return () => {
        window.cancelAnimationFrame(resetFrame);
        window.removeEventListener("pageshow", resetScroll);
        window.history.scrollRestoration = previousScrollRestoration;
      };
    }

    const lenis = new Lenis({
      duration: 1.08,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true
    });

    let frame = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };

    frame = requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(resetFrame);
      window.removeEventListener("pageshow", resetScroll);
      cancelAnimationFrame(frame);
      lenis.destroy();
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  return null;
}
