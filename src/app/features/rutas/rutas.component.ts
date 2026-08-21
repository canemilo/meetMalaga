import { Component, OnInit, inject, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Ruta } from '../../core/models/ruta.model';
import { RUTAS } from '../../core/data/rutas.data';
import { SeoService } from '../../core/services/seo.service';
import { CalendarioComponent } from '../../shared/components/calendario/calendario.component';
import { GuiaBioComponent } from '../../shared/components/guia-bio/guia-bio.component';

/**
 * "Nuestras rutas": el producto PROPIO. No usa afiliación. La reserva se hace
 * por WhatsApp (número en environment.contacto) y el cobro se cierra por
 * Stripe/PayPal o Bizum/transferencia. Si el WhatsApp está vacío, el botón
 * muestra un aviso en lugar de un enlace roto.
 */
@Component({
  selector: 'app-rutas',
  standalone: true,
  imports: [CommonModule, RouterLink, CalendarioComponent, GuiaBioComponent],
  template: `
    <section class="hero-mini">
      <div class="container">
        <p class="eyebrow" i18n="@@rutas.hero.eyebrow">Rutas guiadas por nosotros</p>
        <h1 i18n="@@rutas.hero.title">Nuestras rutas por Málaga</h1>
        <p class="hero-mini__sub" i18n="@@rutas.hero.sub">
          Estas son las rutas que guío personalmente: a tu ritmo si vienes solo
          o en pareja, o con tu grupo si preferís ir juntos. Escríbeme por
          WhatsApp, cerramos fecha y precio, y nos vemos en el punto de encuentro.
        </p>
      </div>
    </section>

    <app-guia-bio />

    <!-- Calendario de disponibilidad -->
    <section class="container cal-wrap">
      <div class="cal-head">
        <p class="eyebrow" i18n="@@rutas.cal.eyebrow">Disponibilidad</p>
        <h2 i18n="@@rutas.cal.title">Calendario de mis tours</h2>
        <p class="cal-sub" i18n="@@rutas.cal.sub">
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
        <div><h3 i18n="@@rutas.paso1.title">Elige tu ruta</h3><p i18n="@@rutas.paso1.text">Mira las opciones y su punto de encuentro.</p></div>
      </div>
      <div class="step">
        <span class="step__n">2</span>
        <div><h3 i18n="@@rutas.paso2.title">Escríbeme por WhatsApp</h3><p i18n="@@rutas.paso2.text">Acordamos día, hora y número de personas.</p></div>
      </div>
      <div class="step">
        <span class="step__n">3</span>
        <div><h3 i18n="@@rutas.paso3.title">Confirma el pago</h3><p i18n="@@rutas.paso3.text">Con tarjeta (Stripe/PayPal) o por Bizum/transferencia.</p></div>
      </div>
    </section>

    <!-- Rutas -->
    <section class="container grid-wrap">
      <div class="grid" *ngIf="rutas.length; else sinRutas">
        <article class="ruta" *ngFor="let r of rutas">
          <div class="ruta__media">
            <img [src]="r.imageUrl" [alt]="r.imageAlt" loading="lazy" />
            <span class="ruta__cat">{{ catLabel[r.category] }}</span>
            <span class="ruta__soon" *ngIf="r.comingSoon" i18n="@@rutas.badge.proximamente">Próximamente</span>
            <span class="ruta__req" *ngIf="r.onRequest && !r.comingSoon" i18n="@@rutas.badge.bajoPeticion">Bajo petición</span>
          </div>
          <div class="ruta__body">
            <h2 class="ruta__title">{{ r.title }}</h2>
            <p class="ruta__tagline">{{ r.tagline }}</p>
            <p class="ruta__desc">{{ r.description }}</p>

            <ul class="ruta__highlights">
              <li *ngFor="let h of r.highlights">{{ h }}</li>
            </ul>

            <dl class="ruta__facts">
              <div><dt i18n="@@rutas.facts.duracion">Duración</dt><dd>{{ r.duration }}</dd></div>
              <div><dt i18n="@@rutas.facts.puntoEncuentro">Punto de encuentro</dt><dd>{{ r.meetingPoint }}</dd></div>
              <div *ngIf="r.maxGroup"><dt i18n="@@rutas.facts.grupoMax">Grupo máx.</dt><dd i18n="@@rutas.facts.personas">{{ r.maxGroup }} personas</dd></div>
            </dl>

            <div class="ruta__foot" *ngIf="!r.comingSoon; else avisoProximamente">
              <span class="ruta__price" *ngIf="r.pricePerPerson" i18n="@@rutas.precio.porPersona">{{ r.pricePerPerson }} €<small>por persona</small></span>
              <span class="ruta__price ruta__price--consulta" *ngIf="!r.pricePerPerson" i18n="@@rutas.precio.consultar">Precio a consultar</span>
              <a
                *ngIf="whatsapp; else sinWa"
                class="btn btn--wa"
                [href]="waLink(r)"
                target="_blank"
                rel="noopener"
                i18n="@@rutas.reservarWhatsapp"
              >Reservar por WhatsApp</a>
              <ng-template #sinWa>
                <span class="ruta__nowa" i18n="@@rutas.configuraWhatsapp">Configura tu WhatsApp en environment.ts</span>
              </ng-template>
            </div>
            <ng-template #avisoProximamente>
              <p class="ruta__nowa" i18n="@@rutas.noDisponibleReserva">Todavía no está disponible para reservar.</p>
            </ng-template>
          </div>
        </article>
      </div>
      <ng-template #sinRutas>
        <p class="empty" i18n="@@rutas.vacio">
          Todavía no hay rutas publicadas.
          <a routerLink="/free-tours">Empieza por un free tour</a> mientras preparo nuevas fechas.
        </p>
      </ng-template>
    </section>

    <!-- Formas de pago -->
    <section class="container pay">
      <h2 i18n="@@rutas.pay.title">Cómo se paga</h2>
      <p class="pay__intro" i18n="@@rutas.pay.intro">
        Una vez acordada la fecha por WhatsApp, confirmas tu plaza con cualquiera de
        estas opciones. El precio es el mismo en todas.
      </p>
      <div class="pay__grid">
        <div class="pay__card" *ngIf="pago.bizum || !hayPagoManual">
          <h3>Bizum</h3>
          <p>{{ bizumText() }}</p>
        </div>
        <div class="pay__card" *ngIf="pago.paypalLink || !hayPagoManual">
          <h3>PayPal</h3>
          <p>{{ paypalText() }}</p>
        </div>
        <div class="pay__card">
          <h3 i18n="@@rutas.pay.efectivo.title">Efectivo</h3>
          <p i18n="@@rutas.pay.efectivo.text">Pagas en persona el día de la ruta, antes o después del recorrido.</p>
        </div>
      </div>
    </section>

    <!-- Cruce inverso hacia free tours -->
    <section class="container cross">
      <div class="cross__box">
        <div>
          <h2 i18n="@@rutas.cross.title">¿Todavía no me conoces?</h2>
          <p i18n="@@rutas.cross.text">
            Empieza por un free tour: reservas gratis y pagas al final lo que
            quieras. Es la mejor forma de conocerme antes de una ruta privada.
          </p>
        </div>
        <a routerLink="/free-tours" class="btn btn--primary" i18n="@@rutas.cross.cta">Ver free tours</a>
      </div>
    </section>
  `,
  styles: [`
    .hero-mini { padding: 3.5rem 0 1rem; }
    .hero-mini h1 { font-size: var(--step-3); max-width: 18ch; }
    .hero-mini__sub { color: var(--tinta-60); max-width: 56ch; font-size: var(--step-1); }

    .cal-wrap { margin-top: var(--space-section); }
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
    .grid-wrap { padding-top: var(--space-section); }
    .grid { display: grid; gap: 1.8rem; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); }

    .ruta { display: flex; flex-direction: column; background: #fff; border: 1px solid var(--linea); border-radius: var(--radio); overflow: hidden; }
    .ruta__media { position: relative; aspect-ratio: 16 / 10; overflow: hidden; }
    .ruta__media img { width: 100%; height: 100%; object-fit: cover; }
    .ruta__cat { position: absolute; top: .8rem; left: .8rem; font-family: var(--mono); font-size: .66rem; letter-spacing: .05em; text-transform: uppercase; background: rgba(16,34,43,.85); color: var(--cal); padding: .28rem .7rem; border-radius: 999px; }
    .ruta__req { position: absolute; top: .8rem; right: .8rem; font-family: var(--mono); font-size: .66rem; text-transform: uppercase; background: var(--sol); color: var(--tinta); padding: .28rem .7rem; border-radius: 999px; }
    .ruta__soon { position: absolute; top: .8rem; right: .8rem; font-family: var(--mono); font-size: .66rem; text-transform: uppercase; background: var(--cal); color: var(--tinta-60); border: 1px solid var(--linea); padding: .28rem .7rem; border-radius: 999px; }

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
    .ruta__price--consulta { font-family: var(--body); font-weight: 600; font-size: var(--step--1); color: var(--tinta-60); }
    .ruta__nowa { font-size: .78rem; color: var(--tinta-60); font-style: italic; }

    .btn--wa { background: #25D366; color: #06351f; }
    .btn--wa:hover { transform: translateY(-2px); box-shadow: var(--sombra); }

    /* pago */
    .pay { margin-top: var(--space-section); }
    .pay h2 { font-size: var(--step-2); }
    .pay__intro { color: var(--tinta-60); max-width: 60ch; }
    .pay__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.2rem; margin-top: 1.4rem; }
    .pay__card { padding: 1.3rem; background: var(--cal-hueso); border-radius: var(--radio); }
    .pay__card h3 { font-size: var(--step-1); margin: 0 0 .3rem; }
    .pay__card p { margin: 0; font-size: var(--step--1); color: var(--tinta-60); }
    @media (max-width: 760px) { .pay__grid { grid-template-columns: 1fr; } }

    .cross { margin-top: var(--space-section); }
    .cross__box { display: flex; align-items: center; justify-content: space-between; gap: 1.5rem; flex-wrap: wrap; padding: 1.8rem 2rem; background: var(--cal-hueso); border-radius: var(--radio); border: 1px solid var(--linea); }
    .cross__box h2 { font-size: var(--step-1); margin: 0 0 .3rem; }
    .cross__box p { margin: 0; color: var(--tinta-60); max-width: 54ch; }
  `],
})
export class RutasComponent implements OnInit {
  private readonly seo = inject(SeoService);
  private readonly locale = inject(LOCALE_ID);

