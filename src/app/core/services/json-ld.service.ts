import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';

const SCRIPT_ID = 'ld-json';

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
