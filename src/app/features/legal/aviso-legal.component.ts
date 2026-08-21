import { Component, OnInit, inject } from '@angular/core';
import { LegalLayoutComponent } from './legal-layout.component';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-aviso-legal',
  standalone: true,
  imports: [LegalLayoutComponent],
  template: `
    <app-legal-layout title="Aviso legal" i18n-title="@@legal.avisoLegal.title">
      <h2 i18n="@@legal.avisoLegal.titular.title">Titular del sitio</h2>
      <ul>
        <li i18n="@@legal.avisoLegal.titular.item1">Titular: [Tu nombre o razón social]</li>
        <li i18n="@@legal.avisoLegal.titular.item2">NIF/CIF: [Tu identificación fiscal]</li>
        <li i18n="@@legal.avisoLegal.titular.item3">Domicilio: [Tu dirección]</li>
        <li i18n="@@legal.avisoLegal.titular.item4">Email de contacto: [tu&#64;email.com]</li>
      </ul>
      <h2 i18n="@@legal.avisoLegal.objeto.title">Objeto</h2>
      <p i18n="@@legal.avisoLegal.objeto.text">
        Este sitio web tiene por objeto ofrecer información y recomendaciones sobre
        servicios turísticos en Málaga y su provincia, y redirigir a plataformas de
        terceros donde el usuario puede contratarlos.
      </p>
      <h2 i18n="@@legal.avisoLegal.responsabilidad.title">Responsabilidad</h2>
      <p i18n="@@legal.avisoLegal.responsabilidad.text">
        Meet Málaga no presta directamente los servicios (tours, alquiler de coches,
        restauración, ocio): actúa como intermediario informativo. La contratación,
        el pago, la ejecución y la atención al cliente corresponden a la plataforma o
        proveedor final. Meet Málaga no se responsabiliza de la disponibilidad,
        precios o condiciones de dichos terceros.
      </p>
      <h2 i18n="@@legal.avisoLegal.propiedad.title">Propiedad intelectual</h2>
      <p i18n="@@legal.avisoLegal.propiedad.text">
        Los contenidos propios de este sitio pertenecen a su titular. Las marcas y
        logotipos de terceros pertenecen a sus respectivos propietarios.
      </p>
      <h2 i18n="@@legal.avisoLegal.legislacion.title">Legislación aplicable</h2>
      <p i18n="@@legal.avisoLegal.legislacion.text">Estas condiciones se rigen por la legislación española.</p>
    </app-legal-layout>
  `,
})
export class AvisoLegalComponent implements OnInit {
  private seo = inject(SeoService);
  ngOnInit() {
    this.seo.update({ title: 'Aviso legal', description: 'Aviso legal de Meet Málaga.', path: '/aviso-legal' });
  }
}
