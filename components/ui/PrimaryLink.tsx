import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type PrimaryLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

export function PrimaryLink({ href, children, className }: PrimaryLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-3 border border-paper/16 px-5 py-3 text-xs uppercase tracking-studio text-paper transition-colors duration-500 hover:border-brass/70 hover:bg-paper/[0.04]",
        className
      )}
    >
      <span>{children}</span>
      <ArrowUpRight className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" size={16} strokeWidth={1.5} />
    </Link>
  );
}
