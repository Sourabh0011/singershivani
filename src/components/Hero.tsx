"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { FaArrowRight } from "react-icons/fa";
import { GiCandleFlame } from "react-icons/gi";
import { artist, performedIn } from "@/data/site";
import Embers from "./Embers";
import Mandala from "./Mandala";
import { linkProps, quickLinks } from "./socials";
import { Equalizer, ease } from "./ui";

const notes = [
  { char: "♪", className: "left-[2%] top-[18%] text-3xl", delay: 0 },
  { char: "♫", className: "right-[0%] top-[8%] text-4xl", delay: 1.2 },
  { char: "♩", className: "right-[-4%] bottom-[30%] text-2xl", delay: 2.1 },
  { char: "♬", className: "left-[-6%] bottom-[16%] text-3xl", delay: 0.7 },
];

function useIsDesktop() {
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return desktop;
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const isDesktop = useIsDesktop();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const portraitY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-svh items-center overflow-hidden pb-20 pt-28 lg:pt-32"
    >
      {/* Background glow + embers */}
      <div
        className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black_65%,transparent)]"
        aria-hidden
      >
        <div className="absolute right-[-10%] top-[10%] size-[36rem] rounded-full bg-maroon/40 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] size-[28rem] rounded-full bg-gold/10 blur-[120px]" />
      </div>
      <Embers />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
        {/* ── Text ── */}
        {/* Scroll parallax only on large screens — on phones the text sits below the photo */}
        <motion.div
          style={isDesktop ? { y: textY, opacity: fade } : undefined}
          className="order-2 text-center lg:order-1 lg:text-left"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease }}
            className="glass inline-flex items-center gap-3 rounded-full px-4 py-2 text-[0.7rem] font-medium uppercase tracking-[0.3em] text-gold-light"
          >
            <Equalizer className="h-3.5" />
            {artist.tagline}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, filter: "blur(8px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="mt-7 font-hindi text-2xl text-gold sm:text-3xl"
            lang="hi"
          >
            {artist.nameHindi}
          </motion.p>

          <h1 className="mt-1 font-display leading-[0.95]">
            <span className="sr-only">{artist.name}</span>
            <span aria-hidden className="block overflow-hidden pb-2 text-[3.6rem] text-cream sm:text-8xl xl:text-[8.5rem]">
              {artist.firstName.split("").map((ch, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  initial={{ y: "110%", rotate: 10 }}
                  animate={{ y: "0%", rotate: 0 }}
                  transition={{ duration: 1, delay: 0.6 + i * 0.06, ease }}
                >
                  {ch}
                </motion.span>
              ))}
            </span>
            <span aria-hidden className="block overflow-hidden pb-4 text-[3.6rem] sm:text-8xl xl:text-[8.5rem]">
              <motion.span
                className="inline-block"
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.1, delay: 1, ease }}
              >
                <span className="text-gradient-gold animate-shimmer pr-3 italic">{artist.lastName}</span>
              </motion.span>
            </span>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.3, ease }}
          >
            <p className="flex items-center justify-center gap-3 text-sm font-medium uppercase tracking-[0.25em] text-rose lg:justify-start">
              <span className="hidden h-px w-8 bg-rose/60 lg:block" />
              {artist.role}
            </p>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg lg:mx-0">
              {artist.intro}
            </p>

            <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <a href="#contact" className="btn-primary w-full sm:w-auto">
                Book a Performance <FaArrowRight className="text-xs" />
              </a>
              <a href="#events" className="btn-ghost w-full sm:w-auto">
                Upcoming Events
              </a>
            </div>

            <div className="mt-10 flex items-center justify-center gap-6 lg:justify-start">
              <div className="flex -space-x-1">
                {quickLinks.map((s) => (
                  <a
                    key={s.label}
                    {...linkProps(s)}
                    aria-label={s.label}
                    className="grid size-11 place-items-center rounded-full border border-gold/25 bg-night text-gold-light transition hover:-translate-y-1 hover:border-gold hover:bg-gold hover:text-ink"
                  >
                    <s.icon />
                  </a>
                ))}
              </div>
              <span className="h-8 w-px bg-gold/20" />
              <a href="#events" className="text-left text-sm leading-tight text-muted transition hover:text-gold-light">
                <span className="block font-display text-2xl text-cream">{performedIn.length}+ cities</span>
                performed across MP
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* ── Portrait ── */}
        <motion.div
          style={{ y: portraitY }}
          className="relative order-1 mx-auto w-[72%] max-w-[26rem] sm:w-[55%] lg:order-2 lg:w-full"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.6, rotate: -40 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.8, ease }}
            className="absolute -inset-[24%]"
            aria-hidden
          >
            <Mandala className="size-full animate-spin-slow text-gold/25" />
          </motion.div>
          <div className="absolute inset-[8%] rounded-full bg-gold/25 blur-[70px]" aria-hidden />

          <motion.div
            initial={{ clipPath: "inset(100% -30% -30% -30%)", y: 40 }}
            animate={{ clipPath: "inset(-30% -30% -30% -30%)", y: 0 }}
            transition={{ duration: 1.4, delay: 0.3, ease }}
            className="arch relative aspect-[3/4] bg-linear-to-b from-gold-light via-gold to-maroon p-[3px] shadow-[0_30px_80px_-20px_rgb(233_180_76/0.45)]"
          >
            <div className="arch relative size-full overflow-hidden bg-plum">
              <motion.div style={{ y: imageY }} className="absolute -inset-y-[8%] inset-x-0">
                <Image
                  src={artist.heroImage}
                  alt={`${artist.name}, ${artist.role}`}
                  fill
                  preload
                  sizes="(min-width: 1024px) 420px, 72vw"
                  className="object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-linear-to-t from-ink/80 via-transparent to-transparent" />
              <div className="arch absolute inset-3 border border-gold-light/30" />
            </div>
          </motion.div>

          {/* Floating badges */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.6, duration: 0.8, ease }}
            className="absolute -left-12 top-[40%] hidden sm:block"
          >
            <div className="animate-float flex items-center gap-3 rounded-2xl border border-gold/20 bg-night/80 px-4 py-3 shadow-xl backdrop-blur-md">
              <span className="grid size-9 place-items-center rounded-full bg-gold/15 text-lg text-gold-light">
                <GiCandleFlame />
              </span>
              <span className="text-left text-xs leading-tight text-muted">
                <span className="block text-sm font-semibold text-cream">Bhakti &amp; Bhajans</span>
                Soulful devotion
              </span>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.9, duration: 0.8, ease }}
            className="absolute -right-10 bottom-[10%] hidden sm:block"
          >
            <div
              className="animate-float flex items-center gap-3 rounded-2xl border border-gold/20 bg-night/80 px-4 py-3 shadow-xl backdrop-blur-md"
              style={{ animationDelay: "-3s" }}
            >
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-rose opacity-75" />
                <span className="relative inline-flex size-2.5 rounded-full bg-rose" />
              </span>
              <span className="text-left text-xs leading-tight text-muted">
                <span className="block text-sm font-semibold text-cream">Now Booking</span>
                Live events &amp; shows
              </span>
            </div>
          </motion.div>

          {notes.map((n) => (
            <motion.span
              key={n.char}
              aria-hidden
              className={`absolute font-display text-gold/60 ${n.className}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0], y: [0, -30, -60, -90], rotate: [0, 10, -8, 0] }}
              transition={{ duration: 6, delay: 2 + n.delay, repeat: Infinity, repeatDelay: 1.5, ease: "easeInOut" }}
            >
              {n.char}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[0.65rem] uppercase tracking-[0.35em] text-muted sm:flex"
        aria-label="Scroll to about section"
      >
        <span className="flex h-10 w-6 justify-center rounded-full border border-gold/40 pt-2">
          <motion.span
            className="h-2 w-1 rounded-full bg-gold"
            animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
        </span>
        Scroll
      </motion.a>
    </section>
  );
}
