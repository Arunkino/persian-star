"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, ArrowRight } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { EnquiryButtons } from "@/components/enquiry/enquiry-buttons";
import { Logo } from "@/components/layout/logo";
import { primaryNav } from "@/lib/navigation";
import { routes } from "@/lib/routes";
import type { Category } from "@/types";

export function MobileNav({ categories }: { categories: Category[] }) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon-lg"
          className="md:hidden"
          aria-label="Open menu"
        >
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-full max-w-sm p-0">
        <SheetHeader className="border-b border-border px-6 py-5">
          <SheetTitle asChild>
            <Logo />
          </SheetTitle>
        </SheetHeader>

        <nav className="flex flex-col px-6 py-6">
          {primaryNav.map((item) => (
            <SheetClose asChild key={item.href}>
              <Link
                href={item.href}
                className="flex items-center justify-between border-b border-border py-4 font-display text-lg font-semibold"
              >
                {item.label}
                <ArrowRight className="size-4 text-muted-foreground" />
              </Link>
            </SheetClose>
          ))}
        </nav>

        <div className="px-6">
          <p className="eyebrow mb-3">Categories</p>
          <ul className="flex flex-col gap-1 pb-6">
            {categories.map((c) => (
              <SheetClose asChild key={c.id}>
                <Link
                  href={routes.category(c)}
                  className="rounded-md py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {c.name}
                </Link>
              </SheetClose>
            ))}
          </ul>
        </div>

        <div className="mt-auto border-t border-border p-6">
          <EnquiryButtons size="lg" className="flex-col" />
        </div>
      </SheetContent>
    </Sheet>
  );
}
