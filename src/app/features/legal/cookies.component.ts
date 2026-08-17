import {Component, OnInit, inject} from '@angular/core';
import {LegalLayoutComponent} from './legal-layout.component';
import {SeoService} from '../../core/services/seo.service';

@Component({
  selector: 'app-cookies',
  standalone: true,
  imports: [LegalLayoutComponent],
  template: `
    <app-legal-layout title="Política de cookies">
      <p>
        Una cookie es un pequeño archivo que se guarda en tu dispositivo al visitar
        una web. Usamos cookies para que el sitio funcione y para entender cómo se
        utiliza.
      </p>
      <h2>Tipos de cookies que usamos</h2>
      <ul>
        <li><strong>Técnicas:</strong> necesarias para el funcionamiento del sitio.</li>
        <li><strong>Analíticas:</strong> nos ayudan a medir visitas (p. ej. Google Analytics). Requieren tu consentimiento.</li>
        <li><strong>De afiliación:</strong> algunos proveedores instalan cookies al pulsar sus enlaces para atribuir la reserva.</li>
      </ul>
      <h2>Gestión</h2>
      <p>
        Puedes aceptar o rechazar las cookies no esenciales desde el banner de cookies
        y cambiar tu elección en cualquier momento. También puedes eliminarlas desde
        la configuración de tu navegador.
      </p>
    </app-legal-layout>
  `,
})
export class CookiesComponent implements OnInit {
  private seo = inject(SeoService);

  ngOnInit() {
    this.seo.update({title: 'Política de cookies', description: 'Uso de cookies en Meet Málaga.', path: '/cookies'});
  }
}
