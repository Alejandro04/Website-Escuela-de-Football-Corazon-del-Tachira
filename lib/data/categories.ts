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