# Sitio web — Corazón del Táchira FC Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir el sitio web multi-página de la escuela de fútbol Corazón del Táchira FC, con contenido estático, CTAs de WhatsApp, estilo visual audaz en español, listo para desplegar en Vercel.

**Architecture:** Next.js 16 App Router (sitio estático, sin backend). Contenido en archivos TS tipados en `lib/data/`. Componentes server por defecto, client solo donde hay interacción (Reveal, WhatsAppButton, formulario). Estilo audaz con paleta roja/negra, tipografía Bebas Neue + Geist, animaciones CSS puras.

**Tech Stack:** Next.js 16.3.8 (App Router) · React 19.2.8 · Tailwind CSS v4 · TypeScript · `next/font/google` (Bebas Neue, Geist, Geist Mono). Cero dependencias nuevas.

---

## Global Constraints

- **Next.js 16:** `params` es **Promise** — usar `await params` o `React.use()` en páginas con rutas dinámicas. Helpers globales `LayoutProps<"/">` y `PageProps<'/route'>` disponibles (sin import).
- **Alias:** `@/*` apunta a la raíz del proyecto (ya configurado en `tsconfig.json`).
- **Tailwind v4:** tokens vía `@theme inline` en `globals.css` con `var(--token)` references.
- **Sin dependencias nuevas:** no agregar paquetes a `package.json`.
- **Idioma:** todo el contenido en español. `lang="es"` en `<html>`.
- **Paleta:** solo los tokens definidos en `globals.css`. No usar hex literales en componentes.
- **Tipografía:** Bebas Neue para display (`font-display`), Geist Sans para cuerpo, Geist Mono para acentos.
- **Imágenes:** `next/image` con `sizes` siempre. Solo `<Image priority>` en hero de Inicio.
- **Git:** el proyecto **no es un repositorio git**. Cada paso de "commit" del template está reemplazado por **verificación** (`npm run lint` + `npm run build`). El usuario puede inicializar git por separado si lo desea.
- **Datos placeholder:** los archivos de datos usan contenido placeholder marcado con `// TODO: usuario` para que sean editables después. No bloquean la implementación.
- **Verificación de imagen asset:** el archivo del escudo está en `C:\Users\alejo\OneDrive\Desktop\references\escudo.png` y debe copiarse a `public/escudo.png`.

---

## File Structure (resumen)

```
cdeltachira/
├── app/
│   ├── layout.tsx                 [M]
│   ├── page.tsx                    [M]
│   ├── globals.css                [M]
│   ├── not-found.tsx              [C]
│   ├── sitemap.ts                 [C]
│   ├── manifest.ts                [C]
│   ├── robots.ts                  [C]
│   ├── escuela/page.tsx           [C]
│   ├── categorias/page.tsx        [C]
│   ├── horarios/page.tsx          [C]
│   ├── galeria/page.tsx           [C]
│   ├── noticias/page.tsx          [C]
│   ├── noticias/[slug]/page.tsx   [C]
│   └── contacto/page.tsx          [C]
├── components/
│   ├── header.tsx                 [C]
│   ├── footer.tsx                 [C]
│   ├── hero.tsx                   [C]
│   ├── section-title.tsx          [C]
│   ├── whatsapp-button.tsx        [C]
│   ├── reveal.tsx                 [C]
│   ├── category-card.tsx          [C]
│   ├── news-card.tsx              [C]
│   ├── schedule-table.tsx         [C]
│   ├── gallery-grid.tsx            [C]
│   └── contact-form.tsx           [C]
└── lib/
    ├── whatsapp.ts                [C]
    └── data/
        ├── site.ts                [C]
        ├── categories.ts          [C]
        ├── schedule.ts            [C]
        ├── news.ts                [C]
        └── gallery.ts             [C]

[M] = Modificar existente · [C] = Crear nuevo
```

---

## Task 1: Sistema de diseño base (CSS tokens, fonts, layout shell)

**Files:**
- Modify: `app/globals.css` (reemplazar contenido)
- Modify: `app/layout.tsx` (reemplazar contenido)

**Interfaces:**
- Produce (CSS vars): `--background`, `--foreground`, `--color-brand-red`, `--color-brand-red-dark`, `--color-brand-black`, `--color-brand-white`, `--font-display`, `--font-sans`, `--font-mono`, keyframes `fadeUp`

### Step 1.1: Reemplazar `app/globals.css` con tokens de marca

```css
@import "tailwindcss";

:root {
  --color-brand-red: #BD1C24;
  --color-brand-red-dark: #8C1118;
  --color-brand-black: #1A1818;
  --color-brand-white: #FFFFFF;
  --background: #FFFFFF;
  --foreground: #1A1818;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-brand-red: var(--color-brand-red);
  --color-brand-red-dark: var(--color-brand-red-dark);
  --color-brand-black: var(--color-brand-black);
  --color-brand-white: var(--color-brand-white);
  --font-display: var(--font-bebas);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

html {
  scroll-behavior: smooth;
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: var(--font-sans), Arial, Helvetica, sans-serif;
}

.font-display {
  font-family: var(--font-display), Impact, sans-serif;
  letter-spacing: -0.01em;
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(1.5rem); }
  to   { opacity: 1; transform: translateY(0); }
}

.reveal {
  opacity: 0;
}

.reveal.is-visible {
  animation: fadeUp 0.7s ease-out forwards;
}

.reveal-delay-1 { animation-delay: 0.1s; }
.reveal-delay-2 { animation-delay: 0.2s; }
.reveal-delay-3 { animation-delay: 0.3s; }

@keyframes pulseScale {
  0%, 100% { transform: scale(1); }
  50%      { transform: scale(1.04); }
}

.animate-pulse-scale {
  animation: pulseScale 4s ease-in-out infinite;
}
```

### Step 1.2: Reemplazar `app/layout.tsx`

```tsx
import type { Metadata } from "next";
import { Bebas_Neue, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas",
  subsets: ["latin"],
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Corazón del Táchira FC — Escuela de Fútbol",
    template: "%s · Corazón del Táchira FC",
  },
  description:
    "Escuela de fútbol infantil y juvenil en Michelena, Táchira. Formación integral con valores, categorías sub-7 hasta sub-17.",
  metadataBase: new URL("https://corazondeltachirafc.com"),
  openGraph: {
    title: "Corazón del Táchira FC",
    description: "Escuela de fútbol con corazón andino.",
    locale: "es_VE",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${bebasNeue.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-brand-white text-brand-black">
        {children}
      </body>
    </html>
  );
}
```

### Step 1.3: Verificar

```powershell
npm run build
npm run lint
```

