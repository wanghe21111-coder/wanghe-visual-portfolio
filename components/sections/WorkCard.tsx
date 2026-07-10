"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { VisualPlaceholder } from "@/components/ui/VisualPlaceholder";
import type { Project } from "@/data/projects";
import { padIndex } from "@/lib/utils";

export function WorkCard({ project, index }: { project: Project; index: number }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 34 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 0.72, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group border-t border-paper/10 pt-5"
    >
      <Link href={`/work/${project.slug}`} className="grid gap-5" data-cursor="focus">
        <div className="overflow-hidden">
          <motion.div
            whileHover={reduceMotion ? undefined : { scale: 1.025 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <VisualPlaceholder
              aspect={index % 3 === 2 ? "portrait" : "wide"}
              label={project.cover.label}
              mediaType={project.cover.mediaType}
              tone={project.cover.tone}
              title={project.title}
            />
          </motion.div>
        </div>

        <div className="grid gap-4 md:grid-cols-[0.14fr_1fr_auto] md:items-start">
          <span className="font-mono text-xs text-paper/36">{padIndex(index)}</span>
          <div>
            <motion.h3
              className="text-3xl uppercase leading-none text-paper md:text-5xl"
              whileHover={reduceMotion ? undefined : { x: 10 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {project.title}
            </motion.h3>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-paper/56">{project.summary}</p>
          </div>
          <div className="flex items-center gap-3 text-xs uppercase tracking-studio text-paper/42 md:justify-end">
            <span>{project.year}</span>
            <ArrowUpRight size={16} strokeWidth={1.5} className="transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.keywords.map((keyword) => (
            <span className="border border-paper/12 px-2.5 py-1 text-[10px] uppercase tracking-studio text-paper/46" key={keyword}>
              {keyword}
            </span>
          ))}
        </div>
      </Link>
    </motion.article>
  );
}
