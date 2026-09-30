// Deterministic pseudo-random numbers so server and browser render the same markup.
const rand = (seed: number) => {
  let t = seed * 0x6d2b79f5;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const embers = Array.from({ length: 26 }, (_, i) => ({
  left: `${(rand(i + 1) * 100).toFixed(2)}%`,
  size: 2 + Math.round(rand(i + 7) * 5),
  duration: 9 + Math.round(rand(i + 13) * 10),
  delay: -Math.round(rand(i + 29) * 18),
  drift: `${Math.round((rand(i + 41) - 0.5) * 160)}px`,
}));

/** Glowing diya-like sparks drifting upward. */
export default function Embers() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {embers.map((e, i) => (
        <span
          key={i}
          className="ember"
          style={
            {
              left: e.left,
              width: e.size,
              height: e.size,
              animationDuration: `${e.duration}s`,
              animationDelay: `${e.delay}s`,
              "--drift": e.drift,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
