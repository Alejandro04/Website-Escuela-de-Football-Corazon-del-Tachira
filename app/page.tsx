import { Hero } from "@/components/hero";
import { SectionTitle } from "@/components/section-title";
import { CategoryCard } from "@/components/category-card";
import { NewsCard } from "@/components/news-card";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { Reveal } from "@/components/reveal";
import { categories } from "@/lib/data/categories";
import { news } from "@/lib/data/news";
import { site } from "@/lib/data/site";

export default function HomePage() {
  return (
    <>
      <Hero
        title="CORAZÓN DEL TÁCHIRA FC"
        subtitle="Escuela de fútbol con corazón andino. Formación integral para niños y jóvenes desde los 5 hasta los 16 años."
        eyebrow="Michelena · Táchira · Venezuela"
      />

      {/* Identidad */}
      <section className="bg-brand-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <SectionTitle
              eyebrow="01 — Identidad"
              title="Nuestra esencia"
              subtitle="No solo formamos jugadores: formamos personas con valores, disciplina y amor por el club."
            />
          </Reveal>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              { title: "Misión", body: "Brindar formación deportiva integral a niños y jóvenes del Táchira, combinando fútbol, educación y valores." },
              { title: "Visión", body: "Ser la escuela de fútbol referente del estado Táchira, reconocida por la calidad humana y deportiva de sus egresados." },
              { title: "Valores", body: "Respeto, disciplina, trabajo en equipo, humildad y pasión por los colores que llevamos con orgullo." },
            ].map((card, i) => (
              <Reveal key={card.title} delay={((i + 1) as 1 | 2 | 3)}>
                <article className="rounded-2xl border border-brand-black/10 p-8 hover:border-brand-red hover:shadow-xl">
                  <h3 className="font-display text-3xl text-brand-red">{card.title}</h3>
                  <p className="mt-4 text-brand-black/70">{card.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Categorías preview */}
      <section className="bg-brand-black py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <SectionTitle
              eyebrow="02 — Categorías"
              title="Edades y divisiones"
              subtitle="Tenemos una categoría para cada edad. Encuentra la indicada y reserva tu cupo por WhatsApp."
              tone="light"
            />
          </Reveal>
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {categories.slice(0, 3).map((category, i) => (
              <Reveal key={category.slug} delay={((i + 1) as 1 | 2 | 3)}>
                <CategoryCard category={category} />
              </Reveal>
            ))}
          </div>
          <div className="mt-12 text-center">
            <a
              href="/categorias"
              className="inline-flex items-center gap-2 font-display text-base uppercase tracking-widest text-brand-red hover:text-brand-white"
            >
              Ver todas las categorías <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* Noticias preview */}
      <section className="bg-brand-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <SectionTitle
              eyebrow="03 — Noticias"
              title="Lo último del club"
              subtitle="Resultados, anuncios y todo lo que pasa en la escuela."
            />
          </Reveal>
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {news.slice(0, 3).map((item, i) => (
              <Reveal key={item.slug} delay={((i + 1) as 1 | 2 | 3)}>
                <NewsCard news={item} />
              </Reveal>
            ))}
          </div>
          <div className="mt-12 text-center">
            <a
              href="/noticias"
              className="inline-flex items-center gap-2 font-display text-base uppercase tracking-widest text-brand-red hover:text-brand-red-dark"
            >
              Ver todas las noticias <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* CTA entrenamientos */}
      <section className="bg-brand-red py-20 text-brand-white sm:py-28">
        <div className="mx-auto max-w-5xl px-6 text-center lg:px-8">
          <Reveal>
            <h2 className="font-display text-5xl leading-none sm:text-7xl">
              ¿Listo para entrenar?
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-brand-white/85">
              Conoce nuestros días y horarios de entrenamiento por categoría.
            </p>
            <div className="mt-10">
              <a
                href="/horarios"
                className="inline-flex items-center gap-2 rounded-full border-2 border-brand-white px-10 py-5 font-display text-xl uppercase tracking-widest text-brand-white transition-colors hover:bg-brand-white hover:text-brand-red"
              >
                Ver horarios <span aria-hidden="true">→</span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-brand-white py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-6 text-center lg:px-8">
          <Reveal>
            <SectionTitle
              align="center"
              eyebrow="04 — Inscríbete"
              title="Reserva tu cupo hoy"
              subtitle="Escríbenos por WhatsApp y nuestro equipo te guiará en el proceso de inscripción."
            />
            <div className="mt-10">
              <WhatsAppButton variant="large" label="Hablar por WhatsApp" />
            </div>
            <p className="mt-6 text-sm text-brand-black/60">
              Respondemos en menos de 24 horas.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
