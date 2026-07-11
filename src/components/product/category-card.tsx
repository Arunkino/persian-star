import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { routes } from "@/lib/routes";
import { ImageMedia } from "@/components/common/image-media";
import { CategoryIcon } from "@/components/common/category-icon";
import type { Category } from "@/types";

export function CategoryCard({
  category,
  className,
}: {
  category: Category;
  className?: string;
}) {
  return (
    <Link
      href={routes.category(category)}
      className={cn(
        "group relative flex flex-col justify-end overflow-hidden rounded-lg border border-border bg-obsidian text-white",
        className,
      )}
    >
      <ImageMedia
        image={category.image}
        ratio="4 / 5"
        className="absolute inset-0 h-full w-full opacity-70 transition-opacity duration-500 group-hover:opacity-90"
        imgClassName="transition-transform duration-[700ms] ease-[var(--ease-machined)] group-hover:scale-[1.05]"
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 90vw"
      />
      {/* Legibility gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent" />

      <div className="relative z-10 flex items-end justify-between gap-4 p-5">
        <div>
          <CategoryIcon
            name={category.icon}
            className="mb-3 size-6 text-white/80"
          />
          <h3 className="text-lg font-semibold leading-tight text-white">
            {category.name}
          </h3>
          <p className="mt-1 text-sm text-white/70">{category.tagline}</p>
        </div>
        <ArrowUpRight className="size-5 shrink-0 text-white/60 transition-all duration-300 ease-[var(--ease-machined)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-vipex-bright" />
      </div>
    </Link>
  );
}
