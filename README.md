# Senior Visual Designer Portfolio

高级、现代、国际化的个人作品集网站框架。定位为电商视觉设计师 / 品牌设计师，适合展示品牌视觉、KV 主视觉、电商活动页、详情页、IP 文创、地域文创、AI 辅助视觉与动效实验。

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- Lenis smooth scroll

## Run Locally

```bash
pnpm install
pnpm dev
```

Then open:

```text
http://localhost:3000
```

## Production Deployment

This portfolio is maintained as a long-term personal brand website.

- GitHub repository: `https://github.com/wanghe21111-coder/wanghe-visual-portfolio`
- Vercel project: `wanghe-visual-portfolio`
- Production URL: `https://wanghe-visual-portfolio.vercel.app`
- Production branch: `main`

Build settings:

```text
Install Command: pnpm install
Build Command: pnpm run build
Framework: Next.js
```

After Vercel is connected to the GitHub repository, every push to `main` will trigger a new production build automatically. Keep the same Vercel project to preserve the public URL.

## Maintenance Workflow

For future updates, keep working from this GitHub project instead of creating a new website:

```bash
git pull
pnpm install
pnpm dev
```

Make changes locally, verify with:

```bash
pnpm run build
```

Then publish updates:

```bash
git add .
git commit -m "Update portfolio content"
git push
```

Vercel will rebuild the current site after the push. The production URL should remain unchanged.

## Project Structure

```text
app/
  page.tsx                  Home + Hero + Selected Work
  work/[slug]/page.tsx      Reusable case study detail template
  resume/page.tsx           Web-style resume
  about/page.tsx            Designer introduction
  contact/page.tsx          Contact page
components/
  animation/                Reveal, page transition, Lenis, cursor follower
  layout/                   Header and footer
  sections/                 Hero, work cards, approach sections
  ui/                       Shared UI and placeholder visuals
data/
  projects.ts               Project and case-study data
  resume.ts                 Resume, skills, tools, research directions
  site.ts                   Navigation, identity, contact, hero copy
public/placeholders/        Put final images/videos here
```

## Replace Project Images

1. Put final images in `public/placeholders/{project-slug}/`.
2. Add fields such as `src`, `alt`, or `videoSrc` to the matching project in `data/projects.ts`.
3. Replace or extend `components/ui/VisualPlaceholder.tsx` so it renders `next/image` or `<video>` when a real file exists.

Recommended image formats:

- Cover images: `.webp` or `.jpg`
- Detail images: `.webp`
- Transparent graphics: `.png`

## Replace Homepage Work Gallery

首页“作品展示”模块现在读取项目根目录里的 `作品` 文件夹：

```text
作品/
  1 海报/
  2 页面/
  3 品牌/
  4 AIGC/
```

替换或新增图片后运行：

```bash
pnpm run sync:works
```

脚本会自动：

- 读取四个分类里的 `.jpg` / `.jpeg` / `.png` / `.webp` / `.gif`
- 按文件名中的年月从新到旧排序，例如 `B&O 2025.4.jpg`
- 复制图片到 `public/works`
- 生成 `data/work-gallery.generated.ts`

直接运行 `pnpm run build` 也会在构建前自动同步作品。

## Replace Videos

1. Put `.mp4` or `.webm` files in `public/placeholders/{project-slug}/`.
2. Add a `videoSrc` field to the relevant asset in `data/projects.ts`.
3. Render it from the case detail page or inside `VisualPlaceholder`.

Recommended video settings:

- Short loop: 6-15 seconds
- Muted autoplay
- Use `poster` image for mobile reliability

## Edit Resume Data

Open `data/resume.ts` and update:

- `profile`
- `experience`
- `education`
- `skills`
- `tools`
- `researchDirections`

The Resume page will update automatically.

## Edit Site Copy

Open `data/site.ts` to change:

- Name and role
- Hero title and lead text
- Rotating words
- Navigation
- Email and social links

## Motion Notes

Animations use Framer Motion and are intentionally restrained:

- Hero line reveal
- Work card stagger
- Hover scale and title movement
- Full-screen mobile menu transition
- Page fade / slide
- Cursor follower for desktop fine pointers

The project respects `prefers-reduced-motion`; when users reduce motion at OS level, animation behavior is minimized.
