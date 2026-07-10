import { copyFile, mkdir, readFile, readdir, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const sourceRoot = path.join(root, "作品");
const publicRoot = path.join(root, "public", "works");
const outputFile = path.join(root, "data", "work-gallery.generated.ts");

const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);

const excludedFiles = new Set(["B&O 2025.4 PC.jpg", "GSC2024.10.jpg.jpg", "马可 标准图形.jpg"]);

const pinnedOrder = new Map([
  ["狮王 2025.6.jpg", 1],
  ["马可 01 色彩系统.jpg", 1],
  ["马可 02 文字系统.jpg", 2],
  ["马可 03 辅助图形.jpg", 3]
]);

const trailingOrder = new Map([
  ["FOFOS 2025.8-1.jpg", 1],
  ["FOFOS 2025.8-2.jpg", 2]
]);

const pageGroupOrder = new Map([
  ["首页", 1],
  ["二级页", 2],
  ["详情页", 3],
  ["详情", 3]
]);

const dateOverrides = new Map([["726-968-99聚划算.jpg", { year: 2024, month: 9 }]]);

const campaignMonthHints = [
  { pattern: /双12|雙12/, month: 12 },
  { pattern: /双旦|雙旦/, month: 12 },
  { pattern: /双11|雙11/, month: 11 },
  { pattern: /国庆|國慶/, month: 10 },
  { pattern: /99聚划算|9\.9|9-9/, month: 9 },
  { pattern: /秒杀|秒殺/, month: 6 },
  { pattern: /新势力周|新勢力周/, month: 3 },
  { pattern: /年货|年貨/, month: 1 }
];

function getBrandSequence(fileName) {
  const match = fileName.match(/^(\d+)/);
  return match ? Number(match[1]) : Number.POSITIVE_INFINITY;
}

const categories = [
  {
    id: "poster",
    order: "01",
    source: "1 海报",
    title: "海报与主视觉",
    english: "POSTER / KEY VISUAL",
    summary: "电商活动、品牌传播与阶段性 Campaign 视觉。"
  },
  {
    id: "page",
    order: "02",
    source: "2 页面",
    title: "页面与详情",
    english: "PAGE / DETAIL",
    summary: "活动页、品牌页、详情页与平台内容页面。"
  },
  {
    id: "brand",
    order: "03",
    source: "3 品牌",
    title: "品牌系统",
    english: "BRAND SYSTEM",
    summary: "Logo、应用场景、品牌识别与视觉规范探索。"
  },
  {
    id: "aigc",
    order: "04",
    source: "4 AIGC",
    title: "AIGC",
    english: "AI GENERATED CONTENT",
    summary: "AI 辅助 KV、活动视觉、商业画面与视觉研究。"
  }
];

function parseWorkDate(name, mtimeMs) {
  const override = dateOverrides.get(name);

  if (override) {
    return {
      year: override.year,
      month: override.month,
      label: override.month ? `${override.year}.${String(override.month).padStart(2, "0")}` : String(override.year),
      score: override.year * 100 + (override.month ?? 0)
    };
  }

  const match = name.match(/((?:19|20)\d{2})(?:\s*[.\-_年]\s*(\d{1,2}))?/);
  const year = match ? Number(match[1]) : null;
  const explicitMonth = match?.[2] ? Number(match[2]) : null;
  const inferredMonth = campaignMonthHints.find((hint) => hint.pattern.test(name))?.month ?? null;
  const month = explicitMonth && explicitMonth <= 12 ? explicitMonth : inferredMonth;

  if (!year) {
    return {
      year: null,
      month: null,
      label: "",
      score: Math.floor(mtimeMs / 1000)
    };
  }

  return {
    year,
    month,
    label: month ? `${year}.${String(month).padStart(2, "0")}` : String(year),
    score: year * 100 + (month ?? 0)
  };
}

function normalizeTitle(fileName) {
  return fileName.replace(/(\.(jpe?g|png|webp|gif))+$/i, "").replace(/\s+/g, " ").trim();
}

function normalizeGroupName(groupName) {
  return groupName.split(path.sep).map((part) => part.replace(/\s+/g, " ").trim()).filter(Boolean).join(" / ");
}

