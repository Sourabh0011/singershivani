"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FaCheckCircle, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { artist, contact, performances } from "@/data/site";
import { profiles, whatsappLink } from "./socials";
import { Reveal, SectionHeading, ease, trackSpotlight } from "./ui";

const details = [
  { icon: FaPhoneAlt, label: "Call", value: contact.phoneDisplay, href: `tel:${contact.phone}` },
  { icon: FaWhatsapp, label: "WhatsApp", value: `${contact.phoneDisplay} · Chat to book`, href: whatsappLink() },
  ...(contact.email ? [{ icon: FaEnvelope, label: "Email", value: contact.email, href: `mailto:${contact.email}` }] : []),
  { icon: FaMapMarkerAlt, label: "Location", value: contact.location },
];

const inputClass =
  "w-full rounded-xl border border-gold/15 bg-ink/50 px-4 py-3 text-cream placeholder:text-muted/50 outline-none transition focus:border-gold focus:ring-4 focus:ring-gold/15";

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [sent, setSent] = useState<null | "whatsapp" | "email">(null);

  function buildMessage() {
    const f = new FormData(formRef.current!);
    const line = (label: string, key: string) => (f.get(key) ? `${label}: ${f.get(key)}\n` : "");
    return (
      `Namaste ${artist.firstName} ji! I'd like to book a performance.\n\n` +
      line("Name", "name") +
      line("Phone", "phone") +
      line("Event", "type") +
      line("Date", "date") +
      line("City / Venue", "city") +
      (f.get("message") ? `\n${f.get("message")}` : "")
    );
  }

  function sendWhatsApp(e: React.FormEvent) {
    e.preventDefault();
    window.open(whatsappLink(buildMessage()), "_blank", "noopener");
    setSent("whatsapp");
  }

  function sendEmail() {
    if (!formRef.current?.reportValidity()) return;
    const subject = `Performance booking enquiry — ${new FormData(formRef.current).get("type") || "Event"}`;
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildMessage())}`;
    setSent("email");
  }

  return (
    <section id="contact" className="relative overflow-hidden py-24 lg:py-32">
      <div className="pointer-events-none absolute bottom-0 left-1/2 size-[40rem] -translate-x-1/2 rounded-full bg-maroon/25 blur-[140px]" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Contact & Booking"
          title="Let’s make your event"
          highlight="unforgettable"
          subtitle="Planning a jagran, bhajan sandhya, Mata ki Chowki or stage show? Call or WhatsApp — or share a few details below and we’ll get back to you quickly."
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Details */}
          <div className="space-y-4">
            {details.map((d, i) => {
              const Wrapper = d.href ? "a" : "div";
              return (
                <Reveal key={d.label} delay={i * 0.08} y={30}>
                  <Wrapper
                    {...(d.href
                      ? { href: d.href, ...(d.href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" }) }
                      : {})}
                    onMouseMove={trackSpotlight}
                    className="spotlight glass group flex items-center gap-5 rounded-2xl p-5 transition-[border-color,translate] duration-500 hover:translate-x-1 hover:border-gold/40"
                  >
                    <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-linear-to-br from-gold-light to-gold text-lg text-ink transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110">
                      <d.icon />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs uppercase tracking-[0.2em] text-muted">{d.label}</span>
                      <span className="mt-0.5 block break-words text-base text-cream sm:text-lg">{d.value}</span>
                    </span>
                  </Wrapper>
                </Reveal>
              );
            })}

            {profiles.length > 0 && (
              <Reveal delay={0.45} y={30}>
                <div className="flex items-center gap-4 pt-4">
                  <span className="text-sm text-muted">Follow her journey</span>
                  <span className="h-px flex-1 bg-gold/20" />
                  {profiles.map(({ icon: Icon, label, href }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="grid size-11 place-items-center rounded-full border border-gold/25 text-gold-light transition hover:-translate-y-1 hover:border-gold hover:bg-gold hover:text-ink"
                    >
                      <Icon />
                    </a>
                  ))}
                </div>
              </Reveal>
            )}
          </div>

          {/* Booking form */}
          <Reveal delay={0.15}>
            <form
              ref={formRef}
              onSubmit={sendWhatsApp}
              className="glass relative overflow-hidden rounded-3xl p-6 sm:p-9"
            >
              <div className="absolute -right-24 -top-24 size-64 rounded-full bg-gold/10 blur-3xl" aria-hidden />
              <h3 className="relative font-display text-3xl text-cream">
                Book <em className="text-gradient-gold">{artist.firstName}</em>
              </h3>
              <p className="relative mt-2 text-sm text-muted">Fields marked * are required.</p>

              <div className="relative mt-7 grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm text-cream/80">Your name *</span>
                  <input name="name" required autoComplete="name" placeholder="Full name" className={inputClass} />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm text-cream/80">Phone *</span>
                  <input
                    name="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    placeholder="+91"
                    minLength={8}
                    className={inputClass}
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm text-cream/80">Event type *</span>
                  <select name="type" required defaultValue="" className={`${inputClass} appearance-none`}>
                    <option value="" disabled>
                      Select an event
                    </option>
                    {performances.map((p) => (
                      <option key={p.title}>{p.title}</option>
                    ))}
                    <option>Other</option>
                  </select>
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm text-cream/80">Event date</span>
                  <input name="date" type="date" className={inputClass} />
                </label>
                <label className="block sm:col-span-2">
                  <span className="mb-2 block text-sm text-cream/80">City / Venue</span>
                  <input name="city" placeholder="Where is the event?" className={inputClass} />
                </label>
                <label className="block sm:col-span-2">
                  <span className="mb-2 block text-sm text-cream/80">Message</span>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Tell us about the occasion, expected guests, timings…"
                    className={`${inputClass} resize-none`}
                  />
                </label>
              </div>

              <div className="relative mt-7 flex flex-col gap-3 sm:flex-row">
                <button type="submit" className="btn-primary flex-1">
                  <FaWhatsapp className="text-lg" /> Send on WhatsApp
                </button>
                {contact.email ? (
                  <button type="button" onClick={sendEmail} className="btn-ghost flex-1">
                    <FaEnvelope /> Send by Email
                  </button>
                ) : (
                  <a href={`tel:${contact.phone}`} className="btn-ghost flex-1">
                    <FaPhoneAlt /> Call {contact.phoneDisplay}
                  </a>
                )}
              </div>

              <AnimatePresence>
                {sent && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease }}
                    className="relative mt-5 flex items-center gap-2 rounded-xl border border-gold/30 bg-gold/10 px-4 py-3 text-sm text-gold-light"
                    role="status"
                  >
                    <FaCheckCircle className="shrink-0" />
                    {sent === "whatsapp"
                      ? "WhatsApp is open with your enquiry — just press send!"
                      : "Your email app is open with the enquiry — just press send!"}
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
