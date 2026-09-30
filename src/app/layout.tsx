import type { Metadata, Viewport } from "next";
import { Playfair_Display, Poppins, Tiro_Devanagari_Hindi } from "next/font/google";
import Providers from "@/components/Providers";
import { artist } from "@/data/site";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const tiro = Tiro_Devanagari_Hindi({
  subsets: ["devanagari", "latin"],
  weight: "400",
  variable: "--font-tiro",
  display: "swap",
});

// Public address of the site, used for link previews on WhatsApp/Facebook.
// Set NEXT_PUBLIC_SITE_URL (e.g. https://shivanisharma.in) once there is a domain; Vercel is detected automatically.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${artist.name} — ${artist.role}`,
  description: `${artist.name} is a ${artist.role.toLowerCase()} from Madhya Pradesh performing bhajan sandhya, Mata ki Chowki, jagran, Shyam bhajan and live stage shows in Jabalpur, Narsinghpur, Gadarwara, Katni, Damoh, Pipariya and beyond. See upcoming events, gallery and booking details.`,
  keywords: [
    artist.name,
    "Shivani Sharma singer",
    "devotional singer",
    "bhajan singer",
    "jagran singer",
    "mata ki chowki singer",
    "bhajan singer Gadarwara",
    "bhajan singer Narsinghpur",
    "bhajan singer Jabalpur",
    "female bhajan singer Madhya Pradesh",
  ],
  openGraph: {
    title: `${artist.name} — ${artist.role}`,
    description: artist.intro,
    type: "website",
    images: [{ url: artist.heroImage, width: 1440, height: 1920, alt: artist.name }],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0510",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${playfair.variable} ${poppins.variable} ${tiro.variable}`}
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
