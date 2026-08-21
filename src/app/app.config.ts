import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';

import { routes } from './app.routes';

declare const $localize: { locale?: string } | undefined;

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      // Al navegar, sube arriba; y respeta anclas #fragment.
      withInMemoryScrolling({ scrollPositionRestoration: 'top', anchorScrolling: 'enabled' }),
    ),
    // Hidratación: reutiliza el HTML del servidor en lugar de repintar.
    provideClientHydration(),
    // Angular fija $localize.locale al idioma del build ya traducido/inlined.
    { provide: LOCALE_ID, useValue: typeof $localize !== 'undefined' ? $localize.locale ?? 'es' : 'es' },
  ],
};
