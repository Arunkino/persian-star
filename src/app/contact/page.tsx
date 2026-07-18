import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Reveal } from "@/components/common/reveal";
import { EnquiryButtons } from "@/components/enquiry/enquiry-buttons";
import { ImageMedia } from "@/components/common/image-media";
import { JsonLd } from "@/components/common/json-ld";
import { WhatsAppIcon } from "@/components/icons/whatsapp";
import { site } from "@/lib/data";
import { generalEnquiryLinks } from "@/lib/whatsapp";
import { localBusinessLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Enquire about VIPEX, ViSafe, and partner-brand tools via WhatsApp or email. Supplied across the UAE.",
};

export default function ContactPage() {
  const enquiry = generalEnquiryLinks();

  return (
    <>
      <JsonLd data={localBusinessLd()} />

      <PageHeader
        eyebrow="Contact"
        title="Let's talk tools."
        description="Send an enquiry and we'll come back with availability, pricing, and honest advice. The fastest way to reach us is WhatsApp."
      />

      <div className="container-shell grid gap-12 py-16 md:py-24 lg:grid-cols-2 lg:gap-16">
        {/* Left — details */}
        <Reveal>
          {/* Primary WhatsApp card */}
          <a
            href={enquiry.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between gap-4 rounded-xl border border-vipex/30 bg-vipex/5 p-6 transition-colors hover:bg-vipex/10"
          >
            <div className="flex items-center gap-4">
              <span className="flex size-12 items-center justify-center rounded-lg bg-vipex text-white">
                <WhatsAppIcon className="size-6" />
              </span>
              <div>
                <p className="font-semibold">Enquire on WhatsApp</p>
                <p className="text-sm text-muted-foreground">
                  Typically replies within business hours
                </p>
              </div>
            </div>
          </a>

          <dl className="mt-8 divide-y divide-border">
            <ContactRow icon={<Phone className="size-5" />} label="Phone">
              <a href={`tel:${site.phoneHref}`} className="hover:text-vipex">
                {site.phoneDisplay}
              </a>
            </ContactRow>
            <ContactRow icon={<Mail className="size-5" />} label="Email">
              <a href={`mailto:${site.email}`} className="hover:text-vipex">
                {site.email}
              </a>
            </ContactRow>
            <ContactRow icon={<MapPin className="size-5" />} label="Address">
              {site.address.line1}
              <br />
              {site.address.line2}, {site.address.city}
              <br />
              {site.address.country}
            </ContactRow>
            <ContactRow icon={<Clock className="size-5" />} label="Hours">
              {site.hours}
            </ContactRow>
          </dl>

          <div className="mt-8">
            <EnquiryButtons size="xl" />
          </div>
        </Reveal>

        {/* Right — map */}
        <Reveal delay={0.1}>
          <div className="overflow-hidden rounded-xl border border-border">
            <ImageMedia
              image={{
                src: "/images/contact/map-location-1200x800.webp",
                alt: `Map showing ${site.companyName}, ${site.address.city}`,
                width: 1200,
                height: 800,
              }}
              ratio="3 / 4"
              sizes="(min-width: 1024px) 45vw, 90vw"
            />
          </div>
        </Reveal>
      </div>
    </>
  );
}

function ContactRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4 py-5">
      <span className="mt-0.5 text-vipex">{icon}</span>
      <div>
        <dt className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
          {label}
        </dt>
        <dd className="mt-1 text-sm leading-relaxed">{children}</dd>
      </div>
    </div>
  );
}
