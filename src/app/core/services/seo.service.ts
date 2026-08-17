import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';

export interface SeoData {
  title: string;
  description: string;
  path?: string;     // ruta relativa, p.ej. "/tours"
  image?: string;    // URL absoluta de imagen social
  noindex?: boolean; // true en páginas que no deben indexarse (p.ej. 404)
}

/**
 * Fija título y meta tags por página. Como el proyecto usa SSR, estas
 * etiquetas se renderizan en el HTML del servidor y Google las indexa bien.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  update(data: SeoData): void {
    const fullTitle = `${data.title} | ${environment.siteName}`;
    const url = environment.siteUrl + (data.path ?? '');

    this.title.setTitle(fullTitle);
    this.meta.updateTag({ name: 'description', content: data.description });
    this.meta.updateTag({ name: 'robots', content: data.noindex ? 'noindex, nofollow' : 'index, follow' });

    // Open Graph (Facebook, WhatsApp, etc.)
    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: data.description });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: environment.siteName });
    this.meta.updateTag({ property: 'og:locale', content: 'es_ES' });
    if (data.image) {
      this.meta.updateTag({ property: 'og:image', content: data.image });
    }

    // Twitter
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: fullTitle });
    this.meta.updateTag({ name: 'twitter:description', content: data.description });
    if (data.image) {
      this.meta.updateTag({ name: 'twitter:image', content: data.image });
    }

    // Canonical y og:url: una página noindex (p.ej. 404) no debe declarar
    // una URL canónica real, para no confundir a Google sobre qué URL indexar.
    if (data.noindex) {
      this.meta.removeTag("rel='canonical'");
      this.meta.removeTag("property='og:url'");
    } else {
      this.meta.updateTag({ property: 'og:url', content: url });
      this.meta.updateTag({ rel: 'canonical', href: url }, "rel='canonical'");
    }
  }
}
