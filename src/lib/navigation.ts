import { routes } from "@/lib/routes";

export interface NavItem {
  label: string;
  href: string;
}

export const primaryNav: NavItem[] = [
  { label: "Products", href: routes.products },
  { label: "Brands", href: routes.brands },
  { label: "About", href: routes.about },
  { label: "Contact", href: routes.contact },
];
