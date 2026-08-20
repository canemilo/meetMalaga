/**
 * Una RUTA es un producto PROPIO: un tour que guías tú mismo. A diferencia de
 * `Offer` (afiliación, que enlaza a un tercero), aquí la reserva es tuya: el
 * cliente contacta por WhatsApp y tú cierras fecha y cobro (Stripe/PayPal o
 * Bizum/transferencia).
 */
export type RutaCategoria =
  | 'historia'
  | 'arte'
  | 'gastronomia'
  | 'naturaleza'
  | 'familia'
  | 'noche';

export interface Ruta {
  id: string;
  title: string;
  /** Gancho corto de una línea. */
  tagline: string;
  /** Descripción más larga de la experiencia. */
  description: string;
  /** Paradas o puntos destacados del recorrido. */
  highlights: string[];
  /** Duración legible: "3 horas", "Día completo". */
  duration: string;
  /** Precio por persona, en euros. */
  pricePerPerson: number;
  /** Punto de encuentro reconocible. */
  meetingPoint: string;
  /** Tamaño máximo del grupo, si aplica. */
  maxGroup?: number;
  category: RutaCategoria;
  imageUrl: string;
  imageAlt: string;
  /** Destácala en la portada. */
  featured?: boolean;
  /** Rutas que requieren organización previa (transporte, entradas, etc.). */
  onRequest?: boolean;
}