**Expected:** Build compila sin errores. La página de inicio (aún con el boilerplate) sigue funcionando pero hereda el fondo blanco y las fuentes.

---

## Task 2: Asset del escudo

**Files:**
- Create: `public/escudo.png` (copia desde OneDrive)

### Step 2.1: Copiar el escudo al proyecto

```powershell
Copy-Item -LiteralPath "C:\Users\alejo\OneDrive\Desktop\references\escudo.png" -Destination "C:\Users\alejo\Documents\ProyectosPersonales\EscuelaFutbol\cdeltachira\public\escudo.png"
```

### Step 2.2: Verificar que existe

```powershell
Test-Path -LiteralPath "C:\Users\alejo\Documents\ProyectosPersonales\EscuelaFutbol\cdeltachira\public\escudo.png"
```

**Expected:** `True`.

---

## Task 3: Capa de datos y helper de WhatsApp

**Files:**
- Create: `lib/data/site.ts`
- Create: `lib/data/categories.ts`
- Create: `lib/data/schedule.ts`
- Create: `lib/data/news.ts`
- Create: `lib/data/gallery.ts`
- Create: `lib/whatsapp.ts`

**Interfaces producidas:**
- `site` (objeto exportado, todos los campos del spec sección 6)
- `Category`, `Category[]` (export `categories`)
- `ScheduleEntry`, `ScheduleEntry[]` (export `schedule`)
- `News`, `News[]` (export `news`)
- `GalleryAlbum`, `GalleryAlbum[]` (export `gallery`)
- `buildWhatsAppUrl(message: string): string` (helper)

### Step 3.1: `lib/data/site.ts`

```ts
// TODO: usuario — completar con datos reales del club antes de producción.
export const site = {
  name: "Corazón del Táchira FC",
  shortName: "CDT FC",
  tagline: "Escuela de Fútbol — Michelena, Táchira",
  description:
    "Escuela de fútbol infantil y juvenil con formación integral y valores andinos en el corazón del Táchira.",
  whatsapp: "584141234567", // TODO: usuario — número real sin '+'
  whatsappMessage:
    "Hola, quiero información sobre la escuela Corazón del Táchira FC.",
  phone: ["+58 414 123 4567"], // TODO: usuario
  email: "contacto@corazondeltachirafc.com", // TODO: usuario
  address: "Cancha Municipal, Michelena, Táchira, Venezuela", // TODO: usuario
  mapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15714.5!2d-72.27!3d7.95!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwNTcnMDAuMCJOIDcywrAxNicxMi4wIlc!5e0!3m2!1ses-419!2sve!4v1700000000000",
  socials: {
    instagram: "corazondeltachirafc",
    facebook: "corazondeltachirafc", // TODO: usuario
    tiktok: "corazondeltachirafc",   // TODO: usuario
  },
};

export const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/escuela", label: "Escuela" },
  { href: "/categorias", label: "Categorías" },
  { href: "/horarios", label: "Horarios" },
  { href: "/galeria", label: "Galería" },
  { href: "/noticias", label: "Noticias" },
  { href: "/contacto", label: "Contacto" },
];
```

### Step 3.2: `lib/data/categories.ts`

```ts
export type Category = {
  slug: string;
  name: string;
  ageRange: string;
  schedule: string;
  description: string;
  requirements: string[];
};

export const categories: Category[] = [
  {
    slug: "sub-7",
    name: "Sub-7",
    ageRange: "5 a 6 años",
    schedule: "Martes y jueves · 4:00 PM a 5:30 PM",
    description:
      "Iniciación deportiva con juegos, motricidad básica y primeros contactos con el balón. Ambiente lúdico y seguro.",
    requirements: ["Certificado médico", "Ropa deportiva", "Ganas de divertirse"],
  },
  {
    slug: "sub-9",
    name: "Sub-9",
    ageRange: "7 a 8 años",
    schedule: "Lunes, miércoles y viernes · 4:00 PM a 5:30 PM",
    description:
      "Desarrollo de habilidades técnicas fundamentales y trabajo de coordinación en grupos reducidos.",
    requirements: ["Certificado médico", "Botines", "Ropa deportiva"],
  },
  {
    slug: "sub-11",
    name: "Sub-11",
    ageRange: "9 a 10 años",
    schedule: "Lunes, miércoles y viernes · 4:30 PM a 6:00 PM",
    description:
      "Táctica básica, dominio del balón y partidos reducidos. Introducción al juego de conjunto.",
    requirements: ["Certificado médico", "Botines", "Ropa deportiva", "Disponibilidad para partidos"],
  },
  {
    slug: "sub-13",
    name: "Sub-13",
    ageRange: "11 a 12 años",
    schedule: "Martes, jueves y sábado · 4:30 PM a 6:00 PM",
    description:
      "Formación táctica avanzada, posición específica y preparación para competencias regionales.",
    requirements: ["Certificado médico", "Botines", "Ropa deportiva"],
  },
  {
    slug: "sub-15",
    name: "Sub-15",
    ageRange: "13 a 14 años",
    schedule: "Lunes a jueves · 5:00 PM a 7:00 PM",
    description:
      "Alto rendimiento con énfasis en estrategia, condición física y participación en torneos federados.",
    requirements: ["Certificado médico actualizado", "Botines", "Compromiso semanal"],
  },
  {
    slug: "sub-17",
    name: "Sub-17",
    ageRange: "15 a 16 años",
    schedule: "Lunes a jueves · 5:30 PM a 7:30 PM",
    description:
      "Puente hacia el fútbol competitivo. Plan físico profesional, scouting y proyección deportiva.",
    requirements: ["Certificado médico", "Botines", "Alta dedicación"],
  },
];
```

### Step 3.3: `lib/data/schedule.ts`

```ts
export type ScheduleEntry = {
  category: string;
  days: string[];
  time: string;
  location: string;
};

export const schedule: ScheduleEntry[] = [
  { category: "Sub-7",  days: ["Mar", "Jue"],          time: "16:00 - 17:30", location: "Cancha A" },
  { category: "Sub-9",  days: ["Lun", "Mié", "Vie"],   time: "16:00 - 17:30", location: "Cancha A" },
  { category: "Sub-11", days: ["Lun", "Mié", "Vie"],   time: "16:30 - 18:00", location: "Cancha B" },
  { category: "Sub-13", days: ["Mar", "Jue", "Sáb"],   time: "16:30 - 18:00", location: "Cancha B" },
  { category: "Sub-15", days: ["Lun", "Mar", "Mié", "Jue"], time: "17:00 - 19:00", location: "Cancha Principal" },
  { category: "Sub-17", days: ["Lun", "Mar", "Mié", "Jue"], time: "17:30 - 19:30", location: "Cancha Principal" },
];
```

