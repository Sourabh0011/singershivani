"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { FaArrowRight, FaImages, FaMapMarkerAlt, FaRegClock, FaWhatsapp } from "react-icons/fa";
import { contact, performedIn, type EventItem } from "@/data/site";
import { Reveal, SectionHeading, ease, trackSpotlight } from "./ui";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const PAST_PREVIEW = 4;

function splitDate(date: string) {
  const [y, m, d] = date.split("-").map(Number);
  return { day: String(d).padStart(2, "0"), month: MONTHS[m - 1], year: y };
}

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
function weekday(date: string) {
  const [y, m, d] = date.split("-").map(Number);
  // UTC keeps this identical on the server and in the browser.
  return DAYS[new Date(Date.UTC(y, m - 1, d)).getUTCDay()];
}

function Countdown({ event }: { event: EventItem }) {
  // Rendered only after mount so server and browser markup match.
  const [left, setLeft] = useState<number | null>(null);

  useEffect(() => {
    const target = new Date(`${event.date}T00:00:00+05:30`).getTime();
    const tick = () => setLeft(Math.max(0, target - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [event.date]);

  const parts =
    left === null
      ? null
      : [
          { label: "Days", value: Math.floor(left / 86_400_000) },
          { label: "Hours", value: Math.floor(left / 3_600_000) % 24 },
          { label: "Mins", value: Math.floor(left / 60_000) % 60 },
          { label: "Secs", value: Math.floor(left / 1000) % 60 },
        ];

  return (
    <div className="flex gap-2 sm:gap-3">
      {(parts ?? ["Days", "Hours", "Mins", "Secs"].map((label) => ({ label, value: null }))).map((p) => (
        <div
          key={p.label}
          className="min-w-16 rounded-2xl border border-gold/25 bg-ink/60 px-3 py-2.5 text-center sm:min-w-20"
        >
          <p className="font-display text-2xl tabular-nums text-gold-light sm:text-3xl">
            {p.value === null ? "--" : String(p.value).padStart(2, "0")}
          </p>
          <p className="text-[0.6rem] uppercase tracking-[0.2em] text-muted">{p.label}</p>
        </div>
      ))}
    </div>
  );
}

function EventCard({ event, past, index }: { event: EventItem; past: boolean; index: number }) {
  const { day, month, year } = splitDate(event.date);
  const enquiry = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
    `Namaste! I'd like more details about "${event.title}" on ${day} ${month} ${year} in ${event.city}.`,
  )}`;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease }}
      onMouseMove={trackSpotlight}
      className="spotlight glass group flex flex-col overflow-hidden rounded-3xl transition-[border-color] duration-500 hover:border-gold/40 sm:flex-row"
    >
      <div className="relative aspect-[16/10] overflow-hidden sm:aspect-auto sm:w-[42%]">
        <Image
          src={event.image}
          alt={event.title}
          fill
          sizes="(min-width: 1024px) 260px, (min-width: 640px) 40vw, 100vw"
          className={`object-cover object-[center_30%] transition duration-700 group-hover:scale-110 ${past ? "grayscale-[40%] group-hover:grayscale-0" : ""}`}
        />
        <div className="absolute inset-0 bg-linear-to-t from-ink/70 to-transparent sm:bg-linear-to-r" />
        <div className="absolute left-4 top-4 rounded-2xl bg-linear-to-b from-gold-light to-gold px-3.5 py-2 text-center text-ink shadow-lg">
          <p className="font-display text-3xl leading-none">{day}</p>
          <p className="mt-0.5 text-[0.65rem] font-semibold uppercase tracking-widest">
            {month} {year}
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <span className="w-fit rounded-full border border-rose/40 bg-rose/10 px-3 py-1 text-[0.7rem] font-medium uppercase tracking-wider text-rose">
          {event.type}
        </span>
        <h3 className="mt-4 font-display text-2xl leading-snug text-cream">{event.title}</h3>
        {event.description && <p className="mt-2 text-sm leading-relaxed text-muted">{event.description}</p>}

        <ul className="mt-5 space-y-2 text-sm text-cream/80">
          <li className="flex items-center gap-2.5">
            <FaMapMarkerAlt className="shrink-0 text-gold" />
            {event.venue ? `${event.venue}, ${event.city}` : event.city}
          </li>
          <li className="flex items-center gap-2.5">
            <FaRegClock className="shrink-0 text-gold" />
            {event.time ?? `${weekday(event.date)}, ${day} ${month}`}
          </li>
        </ul>
        {!past && !(event.venue && event.time) && (
          <p className="mt-4 text-xs text-muted">Venue &amp; timings on request — just ask on WhatsApp.</p>
        )}

        <div className="mt-auto pt-6">
          {past ? (
            <a href="#gallery" className="inline-flex items-center gap-2 text-sm font-medium text-gold-light hover:text-gold">
              <FaImages /> View gallery <FaArrowRight className="text-xs transition group-hover:translate-x-1" />
            </a>
          ) : (
            <a
              href={enquiry}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-gold-light hover:text-gold"
            >
              <FaWhatsapp /> Ask for details <FaArrowRight className="text-xs transition group-hover:translate-x-1" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function Events({ upcoming, past }: { upcoming: EventItem[]; past: EventItem[] }) {
  const [tab, setTab] = useState<"upcoming" | "past">(upcoming.length ? "upcoming" : "past");
  const [showAll, setShowAll] = useState(false);
  const next = upcoming[0];

  const list = tab === "upcoming" ? upcoming : showAll ? past : past.slice(0, PAST_PREVIEW);
  const tabs = [
    { id: "upcoming" as const, label: "Upcoming", count: upcoming.length },
    { id: "past" as const, label: "Past Performances", count: performedIn.length + past.length },
  ];

  return (
    <section id="events" className="relative overflow-x-clip py-24 lg:py-32">
      <span
        className="pointer-events-none absolute left-1/2 top-10 -translate-x-1/2 select-none font-display text-[22vw] italic leading-none text-transparent [-webkit-text-stroke:1px_rgb(233_180_76/0.08)] lg:text-[16rem]"
        aria-hidden
      >
        Live
      </span>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Events"
          title="Where to hear her"
          highlight="live"
          subtitle="Catch Shivani live at her upcoming programmes — or see the cities where her bhajans have already filled hearts."
        />

        {next && (
          <Reveal delay={0.1}>
            <div className="glass relative mt-14 flex flex-col items-center justify-between gap-6 overflow-hidden rounded-3xl p-6 text-center sm:p-8 lg:flex-row lg:text-left">
              <div className="absolute -left-20 -top-20 size-60 rounded-full bg-gold/15 blur-3xl" aria-hidden />
              <div className="relative">
                <p className="flex items-center justify-center gap-2 text-xs font-medium uppercase tracking-[0.3em] text-rose lg:justify-start">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-rose opacity-75" />
                    <span className="relative inline-flex size-2 rounded-full bg-rose" />
                  </span>
                  Next performance
                </p>
                <h3 className="mt-3 font-display text-3xl text-cream">{next.title}</h3>
                <p className="mt-1 text-sm text-muted">
                  {weekday(next.date)}, {splitDate(next.date).day} {splitDate(next.date).month} ·{" "}
                  {next.venue ? `${next.venue}, ${next.city}` : next.city}
                </p>
              </div>
              <Countdown event={next} />
            </div>
          </Reveal>
        )}

        <div className="mt-12 flex justify-center">
          <div className="glass inline-flex rounded-full p-1.5" role="tablist" aria-label="Event list">
            {tabs.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={tab === t.id}
                onClick={() => {
                  setTab(t.id);
                  setShowAll(false);
                }}
                className={`relative isolate rounded-full px-5 py-2.5 text-sm font-medium transition-colors sm:px-7 ${
                  tab === t.id ? "text-ink" : "text-cream/75 hover:text-gold-light"
                }`}
              >
                {tab === t.id && (
                  <motion.span
                    layoutId="event-tab"
                    className="absolute inset-0 -z-10 rounded-full bg-linear-to-r from-gold-light to-gold"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                {t.label}
                <span className={`ml-2 text-xs ${tab === t.id ? "text-ink/70" : "text-muted"}`}>{t.count}</span>
              </button>
            ))}
          </div>
        </div>

        {tab === "past" && (
          <motion.div
            key="cities"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="glass mt-10 overflow-hidden rounded-3xl p-6 sm:p-10"
          >
            <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold">Performed across Madhya Pradesh</p>
                <h3 className="mt-2 font-display text-3xl text-cream">
                  Cities she has <em className="text-gradient-gold">sung in</em>
                </h3>
              </div>
              <a href="#gallery" className="btn-ghost shrink-0 px-5 py-2.5 text-sm">
                <FaImages /> See the photos
              </a>
            </div>

            <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {performedIn.map((c, i) => (
                <motion.li
                  key={c.city}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.06, ease }}
                  onMouseMove={trackSpotlight}
                  className="spotlight group flex items-center gap-3 rounded-2xl border border-gold/15 bg-ink/40 p-4 transition-[border-color,translate] duration-500 hover:-translate-y-1 hover:border-gold/50"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-gold/10 text-gold transition-transform duration-500 group-hover:scale-110 group-hover:bg-gold group-hover:text-ink">
                    <FaMapMarkerAlt />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate font-medium text-cream">{c.city}</span>
                    <span className="block font-hindi text-sm text-gold-light/80" lang="hi">
                      {c.hindi}
                    </span>
                  </span>
                </motion.li>
              ))}
            </ul>
            <p className="mt-6 text-center text-sm text-muted">…and many more towns and villages across the region.</p>
          </motion.div>
        )}

        <motion.div layout className="mt-10 grid gap-6 lg:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {list.map((e, i) => (
              <EventCard key={`${tab}-${e.date}-${e.title}`} event={e} past={tab === "past"} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {tab === "upcoming" && upcoming.length === 0 && (
          <p className="mt-6 text-center text-muted">
            New dates are being announced soon.{" "}
            <a href="#contact" className="text-gold-light underline underline-offset-4">
              Book her for your event
            </a>
            .
          </p>
        )}

        {tab === "past" && past.length > PAST_PREVIEW && (
          <div className="mt-10 text-center">
            <button onClick={() => setShowAll((s) => !s)} className="btn-ghost">
              {showAll ? "Show fewer" : `Show all ${past.length} past events`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
