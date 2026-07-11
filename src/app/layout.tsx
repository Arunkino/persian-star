import type { Metadata } from "next";
import { Archivo, Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { getCategories, site } from "@/lib/data";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.legalName,
    template: `%s · ${site.companyName}`,
  },
  description: site.description,
  keywords: [
    "building hardware",
    "industrial tools",
    "power tools",
    "hand tools",
    "VIPEX",
    "tools supplier UAE",
    "Dubai",
  ],
  openGraph: {
    type: "website",
    title: `${site.companyName} — Building Hardware & Tools, UAE`,
    description: site.description,
    siteName: site.legalName,
    images: [
      {
        url: "/images/og/og-default-1200x630.webp",
        width: 1200,
        height: 630,
        alt: site.legalName,
      },
    ],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const categories = getCategories();

  return (
    <html
      lang="en"
      className={`${archivo.variable} ${inter.variable} ${geistMono.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-vipex focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
        >
          Skip to content
        </a>
        <Providers>
          <SiteHeader categories={categories} />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
