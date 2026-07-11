import { SectionHeader } from "@/components/common/section-header";
import { ProductGrid } from "@/components/product/product-grid";
import { Reveal } from "@/components/common/reveal";
import { getFeaturedProducts, vipexFirst } from "@/lib/data";
import { routes } from "@/lib/routes";

export function FeaturedProducts() {
  const products = vipexFirst(getFeaturedProducts(4));
  return (
    <section className="container-shell py-20 md:py-28">
      <SectionHeader
        eyebrow="Featured"
        title="Picked for the professional"
        description="A cross-section of the catalogue — VIPEX first, then the specialists."
        action={{ label: "View All", href: routes.products }}
      />
      <Reveal className="mt-12">
        <ProductGrid products={products} />
      </Reveal>
    </section>
  );
}
