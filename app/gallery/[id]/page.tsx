import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WorkDetailSlider } from "@/components/sections/WorkDetailSlider";
import { workGallery } from "@/data/work-gallery.generated";

type PageProps = {
  params: Promise<{ id: string }>;
};

function findWorkItem(id: string) {
  for (const category of workGallery) {
    const item = category.items.find((entry) => entry.id === id);

    if (item) {
      return { category, item };
    }
  }

  return null;
}

export function generateStaticParams() {
  return workGallery.flatMap((category) => category.items.map((item) => ({ id: item.id })));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const result = findWorkItem(id);

  if (!result) {
    return {};
  }

  return {
    title: result.item.title,
    description: `${result.category.title} - ${result.item.title}`
  };
}

export default async function GalleryDetailPage({ params }: PageProps) {
  const { id } = await params;
  const result = findWorkItem(id);

  if (!result) {
    notFound();
  }

  return <WorkDetailSlider category={result.category} initialItem={result.item} />;
}
