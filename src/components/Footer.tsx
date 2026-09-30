import { FaHeart } from "react-icons/fa";
import { artist, contact, navLinks } from "@/data/site";
import { linkProps, quickLinks } from "./socials";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-gold/15 pt-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col items-center gap-10 text-center lg:flex-row lg:items-start lg:justify-between lg:text-left">
          <div className="max-w-sm">
            <p className="font-hindi text-xl text-gold" lang="hi">
              {artist.nameHindi}
            </p>
            <p className="mt-1 font-display text-3xl text-cream">
              Shivani <span className="italic text-gold-light">Sharma</span>
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">{artist.role}. Bringing bhakti, joy and melody to every stage.</p>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-cream/75 transition hover:text-gold-light">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col items-center gap-3 lg:items-end">
            <div className="flex gap-3">
              {quickLinks.map((s) => (
                <a
                  key={s.label}
                  {...linkProps(s)}
                  aria-label={s.label}
                  className="grid size-11 place-items-center rounded-full border border-gold/25 text-gold-light transition hover:-translate-y-1 hover:border-gold hover:bg-gold hover:text-ink"
                >
                  <s.icon />
                </a>
              ))}
            </div>
            <a href={`tel:${contact.phone}`} className="text-sm text-cream/80 transition hover:text-gold-light">
              {contact.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      <p
        className="pointer-events-none mt-16 select-none whitespace-nowrap text-center font-display text-[12.5vw] italic leading-[0.8] text-transparent [-webkit-text-stroke:1px_rgb(233_180_76/0.25)]"
        aria-hidden
      >
        Shivani Sharma
      </p>

      <div className="border-t border-gold/10 py-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-5 text-xs text-muted sm:flex-row sm:px-8">
          <p>
            © {new Date().getFullYear()} {artist.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5">
            Made with <FaHeart className="text-rose" /> for music
          </p>
        </div>
      </div>
    </footer>
  );
}
