import { Component, OnInit, inject } from '@angular/core';
import { LegalLayoutComponent } from './legal-layout.component';
import { SeoService } from '../../core/services/seo.service';

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
  ngOnInit() {
    this.seo.update({ title: 'Política de privacidad', description: 'Cómo tratamos tus datos en Meet Málaga.', path: '/privacidad' });
  }
}
