"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, Images } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { workGallery, type WorkGalleryCategory, type WorkGalleryItem } from "@/data/work-gallery.generated";
import { cn } from "@/lib/utils";

function isLongWork(item: WorkGalleryItem) {
  return Boolean(item.width && item.height && item.height / item.width >= 2.2);
}

function isHiddenShowcaseItem(item: WorkGalleryItem) {
  return item.originalFile === "FOFOS 2025.8-2.jpg" || getGscLightAndNightDetailOrder(item.originalFile) > 0 || getBrandSystemOrder(item.originalFile) > 1;
}

function getGscLightAndNightDetailOrder(fileName: string) {
  const order = new Map([
    ["GSC 2022.9-2.jpg", 1],
    ["GSC海报设计 2022.9-3.jpg", 2],
    ["GSC 2022.9-4.jpg.jpg", 3],
    ["GSC 2022.9-5.jpg", 4]
  ]);

  return order.get(fileName) ?? 0;
}

function getSeriesCount(item: WorkGalleryItem) {
  const seriesCount = new Map([
    ["GSC海报设计 2022.9-1.jpg", 5],
    ["FOFOS 2025.8-1.jpg", 2]
  ]);

  return seriesCount.get(item.originalFile) ?? 1;
}

function getBrandSystemOrder(fileName: string) {
  const match = fileName.match(/^(\d+)/);
  return match ? Number(match[1]) : 0;
}

function getShowcaseSeriesCount(item: WorkGalleryItem, category: WorkGalleryCategory) {
  if (category.id === "brand" && getBrandSystemOrder(item.originalFile) === 1) {
    return category.items.filter((entry) => getBrandSystemOrder(entry.originalFile) > 0).length;
  }

  return getSeriesCount(item);
}

