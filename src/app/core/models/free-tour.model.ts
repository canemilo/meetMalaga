/**
 * Un FREE TOUR es un tour tuyo publicado en plataformas de free tour
 * (Freetour, GuruWalk). El viajero reserva GRATIS en la plataforma y paga al
 * final lo que quiera (propina voluntaria). No hay afiliación ni cobro en la
 * web: solo enlazamos a tus fichas, que es donde se reserva.
 *
 * Es tu principal fuente de clientes: la puerta de entrada del negocio.
 */
export type FreeTourCategoria =
  | 'esencial'
  | 'historia'
  | 'arte'
  | 'noche'
  | 'barrios';

export interface FreeTour {
  id: string;
  title: string;
  /** Gancho corto de una línea. */
  tagline: string;
  description: string;
  /** Paradas o puntos destacados. */
  highlights: string[];
  duration: string;
  meetingPoint: string;
  /** Idiomas en que lo ofreces. */
  languages: string[];
  /** Horario legible: "Todos los días, 10:00 y 17:00". */
  schedule: string;
  category: FreeTourCategoria;
  imageUrl: string;
  imageAlt: string;
  /** URL de tu ficha en Freetour (déjala vacía si no está en esa plataforma). */
  freetourUrl?: string;
  /** URL de tu ficha en GuruWalk (déjala vacía si no está en esa plataforma). */
  guruwalkUrl?: string;
  featured?: boolean;
}
