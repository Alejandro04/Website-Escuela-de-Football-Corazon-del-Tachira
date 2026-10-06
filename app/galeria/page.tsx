import type { Metadata } from "next";
import { Hero } from "@/components/hero";
import { GalleryGrid } from "@/components/gallery-grid";
import { Reveal } from "@/components/reveal";
import { gallery } from "@/lib/data/gallery";

export const metadata: Metadata = {
  title: "Galería",
  description: "Fotos de entrenamientos, partidos y eventos de la escuela.",
};

export default function GaleriaPage() {
  return (
    <>
      <Hero
        title="GALERÍA"
        subtitle="Entrenamientos, partidos, eventos y momentos que vivimos como familia."
        variant="dark"
      />

      <section className="bg-brand-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <GalleryGrid albums={gallery} />
          </Reveal>
        </div>
      </section>
    </>
  );
}