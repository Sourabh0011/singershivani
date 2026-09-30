"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { FaArrowUp, FaWhatsapp } from "react-icons/fa";
import { contact } from "@/data/site";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25, restDelta: 0.001 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[55] h-[3px] origin-left bg-linear-to-r from-maroon via-gold to-gold-light"
      aria-hidden
    />
  );
}

export default function FloatingActions() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-center gap-3 sm:bottom-8 sm:right-8">
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, y: 20, scale: 0.6 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.6 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="glass grid size-11 place-items-center rounded-full text-gold-light transition-colors hover:bg-gold hover:text-ink"
            aria-label="Back to top"
          >
            <FaArrowUp />
          </motion.button>
        )}
      </AnimatePresence>

      <motion.a
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2.5, type: "spring", stiffness: 260, damping: 18 }}
        href={`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent("Namaste! I'd like to enquire about a performance booking.")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative grid size-14 place-items-center rounded-full bg-[#25D366] text-3xl text-white shadow-[0_10px_30px_-5px_rgb(37_211_102/0.6)]"
        aria-label="Chat on WhatsApp"
      >
        <span className="absolute inset-0 animate-pulse-ring rounded-full bg-[#25D366]" aria-hidden />
        <FaWhatsapp className="relative" />
        <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-full bg-cream px-3 py-1.5 text-xs font-medium text-ink opacity-0 transition group-hover:opacity-100">
          Book on WhatsApp
        </span>
      </motion.a>
    </div>
  );
}
