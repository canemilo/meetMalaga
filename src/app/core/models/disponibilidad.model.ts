/**
 * Disponibilidad del calendario de tus rutas propias.
 *
 * Idea clave para que sea fácil de mantener:
 *  - Defines tu disponibilidad HABITUAL por día de la semana (reglas evergreen).
 *  - Solo marcas las EXCEPCIONES por fecha concreta (días que te programas,
 *    días que se ocupan, días que no trabajas). No hace falta tocar el resto.
 */

/** Una franja reservable: qué ruta y a qué hora. */
export interface Franja {
  /** id de una ruta de rutas.data.ts. */
  rutaId: string;
  /** Hora legible, p.ej. "10:00". */
  hora: string;
}

/** Estados posibles de un día (derivados, no se guardan a mano todos). */
export type EstadoDia =
  | 'disponible'     // libre con franjas reservables
  | 'con-tour'       // ya tienes un tour tuyo ese día
  | 'ocupado'        // se va a ocupar / reservado
  | 'no-disponible'  // no trabajas ese día
  | 'sin-tours'      // día normal sin disponibilidad publicada
  | 'pasado';        // día ya pasado

export interface Disponibilidad {
  /**
   * Disponibilidad habitual por día de la semana (0 = domingo ... 6 = sábado).
   * Cada día lista sus franjas reservables. Días sin entrada = sin disponibilidad.
   */
  semanal: Record<number, Franja[]>;

  /** Franjas extra en fechas concretas (YYYY-MM-DD) que se suman a lo semanal. */
  extra?: Record<string, Franja[]>;

  /** Días con un tour tuyo ya programado (YYYY-MM-DD). */
  conTour?: string[];

  /** Días que se van a ocupar / ya reservados (YYYY-MM-DD). */
  ocupados?: string[];

  /** Días que no trabajas por tus asuntos (YYYY-MM-DD). */
  noDisponibles?: string[];
}
