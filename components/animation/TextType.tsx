"use client";

import { gsap } from "gsap";
import { useReducedMotion } from "framer-motion";
import type { ElementType, ReactNode } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type VariableSpeed = {
  min: number;
  max: number;
};

type TextTypeProps = {
  text: string | string[];
  as?: ElementType;
  typingSpeed?: number;
  initialDelay?: number;
  pauseDuration?: number;
  deletingSpeed?: number;
  loop?: boolean;
  className?: string;
  showCursor?: boolean;
  hideCursorWhileTyping?: boolean;
  cursorCharacter?: ReactNode;
  cursorClassName?: string;
  cursorBlinkDuration?: number;
  textColors?: string[];
  variableSpeed?: VariableSpeed;
  onSentenceComplete?: (sentence: string, index: number) => void;
  startOnVisible?: boolean;
  reverseMode?: boolean;
};

export function TextType({
  text,
  as: Component = "span",
  typingSpeed = 50,
  initialDelay = 0,
  pauseDuration = 2000,
  deletingSpeed = 30,
  loop = true,
  className,
  showCursor = true,
  hideCursorWhileTyping = false,
  cursorCharacter = "|",
  cursorClassName,
  cursorBlinkDuration = 0.5,
  textColors = [],
  variableSpeed,
  onSentenceComplete,
  startOnVisible = false,
  reverseMode = false
}: TextTypeProps) {
  const textArray = useMemo(() => (Array.isArray(text) ? text : [text]), [text]);
  const reduceMotion = useReducedMotion();
  const [displayedText, setDisplayedText] = useState("");
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(!startOnVisible);
  const cursorRef = useRef<HTMLSpanElement | null>(null);
  const containerRef = useRef<HTMLElement | null>(null);

  const getTypingSpeed = useCallback(() => {
    if (!variableSpeed) {
      return typingSpeed;
    }

    return Math.random() * (variableSpeed.max - variableSpeed.min) + variableSpeed.min;
  }, [typingSpeed, variableSpeed]);

  useEffect(() => {
    if (!startOnVisible || !containerRef.current) {
      return;
    }

    const node = containerRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [startOnVisible]);

  useEffect(() => {
    const cursor = cursorRef.current;

    if (!showCursor || !cursor) {
      return;
    }

    if (reduceMotion) {
      gsap.set(cursor, { opacity: 1 });
      return;
    }

    gsap.set(cursor, { opacity: 1 });
    gsap.to(cursor, {
      opacity: 0,
      duration: cursorBlinkDuration,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut"
    });

    return () => {
      gsap.killTweensOf(cursor);
    };
  }, [cursorBlinkDuration, reduceMotion, showCursor]);

  useEffect(() => {
    if (reduceMotion) {
      setDisplayedText(textArray[0] ?? "");
      return;
    }

    if (!isVisible || textArray.length === 0) {
      return;
    }

    const currentText = textArray[currentTextIndex] ?? "";
    const processedText = reverseMode ? currentText.split("").reverse().join("") : currentText;
    let timeout: number | undefined;

    if (isDeleting) {
      if (displayedText === "") {
        setIsDeleting(false);

        if (currentTextIndex === textArray.length - 1 && !loop) {
          return;
        }

        onSentenceComplete?.(currentText, currentTextIndex);
        setCurrentTextIndex((value) => (value + 1) % textArray.length);
        setCurrentCharIndex(0);
      } else {
        timeout = window.setTimeout(() => {
          setDisplayedText((value) => value.slice(0, -1));
        }, deletingSpeed);
      }
    } else if (currentCharIndex < processedText.length) {
      const nextDelay = currentCharIndex === 0 && displayedText === "" ? initialDelay + getTypingSpeed() : getTypingSpeed();
      timeout = window.setTimeout(() => {
        setDisplayedText((value) => value + processedText[currentCharIndex]);
        setCurrentCharIndex((value) => value + 1);
      }, nextDelay);
    } else if (loop || currentTextIndex < textArray.length - 1) {
      timeout = window.setTimeout(() => {
        setIsDeleting(true);
      }, pauseDuration);
    }

    return () => {
      if (timeout !== undefined) {
        window.clearTimeout(timeout);
      }
    };
  }, [
    currentCharIndex,
    currentTextIndex,
    deletingSpeed,
    displayedText,
    getTypingSpeed,
    initialDelay,
    isDeleting,
    isVisible,
    loop,
    onSentenceComplete,
    pauseDuration,
    reduceMotion,
    reverseMode,
    textArray
  ]);

  const currentColor = textColors.length > 0 ? textColors[currentTextIndex % textColors.length] : undefined;
  const currentLength = textArray[currentTextIndex]?.length ?? 0;
  const hideCursor = hideCursorWhileTyping && (currentCharIndex < currentLength || isDeleting);

  return (
    <Component className={cn("text-type", className)} ref={containerRef}>
      <span className="text-type__content" style={{ color: currentColor }}>
        {displayedText}
      </span>
      {showCursor ? (
        <span
          className={cn("text-type__cursor", hideCursor && "text-type__cursor--hidden", cursorClassName)}
          ref={cursorRef}
        >
          {cursorCharacter}
        </span>
      ) : null}
    </Component>
  );
}

export default TextType;
