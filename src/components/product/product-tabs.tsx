"use client";

import { Check, Download, FileText } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SpecTable } from "@/components/product/spec-table";
import { Button } from "@/components/ui/button";
import type { ResolvedProduct } from "@/types";

export function ProductTabs({ product }: { product: ResolvedProduct }) {
  return (
    <Tabs defaultValue="overview" className="w-full gap-8">
      <TabsList className="h-auto w-full justify-start gap-6 rounded-none border-b border-border bg-transparent p-0">
        <DetailTab value="overview">Overview</DetailTab>
        <DetailTab value="specs">Specifications</DetailTab>
        <DetailTab value="downloads">Downloads</DetailTab>
      </TabsList>

      <TabsContent value="overview" className="mt-0">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr]">
          <p className="text-base leading-relaxed text-muted-foreground">
            {product.description}
          </p>
          <div>
            <h3 className="eyebrow mb-4">Key features</h3>
            <ul className="flex flex-col gap-3">
              {product.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm">
                  <Check className="mt-0.5 size-4 shrink-0 text-vipex" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="specs" className="mt-0">
        <SpecTable groups={product.specGroups} />
      </TabsContent>

      <TabsContent value="downloads" className="mt-0">
        {product.datasheetUrl ? (
          <Button asChild variant="outline" size="lg">
            <a href={product.datasheetUrl} target="_blank" rel="noopener noreferrer">
              <Download />
              Download datasheet (PDF)
            </a>
          </Button>
        ) : (
          <div className="flex items-start gap-3 rounded-lg border border-border bg-secondary/40 p-5 text-sm text-muted-foreground">
            <FileText className="mt-0.5 size-5 shrink-0 text-muted-foreground" />
            <span>
              Full datasheet available on request — send an enquiry and we&apos;ll
              share the specification and certification documents.
            </span>
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}

function DetailTab({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) {
  return (
    <TabsTrigger
      value={value}
      className="relative rounded-none border-0 bg-transparent px-0 pb-3 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground shadow-none data-[state=active]:text-foreground data-[state=active]:shadow-none after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:origin-left after:scale-x-0 after:bg-vipex after:transition-transform data-[state=active]:after:scale-x-100"
    >
      {children}
    </TabsTrigger>
  );
}
