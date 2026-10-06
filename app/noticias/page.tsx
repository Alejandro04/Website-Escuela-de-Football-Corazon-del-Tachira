import type { Metadata } from "next";
import { Hero } from "@/components/hero";
import { NewsCard } from "@/components/news-card";
import { Reveal } from "@/components/reveal";
import { news } from "@/lib/data/news";

export const metadata: Metadata = {
  title: "Noticias",
  description: "Novedades, anuncios y resultados de la escuela Corazón del Táchira FC.",
};

export default function NoticiasPage() {
  return (
    <>
      <Hero
        title="NOTICIAS"
        subtitle="Lo más reciente del club: anuncios, torneos y resultados."
        variant="dark"
      />

      <section className="bg-brand-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {news.map((item, i) => (
              <Reveal key={item.slug} delay={((i % 3) + 1) as 1 | 2 | 3}>
                <NewsCard news={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}