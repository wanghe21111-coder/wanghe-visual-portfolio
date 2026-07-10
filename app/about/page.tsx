import type { Metadata } from "next";
import { FadeIn } from "@/components/animation/FadeIn";
import { ApproachPreview } from "@/components/sections/ApproachPreview";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "关于",
  description: "关于设计师、设计方法与研究方向。"
};

const notes = [
  {
    title: "电商视觉设计",
    text: "长期处理活动层级、平台规则、转化压力、页面节奏、产品清晰度与可规模化视觉输出。"
  },
  {
    title: "品牌视觉系统",
    text: "关注如何把品牌策略语气转化为店铺、页面、活动、产品与提案系统中的可用规则。"
  },
  {
    title: "IP 与文化研究",
    text: "关注地域文化、日常物件、工艺记忆，以及文化线索如何成为当代设计语言。"
  },
  {
    title: "AI 辅助工作流",
    text: "把 AI 作为参考扩展、概念迭代、视觉方向与前期决策中的探索层，而不是替代设计判断。"
  }
];

export default function AboutPage() {
  return (
    <main className="pb-24 pt-32 md:pt-44">
      <section className="container-grid">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="mb-5 text-xs uppercase tracking-studio text-paper/40">About / 关于</p>
            <h1 className="text-6xl leading-[0.92] text-paper md:text-8xl lg:text-[8rem]">
              把设计作为一套视觉操作系统。
            </h1>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-paper/66">
            我的工作横跨电商视觉、品牌系统、活动主视觉、地域文创、IP 设计与视觉研究。核心问题通常不是做出一张好看的图，而是建立一种能在不同商业场景持续工作的视觉语言。
          </p>
        </div>
      </section>

      <section className="container-grid py-20 md:py-28">
        <SectionHeader
          eyebrow="Focus"
          title="商业上清晰，文化上敏感，方法上系统。"
          description="这里的文案仍然可以继续替换成你的真实经历；当前版本先保持中文主导、英文点缀的国际化作品集语气。"
        />
        <div className="mt-12 grid gap-px overflow-hidden border border-paper/10 bg-paper/10 md:grid-cols-2">
          {notes.map((item, index) => (
            <FadeIn as="article" className="min-h-[260px] bg-ink p-6 md:p-8" delay={index * 0.05} key={item.title}>
              <p className="mb-12 font-mono text-xs text-paper/34">0{index + 1}</p>
              <h2 className="text-3xl uppercase leading-none text-paper">{item.title}</h2>
              <p className="mt-5 max-w-xl text-sm leading-6 text-paper/58">{item.text}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      <ApproachPreview />
    </main>
  );
}
