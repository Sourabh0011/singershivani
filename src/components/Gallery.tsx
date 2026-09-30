"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { FaChevronLeft, FaChevronRight, FaExpand, FaTimes } from "react-icons/fa";
import { gallery, type GalleryItem } from "@/data/site";
import { linkProps, profiles } from "./socials";
import { Reveal, SectionHeading, ease } from "./ui";

const sizeClass: Record<NonNullable<GalleryItem["size"]>, string> = {
  tall: "row-span-2",
  wide: "col-span-2",
  big: "col-span-2 row-span-2",
};

function Lightbox({
  items,
  index,
  direction,
  onClose,
  onStep,
}: {
  items: GalleryItem[];
  index: number;
  direction: number;
  onClose: () => void;
  onStep: (dir: number) => void;
}) {
  const item = items[index];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onStep(1);
      if (e.key === "ArrowLeft") onStep(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onStep]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[80] flex flex-col bg-ink/95 backdrop-blur-xl"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
    >
      <div className="flex items-center justify-between px-5 py-4 text-sm text-muted" onClick={(e) => e.stopPropagation()}>
        <span className="tabular-nums">
          <span className="text-gold-light">{String(index + 1).padStart(2, "0")}</span> / {String(items.length).padStart(2, "0")}
        </span>
        <button
          onClick={onClose}
          className="grid size-11 place-items-center rounded-full border border-gold/30 text-gold-light transition hover:bg-gold hover:text-ink"
          aria-label="Close"
        >
          <FaTimes />
        </button>
      </div>

      <div className="relative flex flex-1 items-center justify-center overflow-hidden px-4 sm:px-20">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={item.src}
            custom={direction}
            variants={{
              enter: (d: number) => ({ opacity: 0, x: d * 120, scale: 0.95 }),
              center: { opacity: 1, x: 0, scale: 1 },
              exit: (d: number) => ({ opacity: 0, x: d * -120, scale: 0.95 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.6}
            onDragEnd={(_, info) => {
              if (info.offset.x < -80) onStep(1);
              else if (info.offset.x > 80) onStep(-1);
            }}
            onClick={(e) => e.stopPropagation()}
            className="relative h-[72vh] w-full max-w-5xl cursor-grab active:cursor-grabbing"
          >
            <Image src={item.src} alt={item.alt} fill sizes="90vw" className="pointer-events-none object-contain" draggable={false} />
          </motion.div>
        </AnimatePresence>

        {[
          { dir: -1, icon: FaChevronLeft, label: "Previous photo", pos: "left-3 sm:left-6" },
          { dir: 1, icon: FaChevronRight, label: "Next photo", pos: "right-3 sm:right-6" },
        ].map(({ dir, icon: Icon, label, pos }) => (
          <button
            key={dir}
            onClick={(e) => {
              e.stopPropagation();
              onStep(dir);
            }}
            className={`glass absolute top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full text-gold-light transition hover:bg-gold hover:text-ink ${pos}`}
            aria-label={label}
          >
            <Icon />
          </button>
        ))}
      </div>

      <div className="px-5 pb-6 pt-4 text-center" onClick={(e) => e.stopPropagation()}>
        <p className="font-display text-xl text-cream">{item.alt}</p>
        <p className="mt-1 text-xs uppercase tracking-[0.25em] text-gold/80">{item.category}</p>
      </div>
    </motion.div>
  );
}

export default function Gallery() {
  const categories = ["All", ...Array.from(new Set(gallery.map((g) => g.category)))];
  const [filter, setFilter] = useState("All");
  const [[index, direction], setView] = useState<[number | null, number]>([null, 0]);

  const items = filter === "All" ? gallery : gallery.filter((g) => g.category === filter);

  const close = useCallback(() => setView([null, 0]), []);
  const step = useCallback(
    (dir: number) => setView(([i]) => [i === null ? null : (i + dir + items.length) % items.length, dir]),
    [items.length],
  );

  return (
    <section id="gallery" className="relative overflow-x-clip py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent via-plum/40 to-transparent" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Gallery"
          title="Moments from the"
          highlight="stage"
          subtitle="A glimpse of the bhajan sandhyas, chowkis, stage shows and honours that have already been — each one a memory set to music."
        />

        <Reveal delay={0.1}>
          <div className="no-scrollbar -mx-5 mt-12 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:justify-center sm:px-0">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`relative isolate shrink-0 rounded-full border px-5 py-2 text-sm transition-colors ${
                  filter === c ? "border-transparent text-ink" : "border-gold/20 text-cream/80 hover:border-gold/50 hover:text-gold-light"
                }`}
              >
                {filter === c && (
                  <motion.span
                    layoutId="gallery-filter"
                    className="absolute inset-0 -z-10 rounded-full bg-linear-to-r from-gold-light to-gold"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                {c}
              </button>
            ))}
          </div>
        </Reveal>

        <motion.div
          layout
          className="mt-10 grid grid-flow-dense auto-rows-[150px] grid-cols-2 gap-3 sm:auto-rows-[200px] sm:gap-4 md:grid-cols-3 lg:auto-rows-[220px] lg:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {items.map((item, i) => (
              <motion.button
                layout
                key={item.src}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.6, ease }}
                onClick={() => setView([i, 0])}
                className={`group relative overflow-hidden rounded-2xl bg-plum text-left ${item.size ? sizeClass[item.size] : ""}`}
                aria-label={`Open photo: ${item.alt}`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                  style={{ objectPosition: item.focus ?? "center 30%" }}
                  className="object-cover transition duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-ink/90 via-ink/10 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gold/0 transition duration-500 group-hover:ring-gold/50" />
                <span className="absolute right-3 top-3 grid size-9 scale-50 place-items-center rounded-full bg-gold text-sm text-ink opacity-0 transition duration-500 group-hover:scale-100 group-hover:opacity-100">
                  <FaExpand />
                </span>
                <div className="absolute inset-x-0 bottom-0 translate-y-4 p-4 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="font-display text-lg leading-tight text-cream">{item.alt}</p>
                  <p className="mt-0.5 text-[0.65rem] uppercase tracking-[0.2em] text-gold-light">{item.category}</p>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>

        {profiles.length > 0 && (
          <Reveal delay={0.1}>
            <div className="mt-14 flex flex-col items-center gap-4 text-center">
              <p className="text-muted">Watch her live performances and daily updates</p>
              <div className="flex flex-col gap-3 sm:flex-row">
                {profiles.map((p) => (
                  <a
                    key={p.label}
                    {...linkProps(p)}
                    className={p.label === "YouTube" ? "btn-primary" : "btn-ghost"}
                  >
                    <p.icon className="text-lg" />
                    {p.label === "YouTube" ? "Watch on YouTube" : `Follow on ${p.label}`}
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        )}
      </div>

      <AnimatePresence>
        {index !== null && items[index] && (
          <Lightbox items={items} index={index} direction={direction} onClose={close} onStep={step} />
        )}
      </AnimatePresence>
    </section>
  );
}
