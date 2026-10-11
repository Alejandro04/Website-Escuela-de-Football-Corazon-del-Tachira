import type { MetadataRoute } from "next";

export const dynamic = "force-static";

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
        src: "/escudo_sin_fondo.png",
        sizes: "any",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
