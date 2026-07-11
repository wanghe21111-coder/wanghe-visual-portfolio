import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { BlurText } from "@/components/animation/BlurText";
import { FadeIn } from "@/components/animation/FadeIn";
import { VisualPlaceholder } from "@/components/ui/VisualPlaceholder";
import { getProjectBySlug, projects } from "@/data/projects";
import { cn, padIndex } from "@/lib/utils";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {};
  }

  return {
    title: project.title,
    description: project.summary
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="pb-24 pt-28 md:pt-36">
      <section className="container-grid">
        <Link
          href="/#work"
          className="mb-10 inline-flex items-center gap-2 text-xs uppercase tracking-studio text-paper/48 transition-colors hover:text-paper"
        >
          <ArrowLeft size={15} strokeWidth={1.5} />
          Back to work
        </Link>

        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="mb-5 text-xs uppercase tracking-studio text-paper/42">{project.type}</p>
            <h1 className="max-w-5xl text-6xl uppercase leading-[0.88] text-paper md:text-8xl lg:text-[8.6rem]">
              <BlurText as="span" className="block" delay={42} text={project.title} />
            </h1>
          </div>

          <div className="border-t border-paper/10 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <p className="text-lg leading-8 text-paper/66">{project.subtitle}</p>
            <dl className="mt-8 grid grid-cols-2 gap-5 text-sm">
              <div>
                <dt className="text-xs uppercase tracking-studio text-paper/34">Year</dt>
                <dd className="mt-2 text-paper/76">{project.year}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-studio text-paper/34">Role</dt>
                <dd className="mt-2 text-paper/76">{project.role}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-studio text-paper/34">Duration</dt>
                <dd className="mt-2 text-paper/76">{project.caseStudy.duration}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-studio text-paper/34">Scope</dt>
                <dd className="mt-2 text-paper/76">{project.caseStudy.scope.join(" / ")}</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="mt-12 md:mt-20">
          <VisualPlaceholder
            aspect="wide"
            label={project.cover.label}
            mediaType={project.cover.mediaType}
            tone={project.cover.tone}
            title={`${project.title} hero asset placeholder`}
          />
        </div>
      </section>

      <section className="container-grid py-20 md:py-28">
        <div className="grid gap-8 border-y border-paper/10 py-10 md:grid-cols-[0.7fr_1.3fr]">
          <p className="text-xs uppercase tracking-studio text-paper/40">Project Background</p>
          <div className="grid gap-8 md:grid-cols-2">
            <p className="text-lg leading-8 text-paper/68">{project.caseStudy.overview}</p>
            <p className="text-lg leading-8 text-paper/68">{project.caseStudy.challenge}</p>
          </div>
        </div>
      </section>

      <section className="container-grid">
        <div className="space-y-4">
          {project.caseStudy.sections.map((section, index) => (
            <FadeIn
              as="article"
              className="grid gap-8 border-t border-paper/10 py-10 md:grid-cols-[0.55fr_1.45fr]"
              delay={index * 0.04}
              key={section.title}
            >
              <div className="flex items-start justify-between gap-5">
                <p className="text-xs uppercase tracking-studio text-paper/40">{section.eyebrow}</p>
                <span className="font-mono text-xs text-paper/26">{padIndex(index)}</span>
              </div>
              <div className="max-w-4xl">
                <h2 className="text-3xl uppercase leading-none text-paper md:text-5xl">
                  <BlurText as="span" className="block" delay={36} text={section.title} />
                </h2>
                <p className="mt-5 text-base leading-7 text-paper/62 md:text-lg">{section.body}</p>
                {section.points ? (
                  <div className="mt-7 flex flex-wrap gap-2">
                    {section.points.map((point) => (
                      <span className="border border-paper/12 px-3 py-2 text-xs uppercase tracking-studio text-paper/52" key={point}>
                        {point}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="container-grid py-20 md:py-28">
        <div className="mb-10 flex items-end justify-between gap-8">
          <div>
            <p className="mb-4 text-xs uppercase tracking-studio text-paper/40">Media Placeholders</p>
            <h2 className="text-4xl uppercase leading-none text-paper md:text-6xl">
              <BlurText as="span" animateBy="words" className="block" delay={80} text="Images, motion and output frames." />
            </h2>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {project.caseStudy.assets.map((asset, index) => (
            <FadeIn
              as="article"
              className={cn(index === 0 && "md:col-span-2")}
              delay={index * 0.05}
              key={asset.title}
            >
              <VisualPlaceholder
                aspect={asset.ratio}
                label={project.cover.label}
                mediaType={asset.mediaType}
                tone={project.cover.tone}
                title={asset.title}
              />
              <div className="mt-4 border-t border-paper/10 pt-4">
                <h3 className="text-lg uppercase leading-none text-paper">{asset.title}</h3>
                <p className="mt-2 text-sm leading-6 text-paper/52">{asset.caption}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="container-grid border-t border-paper/10 pt-10">
        <Link
          className="inline-flex items-center gap-3 text-xs uppercase tracking-studio text-paper/58 transition-colors hover:text-paper"
          href="/contact"
        >
          Discuss similar visual systems
          <ArrowUpRight size={16} strokeWidth={1.5} />
        </Link>
      </section>
    </main>
  );
}
