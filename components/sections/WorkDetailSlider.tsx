"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { WorkGalleryCategory, WorkGalleryItem } from "@/data/work-gallery.generated";
import { cn } from "@/lib/utils";

type WorkDetailSliderProps = {
  category: WorkGalleryCategory;
  initialItem: WorkGalleryItem;
};

function getImageDimensions(item: WorkGalleryItem) {
  return {
    width: item.width ?? 1200,
    height: item.height ?? 900
  };
}

function isLongWork(item: WorkGalleryItem) {
  return Boolean(item.width && item.height && item.height / item.width >= 2.2);
}

function shouldFitWithinViewport(categoryId: string) {
  return categoryId === "poster" || categoryId === "aigc" || categoryId === "lab";
}

function getGscLightAndNightOrder(fileName: string) {
  const order = new Map([
    ["GSC海报设计 2022.9-1.jpg", 0],
    ["GSC 2022.9-2.jpg", 1],
    ["GSC海报设计 2022.9-3.jpg", 2],
    ["GSC 2022.9-4.jpg.jpg", 3],
    ["GSC 2022.9-5.jpg", 4]
  ]);

  return order.get(fileName) ?? -1;
}

function getBrandSystemOrder(fileName: string) {
  const match = fileName.match(/^(\d+)/);
  return match ? Number(match[1]) : -1;
}

function getVerticalDetailItems(category: WorkGalleryCategory, initialItem: WorkGalleryItem) {
  if (getGscLightAndNightOrder(initialItem.originalFile) >= 0) {
    return category.items
      .filter((item) => getGscLightAndNightOrder(item.originalFile) >= 0)
      .sort((a, b) => getGscLightAndNightOrder(a.originalFile) - getGscLightAndNightOrder(b.originalFile));
  }

  if (category.id === "brand" && getBrandSystemOrder(initialItem.originalFile) > 0) {
    return category.items
      .filter((item) => getBrandSystemOrder(item.originalFile) > 0)
      .sort((a, b) => getBrandSystemOrder(a.originalFile) - getBrandSystemOrder(b.originalFile));
  }

  return null;
}

function getDetailItems(category: WorkGalleryCategory, initialItem: WorkGalleryItem) {
  if (initialItem.originalFile.startsWith("FOFOS 2025.8-")) {
    return category.items.filter((item) => item.originalFile.startsWith("FOFOS 2025.8-"));
  }

  return category.items;
}

export function WorkDetailSlider({ category, initialItem }: WorkDetailSliderProps) {
  const reduceMotion = useReducedMotion();
  const verticalDetailItems = getVerticalDetailItems(category, initialItem);

  if (verticalDetailItems) {
    const coverItem = verticalDetailItems[0] ?? initialItem;

    return <VerticalWorkDetail category={category} coverItem={coverItem} items={verticalDetailItems} reduceMotion={Boolean(reduceMotion)} />;
  }

  return <HorizontalWorkDetail category={category} initialItem={initialItem} reduceMotion={Boolean(reduceMotion)} />;
}

