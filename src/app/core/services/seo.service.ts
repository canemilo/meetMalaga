import { DOCUMENT } from '@angular/common';
import { Injectable, inject, LOCALE_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';

export interface SeoData {
  title: string;
  description: string;
  path?: string;     // ruta relativa, p.ej. "/tours"
  image?: string;    // URL absoluta de imagen social
}

// Mismos locales y prefijos que angular.json (i18n.locales) y generate-sitemap.mjs.
// Las rutas no se traducen, solo se les antepone el prefijo del idioma.
const LOCALES = ['es', 'en', 'fr', 'de'] as const;
type Locale = (typeof LOCALES)[number];
const BASE_HREF: Record<Locale, string> = { es: '', en: '/en', fr: '/fr', de: '/de' };
const OG_LOCALE: Record<Locale, string> = { es: 'es_ES', en: 'en_US', fr: 'fr_FR', de: 'de_DE' };

/**
 * Fija título y meta tags por página. Como el proyecto usa SSR, estas
 * etiquetas se renderizan en el HTML del servidor y Google las indexa bien.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);
  private readonly locale: Locale = (() => {
    const raw = inject(LOCALE_ID);
    return (LOCALES as readonly string[]).includes(raw) ? (raw as Locale) : 'es';
  })();

  update(data: SeoData): void {
    const path = data.path ?? '';
    const fullTitle = `${data.title} | ${environment.siteName}`;
    const url = environment.siteUrl + BASE_HREF[this.locale] + path;

    this.title.setTitle(fullTitle);
    this.meta.updateTag({ name: 'description', content: data.description });

    // Open Graph (Facebook, WhatsApp, etc.)
    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: data.description });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:url', content: url });
    if (data.image) {
      this.meta.updateTag({ property: 'og:image', content: data.image });
    }
    this.meta.updateTag({ property: 'og:locale', content: OG_LOCALE[this.locale] });
    for (const l of LOCALES) {
      if (l !== this.locale) {
        this.meta.updateTag(
          { property: 'og:locale:alternate', content: OG_LOCALE[l] },
          `property='og:locale:alternate' and content='${OG_LOCALE[l]}'`,
        );
      }
    }

    // Twitter
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });

    // Canonical y hreflang van como <link>, no <meta>: Meta.updateTag de Angular
    // solo gestiona etiquetas <meta>, así que estas se insertan a mano en <head>.
    this.upsertLink("link[rel='canonical']", { rel: 'canonical', href: url });

    for (const l of LOCALES) {
      this.upsertLink(`link[rel='alternate'][hreflang='${l}']`, {
        rel: 'alternate',
        hreflang: l,
        href: `${environment.siteUrl}${BASE_HREF[l]}${path}`,
      });
    }
    this.upsertLink("link[rel='alternate'][hreflang='x-default']", {
      rel: 'alternate',
      hreflang: 'x-default',
      href: `${environment.siteUrl}${path}`,
    });
  }

  /** Crea o reemplaza un <link> del <head> que cumpla el selector dado. */
  private upsertLink(selector: string, attrs: Record<string, string>): void {
    this.document.head.querySelector(selector)?.remove();
    const link = this.document.createElement('link');
    for (const [name, value] of Object.entries(attrs)) {
      link.setAttribute(name, value);
    }
    this.document.head.appendChild(link);
  }
}
