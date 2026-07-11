import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { routes } from "@/lib/routes";
import { ImageMedia } from "@/components/common/image-media";
import type { ResolvedProduct } from "@/types";

export function ProductCard({
  product,
  className,
}: {
  product: ResolvedProduct;
  className?: string;
}) {
  const key = product.keySpecs[0];
  return (
    <Link
      href={routes.product(product)}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-colors duration-300 hover:border-foreground/25 focus-visible:border-foreground/25",
        className,
      )}
    >
      <ImageMedia
        image={product.images[0]}
        ratio="1 / 1"
        className="bg-secondary"
        zoomOnHover
        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
      />

      {/* Brand chip */}
      <span
        className={cn(
          "absolute left-3 top-3 rounded-sm px-2 py-1 font-mono text-[0.65rem] uppercase tracking-[0.14em] backdrop-blur",
          product.isVipex
            ? "bg-vipex text-white"
            : "bg-background/80 text-muted-foreground",
        )}
      >
        {product.brand.name}
      </span>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-base font-semibold leading-snug text-foreground">
          {product.name}
        </h3>

        {key && (
          <p className="mt-2 font-mono text-xs text-muted-foreground">
            {key.label}: {key.value}
            {key.unit ? ` ${key.unit}` : ""}
          </p>
        )}

        <div className="mt-4 flex items-center gap-1.5 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-foreground/70 transition-colors group-hover:text-vipex">
          View details
          <ArrowUpRight className="size-3.5 transition-transform duration-300 ease-[var(--ease-machined)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </Link>
  );
}
