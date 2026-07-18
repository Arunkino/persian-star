/**
 * Single source of truth for reading catalogue data.
 * Components import from here — never from the JSON directly — so the
 * backing store can later swap from static JSON to a CMS/API untouched.
 */
import brandsData from "@/data/brands.json";
import categoriesData from "@/data/categories.json";
import productsData from "@/data/products.json";
import siteData from "@/data/site.json";
import type {
  Brand,
  Category,
  Product,
  ResolvedProduct,
  SiteConfig,
} from "@/types";

const brands = brandsData as Brand[];
const categories = categoriesData as Category[];
const products = productsData as Product[];

export const site = siteData as SiteConfig;

/* ------------------------------- Brands -------------------------------- */

export function getBrands(): Brand[] {
  return [...brands].sort((a, b) => a.order - b.order);
}

export function getBrand(id: string): Brand | undefined {
  return brands.find((b) => b.id === id || b.slug === id);
}

export function getVipex(): Brand {
  const vipex = brands.find((b) => b.id === "vipex");
  if (!vipex) throw new Error("VIPEX brand missing from data");
  return vipex;
}

/** All house brands (VIPEX, ViSafe), in display order. */
export function getOwnBrands(): Brand[] {
  return getBrands().filter((b) => b.isOwnBrand);
}

/* ----------------------------- Categories ------------------------------ */

export function getCategories(): Category[] {
  return [...categories].sort((a, b) => a.order - b.order);
}

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug || c.id === slug);
}

/* ------------------------------ Products ------------------------------- */

function resolve(product: Product): ResolvedProduct {
  const brand = getBrand(product.brandId);
  const category = getCategory(product.categoryId);
  if (!brand || !category) {
    throw new Error(`Unresolved refs for product ${product.id}`);
  }
  return { ...product, brand, category, isVipex: brand.isOwnBrand };
}

export function getProducts(): ResolvedProduct[] {
  return products.map(resolve);
}

export function getProduct(slug: string): ResolvedProduct | undefined {
  const found = products.find((p) => p.slug === slug);
  return found ? resolve(found) : undefined;
}

export function getProductsByCategory(categorySlug: string): ResolvedProduct[] {
  return getProducts().filter((p) => p.category.slug === categorySlug);
}

export function getProductsByBrand(brandSlug: string): ResolvedProduct[] {
  return getProducts().filter((p) => p.brand.slug === brandSlug);
}

export function getFeaturedProducts(limit = 4): ResolvedProduct[] {
  const featured = getProducts().filter((p) => p.featured);
  return featured.slice(0, limit);
}

/** VIPEX-first ordering: own brand surfaces before partners. */
export function vipexFirst(list: ResolvedProduct[]): ResolvedProduct[] {
  return [...list].sort((a, b) => Number(b.isVipex) - Number(a.isVipex));
}

export function getRelatedProducts(
  product: ResolvedProduct,
  limit = 4,
): ResolvedProduct[] {
  return getProducts()
    .filter(
      (p) => p.category.id === product.category.id && p.id !== product.id,
    )
    .slice(0, limit);
}

/** All distinct facet tags across the catalogue, for filter UIs. */
export function getAllTags(): string[] {
  return [...new Set(products.flatMap((p) => p.tags))].sort();
}
