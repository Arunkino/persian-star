import { Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/icons/whatsapp";
import {
  generalEnquiryLinks,
  productEnquiryLinks,
  type EnquiryLinks,
} from "@/lib/whatsapp";
import type { ResolvedProduct } from "@/types";

interface EnquiryButtonsProps {
  /** Provide a product for a context-prefilled enquiry, else a general one. */
  product?: ResolvedProduct;
  size?: "default" | "lg" | "xl" | "2xl";
  /** Show the email fallback beside WhatsApp (dual enquiry). */
  showEmail?: boolean;
  onDark?: boolean;
  className?: string;
  whatsappLabel?: string;
}

/**
 * Dual enquiry control: WhatsApp (primary, VIPEX red) + email fallback for
 * desktop visitors. The site's single conversion mechanism.
 */
export function EnquiryButtons({
  product,
  size = "xl",
  showEmail = true,
  onDark = false,
  className,
  whatsappLabel = "Enquire on WhatsApp",
}: EnquiryButtonsProps) {
  const links: EnquiryLinks = product
    ? productEnquiryLinks(product)
    : generalEnquiryLinks();

  return (
    <div className={cn("flex flex-col gap-3 sm:flex-row", className)}>
      <Button asChild variant="signal" size={size}>
        <a href={links.whatsapp} target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon className="size-[1.15em]" />
          {whatsappLabel}
        </a>
      </Button>

      {showEmail && (
        <Button asChild variant={onDark ? "onDark" : "outline"} size={size}>
          <a href={links.mailto}>
            <Mail />
            Enquire by Email
          </a>
        </Button>
      )}
    </div>
  );
}
