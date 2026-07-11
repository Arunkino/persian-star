/** Centralised route builders — category-nested product URLs. */
import type { Category, ResolvedProduct } from "@/types";

export const routes = {
  home: "/",
  products: "/products",
  category: (c: Pick<Category, "slug">) => `/products/${c.slug}`,
  product: (p: ResolvedProduct) => `/products/${p.category.slug}/${p.slug}`,
  brands: "/brands",
  about: "/about",
  contact: "/contact",
} as const;
