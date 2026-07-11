import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { BlurText } from "@/components/animation/BlurText";
import { FadeIn } from "@/components/animation/FadeIn";
import { ApproachPreview } from "@/components/sections/ApproachPreview";
import { Hero } from "@/components/sections/Hero";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { PrimaryLink } from "@/components/ui/PrimaryLink";

const capabilities = [
  "品牌视觉 Brand Visual",
  "活动主视觉 Campaign KV",
  "电商页面 E-commerce Pages",
  "详情页 Detail Page",
  "IP 文创 Cultural IP",
  "AI 辅助视觉 AI Visual",
  "动效实验 Motion"
];

export default function Home() {
  return (
    <main>
      <Hero />

      <section className="container-grid border-y border-paper/10 py-8">
        <div className="grid gap-5 md:grid-cols-[0.5fr_1.5fr] md:items-center">
          <p className="text-xs uppercase tracking-studio text-paper/40">创作方向 / Practice Spectrum</p>
          <div className="flex flex-wrap gap-2">
            {capabilities.map((item) => (
              <span className="border border-paper/12 px-3 py-2 text-xs uppercase tracking-studio text-paper/58" key={item}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <SelectedWork />
      <ApproachPreview />

      <section className="container-grid py-20 md:py-32">
        <FadeIn className="grid gap-10 md:grid-cols-[0.85fr_1.15fr] md:items-end">
          <p className="text-xs uppercase tracking-studio text-paper/40">Personal Positioning</p>
          <div>
            <h2 className="max-w-5xl text-4xl leading-[0.98] text-paper md:text-6xl lg:text-7xl">
              <BlurText as="span" className="block" delay={30} text="将商业转化、品牌秩序与文化质感连接起来。" />
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-7 text-paper/62 md:text-lg">
              这个网站会优先作为可替换的作品框架：先让作品展示、分类预览与动效体验成立，再逐步补充正式案例文案、视频、数据和过程说明。
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <PrimaryLink href="/about">了解我的设计方法</PrimaryLink>
              <Link className="inline-flex items-center gap-2 text-xs uppercase tracking-studio text-paper/54 hover:text-paper" href="/contact">
                联系合作 / Contact
                <ArrowUpRight size={15} strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>
    </main>
  );
}
