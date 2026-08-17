import { Offer } from '../models/offer.model';

/**
 * OCIO: parques, espectáculos, actividades y experiencias. Mezcla de
 * Tiqets, GetYourGuide y Civitatis según quién liste cada actividad.
 */
export const OCIO: Offer[] = [
  {
    id: 'ocio-flamenco',
    vertical: 'ocio',
    provider: 'getyourguide',
    title: 'Espectáculo flamenco en tablao',
    summary:
      'Una hora de cante, guitarra y baile en directo en un tablao del centro histórico. Copa incluida.',
    imageUrl: 'https://picsum.photos/seed/flamenco/800/600',
    imageAlt: 'Bailaora de flamenco en un tablao',
    priceFrom: 24,
    rating: 4.7,
    duration: '1 hora',
    providerUrl: 'https://www.getyourguide.es/malaga-l163/flamenco/',
    tags: ['flamenco', 'noche', 'cultura'],
    featured: true,
  },
  {
    id: 'ocio-hammam',
    vertical: 'ocio',
    provider: 'civitatis',
    title: 'Baños árabes Hammam Al Ándalus',
    summary:
      'Circuito termal y masaje en unos baños de inspiración andalusí. Puro relax tras un día de turismo.',
    imageUrl: 'https://picsum.photos/seed/hammam/800/600',
    imageAlt: 'Sala de baños árabes con arcos y agua',
    priceFrom: 38,
    rating: 4.8,
    duration: '1,5 horas',
    providerUrl: 'https://www.civitatis.com/es/malaga/hammam-al-andalus/',
    tags: ['relax', 'spa', 'pareja'],
  },
  {
    id: 'ocio-bioparc',
    vertical: 'ocio',
    provider: 'tiqets',
    title: 'Bioparc Fuengirola',
    summary:
      'Zoo inmersivo a 30 minutos de Málaga, con hábitats recreados de selva tropical. Ideal en familia.',
    imageUrl: 'https://picsum.photos/seed/bioparc/800/600',
    imageAlt: 'Vegetación tropical del Bioparc de Fuengirola',
    priceFrom: 25,
    rating: 4.6,
    duration: 'Medio día',
    providerUrl: 'https://www.tiqets.com/es/fuengirola-atracciones/bioparc-fuengirola/',
    tags: ['familia', 'animales', 'costa'],
  },
  {
    id: 'ocio-kayak-nerja',
    vertical: 'ocio',
    provider: 'getyourguide',
    title: 'Kayak y snorkel en los acantilados de Maro',
    summary:
      'Ruta guiada en kayak por las calas de Maro-Cerro Gordo con parada para snorkel en cuevas marinas.',
    imageUrl: 'https://picsum.photos/seed/kayak/800/600',
    imageAlt: 'Kayaks junto a acantilados y agua turquesa',
    priceFrom: 35,
    rating: 4.9,
    duration: '3 horas',
    providerUrl: 'https://www.getyourguide.es/nerja-l2534/kayak-maro/',
    tags: ['aventura', 'mar', 'verano'],
  },
];
