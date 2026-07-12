import { FadeIn } from "@/components/animation/FadeIn";
import { SectionHeader } from "@/components/ui/SectionHeader";

const approach = [
  {
    title: "先策略，后画面",
    text: "先判断受众、平台节奏、产品事实与传播压力，再进入画面表达。"
  },
  {
    title: "系统大于单图",
    text: "一张主视觉应该能延展成页面、Banner、详情模块与动效切片的统一语言。"
  },
  {
    title: "文化进入日常",
    text: "地域文化与 IP 不只停留在符号收集，更要转译成当代可使用的视觉系统。"
  },
  {
    title: "动效服务叙事",
    text: "动效用来引导注意、建立层级与推进情绪，而不是单纯装饰界面。"
  }
];

export function ApproachPreview() {
  return (
    <section className="border-y border-paper/10 py-20 md:py-28">
      <div className="container-grid">
        <SectionHeader
          eyebrow="Design Approach / 设计方法"
          title={"先建立清晰的结构，\n再创造有记忆点的视觉。"}
        />

        <div className="mt-14 grid gap-px overflow-hidden border border-paper/10 bg-paper/10 md:grid-cols-4">
          {approach.map((item, index) => (
            <FadeIn
              as="article"
              className="min-h-[260px] bg-ink p-6 md:p-7"
              delay={index * 0.05}
              key={item.title}
            >
              <p className="mb-12 font-mono text-xs text-paper/34">0{index + 1}</p>
              <h3 className="text-2xl uppercase leading-none text-paper">{item.title}</h3>
              <p className="mt-5 text-sm leading-6 text-paper/58">{item.text}</p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
