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
    title: 'Free Tour por el centro histórico',
    tagline: 'La mejor forma de conocer Málaga nada más llegar.',
    description:
      'El recorrido imprescindible: en un par de horas te cuento la historia, las plazas y los rincones con más encanto del casco antiguo. Ideal para tu primer día.',
    highlights: [
      'Catedral y Calle Larios',
      'Plaza de la Constitución',
      'Teatro Romano y exterior de la Alcazaba',
      'Plaza de la Merced y Picasso',
    ],
    duration: '2,5 horas',
    meetingPoint: 'Plaza de la Marina, junto a la fuente',
    languages: ['Español', 'English'],
    schedule: 'Todos los días, 10:00 y 17:00',
    category: 'esencial',
    imageUrl: 'https://picsum.photos/seed/freecentro/800/600',
    imageAlt: 'Grupo de free tour en el centro histórico de Málaga',
    freetourUrl: 'https://www.freetour.com/',
    guruwalkUrl: 'https://www.guruwalk.com/',
    featured: true,
  },
  {
    id: 'free-alcazaba-gibralfaro',
    title: 'Free Tour de la Málaga musulmana',
    tagline: 'Alcazaba, Gibralfaro y ocho siglos de historia.',
    description:
      'Recorremos el entorno de la Alcazaba y subimos hacia Gibralfaro para descubrir la Málaga andalusí y sus mejores vistas de la bahía.',
    highlights: [
      'Exterior de la Alcazaba',
      'Camino hacia Gibralfaro',
      'Mirador sobre el puerto',
      'Historia nazarí de la ciudad',
    ],
    duration: '2 horas',
    meetingPoint: 'Junto al Teatro Romano',
    languages: ['Español', 'English'],
    schedule: 'Lunes, miércoles y viernes, 11:00',
    category: 'historia',
    imageUrl: 'https://picsum.photos/seed/freealcazaba/800/600',
    imageAlt: 'Vistas de Málaga desde el entorno de la Alcazaba',
    freetourUrl: 'https://www.freetour.com/',
    guruwalkUrl: 'https://www.guruwalk.com/',
    featured: true,
  },
  {
    id: 'free-picasso',
    title: 'Free Tour de Picasso',
    tagline: 'La Málaga que vio nacer al genio.',
    description:
      'Un paseo por la Málaga de Picasso: las plazas de su infancia, el contexto de la ciudad y las anécdotas que marcaron sus primeros años.',
    highlights: [
      'Plaza de la Merced y casa natal',
      'Entorno del Museo Picasso',
      'Iglesia de Santiago',
      'Anécdotas de su niñez',
    ],
    duration: '1,5 horas',
    meetingPoint: 'Plaza de la Merced, junto al monumento a Picasso',
    languages: ['Español', 'English'],
    schedule: 'Martes y jueves, 17:00',
    category: 'arte',
    imageUrl: 'https://picsum.photos/seed/freepicasso/800/600',
    imageAlt: 'Plaza de la Merced, cuna de Picasso, en Málaga',
    freetourUrl: 'https://www.freetour.com/',
    guruwalkUrl: 'https://www.guruwalk.com/',
  },
  {
    id: 'free-leyendas-noche',
    title: 'Free Tour de leyendas y misterios',
    tagline: 'El casco antiguo cambia cuando cae la noche.',
    description:
      'Historias, leyendas y misterios del Málaga antiguo en un paseo nocturno por sus calles más evocadoras. Para quien quiere una cara distinta de la ciudad.',
    highlights: [
      'Calles y plazas del casco antiguo de noche',
      'Leyendas y sucesos históricos',
      'Rincones poco conocidos',
      'Ambiente único al anochecer',
    ],
    duration: '1,5 horas',
    meetingPoint: 'Plaza del Obispo, frente a la Catedral',
    languages: ['Español'],
    schedule: 'Viernes y sábados, 21:00',
    category: 'noche',
    imageUrl: 'https://picsum.photos/seed/freeleyendas/800/600',
    imageAlt: 'Calle del casco antiguo de Málaga iluminada de noche',
    freetourUrl: 'https://www.freetour.com/',
    guruwalkUrl: 'https://www.guruwalk.com/',
  },
];
