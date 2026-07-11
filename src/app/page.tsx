import { Hero } from "@/components/sections/hero";
import { TrustStrip } from "@/components/sections/trust-strip";
import { CategoryShowcase } from "@/components/sections/category-showcase";
import { VipexSpotlight } from "@/components/sections/vipex-spotlight";
import { FeaturedProducts } from "@/components/sections/featured-products";
import { WhyUs } from "@/components/sections/why-us";
import { BrandShowcase } from "@/components/sections/brand-showcase";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <CategoryShowcase />
      <VipexSpotlight />
      <FeaturedProducts />
      <WhyUs />
      <BrandShowcase />
    </>
  );
}
