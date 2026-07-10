import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-paper/10 py-10 md:py-14">
      <div className="container-grid grid gap-8 md:grid-cols-[1.4fr_0.8fr_0.8fr]">
        <div>
          <p className="max-w-xl text-2xl leading-tight text-paper md:text-4xl">
            一起构建有意义、可延展的视觉系统。
          </p>
        </div>

        <div className="space-y-3 text-sm text-paper/62">
          <p className="text-xs uppercase tracking-studio text-paper/36">联系 / Contact</p>
          <a className="link-underline inline-flex items-center gap-2 text-paper" href={`mailto:${site.email}`}>
            {site.email}
            <ArrowUpRight size={15} strokeWidth={1.5} />
          </a>
          <a className="link-underline block text-paper" href={`tel:${site.phone}`}>
            {site.phone}
          </a>
          <p>{site.location}</p>
        </div>

        <div className="space-y-3 text-sm text-paper/62">
          <p className="text-xs uppercase tracking-studio text-paper/36">导航 / Index</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {site.navItems.map((item) => (
              <Link className="link-underline hover:text-paper" href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
