"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { animate, motion, useInView, useScroll, useTransform } from "motion/react";
import { FaPhoneAlt } from "react-icons/fa";
import { artist, contact, genres, stats } from "@/data/site";
import { Reveal, SectionHeading, ease } from "./ui";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 2.2,
      ease: "easeOut",
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

export default function About() {
  const imgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: imgRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section id="about" className="relative overflow-x-clip py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        {/* Image */}
        <Reveal className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div ref={imgRef} className="relative">
            <div className="absolute -inset-4 translate-x-6 translate-y-6 rounded-[2.5rem] border border-gold/40" aria-hidden />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-plum">
              <motion.div style={{ y }} className="absolute -inset-y-[10%] inset-x-0">
                <Image
                  src={artist.aboutImage}
                  alt={`${artist.name} performing`}
                  fill
                  sizes="(min-width: 1024px) 560px, 90vw"
                  className="object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-linear-to-t from-ink/70 via-transparent" />
            </div>

            <motion.figure
              initial={{ opacity: 0, y: 30, rotate: -4 }}
              whileInView={{ opacity: 1, y: 0, rotate: -3 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.9, ease }}
              className="glass absolute -bottom-8 -right-2 max-w-[16rem] rounded-2xl p-5 sm:-right-8"
            >
              <p className="text-gradient-gold font-hindi-display text-3xl leading-normal" lang="hi">
                सुर में बसी भक्ति
              </p>
              <figcaption className="mt-2 text-xs uppercase tracking-[0.2em] text-muted">
                Devotion in every note
              </figcaption>
            </motion.figure>
          </div>
        </Reveal>

        {/* Text */}
        <div>
          <SectionHeading
            eyebrow="About Her"
            title="A voice devoted to"
            highlight="bhakti & joy"
            align="left"
          />
          {artist.bio.map((p, i) => (
            <Reveal key={i} delay={0.1 + i * 0.1}>
              <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">{p}</p>
            </Reveal>
          ))}

          <Reveal delay={0.3}>
            <ul className="mt-8 flex flex-wrap gap-2">
              {genres.map((g) => (
                <li
                  key={g}
                  className="rounded-full border border-gold/20 bg-gold/5 px-4 py-1.5 text-sm text-gold-light transition hover:border-gold hover:bg-gold/15"
                >
                  {g}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.35}>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a href={`tel:${contact.phone}`} className="btn-primary">
                <FaPhoneAlt className="text-sm" /> {contact.phoneDisplay}
              </a>
              <a href="#gallery" className="btn-ghost">
                See her performances
              </a>
            </div>
          </Reveal>

          {stats.length > 0 && (
            <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((s, i) => (
                <Reveal key={s.label} delay={0.1 * i}>
                  <div className="glass rounded-2xl p-5 text-center transition hover:-translate-y-1 hover:border-gold/40">
                    <p className="text-gradient-gold font-display text-4xl">
                      <Counter value={s.value} suffix={s.suffix} />
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-wider text-muted">{s.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
