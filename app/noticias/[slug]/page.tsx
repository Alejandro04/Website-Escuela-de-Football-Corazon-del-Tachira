import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/hero";
import { news, getNewsBySlug } from "@/lib/data/news";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return news.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata(
  props: PageProps<"/noticias/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const item = getNewsBySlug(slug);
  if (!item) return { title: "Noticia no encontrada" };
  return {
    title: item.title,
    description: item.summary,
    openGraph: {
      title: item.title,
      description: item.summary,
      images: [item.image],
      locale: "es_VE",
      type: "article",
    },
  };
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("es-VE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function NoticiaDetailPage(props: PageProps<"/noticias/[slug]">) {
  const { slug } = await props.params;
  const item = getNewsBySlug(slug);
  if (!item) notFound();

  return (
    <>
      <Hero
        title={item.title}
        subtitle={formatDate(item.date)}
        variant="dark"
      />

      <article className="bg-brand-white py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-2xl">
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="(min-width: 768px) 768px, 100vw"
              priority
              className="object-cover"
            />
          </div>
          <div
            className="prose prose-lg max-w-none text-brand-black/80 prose-headings:font-display prose-headings:text-brand-black prose-a:text-brand-red hover:prose-a:text-brand-red-dark"
            dangerouslySetInnerHTML={{ __html: item.contentHtml }}
          />
          <div className="mt-16 border-t border-brand-black/10 pt-8">
            <Link
              href="/noticias"
              className="inline-flex items-center gap-2 font-display text-base uppercase tracking-widest text-brand-red hover:text-brand-red-dark"
            >
              <span aria-hidden="true">←</span> Volver a noticias
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}