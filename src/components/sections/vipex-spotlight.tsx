import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EnquiryButtons } from "@/components/enquiry/enquiry-buttons";
import { ImageMedia } from "@/components/common/image-media";
import { Reveal } from "@/components/common/reveal";
import { KeySpecs } from "@/components/product/spec-table";
import { getFeaturedProducts, getProducts } from "@/lib/data";
import { routes } from "@/lib/routes";

export function VipexSpotlight() {
  // Prefer a featured VIPEX product; fall back to any VIPEX product.
  const hero =
    getFeaturedProducts(20).find((p) => p.isVipex) ??
    getProducts().find((p) => p.isVipex);

  if (!hero) return null;

  return (
    <section className="bg-obsidian text-white">
      <div className="container-shell grid items-center gap-12 py-20 md:py-28 lg:grid-cols-2">
        <Reveal className="order-2 lg:order-1">
          <p className="eyebrow text-vipex">VIPEX — Our Own Brand</p>
          <h2 className="mt-4 text-3xl font-semibold leading-[1.05] sm:text-4xl md:text-[2.75rem]">
            The performance you expect, without the premium markup.
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-white/70">
            VIPEX is engineered to the standards of the trade and priced for the
            people who use it daily. Take the {hero.name} —{" "}
            {hero.shortDescription.toLowerCase()}
          </p>

          <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
            {hero.features.slice(0, 4).map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-sm text-white/80">
                <Check className="mt-0.5 size-4 shrink-0 text-vipex" />
                {f}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="signal" size="xl">
              <Link href={routes.product(hero)}>
                View {hero.brand.name} {hero.sku}
                <ArrowRight />
              </Link>
            </Button>
            <EnquiryButtons
              product={hero}
              onDark
              showEmail={false}
              size="xl"
            />
          </div>
        </Reveal>

        <Reveal delay={0.1} className="order-1 lg:order-2">
          <div className="overflow-hidden rounded-xl border border-white/10">
            <ImageMedia
              image={hero.images[0]}
              ratio="1 / 1"
              className="bg-graphite"
              sizes="(min-width: 1024px) 45vw, 90vw"
            />
          </div>
          <div className="mt-4">
            <KeySpecs specs={hero.keySpecs} onDark />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
