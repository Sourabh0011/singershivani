import About from "@/components/About";
import Contact from "@/components/Contact";
import Events from "@/components/Events";
import FloatingActions, { ScrollProgress } from "@/components/FloatingActions";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Navbar from "@/components/Navbar";
import Performances from "@/components/Performances";
import { artist, contact, events } from "@/data/site";

// Re-check every hour so events move from "Upcoming" to "Past" on their own.
export const revalidate = 3600;

export default function Home() {
  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());

  const upcoming = events.filter((e) => e.date >= today).sort((a, b) => a.date.localeCompare(b.date));
  const past = events.filter((e) => e.date < today).sort((a, b) => b.date.localeCompare(a.date));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: artist.name,
    alternateName: artist.nameHindi,
    jobTitle: artist.role,
    ...(contact.email && { email: contact.email }),
    telephone: contact.phone,
    address: { "@type": "PostalAddress", addressRegion: "Madhya Pradesh", addressCountry: "IN" },
    sameAs: Object.values(contact.socials).filter(Boolean),
  };

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Performances />
        <Events upcoming={upcoming} past={past} />
        <Gallery />
        <Contact />
      </main>
      <Footer />
      <FloatingActions />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