### Step 3.4: `lib/data/news.ts`

```ts
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
```

> **Nota:** Las imágenes de noticias (`/images/news/placeholder.jpg`) se generan como imágenes placeholder en `app/placeholder.ts` usando SVG inline, ver Task 11. Mientras tanto, no romperán el build porque `next/image` solo exige las imágenes cuando se renderiza con `priority` o si se hace fetch.

### Step 3.5: `lib/data/gallery.ts`

```ts
export type GalleryAlbum = {
  id: string;
  title: string;
  date: string;
  cover: string;
  photos: string[];
};

export const gallery: GalleryAlbum[] = [
  {
    id: "copa-andina-2026",
    title: "Copa Andina 2026",
    date: "2026-08",
    cover: "/images/gallery/copa-andina-2026/cover.jpg",
    photos: [
      "/images/gallery/copa-andina-2026/01.jpg",
      "/images/gallery/copa-andina-2026/02.jpg",
      "/images/gallery/copa-andina-2026/03.jpg",
      "/images/gallery/copa-andina-2026/04.jpg",
    ],
  },
  {
    id: "entrenamientos-primavera",
    title: "Entrenamientos de primavera",
    date: "2026-04",
    cover: "/images/gallery/entrenamientos-primavera/cover.jpg",
    photos: [
      "/images/gallery/entrenamientos-primavera/01.jpg",
      "/images/gallery/entrenamientos-primavera/02.jpg",
      "/images/gallery/entrenamientos-primavera/03.jpg",
    ],
  },
  {
    id: "inauguracion-cancha",
    title: "Inauguración cancha sintética",
    date: "2026-02",
    cover: "/images/gallery/inauguracion-cancha/cover.jpg",
    photos: [
      "/images/gallery/inauguracion-cancha/01.jpg",
      "/images/gallery/inauguracion-cancha/02.jpg",
    ],
  },
];

export function getAlbumById(id: string): GalleryAlbum | undefined {
  return gallery.find((a) => a.id === id);
}
```

### Step 3.6: `lib/whatsapp.ts`

```ts
import { site } from "@/lib/data/site";

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function defaultWhatsAppMessage(): string {
  return site.whatsappMessage;
}
```

### Step 3.7: Verificar

```powershell
npm run build
npm run lint
```

**Expected:** Build y lint pasan sin errores. Los tipos están bien definidos.

---

## Task 4: Componentes atómicos compartidos (Reveal, WhatsAppButton, SectionTitle)

**Files:**
- Create: `components/reveal.tsx`
- Create: `components/whatsapp-button.tsx`
- Create: `components/section-title.tsx`

**Interfaces:**
- `Reveal({ children, className?, delay?: 1|2|3 })` — client component, `IntersectionObserver`
- `WhatsAppButton({ message?, label?, variant?: "floating"|"inline", className? })`
- `SectionTitle({ eyebrow?, title, subtitle?, align?: "left"|"center" })`

### Step 4.1: `components/reveal.tsx`

```tsx
"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: 1 | 2 | 3;
};

export function Reveal({ children, className = "", delay }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const delayClass = delay ? `reveal-delay-${delay}` : "";
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${delayClass} ${className}`.trim()}
    >
      {children}
    </div>
  );
}
```

### Step 4.2: `components/whatsapp-button.tsx`

```tsx
import Link from "next/link";
import { buildWhatsAppUrl, defaultWhatsAppMessage } from "@/lib/whatsapp";

type WhatsAppButtonProps = {
  message?: string;
  label?: string;
  variant?: "floating" | "inline" | "large";
  className?: string;
};

