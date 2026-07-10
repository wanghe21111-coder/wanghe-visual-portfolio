"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function CursorFollower() {
  const reduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const x = useSpring(mouseX, { stiffness: 160, damping: 26, mass: 0.5 });
  const y = useSpring(mouseY, { stiffness: 160, damping: 26, mass: 0.5 });

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    const finePointer = window.matchMedia("(pointer: fine)").matches;
    setEnabled(finePointer);

    if (!finePointer) {
      return;
    }

    const handleMove = (event: PointerEvent) => {
      mouseX.set(event.clientX - 18);
      mouseY.set(event.clientY - 18);
    };

    const handleOver = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      setActive(Boolean(target?.closest("a, button, [data-cursor='focus']")));
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerover", handleOver);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerover", handleOver);
    };
  }, [mouseX, mouseY, reduceMotion]);

  if (!enabled || reduceMotion) {
    return null;
  }

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[90] hidden h-9 w-9 rounded-full border border-paper/45 mix-blend-difference md:block"
      style={{ x, y }}
      animate={{ scale: active ? 1.7 : 1, opacity: active ? 0.42 : 0.82 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}
