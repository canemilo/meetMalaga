import { Component, OnInit, inject } from '@angular/core';
import { LegalLayoutComponent } from './legal-layout.component';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-privacidad',
  standalone: true,
  imports: [LegalLayoutComponent],
  template: `
    <app-legal-layout title="Política de privacidad" i18n-title="@@legal.privacidad.title">
      <p i18n="@@legal.privacidad.intro">
        En Meet Málaga respetamos tu privacidad conforme al Reglamento (UE) 2016/679
        (RGPD) y a la LOPDGDD.
      </p>
      <h2 i18n="@@legal.privacidad.responsable.title">Responsable del tratamiento</h2>
      <p i18n="@@legal.privacidad.responsable.text">[Tu nombre o razón social] · [tu&#64;email.com]</p>
      <h2 i18n="@@legal.privacidad.datos.title">Qué datos tratamos</h2>
      <ul>
        <li i18n="@@legal.privacidad.datos.item1">Datos de navegación y analítica (de forma agregada y anónima).</li>
        <li i18n="@@legal.privacidad.datos.item2">Datos que nos facilites voluntariamente en formularios de contacto, si los hay.</li>
      </ul>
      <p i18n="@@legal.privacidad.sinPagos">
        No solicitamos datos de pago: las reservas se realizan en las plataformas de
        terceros, que aplican su propia política de privacidad.
      </p>
      <h2 i18n="@@legal.privacidad.finalidad.title">Finalidad y base legal</h2>
      <p i18n="@@legal.privacidad.finalidad.text">
        Mejorar el sitio y medir su rendimiento (interés legítimo / consentimiento
        para cookies analíticas) y atender tus consultas (consentimiento).
      </p>
      <h2 i18n="@@legal.privacidad.terceros.title">Terceros</h2>
      <p i18n="@@legal.privacidad.terceros.text">
        Utilizamos servicios como Google Analytics y plataformas de afiliación. Al
        pulsar sus enlaces, tus datos pasan a regirse por las políticas de dichos
        terceros.
      </p>
      <h2 i18n="@@legal.privacidad.derechos.title">Tus derechos</h2>
      <p i18n="@@legal.privacidad.derechos.text">
        Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición,
        limitación y portabilidad escribiendo a [tu&#64;email.com].
      </p>
    </app-legal-layout>
  `,
})
export class PrivacidadComponent implements OnInit {
  private seo = inject(SeoService);
  ngOnInit() {
    this.seo.update({ title: 'Política de privacidad', description: 'Cómo tratamos tus datos en Meet Málaga.', path: '/privacidad' });
  }
}
