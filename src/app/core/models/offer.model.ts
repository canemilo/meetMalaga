/**
 * Categorías (verticales) del sitio. Cada una corresponde a un programa
 * de afiliados distinto y a una ruta /tours, /coches, etc.
 */
export type Vertical = 'tours' | 'coches' | 'restaurantes' | 'ocio' | 'hoteles';

/**
 * Proveedores de afiliación soportados. Añade aquí los que vayas
 * incorporando; el AffiliateService sabe construir el enlace de cada uno.
 */
export type AffiliateProvider =
  | 'civitatis'
  | 'getyourguide'
  | 'tiqets'
  | 'discovercars'
  | 'localrent'
  | 'thefork'
  | 'booking'
  | 'tripcom'
  | 'directo'; // enlace propio sin comisión (por si quieres mezclar)

/**
 * Una oferta = un servicio concreto que enlazas a un proveedor.
 * `providerUrl` es la URL "limpia" del producto en el proveedor;
 * el AffiliateService le inyecta tu ID de afiliado al generar el enlace.
 */
export interface Offer {
  id: string;
  vertical: Vertical;
  provider: AffiliateProvider;
  title: string;
  summary: string;
  imageUrl: string;
  imageAlt: string;
  /** Precio "desde", en euros. Solo informativo/orientativo. */
  priceFrom?: number;
  /** Valoración media 0–5, si el proveedor la publica. */
  rating?: number;
  /** Duración legible: "3 horas", "Día completo"... */
  duration?: string;
  /** URL del producto en el proveedor, SIN tu ID de afiliado. */
  providerUrl: string;
  /** Etiquetas para filtrar/buscar. */
  tags?: string[];
  /** Destácala en la home. */
  featured?: boolean;
}
