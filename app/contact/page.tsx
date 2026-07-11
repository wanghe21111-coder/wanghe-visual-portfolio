import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { BlurText } from "@/components/animation/BlurText";
import { FadeIn } from "@/components/animation/FadeIn";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "联系",
  description: "品牌、电商、地域文创与视觉系统合作联系页面。"
};

export default function ContactPage() {
  return (
    <main className="container-grid flex min-h-screen flex-col justify-center pb-24 pt-32 md:pt-44">
      <FadeIn>
        <p className="mb-5 text-xs uppercase tracking-studio text-paper/40">Contact / 联系</p>
        <h1 className="max-w-6xl text-6xl leading-[0.92] text-paper md:text-8xl lg:text-[8.5rem]">
          <BlurText as="span" className="block" delay={34} text="一起构建有意义的视觉系统。" />
        </h1>
      </FadeIn>

      <section className="mt-14 grid gap-px overflow-hidden border border-paper/10 bg-paper/10 md:grid-cols-4">
        <div className="bg-ink p-6 md:p-8">
          <p className="mb-6 text-xs uppercase tracking-studio text-paper/36">邮箱 / Email</p>
          <a className="inline-flex items-center gap-2 text-xl text-paper" href={`mailto:${site.email}`}>
            {site.email}
            <ArrowUpRight size={18} strokeWidth={1.5} />
          </a>
        </div>

        <div className="bg-ink p-6 md:p-8">
          <p className="mb-6 text-xs uppercase tracking-studio text-paper/36">电话 / Phone</p>
          <a className="inline-flex items-center gap-2 text-xl text-paper" href={`tel:${site.phone}`}>
            {site.phone}
            <ArrowUpRight size={18} strokeWidth={1.5} />
          </a>
        </div>

        <div className="bg-ink p-6 md:p-8">
          <p className="mb-6 text-xs uppercase tracking-studio text-paper/36">社交媒体 / Social</p>
          <div className="flex flex-wrap gap-x-5 gap-y-3">
            {site.socials.map((social) => (
              <span className="text-paper/68" key={social.label}>
                {social.label}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-ink p-6 md:p-8">
          <p className="mb-6 text-xs uppercase tracking-studio text-paper/36">合作方向 / Collaboration</p>
          <p className="text-sm leading-6 text-paper/62">
            可合作方向包括品牌视觉系统、电商活动主视觉、地域文创与 IP 探索、AI 辅助视觉研究，以及作品集案例整理。
          </p>
        </div>
      </section>
    </main>
  );
}
