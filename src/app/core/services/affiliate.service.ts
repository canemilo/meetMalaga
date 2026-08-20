import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../../environments/environment';
import { AffiliateProvider, Offer } from '../models/offer.model';

/**
 * Corazón del modelo de negocio.
 *
 * Cada proveedor rastrea la comisión mediante un parámetro en la URL que
 * identifica tu cuenta. Este servicio toma la URL "limpia" del producto y le
 * inyecta ese parámetro con TU ID (definido en environment.ts).
 *
 * IMPORTANTE: los nombres de parámetro (aid, partner_id, a_aid...) son los
 * habituales de cada red, pero CONFÍRMALOS en tu panel de afiliado, porque
 * pueden cambiar según el país o el tipo de enlace. Ver docs/AFILIADOS.md.
 */

/** Nombre del query param que espera cada proveedor para el ID de afiliado. */
const PROVIDER_PARAM: Record<AffiliateProvider, string | null> = {
  civitatis: 'aid',
  getyourguide: 'partner_id',
  tiqets: 'partner',
  discovercars: 'a_aid',
  localrent: 'ref',
  thefork: 'utm_source', // TheFork suele ir por red (Awin/CJ); ajústalo.
  booking: 'aid',
  // Trip.com genera el enlace ya rastreable con su Link Builder: el seguimiento
  // va incrustado, así que NO le añadimos parámetros (lo dejamos tal cual).
  tripcom: null,
  directo: null, // enlace propio, sin ID de afiliado
};

@Injectable({ providedIn: 'root' })
export class AffiliateService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly ids = environment.affiliate;

  /**
   * Devuelve la URL final con tu ID de afiliado ya incrustado.
   * Segura para SSR: no usa APIs de navegador.
   */
  buildLink(offer: Offer): string {
    const param = PROVIDER_PARAM[offer.provider];
    const id = this.idFor(offer.provider);

    // Enlace directo o sin ID configurado: devolvemos la URL tal cual.
    if (!param || !id) {
      return offer.providerUrl;
    }

    try {
      const url = new URL(offer.providerUrl);
      url.searchParams.set(param, id);
      // Marca de origen propia para poder cruzar datos en tu analítica.
      url.searchParams.set('utm_source', 'meetmalaga');
      url.searchParams.set('utm_medium', 'affiliate');
      url.searchParams.set('utm_campaign', offer.vertical);
      return url.toString();
    } catch {
      // Si providerUrl no fuese una URL absoluta válida, no rompas la web.
      return offer.providerUrl;
    }
  }

  /**
   * Registra el clic de salida (para tu analítica de conversiones) y luego
   * el navegador seguirá el enlace de forma natural. Llámalo desde (click).
   * En servidor no hace nada.
   */
  trackOutbound(offer: Offer): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // GA4 (si lo tienes cargado). No falla si gtag no existe.
    const gtag = (globalThis as any).gtag;
    if (typeof gtag === 'function') {
      gtag('event', 'affiliate_click', {
        provider: offer.provider,
        vertical: offer.vertical,
        offer_id: offer.id,
        value: offer.priceFrom ?? 0,
      });
    }
  }

  private idFor(provider: AffiliateProvider): string | null {
    switch (provider) {
      case 'civitatis': return this.ids.civitatis;
      case 'getyourguide': return this.ids.getyourguide;
      case 'tiqets': return this.ids.tiqets;
      case 'discovercars': return this.ids.discovercars;
      case 'localrent': return this.ids.localrent;
      case 'thefork': return this.ids.thefork;
      case 'booking': return this.ids.booking;
      default: return null;
    }
  }
}
