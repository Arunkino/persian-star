import Link from "next/link";
import { Button } from "@/components/ui/button";
import { routes } from "@/lib/routes";

export default function NotFound() {
  return (
    <section className="container-shell flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="eyebrow">Error 404</p>
      <h1 className="mt-4 font-display text-6xl font-extrabold sm:text-8xl">
        Off the <span className="text-vipex">grid.</span>
      </h1>
      <p className="mt-5 max-w-md text-muted-foreground">
        This page isn&apos;t in the catalogue. Head back and find the tool you
        need.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button asChild variant="signal" size="xl">
          <Link href={routes.home}>Back to home</Link>
        </Button>
        <Button asChild variant="outline" size="xl">
          <Link href={routes.products}>Browse products</Link>
        </Button>
      </div>
    </section>
  );
}
