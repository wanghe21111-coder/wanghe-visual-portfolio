import { ArrowDown } from "lucide-react";
import { BlurText } from "@/components/animation/BlurText";
import { TextType } from "@/components/animation/TextType";
import { RotatingWord } from "@/components/sections/RotatingWord";
import { PrimaryLink } from "@/components/ui/PrimaryLink";
import { site } from "@/data/site";

export function Hero() {
  return (
    <section className="container-grid relative min-h-[720px] max-h-[1080px] pb-24 pt-28 md:h-screen">
      <div className="grid h-full gap-12 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="self-start">
          <h1 className="font-display text-4xl leading-[0.94] text-paper min-[390px]:text-[2.625rem] min-[480px]:text-5xl sm:text-6xl md:text-7xl lg:text-[4.75rem] xl:text-[5rem]">
            <BlurText as="span" className="block" delay={42} text={site.heroTitle} />
            <span className="mt-1 block h-[1.06em] overflow-hidden whitespace-nowrap">
              <TextType
                as="span"
                cursorBlinkDuration={0.55}
                cursorCharacter=""
                cursorClassName="hero-type-cursor"
                deletingSpeed={45}
                initialDelay={350}
                pauseDuration={1500}
                startOnVisible
                text={site.heroStatements}
                typingSpeed={95}
              />
            </span>
          </h1>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <PrimaryLink href="/#work">进入作品展示</PrimaryLink>
            <a className="link-underline text-xs uppercase tracking-studio text-paper/54 hover:text-paper" href="/resume">
              查看履历 / Resume
            </a>
          </div>
        </div>

        <div className="grid self-end gap-8 border-t border-paper/10 pt-6 lg:mb-16 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
          <p className="max-w-2xl text-xs uppercase tracking-studio text-paper/48">
            Visual Designer / Brand & E-commerce / Cultural IP Research
          </p>
          <p className="max-w-xl text-lg leading-8 text-paper/68 md:text-xl">{site.heroLead}</p>
          <p className="text-sm uppercase tracking-studio text-paper/42">
            Currently shaping <RotatingWord words={site.rotatingWords} />
          </p>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-10 flex items-center justify-between border-t border-paper/10 pt-5 text-xs uppercase tracking-studio text-paper/40">
        <span>向下滚动查看作品</span>
        <span className="inline-flex items-center gap-2">
          Explore
          <ArrowDown size={15} strokeWidth={1.5} />
        </span>
      </div>
    </section>
  );
}
