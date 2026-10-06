import Link from "next/link";
import Image from "next/image";
import type { News } from "@/lib/data/news";

type NewsCardProps = {
  news: News;
  variant?: "default" | "featured";
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("es-VE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function NewsCard({ news, variant = "default" }: NewsCardProps) {
  const isFeatured = variant === "featured";

  return (
    <article
      className={`group flex h-full flex-col overflow-hidden rounded-2xl bg-brand-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
        isFeatured ? "lg:flex-row" : ""
      }`}
    >
      <Link
        href={`/noticias/${news.slug}`}
        className={`relative block overflow-hidden ${
          isFeatured ? "aspect-[4/3] lg:aspect-auto lg:w-1/2" : "aspect-[16/10]"
        }`}
      >
        <Image
          src={news.image}
          alt={news.title}
          fill
          sizes={isFeatured ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 768px) 33vw, 100vw"}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </Link>
      <div className={`flex flex-1 flex-col p-6 ${isFeatured ? "lg:w-1/2 lg:p-10" : ""}`}>
        <time className="font-mono text-xs uppercase tracking-widest text-brand-red">
          {formatDate(news.date)}
        </time>
        <h3
          className={`mt-3 font-display leading-none text-brand-black group-hover:text-brand-red ${
            isFeatured ? "text-4xl sm:text-5xl" : "text-2xl"
          }`}
        >
          <Link href={`/noticias/${news.slug}`}>{news.title}</Link>
        </h3>
        <p className="mt-4 flex-1 text-brand-black/70">{news.summary}</p>
        <Link
          href={`/noticias/${news.slug}`}
          className="mt-6 inline-flex items-center gap-2 font-display text-sm uppercase tracking-widest text-brand-red hover:text-brand-red-dark"
        >
          Leer más <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}