export function WhatsAppButton({
  message,
  label = "Escríbenos por WhatsApp",
  variant = "inline",
  className = "",
}: WhatsAppButtonProps) {
  const href = buildWhatsAppUrl(message ?? defaultWhatsAppMessage());

  if (variant === "floating") {
    return (
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Abrir chat de WhatsApp"
        className={`fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/30 transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366] ${className}`}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 32 32"
          className="h-7 w-7 fill-current"
        >
          <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.402-1.46-2.1-.072-.236-.077-.372-.018-.492.07-.142.272-.247.482-.247.118 0 .236.018.354.072.197.064.39.142.572.236.26.108.497.246.722.4.18.118.327.246.473.39.118.108.236.236.354.354.118.118.2.236.272.354.064.108.118.236.072.354-.046.118-.118.236-.236.354-.118.118-.272.236-.39.354-.118.118-.236.236-.354.354-.118.118-.2.236-.2.39 0 .154.082.308.2.49.118.18.272.39.49.608.118.118.236.272.39.4.154.13.308.236.462.327.154.09.308.18.462.236.154.054.272.082.39 0 .118-.082.236-.2.354-.354.118-.154.236-.308.39-.462.154-.154.308-.272.49-.354.18-.082.354-.118.49-.054.236.082.49.272.722.49.118.118.236.236.354.354.118.118.236.236.354.39.118.154.236.272.354.39.118.118.236.236.272.354.072.18.054.354-.054.49-.118.154-.272.272-.49.354-.154.072-.308.118-.462.154-.154.036-.308.054-.49.054zm5.78-3.205C24.89 8.85 19.4 4 12.79 4 6.18 4 1 9.18 1 15.79c0 2.59.7 5.05 1.96 7.21L1 28l5.18-1.96c2.11 1.16 4.49 1.77 6.96 1.77 6.61 0 11.79-5.18 11.79-11.79 0-3.4-1.36-6.43-3.55-8.55M12.79 26c-2.21 0-4.36-.6-6.21-1.71l-.45-.27-3.07 1.16 1.16-3.07-.27-.45C2.05 19.66 1.4 17.5 1.4 15.29c0-5.66 4.66-6.49 6.49-6.49 2.4 0 4.66.94 6.43 2.71 1.77 1.77 2.71 4.04 2.71 6.43 0 5.66-4.66 6.49-6.49 6.49z" />
        </svg>
      </Link>
    );
  }

  if (variant === "large") {
    return (
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center justify-center gap-3 rounded-full bg-brand-red px-10 py-5 font-display text-xl uppercase tracking-widest text-white transition-colors hover:bg-brand-red-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red ${className}`}
      >
        {label}
        <span aria-hidden="true">→</span>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-brand-red px-8 py-4 font-display text-base uppercase tracking-widest text-white transition-colors hover:bg-brand-red-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red ${className}`}
    >
      {label}
      <span aria-hidden="true">→</span>
    </Link>
  );
}
```

### Step 4.3: `components/section-title.tsx`

```tsx
type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
};

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = "left",
  tone = "dark",
  className = "",
}: SectionTitleProps) {
  const isCenter = align === "center";
  const textColor = tone === "light" ? "text-brand-white" : "text-brand-black";
  const subColor = tone === "light" ? "text-brand-white/80" : "text-brand-black/70";
  const lineColor = "bg-brand-red";

  return (
    <div
      className={`${isCenter ? "text-center mx-auto" : "text-left"} max-w-3xl ${className}`}
    >
      {eyebrow && (
        <div
          className={`flex ${isCenter ? "justify-center" : ""} items-center gap-3 mb-4`}
        >
          <span className={`h-px w-10 ${lineColor}`} aria-hidden="true" />
          <span className="font-mono text-xs uppercase tracking-widest text-brand-red">
            {eyebrow}
          </span>
        </div>
      )}
      <h2
        className={`font-display text-4xl leading-none sm:text-5xl md:text-6xl lg:text-7xl ${textColor}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-6 text-base leading-relaxed sm:text-lg ${subColor}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
```

### Step 4.4: Verificar

```powershell
npm run build
npm run lint
```

**Expected:** Build pasa. Lint pasa.

---

## Task 5: Componentes de layout (Header, Footer, Hero)

**Files:**
- Create: `components/header.tsx`
- Create: `components/footer.tsx`
- Create: `components/hero.tsx`

**Interfaces:**
- `Header()` — client component (mobile menu con estado)
- `Footer()` — server component
- `Hero({ title, subtitle, cta?, secondaryCta?, variant?: "primary"|"dark" })` — server component

### Step 5.1: `components/header.tsx`

```tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks } from "@/lib/data/site";
import { WhatsAppButton } from "@/components/whatsapp-button";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const headerBg = scrolled || open
    ? "bg-brand-black/95 backdrop-blur-md"
    : "bg-brand-black/40 backdrop-blur-sm";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${headerBg}`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/escudo.png"
              alt="Escudo Corazón del Táchira FC"
              width={40}
              height={40}
              className="h-10 w-10 object-contain"
            />
            <span className="font-display text-xl tracking-wide text-brand-white">
              CORAZÓN DEL TÁCHIRA
            </span>
          </Link>

          <nav aria-label="Navegación principal" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`text-sm font-medium uppercase tracking-widest transition-colors hover:text-brand-red ${
                        isActive ? "text-brand-red" : "text-brand-white"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="hidden lg:block">
            <WhatsAppButton
              variant="inline"
              label="Inscríbete"
              className="!px-6 !py-3 !text-sm"
            />
          </div>

          <button
            type="button"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="relative h-10 w-10 lg:hidden"
          >
            <span
              className={`absolute left-1/2 top-1/2 block h-0.5 w-7 -translate-x-1/2 bg-brand-white transition-transform duration-300 ${
                open ? "translate-y-0 rotate-45" : "-translate-y-2"
              }`}
            />
            <span
              className={`absolute left-1/2 top-1/2 block h-0.5 w-7 -translate-x-1/2 bg-brand-white transition-opacity duration-300 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-1/2 top-1/2 block h-0.5 w-7 -translate-x-1/2 bg-brand-white transition-transform duration-300 ${
                open ? "translate-y-0 -rotate-45" : "translate-y-2"
              }`}
            />
          </button>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={`fixed inset-0 z-30 bg-brand-red transition-opacity duration-300 lg:hidden ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
      >
        <nav
          aria-label="Navegación móvil"
          className="flex h-full flex-col items-center justify-center gap-8 pt-20"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-display text-4xl uppercase text-brand-white hover:text-brand-white/70"
            >
              {link.label}
            </Link>
          ))}
          <WhatsAppButton variant="large" label="Inscríbete por WhatsApp" />
        </nav>
      </div>
    </>
  );
}
```

### Step 5.2: `components/footer.tsx`

```tsx
import Link from "next/link";
import Image from "next/image";
import { site, navLinks } from "@/lib/data/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-black text-brand-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/escudo.png"
              alt="Escudo Corazón del Táchira FC"
              width={48}
              height={48}
              className="h-12 w-12 object-contain"
            />
            <span className="font-display text-2xl tracking-wide">
              CORAZÓN DEL TÁCHIRA FC
            </span>
          </Link>
          <p className="mt-6 max-w-md text-brand-white/70">{site.description}</p>
        </div>

        <div>
          <h3 className="font-mono text-xs uppercase tracking-widest text-brand-red">
            Navegación
          </h3>
          <ul className="mt-4 space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-brand-white/80 hover:text-brand-red"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-mono text-xs uppercase tracking-widest text-brand-red">
            Contacto
          </h3>
          <ul className="mt-4 space-y-3 text-brand-white/80">
            <li>
              <a
                href={`https://wa.me/${site.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-red"
              >
                WhatsApp
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-brand-red">
                {site.email}
              </a>
            </li>
            {site.phone.map((phone) => (
              <li key={phone}>
                <a href={`tel:${phone.replace(/\s/g, "")}`} className="hover:text-brand-red">
                  {phone}
                </a>
              </li>
            ))}
            <li className="text-brand-white/60">{site.address}</li>
          </ul>
          <div className="mt-6 flex items-center gap-4">
            <a
              href={`https://instagram.com/${site.socials.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-brand-white/70 hover:text-brand-red"
            >
              IG
            </a>
            <a
              href={`https://facebook.com/${site.socials.facebook}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-brand-white/70 hover:text-brand-red"
            >
              FB
            </a>
            <a
              href={`https://tiktok.com/@${site.socials.tiktok}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="text-brand-white/70 hover:text-brand-red"
            >
              TT
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-brand-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-6 text-xs text-brand-white/50 sm:flex-row lg:px-8">
          <p>
            © {year} {site.name}. Todos los derechos reservados.
          </p>
          <p>Hecho con corazón andino.</p>
        </div>
      </div>
    </footer>
  );
}
```

### Step 5.3: `components/hero.tsx`

```tsx
import Image from "next/image";
import Link from "next/link";
import { WhatsAppButton } from "@/components/whatsapp-button";

type HeroProps = {
  title: string;
  subtitle?: string;
  cta?: { label: string; href: string };
  showMainCta?: boolean;
  variant?: "primary" | "dark";
  eyebrow?: string;
};

