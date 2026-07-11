import { SectionHeader } from "@/components/common/section-header";
import { CategoryCard } from "@/components/product/category-card";
import { Reveal } from "@/components/common/reveal";
import { getCategories } from "@/lib/data";
import { routes } from "@/lib/routes";

export function CategoryShowcase() {
  const categories = getCategories();
  return (
    <section className="container-shell py-20 md:py-28">
      <SectionHeader
        eyebrow="Catalogue"
        title="Every tool for the trade"
        description="From power tools to PPE — organised the way the jobsite thinks."
        action={{ label: "All Products", href: routes.products }}
      />

      <Reveal className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </Reveal>
    </section>
  );
}
