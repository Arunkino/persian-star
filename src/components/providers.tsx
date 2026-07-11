"use client";

import { ReactLenis } from "lenis/react";
import { TooltipProvider } from "@/components/ui/tooltip";

/**
 * App-wide client providers: Lenis smooth scroll + shadcn tooltip context.
 * Lenis auto-respects prefers-reduced-motion via CSS; we keep the easing
 * weighted and short so it reads as "machined", not floaty.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.1,
        smoothWheel: true,
      }}
    >
      <TooltipProvider delayDuration={200}>{children}</TooltipProvider>
    </ReactLenis>
  );
}
