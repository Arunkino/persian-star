import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Reveal } from "@/components/common/reveal";
import { SectionHeader } from "@/components/common/section-header";
import { ProductGrid } from "@/components/product/product-grid";
import { BrandWordmark } from "@/components/brand/brand-wordmark";
import { Button } from "@/components/ui/button";
import {
  getBrands,
  getProducts,
  getProductsByBrand,
  getVipex,
} from "@/lib/data";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Brands",
  description:
    "VIPEX, our own professional tool brand, alongside Makita, Bosch, DeWalt, Stanley, Knipex, Fluke, ESAB and more.",
};

export default function BrandsPage() {
  const vipex = getVipex();
  const vipexProducts = getProductsByBrand("vipex");
  const partners = getBrands().filter((b) => !b.isOwnBrand);
  const all = getProducts();
  const countFor = (brandId: string) =>
    all.filter((p) => p.brand.id === brandId).length;

  return (
    <>
      <PageHeader
        eyebrow="Brands"
        title="One own brand. A roster of specialists."
        description="VIPEX leads our line, engineered and priced for the trade. Around it we carry the professional names you already specify."
      />

      {/* VIPEX feature */}
      <section className="bg-obsidian text-white">
        <div className="container-shell py-16 md:py-24">
          <Reveal className="flex flex-col justify-between gap-6 border-b border-white/10 pb-10 sm:flex-row sm:items-end">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/50">
                Our own brand
              </span>
              <BrandWordmark
                brand={vipex}
                className="mt-3 block text-5xl sm:text-6xl"
              />
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/60">
                {vipex.description}
              </p>
            </div>
          </Reveal>

          {vipexProducts.length > 0 && (
            <Reveal className="mt-10">
              <ProductGrid products={vipexProducts} />
            </Reveal>
          )}
        </div>
      </section>

      {/* Partners */}
      <section className="container-shell py-20 md:py-28">
        <SectionHeader
          eyebrow="Partner Brands"
          title="Trusted names, one supplier"
          action={{ label: "Browse All Products", href: routes.products }}
        />

        <Reveal className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {partners.map((brand) => (
            <div
              key={brand.id}
              className="flex flex-col items-start justify-between gap-8 rounded-lg border border-border bg-card p-6 transition-colors hover:border-foreground/25"
            >
              <BrandWordmark brand={brand} className="text-2xl" />
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
                {countFor(brand.id)}{" "}
                {countFor(brand.id) === 1 ? "product" : "products"}
              </span>
            </div>
          ))}
        </Reveal>

        <Reveal className="mt-12">
          <Button asChild variant="outline" size="xl">
            <Link href={routes.products}>
              See the full catalogue
              <ArrowRight />
            </Link>
          </Button>
        </Reveal>
      </section>
    </>
  );
}
