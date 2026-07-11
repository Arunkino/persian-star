/**
 * Domain types for the VIPEX / Persian Star catalogue.
 * All data is static JSON today; these types are the contract a future
 * CMS/API must satisfy so components never have to change.
 */

export interface ImageAsset {
  /** Path under /public, named by final intended dimensions. */
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Spec {
  label: string;
  value: string;
  /** Optional unit rendered in the mono spec voice (e.g. "Nm", "RPM"). */
  unit?: string;
}

export interface SpecGroup {
  title: string;
  specs: Spec[];
}

export interface Brand {
  id: string;
  slug: string;
  name: string;
  logo: ImageAsset;
  /** VIPEX = true → receives visual emphasis; partners stay muted. */
  isOwnBrand: boolean;
  description?: string;
  /** Sort order in brand strips (VIPEX first). */
  order: number;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  /** Short marketing line for cards. */
  tagline: string;
  description: string;
  image: ImageAsset;
  /** Lucide icon name, resolved at render. */
  icon: string;
  order: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brandId: string;
  categoryId: string;
  shortDescription: string;
  description: string;
  images: ImageAsset[];
  /** Headline specs shown on cards + at top of the detail page. */
  keySpecs: Spec[];
  /** Full grouped specifications for the detail spec tables. */
  specGroups: SpecGroup[];
  features: string[];
  /** Facet tags for client-side filtering (e.g. "cordless", "18v"). */
  tags: string[];
  sku: string;
  datasheetUrl?: string;
  featured?: boolean;
}

/** Product joined with its resolved brand + category, for rendering. */
export interface ResolvedProduct extends Product {
  brand: Brand;
  category: Category;
  isVipex: boolean;
}

export interface SiteConfig {
  companyName: string;
  legalName: string;
  /** Arabic legal name, as registered (shown in the footer). */
  legalNameAr: string;
  brandName: string;
  tagline: string;
  description: string;
  url: string;
  whatsappNumber: string; // digits only, e.g. "9715XXXXXXXX"
  phoneDisplay: string;
  phoneHref: string;
  email: string;
  address: {
    line1: string;
    line2: string;
    city: string;
    country: string;
  };
  hours: string;
  geo: { latitude: number; longitude: number };
  socials: { label: string; href: string }[];
}
