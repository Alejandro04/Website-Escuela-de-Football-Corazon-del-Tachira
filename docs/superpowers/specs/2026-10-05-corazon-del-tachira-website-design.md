# Sitio web — Corazón del Táchira FC (Escuela de Fútbol)

**Fecha:** 2026-10-05
**Stack:** Next.js 16.3.8 (App Router) · React 19 · Tailwind CSS v4 · TypeScript
**Estado:** Diseño aprobado, pendiente de plan de implementación

---

## 1. Resumen

Sitio web oficial multi-página para la escuela de fútbol **Corazón del Táchira FC**. Primera versión sin backend: contenido hardcoded en archivos TS, formularios abren WhatsApp con mensaje pre-armado, despliegue estático a Vercel. Estilo visual audaz y pasional (rojo dominante), tipografía display pesada, animaciones CSS sutiles. Idioma único: español.

---

## 2. Objetivos y no-objetivos

**Objetivos**
- Presentar la escuela (identidad, historia, cuerpo técnico, infraestructura).
- Mostrar las categorías de formación y sus horarios.
- Facilitar el contacto y la inscripción vía WhatsApp.
- Servir como vitrina institucional y canal de noticias.

**No-objetivos (fuera de alcance esta versión)**
- Backend / base de datos / CMS / autenticación.
- Pagos en línea.
- Multi-idioma.
- Editor de contenido para el dueño (las actualizaciones requieren editar código + redeploy).
- Tests automatizados (sitio estático verificable manualmente).
- Analytics (puede agregarse Vercel Analytics más adelante).

---

## 3. Identidad visual

Paleta extraída del escudo:

| Token | HEX | Uso |
|---|---|---|
| `--color-brand-red` | `#BD1C24` | Rojo principal (CTAs, fondos, acentos) |
| `--color-brand-red-dark` | `#8C1118` | Rojo oscuro (hover, sombras, bordes) |
| `--color-brand-black` | `#1A1818` | Negro (fondos secundarios, texto sobre blanco) |
| `--color-brand-white` | `#FFFFFF` | Blanco (texto sobre rojo/negro, fondos) |

**Tipografía**
- Display / títulos: **Bebas Neue** (Google Fonts). H1 ~96px desktop / ~56px móvil. Tracking apretado.
- Cuerpo: **Geist Sans** (ya incluida en el proyecto).
- Acentos / labels: Geist Mono o Geist Sans uppercase con `tracking-widest`.

**Logo / escudo**
- Archivo origen: `C:\Users\alejo\OneDrive\Desktop\references\escudo.png`
- Copia local en `public/escudo.png` (SVG ideal a futuro, se convierte si se consigue fuente vectorial).

**Estilo por sección**
- Hero Inicio: fondo rojo, texto blanco, overlay negro sutil.
- Secciones alternan rojo / negro / blanco para ritmo visual.
- Imágenes de galería: `grayscale` por defecto, `grayscale-0` en hover (look cinematográfico).
- Divisores rojos en section headers.

**Animaciones (CSS puro, sin librerías)**
- Componente cliente `Reveal` con `IntersectionObserver` para fade-in + translate-y-4 al entrar al viewport.
- Hover: transiciones 200–300ms en color, transform, opacity.
- Hero: ligera escala en escudo al cargar.
- Scroll suave global (`scroll-behavior: smooth`).

---

## 4. Arquitectura

### Estructura de carpetas

```
cdeltachira/
├── app/
│   ├── layout.tsx              # Header + Footer + WhatsApp flotante
│   ├── page.tsx                # Inicio
│   ├── globals.css             # Tailwind + tokens de marca
│   ├── escuela/page.tsx        # Sobre nosotros
│   ├── categorias/page.tsx
│   ├── horarios/page.tsx
│   ├── galeria/page.tsx
│   ├── noticias/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx     # Detalle de noticia
│   ├── contacto/page.tsx
│   └── not-found.tsx           # 404 personalizado
├── components/
│   ├── header.tsx
│   ├── footer.tsx
│   ├── whatsapp-button.tsx     # Flotante + variante inline
│   ├── reveal.tsx              # IntersectionObserver wrapper
│   ├── hero.tsx
│   ├── section-title.tsx
│   ├── category-card.tsx
│   ├── news-card.tsx
│   ├── schedule-table.tsx
│   └── gallery-grid.tsx        # Grid + lightbox CSS
├── lib/
│   ├── whatsapp.ts             # buildWhatsAppUrl helper
│   └── data/
│       ├── site.ts             # Nombre, contacto, redes
│       ├── categories.ts
│       ├── schedule.ts
│       ├── news.ts
│       └── gallery.ts
├── public/
│   ├── images/                 # Fotos (news/, gallery/, categorias/)
│   └── escudo.png
└── package.json
```

