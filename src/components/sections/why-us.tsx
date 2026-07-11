import { ShieldCheck, PackageCheck, Headphones, Truck } from "lucide-react";
import { SectionHeader } from "@/components/common/section-header";
import { Reveal } from "@/components/common/reveal";

const reasons = [
  {
    icon: ShieldCheck,
    title: "Genuine, guaranteed",
    body: "Authorized supply of every brand we carry — no grey-market stock, no surprises.",
  },
  {
    icon: PackageCheck,
    title: "Trade-grade range",
    body: "Power, hand, welding, measuring, and safety — specced for daily professional use.",
  },
  {
    icon: Headphones,
    title: "Advice that helps",
    body: "Talk to people who know the tools. One WhatsApp message gets a real answer.",
  },
  {
    icon: Truck,
    title: "Supplied across the UAE",
    body: "Fast, reliable fulfilment for sites, workshops, and resellers nationwide.",
  },
];

export function WhyUs() {
  return (
    <section className="border-y border-border bg-secondary/40">
      <div className="container-shell py-20 md:py-28">
        <SectionHeader
          eyebrow="Why Persian Star"
          title="A supplier the trade can rely on"
        />
        <Reveal className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((r) => (
            <div key={r.title} className="bg-background p-7">
              <r.icon className="size-7 text-vipex" strokeWidth={1.5} />
              <h3 className="mt-5 text-lg font-semibold">{r.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {r.body}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
