import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

type Subtitle = "full" | "short" | "none";

/**
 * Persian Star lockup, rebuilt as live text so it stays crisp at any size:
 * PERSI★NSTAR — the real star-A brand mark stands in for the "A", exactly as
 * in the company logo — over a mono descriptor line.
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
        <Image
          src="/images/logo/star-mark.png"
          alt=""
          aria-hidden="true"
          width={631}
          height={455}
          className="mx-[0.06em] h-[0.94em] w-auto"
        />
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