export function Hero({
  title,
  subtitle,
  cta,
  showMainCta = true,
  variant = "primary",
  eyebrow,
}: HeroProps) {
  const isPrimary = variant === "primary";
  const bg = isPrimary ? "bg-brand-red" : "bg-brand-black";
  const textColor = "text-brand-white";
  const overlay = "before:absolute before:inset-0 before:bg-gradient-to-b before:from-black/30 before:via-transparent before:to-black/40";

  return (
    <section className={`relative isolate overflow-hidden ${bg} ${textColor} ${overlay} pt-32 pb-20 sm:pt-40 sm:pb-28 lg:pt-48 lg:pb-36`}>
      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-8 px-6 text-center lg:px-8">
        {eyebrow && (
          <span className="font-mono text-xs uppercase tracking-[0.4em] text-brand-white/80">
            {eyebrow}
          </span>
        )}
        <Image
          src="/escudo.png"
          alt="Escudo Corazón del Táchira FC"
          width={180}
          height={180}
          priority
          className="h-32 w-32 sm:h-44 sm:w-44 animate-pulse-scale"
        />
        <h1 className="font-display text-5xl leading-[0.9] tracking-tight sm:text-7xl md:text-8xl lg:text-[10rem]">
          {title}
        </h1>
        {subtitle && (
          <p className="max-w-2xl text-base text-brand-white/85 sm:text-xl">
            {subtitle}
          </p>
        )}
        <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row">
          {showMainCta && <WhatsAppButton variant="large" label="Inscríbete por WhatsApp" />}
          {cta && (
            <Link
              href={cta.href}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-brand-white px-8 py-4 font-display text-base uppercase tracking-widest text-brand-white transition-colors hover:bg-brand-white hover:text-brand-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-white"
            >
              {cta.label}
              <span aria-hidden="true">→</span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
```

### Step 5.4: Verificar

```powershell
npm run build
npm run lint
```

**Expected:** Build pasa. Lint pasa.

---

## Task 6: Componentes específicos de página (CategoryCard, NewsCard, ScheduleTable, GalleryGrid)

**Files:**
- Create: `components/category-card.tsx`
- Create: `components/news-card.tsx`
- Create: `components/schedule-table.tsx`
- Create: `components/gallery-grid.tsx`

**Interfaces:**
- `CategoryCard({ category: Category })`
- `NewsCard({ news: News, variant?: "default"|"featured" })`
- `ScheduleTable({ entries: ScheduleEntry[] })`
- `GalleryGrid({ albums: GalleryAlbum[] })` — client component con lightbox usando `<dialog>`

### Step 6.1: `components/category-card.tsx`

```tsx
import { WhatsAppButton } from "@/components/whatsapp-button";
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

import Link from "next/link";
```

> **Nota:** El `import Link from "next/link"` está al final del archivo solo por brevedad en este bloque. En el archivo real debe ir al inicio con los demás imports.

### Step 6.2: `components/news-card.tsx`

```tsx
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
```

### Step 6.3: `components/schedule-table.tsx`

```tsx
import type { ScheduleEntry } from "@/lib/data/schedule";

type ScheduleTableProps = {
  entries: ScheduleEntry[];
};

export function ScheduleTable({ entries }: ScheduleTableProps) {
  return (
    <div>
      {/* Desktop */}
      <div className="hidden overflow-hidden rounded-2xl border border-brand-black/10 md:block">
        <table className="w-full text-left">
          <thead className="bg-brand-black text-brand-white">
            <tr>
              <th className="px-6 py-4 font-mono text-xs uppercase tracking-widest">
                Categoría
              </th>
              <th className="px-6 py-4 font-mono text-xs uppercase tracking-widest">
                Días
              </th>
              <th className="px-6 py-4 font-mono text-xs uppercase tracking-widest">
                Horario
              </th>
              <th className="px-6 py-4 font-mono text-xs uppercase tracking-widest">
                Cancha
              </th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, idx) => (
              <tr
                key={entry.category}
                className={idx % 2 === 0 ? "bg-brand-white" : "bg-brand-black/[.02]"}
              >
                <td className="px-6 py-4 font-display text-2xl text-brand-black">
                  {entry.category}
                </td>
                <td className="px-6 py-4 text-brand-black/80">
                  {entry.days.join(" · ")}
                </td>
                <td className="px-6 py-4 text-brand-black/80">{entry.time}</td>
                <td className="px-6 py-4 text-brand-black/80">{entry.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <div className="grid gap-4 md:hidden">
        {entries.map((entry) => (
          <article
            key={entry.category}
            className="rounded-2xl border border-brand-black/10 bg-brand-white p-6"
          >
            <h3 className="font-display text-3xl text-brand-black">
              {entry.category}
            </h3>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="font-mono text-xs uppercase tracking-widest text-brand-red">
                  Días
                </dt>
                <dd className="text-brand-black/80">{entry.days.join(" · ")}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-mono text-xs uppercase tracking-widest text-brand-red">
                  Horario
                </dt>
                <dd className="text-brand-black/80">{entry.time}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-mono text-xs uppercase tracking-widest text-brand-red">
                  Cancha
                </dt>
                <dd className="text-brand-black/80">{entry.location}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </div>
  );
}
```

### Step 6.4: `components/gallery-grid.tsx`

```tsx
"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { GalleryAlbum } from "@/lib/data/gallery";

type GalleryGridProps = {
  albums: GalleryAlbum[];
};

export function GalleryGrid({ albums }: GalleryGridProps) {
  const [activeAlbum, setActiveAlbum] = useState<GalleryAlbum | null>(null);
  const [activePhoto, setActivePhoto] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (activePhoto) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [activePhoto]);

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {albums.map((album) => (
          <button
            key={album.id}
            type="button"
            onClick={() => setActiveAlbum(album)}
            className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-brand-black text-left"
          >
            <Image
              src={album.cover}
              alt={album.title}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-brand-white">
              <p className="font-mono text-xs uppercase tracking-widest text-brand-red">
                {album.date}
              </p>
              <h3 className="mt-2 font-display text-3xl">{album.title}</h3>
              <p className="mt-2 text-sm text-brand-white/80">
                {album.photos.length} fotos
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Album modal */}
      <dialog
        ref={dialogRef}
        className="m-0 max-h-screen max-w-screen w-screen bg-brand-black p-0 text-brand-white backdrop:bg-black/90"
        onClose={() => {
          setActivePhoto(null);
          if (!activePhoto) setActiveAlbum(null);
        }}
        onClick={(e) => {
          if (e.target === dialogRef.current && !activePhoto) {
            setActiveAlbum(null);
          }
        }}
      >
        {activeAlbum && !activePhoto && (
          <div className="mx-auto max-w-6xl p-6 sm:p-10">
            <div className="mb-8 flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-brand-red">
                  {activeAlbum.date}
                </p>
                <h2 className="mt-2 font-display text-4xl">{activeAlbum.title}</h2>
              </div>
              <button
                type="button"
                onClick={() => setActiveAlbum(null)}
                className="rounded-full border border-brand-white/20 px-4 py-2 font-mono text-xs uppercase tracking-widest hover:bg-brand-white hover:text-brand-black"
                aria-label="Cerrar"
              >
                Cerrar
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {activeAlbum.photos.map((photo) => (
                <button
                  key={photo}
                  type="button"
                  onClick={() => setActivePhoto(photo)}
                  className="group relative aspect-square overflow-hidden rounded-xl"
                >
                  <Image
                    src={photo}
                    alt={activeAlbum.title}
                    fill
                    sizes="(min-width: 640px) 33vw, 50vw"
                    className="object-cover grayscale transition-all duration-300 group-hover:scale-105 group-hover:grayscale-0"
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {activePhoto && (
          <div className="flex h-[80vh] items-center justify-center p-6">
            <button
              type="button"
              onClick={() => setActivePhoto(null)}
              className="absolute right-4 top-4 rounded-full border border-brand-white/20 px-4 py-2 font-mono text-xs uppercase tracking-widest hover:bg-brand-white hover:text-brand-black"
            >
              Volver
            </button>
            <div className="relative h-full w-full">
              <Image
                src={activePhoto}
                alt="Foto"
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
```

### Step 6.5: Verificar

```powershell
npm run build
npm run lint
```

**Expected:** Build pasa. Lint pasa.

---

## Task 7: Integrar Header, Footer y WhatsAppButton flotante en root layout

**Files:**
- Modify: `app/layout.tsx`

### Step 7.1: Reemplazar el body del RootLayout para incluir Header y Footer

```tsx
// En app/layout.tsx, reemplazar el componente RootLayout por:

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";

// ... dentro del JSX, reemplazar el <body> por:

<body className="min-h-screen flex flex-col bg-brand-white text-brand-black">
  <Header />
  <main className="flex-1">{children}</main>
  <Footer />
  <WhatsAppButton variant="floating" />
</body>
```

**Imports completos del archivo final `app/layout.tsx`:**

```tsx
import type { Metadata } from "next";
import { Bebas_Neue, Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas",
  subsets: ["latin"],
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Corazón del Táchira FC — Escuela de Fútbol",
    template: "%s · Corazón del Táchira FC",
  },
  description:
    "Escuela de fútbol infantil y juvenil en Michelena, Táchira. Formación integral con valores, categorías sub-7 hasta sub-17.",
  metadataBase: new URL("https://corazondeltachirafc.com"),
  openGraph: {
    title: "Corazón del Táchira FC",
    description: "Escuela de fútbol con corazón andino.",
    locale: "es_VE",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${bebasNeue.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-brand-white text-brand-black">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton variant="floating" />
      </body>
    </html>
  );
}
```

### Step 7.2: Verificar

```powershell
npm run build
npm run dev
```

En el navegador: `http://localhost:3000` muestra el header sticky, el footer con secciones, y el botón flotante de WhatsApp en la esquina inferior derecha.

---

## Task 8: Página de Inicio (`/`)

**Files:**
- Modify: `app/page.tsx` (reemplazar contenido)

**Interfaces usadas:**
- `Hero` (componente)
- `SectionTitle` (componente)
- `CategoryCard` (componente)
- `NewsCard` (componente)
- `WhatsAppButton` (componente)
- `Reveal` (componente)
- `categories`, `news`, `site` (datos)

### Step 8.1: Reemplazar `app/page.tsx`

```tsx
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
```

### Step 8.2: Verificar

```powershell
npm run build
npm run lint
npm run dev
```

En el navegador: `http://localhost:3000` muestra la home completa con todas las secciones.

---

## Task 9: Página Escuela (`/escuela`)

**Files:**
- Create: `app/escuela/page.tsx`

### Step 9.1: Crear `app/escuela/page.tsx`

```tsx
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
```

### Step 9.2: Verificar

```powershell
npm run build
npm run lint
```

---

## Task 10: Página Categorías (`/categorias`)

**Files:**
- Create: `app/categorias/page.tsx`

### Step 10.1: Crear `app/categorias/page.tsx`

```tsx
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
```

### Step 10.2: Verificar

```powershell
npm run build
npm run lint
```

---

## Task 11: Página Horarios y ubicación (`/horarios`)

**Files:**
- Create: `app/horarios/page.tsx`

### Step 11.1: Crear `app/horarios/page.tsx`

```tsx
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
```

### Step 11.2: Verificar

```powershell
npm run build
npm run lint
```

---

## Task 12: Página Galería (`/galeria`)

**Files:**
- Create: `app/galeria/page.tsx`

### Step 12.1: Crear `app/galeria/page.tsx`

```tsx
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
```

### Step 12.2: Verificar

```powershell
npm run build
npm run lint
```

---

## Task 13: Páginas de Noticias (`/noticias` y `/noticias/[slug]`)

**Files:**
- Create: `app/noticias/page.tsx`
- Create: `app/noticias/[slug]/page.tsx`

**Interfaces:**
- `getNewsBySlug(slug)` de `lib/data/news`
- `generateStaticParams()` retorna `[{ slug: 'abrimos-inscripciones-2026' }, ...]`

### Step 13.1: Crear `app/noticias/page.tsx`

```tsx
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
```

### Step 13.2: Crear `app/noticias/[slug]/page.tsx`

```tsx
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
```

### Step 13.3: Verificar

```powershell
npm run build
npm run lint
```

`/noticias` lista los 3 items. `/noticias/abrimos-inscripciones-2026` muestra el detalle.

---

## Task 14: Página Contacto (`/contacto`) + formulario de inscripción

**Files:**
- Create: `components/contact-form.tsx`
- Create: `app/contacto/page.tsx`

**Interfaces:**
- `ContactForm()` — client component; arma mensaje con datos del form y abre WhatsApp

### Step 14.1: `components/contact-form.tsx`

```tsx
"use client";

import { useState } from "react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { categories } from "@/lib/data/categories";

export function ContactForm() {
  const [jugador, setJugador] = useState("");
  const [edad, setEdad] = useState("");
  const [categoria, setCategoria] = useState(categories[0]?.name ?? "");
  const [representante, setRepresentante] = useState("");
  const [telefono, setTelefono] = useState("");
  const [mensaje, setMensaje] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const composed = [
      "Hola, quiero inscribir a mi hijo en Corazón del Táchira FC.",
      "",
      `Jugador: ${jugador}`,
      `Edad: ${edad}`,
      `Categoría de interés: ${categoria}`,
      `Representante: ${representante}`,
      `Teléfono: ${telefono}`,
      mensaje ? `Mensaje: ${mensaje}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    window.open(buildWhatsAppUrl(composed), "_blank", "noopener,noreferrer");
  }

  const inputClass =
    "w-full rounded-xl border border-brand-black/15 bg-brand-white px-4 py-3 text-brand-black placeholder:text-brand-black/40 focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/30";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block font-mono text-xs uppercase tracking-widest text-brand-red">
            Nombre del jugador
          </span>
          <input
            type="text"
            required
            value={jugador}
            onChange={(e) => setJugador(e.target.value)}
            className={inputClass}
            placeholder="Ej. Juan Pérez"
          />
        </label>
        <label className="block">
          <span className="mb-2 block font-mono text-xs uppercase tracking-widest text-brand-red">
            Edad
          </span>
          <input
            type="number"
            required
            min={4}
            max={17}
            value={edad}
            onChange={(e) => setEdad(e.target.value)}
            className={inputClass}
            placeholder="Ej. 10"
          />
        </label>
      </div>

      <label className="block">
        <span className="mb-2 block font-mono text-xs uppercase tracking-widest text-brand-red">
          Categoría de interés
        </span>
        <select
          required
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          className={inputClass}
        >
          {categories.map((c) => (
            <option key={c.slug} value={c.name}>
              {c.name} — {c.ageRange}
            </option>
          ))}
        </select>
      </label>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block font-mono text-xs uppercase tracking-widest text-brand-red">
            Nombre del representante
          </span>
          <input
            type="text"
            required
            value={representante}
            onChange={(e) => setRepresentante(e.target.value)}
            className={inputClass}
            placeholder="Ej. María Pérez"
          />
        </label>
        <label className="block">
          <span className="mb-2 block font-mono text-xs uppercase tracking-widest text-brand-red">
            Teléfono
          </span>
          <input
            type="tel"
            required
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            className={inputClass}
            placeholder="+58 414 1234567"
          />
        </label>
      </div>

      <label className="block">
        <span className="mb-2 block font-mono text-xs uppercase tracking-widest text-brand-red">
          Mensaje (opcional)
        </span>
        <textarea
          rows={4}
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          className={inputClass}
          placeholder="Cuéntanos cualquier detalle importante."
        />
      </label>

      <button
        type="submit"
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-red px-8 py-4 font-display text-base uppercase tracking-widest text-white transition-colors hover:bg-brand-red-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red sm:w-auto"
      >
        Enviar por WhatsApp <span aria-hidden="true">→</span>
      </button>
    </form>
  );
}
```

### Step 14.2: Crear `app/contacto/page.tsx`

```tsx
import type { Metadata } from "next";
import { Hero } from "@/components/hero";
import { SectionTitle } from "@/components/section-title";
import { ContactForm } from "@/components/contact-form";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Contacto e inscripción",
  description: "Habla con nosotros por WhatsApp o inscríbete directamente desde la web.",
};

export default function ContactoPage() {
  return (
    <>
      <Hero
        title="CONTACTO E INSCRIPCIÓN"
        subtitle="Estamos listos para responder tus preguntas y acompañarte en el proceso de inscripción."
        variant="dark"
      />

      <section className="bg-brand-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2">
            <Reveal>
              <SectionTitle
                eyebrow="01 — Datos"
                title="Información del club"
              />
              <dl className="mt-10 space-y-6 text-brand-black/80">
                <div>
                  <dt className="font-mono text-xs uppercase tracking-widest text-brand-red">
                    Dirección
                  </dt>
                  <dd className="mt-2">{site.address}</dd>
                </div>
                <div>
                  <dt className="font-mono text-xs uppercase tracking-widest text-brand-red">
                    Teléfonos
                  </dt>
                  <dd className="mt-2 space-y-1">
                    {site.phone.map((p) => (
                      <div key={p}>
                        <a href={`tel:${p.replace(/\s/g, "")}`} className="hover:text-brand-red">
                          {p}
                        </a>
                      </div>
                    ))}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-xs uppercase tracking-widest text-brand-red">
                    Email
                  </dt>
                  <dd className="mt-2">
                    <a href={`mailto:${site.email}`} className="hover:text-brand-red">
                      {site.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-xs uppercase tracking-widest text-brand-red">
                    Redes sociales
                  </dt>
                  <dd className="mt-2 flex gap-4">
                    <a
                      href={`https://instagram.com/${site.socials.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-brand-red"
                    >
                      Instagram
                    </a>
                    <a
                      href={`https://facebook.com/${site.socials.facebook}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-brand-red"
                    >
                      Facebook
                    </a>
                    <a
                      href={`https://tiktok.com/@${site.socials.tiktok}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-brand-red"
                    >
                      TikTok
                    </a>
                  </dd>
                </div>
              </dl>
              <div className="mt-12">
                <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-brand-black/10">
                  <iframe
                    title="Mapa de ubicación"
                    src={site.mapsEmbedUrl}
                    className="h-full w-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
              </div>
            </Reveal>

            <Reveal delay={1}>
              <SectionTitle
                eyebrow="02 — Inscríbete"
                title="Formulario de inscripción"
                subtitle="Completa los datos y te redirigiremos a WhatsApp con el mensaje listo para enviar."
              />
              <div className="mt-10">
                <ContactForm />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-brand-red py-16 text-center text-brand-white">
        <Reveal>
          <h2 className="font-display text-4xl sm:text-5xl">
            ¿Prefieres escribirnos ya?
          </h2>
          <div className="mt-8">
            <WhatsAppButton
              variant="large"
              label="Abrir WhatsApp"
              className="!bg-brand-black hover:!bg-brand-black/80"
            />
          </div>
        </Reveal>
      </section>
    </>
  );
}
```

### Step 14.3: Verificar

```powershell
npm run build
npm run lint
npm run dev
```

En el navegador: `http://localhost:3000/contacto` muestra el formulario. Llenarlo y enviar abre WhatsApp con el mensaje pre-armado.

---

## Task 15: Páginas de metadata (404, sitemap, manifest, robots)

**Files:**
- Create: `app/not-found.tsx`
- Create: `app/sitemap.ts`
- Create: `app/manifest.ts`
- Create: `app/robots.ts`

### Step 15.1: `app/not-found.tsx`

```tsx
import Link from "next/link";
import { WhatsAppButton } from "@/components/whatsapp-button";

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-screen items-center justify-center bg-brand-red px-6 text-center text-brand-white">
      <div className="relative mx-auto">
        <p className="font-mono text-xs uppercase tracking-[0.4em] text-brand-white/70">
          404
        </p>
        <h1 className="mt-4 font-display text-7xl sm:text-9xl">Página no encontrada</h1>
        <p className="mx-auto mt-6 max-w-md text-brand-white/85">
          La página que buscas no existe o fue movida. Vuelve al inicio o escríbenos por WhatsApp.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-brand-white px-8 py-4 font-display text-base uppercase tracking-widest text-brand-white transition-colors hover:bg-brand-white hover:text-brand-red"
          >
            <span aria-hidden="true">←</span> Volver al inicio
          </Link>
          <WhatsAppButton
            variant="inline"
            label="Escríbenos"
            className="!bg-brand-black hover:!bg-brand-black/80"
          />
        </div>
      </div>
    </section>
  );
}
```

### Step 15.2: `app/sitemap.ts`

```ts
import type { MetadataRoute } from "next";
import { news } from "@/lib/data/news";

const BASE = "https://corazondeltachirafc.com"; // TODO: usuario — dominio real

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE}/`,           changeFrequency: "weekly",  priority: 1 },
    { url: `${BASE}/escuela`,    changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/categorias`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/horarios`,   changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/galeria`,    changeFrequency: "weekly",  priority: 0.7 },
    { url: `${BASE}/noticias`,   changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE}/contacto`,   changeFrequency: "monthly", priority: 0.7 },
  ];

  const newsPages: MetadataRoute.Sitemap = news.map((n) => ({
    url: `${BASE}/noticias/${n.slug}`,
    lastModified: new Date(n.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...newsPages];
}
```

### Step 15.3: `app/manifest.ts`

```ts
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Corazón del Táchira FC",
    short_name: "CDT FC",
    description: "Escuela de fútbol con corazón andino.",
    start_url: "/",
    display: "standalone",
    background_color: "#1A1818",
    theme_color: "#BD1C24",
    icons: [
      {
        src: "/escudo.png",
        sizes: "any",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
```

### Step 15.4: `app/robots.ts`

```ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://corazondeltachirafc.com/sitemap.xml", // TODO: usuario — dominio real
  };
}
```

### Step 15.5: Verificar

```powershell
npm run build
npm run dev
```

- Visita una URL inexistente (`/foo-bar`) → ves el 404 personalizado.
- Visita `/sitemap.xml` → ves el XML.
- Visita `/robots.txt` → ves las reglas.

---

## Task 16: Verificación final

### Step 16.1: Build de producción

```powershell
npm run build
```

**Expected:** Build exitoso. La salida debe mostrar todas las rutas (`/`, `/escuela`, `/categorias`, `/horarios`, `/galeria`, `/noticias`, `/noticias/[slug]`, `/contacto`) como estáticas (○).

### Step 16.2: Lint

```powershell
npm run lint
```

**Expected:** Sin errores. Si hay warnings de ESLint sobre imports no usados o similar, corregir.

### Step 16.3: Smoke test manual (servidor de producción)

```powershell
npm run start
```

Abrir `http://localhost:3000` y verificar:

- [ ] Header sticky visible con logo, links y CTA
- [ ] Hero de Inicio con escudo + título + CTA WhatsApp
- [ ] Sección "Identidad" con 3 cards
- [ ] Sección "Categorías" con 3 cards (preview) y link "Ver todas"
- [ ] Sección "Noticias" con 3 cards y link "Ver todas"
- [ ] CTA "¿Listo para entrenar?" → link a `/horarios`
- [ ] CTA "Reserva tu cupo hoy" → abre WhatsApp
- [ ] Footer con secciones
- [ ] Botón flotante de WhatsApp en la esquina inferior derecha

Navegar manualmente a cada una y comprobar:

- [ ] `/escuela` — historia, cuerpo técnico, infraestructura
- [ ] `/categorias` — 6 cards con CTA WhatsApp por categoría
- [ ] `/horarios` — tabla + mapa
- [ ] `/galeria` — grid de álbumes, click abre lightbox
- [ ] `/noticias` — 3 cards
- [ ] `/noticias/abrimos-inscripciones-2026` — detalle con imagen y contenido
- [ ] `/contacto` — datos + formulario. Llenar y enviar abre WhatsApp con el mensaje completo.
- [ ] Menú móvil: hamburguesa abre panel fullscreen rojo
- [ ] Responsive: probar DevTools en 375px (móvil), 768px (tablet), 1280px (escritorio)

### Step 16.4: Verificación de WhatsApp

Hacer click en cada botón de WhatsApp del sitio (flotante, CTAs inline, CTAs por categoría, CTAs del 404, formulario de contacto) y confirmar que:

- Abre WhatsApp (web o app)
- El mensaje pre-armado aparece correctamente
- El número de teléfono es correcto

### Step 16.5: Verificación de accesibilidad básica

- Tab con teclado: ¿se puede navegar por todos los links/botones?
- ¿El focus tiene outline visible?
- ¿Los textos tienen suficiente contraste sobre el fondo rojo/negro/blanco?

---

## Self-Review (checkeo del plan vs. spec)

**Spec coverage:**
- [x] 7 páginas: Home, Escuela, Categorías, Horarios, Galería, Noticias (lista+detalle), Contacto
- [x] Header sticky + Footer + WhatsApp flotante
- [x] Paleta de marca (4 tokens)
- [x] Tipografía display (Bebas Neue) + cuerpo (Geist)
- [x] WhatsApp como único canal de formulario
- [x] Contenido hardcoded en `lib/data/*`
- [x] Reveal con IntersectionObserver
- [x] Lightbox CSS-only con `<dialog>` nativo
- [x] Responsive (tabla → cards en móvil)
- [x] SEO: `generateMetadata`, sitemap, manifest, robots
- [x] 404 personalizado
- [x] Sin tests automatizados (YAGNI conforme a spec)
- [x] Sin librerías nuevas

**Type consistency:**
- `Category.slug`, `Category`, `categories` definidos en Task 3.2, consumidos en Task 6.1, 10.1 ✓
- `News.slug`, `News`, `news`, `getNewsBySlug(slug)` definidos en Task 3.4, consumidos en Tasks 8, 13 ✓
- `GalleryAlbum`, `gallery`, `getAlbumById(id)` definidos en Task 3.5, consumidos en Task 6.4 ✓
- `site.whatsapp`, `site.whatsappMessage` definidos en Task 3.1, consumidos por `lib/whatsapp.ts` ✓
- `buildWhatsAppUrl(message)` definido en Task 3.6, consumido por Tasks 4.2, 6.1, 14.1, 15.1 ✓
- `PageProps<'/noticias/[slug]'>` usado en Task 13.2 (helper global de Next.js 16) ✓

**Placeholder scan:**
- `whatsapp: "584141234567"` en `lib/data/site.ts` está marcado con `// TODO: usuario` ✓
- Imágenes de staff y noticias son placeholders JPG marcados con TODO ✓
- URL de embed de Google Maps y dominio base en sitemap/robots marcados con TODO ✓
- Historia en `/escuela` está marcada con TODO ✓