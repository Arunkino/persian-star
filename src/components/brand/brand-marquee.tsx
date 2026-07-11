import { cn } from "@/lib/utils";
import { BrandWordmark } from "@/components/brand/brand-wordmark";
import type { Brand } from "@/types";

/**
 * Infinite horizontal trust strip. Content is duplicated once and translated
 * -50% so the loop is seamless; pauses on hover, halts under reduced-motion.
 */
export function BrandMarquee({
  brands,
  className,
  duration = "42s",
}: {
  brands: Brand[];
  className?: string;
  duration?: string;
}) {
  const row = [...brands, ...brands];
  return (
    <div
      className={cn(
        "group/marquee relative overflow-hidden",
        // Fade edges into the background
        "[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
        className,
      )}
    >
      <ul
        className="animate-marquee flex w-max items-center gap-x-14 sm:gap-x-20"
        style={{ ["--marquee-duration" as string]: duration }}
      >
        {row.map((brand, i) => (
          <li key={`${brand.id}-${i}`} aria-hidden={i >= brands.length}>
            <BrandWordmark
              brand={brand}
              className={brand.isOwnBrand ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
