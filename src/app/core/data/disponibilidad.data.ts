import { Disponibilidad } from '../models/disponibilidad.model';

/**
 * TU disponibilidad. Edita esto y el calendario se actualiza solo.
 *
 * 1) `semanal`: tu horario habitual. Es "evergreen": no caduca, no hay que
 *    tocarlo cada semana. Días de la semana: 0=domingo, 1=lunes ... 6=sábado.
 * 2) Las listas de fechas (conTour, ocupados, noDisponibles) son las
 *    EXCEPCIONES: solo apunta los días concretos que se salen de lo normal.
 *
 * Los `rutaId` deben coincidir con los de rutas.data.ts.
 */
export const DISPONIBILIDAD: Disponibilidad = {
  // Horario habitual por día de la semana
  semanal: {
    1: [ // Lunes
      { rutaId: 'malaga-esencial', hora: '10:00' },
      { rutaId: 'atardecer-gibralfaro', hora: '19:00' },
    ],
    3: [ // Miércoles
      { rutaId: 'malaga-picasso', hora: '11:00' },
      { rutaId: 'tapas-sabores', hora: '13:30' },
    ],
    5: [ // Viernes
      { rutaId: 'malaga-esencial', hora: '10:00' },
      { rutaId: 'leyendas-noche', hora: '21:00' },
    ],
    6: [ // Sábado
      { rutaId: 'alcazaba-gibralfaro', hora: '10:30' },
      { rutaId: 'malaga-familia', hora: '12:00' },
    ],
  },

  // Excepciones (ejemplos: sustituye por tus fechas reales, formato YYYY-MM-DD)
  extra: {
    // '2026-08-30': [{ rutaId: 'caminito-del-rey', hora: '08:30' }],
  },
  conTour: [
    // '2026-08-22',
  ],
  ocupados: [
    // '2026-08-25',
  ],
  noDisponibles: [
    // '2026-08-24',
  ],
};
