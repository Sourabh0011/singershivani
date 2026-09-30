/**
 * ─────────────────────────────────────────────────────────────
 *  ALL WEBSITE CONTENT LIVES IN THIS ONE FILE.
 *  Edit the text, dates, photos and contact details below —
 *  the design updates automatically.
 *
 *  PHOTOS live in  /public/images/  and are referenced as
 *  "/images/<file name>". To add a photo, drop it in that folder
 *  and add a line to `gallery` below.
 * ─────────────────────────────────────────────────────────────
 */

export const artist = {
  name: "Shivani Sharma",
  firstName: "Shivani",
  lastName: "Sharma",
  nameHindi: "शिवानी शर्मा",
  role: "Devotional & Live Performance Singer",
  tagline: "Sur · Bhakti · Sangeet",
  intro:
    "A voice that turns every gathering into a celebration — from soulful bhajan sandhyas and Mata ki Chowki to jagrans, stage shows and festive evenings across Madhya Pradesh.",
  heroImage: "/images/shivani.jpg",
  aboutImage: "/images/pic1.png",
  bio: [
    "Shivani Sharma is a devotional and live performance singer whose music is rooted in faith, tradition and pure emotion. Her bhajans, bhents and kirtans have filled temples, community grounds and auditoriums with devotees singing along.",
    "From Jabalpur and Katni to Narsinghpur, Gadarwara and Pipariya, she brings the same warmth to every stage — Shyam bhajan sandhyas, Navratri chowkis, jagrans, cultural programmes and family celebrations.",
  ],
};

/**
 * Optional stats row in the About section (animated counters).
 * Leave empty to hide it, or add her real numbers, e.g.
 *   { value: 300, suffix: "+", label: "Live Performances" },
 *   { value: 8, suffix: "+", label: "Years of Singing" },
 */
export const stats: { value: number; suffix: string; label: string }[] = [];

export const genres = [
  "Bhajan Sandhya",
  "Mata ki Chowki",
  "Jagran",
  "Shyam Bhajan",
  "Kirtan",
  "Bhakti Geet",
  "Wedding Sangeet",
  "Stage Shows",
  "Cultural Programmes",
];

export type PerformanceIcon = "lotus" | "diya" | "rings" | "mic" | "stage" | "home";

export const performances: {
  title: string;
  description: string;
  icon: PerformanceIcon;
}[] = [
  {
    title: "Bhajan Sandhya",
    description:
      "Soulful evenings of bhajans and kirtan — including Shyam bhajans — that bring families and devotees together in bhakti.",
    icon: "lotus",
  },
  {
    title: "Mata ki Chowki & Jagran",
    description:
      "Energetic bhents and aartis through the night, with a full live band and heartfelt devotion.",
    icon: "diya",
  },
  {
    title: "Weddings & Sangeet",
    description:
      "Traditional geet, folk and much-loved film songs to make family celebrations unforgettable.",
    icon: "rings",
  },
  {
    title: "Stage Shows",
    description:
      "Full-scale stage performances for festivals, melas and public events with a professional crew.",
    icon: "mic",
  },
  {
    title: "Cultural Programmes",
    description:
      "Graceful performances for college functions, annual days and cultural evenings in auditoriums.",
    icon: "stage",
  },
  {
    title: "Private Satsang",
    description:
      "Intimate kirtans and gatherings at home for griha pravesh, birthdays and special occasions.",
    icon: "home",
  },
];

export type EventItem = {
  /** Format: YYYY-MM-DD. On or after today it shows as "Upcoming"; after that it moves to "Past" by itself. */
  date: string;
  city: string;
  title: string;
  type: string;
  image: string;
  /** Optional — leave out if not known yet (visitors are invited to ask on WhatsApp). */
  venue?: string;
  time?: string;
  description?: string;
};

export const events: EventItem[] = [
  {
    date: "2026-10-16",
    city: "Gadarwara",
    title: "Live in Gadarwara",
    type: "Live Performance",
    image: "/images/pic7.jpg",
  },
  {
    date: "2026-10-17",
    city: "Narsinghpur",
    title: "Live in Narsinghpur",
    type: "Live Performance",
    image: "/images/pic6.jpeg",
  },
  {
    date: "2026-10-18",
    city: "Gadarwara",
    title: "Live in Gadarwara",
    type: "Live Performance",
    image: "/images/pic9.jpg",
  },
  {
    date: "2026-10-21",
    city: "Khaparkheda, Pipariya",
    title: "Live in Khaparkheda",
    type: "Live Performance",
    image: "/images/pic4.jpeg",
  },
];

