import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Ruta } from '../../core/models/ruta.model';
import { RUTAS } from '../../core/data/rutas.data';
import { SeoService } from '../../core/services/seo.service';
import { CalendarioComponent } from '../../shared/components/calendario/calendario.component';

/**
 * "Nuestras rutas": el producto PROPIO. No usa afiliación. La reserva se hace
 * por WhatsApp (número en environment.contacto) y el cobro se cierra por
 * Stripe/PayPal o Bizum/transferencia. Si el WhatsApp está vacío, el botón
 * muestra un aviso en lugar de un enlace roto.
 */
@Component({
  selector: 'app-rutas',
  standalone: true,
  imports: [CommonModule, RouterLink, CalendarioComponent],
  template: `
    <section class="hero-mini">
      <div class="container">
        <p class="eyebrow">Rutas guiadas por nosotros</p>
        <h1>Nuestras rutas por Málaga</h1>
        <p class="hero-mini__sub">
          Estas son las rutas que guío personalmente. Elige la que más te llame,
          escríbeme por WhatsApp y cerramos la fecha. Grupos reducidos y trato cercano.
        </p>
      </div>
    </section>

    <!-- Calendario de disponibilidad -->
    <section class="container cal-wrap">
      <div class="cal-head">
        <p class="eyebrow">Disponibilidad</p>
        <h2>Calendario de mis tours</h2>
        <p class="cal-sub">
          Consulta qué días tengo rutas disponibles y en qué franjas. Pulsa un día
          en amarillo y elige la hora para reservar tu plaza.
        </p>
      </div>
      <app-calendario />
    </section>

    <!-- Cómo reservar -->
    <section class="container steps">
      <div class="step">
        <span class="step__n">1</span>
        <div><h3>Elige tu ruta</h3><p>Mira las opciones y su punto de encuentro.</p></div>
      </div>
      <div class="step">
        <span class="step__n">2</span>
        <div><h3>Escríbeme por WhatsApp</h3><p>Acordamos día, hora y número de personas.</p></div>
      </div>
      <div class="step">
        <span class="step__n">3</span>
        <div><h3>Confirma el pago</h3><p>Con tarjeta (Stripe/PayPal) o por Bizum/transferencia.</p></div>
      </div>
    </section>

    <!-- Rutas -->
    <section class="container grid-wrap">
      <div class="grid">
        <article class="ruta" *ngFor="let r of rutas">
          <div class="ruta__media">
            <img [src]="r.imageUrl" [alt]="r.imageAlt" loading="lazy" />
            <span class="ruta__cat">{{ catLabel[r.category] }}</span>
            <span class="ruta__req" *ngIf="r.onRequest">Bajo petición</span>
          </div>
          <div class="ruta__body">
            <h2 class="ruta__title">{{ r.title }}</h2>
            <p class="ruta__tagline">{{ r.tagline }}</p>
            <p class="ruta__desc">{{ r.description }}</p>

            <ul class="ruta__highlights">
              <li *ngFor="let h of r.highlights">{{ h }}</li>
            </ul>

            <dl class="ruta__facts">
              <div><dt>Duración</dt><dd>{{ r.duration }}</dd></div>
              <div><dt>Punto de encuentro</dt><dd>{{ r.meetingPoint }}</dd></div>
              <div *ngIf="r.maxGroup"><dt>Grupo máx.</dt><dd>{{ r.maxGroup }} personas</dd></div>
            </dl>

            <div class="ruta__foot">
              <span class="ruta__price">{{ r.pricePerPerson }} €<small>por persona</small></span>
              <a
                *ngIf="whatsapp; else sinWa"
                class="btn btn--wa"
                [href]="waLink(r)"
                target="_blank"
                rel="noopener"
              >Reservar por WhatsApp</a>
              <ng-template #sinWa>
                <span class="ruta__nowa">Configura tu WhatsApp en environment.ts</span>
              </ng-template>
            </div>
          </div>
        </article>
      </div>
    </section>

    <!-- Formas de pago -->
    <section class="container pay">
      <h2>Cómo se paga</h2>
      <p class="pay__intro">
        Una vez acordada la fecha por WhatsApp, confirmas tu plaza con cualquiera de
        estas opciones. El precio es el mismo en todas.
      </p>
      <div class="pay__grid">
        <div class="pay__card" *ngIf="pago.stripePaymentLink || pago.paypalLink || !hayPagoManual">
          <h3>Tarjeta</h3>
          <p>Pago seguro con Stripe o PayPal; te enviamos el enlace al confirmar.</p>
        </div>
        <div class="pay__card" *ngIf="pago.bizum || !hayPagoManual">
          <h3>Bizum</h3>
          <p>{{ pago.bizum ? 'Al número ' + pago.bizum : 'Rápido y sin comisiones (configura tu número).' }}</p>
        </div>
        <div class="pay__card" *ngIf="pago.iban || !hayPagoManual">
          <h3>Transferencia</h3>
          <p>{{ pago.iban ? 'IBAN: ' + pago.iban : 'Por transferencia bancaria (configura tu IBAN).' }}</p>
        </div>
      </div>
    </section>

    <!-- Cruce inverso hacia free tours -->
    <section class="container cross">
      <div class="cross__box">
        <div>
          <h2>¿Todavía no me conoces?</h2>
          <p>
            Empieza por un free tour: reservas gratis y pagas al final lo que
            quieras. Es la mejor forma de conocerme antes de una ruta privada.
          </p>
        </div>
        <a routerLink="/free-tours" class="btn btn--primary">Ver free tours</a>
      </div>
    </section>
  `,
  styles: [`
    .hero-mini { padding: 3.5rem 0 1rem; }
    .hero-mini h1 { font-size: var(--step-3); max-width: 18ch; }
    .hero-mini__sub { color: var(--tinta-60); max-width: 56ch; font-size: var(--step-1); }

    .cal-wrap { margin-top: 2.2rem; }
    .cal-head { margin-bottom: 1.2rem; }
    .cal-head h2 { font-size: var(--step-2); margin: 0 0 .3rem; }
    .cal-sub { margin: 0; color: var(--tinta-60); max-width: 56ch; }

    /* pasos */
    .steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.2rem; margin-top: 2rem; }
    .step { display: flex; gap: .9rem; align-items: flex-start; padding: 1.1rem 1.2rem; background: #fff; border: 1px solid var(--linea); border-radius: var(--radio); }
    .step__n { flex: none; width: 30px; height: 30px; border-radius: 50%; background: var(--mar); color: var(--cal); font-family: var(--mono); font-weight: 700; display: grid; place-items: center; }
    .step h3 { font-size: var(--step-0); margin: .1rem 0 .2rem; }
    .step p { margin: 0; font-size: var(--step--1); color: var(--tinta-60); }
    @media (max-width: 760px) { .steps { grid-template-columns: 1fr; } }

    /* grid rutas */
    .grid-wrap { padding-top: 2.5rem; }
    .grid { display: grid; gap: 1.8rem; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); }

    .ruta { display: flex; flex-direction: column; background: #fff; border: 1px solid var(--linea); border-radius: var(--radio); overflow: hidden; }
    .ruta__media { position: relative; aspect-ratio: 16 / 10; overflow: hidden; }
    .ruta__media img { width: 100%; height: 100%; object-fit: cover; }
    .ruta__cat { position: absolute; top: .8rem; left: .8rem; font-family: var(--mono); font-size: .66rem; letter-spacing: .05em; text-transform: uppercase; background: rgba(16,34,43,.85); color: var(--cal); padding: .28rem .7rem; border-radius: 999px; }
    .ruta__req { position: absolute; top: .8rem; right: .8rem; font-family: var(--mono); font-size: .66rem; text-transform: uppercase; background: var(--sol); color: var(--tinta); padding: .28rem .7rem; border-radius: 999px; }

    .ruta__body { display: flex; flex-direction: column; gap: .6rem; padding: 1.2rem 1.3rem 1.4rem; }
    .ruta__title { font-size: var(--step-1); margin: 0; }
    .ruta__tagline { margin: 0; color: var(--mar); font-weight: 600; font-size: var(--step--1); }
    .ruta__desc { margin: 0; color: var(--tinta-60); font-size: var(--step--1); }

    .ruta__highlights { margin: .3rem 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: .3rem; }
    .ruta__highlights li { position: relative; padding-left: 1.1rem; font-size: var(--step--1); color: var(--tinta); }
    .ruta__highlights li::before { content: ''; position: absolute; left: 0; top: .55em; width: 6px; height: 6px; border-radius: 50%; background: var(--sol); }

    .ruta__facts { margin: .4rem 0 0; display: flex; flex-direction: column; gap: .4rem; }
    .ruta__facts > div { display: flex; justify-content: space-between; gap: 1rem; border-top: 1px solid var(--linea); padding-top: .4rem; }
    .ruta__facts dt { margin: 0; font-size: .78rem; color: var(--tinta-60); }
    .ruta__facts dd { margin: 0; font-size: .82rem; text-align: right; font-weight: 500; }

    .ruta__foot { display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin-top: .8rem; flex-wrap: wrap; }
    .ruta__price { font-family: var(--mono); font-weight: 700; font-size: var(--step-2); color: var(--mar); line-height: 1; }
    .ruta__price small { display: block; font-family: var(--body); font-weight: 500; font-size: .68rem; color: var(--tinta-60); }
    .ruta__nowa { font-size: .78rem; color: var(--tinta-60); font-style: italic; }

    .btn--wa { background: #25D366; color: #06351f; }
    .btn--wa:hover { transform: translateY(-2px); box-shadow: var(--sombra); }

    /* pago */
    .pay { margin-top: 3.5rem; }
    .pay h2 { font-size: var(--step-2); }
    .pay__intro { color: var(--tinta-60); max-width: 60ch; }
    .pay__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.2rem; margin-top: 1.4rem; }
    .pay__card { padding: 1.3rem; background: var(--cal-hueso); border-radius: var(--radio); }
    .pay__card h3 { font-size: var(--step-1); margin: 0 0 .3rem; }
    .pay__card p { margin: 0; font-size: var(--step--1); color: var(--tinta-60); }
    @media (max-width: 760px) { .pay__grid { grid-template-columns: 1fr; } }

    .cross { margin-top: 3rem; }
    .cross__box { display: flex; align-items: center; justify-content: space-between; gap: 1.5rem; flex-wrap: wrap; padding: 1.8rem 2rem; background: var(--cal-hueso); border-radius: var(--radio); border: 1px solid var(--linea); }
    .cross__box h2 { font-size: var(--step-1); margin: 0 0 .3rem; }
    .cross__box p { margin: 0; color: var(--tinta-60); max-width: 54ch; }
  `],
})
export class RutasComponent implements OnInit {
  private readonly seo = inject(SeoService);

