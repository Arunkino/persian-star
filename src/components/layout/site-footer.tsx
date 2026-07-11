import Link from "next/link";
import { MapPin, Mail, Phone, Clock } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { EnquiryButtons } from "@/components/enquiry/enquiry-buttons";
import { getCategories, site } from "@/lib/data";
import { routes } from "@/lib/routes";
import { primaryNav } from "@/lib/navigation";

export function SiteFooter() {
  const categories = getCategories();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-obsidian text-white">
      {/* Enquiry band */}
      <div className="border-b border-white/10">
        <div className="container-shell flex flex-col gap-6 py-14 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="eyebrow text-white/50">Ready when you are</p>
            <h2 className="mt-3 max-w-xl text-3xl font-semibold leading-tight sm:text-4xl">
              Need a quote or product advice?
            </h2>
          </div>
          <EnquiryButtons onDark size="xl" />
        </div>
      </div>

      {/* Link grid */}
      <div className="container-shell grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Logo tone="onDark" subtitle="full" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">
            {site.description}
          </p>
        </div>

        <FooterCol title="Explore">
          {primaryNav.map((item) => (
            <FooterLink key={item.href} href={item.href}>
              {item.label}
            </FooterLink>
          ))}
        </FooterCol>

        <FooterCol title="Categories">
          {categories.slice(0, 6).map((c) => (
            <FooterLink key={c.id} href={routes.category(c)}>
              {c.name}
            </FooterLink>
          ))}
        </FooterCol>

        <FooterCol title="Contact">
          <li className="flex items-start gap-2.5 text-sm text-white/60">
            <MapPin className="mt-0.5 size-4 shrink-0 text-white/40" />
            <span>
              {site.address.line1}
              <br />
              {site.address.line2}, {site.address.city}
              <br />
              {site.address.country}
            </span>
          </li>
          <li>
            <a
              href={`tel:${site.phoneHref}`}
              className="flex items-center gap-2.5 text-sm text-white/60 transition-colors hover:text-white"
            >
              <Phone className="size-4 text-white/40" />
              {site.phoneDisplay}
            </a>
          </li>
          <li>
            <a
              href={`mailto:${site.email}`}
              className="flex items-center gap-2.5 text-sm text-white/60 transition-colors hover:text-white"
            >
              <Mail className="size-4 text-white/40" />
              {site.email}
            </a>
          </li>
          <li className="flex items-center gap-2.5 text-sm text-white/60">
            <Clock className="size-4 text-white/40" />
            {site.hours}
          </li>
        </FooterCol>
      </div>

      {/* Legal bar */}
      <div className="border-t border-white/10">
        <div className="container-shell flex flex-col gap-3 py-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1.5">
            <p>
              © {year} {site.legalName}
            </p>
            <p dir="rtl" lang="ar" className="text-right sm:text-left">
              {site.legalNameAr}
            </p>
          </div>
          <div className="flex items-center gap-5">
            {site.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="transition-colors hover:text-white"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="eyebrow mb-4 text-white/40">{title}</p>
      <ul className="flex flex-col gap-3">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm text-white/60 transition-colors hover:text-white"
      >
        {children}
      </Link>
    </li>
  );
}
