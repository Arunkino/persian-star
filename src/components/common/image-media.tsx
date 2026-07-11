import Image from "next/image";
import { cn } from "@/lib/utils";
import type { ImageAsset } from "@/types";

interface ImageMediaProps {
  image: ImageAsset;
  /** CSS aspect-ratio, e.g. "1 / 1", "16 / 9". Defaults to the asset ratio. */
  ratio?: string;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
  /** Subtle zoom on parent hover (parent needs the `group` class). */
  zoomOnHover?: boolean;
}

/**
 * next/image wrapper with a fixed aspect-ratio box (no layout shift) and a
 * neutral steel placeholder background while the asset loads.
 */
export function ImageMedia({
  image,
  ratio,
  className,
  imgClassName,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  priority = false,
  zoomOnHover = false,
}: ImageMediaProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-secondary",
        className,
      )}
      style={{ aspectRatio: ratio ?? `${image.width} / ${image.height}` }}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn(
          "object-cover",
          zoomOnHover &&
            "transition-transform duration-[600ms] ease-[var(--ease-machined)] group-hover:scale-[1.04]",
          imgClassName,
        )}
      />
    </div>
  );
}
