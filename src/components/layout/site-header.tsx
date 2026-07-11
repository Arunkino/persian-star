"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScrolled } from "@/hooks/use-scrolled";
import { Logo } from "@/components/layout/logo";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/icons/whatsapp";
import { primaryNav } from "@/lib/navigation";
import { routes } from "@/lib/routes";
import { generalEnquiryLinks } from "@/lib/whatsapp";
import { CategoryIcon } from "@/components/common/category-icon";
import type { Category } from "@/types";

export function SiteHeader({ categories }: { categories: Category[] }) {
  const scrolled = useScrolled();
  const pathname = usePathname();
  const enquiry = generalEnquiryLinks();

  const isActive = (href: string) =>
    href === routes.home ? pathname === href : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-colors duration-300",
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-md"
          : "border-b border-transparent bg-background/40 backdrop-blur-sm",
      )}
    >
      <div className="container-shell flex h-16 items-center justify-between gap-6 md:h-[4.5rem]">
        <Logo />

        <nav className="hidden md:block" aria-label="Primary">
          <ul className="flex items-center gap-1">
            {primaryNav.map((item) => {
              const active = isActive(item.href);
              const hasMenu = item.href === routes.products;
              return (
                <li key={item.href} className="group relative">
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      active
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {item.label}
                    {hasMenu && (
                      <ChevronDown className="size-3.5 transition-transform duration-300 group-hover:rotate-180" />
                    )}
                    <span
                      className={cn(
                        "absolute inset-x-3 -bottom-px h-px origin-left scale-x-0 bg-vipex transition-transform duration-300 ease-[var(--ease-machined)] group-hover:scale-x-100",
                        active && "scale-x-100",
                      )}
                    />
                  </Link>

                  {hasMenu && (
                    <div
                      className={cn(
                        "invisible absolute left-0 top-full pt-3 opacity-0 transition-all duration-200",
                        "group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100",
                      )}
                    >
                      <div className="w-[34rem] rounded-lg border border-border bg-popover p-2 shadow-lg shadow-black/5">
                        <ul className="grid grid-cols-2 gap-1">
                          {categories.map((c) => (
                            <li key={c.id}>
                              <Link
                                href={routes.category(c)}
                                className="flex items-start gap-3 rounded-md p-3 transition-colors hover:bg-muted"
                              >
                                <CategoryIcon
                                  name={c.icon}
                                  className="mt-0.5 size-5 text-vipex"
                                />
                                <span className="flex flex-col">
                                  <span className="text-sm font-medium text-foreground">
                                    {c.name}
                                  </span>
                                  <span className="text-xs text-muted-foreground">
                                    {c.tagline}
                                  </span>
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="signal" size="sm" className="hidden sm:inline-flex">
            <a href={enquiry.whatsapp} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="size-4" />
              Enquire
            </a>
          </Button>
          <MobileNav categories={categories} />
        </div>
      </div>
    </header>
  );
}
