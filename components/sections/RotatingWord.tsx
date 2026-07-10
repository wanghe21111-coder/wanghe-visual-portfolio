"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export function RotatingWord({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion || words.length <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setIndex((value) => (value + 1) % words.length);
    }, 1900);

    return () => window.clearInterval(timer);
  }, [reduceMotion, words.length]);

  return (
    <span className="relative inline-grid min-w-[12rem] overflow-hidden text-brass">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={reduceMotion ? false : { y: 18, opacity: 0 }}
          animate={reduceMotion ? undefined : { y: 0, opacity: 1 }}
          exit={reduceMotion ? undefined : { y: -18, opacity: 0 }}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