  rutas: Ruta[] = RUTAS;
  pago = environment.contacto;
  whatsapp = environment.contacto.whatsapp;

  catLabel: Record<string, string> = {
    historia: 'Historia',
    arte: 'Arte',
    gastronomia: 'Gastronomía',
    naturaleza: 'Naturaleza',
    familia: 'Familia',
    noche: 'Noche',
  };

  get hayPagoManual(): boolean {
    return !!(this.pago.stripePaymentLink || this.pago.paypalLink || this.pago.bizum || this.pago.iban);
  }

  ngOnInit(): void {
    this.seo.update({
      title: 'Nuestras rutas guiadas por Málaga',
      description:
        'Rutas guiadas por Málaga con guía local: centro histórico, Picasso, Alcazaba, tapas, atardeceres y más. Grupos reducidos. Reserva por WhatsApp.',
      path: '/rutas',
      image: this.rutas[0]?.imageUrl,
    });
  }

  /** Enlace de WhatsApp con la ruta ya escrita en el mensaje. */
  waLink(r: Ruta): string {
    const msg = `Hola, me interesa la ruta "${r.title}". ¿Qué fechas tenéis disponibles?`;
    return `https://wa.me/${this.whatsapp}?text=${encodeURIComponent(msg)}`;
  }
}
