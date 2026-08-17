import { Component, OnInit, inject } from '@angular/core';
import { LegalLayoutComponent } from './legal-layout.component';
import { SeoService } from '../../core/services/seo.service';
import { JsonLdService, breadcrumbList } from '../../core/services/json-ld.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-aviso-legal',
  standalone: true,
  imports: [LegalLayoutComponent],
  template: `
    <app-legal-layout title="Aviso legal">
      <h2>Titular del sitio</h2>
      <ul>
        <li>Titular: [Tu nombre o razón social]</li>
        <li>NIF/CIF: [Tu identificación fiscal]</li>
        <li>Domicilio: [Tu dirección]</li>
        <li>Email de contacto: [tu&#64;email.com]</li>
      </ul>
      <h2>Objeto</h2>
      <p>
        Este sitio web tiene por objeto ofrecer información y recomendaciones sobre
        servicios turísticos en Málaga y su provincia, y redirigir a plataformas de
        terceros donde el usuario puede contratarlos.
      </p>
      <h2>Responsabilidad</h2>
      <p>
        Meet Málaga no presta directamente los servicios (tours, alquiler de coches,
        restauración, ocio): actúa como intermediario informativo. La contratación,
        el pago, la ejecución y la atención al cliente corresponden a la plataforma o
        proveedor final. Meet Málaga no se responsabiliza de la disponibilidad,
        precios o condiciones de dichos terceros.
      </p>
      <h2>Propiedad intelectual</h2>
      <p>
        Los contenidos propios de este sitio pertenecen a su titular. Las marcas y
        logotipos de terceros pertenecen a sus respectivos propietarios.
      </p>
      <h2>Legislación aplicable</h2>
      <p>Estas condiciones se rigen por la legislación española.</p>
    </app-legal-layout>
  `,
})
export class AvisoLegalComponent implements OnInit {
  private seo = inject(SeoService);
  private jsonLd = inject(JsonLdService);
  ngOnInit() {
    this.seo.update({
      title: 'Aviso legal',
      description: 'Aviso legal de Meet Málaga: titularidad del sitio, condiciones de uso, responsabilidad como intermediario informativo y propiedad intelectual de los contenidos.',
      path: '/aviso-legal',
    });
    this.jsonLd.set(breadcrumbList([
      { name: environment.siteName, path: '' },
      { name: 'Aviso legal', path: '/aviso-legal' },
    ]));
  }
}
