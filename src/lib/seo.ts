/** Structured-data (JSON-LD) builders. Static site → all data known at build. */
import { site } from "@/lib/data";
import { routes } from "@/lib/routes";
import type { ResolvedProduct } from "@/types";

const abs = (path: string) => new URL(path, site.url).toString();

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.legalName,
    alternateName: site.brandName,
    url: site.url,
    email: site.email,
    description: site.description,
  };
}

export function localBusinessLd() {
  return {
    "@context": "https://schema.org",
    "@type": "HardwareStore",
    name: site.legalName,
    url: site.url,
    email: site.email,
    telephone: site.phoneHref,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${site.address.line1}, ${site.address.line2}`,
      addressLocality: site.address.city,
      addressCountry: "AE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    openingHours: site.hours,
  };
}

export function productLd(product: ResolvedProduct) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    sku: product.sku,
    description: product.shortDescription,
    image: product.images.map((img) => abs(img.src)),
    brand: { "@type": "Brand", name: product.brand.name },
    category: product.category.name,
    url: abs(routes.product(product)),
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: abs(item.path),
    })),
  };
}
