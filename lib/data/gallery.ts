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