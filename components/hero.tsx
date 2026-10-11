import Image from "next/image";
import Link from "next/link";
import { WhatsAppButton } from "@/components/whatsapp-button";

type HeroProps = {
  title: string;
  subtitle?: string;
  cta?: { label: string; href: string };
  showMainCta?: boolean;
  variant?: "primary" | "dark";
  eyebrow?: string;
};

export function Hero({
  title,
  subtitle,
  cta,
  showMainCta = true,
  variant = "primary",
  eyebrow,
}: HeroProps) {
  const isPrimary = variant === "primary";
  const bg = isPrimary ? "bg-brand-red" : "bg-brand-black";
  const textColor = "text-brand-white";
  const overlay = "before:absolute before:inset-0 before:bg-gradient-to-b before:from-black/30 before:via-transparent before:to-black/40";

  return (
    <section className={`relative isolate overflow-hidden ${bg} ${textColor} ${overlay} pt-32 pb-20 sm:pt-40 sm:pb-28 lg:pt-48 lg:pb-36`}>
      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-8 px-6 text-center lg:px-8">
        {eyebrow && (
          <span className="font-mono text-xs uppercase tracking-[0.4em] text-brand-white/80">
            {eyebrow}
          </span>
        )}
        <Image
          src="/escudo_sin_fondo.png"
          alt="Escudo Corazón del Táchira FC"
          width={180}
          height={180}
          priority
          className="h-32 w-32 sm:h-44 sm:w-44 animate-pulse-scale"
        />
        <h1 className="font-display text-5xl leading-[0.9] tracking-tight sm:text-7xl md:text-8xl lg:text-[10rem]">
          {title}
        </h1>
        {subtitle && (
          <p className="max-w-2xl text-base text-brand-white/85 sm:text-xl">
            {subtitle}
          </p>
        )}
        <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row">
          {showMainCta && <WhatsAppButton variant="large" label="Inscríbete por WhatsApp" />}
          {cta && (
            <Link
              href={cta.href}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-brand-white px-8 py-4 font-display text-base uppercase tracking-widest text-brand-white transition-colors hover:bg-brand-white hover:text-brand-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-white"
            >
              {cta.label}
              <span aria-hidden="true">→</span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}