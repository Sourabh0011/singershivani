import { artist } from "@/data/site";

const sizes = {
  md: { first: "text-[0.95rem] tracking-[0.2em]", last: "text-[1.9rem]" },
  lg: { first: "text-2xl tracking-[0.16em]", last: "text-5xl" },
};

/** Small "SHIVANI Sharma" signature used in the navbar and footer. */
export default function Wordmark({ size = "md" }: { size?: keyof typeof sizes }) {
  const s = sizes[size];
  return (
    <span className="inline-flex items-baseline gap-1.5">
      <span className={`font-name font-semibold uppercase text-cream ${s.first}`}>{artist.firstName}</span>
      {/* padding gives the script's swashes room inside the gradient clip */}
      <span className={`text-gradient-gold -mx-1 px-1 py-1 font-script leading-none ${s.last}`}>{artist.lastName}</span>
    </span>
  );
}

/** Hindi name in calligraphic gold. */
export function HindiName({ className = "" }: { className?: string }) {
  return (
    <span className={`text-gradient-gold font-hindi-display leading-[1.5] ${className}`} lang="hi">
      {artist.nameHindi}
    </span>
  );
}
