import { Routes } from '@angular/router';

/**
 * Todas las páginas se cargan con lazy loading (loadComponent) para que el
 * bundle inicial sea pequeño. Las cuatro verticales comparten un mismo
 * componente y se diferencian por el objeto `data.config`.
 */
export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'tours',
    loadComponent: () =>
      import('./features/vertical/vertical-page.component').then((m) => m.VerticalPageComponent),
    data: {
      config: {
        vertical: 'tours',
        eyebrow: 'Experiencias',
        title: 'Tours y visitas guiadas en Málaga',
        subtitle: 'Desde la Alcazaba hasta el Caminito del Rey, reserva las mejores experiencias con guías locales.',
      },
    },
  },
  {
    path: 'coches',
    loadComponent: () =>
      import('./features/vertical/vertical-page.component').then((m) => m.VerticalPageComponent),
    data: {
      config: {
        vertical: 'coches',
        eyebrow: 'Movilidad',
        title: 'Alquiler de coches en Málaga',
        subtitle: 'Compara compañías con recogida en el aeropuerto o en el centro. Cancelación gratuita y sin sorpresas.',
      },
    },
  },
  {
    path: 'restaurantes',
    loadComponent: () =>
      import('./features/vertical/vertical-page.component').then((m) => m.VerticalPageComponent),
    data: {
      config: {
        vertical: 'restaurantes',
        eyebrow: 'Gastronomía',
        title: 'Los mejores restaurantes de Málaga',
        subtitle: 'Del pescaíto frito a la estrella Michelin. Reserva mesa en los sitios que de verdad merecen la pena.',
      },
    },
  },
  {
    path: 'ocio',
    loadComponent: () =>
      import('./features/vertical/vertical-page.component').then((m) => m.VerticalPageComponent),
    data: {
      config: {
        vertical: 'ocio',
        eyebrow: 'Planes',
        title: 'Ocio y actividades en Málaga',
        subtitle: 'Flamenco, baños árabes, kayak y planes para todos los gustos. Llena tus días de experiencias.',
      },
    },
  },

  // Legales
  { path: 'aviso-legal', loadComponent: () => import('./features/legal/aviso-legal.component').then((m) => m.AvisoLegalComponent) },
  { path: 'privacidad', loadComponent: () => import('./features/legal/privacidad.component').then((m) => m.PrivacidadComponent) },
  { path: 'cookies', loadComponent: () => import('./features/legal/cookies.component').then((m) => m.CookiesComponent) },
  { path: 'afiliados', loadComponent: () => import('./features/legal/afiliados.component').then((m) => m.AfiliadosComponent) },

  // 404
  { path: '**', loadComponent: () => import('./features/not-found/not-found.component').then((m) => m.NotFoundComponent) },
];
