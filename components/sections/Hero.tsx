import { ArrowDown } from "lucide-react";
import { BlurText } from "@/components/animation/BlurText";
import { RotatingWord } from "@/components/sections/RotatingWord";
import { PrimaryLink } from "@/components/ui/PrimaryLink";
import { site } from "@/data/site";

export function Hero() {
  return (
    <section className="container-grid flex min-h-[720px] max-h-[1080px] flex-col justify-end pb-10 pt-24 md:h-screen md:pt-28">
      <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <div>
          <p className="mb-8 max-w-2xl text-xs uppercase tracking-studio text-paper/48">
            Visual Designer / Brand & E-commerce / Cultural IP Research
          </p>
          <h1 className="font-display text-6xl leading-[0.92] text-paper sm:text-7xl md:text-8xl lg:text-[8.5rem] xl:text-[9.5rem]">
            <span className="block">
              <BlurText as="span" className="block" delay={34} text="为品牌" />
              <BlurText as="span" className="block" delay={34} rootMargin="-6% 0px" text="构建视觉" />
              <BlurText as="span" className="block" delay={34} rootMargin="-6% 0px" text="系统。" />
            </span>
          </h1>
        </div>

        <div className="grid gap-8 border-t border-paper/10 pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
          <p className="max-w-xl text-lg leading-8 text-paper/68 md:text-xl">{site.heroLead}</p>
          <p className="text-sm uppercase tracking-studio text-paper/42">
            Currently shaping <RotatingWord words={site.rotatingWords} />
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <PrimaryLink href="/#work">进入作品展示</PrimaryLink>
            <a className="link-underline text-xs uppercase tracking-studio text-paper/54 hover:text-paper" href="/resume">
              查看履历 / Resume
            </a>
          </div>
        </div>
      </div>

      <div className="mt-14 flex items-center justify-between border-t border-paper/10 pt-5 text-xs uppercase tracking-studio text-paper/40">
        <span>向下滚动查看作品</span>
        <span className="inline-flex items-center gap-2">
          Explore
          <ArrowDown size={15} strokeWidth={1.5} />
        </span>
      </div>
    </section>
  );
}
