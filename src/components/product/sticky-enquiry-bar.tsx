import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/icons/whatsapp";
import { productEnquiryLinks } from "@/lib/whatsapp";
import type { ResolvedProduct } from "@/types";

/** Thumb-reachable enquiry bar, mobile only. */
export function StickyEnquiryBar({ product }: { product: ResolvedProduct }) {
  const links = productEnquiryLinks(product);
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/90 p-3 backdrop-blur-md lg:hidden">
      <div className="container-shell flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">{product.name}</p>
          <p className="font-mono text-xs text-muted-foreground">{product.sku}</p>
        </div>
        <Button asChild variant="signal" size="lg">
          <a href={links.whatsapp} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon className="size-4" />
            Enquire
          </a>
        </Button>
      </div>
    </div>
  );
}
