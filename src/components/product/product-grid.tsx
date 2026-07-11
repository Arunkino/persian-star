import { cn } from "@/lib/utils";
import { ProductCard } from "@/components/product/product-card";
import type { ResolvedProduct } from "@/types";

export function ProductGrid({
  products,
  className,
}: {
  products: ResolvedProduct[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
        className,
      )}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
