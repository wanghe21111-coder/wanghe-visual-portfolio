import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
};

export function SectionHeader({ eyebrow, title, description, className }: SectionHeaderProps) {
  return (
    <div className={cn("grid gap-5 md:grid-cols-[0.6fr_1.4fr]", className)}>
      <p className="text-xs uppercase tracking-studio text-paper/40">{eyebrow}</p>
      <div className="max-w-4xl">
        <h2 className="text-balance text-4xl uppercase leading-[0.95] text-paper md:text-6xl lg:text-7xl">
          {title}
        </h2>
        {description ? <p className="mt-5 max-w-2xl text-base leading-7 text-paper/62 md:text-lg">{description}</p> : null}
      </div>
    </div>
  );
}
