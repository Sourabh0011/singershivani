/** Decorative line-art mandala, drawn in the current text colour. */
export default function Mandala({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      stroke="currentColor"
      className={className}
      aria-hidden
    >
      <circle cx="200" cy="200" r="196" strokeWidth="0.8" />
      <circle cx="200" cy="200" r="186" strokeWidth="0.6" strokeDasharray="1 7" strokeLinecap="round" />
      {Array.from({ length: 36 }).map((_, i) => (
        <circle key={`d${i}`} cx="200" cy="12" r="2" fill="currentColor" transform={`rotate(${i * 10} 200 200)`} />
      ))}
      {Array.from({ length: 24 }).map((_, i) => (
        <path
          key={`p${i}`}
          d="M200 26 C 216 62, 216 92, 200 112 C 184 92, 184 62, 200 26 Z"
          strokeWidth="0.8"
          transform={`rotate(${i * 15} 200 200)`}
        />
      ))}
      {Array.from({ length: 24 }).map((_, i) => (
        <path
          key={`q${i}`}
          d="M200 48 C 208 70, 208 86, 200 98"
          strokeWidth="0.5"
          transform={`rotate(${i * 15 + 7.5} 200 200)`}
        />
      ))}
      <circle cx="200" cy="200" r="88" strokeWidth="0.8" />
      {Array.from({ length: 16 }).map((_, i) => (
        <path
          key={`i${i}`}
          d="M200 112 C 224 136, 224 162, 200 176 C 176 162, 176 136, 200 112 Z"
          strokeWidth="0.7"
          transform={`rotate(${i * 22.5} 200 200)`}
        />
      ))}
      <circle cx="200" cy="200" r="24" strokeWidth="0.8" />
      <circle cx="200" cy="200" r="14" strokeWidth="0.6" strokeDasharray="2 3" />
    </svg>
  );
}
