import type { Metadata } from "next";
import { WorkCard } from "@/components/sections/WorkCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Selected Work",
  description: "Selected case study placeholders for brand, commerce, cultural IP, AI, and motion visual design."
};

export default function WorkPage() {
  return (
    <main className="container-grid pb-24 pt-32 md:pt-44">
      <SectionHeader
        eyebrow="Work Index"
        title="Selected works prepared for detailed case study writing."
        description="Every project is wired to a reusable detail template. Replace placeholders with final assets as your portfolio archive becomes ready."
      />

      <div className="mt-14 grid gap-12 md:mt-20 md:grid-cols-2">
        {projects.map((project, index) => (
          <WorkCard index={index} key={project.slug} project={project} />
        ))}
      </div>
    </main>
  );
}
