import type { CSSProperties } from "react";
import type { MediaType, ProjectTone } from "@/data/projects";
import { cn } from "@/lib/utils";

type VisualPlaceholderProps = {
  label: string;
  title?: string;
  mediaType?: MediaType;
  tone: ProjectTone;
  className?: string;
  aspect?: "wide" | "portrait" | "square";
};

const aspectClass = {
  wide: "aspect-[16/10]",
  portrait: "aspect-[4/5]",
  square: "aspect-square"
};

export function VisualPlaceholder({
  label,
  title,
  mediaType = "image",
  tone,
  className,
  aspect = "wide"
}: VisualPlaceholderProps) {
  const style = {
    "--tone": tone.primary,
    "--tone-soft": tone.soft,
    "--tone-deep": tone.deep
  } as CSSProperties;

  return (
    <div
      className={cn(
        "visual-placeholder group/visual relative flex w-full flex-col justify-between border border-paper/12 p-4 shadow-soft",
        aspectClass[aspect],
        className
      )}
      style={style}
      data-cursor="focus"
    >
      <div className="relative z-10 flex items-start justify-between gap-4">
        <span className="border border-paper/14 bg-ink/34 px-2.5 py-1 text-[10px] uppercase tracking-studio text-paper/68">
          Placeholder
        </span>
        <span className="text-[10px] uppercase tracking-studio text-paper/46">{mediaType}</span>
      </div>

      <div className="relative z-10 grid gap-6 md:grid-cols-[0.7fr_1fr]">
        <div className="flex items-end">
          <span className="font-display text-6xl uppercase leading-[0.72] text-paper/88 md:text-8xl lg:text-[8rem] xl:text-[10rem]">
            {label}
          </span>
        </div>

        <div className="self-end border-l border-paper/14 pl-4">
          <div className="mb-4 flex gap-2">
            <span className="h-2 w-8" style={{ background: tone.primary }} />
            <span className="h-2 w-8 bg-paper/22" />
            <span className="h-2 w-8 bg-ink/70" />
          </div>
          <p className="max-w-sm text-xs uppercase leading-5 tracking-studio text-paper/60">
            {title ?? "Replace this placeholder with final image or motion asset"}
          </p>
        </div>
      </div>

      {mediaType === "video" ? (
        <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-paper/70" />
          <span className="h-px flex-1 bg-paper/20" />
          <span className="h-px w-1/3 bg-[var(--tone)]" />
        </div>
      ) : null}
    </div>
  );
}
