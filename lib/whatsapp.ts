import { site } from "@/lib/data/site";

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function defaultWhatsAppMessage(): string {
  return site.whatsappMessage;
}