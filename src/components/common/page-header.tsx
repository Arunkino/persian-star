import { Reveal } from "@/components/common/reveal";

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="border-b border-border bg-secondary/40">
      <div className="container-shell py-14 md:py-20">
        <Reveal>
          {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
          <h1 className="max-w-3xl text-4xl font-semibold leading-[1.05] sm:text-5xl md:text-[3.25rem]">
            {title}
          </h1>
          {description && (
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {description}
            </p>
          )}
          {children}
        </Reveal>
      </div>
    </section>
  );
}