/** Cities where she has performed — shown in the "Past Performances" tab. */
export const performedIn: { city: string; hindi: string }[] = [
  { city: "Jabalpur", hindi: "जबलपुर" },
  { city: "Katni", hindi: "कटनी" },
  { city: "Damoh", hindi: "दमोह" },
  { city: "Gadarwara", hindi: "गाडरवारा" },
  { city: "Kareli", hindi: "करेली" },
  { city: "Narsinghpur", hindi: "नरसिंहपुर" },
  { city: "Raisen", hindi: "रायसेन" },
  { city: "Pipariya", hindi: "पिपरिया" },
];

export type GalleryItem = {
  src: string;
  alt: string;
  category: string;
  /** Optional: make a photo bigger in the grid. */
  size?: "tall" | "wide" | "big";
  /** Optional: which part of the photo to keep in view when it is cropped, e.g. "center 60%" (default "center 30%"). */
  focus?: string;
};

export const gallery: GalleryItem[] = [
  { src: "/images/pic1.png", alt: "Live on the big stage", category: "Stage Shows", size: "tall" },
  { src: "/images/pic4.jpeg", alt: "Singing with the crowd at a Shyam bhajan sandhya", category: "Bhajan Sandhya", size: "big" },
  { src: "/images/pic10.jpg", alt: "Sharing a bhajan with devotees", category: "Mata ki Chowki" },
  { src: "/images/pic13.png", alt: "Krishna bhajan sandhya with live dholak", category: "Bhajan Sandhya", size: "tall", focus: "center 60%" },
  { src: "/images/pic2.jpeg", alt: "Devotees dancing to a Shyam bhajan", category: "Bhajan Sandhya", size: "wide" },
  { src: "/images/pic5.jpeg", alt: "Honoured with a safa and marigold garland", category: "Bhajan Sandhya", size: "tall" },
  { src: "/images/pic15.jpeg", alt: "Welcomed and honoured at a Ganesh Utsav", category: "Honours", size: "wide", focus: "center 55%" },
  { src: "/images/pic9.jpg", alt: "Singing a devotional bhent at the temple", category: "Mata ki Chowki", size: "tall" },
  { src: "/images/pic6.jpeg", alt: "Lost in the music under the stage lights", category: "Stage Shows", size: "tall" },
  { src: "/images/pic8.jpeg", alt: "A packed auditorium enjoying the programme", category: "Stage Shows", size: "wide" },
  { src: "/images/pic16.jpeg", alt: "Smriti chinh from the Ganesh Utsav Samaroh 2026", category: "Honours", size: "tall", focus: "center 25%" },
  { src: "/images/pic3.jpeg", alt: "Moments from a Shyam bhajan sandhya", category: "Bhajan Sandhya", size: "tall" },
  { src: "/images/pic12.jpeg", alt: "Confetti and celebration on stage", category: "Stage Shows", size: "tall", focus: "center 55%" },
  { src: "/images/pic14.png", alt: "Families gathered for an evening programme", category: "Stage Shows", size: "tall", focus: "center 62%" },
  { src: "/images/pic11.jpeg", alt: "Chief guests and audience at a cultural programme", category: "Stage Shows", size: "wide" },
  { src: "/images/pic7.jpg", alt: "Mata ki Chowki at the temple", category: "Mata ki Chowki" },
];

export const contact = {
  phoneDisplay: "+91 92029 28782",
  phone: "+919202928782",
  /** Country code + number, digits only (used for WhatsApp links). */
  whatsapp: "919202928782",
  /** Business / PR email. Leave empty ("") to hide the email card and "Send by Email" button. */
  email: "singing.shivanisharma@gmail.com",
  location: "Madhya Pradesh · Available for events across India",
  /** Profile links — leave any of them empty ("") to hide that icon. */
  socials: {
    instagram: "https://www.instagram.com/shivanisharma_0011/",
    youtube: "https://www.youtube.com/@Shivanisharmaaaa",
    facebook: "",
  },
};

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Events", href: "#events" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];