function HorizontalWorkDetail({
  category,
  initialItem,
  reduceMotion
}: {
  category: WorkGalleryCategory;
  initialItem: WorkGalleryItem;
  reduceMotion: boolean;
}) {
  const items = getDetailItems(category, initialItem);
  const initialIndex = Math.max(
    0,
    items.findIndex((item) => item.id === initialItem.id)
  );
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [direction, setDirection] = useState(1);

  const activeItem = items[activeIndex] ?? initialItem;
  const dimensions = getImageDimensions(activeItem);
  const longImage = isLongWork(activeItem);
  const fitWithinViewport = shouldFitWithinViewport(category.id);
  const viewingMode = fitWithinViewport ? "完整预览" : longImage ? "长图阅读" : "原图预览";
  const viewingDescription = fitWithinViewport
    ? `${category.summary} 当前作品会自适应屏幕完整展示，适合单张海报和实验图快速预览。`
    : `${category.summary} 当前页面按图片原始比例展开，适合电商长图和详情页向下阅读。`;

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? "auto" : "smooth"
    });
  }, [activeItem.id, reduceMotion]);

  const goTo = (nextIndex: number) => {
    setDirection(nextIndex > activeIndex ? 1 : -1);
    setActiveIndex(nextIndex);
  };

  const step = (delta: -1 | 1) => {
    const total = items.length;
    setDirection(delta);
    setActiveIndex((current) => (current + delta + total) % total);
  };

  return (
    <section className="bg-ink pt-16 text-paper md:pt-20">
      <div className="mx-auto grid w-full max-w-[1920px] min-[520px]:grid-cols-[220px_minmax(0,1fr)] md:grid-cols-[300px_minmax(0,1fr)] lg:grid-cols-[340px_minmax(0,1fr)]">
        <aside className="border-b border-paper/10 bg-ink/94 px-4 py-5 backdrop-blur-xl min-[520px]:sticky min-[520px]:top-16 min-[520px]:h-[calc(100vh-4rem)] min-[520px]:border-b-0 min-[520px]:border-r min-[520px]:px-5 min-[520px]:py-6 md:top-20 md:h-[calc(100vh-5rem)] md:px-6 md:py-7 lg:px-8">
          <div className="flex h-full flex-col gap-6 md:justify-between">
            <div>
              <Link className="inline-flex items-center gap-2 text-xs uppercase tracking-studio text-paper/48 transition-colors hover:text-paper" href="/#work">
                <ArrowLeft size={15} strokeWidth={1.5} />
                返回作品
              </Link>

              <div className="mt-8">
                <p className="text-[10px] uppercase tracking-studio text-paper/40">
                  {category.order} / {String(activeIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                </p>
                <h1 className="mt-3 break-words text-3xl font-medium leading-[0.96] text-paper md:text-4xl">
                  {activeItem.title}
                </h1>
              </div>

              <p className="mt-6 text-xs uppercase leading-5 tracking-studio text-paper/36">{category.english}</p>
              <p className="mt-3 text-sm leading-6 text-paper/54">
                {viewingDescription}
              </p>

              <dl className="mt-8 grid grid-cols-2 gap-x-5 gap-y-4 text-xs text-paper/58 md:grid-cols-1">
                <div>
                  <dt className="uppercase tracking-studio text-paper/30">类型</dt>
                  <dd className="mt-1 text-paper/72">{activeItem.group || category.title}</dd>
                </div>
                <div>
                  <dt className="uppercase tracking-studio text-paper/30">日期</dt>
                  <dd className="mt-1 text-paper/72">{activeItem.dateLabel || "Archive"}</dd>
                </div>
                <div>
                  <dt className="uppercase tracking-studio text-paper/30">尺寸</dt>
                  <dd className="mt-1 font-mono text-paper/72">
                    {dimensions.width} x {dimensions.height}
                  </dd>
                </div>
                <div>
                  <dt className="uppercase tracking-studio text-paper/30">模式</dt>
                  <dd className="mt-1 text-paper/72">{viewingMode}</dd>
                </div>
              </dl>

              <p className="mt-8 hidden break-all font-mono text-[11px] leading-5 text-paper/30 md:block">
                {activeItem.originalFile}
              </p>
            </div>

            <div className="grid gap-6">
              <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] md:flex-wrap md:overflow-visible md:pb-0 [&::-webkit-scrollbar]:hidden">
                {items.map((item, index) => (
                  <button
                    aria-label={`切换到 ${item.title}`}
                    className={`h-1.5 shrink-0 transition-all ${index === activeIndex ? "w-12 bg-paper" : "w-5 bg-paper/18 hover:bg-paper/40"}`}
                    key={item.id}
                    type="button"
                    onClick={() => goTo(index)}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  aria-label="上一张作品"
                  className="grid h-11 w-11 place-items-center border border-paper/14 bg-paper/[0.03] transition-colors hover:border-paper/40 hover:bg-paper/10"
                  type="button"
                  onClick={() => step(-1)}
                >
                  <ArrowLeft size={18} strokeWidth={1.6} />
                </button>
                <button
                  aria-label="下一张作品"
                  className="grid h-11 w-11 place-items-center border border-paper/14 bg-paper/[0.03] transition-colors hover:border-paper/40 hover:bg-paper/10"
                  type="button"
                  onClick={() => step(1)}
                >
                  <ArrowRight size={18} strokeWidth={1.6} />
                </button>
              </div>
            </div>
          </div>
        </aside>

        <div
          className={cn(
            "min-w-0 px-4 py-5 md:px-8 md:py-8 lg:px-10",
            fitWithinViewport && "flex min-h-[72vh] items-center justify-center min-[520px]:min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-5rem)]"
          )}
        >
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.figure
              className={cn("mx-auto max-w-full", fitWithinViewport ? "flex h-full w-full items-center justify-center" : "w-fit")}
              custom={direction}
              initial={reduceMotion ? false : { x: direction * 36, opacity: 0 }}
              animate={reduceMotion ? undefined : { x: 0, opacity: 1 }}
              exit={reduceMotion ? undefined : { x: direction * -36, opacity: 0 }}
              key={activeItem.id}
              transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                alt={activeItem.title}
                className={cn(
                  "bg-[#efeee9] shadow-[0_30px_110px_rgba(0,0,0,0.38)]",
                  fitWithinViewport
                    ? "h-auto w-auto max-h-[72vh] max-w-full object-contain min-[520px]:max-h-[calc(100vh-6.5rem)] md:max-h-[calc(100vh-9rem)]"
                    : "h-auto max-w-full"
                )}
                height={dimensions.height}
                priority
                sizes={
                  fitWithinViewport
                    ? "(min-width: 1280px) calc(100vw - 420px), (min-width: 520px) calc(100vw - 252px), calc(100vw - 32px)"
                    : "(min-width: 1280px) calc(100vw - 420px), calc(100vw - 32px)"
                }
                src={activeItem.src}
                style={fitWithinViewport ? undefined : { width: `${dimensions.width}px` }}
                width={dimensions.width}
              />
            </motion.figure>
          </AnimatePresence>
        </div>
      </div>

      <section className="border-t border-paper/10 py-20 md:py-28">
        <div className="container-grid grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-end">
          <div>
            <p className="text-xs uppercase tracking-studio text-paper/38">End Page / 通用尾页</p>
            <h2 className="mt-5 max-w-4xl text-5xl font-medium leading-[0.98] text-paper md:text-7xl">
              感谢观看，更多完整案例可继续整理补充。
            </h2>
          </div>
          <div className="space-y-5 text-sm leading-6 text-paper/60">
            <p>
              这里作为单个作品详情页的通用收束区域，后续可以替换为项目总结、合作方式、下载作品集 PDF 或返回分类入口。
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="inline-flex items-center gap-2 border-b border-paper/20 pb-2 text-xs uppercase tracking-studio text-paper" type="button" onClick={() => step(1)}>
                下一件作品
                <ArrowRight size={15} strokeWidth={1.5} />
              </button>
              <Link className="inline-flex items-center gap-2 border-b border-paper/20 pb-2 text-xs uppercase tracking-studio text-paper" href="/#work">
                返回作品展示
                <ArrowUpRight size={15} strokeWidth={1.5} />
              </Link>
              <Link className="inline-flex items-center gap-2 border-b border-paper/20 pb-2 text-xs uppercase tracking-studio text-paper" href="/contact">
                联系合作
                <ArrowUpRight size={15} strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}

function VerticalWorkDetail({
  category,
  coverItem,
  items,
  reduceMotion
}: {
  category: WorkGalleryCategory;
  coverItem: WorkGalleryItem;
  items: WorkGalleryItem[];
  reduceMotion: boolean;
}) {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? "auto" : "smooth"
    });
  }, [coverItem.id, reduceMotion]);

  return (
    <section className="bg-ink pt-16 text-paper md:pt-20">
      <div className="mx-auto grid w-full max-w-[1920px] min-[520px]:grid-cols-[220px_minmax(0,1fr)] md:grid-cols-[300px_minmax(0,1fr)] lg:grid-cols-[340px_minmax(0,1fr)]">
        <aside className="border-b border-paper/10 bg-ink/94 px-4 py-5 backdrop-blur-xl min-[520px]:sticky min-[520px]:top-16 min-[520px]:h-[calc(100vh-4rem)] min-[520px]:border-b-0 min-[520px]:border-r min-[520px]:px-5 min-[520px]:py-6 md:top-20 md:h-[calc(100vh-5rem)] md:px-6 md:py-7 lg:px-8">
          <div className="flex h-full flex-col gap-6 md:justify-between">
            <div>
              <Link className="inline-flex items-center gap-2 text-xs uppercase tracking-studio text-paper/48 transition-colors hover:text-paper" href="/#work">
                <ArrowLeft size={15} strokeWidth={1.5} />
                返回作品
              </Link>

              <div className="mt-8">
                <p className="text-[10px] uppercase tracking-studio text-paper/40">
                  {category.order} / 01 / {String(items.length).padStart(2, "0")}
                </p>
                <h1 className="mt-3 break-words text-3xl font-medium leading-[0.96] text-paper md:text-4xl">
                  {coverItem.title}
                </h1>
              </div>

              <p className="mt-6 text-xs uppercase leading-5 tracking-studio text-paper/36">{category.english}</p>
              <p className="mt-3 text-sm leading-6 text-paper/54">
                这组作品以封面作为入口，详情页按顺序竖排展示，并按屏幕高度完整预览单张作品。
              </p>

              <dl className="mt-8 grid grid-cols-2 gap-x-5 gap-y-4 text-xs text-paper/58 md:grid-cols-1">
                <div>
                  <dt className="uppercase tracking-studio text-paper/30">类型</dt>
                  <dd className="mt-1 text-paper/72">{category.title}</dd>
                </div>
                <div>
                  <dt className="uppercase tracking-studio text-paper/30">日期</dt>
                  <dd className="mt-1 text-paper/72">{coverItem.dateLabel || "Archive"}</dd>
                </div>
                <div>
                  <dt className="uppercase tracking-studio text-paper/30">数量</dt>
                  <dd className="mt-1 font-mono text-paper/72">{items.length} images</dd>
                </div>
                <div>
                  <dt className="uppercase tracking-studio text-paper/30">模式</dt>
                  <dd className="mt-1 text-paper/72">系列竖排</dd>
                </div>
              </dl>

              <p className="mt-8 hidden break-all font-mono text-[11px] leading-5 text-paper/30 md:block">
                {coverItem.originalFile}
              </p>
            </div>

            <div className="grid gap-2">
              {items.map((item, index) => (
                <a
                  className="inline-flex items-center gap-3 text-[11px] uppercase tracking-studio text-paper/42 transition-colors hover:text-paper"
                  href={`#image-${index + 1}`}
                  key={item.id}
                >
                  <span className="h-1.5 w-8 bg-paper/30" />
                  {String(index + 1).padStart(2, "0")} / {item.title}
                </a>
              ))}
            </div>
          </div>
        </aside>

        <div className="min-w-0 px-4 py-6 md:px-8 md:py-8 lg:px-10">
          <div className="mx-auto flex max-w-[1180px] flex-col gap-8 md:gap-10">
            {items.map((item, index) => {
              const dimensions = getImageDimensions(item);

              return (
                <motion.figure
                  className="flex min-h-[calc(100vh-4rem)] scroll-mt-20 flex-col justify-center md:min-h-[calc(100vh-5rem)]"
                  id={`image-${index + 1}`}
                  initial={reduceMotion ? false : { opacity: 0, y: 32 }}
                  key={item.id}
                  transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                >
                  <p className="mb-3 flex items-center justify-between font-mono text-[11px] uppercase tracking-studio text-paper/34">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <span>{item.originalFile}</span>
                  </p>
                  <div className="flex min-h-0 items-center justify-center">
                    <Image
                      alt={item.title}
                      className="h-auto w-auto max-h-[calc(100vh-9.5rem)] max-w-full bg-[#efeee9] object-contain shadow-[0_30px_110px_rgba(0,0,0,0.38)] md:max-h-[calc(100vh-10.5rem)]"
                      height={dimensions.height}
                      priority={index === 0}
                      sizes="(min-width: 1280px) 880px, (min-width: 520px) calc(100vw - 300px), calc(100vw - 32px)"
                      src={item.src}
                      width={dimensions.width}
                    />
                  </div>
                </motion.figure>
              );
            })}
          </div>
        </div>
      </div>

      <section className="border-t border-paper/10 py-20 md:py-28">
        <div className="container-grid grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-end">
          <div>
            <p className="text-xs uppercase tracking-studio text-paper/38">End Page / 通用尾页</p>
            <h2 className="mt-5 max-w-4xl text-5xl font-medium leading-[0.98] text-paper md:text-7xl">
              感谢观看，更多完整案例可继续整理补充。
            </h2>
          </div>
          <div className="space-y-5 text-sm leading-6 text-paper/60">
            <p>
              这里作为系列作品详情页的通用收束区域，后续可以替换为项目总结、合作方式、下载作品集 PDF 或返回分类入口。
            </p>
            <div className="flex flex-wrap gap-4">
              <Link className="inline-flex items-center gap-2 border-b border-paper/20 pb-2 text-xs uppercase tracking-studio text-paper" href="/#work">
                返回作品展示
                <ArrowUpRight size={15} strokeWidth={1.5} />
              </Link>
              <Link className="inline-flex items-center gap-2 border-b border-paper/20 pb-2 text-xs uppercase tracking-studio text-paper" href="/contact">
                联系合作
                <ArrowUpRight size={15} strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