function resolveWorkMeta(categoryId, fileName, relativeGroup) {
  const baseTitle = normalizeTitle(fileName);
  const folderGroup = relativeGroup === "" ? "" : normalizeGroupName(relativeGroup);

  if (categoryId === "brand" && folderGroup) {
    const sequence = getBrandSequence(fileName);

    return {
      title: sequence === 1 ? folderGroup : baseTitle,
      group: folderGroup
    };
  }

  if (categoryId !== "page") {
    return {
      title: baseTitle,
      group: folderGroup
    };
  }

  const pagePrefix = baseTitle.match(/^(首页|二级页|详情页|详情)[\s_-]+(.+)$/);

  if (!pagePrefix) {
    return {
      title: baseTitle,
      group: folderGroup
    };
  }

  return {
    title: pagePrefix[2].trim(),
    group: pagePrefix[1] === "详情" ? "详情页" : pagePrefix[1]
  };
}

function safeFileName(categoryId, index, ext) {
  return `${String(index + 1).padStart(2, "0")}-${categoryId}${ext.toLowerCase()}`;
}

function parsePngSize(buffer) {
  const isPng =
    buffer.length >= 24 &&
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47;

  if (!isPng) {
    return null;
  }

  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20)
  };
}

function parseGifSize(buffer) {
  const signature = buffer.subarray(0, 6).toString("ascii");

  if (signature !== "GIF87a" && signature !== "GIF89a") {
    return null;
  }

  return {
    width: buffer.readUInt16LE(6),
    height: buffer.readUInt16LE(8)
  };
}

function parseJpegSize(buffer) {
  if (buffer.length < 4 || buffer[0] !== 0xff || buffer[1] !== 0xd8) {
    return null;
  }

  let offset = 2;

  while (offset < buffer.length) {
    if (buffer[offset] !== 0xff) {
      offset += 1;
      continue;
    }

    let marker = buffer[offset + 1];
    offset += 2;

    while (marker === 0xff) {
      marker = buffer[offset];
      offset += 1;
    }

    if (marker === 0xd9 || marker === 0xda) {
      break;
    }

    if (offset + 2 > buffer.length) {
      break;
    }

    const segmentLength = buffer.readUInt16BE(offset);

    if (segmentLength < 2 || offset + segmentLength > buffer.length) {
      break;
    }

    const isStartOfFrame =
      (marker >= 0xc0 && marker <= 0xc3) ||
      (marker >= 0xc5 && marker <= 0xc7) ||
      (marker >= 0xc9 && marker <= 0xcb) ||
      (marker >= 0xcd && marker <= 0xcf);

    if (isStartOfFrame) {
      return {
        width: buffer.readUInt16BE(offset + 5),
        height: buffer.readUInt16BE(offset + 3)
      };
    }

    offset += segmentLength;
  }

  return null;
}

function parseWebpSize(buffer) {
  if (buffer.length < 30 || buffer.subarray(0, 4).toString("ascii") !== "RIFF" || buffer.subarray(8, 12).toString("ascii") !== "WEBP") {
    return null;
  }

  const chunk = buffer.subarray(12, 16).toString("ascii");

  if (chunk === "VP8X" && buffer.length >= 30) {
    return {
      width: 1 + buffer.readUIntLE(24, 3),
      height: 1 + buffer.readUIntLE(27, 3)
    };
  }

  if (chunk === "VP8 " && buffer.length >= 30) {
    return {
      width: buffer.readUInt16LE(26) & 0x3fff,
      height: buffer.readUInt16LE(28) & 0x3fff
    };
  }

  if (chunk === "VP8L" && buffer.length >= 25) {
    const bits = buffer.readUInt32LE(21);

    return {
      width: (bits & 0x3fff) + 1,
      height: ((bits >> 14) & 0x3fff) + 1
    };
  }

  return null;
}

async function getImageSize(filePath) {
  const buffer = await readFile(filePath);
  const size = parsePngSize(buffer) ?? parseGifSize(buffer) ?? parseJpegSize(buffer) ?? parseWebpSize(buffer);

  return size ?? { width: null, height: null };
}

async function collectFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.name.startsWith(".")) {
      continue;
    }

    if (excludedFiles.has(entry.name)) {
      continue;
    }

    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await collectFiles(fullPath)));
      continue;
    }

    const ext = path.extname(entry.name).toLowerCase();

    if (imageExtensions.has(ext)) {
      files.push(fullPath);
    }
  }

  return files;
}

