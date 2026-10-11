"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks } from "@/lib/data/site";
import { WhatsAppButton } from "@/components/whatsapp-button";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change (Next.js App Router pattern).
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const headerBg = scrolled || open
    ? "bg-brand-black/95 backdrop-blur-md"
    : "bg-brand-black/40 backdrop-blur-sm";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${headerBg}`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/escudo_sin_fondo.png"
              alt="Escudo Corazón del Táchira FC"
              width={40}
              height={40}
              className="h-10 w-10 object-contain"
            />
            <span className="font-display text-xl tracking-wide text-brand-white">
              CORAZÓN DEL TÁCHIRA
            </span>
          </Link>

          <nav aria-label="Navegación principal" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`text-sm font-medium uppercase tracking-widest transition-colors hover:text-brand-red ${
                        isActive ? "text-brand-red" : "text-brand-white"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="hidden lg:block">
            <WhatsAppButton
              variant="inline"
              label="Inscríbete"
              className="!px-6 !py-3 !text-sm"
            />
          </div>

          <button
            type="button"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="relative h-10 w-10 lg:hidden"
          >
            <span
              className={`absolute left-1/2 top-1/2 block h-0.5 w-7 -translate-x-1/2 bg-brand-white transition-transform duration-300 ${
                open ? "translate-y-0 rotate-45" : "-translate-y-2"
              }`}
            />
            <span
              className={`absolute left-1/2 top-1/2 block h-0.5 w-7 -translate-x-1/2 bg-brand-white transition-opacity duration-300 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-1/2 top-1/2 block h-0.5 w-7 -translate-x-1/2 bg-brand-white transition-transform duration-300 ${
                open ? "translate-y-0 -rotate-45" : "translate-y-2"
              }`}
            />
          </button>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={`fixed inset-0 z-30 bg-brand-red transition-opacity duration-300 lg:hidden ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
      >
        <nav
          aria-label="Navegación móvil"
          className="flex h-full flex-col items-center justify-center gap-8 pt-20"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-display text-4xl uppercase text-brand-white hover:text-brand-white/70"
            >
              {link.label}
            </Link>
          ))}
          <WhatsAppButton variant="large" label="Inscríbete por WhatsApp" />
        </nav>
      </div>
    </>
  );
}