### Convenciones

- **Componentes**: stateless (no hay estado compartido). Aceptan `className?: string` extra para composición.
- **Datos**: TypeScript con tipos exportados, no JSON (autocompletado y type-safety).
- **Routing**: App Router, todas las rutas como `app/[ruta]/page.tsx`. Detalle de noticias con `app/noticias/[slug]/page.tsx` y `generateStaticParams`.
- **Imágenes**: `next/image` con `sizes` optimizado. Prioridad solo en hero.
- **Sin librerías adicionales**: cero dependencias nuevas más allá de las del boilerplate (Bebas Neue viene de Google vía `next/font/google`).

---

## 5. Páginas

### 5.1 Inicio (`/`)
1. Hero: escudo + título display + subtítulo + CTA WhatsApp.
2. Identidad (3 cards: Misión, Visión, Valores).
3. Categorías (grid → link a `/categorias`).
4. Últimas noticias (3 cards → link a `/noticias`).
5. Entrenamientos (resumen horarios → link a `/horarios`).
6. CTA final con ubicación.

### 5.2 Escuela (`/escuela`)
- Hero corto con misión.
- Historia de la escuela (texto que el usuario proveerá; durante implementación inicial se usa placeholder editable).
- Cuerpo técnico (grid: foto, nombre, rol).
- Infraestructura (canchas, materiales, valores diferenciales).

### 5.3 Categorías (`/categorias`)
- Grid de cards: nombre, rango de edad, días/horario, descripción, CTA WhatsApp por categoría.

### 5.4 Horarios y ubicación (`/horarios`)
- Tabla responsive (en móvil: cards apiladas).
- Dirección + mapa embebido (Google Maps iframe).

### 5.5 Galería (`/galeria`)
- Grid masonry por álbum.
- Lightbox al click (CSS only: dialog nativo o `<details>`).

### 5.6 Noticias (`/noticias` + `/noticias/[slug]`)
- Lista: imagen, fecha, título, resumen.
- Detalle: contenido, autor, fecha.

### 5.7 Contacto / Inscripción (`/contacto`)
- Datos del club (dirección, teléfonos, email, redes).
- Mapa.
- Botón WhatsApp grande + formulario client-side (nombre jugador, edad, categoría, nombre representante, teléfono, mensaje) que abre WhatsApp con texto armado.

### Compartido
- Header sticky (fondo negro con backdrop-blur al scroll, hamburguesa fullscreen roja).
- Botón flotante de WhatsApp (esquina inferior derecha) con mensaje genérico.

---

## 6. Modelo de datos

```ts
// lib/data/site.ts
{
  name: "Corazón del Táchira FC",
  shortName: "CDT FC",
  tagline: "Escuela de Fútbol — Michelena, Táchira",
  description: "...",
  whatsapp: "584141234567",         // formato internacional sin '+'
  whatsappMessage: "Hola, quiero información sobre la escuela.",
  phone: ["+58 414 123 4567"],
  email: "contacto@corazondeltachirafc.com",
  address: "Cancha ..., Michelena, Táchira, Venezuela",
  mapsUrl: "https://maps.google.com/...",
  socials: { instagram: "corazondeltachirafc", facebook: "...", tiktok: "..." }
}

// lib/data/categories.ts — Category[]
export type Category = {
  slug: string;                    // "sub-7"
  name: string;                    // "Sub-7"
  ageRange: string;                // "5 a 6 años"
  schedule: string;                // "Martes y jueves · 4:00 PM"
  description: string;
  requirements: string[];
};

// lib/data/schedule.ts — ScheduleEntry[]
export type ScheduleEntry = {
  category: string;                // ref por slug o nombre
  days: string[];                  // ["Mar", "Jue"]
  time: string;                    // "16:00 - 17:30"
  location: string;               // "Cancha A"
};

// lib/data/news.ts — News[]
export type News = {
  slug: string;
  title: string;
  date: string;                    // ISO "2026-09-15"
  summary: string;
  image: string;                   // ruta en /public
  contentHtml: string;             // HTML simple con <p>, <h2>, <ul>, <img>
};

// lib/data/gallery.ts — GalleryAlbum[]
export type GalleryAlbum = {
  id: string;
  title: string;
  date: string;                    // "2026-08"
  cover: string;                   // ruta en /public
  photos: string[];                // rutas en /public
};
```

