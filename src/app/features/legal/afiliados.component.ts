import { Component, OnInit, inject } from '@angular/core';
import { LegalLayoutComponent } from './legal-layout.component';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-afiliados',
  standalone: true,
  imports: [LegalLayoutComponent],
  template: `
    <app-legal-layout title="Aviso de afiliados">
      <p>
        Meet Málaga es un sitio web independiente que participa en programas de
        afiliación de terceros como Civitatis, GetYourGuide, Tiqets, DiscoverCars,
        Localrent, TheFork y Booking, entre otros.
      </p>
      <h2>¿Qué significa esto?</h2>
      <p>
        Algunos enlaces de esta web son enlaces de afiliado. Si reservas o compras
        un servicio a través de ellos, Meet Málaga puede recibir una comisión de la
        plataforma correspondiente, <strong>sin ningún coste adicional para ti</strong>:
        pagas exactamente el mismo precio.
      </p>
      <h2>Nuestro compromiso</h2>
      <ul>
        <li>Recomendamos servicios por su interés, no por la comisión.</li>
        <li>Los precios mostrados son orientativos; el precio final lo fija cada plataforma.</li>
        <li>No gestionamos pagos ni reservas: eso lo hace directamente el proveedor.</li>
      </ul>
      <p>
        Cualquier duda sobre una reserva concreta debe dirigirse a la plataforma en
        la que la realizaste, que es quien presta el servicio.
      </p>
    </app-legal-layout>
  `,
})
export class AfiliadosComponent implements OnInit {
  private seo = inject(SeoService);
  ngOnInit() {
    this.seo.update({ title: 'Aviso de afiliados', description: 'Cómo funcionan los enlaces de afiliado en Meet Málaga.', path: '/afiliados' });
  }
}
