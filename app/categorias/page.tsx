import type { Metadata } from "next";
import { Hero } from "@/components/hero";
import { SectionTitle } from "@/components/section-title";
import { CategoryCard } from "@/components/category-card";
import { Reveal } from "@/components/reveal";
import { categories } from "@/lib/data/categories";

export const metadata: Metadata = {
  title: "Categorías",
  description:
    "Conoce las categorías de la escuela: Sub-7, Sub-9, Sub-11, Sub-13, Sub-15 y Sub-17.",
};

export default function CategoriasPage() {
  return (
    <>
      <Hero
        title="CATEGORÍAS"
        subtitle="Encuentra la categoría adecuada para tu edad y reserva tu cupo por WhatsApp."
        variant="dark"
      />

      <section className="bg-brand-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <SectionTitle
              eyebrow="01 — Divisiones"
              title="Edades y categorías"
              subtitle="Tenemos una división para cada edad, desde los 5 hasta los 16 años."
            />
          </Reveal>
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, i) => (
              <Reveal key={category.slug} delay={((i % 3) + 1) as 1 | 2 | 3}>
                <CategoryCard category={category} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}