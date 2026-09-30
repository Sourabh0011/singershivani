"use client";

import { motion } from "motion/react";

export const ease = [0.22, 1, 0.36, 1] as const;

/** Fades + slides its children in when scrolled into view. */
export function Reveal({
  children,
  delay = 0,
  y = 40,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  highlight,
  subtitle,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  const centered = align === "center";
  return (
    <Reveal className={centered ? "mx-auto max-w-2xl text-center" : "max-w-xl"}>
      <p
        className={`ornament text-xs font-medium uppercase tracking-[0.35em] ${
          centered ? "justify-center" : "before:hidden"
        }`}
      >
        {eyebrow}
      </p>
      <h2 className="mt-5 font-display text-4xl leading-tight text-cream sm:text-5xl lg:text-6xl">
        {title}{" "}
        {highlight && (
          <em className="text-gradient-gold animate-shimmer pr-1 font-normal">{highlight}</em>
        )}
      </h2>
      {subtitle && <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">{subtitle}</p>}
    </Reveal>
  );
}

/** Tracks the mouse so `.spotlight` cards glow where the cursor is. */
export function trackSpotlight(e: React.MouseEvent<HTMLElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
}

export function Equalizer({ bars = 5, className = "h-4" }: { bars?: number; className?: string }) {
  return (
    <span className={`eq inline-flex items-end gap-[3px] ${className}`} aria-hidden>
      {Array.from({ length: bars }).map((_, i) => (
        <span
          key={i}
          style={{ height: "100%", animationDelay: `${(i * 0.17) % 0.9}s`, animationDuration: `${0.9 + (i % 3) * 0.2}s` }}
        />
      ))}
    </span>
  );
}
