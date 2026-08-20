import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../../environments/environment';

/**
 * Carga Google Analytics (GA4) SOLO cuando el usuario ha aceptado las cookies
 * analíticas, cumpliendo el RGPD. Es seguro para SSR: no hace nada en servidor
 * ni si no hay `analyticsId` configurado.
 */
@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private readonly platformId = inject(PLATFORM_ID);
  private loaded = false;

  /** Llamar cuando el usuario acepta las cookies analíticas. */
  enable(): void {
    if (this.loaded) return;
    if (!isPlatformBrowser(this.platformId)) return;

    const id = environment.analyticsId;
    if (!id) return; // sin ID configurado, no cargamos nada

    // Inyecta gtag.js
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    document.head.appendChild(script);

    const w = window as any;
    w.dataLayer = w.dataLayer || [];
    w.gtag = function () { w.dataLayer.push(arguments); };
    w.gtag('js', new Date());
    w.gtag('config', id, { anonymize_ip: true });

    this.loaded = true;
  }

  /** Registra una visita de página (útil al navegar en una SPA). */
  pageView(path: string): void {
    if (!this.loaded) return;
    const gtag = (window as any).gtag;
    if (typeof gtag === 'function') {
      gtag('event', 'page_view', { page_path: path });
    }
  }
}
