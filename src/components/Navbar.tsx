"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FaBars, FaTimes } from "react-icons/fa";
import { artist, contact, navLinks } from "@/data/site";
import { linkProps, quickLinks } from "./socials";
import { ease } from "./ui";
import Wordmark, { HindiName } from "./Wordmark";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

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

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease, delay: 0.2 }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5"
      >
        <nav
          className={`mx-auto flex max-w-7xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 sm:px-6 ${
            scrolled
              ? "border border-gold/15 bg-night/85 shadow-[0_10px_40px_-15px_rgb(0_0_0/0.8)] backdrop-blur-xl"
              : "border border-transparent"
          }`}
        >
          <a href="#home" className="group flex items-center gap-3" aria-label={`${artist.name} — home`}>
            <span className="relative grid size-10 place-items-center rounded-full border border-gold/50 pt-1 font-script text-[1.7rem] leading-none text-gold-light transition-transform duration-500 group-hover:rotate-[360deg]">
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
              onClick={() => setOpen(true)}
              className="grid size-11 place-items-center rounded-full border border-gold/30 text-gold-light lg:hidden"
              aria-label="Open menu"
              aria-expanded={open}
            >
              <FaBars />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.7, ease }}
            className="fixed inset-0 z-[70] flex flex-col bg-night/95 px-6 pb-10 pt-6 backdrop-blur-xl lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="flex items-center justify-between">
              <Wordmark />
              <button
                onClick={() => setOpen(false)}
                className="grid size-11 place-items-center rounded-full border border-gold/30 text-gold-light"
                aria-label="Close menu"
              >
                <FaTimes />
              </button>
            </div>

            <ul className="mt-14 flex flex-1 flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + i * 0.07, duration: 0.6, ease }}
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-baseline gap-4 py-2 font-display text-4xl text-cream"
                  >
                    <span className="font-sans text-xs text-gold/70">0{i + 1}</span>
                    <span className="transition-colors group-hover:text-gold-light">{link.label}</span>
                  </a>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-5"
            >
              <p className="text-center">
                <HindiName className="text-4xl" />
              </p>
              <a href="#contact" onClick={() => setOpen(false)} className="btn-primary w-full">
                Book a Performance
              </a>
              <div className="flex justify-center gap-5 text-xl text-gold-light">
                {quickLinks.map((s) => (
                  <a key={s.label} {...linkProps(s)} aria-label={s.label} className="p-1">
                    <s.icon />
                  </a>
                ))}
              </div>
              <p className="text-center text-sm text-muted">{contact.phoneDisplay}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
