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

  // Sync native <dialog> open state with React `activePhoto` state.
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