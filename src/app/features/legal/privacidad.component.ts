import { Component, OnInit, inject } from '@angular/core';
import { LegalLayoutComponent } from './legal-layout.component';
import { SeoService } from '../../core/services/seo.service';
import { JsonLdService, breadcrumbList } from '../../core/services/json-ld.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-privacidad',
  standalone: true,
  imports: [LegalLayoutComponent],
  template: `
    <app-legal-layout title="Política de privacidad">
      <p>
        En Meet Málaga respetamos tu privacidad conforme al Reglamento (UE) 2016/679
        (RGPD) y a la LOPDGDD.
      </p>
      <h2>Responsable del tratamiento</h2>
      <p>[Tu nombre o razón social] · [tu&#64;email.com]</p>
      <h2>Qué datos tratamos</h2>
      <ul>
        <li>Datos de navegación y analítica (de forma agregada y anónima).</li>
        <li>Datos que nos facilites voluntariamente en formularios de contacto, si los hay.</li>
      </ul>
      <p>
        No solicitamos datos de pago: las reservas se realizan en las plataformas de
        terceros, que aplican su propia política de privacidad.
      </p>
      <h2>Finalidad y base legal</h2>
      <p>
        Mejorar el sitio y medir su rendimiento (interés legítimo / consentimiento
        para cookies analíticas) y atender tus consultas (consentimiento).
      </p>
      <h2>Terceros</h2>
      <p>
        Utilizamos servicios como Google Analytics y plataformas de afiliación. Al
        pulsar sus enlaces, tus datos pasan a regirse por las políticas de dichos
        terceros.
      </p>
      <h2>Tus derechos</h2>
      <p>
        Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición,
        limitación y portabilidad escribiendo a [tu&#64;email.com].
      </p>
    </app-legal-layout>
  `,
})
export class PrivacidadComponent implements OnInit {
  private seo = inject(SeoService);
  private jsonLd = inject(JsonLdService);
  ngOnInit() {
    this.seo.update({
      title: 'Política de privacidad',
      description: 'Política de privacidad de Meet Málaga: qué datos recogemos, con qué finalidad los tratamos conforme al RGPD y cómo ejercer tus derechos de acceso y supresión.',
      path: '/privacidad',
    });
    this.jsonLd.set(breadcrumbList([
      { name: environment.siteName, path: '' },
      { name: 'Política de privacidad', path: '/privacidad' },
    ]));
  }
}
