"use client";

import { motion, type Variants } from "motion/react";
import { revealUp, inView } from "@/lib/motion";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  /** Delay in seconds, for hand-tuned sequencing. */
  delay?: number;
  as?: "div" | "section" | "li" | "article" | "span";
}

/**
 * Scroll-triggered reveal. Fires once when the element enters the viewport.
 * Reduced-motion users get an instant, opacity-only appearance (handled in CSS).
 */
export function Reveal({
  children,
  className,
  variants = revealUp,
  delay,
  as = "div",
}: RevealProps) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={inView}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </MotionTag>
  );
}
