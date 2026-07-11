"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ImageMedia } from "@/components/common/image-media";
import type { ImageAsset } from "@/types";

export function ProductGallery({ images }: { images: ImageAsset[] }) {
  const [active, setActive] = useState(0);
  const main = images[active] ?? images[0];

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <ImageMedia
          image={main}
          ratio="1 / 1"
          priority
          sizes="(min-width: 1024px) 48vw, 100vw"
        />
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-3">
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              aria-current={i === active}
              className={cn(
                "overflow-hidden rounded-lg border bg-card transition-colors",
                i === active
                  ? "border-vipex"
                  : "border-border hover:border-foreground/30",
              )}
            >
              <ImageMedia image={img} ratio="1 / 1" sizes="20vw" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