**Decisiones**
- Contenido en TS (no JSON): tipos + autocompletado.
- Fechas como `string` ISO para serialización simple.
- Noticias en HTML simple (sin markdown processor para mantener bundle liviano).
- Slug-based routing para detalle de noticias.

---

## 7. Componentes reusables

| Componente | Responsabilidad |
|---|---|
| `Header` | Logo + nav (Inicio, Escuela, Categorías, Horarios, Galería, Noticias, Contacto) + CTA WhatsApp. Sticky, fondo negro con blur al scroll. Menú hamburguesa fullscreen en móvil. |
| `Footer` | Logo + descripción + redes + links + contacto + copyright. |
| `WhatsAppButton` | Botón flotante fijo. Variante `inline` para CTAs contextuales. Recibe `message` opcional. |
| `Reveal` | Wrapper client-side con `IntersectionObserver`. Aplica fade-in + translate-y-4 al entrar al viewport. |
| `Hero` | Sección fullscreen: fondo + título display + subtítulo + CTA. Props: `title`, `subtitle`, `ctaText`, `ctaHref`, `variant` (`"primary"` rojo o `"dark"` negro). |
| `SectionTitle` | Título de sección con línea decorativa y número/etiqueta opcional (estilo "01 — CATEGORÍAS"). |
| `CategoryCard` | Card con nombre, edad, día/horario, descripción, CTA WhatsApp con mensaje contextual. |
| `NewsCard` | Card con imagen, fecha, título, resumen, "Leer más". Variante horizontal en detalle. |
| `ScheduleTable` | Tabla responsive. En móvil se transforma en cards apiladas. |
| `GalleryGrid` | Grid responsive con lightbox al click usando elemento nativo `<details>` + `<dialog>` (animación fade + zoom, CSS only, sin librería). |

---

## 8. WhatsApp

**Helper** (`lib/whatsapp.ts`):
```ts
import { site } from "@/lib/data/site";

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
```

El número vive **una sola vez** en `lib/data/site.ts`. Todos los componentes y CTAs consumen el helper.

**Mensajes pre-armados**
- Flotante genérico: "Hola, quiero información sobre la escuela Corazón del Táchira FC."
- CTA por categoría: `"Hola, quiero inscribir a mi hijo en la categoría ${name} (${ageRange})."`
- Formulario de contacto: arma texto con los campos completados por el usuario y abre el chat.

---

## 9. Responsive, SEO, accesibilidad

**Responsive**
- Mobile-first.
- Menú móvil fullscreen rojo.
- Imágenes con `sizes` optimizado.
- Tablas → cards apiladas en móvil.

**SEO**
- Metadata base en `app/layout.tsx`.
- Metadata por página con `generateMetadata`.
- `sitemap.ts` y `manifest.ts` básicos.

**Accesibilidad**
- Contraste adecuado en todos los textos.
- Focus visible en todos los elementos interactivos.
- Alt text en todas las imágenes.
- HTML semántico (`<nav>`, `<main>`, `<section>`).

---

## 10. Verificación

- `npm run dev` y revisar en navegador (escritorio + mobile con DevTools).
- `npm run build && npm run start` para validar build de producción.
- `npm run lint` para ESLint.
- Click en cada CTA WhatsApp y confirmar mensaje correcto.
- Revisar navegación entre páginas y todos los links.

---

## 11. Decisiones diferidas (futuro)

- Conversión del escudo a SVG vectorial.
- CMS para noticias (Contentful, Sanity, MDX) si el volumen lo amerita.
- Vercel Analytics.
- Formulario real con envío a email/Google Sheets si WhatsApp deja de ser suficiente.
- Multi-idioma.
- Tests E2E (Playwright) si se vuelve un proyecto de largo plazo.