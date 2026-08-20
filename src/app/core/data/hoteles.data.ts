import { Offer } from '../models/offer.model';

/**
 * HOTELES vía Trip.com.
 *
 * IMPORTANTE: `providerUrl` debe ser el enlace COMPLETO que te genera el
 * "Link Builder" de Trip.com (ya lleva tu seguimiento dentro). Los de abajo son
 * MARCADORES: sustitúyelos por tus enlaces reales cuando te des de alta.
 *
 * Consejo: enlaza al producto concreto (deeplink) — la ficha de un hotel o una
 * búsqueda de hoteles en Málaga con fechas —, no a la home de Trip.com.
 */
export const HOTELES: Offer[] = [
  {
    id: 'hotel-centro-malaga',
    vertical: 'hoteles',
    provider: 'tripcom',
    title: 'Hoteles en el centro de Málaga',
    summary:
      'Alojamientos a un paseo de la Catedral, Larios y el Soho. Compara precios y cancela gratis en la mayoría.',
    imageUrl: 'https://picsum.photos/seed/hotelcentro/800/600',
    imageAlt: 'Habitación de hotel con vistas al centro de Málaga',
    priceFrom: 70,
    rating: 4.5,
    // Marcador: pega aquí tu enlace del Link Builder de Trip.com
    providerUrl: 'https://es.trip.com/hotels/malaga-hotels/',
    tags: ['centro', 'ciudad', 'cancelacion gratis'],
    featured: true,
  },
  {
    id: 'hotel-playa-malagueta',
    vertical: 'hoteles',
    provider: 'tripcom',
    title: 'Hoteles junto a la playa (La Malagueta)',
    summary:
      'Para despertarte a un paso del mar, cerca del puerto y del paseo marítimo.',
    imageUrl: 'https://picsum.photos/seed/hotelplaya/800/600',
    imageAlt: 'Hotel frente a la playa de La Malagueta en Málaga',
    priceFrom: 85,
    rating: 4.4,
    providerUrl: 'https://es.trip.com/hotels/malaga-hotels/',
    tags: ['playa', 'malagueta', 'puerto'],
  },
  {
    id: 'hotel-lujo-malaga',
    vertical: 'hoteles',
    provider: 'tripcom',
    title: 'Hoteles boutique y de lujo',
    summary:
      'Terrazas con vistas, spa y diseño. Lo mejor para una escapada especial en Málaga.',
    imageUrl: 'https://picsum.photos/seed/hotellujo/800/600',
    imageAlt: 'Terraza de un hotel de lujo con vistas a Málaga',
    priceFrom: 140,
    rating: 4.7,
    providerUrl: 'https://es.trip.com/hotels/malaga-hotels/',
    tags: ['lujo', 'boutique', 'terraza'],
  },
  {
    id: 'hotel-economico-malaga',
    vertical: 'hoteles',
    provider: 'tripcom',
    title: 'Alojamientos económicos',
    summary:
      'Hostales y hoteles con buena relación calidad-precio, bien conectados con el centro.',
    imageUrl: 'https://picsum.photos/seed/hoteleco/800/600',
    imageAlt: 'Habitación sencilla y luminosa de un hotel económico',
    priceFrom: 45,
    rating: 4.2,
    providerUrl: 'https://es.trip.com/hotels/malaga-hotels/',
    tags: ['economico', 'calidad-precio'],
  },
];
