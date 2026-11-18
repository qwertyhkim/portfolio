"use client";

import Script from "next/script";
import { useEffect } from "react";

declare global {
  interface Window {
    initHeroMotion?: () => void;
  }
}

// Canvas for the hero motion graphic (logic lives in /public/hero-motion.js).
// Re-initializes when the home page mounts again after visiting a project page.
export default function HeroCanvas() {
  useEffect(() => {
    window.initHeroMotion?.();
  }, []);
  return (
    <>
      <canvas id="hero-canvas" className="hero-canvas" aria-hidden="true" />
      <Script src="/hero-motion.js" strategy="afterInteractive" onLoad={() => window.initHeroMotion?.()} />
    </>
  );
}
