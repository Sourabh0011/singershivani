"use client";

import { MotionConfig } from "motion/react";

export default function Providers({ children }: { children: React.ReactNode }) {
  // Respects the visitor's "reduce motion" OS setting.
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
