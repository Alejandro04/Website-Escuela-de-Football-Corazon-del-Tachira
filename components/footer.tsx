import Link from "next/link";
import Image from "next/image";
import { site, navLinks } from "@/lib/data/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-black text-brand-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/escudo.png"
              alt="Escudo Corazón del Táchira FC"
              width={48}
              height={48}
              className="h-12 w-12 object-contain"
            />
            <span className="font-display text-2xl tracking-wide">
              CORAZÓN DEL TÁCHIRA FC
            </span>
          </Link>
          <p className="mt-6 max-w-md text-brand-white/70">{site.description}</p>
        </div>

        <div>
          <h3 className="font-mono text-xs uppercase tracking-widest text-brand-red">
            Navegación
          </h3>
          <ul className="mt-4 space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-brand-white/80 hover:text-brand-red"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-mono text-xs uppercase tracking-widest text-brand-red">
            Contacto
          </h3>
          <ul className="mt-4 space-y-3 text-brand-white/80">
            <li>
              <a
                href={`https://wa.me/${site.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-red"
              >
                WhatsApp
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-brand-red">
                {site.email}
              </a>
            </li>
            {site.phone.map((phone) => (
              <li key={phone}>
                <a href={`tel:${phone.replace(/\s/g, "")}`} className="hover:text-brand-red">
                  {phone}
                </a>
              </li>
            ))}
            <li className="text-brand-white/60">{site.address}</li>
          </ul>
          <div className="mt-6 flex items-center gap-4">
            <a
              href={`https://instagram.com/${site.socials.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-brand-white/70 hover:text-brand-red"
            >
              IG
            </a>
            <a
              href={`https://facebook.com/${site.socials.facebook}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-brand-white/70 hover:text-brand-red"
            >
              FB
            </a>
            <a
              href={`https://tiktok.com/@${site.socials.tiktok}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="text-brand-white/70 hover:text-brand-red"
            >
              TT
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-brand-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-6 text-xs text-brand-white/50 sm:flex-row lg:px-8">
          <p>
            © {year} {site.name}. Todos los derechos reservados.
          </p>
          <p>Hecho con corazón andino.</p>
        </div>
      </div>
    </footer>
  );
}