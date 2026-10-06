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
