import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/common/reveal";

interface SectionHeaderProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
  /** Optional inline CTA rendered beside the title on wide screens. */
  action?: { label: string; href: string };
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  action,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 md:flex-row md:items-end md:justify-between",
        align === "center" && "md:flex-col md:items-center md:text-center",
        className,
      )}
    >
      <Reveal className="max-w-2xl">
        {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
        <h2 className="text-3xl font-semibold leading-[1.05] sm:text-4xl md:text-[2.75rem]">
          {title}
        </h2>
        {description && (
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {description}
          </p>
        )}
      </Reveal>

      {action && (
        <Reveal delay={0.1}>
          <Link
            href={action.href}
            className="group inline-flex shrink-0 items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-foreground transition-colors hover:text-vipex"
          >
            {action.label}
            <ArrowUpRight className="size-4 transition-transform duration-300 ease-[var(--ease-machined)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </Reveal>
      )}
    </div>
  );
}
