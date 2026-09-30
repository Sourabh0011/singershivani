import { genres } from "@/data/site";

function Row({ reverse = false }: { reverse?: boolean }) {
  // The list is rendered twice so the loop is seamless.
  const items = [...genres, ...genres];
  return (
    <div
      className={`flex w-max animate-marquee items-center will-change-transform group-hover:[animation-play-state:paused] ${
        reverse ? "[animation-direction:reverse]" : ""
      }`}
    >
      {items.map((g, i) => (
        <span key={i} className="flex items-center">
          <span className="whitespace-nowrap px-6 font-display text-2xl italic sm:text-3xl">{g}</span>
          <span className="text-lg">✦</span>
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <div className="group relative z-10 overflow-x-clip py-10" aria-label="Styles she performs">
      <div className="-rotate-2 overflow-hidden border-y border-gold/30 bg-linear-to-r from-gold-light via-gold to-saffron py-4 text-ink shadow-[0_20px_60px_-20px_rgb(233_180_76/0.5)]">
        <Row />
      </div>
      <div
        className="absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 rotate-2 overflow-hidden border-y border-gold/15 bg-plum py-4 text-gold/40"
        aria-hidden
      >
        <Row reverse />
      </div>
    </div>
  );
}
