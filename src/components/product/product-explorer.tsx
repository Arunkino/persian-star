"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ProductGrid } from "@/components/product/product-grid";
import type { Brand, Category, ResolvedProduct } from "@/types";

type Sort = "featured" | "az" | "brand";

const sortOptions: { value: Sort; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "az", label: "A–Z" },
  { value: "brand", label: "Brand" },
];

interface ProductExplorerProps {
  products: ResolvedProduct[];
  categories: Category[];
  brands: Brand[];
  /** When rendered on a category page, hide the category filter. */
  lockedCategorySlug?: string;
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full border px-3.5 py-1.5 font-mono text-xs uppercase tracking-[0.1em] transition-colors",
        active
          ? "border-vipex bg-vipex text-white"
          : "border-border bg-background text-muted-foreground hover:border-foreground/30 hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}

export function ProductExplorer({
  products,
  categories,
  brands,
  lockedCategorySlug,
}: ProductExplorerProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(
    lockedCategorySlug ?? null,
  );
  const [activeBrands, setActiveBrands] = useState<Set<string>>(new Set());
  const [vipexOnly, setVipexOnly] = useState(false);
  const [sort, setSort] = useState<Sort>("featured");

  const toggleBrand = (id: string) =>
    setActiveBrands((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = products.filter((p) => {
      if (category && p.category.slug !== category) return false;
      if (vipexOnly && !p.isVipex) return false;
      if (activeBrands.size && !activeBrands.has(p.brand.id)) return false;
      if (q) {
        const haystack = [
          p.name,
          p.brand.name,
          p.category.name,
          p.sku,
          ...p.tags,
        ]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });

    list = [...list];
    if (sort === "az") list.sort((a, b) => a.name.localeCompare(b.name));
    else if (sort === "brand")
      list.sort((a, b) => a.brand.name.localeCompare(b.brand.name));
    else
      list.sort(
        (a, b) =>
          Number(b.isVipex) - Number(a.isVipex) ||
          Number(!!b.featured) - Number(!!a.featured),
      );
    return list;
  }, [products, query, category, activeBrands, vipexOnly, sort]);

  const hasFilters =
    !!query || vipexOnly || activeBrands.size > 0 || (!lockedCategorySlug && category);

  const clearAll = () => {
    setQuery("");
    setVipexOnly(false);
    setActiveBrands(new Set());
    if (!lockedCategorySlug) setCategory(null);
  };

  const filterControls = (
    <div className="flex flex-col gap-6">
      {!lockedCategorySlug && (
        <FilterGroup label="Category">
          <Chip active={!category} onClick={() => setCategory(null)}>
            All
          </Chip>
          {categories.map((c) => (
            <Chip
              key={c.id}
              active={category === c.slug}
              onClick={() => setCategory(c.slug)}
            >
              {c.name}
            </Chip>
          ))}
        </FilterGroup>
      )}

      <FilterGroup label="Brand">
        <Chip active={vipexOnly} onClick={() => setVipexOnly((v) => !v)}>
          Our brands
        </Chip>
        {brands
          .filter((b) => !b.isOwnBrand)
          .map((b) => (
            <Chip
              key={b.id}
              active={activeBrands.has(b.id)}
              onClick={() => toggleBrand(b.id)}
            >
              {b.name}
            </Chip>
          ))}
      </FilterGroup>
    </div>
  );

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tools, brands, specs…"
            className="h-11 pl-9"
            aria-label="Search products"
          />
        </div>

        <div className="flex items-center gap-2">
          {/* Sort */}
          <div className="hidden items-center gap-1 rounded-lg border border-border p-1 sm:flex">
            {sortOptions.map((o) => (
              <button
                key={o.value}
                type="button"
                onClick={() => setSort(o.value)}
                aria-pressed={sort === o.value}
                className={cn(
                  "rounded-md px-3 py-1.5 font-mono text-xs uppercase tracking-[0.1em] transition-colors",
                  sort === o.value
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {o.label}
              </button>
            ))}
          </div>

          {/* Mobile filter trigger */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="lg" className="lg:hidden">
                <SlidersHorizontal />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="max-h-[80vh] overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="px-4 pb-8 pt-2">{filterControls}</div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Desktop filters */}
      <div className="mt-6 hidden lg:block">{filterControls}</div>

      {/* Result meta */}
      <div className="mt-8 flex items-center justify-between border-b border-border pb-4">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
          {filtered.length} {filtered.length === 1 ? "product" : "products"}
        </p>
        {hasFilters && (
          <button
            type="button"
            onClick={clearAll}
            className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-vipex"
          >
            <X className="size-3.5" />
            Clear
          </button>
        )}
      </div>

      {/* Results */}
      {filtered.length > 0 ? (
        <ProductGrid products={filtered} className="mt-8" />
      ) : (
        <div className="mt-16 flex flex-col items-center justify-center gap-3 text-center">
          <p className="font-display text-xl font-semibold">No matches</p>
          <p className="max-w-sm text-sm text-muted-foreground">
            Try a different search or clear your filters. Or just message us —
            we likely stock it.
          </p>
          <Button variant="outline" size="lg" onClick={clearAll} className="mt-2">
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
}

function FilterGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
      <span className="w-20 shrink-0 pt-1.5 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </span>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}
