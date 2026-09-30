"use client";

import { motion } from "motion/react";
import type { IconType } from "react-icons";
import { FaMicrophoneAlt } from "react-icons/fa";
import { GiCandleFlame, GiLinkedRings, GiLotus, GiPrayer, GiTheaterCurtains } from "react-icons/gi";
import { performances, type PerformanceIcon } from "@/data/site";
import { SectionHeading, ease, trackSpotlight } from "./ui";

const icons: Record<PerformanceIcon, IconType> = {
  lotus: GiLotus,
  diya: GiCandleFlame,
  rings: GiLinkedRings,
  mic: FaMicrophoneAlt,
  stage: GiTheaterCurtains,
  home: GiPrayer,
};

export default function Performances() {
  return (
    <section id="performances" className="relative overflow-x-clip py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent via-plum/50 to-transparent" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Performances"
          title="Music for every"
          highlight="occasion"
          subtitle="From the stillness of a temple aarti to the energy of a wedding dance floor — every performance is crafted for its moment."
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {performances.map((p, i) => {
            const Icon = icons[p.icon];
            return (
              <motion.article
                key={p.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, delay: (i % 3) * 0.12, ease }}
                onMouseMove={trackSpotlight}
                className="spotlight glass group overflow-hidden rounded-3xl p-8 transition-[border-color,translate] duration-500 hover:-translate-y-2 hover:border-gold/40"
              >
                <span className="absolute right-6 top-4 font-display text-6xl italic text-gold/10 transition-colors duration-500 group-hover:text-gold/25">
                  0{i + 1}
                </span>
                <span className="relative grid size-16 place-items-center rounded-2xl border border-gold/30 bg-linear-to-br from-gold/20 to-maroon/30 text-3xl text-gold-light transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                  <Icon />
                </span>
                <h3 className="mt-7 font-display text-2xl text-cream">{p.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{p.description}</p>
                <span className="mt-6 block h-px w-12 bg-linear-to-r from-gold to-transparent transition-all duration-500 group-hover:w-full" />
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
