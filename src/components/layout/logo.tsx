import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * VIPEX lockup: a chamfered 4-point star mark (nod to "Persian Star") + a
 * modernized grotesque wordmark. Placeholder for the real vector logo —
 * swap the <svg> and keep the layout. `tone` adapts it to dark sections.
 */
export function Logo({
  className,
  tone = "default",
  showParent = false,
}: {
  className?: string;
  tone?: "default" | "onDark";
  showParent?: boolean;
}) {
  const fg = tone === "onDark" ? "text-white" : "text-foreground";
  return (
    <Link
      href="/"
      aria-label="VIPEX — Persian Star, home"
      className={cn("group inline-flex items-center gap-2.5", className)}
    >
      <StarMark className="size-7 shrink-0" />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-xl font-extrabold uppercase tracking-[0.14em]",
            fg,
          )}
        >
          VIPEX
        </span>
        {showParent && (
          <span
            className={cn(
              "mt-1 font-mono text-[0.6rem] uppercase tracking-[0.2em]",
              tone === "onDark" ? "text-white/50" : "text-muted-foreground",
            )}
          >
            Persian Star
          </span>
        )}
      </span>
    </Link>
  );
}

function StarMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      className={className}
      fill="none"
    >
      <rect
        x="1"
        y="1"
        width="30"
        height="30"
        rx="6"
        className="fill-obsidian"
      />
      {/* Chamfered 4-point star */}
      <path
        d="M16 5 L18.6 13.4 L27 16 L18.6 18.6 L16 27 L13.4 18.6 L5 16 L13.4 13.4 Z"
        className="fill-vipex"
      />
    </svg>
  );
}
