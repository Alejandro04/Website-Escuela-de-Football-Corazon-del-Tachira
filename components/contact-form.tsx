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