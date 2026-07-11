import { cn } from "@/lib/utils";
import type { Brand } from "@/types";

/**
 * Text wordmark placeholder for a brand. Swap for the real logo image later
 * by rendering <ImageMedia image={brand.logo} /> instead. VIPEX (own brand)
 * always gets the red accent + heavier weight so it never gets lost among
 * the partner names.
 */
export function BrandWordmark({
  brand,
  className,
}: {
  brand: Brand;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "font-display font-bold uppercase leading-none tracking-[0.06em] transition-colors duration-300",
        brand.isOwnBrand
          ? "text-vipex"
          : "text-current opacity-60 hover:opacity-100",
        className,
      )}
    >
      {brand.name}
    </span>
  );
}
