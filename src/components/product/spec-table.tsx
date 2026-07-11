import { cn } from "@/lib/utils";
import type { Spec, SpecGroup } from "@/types";

/** A single mono spec row: label left, value+unit right. */
function SpecRow({ spec }: { spec: Spec }) {
  return (
    <div className="flex items-baseline justify-between gap-6 border-b border-border py-3 last:border-b-0">
      <dt className="text-sm text-muted-foreground">{spec.label}</dt>
      <dd className="text-right font-mono text-sm text-foreground">
        {spec.value}
        {spec.unit ? (
          <span className="ml-1 text-muted-foreground">{spec.unit}</span>
        ) : null}
      </dd>
    </div>
  );
}

/** Compact key-spec strip (mono), used at the top of the product detail. */
export function KeySpecs({
  specs,
  onDark = false,
  className,
}: {
  specs: Spec[];
  onDark?: boolean;
  className?: string;
}) {
  return (
    <dl
      className={cn(
        "grid grid-cols-3 rounded-lg border",
        onDark
          ? "divide-x divide-white/10 border-white/15 bg-graphite/60"
          : "divide-x divide-border border-border",
        className,
      )}
    >
      {specs.map((spec) => (
        <div key={spec.label} className="px-4 py-4">
          <dt
            className={cn(
              "mb-2 font-mono text-xs uppercase tracking-[0.12em]",
              onDark ? "text-white/50" : "text-muted-foreground",
            )}
          >
            {spec.label}
          </dt>
          <dd
            className={cn(
              "font-display text-xl font-semibold leading-none sm:text-2xl",
              onDark ? "text-white" : "text-foreground",
            )}
          >
            {spec.value}
            {spec.unit ? (
              <span
                className={cn(
                  "ml-1 text-sm font-normal",
                  onDark ? "text-white/50" : "text-muted-foreground",
                )}
              >
                {spec.unit}
              </span>
            ) : null}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** Full grouped specification tables for the detail page. */
export function SpecTable({ groups }: { groups: SpecGroup[] }) {
  return (
    <div className="grid gap-10 sm:grid-cols-2">
      {groups.map((group) => (
        <div key={group.title}>
          <h4 className="eyebrow mb-2">{group.title}</h4>
          <dl>
            {group.specs.map((spec) => (
              <SpecRow key={spec.label} spec={spec} />
            ))}
          </dl>
        </div>
      ))}
    </div>
  );
}