  rutas: Ruta[] = RUTAS;
  pago = environment.contacto;
  whatsapp = environment.contacto.whatsapp;

  catLabel: Record<string, string> = {
    historia: $localize`:@@rutas.cat.historia:Historia`,
    arte: $localize`:@@rutas.cat.arte:Arte`,
    gastronomia: $localize`:@@rutas.cat.gastronomia:Gastronomía`,
    naturaleza: $localize`:@@rutas.cat.naturaleza:Naturaleza`,
    familia: $localize`:@@rutas.cat.familia:Familia`,
    noche: $localize`:@@rutas.cat.noche:Noche`,
  };

  get hayPagoManual(): boolean {
    return !!(this.pago.paypalLink || this.pago.bizum);
  }

  bizumText(): string {
    return this.pago.bizum
      ? $localize`:@@rutas.pay.bizum.conNumero:Al número ${this.pago.bizum}`
      : $localize`:@@rutas.pay.bizum.sinNumero:Rápido y sin comisiones (configura tu número).`;
  }

  paypalText(): string {
    return this.pago.paypalLink
      ? $localize`:@@rutas.pay.paypal.conLink:Pago seguro; te enviamos el enlace al confirmar.`
      : $localize`:@@rutas.pay.paypal.sinLink:Configura tu enlace de PayPal.`;
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
    const msg = this.locale === 'es'
      ? `Hola, me interesa la ruta "${r.title}". ¿Qué fechas tenéis disponibles?`
      : `Hi, I'm interested in the "${r.title}" route. What dates do you have available?`;
    return `https://wa.me/${this.whatsapp}?text=${encodeURIComponent(msg)}`;
  }
}
