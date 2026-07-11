/**
 * Builds context-aware enquiry links. The whole site is enquiry-driven,
 * so this is the single place that formats outbound messages.
 */
import { site } from "@/lib/data";
import type { ResolvedProduct } from "@/types";

/** wa.me deep link with a prefilled message. */
export function whatsappLink(message: string): string {
  const number = site.whatsappNumber.replace(/\D/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/** mailto fallback for desktop visitors who don't use WhatsApp. */
export function mailtoLink(subject: string, body: string): string {
  const params = new URLSearchParams({ subject, body });
  return `mailto:${site.email}?${params.toString()}`;
}

export function generalEnquiryMessage(): string {
  return `Hi ${site.companyName}, I'd like to enquire about your products. Please share details.`;
}

export function productEnquiryMessage(product: ResolvedProduct): string {
  return `Hi ${site.companyName}, I'm interested in the ${product.name} (SKU: ${product.sku}). Please share availability and a quote.`;
}

export interface EnquiryLinks {
  whatsapp: string;
  mailto: string;
}

export function productEnquiryLinks(product: ResolvedProduct): EnquiryLinks {
  const message = productEnquiryMessage(product);
  return {
    whatsapp: whatsappLink(message),
    mailto: mailtoLink(`Enquiry: ${product.name} (${product.sku})`, message),
  };
}

export function generalEnquiryLinks(): EnquiryLinks {
  const message = generalEnquiryMessage();
  return {
    whatsapp: whatsappLink(message),
    mailto: mailtoLink(`Product enquiry — ${site.companyName}`, message),
  };
}
