import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cn } from "@/lib/utils";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { JsonLd } from "@/components/common/json-ld";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductTabs } from "@/components/product/product-tabs";
import { KeySpecs } from "@/components/product/spec-table";
import { EnquiryButtons } from "@/components/enquiry/enquiry-buttons";
import { StickyEnquiryBar } from "@/components/product/sticky-enquiry-bar";
import { SectionHeader } from "@/components/common/section-header";
import { ProductGrid } from "@/components/product/product-grid";
import { getProduct, getProducts, getRelatedProducts } from "@/lib/data";
import { routes } from "@/lib/routes";
import { breadcrumbLd, productLd } from "@/lib/seo";

type Params = { category: string; slug: string };

export function generateStaticParams(): Params[] {
  return getProducts().map((p) => ({
    category: p.category.slug,
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: product.images.map((img) => ({ url: img.src })),
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product);

  return (
    <>
      <JsonLd
        data={[
          productLd(product),
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Products", path: routes.products },
            { name: product.category.name, path: routes.category(product.category) },
            { name: product.name, path: routes.product(product) },
          ]),
        ]}
      />

      <div className="container-shell py-8 md:py-12">
        <Breadcrumbs
          items={[
            { label: "Products", href: routes.products },
            {
              label: product.category.name,
              href: routes.category(product.category),
            },
            { label: product.name },
          ]}
        />

        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <ProductGallery images={product.images} />

          <div className="lg:py-4">
            {/* Brand chip */}
            <span
              className={cn(
                "inline-block rounded-sm px-2.5 py-1 font-mono text-xs uppercase tracking-[0.14em]",
                product.isVipex
                  ? "bg-vipex text-white"
                  : "bg-secondary text-muted-foreground",
              )}
            >
              {product.brand.name}
              {product.isVipex && " · Our Own Brand"}
            </span>

            <h1 className="mt-4 text-3xl font-semibold leading-[1.08] sm:text-4xl">
              {product.name}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {product.shortDescription}
            </p>

            <KeySpecs specs={product.keySpecs} className="mt-8" />

            <div className="mt-8">
              <EnquiryButtons product={product} size="xl" />
            </div>

            <p className="mt-5 font-mono text-xs text-muted-foreground">
              SKU: {product.sku} · Genuine stock · Enquire for pricing &amp;
              availability
            </p>
          </div>
        </div>

        <div className="mt-16 md:mt-24">
          <ProductTabs product={product} />
        </div>
      </div>

      {related.length > 0 && (
        <section className="border-t border-border bg-secondary/30">
          <div className="container-shell py-16 md:py-20">
            <SectionHeader
              eyebrow="Related"
              title={`More in ${product.category.name}`}
              action={{
                label: "View category",
                href: routes.category(product.category),
              }}
            />
            <ProductGrid products={related} className="mt-10" />
          </div>
        </section>
      )}

      {/* Spacer so the sticky bar never covers footer content on mobile */}
      <div className="h-20 lg:hidden" />
      <StickyEnquiryBar product={product} />
    </>
  );
}
