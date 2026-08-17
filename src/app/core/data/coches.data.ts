import {Offer} from '../models/offer.model';

/**
 * ALQUILER DE COCHES. DiscoverCars y Localrent son metabuscadores: lo normal
 * es enlazar a una búsqueda pre-rellenada (recogida en Málaga aeropuerto/centro)
 * más que a un coche concreto. Ajusta `providerUrl` a tu enlace de búsqueda.
 */
export const COCHES: Offer[] = [
  {
    id: 'coche-aeropuerto-economico',
    vertical: 'coches',
    provider: 'discovercars',
    title: 'Coche económico · Aeropuerto de Málaga',
    summary:
      'Compara decenas de compañías con recogida en la T3. Cancelación gratuita y sin cargos ocultos.',
    imageUrl: 'https://picsum.photos/seed/cocheaeropuerto/800/600',
    imageAlt: 'Coche de alquiler en el aeropuerto de Málaga',
    priceFrom: 22,
    rating: 4.6,
    duration: 'Por día',
    providerUrl: 'https://www.discovercars.com/spain/malaga-airport',
    tags: ['aeropuerto', 'economico', 'sin franquicia'],
    featured: true,
  },
  {
    id: 'coche-centro-ciudad',
    vertical: 'coches',
    provider: 'discovercars',
    title: 'Coche compacto · Centro de Málaga',
    summary:
      'Recogida en la ciudad, ideal si llegas en tren o en crucero. Kilometraje ilimitado disponible.',
    imageUrl: 'https://picsum.photos/seed/cochecentro/800/600',
    imageAlt: 'Coche compacto aparcado en el centro de Málaga',
    priceFrom: 28,
    rating: 4.4,
    duration: 'Por día',
    providerUrl: 'https://www.discovercars.com/spain/malaga',
    tags: ['centro', 'compacto', 'tren'],
  },
  {
    id: 'coche-localrent-suv',
    vertical: 'coches',
    provider: 'localrent',
    title: 'SUV para la Costa del Sol',
    summary:
      'Compañías locales con buen trato y depósito bajo, perfectas para recorrer Marbella, Ronda o la Axarquía.',
    imageUrl: 'https://picsum.photos/seed/cochesuv/800/600',
    imageAlt: 'SUV en una carretera de la Costa del Sol',
    priceFrom: 39,
    rating: 4.7,
    duration: 'Por día',
    providerUrl: 'https://localrent.com/es/malaga/',
    tags: ['suv', 'costa del sol', 'local'],
  },
  {
    id: 'coche-familiar-7plazas',
    vertical: 'coches',
    provider: 'discovercars',
    title: 'Monovolumen 7 plazas · Aeropuerto',
    summary:
      'Para grupos y familias grandes. Espacio de sobra para maletas y sillas infantiles.',
    imageUrl: 'https://picsum.photos/seed/cochefamiliar/800/600',
    imageAlt: 'Monovolumen familiar de siete plazas',
    priceFrom: 54,
    rating: 4.5,
    duration: 'Por día',
    providerUrl: 'https://www.discovercars.com/spain/malaga-airport',
    tags: ['familia', 'grupos', '7 plazas'],
  },
];
