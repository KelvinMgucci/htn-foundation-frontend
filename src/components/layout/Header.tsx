import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, ORG } from "@/constants/site";
import { CtaLink } from "@/components/common/Cta";
import { cn } from "@/lib/utils";

function Logo() {
  return (
    <Link
      to="/"
      className="flex shrink-0 items-center gap-3"
      aria-label={`${ORG.name} — home`}
    >
      <span
        aria-hidden="true"
        className="grid size-11 place-items-center rounded-2xl bg-teal font-display text-lg text-sand-light"
      >
        H
      </span>
      <span className="min-w-0 leading-tight">
        <span className="block font-display text-lg text-teal">
          HTN Foundation
        </span>
        <span className="block text-[0.68rem] uppercase tracking-[0.16em] text-teal-soft">
          Health to the Needs
        </span>
      </span>
    </Link>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        scrolled
          ? "glass-bar border-b border-border shadow-soft"
          : "bg-transparent",
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-full focus:bg-teal focus:px-4 focus:py-2 focus:text-sm focus:text-sand-light"
      >
        Skip to content
      </a>

      <div className="shell grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-3.5">
        <Logo />

        <div className="flex items-center gap-2">
          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    activeOptions={{ exact: link.to === "/" }}
                    className="group relative rounded-full px-4 py-2 text-[0.95rem] font-medium text-teal/80 transition-colors hover:text-teal data-[status=active]:text-teal data-[status=active]:font-semibold"
                  >
                    {link.label}
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-4 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-gold transition-transform duration-300 group-data-[status=active]:scale-x-100 group-hover:scale-x-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <CtaLink
            to="/donate"
            variant="donate"
            size="sm"
            className="hidden sm:inline-flex"
          >
            Donate Now
          </CtaLink>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-11 place-items-center rounded-full border border-teal/15 text-teal transition-colors hover:bg-mint-soft lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            key="drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-border bg-sand-light lg:hidden"
          >
            <nav aria-label="Mobile" className="shell py-5">
              <ul className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      activeOptions={{ exact: link.to === "/" }}
                      className="block rounded-xl px-4 py-3 font-display text-xl text-teal transition-colors hover:bg-mint-soft data-[status=active]:bg-mint-soft"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <CtaLink
                to="/donate"
                variant="donate"
                size="md"
                className="mt-4 w-full"
              >
                Donate Now
              </CtaLink>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
