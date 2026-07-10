"use client";

import { useEffect, useState } from "react";
import { LiquidEther } from "@/components/background/LiquidEther";

export function SiteLiquidBackground() {
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setShouldReduceMotion(query.matches);

    updateMotionPreference();
    query.addEventListener("change", updateMotionPreference);

    return () => query.removeEventListener("change", updateMotionPreference);
  }, []);

  return (
    <div aria-hidden="true" className="site-liquid-background">
      {shouldReduceMotion ? (
        <div className="liquid-ether-static" />
      ) : (
        <LiquidEther
          autoSpeed={0.34}
          colors={["#c8a96a", "#789aa3", "#b36b52", "#91a28f"]}
          intensity={0.92}
          mouseForce={0.72}
          resolution={0.56}
        />
      )}
    </div>
  );
}
