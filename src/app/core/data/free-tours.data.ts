import { FreeTour } from '../models/free-tour.model';

/**
 * TUS free tours. Sustituye `freetourUrl` y `guruwalkUrl` por las URLs reales
 * de tus fichas en cada plataforma (las de abajo son marcadores que apuntan a
 * la home de cada web). Ajusta horarios, idiomas y punto de encuentro.
 *
 * Consejo: pon el enlace directo a la FICHA del tour, no a la home, para que el
 * viajero pueda reservar en un clic.
 */
export const FREE_TOURS: FreeTour[] = [
  {
    id: 'free-centro-historico',
    title: $localize`:@@freetour.free-centro-historico.title:Free Tour por el centro histórico`,
    tagline: $localize`:@@freetour.free-centro-historico.tagline:La mejor forma de conocer Málaga nada más llegar.`,
    description:
      $localize`:@@freetour.free-centro-historico.description:El recorrido imprescindible: en un par de horas te cuento la historia, las plazas y los rincones con más encanto del casco antiguo. Ideal para tu primer día.`,
    highlights: [
      $localize`:@@freetour.free-centro-historico.highlight.0:Catedral y Calle Larios`,
      $localize`:@@freetour.free-centro-historico.highlight.1:Plaza de la Constitución`,
      $localize`:@@freetour.free-centro-historico.highlight.2:Teatro Romano y exterior de la Alcazaba`,
      $localize`:@@freetour.free-centro-historico.highlight.3:Plaza de la Merced y Picasso`,
    ],
    duration: $localize`:@@freetour.free-centro-historico.duration:2,5 horas`,
    meetingPoint: $localize`:@@freetour.free-centro-historico.meetingPoint:Plaza de la Marina, junto a la fuente`,
    languages: [
      $localize`:@@freetour.free-centro-historico.language.0:Español`,
      $localize`:@@freetour.free-centro-historico.language.1:English`,
    ],
    schedule: $localize`:@@freetour.free-centro-historico.schedule:Todos los días, 10:00 y 17:00`,
    category: 'esencial',
    imageUrl: 'https://picsum.photos/seed/freecentro/800/600',
    imageAlt: $localize`:@@freetour.free-centro-historico.imageAlt:Grupo de free tour en el centro histórico de Málaga`,
    freetourUrl: 'https://www.freetour.com/',
    guruwalkUrl: 'https://www.guruwalk.com/',
    featured: true,
  },
  {
    id: 'free-alcazaba-gibralfaro',
    title: $localize`:@@freetour.free-alcazaba-gibralfaro.title:Free Tour de la Málaga musulmana`,
    tagline: $localize`:@@freetour.free-alcazaba-gibralfaro.tagline:Alcazaba, Gibralfaro y ocho siglos de historia.`,
    description:
      $localize`:@@freetour.free-alcazaba-gibralfaro.description:Recorremos el entorno de la Alcazaba y subimos hacia Gibralfaro para descubrir la Málaga andalusí y sus mejores vistas de la bahía.`,
    highlights: [
      $localize`:@@freetour.free-alcazaba-gibralfaro.highlight.0:Exterior de la Alcazaba`,
      $localize`:@@freetour.free-alcazaba-gibralfaro.highlight.1:Camino hacia Gibralfaro`,
      $localize`:@@freetour.free-alcazaba-gibralfaro.highlight.2:Mirador sobre el puerto`,
      $localize`:@@freetour.free-alcazaba-gibralfaro.highlight.3:Historia nazarí de la ciudad`,
    ],
    duration: $localize`:@@freetour.free-alcazaba-gibralfaro.duration:2 horas`,
    meetingPoint: $localize`:@@freetour.free-alcazaba-gibralfaro.meetingPoint:Junto al Teatro Romano`,
    languages: [
      $localize`:@@freetour.free-alcazaba-gibralfaro.language.0:Español`,
      $localize`:@@freetour.free-alcazaba-gibralfaro.language.1:English`,
    ],
    schedule: $localize`:@@freetour.free-alcazaba-gibralfaro.schedule:Lunes, miércoles y viernes, 11:00`,
    category: 'historia',
    imageUrl: 'https://picsum.photos/seed/freealcazaba/800/600',
    imageAlt: $localize`:@@freetour.free-alcazaba-gibralfaro.imageAlt:Vistas de Málaga desde el entorno de la Alcazaba`,
    freetourUrl: 'https://www.freetour.com/',
    guruwalkUrl: 'https://www.guruwalk.com/',
    featured: true,
  },
  {
    id: 'free-picasso',
    title: $localize`:@@freetour.free-picasso.title:Free Tour de Picasso`,
    tagline: $localize`:@@freetour.free-picasso.tagline:La Málaga que vio nacer al genio.`,
    description:
      $localize`:@@freetour.free-picasso.description:Un paseo por la Málaga de Picasso: las plazas de su infancia, el contexto de la ciudad y las anécdotas que marcaron sus primeros años.`,
    highlights: [
      $localize`:@@freetour.free-picasso.highlight.0:Plaza de la Merced y casa natal`,
      $localize`:@@freetour.free-picasso.highlight.1:Entorno del Museo Picasso`,
      $localize`:@@freetour.free-picasso.highlight.2:Iglesia de Santiago`,
      $localize`:@@freetour.free-picasso.highlight.3:Anécdotas de su niñez`,
    ],
    duration: $localize`:@@freetour.free-picasso.duration:1,5 horas`,
    meetingPoint: $localize`:@@freetour.free-picasso.meetingPoint:Plaza de la Merced, junto al monumento a Picasso`,
    languages: [
      $localize`:@@freetour.free-picasso.language.0:Español`,
      $localize`:@@freetour.free-picasso.language.1:English`,
    ],
    schedule: $localize`:@@freetour.free-picasso.schedule:Martes y jueves, 17:00`,
    category: 'arte',
    imageUrl: 'https://picsum.photos/seed/freepicasso/800/600',
    imageAlt: $localize`:@@freetour.free-picasso.imageAlt:Plaza de la Merced, cuna de Picasso, en Málaga`,
    freetourUrl: 'https://www.freetour.com/',
    guruwalkUrl: 'https://www.guruwalk.com/',
  },
  {
    id: 'free-leyendas-noche',
    title: $localize`:@@freetour.free-leyendas-noche.title:Free Tour de leyendas y misterios`,
    tagline: $localize`:@@freetour.free-leyendas-noche.tagline:El casco antiguo cambia cuando cae la noche.`,
    description:
      $localize`:@@freetour.free-leyendas-noche.description:Historias, leyendas y misterios del Málaga antiguo en un paseo nocturno por sus calles más evocadoras. Para quien quiere una cara distinta de la ciudad.`,
    highlights: [
      $localize`:@@freetour.free-leyendas-noche.highlight.0:Calles y plazas del casco antiguo de noche`,
      $localize`:@@freetour.free-leyendas-noche.highlight.1:Leyendas y sucesos históricos`,
      $localize`:@@freetour.free-leyendas-noche.highlight.2:Rincones poco conocidos`,
      $localize`:@@freetour.free-leyendas-noche.highlight.3:Ambiente único al anochecer`,
    ],
    duration: $localize`:@@freetour.free-leyendas-noche.duration:1,5 horas`,
    meetingPoint: $localize`:@@freetour.free-leyendas-noche.meetingPoint:Plaza del Obispo, frente a la Catedral`,
    languages: [$localize`:@@freetour.free-leyendas-noche.language.0:Español`],
    schedule: $localize`:@@freetour.free-leyendas-noche.schedule:Viernes y sábados, 21:00`,
    category: 'noche',
    imageUrl: 'https://picsum.photos/seed/freeleyendas/800/600',
    imageAlt: $localize`:@@freetour.free-leyendas-noche.imageAlt:Calle del casco antiguo de Málaga iluminada de noche`,
    freetourUrl: 'https://www.freetour.com/',
    guruwalkUrl: 'https://www.guruwalk.com/',
  },
];
