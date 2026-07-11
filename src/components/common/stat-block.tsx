import { cn } from "@/lib/utils";

export interface Stat {
  value: string;
  label: string;
}

export function StatBlock({
  stat,
  onDark = false,
  className,
}: {
  stat: Stat;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <div
        className={cn(
          "font-display text-3xl font-bold leading-none sm:text-4xl",
          onDark ? "text-white" : "text-foreground",
        )}
      >
        {stat.value}
      </div>
      <div
        className={cn(
          "mt-2 font-mono text-xs uppercase tracking-[0.16em]",
          onDark ? "text-white/50" : "text-muted-foreground",
        )}
      >
        {stat.label}
      </div>
    </div>
  );
}
