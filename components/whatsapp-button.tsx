import Link from "next/link";
import { buildWhatsAppUrl, defaultWhatsAppMessage } from "@/lib/whatsapp";

type WhatsAppButtonProps = {
  message?: string;
  label?: string;
  variant?: "floating" | "inline" | "large";
  className?: string;
};

export function WhatsAppButton({
  message,
  label = "Escríbenos por WhatsApp",
  variant = "inline",
  className = "",
}: WhatsAppButtonProps) {
  const href = buildWhatsAppUrl(message ?? defaultWhatsAppMessage());

  if (variant === "floating") {
    return (
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Abrir chat de WhatsApp"
        className={`fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/30 transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366] ${className}`}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 32 32"
          className="h-7 w-7 fill-current"
        >
          <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.402-1.46-2.1-.072-.236-.077-.372-.018-.492.07-.142.272-.247.482-.247.118 0 .236.018.354.072.197.064.39.142.572.236.26.108.497.246.722.4.18.118.327.246.473.39.118.108.236.236.354.354.118.118.2.236.272.354.064.108.118.236.072.354-.046.118-.118.236-.236.354-.118.118-.272.236-.39.354-.118.118-.236.236-.354.354-.118.118-.2.236-.2.39 0 .154.082.308.2.49.118.18.272.39.49.608.118.118.236.272.39.4.154.13.308.236.462.327.154.09.308.18.462.236.154.054.272.082.39 0 .118-.082.236-.2.354-.354.118-.154.236-.308.39-.462.154-.154.308-.272.49-.354.18-.082.354-.118.49-.054.236.082.49.272.722.49.118.118.236.236.354.354.118.118.236.236.354.39.118.154.236.272.354.39.118.118.236.236.272.354.072.18.054.354-.054.49-.118.154-.272.272-.49.354-.154.072-.308.118-.462.154-.154.036-.308.054-.49.054zm5.78-3.205C24.89 8.85 19.4 4 12.79 4 6.18 4 1 9.18 1 15.79c0 2.59.7 5.05 1.96 7.21L1 28l5.18-1.96c2.11 1.16 4.49 1.77 6.96 1.77 6.61 0 11.79-5.18 11.79-11.79 0-3.4-1.36-6.43-3.55-8.55M12.79 26c-2.21 0-4.36-.6-6.21-1.71l-.45-.27-3.07 1.16 1.16-3.07-.27-.45C2.05 19.66 1.4 17.5 1.4 15.29c0-5.66 4.66-6.49 6.49-6.49 2.4 0 4.66.94 6.43 2.71 1.77 1.77 2.71 4.04 2.71 6.43 0 5.66-4.66 6.49-6.49 6.49z" />
        </svg>
      </Link>
    );
  }

  if (variant === "large") {
    return (
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center justify-center gap-3 rounded-full bg-brand-red px-10 py-5 font-display text-xl uppercase tracking-widest text-white transition-colors hover:bg-brand-red-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red ${className}`}
      >
        {label}
        <span aria-hidden="true">→</span>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-brand-red px-8 py-4 font-display text-base uppercase tracking-widest text-white transition-colors hover:bg-brand-red-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red ${className}`}
    >
      {label}
      <span aria-hidden="true">→</span>
    </Link>
  );
}