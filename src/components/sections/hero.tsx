"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EnquiryButtons } from "@/components/enquiry/enquiry-buttons";
import { StatBlock, type Stat } from "@/components/common/stat-block";
import { SparkFrame } from "@/components/sections/spark-frame";
import { routes } from "@/lib/routes";
import { easeMachined } from "@/lib/motion";

const stats: Stat[] = [
  { value: "10+", label: "Trusted Brands" },
  { value: "500+", label: "Catalogue SKUs" },
  { value: "UAE", label: "Nationwide Supply" },
];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 90]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-obsidian text-white"
    >
      {/* Structural background: faint grid + red glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent 75%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-0 h-[36rem] w-[36rem] rounded-full bg-vipex/25 blur-[120px]"
      />

      <div className="container-shell relative grid items-center gap-12 py-20 md:py-28 lg:grid-cols-[1.05fr_0.95fr] lg:py-32">
        {/* Copy */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easeMachined }}
            className="eyebrow text-white/60"
          >
            Persian Star · Building Hardware &amp; Tools · UAE
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeMachined, delay: 0.05 }}
            className="mt-5 font-display font-extrabold uppercase leading-[0.92] tracking-tight"
            style={{ fontSize: "var(--text-display-xl)" }}
          >
            Built
            <br />
            to <span className="text-vipex">Work.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeMachined, delay: 0.15 }}
            className="mt-6 max-w-lg text-base leading-relaxed text-white/70 sm:text-lg"
          >
            From <span className="font-semibold text-white">VIPEX</span> and{" "}
            <span className="font-semibold text-white">ViSafe</span> — our own
            brands — to Makita, Bosch, and DeWalt: professional tools for
            every trade, supplied across the UAE. Check the specs and enquire
            in one message.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeMachined, delay: 0.25 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <EnquiryButtons onDark showEmail={false} size="xl" />
            <Button asChild variant="onDark" size="xl">
              <Link href={routes.products}>
                Explore Products
                <ArrowRight />
              </Link>
            </Button>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-14 grid max-w-md grid-cols-3 gap-6 border-t border-white/10 pt-8"
          >
            {stats.map((s) => (
              <StatBlock key={s.label} stat={s} onDark />
            ))}
          </motion.dl>
        </div>

        {/* Product visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: easeMachined, delay: 0.1 }}
          className="relative"
        >
          {/* Plasma-cutter effect tracing the frame */}
          <SparkFrame className="-inset-12 z-10" inset={48} radius={12} />
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-white/10 bg-graphite">
            <motion.div style={{ y: imageY }} className="absolute inset-0">
              <Image
                src="/images/hero/hero-vipex-1200x1500.webp"
                alt="VIPEX professional power tool"
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="object-cover"
              />
            </motion.div>
            {/* Accent corner bracket */}
            <div className="pointer-events-none absolute left-4 top-4 size-10 border-l-2 border-t-2 border-vipex" />
            <div className="pointer-events-none absolute bottom-4 right-4 size-10 border-b-2 border-r-2 border-vipex" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