async function buildCategory(category) {
  const categorySource = path.join(sourceRoot, category.source);
  const categoryPublic = path.join(publicRoot, category.id);
  const files = await collectFiles(categorySource);

  const items = await Promise.all(
    files.map(async (filePath) => {
      const info = await stat(filePath);
      const dimensions = await getImageSize(filePath);
      const fileName = path.basename(filePath);
      const date = parseWorkDate(fileName, info.mtimeMs);
      const relativeGroup = path.relative(categorySource, path.dirname(filePath));
      const meta = resolveWorkMeta(category.id, fileName, relativeGroup);

      return {
        filePath,
        fileName,
        title: meta.title,
        group: meta.group,
        date,
        dimensions,
        mtimeMs: info.mtimeMs
      };
    })
  );

  items.sort((a, b) => {
    const pinnedA = pinnedOrder.get(a.fileName) ?? Number.POSITIVE_INFINITY;
    const pinnedB = pinnedOrder.get(b.fileName) ?? Number.POSITIVE_INFINITY;

    if (pinnedA !== pinnedB) {
      return pinnedA - pinnedB;
    }

    const trailingA = trailingOrder.get(a.fileName);
    const trailingB = trailingOrder.get(b.fileName);
    const isTrailingA = trailingA !== undefined;
    const isTrailingB = trailingB !== undefined;

    if (isTrailingA !== isTrailingB) {
      return isTrailingA ? 1 : -1;
    }

    if (trailingA !== undefined && trailingB !== undefined) {
      return trailingA - trailingB;
    }

    if (category.id === "page") {
      const groupA = pageGroupOrder.get(a.group) ?? Number.POSITIVE_INFINITY;
      const groupB = pageGroupOrder.get(b.group) ?? Number.POSITIVE_INFINITY;

      if (groupA !== groupB) {
        return groupA - groupB;
      }
    }

    if (category.id === "brand") {
      const sequenceA = getBrandSequence(a.fileName);
      const sequenceB = getBrandSequence(b.fileName);

      if (sequenceA !== sequenceB) {
        return sequenceA - sequenceB;
      }
    }

    if (b.date.score !== a.date.score) {
      return b.date.score - a.date.score;
    }

    return b.mtimeMs - a.mtimeMs;
  });

  await mkdir(categoryPublic, { recursive: true });

  const galleryItems = [];

  for (const [index, item] of items.entries()) {
    const ext = path.extname(item.fileName);
    const outputName = safeFileName(category.id, index, ext);
    const outputPath = path.join(categoryPublic, outputName);
    await copyFile(item.filePath, outputPath);

    galleryItems.push({
      id: `${category.id}-${index + 1}`,
      categoryId: category.id,
      title: item.title,
      group: item.group,
      dateLabel: item.date.label,
      year: item.date.year,
      month: item.date.month,
      src: `/works/${category.id}/${outputName}`,
      width: item.dimensions.width,
      height: item.dimensions.height,
      originalFile: item.fileName
    });
  }

  return {
    id: category.id,
    order: category.order,
    title: category.title,
    english: category.english,
    summary: category.summary,
    sourceDir: `作品/${category.source}`,
    items: galleryItems
  };
}

async function main() {
  await rm(publicRoot, { recursive: true, force: true });
  await mkdir(publicRoot, { recursive: true });

  const gallery = [];

  for (const category of categories) {
    gallery.push(await buildCategory(category));
  }

const content = `export type WorkGalleryItem = {
  id: string;
  categoryId: string;
  title: string;
  group: string;
  dateLabel: string;
  year: number | null;
  month: number | null;
  src: string;
  width: number | null;
  height: number | null;
  originalFile: string;
};

export type WorkGalleryCategory = {
  id: string;
  order: string;
  title: string;
  english: string;
  summary: string;
  sourceDir: string;
  items: WorkGalleryItem[];
};

export const workGallery = ${JSON.stringify(gallery, null, 2)} satisfies WorkGalleryCategory[];
`;

  await writeFile(outputFile, content);
  const itemCount = gallery.reduce((total, category) => total + category.items.length, 0);
  console.log(`Synced ${itemCount} work images across ${gallery.length} categories.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
