/**
 * Shared motion language — "machined physics": weighted, decisive, no bounce.
 * Import these variants so every reveal across the site feels like one system.
 */
import type { Variants, Transition } from "motion/react";

export const easeMachined = [0.22, 1, 0.36, 1] as const;

export const transitionBase: Transition = {
  duration: 0.55,
  ease: easeMachined,
};

/** Subtle rise + fade — the default section reveal. */
export const revealUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: transitionBase },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: easeMachined } },
};

/** Parent that staggers children (grids, lists). */
export const staggerParent: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: transitionBase },
};

/** Standard viewport trigger config — fire once, slightly before fully in view. */
export const inView = { once: true, margin: "-80px" } as const;
