import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';

const SCRIPT_ID = 'ld-json';

/** Construye un BreadcrumbList de schema.org a partir de rutas relativas. */
export function breadcrumbList(items: Array<{ name: string; path: string }>): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: environment.siteUrl + item.path,
    })),
  };
}

/**
 * Inyecta datos estructurados (JSON-LD) en el <head> usando el DOCUMENT
 * inyectable, para que funcione igual en SSR (prerender) y en el navegador.
 */
@Injectable({ providedIn: 'root' })
export class JsonLdService {
  private readonly document = inject(DOCUMENT);

  set(data: object | object[]): void {
    this.remove();
    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.id = SCRIPT_ID;
    script.text = JSON.stringify(data);
    this.document.head.appendChild(script);
  }

  remove(): void {
    this.document.getElementById(SCRIPT_ID)?.remove();
  }
}
