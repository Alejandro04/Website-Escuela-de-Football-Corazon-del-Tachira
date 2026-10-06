export type News = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  image: string;
  contentHtml: string;
};

export const news: News[] = [
  {
    slug: "abrimos-inscripciones-2026",
    title: "Abrimos inscripciones para la temporada 2026",
    date: "2026-09-15",
    summary:
      "Desde el 1 de octubre recibimos nuevos talentos en todas las categorías, desde Sub-7 hasta Sub-17.",
    image: "/images/news/placeholder.jpg",
    contentHtml: `
        <p>La escuela Corazón del Táchira FC abre sus inscripciones para la temporada 2026 en todas sus divisiones, desde Sub-7 hasta Sub-17.</p>
        <p>Las familias interesadas pueden acercarse a nuestra sede los días lunes a viernes de 4:00 PM a 6:00 PM, o escribirnos directamente por WhatsApp.</p>
        <h2>Requisitos</h2>
        <ul>
          <li>Certificado médico vigente</li>
          <li>Fotocopia de cédula o partida de nacimiento</li>
          <li>Foto tipo carnet</li>
        </ul>
        <p>¡Los esperamos para compartir una nueva temporada de mucho fútbol y corazón!</p>
      `.trim(),
  },
  {
    slug: "copa-regional-2026-tercer-lugar",
    title: "Nuestra Sub-13 logró el tercer lugar en la Copa Regional",
    date: "2026-08-20",
    summary:
      "Una actuación memorable del equipo Sub-13 en la Copa Regional Andina 2026, con un plantel que promete mucho para los próximos torneos.",
    image: "/images/news/placeholder.jpg",
    contentHtml: `
        <p>El equipo Sub-13 de Corazón del Táchira FC culminó su participación en la Copa Regional Andina 2026 con un meritorio tercer lugar.</p>
        <p>Tras cuatro victorias en fase de grupos y una derrota ajustada en semifinales, los chicos regresan a casa con la motivación al máximo y la mira puesta en el próximo torneo.</p>
        <p>Felicitaciones al cuerpo técnico y a cada uno de los jugadores por el esfuerzo y la dedicación.</p>
      `.trim(),
  },
  {
    slug: "nuevo-cuerpo-tecnico",
    title: "Bienvenida al nuevo cuerpo técnico preparado",
    date: "2026-07-10",
    summary:
      "Incorporamos nuevos entrenadores con licencia federativa para reforzar la formación de nuestros jugadores.",
    image: "/images/news/placeholder.jpg",
    contentHtml: `
        <p>La escuela Corazón del Táchira FC refuerza su cuerpo técnico con la incorporación de dos entrenadores con licencia federativa tipo A.</p>
        <p>Ambos profesionales vienen de experiencias en clubes de la región andina y traen consigo metodologías modernas de enseñanza enfocadas en el desarrollo integral del jugador.</p>
      `.trim(),
  },
];

export function getNewsBySlug(slug: string): News | undefined {
  return news.find((n) => n.slug === slug);
}