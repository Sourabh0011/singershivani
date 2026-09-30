"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FaArrowRight, FaChevronRight } from "react-icons/fa";
import { artist, navLinks } from "@/data/site";
import { linkProps, quickLinks } from "./socials";
import { ease } from "./ui";
import Wordmark from "./Wordmark";

/** Three lines that morph into an ✕. */
function MenuIcon({ open }: { open: boolean }) {
  const line = "absolute left-0 h-0.5 w-5 rounded-full bg-current";
  const t = { duration: 0.3, ease };
  return (
    <span className="relative block h-3.5 w-5" aria-hidden>
      <motion.span className={`${line} top-0`} animate={open ? { y: 6, rotate: 45 } : { y: 0, rotate: 0 }} transition={t} />
      <motion.span className={`${line} top-1.5`} animate={{ opacity: open ? 0 : 1, scaleX: open ? 0.3 : 1 }} transition={{ duration: 0.2 }} />
      <motion.span className={`${line} top-3`} animate={open ? { y: -6, rotate: -45 } : { y: 0, rotate: 0 }} transition={t} />
    </span>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const pendingTarget = useRef<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the link of the section currently on screen
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    navLinks.forEach(({ href }) => {
      const el = document.getElementById(href.slice(1));
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // While the menu is open: lock page scroll, close on Escape or when the screen grows to desktop size.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onResize = () => desktop.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);
    return () => {
      root.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
    };
  }, [open]);

  // Close the menu first, then scroll — so the two animations don't fight each other.
  const goTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    pendingTarget.current = href;
    setOpen(false);
  };
  const scrollToPending = () => {
    const href = pendingTarget.current;
    pendingTarget.current = null;
    if (!href) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.querySelector(href)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    history.replaceState(null, "", href);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease, delay: 0.2 }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5"
      >
        <nav
          className={`relative mx-auto flex max-w-7xl items-center justify-between rounded-full border px-4 py-2.5 transition-[background-color,border-color,box-shadow] duration-500 sm:px-6 ${
            scrolled || open
              ? "border-gold/15 bg-night/90 shadow-[0_10px_40px_-15px_rgb(0_0_0/0.8)] backdrop-blur-xl"
              : "border-transparent"
          }`}
        >
          <a href="#home" className="group flex items-center gap-3" aria-label={`${artist.name} — home`}>
            <span className="relative grid size-10 place-items-center rounded-full border border-gold/50 pt-1 font-script text-[1.7rem] leading-none text-gold-light transition-transform duration-500 group-hover:rotate-[360deg] max-[379px]:hidden">
              S
              <span className="absolute inset-0 rounded-full bg-gold/10 blur-md" />
            </span>
            <Wordmark />
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const isActive = active === link.href.slice(1);
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`relative isolate block rounded-full px-4 py-2 text-sm transition-colors ${
                      isActive ? "text-ink" : "text-cream/80 hover:text-gold-light"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-linear-to-r from-gold-light to-gold"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <a href="#contact" className="btn-primary hidden px-5 py-2.5 text-sm sm:inline-flex">
              Book Now
            </a>
            <button
              onClick={() => setOpen((o) => !o)}
              className={`grid size-11 place-items-center rounded-full border text-gold-light transition-colors duration-300 lg:hidden ${
                open ? "border-gold/60 bg-gold/10" : "border-gold/30"
              }`}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <MenuIcon open={open} />
            </button>
          </div>
        </nav>

        {/* Mobile menu — a compact card that drops down under the bar */}
        <AnimatePresence onExitComplete={scrollToPending}>
          {open && (
            <motion.div
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              initial={{ opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98, transition: { duration: 0.18, ease: "easeIn" } }}
              transition={{ duration: 0.32, ease }}
              style={{ transformOrigin: "top right" }}
              className="absolute inset-x-3 top-full mt-2 max-h-[calc(100svh-6rem)] overflow-y-auto overscroll-contain rounded-3xl border border-gold/15 bg-night p-2.5 shadow-[0_24px_60px_-12px_rgb(0_0_0/0.85)] sm:inset-x-5 lg:hidden"
            >
              <motion.ul
                initial="hidden"
                animate="show"
                variants={{ show: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } } }}
              >
                {navLinks.map((link) => {
                  const isActive = active === link.href.slice(1);
                  return (
                    <motion.li
                      key={link.href}
                      variants={{
                        hidden: { opacity: 0, x: 14 },
                        show: { opacity: 1, x: 0, transition: { duration: 0.3, ease } },
                      }}
                    >
                      <a
                        href={link.href}
                        onClick={(e) => goTo(e, link.href)}
                        aria-current={isActive ? "location" : undefined}
                        className={`flex items-center justify-between rounded-2xl px-4 py-3.5 text-base font-medium transition-colors duration-200 ${
                          isActive ? "bg-gold/12 text-gold-light" : "text-cream/85 active:bg-white/5"
                        }`}
                      >
                        {link.label}
                        {isActive ? (
                          <span className="size-1.5 rounded-full bg-gold" />
                        ) : (
                          <FaChevronRight className="text-[0.6rem] text-cream/30" />
                        )}
                      </a>
                    </motion.li>
                  );
                })}
              </motion.ul>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.22, ease }}
                className="mt-1.5 border-t border-gold/10 px-1.5 pb-1.5 pt-3"
              >
                <a href="#contact" onClick={(e) => goTo(e, "#contact")} className="btn-primary w-full py-3.5">
                  Book a Performance <FaArrowRight className="text-xs" />
                </a>
                <div className="mt-3 flex items-center justify-center gap-2.5">
                  {quickLinks.map((s) => (
                    <a
                      key={s.label}
                      {...linkProps(s)}
                      aria-label={s.label}
                      className="grid size-11 place-items-center rounded-full border border-gold/20 text-gold-light transition-colors active:bg-gold active:text-ink"
                    >
                      <s.icon />
                    </a>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Dimmed backdrop — tap anywhere outside to close */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[45] bg-ink/70 lg:hidden"
            aria-hidden
          />
        )}
      </AnimatePresence>
    </>
  );
}
