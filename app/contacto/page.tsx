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