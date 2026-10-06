import Link from "next/link";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import type { Category } from "@/lib/data/categories";

type CategoryCardProps = {
  category: Category;
};

export function CategoryCard({ category }: CategoryCardProps) {
  const message = `Hola, quiero inscribir a mi hijo en la categoría ${category.name} (${category.ageRange}).`;
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-brand-black/10 bg-brand-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-brand-red hover:shadow-2xl hover:shadow-brand-red/20">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-display text-5xl text-brand-black transition-colors group-hover:text-brand-red">
          {category.name}
        </h3>
        <span className="rounded-full bg-brand-black/5 px-3 py-1 font-mono text-xs uppercase tracking-widest text-brand-black/70 group-hover:bg-brand-red group-hover:text-brand-white">
          {category.ageRange}
        </span>
      </div>
      <p className="mt-6 flex-1 text-brand-black/70">{category.description}</p>
      <div className="mt-6 space-y-2 border-t border-brand-black/10 pt-6">
        <p className="font-mono text-xs uppercase tracking-widest text-brand-red">
          {category.schedule}
        </p>
        <ul className="text-sm text-brand-black/60">
          {category.requirements.map((req) => (
            <li key={req}>· {req}</li>
          ))}
        </ul>
      </div>
      <div className="mt-6">
        <Link
          href={buildWhatsAppUrl(message)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-red px-6 py-3 font-display text-sm uppercase tracking-widest text-white transition-colors hover:bg-brand-red-dark"
        >
          Inscríbete a {category.name}
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}