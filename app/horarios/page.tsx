import type { Metadata } from "next";
import { Hero } from "@/components/hero";
import { SectionTitle } from "@/components/section-title";
import { ScheduleTable } from "@/components/schedule-table";
import { Reveal } from "@/components/reveal";
import { schedule } from "@/lib/data/schedule";
import { site } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Horarios y ubicación",
  description: "Horarios de entrenamiento por categoría y ubicación de la escuela.",
};

export default function HorariosPage() {
  return (
    <>
      <Hero
        title="HORARIOS Y UBICACIÓN"
        subtitle="Días, horarios y dirección para que sepas cuándo y dónde encontrarnos."
        variant="dark"
      />

      <section className="bg-brand-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <SectionTitle
              eyebrow="01 — Calendario"
              title="Horarios por categoría"
              subtitle="Estos son nuestros horarios habituales. Pueden variar en feriados o vacaciones."
            />
          </Reveal>
          <Reveal delay={1}>
            <div className="mt-12">
              <ScheduleTable entries={schedule} />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-brand-black py-20 text-brand-white sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:px-8">
          <Reveal>
            <SectionTitle
              eyebrow="02 — Dónde estamos"
              title="Visítanos"
              subtitle={site.address}
              tone="light"
            />
            <p className="mt-6 text-brand-white/70">
              Te esperamos en nuestra cancha. Llega 15 minutos antes del
              entrenamiento para recibir indicaciones del cuerpo técnico.
            </p>
          </Reveal>
          <Reveal delay={1}>
            <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-brand-white/10">
              <iframe
                title="Mapa de ubicación"
                src={site.mapsEmbedUrl}
                className="h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}