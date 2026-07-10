"use client";

import type { ReactNode } from "react";
import { CursorFollower } from "@/components/animation/CursorFollower";
import { SmoothScroll } from "@/components/animation/SmoothScroll";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <>
      <SmoothScroll />
      <CursorFollower />
      {children}
    </>
  );
}
