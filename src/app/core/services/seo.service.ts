import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';

export interface SeoData {
  title: string;
  description: string;
  path?: string;     // ruta relativa, p.ej. "/tours"
  image?: string;    // URL absoluta de imagen social
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

    // Open Graph (Facebook, WhatsApp, etc.)
    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: data.description });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:url', content: url });
    if (data.image) {
      this.meta.updateTag({ property: 'og:image', content: data.image });
    }

    // Twitter
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });

    // Canonical
    this.meta.updateTag({ rel: 'canonical', href: url }, "rel='canonical'");
  }
}
