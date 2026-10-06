import Link from "next/link";
import { WhatsAppButton } from "@/components/whatsapp-button";

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-screen items-center justify-center bg-brand-red px-6 text-center text-brand-white">
      <div className="relative mx-auto">
        <p className="font-mono text-xs uppercase tracking-[0.4em] text-brand-white/70">
          404
        </p>
        <h1 className="mt-4 font-display text-7xl sm:text-9xl">Página no encontrada</h1>
        <p className="mx-auto mt-6 max-w-md text-brand-white/85">
          La página que buscas no existe o fue movida. Vuelve al inicio o escríbenos por WhatsApp.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-brand-white px-8 py-4 font-display text-base uppercase tracking-widest text-brand-white transition-colors hover:bg-brand-white hover:text-brand-red"
          >
            <span aria-hidden="true">←</span> Volver al inicio
          </Link>
          <WhatsAppButton
            variant="inline"
            label="Escríbenos"
            className="!bg-brand-black hover:!bg-brand-black/80"
          />
        </div>
      </div>
    </section>
  );
}
