import type { IconType } from "react-icons";
import { FaFacebookF, FaInstagram, FaPhoneAlt, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { contact } from "@/data/site";

export const whatsappLink = (text?: string) =>
  `https://wa.me/${contact.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export type SocialLink = { label: string; href: string; icon: IconType; external: boolean };

/** Social profiles that have a link filled in (empty ones are hidden). */
export const profiles: SocialLink[] = [
  { label: "Instagram", href: contact.socials.instagram, icon: FaInstagram, external: true },
  { label: "YouTube", href: contact.socials.youtube, icon: FaYoutube, external: true },
  { label: "Facebook", href: contact.socials.facebook, icon: FaFacebookF, external: true },
].filter((s) => s.href);

/** Call + WhatsApp + any social profiles. */
export const quickLinks: SocialLink[] = [
  { label: "Call", href: `tel:${contact.phone}`, icon: FaPhoneAlt, external: false },
  { label: "WhatsApp", href: whatsappLink(), icon: FaWhatsapp, external: true },
  ...profiles,
];

export const linkProps = (s: SocialLink) =>
  s.external ? { href: s.href, target: "_blank", rel: "noopener noreferrer" } : { href: s.href };
