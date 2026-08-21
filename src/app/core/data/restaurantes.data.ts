import { Offer } from '../models/offer.model';

/**
 * RESTAURANTES. Con TheFork ganas comisión por comensal sentado a través de
 * reservas. Enlaza a la ficha del restaurante en TheFork (thefork.es).
 * Confirma el formato de tu enlace de afiliado en tu red (Awin/CJ).
 */
export const RESTAURANTES: Offer[] = [
  {
    id: 'resto-el-pimpi',
    vertical: 'restaurantes',
    provider: 'thefork',
    title: $localize`:@@offer.resto-el-pimpi.title:El Pimpi`,
    summary:
      $localize`:@@offer.resto-el-pimpi.summary:La bodega más emblemática de Málaga, entre barricas firmadas y vistas al Teatro Romano. Cocina andaluza.`,
    imageUrl: 'https://picsum.photos/seed/pimpi/800/600',
    imageAlt: $localize`:@@offer.resto-el-pimpi.imageAlt:Interior de una bodega tradicional malagueña`,
    priceFrom: 30,
    rating: 4.5,
    providerUrl: 'https://www.thefork.es/restaurante/el-pimpi',
    tags: ['andaluza', 'centro', 'iconico'],
    featured: true,
  },
  {
    id: 'resto-jose-carlos-garcia',
    vertical: 'restaurantes',
    provider: 'thefork',
    title: $localize`:@@offer.resto-jose-carlos-garcia.title:José Carlos García`,
    summary:
      $localize`:@@offer.resto-jose-carlos-garcia.summary:Estrella Michelin en el puerto. Alta cocina malagueña con producto de mercado y menú degustación.`,
    imageUrl: 'https://picsum.photos/seed/michelin/800/600',
    imageAlt: $localize`:@@offer.resto-jose-carlos-garcia.imageAlt:Plato de alta cocina emplatado con detalle`,
    priceFrom: 120,
    rating: 4.8,
    providerUrl: 'https://www.thefork.es/restaurante/jose-carlos-garcia',
    tags: ['michelin', 'puerto', 'degustacion'],
  },
  {
    id: 'resto-los-mellizos',
    vertical: 'restaurantes',
    provider: 'thefork',
    title: $localize`:@@offer.resto-los-mellizos.title:Marisquería Los Mellizos`,
    summary:
      $localize`:@@offer.resto-los-mellizos.summary:Pescaíto frito y marisco fresco junto a la playa. Un clásico para probar el sabor del Mediterráneo.`,
    imageUrl: 'https://picsum.photos/seed/marisco/800/600',
    imageAlt: $localize`:@@offer.resto-los-mellizos.imageAlt:Fuente de pescaíto frito malagueño`,
    priceFrom: 35,
    rating: 4.4,
    providerUrl: 'https://www.thefork.es/restaurante/los-mellizos',
    tags: ['marisco', 'playa', 'tradicional'],
  },
  {
    id: 'resto-uvedoble',
    vertical: 'restaurantes',
    provider: 'thefork',
    title: $localize`:@@offer.resto-uvedoble.title:Uvedoble Taberna`,
    summary:
      $localize`:@@offer.resto-uvedoble.summary:Tapas de autor en el centro: producto local con un giro creativo. Reserva recomendada.`,
    imageUrl: 'https://picsum.photos/seed/uvedoble/800/600',
    imageAlt: $localize`:@@offer.resto-uvedoble.imageAlt:Tapas de autor sobre una mesa de madera`,
    priceFrom: 25,
    rating: 4.6,
    providerUrl: 'https://www.thefork.es/restaurante/uvedoble-taberna',
    tags: ['tapas', 'autor', 'centro'],
  },
];
