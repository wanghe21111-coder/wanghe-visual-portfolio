"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/data/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-paper/10 bg-ink/68 backdrop-blur-xl">
      <div className="container-grid flex h-16 items-center justify-between gap-6 md:h-20">
        <Link
          href="/"
          className="group flex items-center gap-3 text-xs uppercase tracking-studio text-paper"
          aria-label={`${site.name} home`}
        >
          <span className="grid h-8 w-8 place-items-center border border-paper/18 bg-paper/[0.03] text-[10px] transition-colors duration-500 group-hover:border-brass/70">
            VS
          </span>
          <span className="hidden sm:block">{site.owner}</span>
        </Link>

        <nav className="hidden items-center gap-8 text-xs uppercase tracking-studio text-paper/68 md:flex">
          {site.navItems.map((item) => (
            <Link className="link-underline transition-colors hover:text-paper" href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          className="grid h-10 w-10 place-items-center border border-paper/14 bg-paper/[0.03] text-paper transition-colors hover:border-paper/40 md:hidden"
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={18} strokeWidth={1.6} /> : <Menu size={18} strokeWidth={1.6} />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 top-16 z-40 bg-ink/96 px-4 pb-8 pt-6 backdrop-blur-2xl md:hidden"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={reduceMotion ? undefined : { opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.nav
              className="flex h-full flex-col justify-between border-t border-paper/10 pt-8"
              initial={reduceMotion ? false : "hidden"}
              animate={reduceMotion ? undefined : "visible"}
              exit={reduceMotion ? undefined : "hidden"}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.08 } }
              }}
            >
              <div className="space-y-1">
                {site.navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    variants={{
                      hidden: { opacity: 0, y: 18 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={item.href}
                      className="flex items-center justify-between border-b border-paper/10 py-5 text-4xl uppercase text-paper"
                    >
                      <span>{item.label}</span>
                      <span className="font-mono text-xs text-paper/38">0{index + 1}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="space-y-4 text-sm text-paper/62"
                variants={{
                  hidden: { opacity: 0, y: 18 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <p>{site.role}</p>
                <a className="inline-flex items-center gap-2 text-paper" href={`mailto:${site.email}`}>
                  {site.email}
                  <ArrowUpRight size={16} strokeWidth={1.5} />
                </a>
              </motion.div>
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
