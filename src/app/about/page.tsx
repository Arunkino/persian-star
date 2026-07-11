import type { Metadata } from "next";
import { PageHeader } from "@/components/common/page-header";
import { Reveal } from "@/components/common/reveal";
import { SectionHeader } from "@/components/common/section-header";
import { StatBlock, type Stat } from "@/components/common/stat-block";
import { ImageMedia } from "@/components/common/image-media";
import { BrandMarquee } from "@/components/brand/brand-marquee";
import { JsonLd } from "@/components/common/json-ld";
import { getBrands, getVipex, site } from "@/lib/data";
import { organizationLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About",
  description:
    "Persian Star is a UAE trading house supplying VIPEX tools alongside the professional brands the trade trusts.",
};

const stats: Stat[] = [
  { value: "10+", label: "Brands Supplied" },
  { value: "500+", label: "Catalogue SKUs" },
  { value: "7", label: "Tool Categories" },
  { value: "UAE", label: "Coverage" },
];

export default function AboutPage() {
  const vipex = getVipex();
  const brands = getBrands();

  return (
    <>
      <JsonLd data={organizationLd()} />

      <PageHeader
        eyebrow="About Persian Star"
        title="A trading house built on the trust of the trade."
        description={site.description}
      />

      {/* Story */}
      <section className="container-shell grid gap-12 py-20 md:py-28 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <p className="eyebrow mb-4">Who we are</p>
          <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
            <p>
              {site.legalName} supplies professional tools and building hardware
              across the United Arab Emirates. We work with contractors,
              workshops, fabricators, and resellers who need the right tool,
              genuine stock, and a straight answer.
            </p>
            <p>
              We built VIPEX for exactly that customer — a house brand engineered
              to trade standards and priced for the people who use it every day.
              Around it we carry the specialist names professionals already
              specify, so a single enquiry covers the whole jobsite.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="overflow-hidden rounded-xl border border-border">
            <ImageMedia
              image={{
                src: "/images/hero/hero-vipex-1200x1500.webp",
                alt: "Persian Star tools",
                width: 1200,
                height: 1500,
              }}
              ratio="4 / 3"
              sizes="(min-width: 1024px) 45vw, 90vw"
            />
          </div>
        </Reveal>
      </section>

      {/* VIPEX band */}
      <section className="bg-obsidian text-white">
        <div className="container-shell grid gap-10 py-20 md:py-28 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <Reveal>
            <p className="eyebrow text-vipex">The VIPEX Standard</p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">
              Our name goes on it. So it has to earn its place.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-base leading-relaxed text-white/70">
              {vipex.description} Every VIPEX tool is chosen and specified to hold
              up under real conditions — heat, dust, and long shifts — because it
              carries our reputation onto every site it reaches.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Stats */}
      <section className="container-shell py-20 md:py-24">
        <Reveal className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((s) => (
            <StatBlock key={s.label} stat={s} />
          ))}
        </Reveal>
      </section>

      {/* Brands */}
      <section className="border-y border-border bg-secondary/40 py-16">
        <div className="container-shell">
          <SectionHeader eyebrow="Partners" title="The brands we carry" />
        </div>
        <div className="mt-10">
          <BrandMarquee brands={brands} />
        </div>
      </section>
    </>
  );
}
