import { Ruta } from '../models/ruta.model';

/**
 * Rutas reales de Samuel. `pricePerPerson` es una estimación de partida:
 * ajústala en cuanto confirméis precio definitivo. Cambia las imágenes por
 * fotos propias en /assets/img cuando las tengas.
 */
export const RUTAS: Ruta[] = [
  {
    id: 'teatro-romano-alcazaba',
    title: $localize`:@@ruta.teatro-romano-alcazaba.title:Teatro Romano y Alcazaba`,
    tagline: $localize`:@@ruta.teatro-romano-alcazaba.tagline:Dos siglos de historia en apenas unos pasos.`,
    description:
      $localize`:@@ruta.teatro-romano-alcazaba.description:Un recorrido corto por dos de los enclaves más importantes del centro: el Teatro Romano y, justo encima, la Alcazaba. En un mismo paseo se ve cómo la ciudad pasó de romana a musulmana, con sus murallas, patios y miradores sobre el casco antiguo.`,
    highlights: [
      $localize`:@@ruta.teatro-romano-alcazaba.highlight.0:Teatro Romano de Málaga`,
      $localize`:@@ruta.teatro-romano-alcazaba.highlight.1:Puerta de entrada y murallas de la Alcazaba`,
      $localize`:@@ruta.teatro-romano-alcazaba.highlight.2:Patios y jardines interiores`,
      $localize`:@@ruta.teatro-romano-alcazaba.highlight.3:De la Málaga romana a la andalusí, en un solo recorrido`,
    ],
    duration: $localize`:@@ruta.teatro-romano-alcazaba.duration:45-60 min`,
    pricePerPerson: 15,
    meetingPoint: $localize`:@@ruta.teatro-romano-alcazaba.meetingPoint:Entrada del Teatro Romano, junto a la Alcazaba`,
    category: 'historia',
    imageUrl: 'https://picsum.photos/seed/teatroromanoalcazaba/800/600',
    imageAlt: $localize`:@@ruta.teatro-romano-alcazaba.imageAlt:Teatro Romano de Málaga con la Alcazaba al fondo`,
    featured: true,
  },
  {
    id: 'catedral-malaga',
    title: $localize`:@@ruta.catedral-malaga.title:Catedral de Málaga`,
    tagline: $localize`:@@ruta.catedral-malaga.tagline:La "Manquita" contada por dentro y por fuera.`,
    description:
      $localize`:@@ruta.catedral-malaga.description:Un paseo por la Catedral de Málaga, conocida como "la Manquita" por su torre inacabada, para entender su historia y por qué es uno de los símbolos con los que más se identifican los malagueños.`,
    highlights: [
      $localize`:@@ruta.catedral-malaga.highlight.0:Fachada y torre inacabada, "la Manquita"`,
      $localize`:@@ruta.catedral-malaga.highlight.1:Interior y capillas de la Catedral`,
      $localize`:@@ruta.catedral-malaga.highlight.2:Siglos de obras: por qué quedó a medias`,
      $localize`:@@ruta.catedral-malaga.highlight.3:Su lugar como símbolo de la ciudad`,
    ],
    duration: $localize`:@@ruta.catedral-malaga.duration:45-60 min`,
    pricePerPerson: 15,
    meetingPoint: $localize`:@@ruta.catedral-malaga.meetingPoint:Puerta principal de la Catedral, Plaza del Obispo`,
    category: 'historia',
    imageUrl: 'https://picsum.photos/seed/catedralmalaga/800/600',
    imageAlt: $localize`:@@ruta.catedral-malaga.imageAlt:Fachada de la Catedral de Málaga, la Manquita`,
    featured: true,
  },
  {
    id: 'museo-picasso',
    title: $localize`:@@ruta.museo-picasso.title:Museo Picasso`,
    tagline: $localize`:@@ruta.museo-picasso.tagline:La obra del genio malagueño. Próximamente.`,
    description:
      $localize`:@@ruta.museo-picasso.description:Una ruta centrada en la obra de Pablo Picasso, con parada en el Museo Picasso Málaga. Todavía la estoy preparando: en breve estará disponible para reservar.`,
    highlights: [
      $localize`:@@ruta.museo-picasso.highlight.0:Obras del Museo Picasso Málaga`,
      $localize`:@@ruta.museo-picasso.highlight.1:Contexto de su etapa y estilo`,
      $localize`:@@ruta.museo-picasso.highlight.2:Vínculo del pintor con su ciudad natal`,
    ],
    duration: $localize`:@@ruta.museo-picasso.duration:Por confirmar`,
    meetingPoint: $localize`:@@ruta.museo-picasso.meetingPoint:Por confirmar`,
    category: 'arte',
    imageUrl: 'https://picsum.photos/seed/museopicassomalaga/800/600',
    imageAlt: $localize`:@@ruta.museo-picasso.imageAlt:Entrada del Museo Picasso Málaga`,
    comingSoon: true,
  },
];
