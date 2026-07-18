import Link from "next/link";
import { SectionHeader } from "@/components/common/section-header";
import { Reveal } from "@/components/common/reveal";
import { BrandWordmark } from "@/components/brand/brand-wordmark";
import { getBrands } from "@/lib/data";
import { routes } from "@/lib/routes";

export function BrandShowcase() {
  const brands = getBrands();
  const ownBrands = brands.filter((b) => b.isOwnBrand);
  const partners = brands.filter((b) => !b.isOwnBrand);

  return (
    <section className="container-shell py-20 md:py-28">
      <SectionHeader
        eyebrow="Brands"
        title="One roof, the full toolkit"
        description="VIPEX and ViSafe lead the line, backed by the professional brands you already specify."
        action={{ label: "Explore Brands", href: routes.brands }}
      />

      <Reveal className="mt-12">
        {/* Own-brand feature bars */}
        <div className="flex flex-col divide-y divide-white/10 overflow-hidden rounded-lg rounded-b-none border border-b-0 border-border">
          {ownBrands.map((brand) => (
            <Link
              key={brand.id}
              href={routes.brands}
              className="flex flex-col justify-between gap-6 bg-obsidian p-8 transition-colors hover:bg-graphite sm:flex-row sm:items-end"
            >
              <div>
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/50">
                  Our own brand
                </span>
                <BrandWordmark
                  brand={brand}
                  className="mt-3 block text-4xl sm:text-5xl"
                />
              </div>
              <p className="max-w-md text-sm leading-relaxed text-white/60">
                {brand.description}
              </p>
            </Link>
          ))}
        </div>

        {/* Partner grid — 9 names tile cleanly at 3 columns */}
        <div className="grid grid-cols-3 gap-px overflow-hidden rounded-lg rounded-t-none border border-border bg-border">
          {partners.map((brand) => (
            <div
              key={brand.id}
              className="flex aspect-[5/2] items-center justify-center bg-background p-4 text-foreground transition-colors hover:bg-secondary/60 sm:p-6"
            >
              <BrandWordmark brand={brand} className="text-xl sm:text-2xl" />
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
