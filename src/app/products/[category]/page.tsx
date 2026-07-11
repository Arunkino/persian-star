import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/common/page-header";
import { ProductExplorer } from "@/components/product/product-explorer";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import {
  getBrands,
  getCategories,
  getCategory,
  getProductsByCategory,
  vipexFirst,
} from "@/lib/data";
import { routes } from "@/lib/routes";

type Params = { category: string };

export function generateStaticParams(): Params[] {
  return getCategories().map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { category } = await params;
  const c = getCategory(category);
  if (!c) return {};
  return {
    title: c.name,
    description: c.description,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { category } = await params;
  const c = getCategory(category);
  if (!c) notFound();

  const products = vipexFirst(getProductsByCategory(category));

  return (
    <>
      <PageHeader eyebrow="Category" title={c.name} description={c.description}>
        <div className="mt-6">
          <Breadcrumbs
            items={[
              { label: "Products", href: routes.products },
              { label: c.name },
            ]}
          />
        </div>
      </PageHeader>

      <div className="container-shell py-12 md:py-16">
        <ProductExplorer
          products={products}
          categories={getCategories()}
          brands={getBrands()}
          lockedCategorySlug={c.slug}
        />
      </div>
    </>
  );
}