export function WorkShowcase() {
  const reduceMotion = useReducedMotion();
  const [categoryId, setCategoryId] = useState(workGallery[0]?.id ?? "");
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<Array<HTMLElement | null>>([]);

  const category = useMemo(
    () => workGallery.find((item) => item.id === categoryId) ?? workGallery[0],
    [categoryId]
  );

  const items = (category?.items ?? []).filter((item) => !isHiddenShowcaseItem(item));
  const activeItem = items[activeIndex] ?? items[0];

  useEffect(() => {
    setActiveIndex(0);
  }, [categoryId]);

  useEffect(() => {
    const node = itemRefs.current[activeIndex];

    if (!node) {
      return;
    }

    node.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "nearest",
      inline: "center"
    });
  }, [activeIndex, categoryId, reduceMotion]);

  if (!category || !activeItem) {
    return null;
  }

  const goTo = (direction: -1 | 1) => {
    setActiveIndex((current) => {
      const next = current + direction;

      if (next < 0) {
        return items.length - 1;
      }

      if (next >= items.length) {
        return 0;
      }

      return next;
    });
  };

  return (
    <section className="relative scroll-mt-24 overflow-hidden bg-[#efeee9] py-20 text-ink md:scroll-mt-28 md:py-28" id="work">
      <div className="pointer-events-none absolute inset-0 opacity-55 [background-image:linear-gradient(90deg,rgba(8,8,7,0.1)_1px,transparent_1px)] [background-size:25vw_100%]" />

      <div className="container-grid relative z-10">
        <div className="grid gap-8 md:grid-cols-[0.52fr_1.48fr] md:items-end">
          <div>
            <p className="text-xs uppercase tracking-studio text-ink/45">Selected Work / 作品展示</p>
            <h2 className="mt-5 max-w-4xl text-4xl font-medium leading-[1.02] text-ink md:text-5xl lg:text-6xl">
              近期作品优先展示，按分类快速预览。
            </h2>
          </div>

          <div className="grid gap-6 md:justify-items-end">
            <p className="max-w-xl text-base leading-7 text-ink/62 md:text-lg">
              作品来自项目内 <span className="font-mono text-ink">作品/1-4</span> 四个目录，构建时会自动同步到展示区。替换图片后重新运行同步或构建即可更新。
            </p>
            <div className="flex items-center gap-2">
              <button
                aria-label="上一张作品"
                className="grid h-11 w-11 place-items-center border border-ink/16 bg-white/35 transition-colors hover:bg-white"
                type="button"
                onClick={() => goTo(-1)}
              >
                <ChevronLeft size={18} strokeWidth={1.6} />
              </button>
              <button
                aria-label="下一张作品"
                className="grid h-11 w-11 place-items-center border border-ink/16 bg-white/35 transition-colors hover:bg-white"
                type="button"
                onClick={() => goTo(1)}
              >
                <ChevronRight size={18} strokeWidth={1.6} />
              </button>
            </div>
          </div>
        </div>

        <CategoryTabs
          activeId={category.id}
          categories={workGallery}
          onChange={(nextId) => setCategoryId(nextId)}
        />
      </div>

      <div className="relative z-10 mt-12 md:mt-16">
        <div className="overflow-x-auto scroll-smooth px-[8vw] pb-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <motion.div
            className="flex items-start gap-5 md:gap-8"
            initial={reduceMotion ? false : { opacity: 0, y: 36 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {items.map((item, index) => {
              const isActive = index === activeIndex;
              const isLongImage = isLongWork(item);
              const seriesCount = getShowcaseSeriesCount(item, category);

              return (
                <motion.article
                  className="group relative shrink-0 basis-[82vw] text-left outline-none md:basis-[58vw] lg:basis-[48vw]"
                  key={item.id}
                  ref={(node) => {
                    itemRefs.current[index] = node;
                  }}
                  onMouseEnter={() => setActiveIndex(index)}
                  animate={reduceMotion ? undefined : { opacity: isActive ? 1 : 0.48, scale: isActive ? 1 : 0.92 }}
                  transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="mb-4 flex items-center justify-between text-[10px] uppercase tracking-studio text-ink/42">
                    <span>{category.english}</span>
                    <span>{item.dateLabel || "ARCHIVE"}</span>
                  </span>

                  <Link
                    aria-label={seriesCount > 1 ? `进入作品：${item.title}，包含 ${seriesCount} 张作品` : `进入作品：${item.title}`}
                    className={cn(
                      "relative block w-full overflow-hidden border border-ink/10 bg-[#d9d8d2] shadow-[0_28px_80px_rgba(8,8,7,0.16)]",
                      isLongImage ? "h-[64vh] min-h-[420px] max-h-[760px]" : "aspect-[1.45/1]"
                    )}
                    href={`/gallery/${item.id}`}
                  >
                    <Image
                      alt={item.title}
                      className={cn(
                        "transition-transform duration-700 ease-studio",
                        isLongImage
                          ? "object-contain p-3 group-hover:scale-[1.025] md:p-4"
                          : "object-contain p-2 group-hover:scale-[1.025] md:p-3"
                      )}
                      fill
                      sizes="(min-width: 1024px) 48vw, (min-width: 768px) 58vw, 82vw"
                      src={item.src}
                      priority={index < 2}
                    />
                    <span className="pointer-events-none absolute inset-0 border border-white/35" />
                    {seriesCount > 1 ? (
                      <span className="pointer-events-none absolute right-4 top-4 inline-flex items-center gap-2 border border-white/45 bg-ink/68 px-3 py-2 text-[10px] uppercase tracking-studio text-paper shadow-[0_14px_40px_rgba(0,0,0,0.24)] backdrop-blur-md">
                        <Images size={14} strokeWidth={1.55} />
                        {seriesCount} 张
                      </span>
                    ) : null}
                    {isLongImage ? (
                      <span className="pointer-events-none absolute bottom-4 left-4 border border-white/50 bg-ink/58 px-3 py-1.5 text-[10px] uppercase tracking-studio text-paper">
                        长图阅读
                      </span>
                    ) : null}
                    <motion.span
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-ink"
                      initial={false}
                      animate={{ scaleX: isActive ? 1 : 0 }}
                      style={{ transformOrigin: "left" }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </Link>

                  <div className="mt-6 grid gap-4 md:grid-cols-[1fr_auto] md:items-start">
                    <span>
                      <span className="block text-2xl font-medium leading-tight text-ink md:text-3xl">
                        {item.title}
                      </span>
                      <span className="mt-3 block max-w-md text-sm leading-6 text-ink/56">
                        {item.group ? `${item.group} / ` : ""}
                        {seriesCount > 1 ? `包含 ${seriesCount} 张系列作品，点击进入可完整浏览。` : category.summary}
                      </span>
                    </span>
                    <Link
                      className={cn(
                        "inline-flex items-center gap-3 border-b border-ink/18 pb-2 text-xs uppercase tracking-studio text-ink transition-colors hover:border-ink",
                        !isActive && "md:opacity-0 md:group-hover:opacity-100"
                      )}
                      href={`/gallery/${item.id}`}
                    >
                      进入作品
                      <ArrowUpRight size={15} strokeWidth={1.5} />
                    </Link>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </div>

      <div className="container-grid relative z-10 mt-4">
        <AnimatePresence mode="wait">
          <motion.div
            className="grid gap-5 border-t border-ink/12 pt-6 md:grid-cols-[0.5fr_1.5fr_auto] md:items-start"
            key={`${category.id}-${activeItem.id}`}
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-mono text-xs text-ink/38">
              {category.order} / {String(activeIndex + 1).padStart(2, "0")}
            </p>
            <div>
              <p className="text-xl font-medium text-ink md:text-2xl">{activeItem.title}</p>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-ink/56">
                {isLongWork(activeItem)
                  ? "当前作品为长图页面，详情页会按原始比例纵向阅读。"
                  : "当前分类按文件名中的年月排序，没有年月的作品按文件修改时间进入归档队列。"}
              </p>
            </div>
            <p className="text-xs uppercase tracking-studio text-ink/44">{activeItem.originalFile}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function CategoryTabs({
  activeId,
  categories,
  onChange
}: {
  activeId: string;
  categories: WorkGalleryCategory[];
  onChange: (id: string) => void;
}) {
  return (
    <div className="mt-10 grid gap-px overflow-hidden border border-ink/10 bg-ink/10 md:grid-cols-4">
      {categories.map((category) => {
        const isActive = category.id === activeId;

        return (
          <button
            className={cn(
              "group bg-[#efeee9] p-4 text-left transition-colors duration-500 md:p-5",
              isActive ? "bg-ink text-[#efeee9]" : "hover:bg-white"
            )}
            key={category.id}
            type="button"
            onClick={() => onChange(category.id)}
          >
            <span className={cn("mb-10 flex items-center justify-between text-[10px] uppercase tracking-studio", isActive ? "text-[#efeee9]/52" : "text-ink/38")}>
              <span>{category.order}</span>
              <span>{category.items.filter((item) => !isHiddenShowcaseItem(item)).length} 件</span>
            </span>
            <span className="block text-2xl font-medium leading-none">{category.title}</span>
            <span className={cn("mt-3 block text-[10px] uppercase tracking-studio", isActive ? "text-[#efeee9]/58" : "text-ink/42")}>
              {category.english}
            </span>
          </button>
        );
      })}
    </div>
  );
}
