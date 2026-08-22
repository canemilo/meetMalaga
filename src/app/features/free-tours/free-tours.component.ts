import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FreeTour } from '../../core/models/free-tour.model';
import { FREE_TOURS } from '../../core/data/free-tours.data';
import { SeoService } from '../../core/services/seo.service';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { TiltDirective } from '../../shared/directives/tilt.directive';

/**
 * Free tours: la puerta de entrada del negocio. Cada tour enlaza a tu ficha en
 * Freetour y/o GuruWalk, que es donde se reserva (gratis, con propina al final).
 * No hay cobro ni afiliación aquí.
 *
 * Registro editorial (mismo lenguaje que la home): hero a dos columnas con la
 * firma ".corte" en la foto del tour destacado, pasos numerados como índice
 * real (no decorativo) y entrada en cascada de las tarjetas con appReveal.
 */
@Component({
  selector: 'app-free-tours',
  standalone: true,
  imports: [CommonModule, RouterLink, RevealDirective, TiltDirective],
  template: `
    <section class="hero-mini">
      <div class="container hero-mini__inner">
        <div class="hero-mini__copy" appReveal="right">
          <p class="eyebrow" i18n="@@freeTours.hero.eyebrow">Tours gratuitos con guía local</p>
          <h1 i18n="@@freeTours.hero.title">Free tours por Málaga</h1>
          <p class="hero-mini__lead" i18n="@@freeTours.hero.sub">
            Reserva gratis y paga al final lo que consideres, según lo que hayas
            disfrutado. La mejor forma de conocer Málaga y mi manera de hacerlo.
          </p>
        </div>
        <figure class="hero-mini__media corte" *ngIf="destacado as t" appReveal="left" [appRevealDelay]="0.12">
          <img [src]="t.imageUrl" [alt]="t.imageAlt" fetchpriority="high" width="700" height="875" />
        </figure>
      </div>
    </section>

    <!-- Cómo funciona: 3 pasos reales, numerados en el orden en que ocurren -->
    <section class="container info" aria-labelledby="info-eyebrow">
      <p id="info-eyebrow" class="eyebrow" i18n="@@freeTours.info.eyebrow">Cómo funciona</p>
      <div class="info__grid">
        <div class="info__item" appReveal="up">
          <span class="info__n">01</span>
          <div>
            <h3 i18n="@@freeTours.paso1.title">Reservas gratis</h3>
            <p i18n="@@freeTours.paso1.text">Eliges plaza en Freetour o GuruWalk sin pagar nada por adelantado.</p>
          </div>
        </div>
        <div class="info__item" appReveal="up" [appRevealDelay]="0.08">
          <span class="info__n">02</span>
          <div>
            <h3 i18n="@@freeTours.paso2.title">Disfrutas el tour</h3>
            <p i18n="@@freeTours.paso2.text">Nos vemos en el punto de encuentro a la hora indicada.</p>
          </div>
        </div>
        <div class="info__item" appReveal="up" [appRevealDelay]="0.16">
          <span class="info__n">03</span>
          <div>
            <h3 i18n="@@freeTours.paso3.title">Pagas lo que quieras</h3>
            <p i18n="@@freeTours.paso3.text">Al terminar, aportas lo que creas justo. Sin precio fijo.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Free tours -->
    <section class="container grid-wrap">
      <p class="eyebrow section-eyebrow" i18n="@@freeTours.grid.eyebrow">Elige tu free tour</p>
      <div class="grid" *ngIf="tours.length; else sinTours">
        <article class="ft" *ngFor="let t of tours; let i = index" appReveal="up" [appRevealDelay]="i * 0.08" appTilt [appTiltMax]="6">
          <div class="ft__media corte">
            <img [src]="t.imageUrl" [alt]="t.imageAlt" loading="lazy" />
            <span class="ft__free" i18n="@@freeTours.badgeGratis">Gratis · propina voluntaria</span>
          </div>
          <div class="ft__body">
            <h2 class="ft__title">{{ t.title }}</h2>
            <p class="ft__tagline">{{ t.tagline }}</p>
            <p class="ft__desc">{{ t.description }}</p>

            <ul class="ft__highlights">
              <li *ngFor="let h of t.highlights">{{ h }}</li>
            </ul>

            <dl class="ft__facts">
              <div><dt i18n="@@freeTours.facts.duracion">Duración</dt><dd>{{ t.duration }}</dd></div>
              <div><dt i18n="@@freeTours.facts.horario">Horario</dt><dd>{{ t.schedule }}</dd></div>
              <div><dt i18n="@@freeTours.facts.puntoEncuentro">Punto de encuentro</dt><dd>{{ t.meetingPoint }}</dd></div>
              <div><dt i18n="@@freeTours.facts.idiomas">Idiomas</dt><dd>{{ t.languages.join(', ') }}</dd></div>
            </dl>

            <div class="ft__book">
              <a
                *ngIf="t.freetourUrl"
                class="btn btn--ft"
                [href]="t.freetourUrl"
                target="_blank"
                rel="noopener"
                i18n="@@freeTours.reservarFreetour"
              >Reservar en Freetour</a>
              <a
                *ngIf="t.guruwalkUrl"
                class="btn btn--gw"
                [href]="t.guruwalkUrl"
                target="_blank"
                rel="noopener"
                i18n="@@freeTours.reservarGuruwalk"
              >Reservar en GuruWalk</a>
            </div>
          </div>
        </article>
      </div>
      <ng-template #sinTours>
        <p class="empty" i18n="@@freeTours.vacio">
          Todavía no hay free tours publicados.
          <a routerLink="/rutas">Mira las rutas privadas</a> mientras tanto.
        </p>
      </ng-template>
    </section>

    <!-- Embudo hacia rutas privadas -->
    <section class="container upsell">
      <div class="upsell__box" appReveal="up">
        <div>
          <h2 i18n="@@freeTours.upsell.title">¿Quieres algo más a medida?</h2>
          <p i18n="@@freeTours.upsell.text">
            Si prefieres un tour privado, con tu grupo y a tu ritmo, echa un
            vistazo a mis rutas. Reserva directa, sin intermediarios.
          </p>
        </div>
        <a routerLink="/rutas" class="btn btn--sol" i18n="@@freeTours.upsell.cta">Ver rutas privadas</a>
      </div>
    </section>
  `,
  styles: [`
    /* HERO — mismo lenguaje que la home: texto siempre primero, foto de apoyo
       con la firma .corte, en columna aparte y más pequeña que en el hero
       principal (esta es una página de producto, no la portada). */
    .hero-mini { padding: clamp(2.8rem, 6vw, 4.5rem) 0 clamp(1.6rem, 4vw, 2.6rem); }
    .hero-mini__inner {
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(200px, 340px);
      gap: clamp(1.8rem, 5vw, 3rem);
      align-items: center;
    }
    .hero-mini__copy { max-width: 44rem; }
    .hero-mini h1 { font-size: var(--step-3); margin: .3rem 0 1rem; max-width: 16ch; }
    .hero-mini__lead { color: var(--tinta-60); max-width: 52ch; font-size: var(--step-1); margin: 0; }
    .hero-mini__media { aspect-ratio: 4 / 5; overflow: hidden; box-shadow: var(--sombra); margin: 0; }
    .hero-mini__media img { width: 100%; height: 100%; object-fit: cover; }
    @media (max-width: 720px) {
      .hero-mini__inner { grid-template-columns: 1fr; }
      .hero-mini__media { order: 2; aspect-ratio: 4 / 3; max-width: 24rem; margin-inline: auto; }
    }

    /* Cómo funciona: índice real de 3 pasos, mismo trato visual que los
       pasos de /rutas — el numeral codifica el orden, no decora. */
    .info { margin-top: clamp(2.4rem, 5vw, 3.4rem); }
    .info__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.2rem; margin-top: 1.2rem; }
    .info__item { display: flex; gap: .9rem; align-items: flex-start; padding: 1.1rem 1.2rem; background: #fff; border: 1px solid var(--linea); border-radius: var(--radio); }
    .info__n { flex: none; width: 30px; height: 30px; border-radius: 50%; background: var(--mar); color: var(--cal); font-family: var(--mono); font-weight: 700; font-size: .78rem; display: grid; place-items: center; }
    .info__item h3 { font-size: var(--step-0); margin: .1rem 0 .2rem; }
    .info__item p { margin: 0; font-size: var(--step--1); color: var(--tinta-60); }
    @media (max-width: 760px) { .info__grid { grid-template-columns: 1fr; } }

    .grid-wrap { padding-top: var(--space-section); }
    .section-eyebrow { margin-bottom: 1.2rem; }
    .grid { display: grid; gap: 1.8rem; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); }

    .ft { display: flex; flex-direction: column; background: #fff; border: 1px solid var(--linea); border-radius: var(--radio); overflow: hidden; transition: box-shadow .18s ease; }
    .ft:hover, .ft:focus-within { box-shadow: var(--sombra); }
    .ft__media { position: relative; aspect-ratio: 16 / 10; overflow: hidden; }
    .ft__media img { width: 100%; height: 100%; object-fit: cover; transition: transform .35s ease; }
    .ft:hover .ft__media img, .ft:focus-within .ft__media img { transform: scale(1.04); }
    .ft__free { position: absolute; top: .8rem; left: .8rem; font-family: var(--mono); font-size: .66rem; letter-spacing: .04em; text-transform: uppercase; background: var(--sol); color: var(--tinta); padding: .28rem .7rem; border-radius: 999px; }

    .ft__body { display: flex; flex-direction: column; gap: .6rem; padding: 1.2rem 1.3rem 1.4rem; }
    .ft__title { font-size: var(--step-1); margin: 0; }
    .ft__tagline { margin: 0; color: var(--mar); font-weight: 600; font-size: var(--step--1); }
    .ft__desc { margin: 0; color: var(--tinta-60); font-size: var(--step--1); }

    .ft__highlights { margin: .3rem 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: .3rem; }
    .ft__highlights li { position: relative; padding-left: 1.1rem; font-size: var(--step--1); }
    .ft__highlights li::before { content: ''; position: absolute; left: 0; top: .55em; width: 6px; height: 6px; border-radius: 50%; background: var(--sol); }

    .ft__facts { margin: .4rem 0 0; display: flex; flex-direction: column; gap: .4rem; }
    .ft__facts > div { display: flex; justify-content: space-between; gap: 1rem; border-top: 1px solid var(--linea); padding-top: .4rem; }
    .ft__facts dt { margin: 0; font-size: .78rem; color: var(--tinta-60); }
    .ft__facts dd { margin: 0; font-size: .82rem; text-align: right; font-weight: 500; }

    .ft__book { display: flex; flex-wrap: wrap; gap: .6rem; margin-top: .9rem; }
    .btn--ft { background: var(--tinta); color: var(--cal); }
    .btn--ft:hover { transform: translateY(-2px); box-shadow: var(--sombra); }
    .btn--gw { background: transparent; color: var(--tinta); border: 1.5px solid var(--tinta); }
    .btn--gw:hover { background: var(--cal-hueso); }

    .upsell { margin-top: var(--space-section); }
    .upsell__box { display: flex; align-items: center; justify-content: space-between; gap: 1.5rem; flex-wrap: wrap; padding: 1.8rem 2rem; background: var(--mar); color: var(--cal); border-radius: var(--radio); }
    .upsell__box h2 { font-size: var(--step-2); margin: 0 0 .3rem; color: var(--cal); }
    .upsell__box p { margin: 0; color: rgba(247,243,236,.85); max-width: 52ch; }
  `],
})
export class FreeToursComponent implements OnInit {
  private readonly seo = inject(SeoService);
  tours: FreeTour[] = FREE_TOURS;
  /** Foto de apoyo del hero: el tour marcado como destacado, o el primero. */
  destacado: FreeTour | undefined = this.tours.find((t) => t.featured) ?? this.tours[0];

  ngOnInit(): void {
    this.seo.update({
      title: 'Free tours por Málaga',
      description:
        'Free tours por Málaga con guía local: centro histórico, Alcazaba, Picasso y leyendas. Reserva gratis en Freetour o GuruWalk y paga lo que quieras.',
      path: '/free-tours',
      image: this.tours[0]?.imageUrl,
    });
  }
}
