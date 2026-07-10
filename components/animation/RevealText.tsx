"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type RevealTextProps = {
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
};

export function RevealText({ lines, className, lineClassName, delay = 0 }: RevealTextProps) {
  const reduceMotion = useReducedMotion();

  return (
    <span className={cn("block", className)}>
      {lines.map((line, index) => (
        <span className="block overflow-hidden" key={line}>
          <motion.span
            className={cn("block", lineClassName)}
            initial={reduceMotion ? false : { y: "110%", opacity: 0.2 }}
            animate={reduceMotion ? undefined : { y: 0, opacity: 1 }}
            transition={{
              duration: 0.92,
              delay: delay + index * 0.12,
              ease: [0.22, 1, 0.36, 1]
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
