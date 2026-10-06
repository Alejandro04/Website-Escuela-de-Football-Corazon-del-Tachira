import type { Metadata } from "next";
import Image from "next/image";
import { SectionTitle } from "@/components/section-title";
import { Hero } from "@/components/hero";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Escuela",
  description:
    "Conoce la historia, el cuerpo técnico y la infraestructura de la escuela Corazón del Táchira FC.",
};

const staff = [
  { name: "Director técnico", role: "Licencia A federativa", photo: "/images/staff/placeholder.jpg" },
  { name: "Entrenador Sub-15", role: "Licencia B federativa", photo: "/images/staff/placeholder.jpg" },
  { name: "Entrenador Sub-13", role: "Metodología formativa", photo: "/images/staff/placeholder.jpg" },
  { name: "Entrenador Sub-9",  role: "Iniciación deportiva", photo: "/images/staff/placeholder.jpg" },
];

const infraestructura = [
  "Cancha principal de grass natural",
  "Cancha sintética para entrenamientos",
  "Vestuarios y duchas",
  "Material deportivo completo para todas las edades",
  "Cuerpo médico presente en entrenamientos y partidos",
  "Sistema de evaluación trimestral por categoría",
];

export default function EscuelaPage() {
  return (
    <>
      <Hero
        title="NUESTRA ESCUELA"
        subtitle="Más que una cancha: una familia andina dedicada al fútbol formativo."
        variant="dark"
      />

      <section className="bg-brand-white py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <Reveal>
            <SectionTitle
                eyebrow="01 — Historia"
                title="Una historia con corazón"
              />
            </Reveal>
          <Reveal delay={1}>
            <div className="prose prose-lg mt-8 max-w-none text-brand-black/80">
              {/* TODO: usuario — reemplazar con la historia real */}
              <p>
                La escuela Corazón del Táchira FC nace del amor de un grupo de
                vecinos de Michelena por el fútbol y por la formación de los más
                jóvenes. Desde nuestros inicios hemos acompañado a decenas de
                niños y adolescentes en su camino deportivo, con la convicción
                de que el deporte es una herramienta poderosa para formar
                personas mejores.
              </p>
              <p>
                Hoy somos una escuela reconocida en la región, con presencia en
                torneos regionales y un compromiso firme con la formación
                integral de cada uno de nuestros jugadores.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-brand-black py-20 sm:py-28 text-brand-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <SectionTitle
              eyebrow="02 — Cuerpo técnico"
              title="Los que enseñan"
              subtitle="Profesionales con licencia federativa y vocación formativa."
              tone="light"
            />
          </Reveal>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {staff.map((member, i) => (
              <Reveal key={member.name + i} delay={((i % 3) + 1) as 1 | 2 | 3}>
                <article className="group overflow-hidden rounded-2xl bg-brand-white/5 backdrop-blur-sm">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-2xl">{member.name}</h3>
                    <p className="mt-2 font-mono text-xs uppercase tracking-widest text-brand-red">
                      {member.role}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-white py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <Reveal>
            <SectionTitle
              eyebrow="03 — Infraestructura"
              title="Lo que tenemos"
              subtitle="Instalaciones y materiales para entrenar con dignidad."
            />
          </Reveal>
          <Reveal delay={1}>
            <ul className="mt-12 grid gap-4 sm:grid-cols-2">
              {infraestructura.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-brand-black/10 p-6 hover:border-brand-red"
                >
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-red" />
                  <span className="text-brand-black/80">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  );
}