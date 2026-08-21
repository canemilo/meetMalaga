import { Offer } from '../models/offer.model';

/**
 * Catálogo de TOURS. Sustituye `providerUrl` por la URL real del producto
 * en Civitatis / GetYourGuide (sin tu ID: el AffiliateService lo añade).
 * Cambia las imágenes por fotos propias en /assets/img cuando las tengas.
 */
export const TOURS: Offer[] = [
  {
    id: 'tour-alcazaba-gibralfaro',
    vertical: 'tours',
    provider: 'civitatis',
    title: $localize`:@@offer.tour-alcazaba-gibralfaro.title:Alcazaba y Castillo de Gibralfaro`,
    summary:
      $localize`:@@offer.tour-alcazaba-gibralfaro.summary:Recorre la fortaleza musulmana mejor conservada de España y sube al mirador con las mejores vistas de la bahía.`,
    imageUrl: 'https://picsum.photos/seed/alcazaba/800/600',
    imageAlt: $localize`:@@offer.tour-alcazaba-gibralfaro.imageAlt:Murallas de la Alcazaba de Málaga al atardecer`,
    priceFrom: 18,
    rating: 4.8,
    duration: $localize`:@@offer.tour-alcazaba-gibralfaro.duration:2,5 horas`,
    providerUrl: 'https://www.civitatis.com/es/malaga/visita-guiada-alcazaba-gibralfaro/',
    tags: ['historia', 'imprescindible', 'centro'],
    featured: true,
  },
  {
    id: 'tour-caminito-del-rey',
    vertical: 'tours',
    provider: 'civitatis',
    title: $localize`:@@offer.tour-caminito-del-rey.title:Caminito del Rey desde Málaga`,
    summary:
      $localize`:@@offer.tour-caminito-del-rey.summary:La pasarela colgada sobre el desfiladero de los Gaitanes, con transporte de ida y vuelta incluido.`,
    imageUrl: 'https://picsum.photos/seed/caminito/800/600',
    imageAlt: $localize`:@@offer.tour-caminito-del-rey.imageAlt:Pasarela del Caminito del Rey sobre el desfiladero`,
    priceFrom: 55,
    rating: 4.9,
    duration: $localize`:@@offer.tour-caminito-del-rey.duration:Día completo`,
    providerUrl: 'https://www.civitatis.com/es/malaga/excursion-caminito-del-rey/',
    tags: ['naturaleza', 'aventura', 'excursion'],
    featured: true,
  },
  {
    id: 'tour-tapas-centro',
    vertical: 'tours',
    provider: 'getyourguide',
    title: $localize`:@@offer.tour-tapas-centro.title:Ruta de tapas por el centro histórico`,
    summary:
      $localize`:@@offer.tour-tapas-centro.summary:Cinco paradas gastronómicas con vino y especialidades malagueñas guiadas por un local.`,
    imageUrl: 'https://picsum.photos/seed/tapas/800/600',
    imageAlt: $localize`:@@offer.tour-tapas-centro.imageAlt:Tapas y vino en una taberna del centro de Málaga`,
    priceFrom: 45,
    rating: 4.7,
    duration: $localize`:@@offer.tour-tapas-centro.duration:3 horas`,
    providerUrl: 'https://www.getyourguide.es/malaga-l163/ruta-de-tapas/',
    tags: ['gastronomia', 'noche', 'local'],
  },
  {
    id: 'tour-picasso',
    vertical: 'tours',
    provider: 'tiqets',
    title: $localize`:@@offer.tour-picasso.title:Museo Picasso Málaga`,
    summary:
      $localize`:@@offer.tour-picasso.summary:Entrada a la colección permanente en la ciudad natal del pintor, en el Palacio de Buenavista.`,
    imageUrl: 'https://picsum.photos/seed/picasso/800/600',
    imageAlt: $localize`:@@offer.tour-picasso.imageAlt:Fachada del Museo Picasso de Málaga`,
    priceFrom: 12,
    rating: 4.6,
    duration: $localize`:@@offer.tour-picasso.duration:1,5 horas`,
    providerUrl: 'https://www.tiqets.com/es/malaga-atracciones-c75885/museo-picasso-malaga/',
    tags: ['arte', 'museo', 'centro'],
  },
  {
    id: 'tour-catamaran',
    vertical: 'tours',
    provider: 'civitatis',
    title: $localize`:@@offer.tour-catamaran.title:Paseo en catamarán por la bahía`,
    summary:
      $localize`:@@offer.tour-catamaran.summary:Navegación de una hora frente a la costa con baño opcional y vistas del skyline de Málaga.`,
    imageUrl: 'https://picsum.photos/seed/catamaran/800/600',
    imageAlt: $localize`:@@offer.tour-catamaran.imageAlt:Catamarán navegando frente a la costa de Málaga`,
    priceFrom: 20,
    rating: 4.5,
    duration: $localize`:@@offer.tour-catamaran.duration:1 hora`,
    providerUrl: 'https://www.civitatis.com/es/malaga/paseo-catamaran/',
    tags: ['mar', 'relax', 'familia'],
  },
  {
    id: 'tour-nerja-frigiliana',
    vertical: 'tours',
    provider: 'getyourguide',
    title: $localize`:@@offer.tour-nerja-frigiliana.title:Nerja y Frigiliana con cuevas`,
    summary:
      $localize`:@@offer.tour-nerja-frigiliana.summary:Excursión a los pueblos blancos de la Axarquía y a las famosas Cuevas de Nerja.`,
    imageUrl: 'https://picsum.photos/seed/frigiliana/800/600',
    imageAlt: $localize`:@@offer.tour-nerja-frigiliana.imageAlt:Calles blancas de Frigiliana con flores`,
    priceFrom: 42,
    rating: 4.7,
    duration: $localize`:@@offer.tour-nerja-frigiliana.duration:Día completo`,
    providerUrl: 'https://www.getyourguide.es/malaga-l163/nerja-frigiliana/',
    tags: ['pueblos', 'excursion', 'naturaleza'],
  },
];
