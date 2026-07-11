import {
  Drill,
  Wrench,
  Flame,
  Gauge,
  HardHat,
  Bolt,
  Package,
  type LucideIcon,
} from "lucide-react";

/** Explicit registry keeps the bundle lean vs. importing all of lucide. */
const registry: Record<string, LucideIcon> = {
  Drill,
  Wrench,
  Flame,
  Gauge,
  HardHat,
  Bolt,
  Package,
};

export function CategoryIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = registry[name] ?? Package;
  return <Icon className={className} strokeWidth={1.5} />;
}
