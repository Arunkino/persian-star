import type { MetadataRoute } from "next";
import { getCategories, getProducts, site } from "@/lib/data";
import { routes } from "@/lib/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const abs = (path: string) => new URL(path, site.url).toString();
  const now = new Date();

  const staticRoutes = [
    routes.home,
    routes.products,
    routes.brands,
    routes.about,
    routes.contact,
  ].map((path) => ({ url: abs(path), lastModified: now }));

  const categoryRoutes = getCategories().map((c) => ({
    url: abs(routes.category(c)),
    lastModified: now,
  }));

  const productRoutes = getProducts().map((p) => ({
    url: abs(routes.product(p)),
    lastModified: now,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
