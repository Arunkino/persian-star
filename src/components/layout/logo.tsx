import Link from "next/link";
import { cn } from "@/lib/utils";

type Subtitle = "full" | "short" | "none";

/**
 * Persian Star lockup, rebuilt as live text + vector so it stays crisp at any
 * size: PERSI★NSTAR — the red five-point star stands in for the "A", echoing
 * the company logo — over a mono descriptor line. Swap for the real vector
 * artwork anytime; keep the layout.
 */
export function Logo({
  className,
  tone = "default",
  subtitle = "short",
}: {
  className?: string;
  tone?: "default" | "onDark";
  subtitle?: Subtitle;
}) {
  const fg = tone === "onDark" ? "text-white" : "text-foreground";
  const sub = tone === "onDark" ? "text-white/50" : "text-muted-foreground";

  return (
    <Link
      href="/"
      aria-label="Persian Star — home"
      className={cn("group inline-flex flex-col leading-none", className)}
    >
      <span
        className={cn(
          "flex items-center font-display text-lg font-extrabold uppercase tracking-[0.03em] md:text-xl",
          fg,
        )}
      >
        Persi
        <StarGlyph className="mx-[0.03em] size-[0.82em] text-vipex" />
        nstar
      </span>
      {subtitle !== "none" && (
        <span
          className={cn(
            "mt-1.5 font-mono text-[0.55rem] uppercase tracking-[0.24em]",
            sub,
          )}
        >
          {subtitle === "full"
            ? "Building Hardware & Tools Trading L.L.C"
            : "Building Hardware & Tools"}
        </span>
      )}
    </Link>
  );
}

/** Five-point star — the "A" of the Persian Star wordmark. */
export function StarGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <polygon points="12,1 14.59,8.44 22.46,8.6 16.19,13.36 18.47,20.9 12,16.4 5.53,20.9 7.81,13.36 1.54,8.6 9.41,8.44" />
    </svg>
  );
}
