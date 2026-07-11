import type { Metadata } from "next";
import { Award, BriefcaseBusiness, Download, GraduationCap, Mail, MapPin, Phone, Sparkles } from "lucide-react";
import { BlurText } from "@/components/animation/BlurText";
import { FadeIn } from "@/components/animation/FadeIn";
import {
  certificates,
  education,
  experience,
  jobInfo,
  profile,
  researchDirections,
  resumeStats,
  skills,
  tools
} from "@/data/resume";

export const metadata: Metadata = {
  title: "履历",
  description: "电商视觉与品牌设计师履历页面。"
};

export default function ResumePage() {
  return (
    <main className="pb-24 pt-28 md:pt-40">
      <section className="container-grid">
        <div className="grid gap-8 lg:grid-cols-[360px_minmax(0,1fr)] xl:grid-cols-[400px_minmax(0,1fr)]">
          <aside className="border border-paper/10 bg-ink/72 p-6 backdrop-blur-xl lg:sticky lg:top-28 lg:self-start md:p-8">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-xs uppercase tracking-studio text-paper/36">Resume / 个人简历</p>
                <h1 className="mt-6 text-6xl font-medium leading-none text-paper md:text-7xl">
                  <BlurText as="span" className="block" delay={55} text={profile.name} />
                </h1>
                <p className="mt-5 text-base leading-7 text-paper/62">{profile.title}</p>
              </div>
              <span className="grid h-14 w-14 shrink-0 place-items-center border border-paper/16 text-xs uppercase tracking-studio text-paper/58">
                VS
              </span>
            </div>

            <p className="mt-8 text-sm leading-7 text-paper/64">{profile.description}</p>

            <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden border border-paper/10 bg-paper/10">
              {[
                ["年龄", profile.age],
                ["城市", profile.location],
                ["经验", profile.workYears],
                ["意向", profile.jobTarget]
              ].map(([label, value]) => (
                <div className="bg-ink p-4" key={label}>
                  <p className="text-[10px] uppercase tracking-studio text-paper/32">{label}</p>
                  <p className="mt-3 text-lg leading-none text-paper">{value}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 space-y-3 text-sm text-paper/64">
              <ContactLine href={`tel:${profile.contact.phone}`} icon={<Phone size={15} strokeWidth={1.5} />} text={profile.contact.phone} />
              <ContactLine icon={<Sparkles size={15} strokeWidth={1.5} />} text={`微信：${profile.contact.wechat}`} />
              <ContactLine href={`mailto:${profile.contact.email}`} icon={<Mail size={15} strokeWidth={1.5} />} text={profile.contact.email} />
              <ContactLine icon={<MapPin size={15} strokeWidth={1.5} />} text="上海 / 可承接品牌与电商视觉相关合作" />
            </div>

            <a
              className="mt-8 inline-flex w-full items-center justify-center gap-3 border border-paper/16 px-5 py-3 text-xs uppercase tracking-studio text-paper/70 transition-colors hover:border-brass/70 hover:text-paper"
              download
              href="/resume/wanghe-resume.pdf"
            >
              <Download size={15} strokeWidth={1.5} />
              下载 PDF 简历
            </a>
          </aside>

          <div className="min-w-0">
            <div className="border border-paper/10 p-6 md:p-10 lg:p-12">
              <p className="text-xs uppercase tracking-studio text-brass">Visual Designer / Commerce / Brand System</p>
              <h2 className="mt-7 max-w-5xl text-5xl font-medium leading-[0.95] text-paper md:text-7xl lg:text-[6.5rem]">
                <BlurText as="span" className="block" delay={28} text="从品牌策略、用户体验与业务价值出发构建设计系统。" />
              </h2>
              <p className="mt-8 max-w-4xl text-lg leading-8 text-paper/64">{profile.advantage}</p>
            </div>

            <div className="mt-4 grid gap-px overflow-hidden border border-paper/10 bg-paper/10 md:grid-cols-4">
              {resumeStats.map((item) => (
                <div className="bg-ink p-5 md:p-6" key={item.label}>
                  <p className="text-[10px] uppercase tracking-studio text-paper/34">{item.label}</p>
                  <p className="mt-5 text-2xl font-medium leading-tight text-paper md:text-3xl">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-grid py-20 md:py-28">
        <div className="grid gap-10 md:grid-cols-[0.48fr_1.52fr]">
          <div>
            <p className="text-xs uppercase tracking-studio text-paper/38">Experience / 工作经历</p>
            <h2 className="mt-5 max-w-md text-4xl font-medium leading-[1.02] text-paper md:text-5xl">
              <BlurText as="span" className="block" delay={32} text="13 年电商视觉、品牌页面与团队方法论实践。" />
            </h2>
          </div>

          <div className="space-y-8">
            {experience.map((item, index) => (
              <ExperienceItem index={index} item={item} key={item.company} />
            ))}
          </div>
        </div>
      </section>

      <section className="container-grid">
        <div className="grid gap-px overflow-hidden border border-paper/10 bg-paper/10 lg:grid-cols-[1.05fr_0.95fr]">
          <Panel eyebrow="Skills / 能力标签" icon={<BriefcaseBusiness size={18} strokeWidth={1.5} />}>
            <TagCloud items={skills} />
          </Panel>

          <Panel eyebrow="Tools / 工具" icon={<Sparkles size={18} strokeWidth={1.5} />}>
            <TagCloud items={tools} />
          </Panel>

          <Panel eyebrow="Research Direction / 研究方向" icon={<Sparkles size={18} strokeWidth={1.5} />}>
            <ul className="grid gap-3 text-sm leading-6 text-paper/62">
              {researchDirections.map((item) => (
                <li className="border-l border-paper/14 pl-4" key={item}>
                  {item}
                </li>
              ))}
            </ul>
          </Panel>

          <Panel eyebrow="Certificates / 资格证书" icon={<Award size={18} strokeWidth={1.5} />}>
            <TagCloud items={certificates} />
          </Panel>
        </div>
      </section>

      <section className="container-grid py-20 md:py-28">
        <div className="grid gap-10 md:grid-cols-[0.48fr_1.52fr]">
          <div>
            <p className="text-xs uppercase tracking-studio text-paper/38">Education / 教育经历</p>
            <h2 className="mt-5 text-4xl font-medium leading-[1.02] text-paper md:text-5xl">
              <BlurText as="span" className="block" delay={32} text="持续学习作为长期设计方法的一部分。" />
            </h2>
          </div>

          <div className="grid gap-px overflow-hidden border border-paper/10 bg-paper/10">
            {education.map((item, index) => (
              <FadeIn
                as="article"
                className="grid gap-6 bg-ink p-6 md:grid-cols-[0.42fr_1fr_auto] md:items-start md:p-8"
                delay={index * 0.05}
                key={item.school}
              >
                <p className="font-mono text-xs text-paper/36">{String(index + 1).padStart(2, "0")}</p>
                <div>
                  <div className="flex items-center gap-3 text-brass">
                    <GraduationCap size={18} strokeWidth={1.5} />
                    <p className="text-xs uppercase tracking-studio">Education</p>
                  </div>
                  <h3 className="mt-4 text-3xl font-medium leading-none text-paper md:text-5xl">{item.school}</h3>
                  <p className="mt-4 text-base leading-7 text-paper/64">{item.degree}</p>
                  <p className="mt-2 text-sm leading-6 text-paper/44">{item.note}</p>
                </div>
                <p className="text-xs uppercase tracking-studio text-paper/44 md:text-right">{item.period}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="container-grid">
        <div className="border-t border-paper/10 py-10 md:flex md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-studio text-paper/36">Job Information / 求职信息</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {jobInfo.map((item) => (
                <span className="border border-paper/12 px-3 py-2 text-xs uppercase tracking-studio text-paper/56" key={item.label}>
                  {item.label}：{item.value}
                </span>
              ))}
            </div>
          </div>
          <a className="mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-studio text-paper/62 hover:text-paper md:mt-0" href={`mailto:${profile.contact.email}`}>
            {profile.contact.email}
            <Mail size={15} strokeWidth={1.5} />
          </a>
        </div>
      </section>
    </main>
  );
}

function ContactLine({ icon, text, href }: { icon: React.ReactNode; text: string; href?: string }) {
  const content = (
    <>
      <span className="text-brass">{icon}</span>
      <span>{text}</span>
    </>
  );

  if (href) {
    return (
      <a className="flex items-center gap-3 transition-colors hover:text-paper" href={href}>
        {content}
      </a>
    );
  }

  return <p className="flex items-center gap-3">{content}</p>;
}

function ExperienceItem({
  item,
  index
}: {
  item: (typeof experience)[number];
  index: number;
}) {
  return (
    <FadeIn
      as="article"
      className="grid gap-8 border-t border-paper/10 py-8 md:grid-cols-[0.36fr_1.64fr]"
      delay={index * 0.05}
    >
      <div>
        <p className="font-mono text-xs text-paper/38">{item.period}</p>
        <p className="mt-4 text-sm leading-6 text-paper/54">{item.role}</p>
      </div>

      <div>
        <h3 className="text-3xl font-medium leading-tight text-paper md:text-5xl">{item.company}</h3>
        <p className="mt-4 text-xs uppercase leading-5 tracking-studio text-brass/80">{item.scope}</p>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <ResumeList title="内容" items={item.responsibilities} />
          <ResumeList title="业绩" items={item.achievements} />
        </div>
      </div>
    </FadeIn>
  );
}

function ResumeList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="mb-4 text-xs uppercase tracking-studio text-paper/36">{title}</p>
      <ul className="grid gap-3 text-sm leading-6 text-paper/62">
        {items.map((item) => (
          <li className="border-l border-paper/14 pl-4" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Panel({ eyebrow, icon, children }: { eyebrow: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <FadeIn as="section" className="bg-ink p-6 md:p-8">
      <div className="mb-8 flex items-center justify-between gap-6">
        <p className="text-xs uppercase tracking-studio text-paper/40">{eyebrow}</p>
        <span className="text-brass">{icon}</span>
      </div>
      {children}
    </FadeIn>
  );
}

function TagCloud({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span className="border border-paper/12 px-3 py-2 text-xs uppercase tracking-studio text-paper/56" key={item}>
          {item}
        </span>
      ))}
    </div>
  );
}
