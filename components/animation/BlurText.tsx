"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { CSSProperties } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Snapshot = Record<string, string | number>;
type BlurTextTag = "p" | "span" | "div" | "h1" | "h2" | "h3";

type BlurTextProps = {
  text?: string;
  delay?: number;
  className?: string;
  segmentClassName?: string;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  threshold?: number;
  rootMargin?: string;
  animationFrom?: Snapshot;
  animationTo?: Snapshot[];
  easing?: (value: number) => number;
  onAnimationComplete?: () => void;
  stepDuration?: number;
  as?: BlurTextTag;
  style?: CSSProperties;
};

function buildKeyframes(from: Snapshot, steps: Snapshot[]) {
  const keys = new Set([...Object.keys(from), ...steps.flatMap((step) => Object.keys(step))]);
  const keyframes: Record<string, Array<string | number>> = {};

  keys.forEach((key) => {
    let current = from[key] ?? 0;
    keyframes[key] = [
      current,
      ...steps.map((step) => {
        current = step[key] ?? current;
        return current;
      })
    ];
  });

  return keyframes;
}

export function BlurText({
  text = "",
  delay = 42,
  className,
  segmentClassName,
  animateBy = "letters",
  direction = "top",
  threshold = 0.1,
  rootMargin = "0px",
  animationFrom,
  animationTo,
  easing = (value) => value,
  onAnimationComplete,
  stepDuration = 0.36,
  as: Tag = "p",
  style
}: BlurTextProps) {
  const reduceMotion = useReducedMotion();
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLElement | null>(null);
  const elements = useMemo(() => (animateBy === "words" ? text.split(" ") : text.split("")), [animateBy, text]);

  useEffect(() => {
    if (reduceMotion) {
      setInView(true);
      return;
    }

    const node = ref.current;

    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold, rootMargin }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [reduceMotion, rootMargin, threshold]);

  const defaultFrom = useMemo(
    () =>
      direction === "top"
        ? { filter: "blur(10px)", opacity: 0, y: -46 }
        : { filter: "blur(10px)", opacity: 0, y: 46 },
    [direction]
  );

  const defaultTo = useMemo(
    () => [
      {
        filter: "blur(5px)",
        opacity: 0.54,
        y: direction === "top" ? 5 : -5
      },
      { filter: "blur(0px)", opacity: 1, y: 0 }
    ],
    [direction]
  );

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;
  const stepCount = toSnapshots.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = Array.from({ length: stepCount }, (_, index) => (stepCount === 1 ? 0 : index / (stepCount - 1)));
  const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);

  return (
    <Tag
      ref={ref as never}
      className={cn("flex flex-wrap", className)}
      style={style}
    >
      {elements.map((segment, index) => {
        const transition = {
          duration: totalDuration,
          times,
          delay: (index * delay) / 1000,
          ease: easing
        };

        return (
          <motion.span
            animate={reduceMotion ? undefined : inView ? animateKeyframes : fromSnapshot}
            className={cn("inline-block will-change-[transform,filter,opacity]", segmentClassName)}
            initial={reduceMotion ? false : fromSnapshot}
            key={`${segment}-${index}`}
            onAnimationComplete={index === elements.length - 1 ? onAnimationComplete : undefined}
            transition={transition}
          >
            {segment === " " ? "\u00A0" : segment}
            {animateBy === "words" && index < elements.length - 1 ? "\u00A0" : null}
          </motion.span>
        );
      })}
    </Tag>
  );
}

export default BlurText;
