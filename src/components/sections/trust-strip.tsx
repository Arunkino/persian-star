import { BrandMarquee } from "@/components/brand/brand-marquee";
import { getBrands } from "@/lib/data";

export function TrustStrip() {
  const brands = getBrands();
  return (
    <section className="border-y border-border bg-background py-8">
      <div className="container-shell">
        <p className="eyebrow mb-6 text-center">
          Our own brand, alongside the names professionals trust
        </p>
      </div>
      <BrandMarquee brands={brands} />
    </section>
  );
}
