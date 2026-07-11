import type { Metadata } from "next";
import { PageHeader } from "@/components/common/page-header";
import { ProductExplorer } from "@/components/product/product-explorer";
import { getBrands, getCategories, getProducts, vipexFirst } from "@/lib/data";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse the full VIPEX and partner-brand catalogue — power tools, hand tools, welding, measuring, and safety equipment.",
};

export default function ProductsPage() {
  const products = vipexFirst(getProducts());
  const categories = getCategories();
  const brands = getBrands();

  return (
    <>
      <PageHeader
        eyebrow="Catalogue"
        title="The full catalogue"
        description="Filter by category or brand, search by spec, and enquire on anything in one message."
      />
      <div className="container-shell py-12 md:py-16">
        <ProductExplorer
          products={products}
          categories={categories}
          brands={brands}
        />
      </div>
    </>
  );
}
