import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FreeTour } from '../../core/models/free-tour.model';
import { FREE_TOURS } from '../../core/data/free-tours.data';
import { SeoService } from '../../core/services/seo.service';

/**
 * Free tours: la puerta de entrada del negocio. Cada tour enlaza a tu ficha en
 * Freetour y/o GuruWalk, que es donde se reserva (gratis, con propina al final).
 * No hay cobro ni afiliación aquí.
 */
@Component({
  selector: 'app-free-tours',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="hero-mini">
      <div class="container">
        <p class="eyebrow">Tours gratuitos con guía local</p>
        <h1>Free tours por Málaga</h1>
        <p class="hero-mini__sub">
          Reserva gratis y paga al final lo que consideres, según lo que hayas
          disfrutado. La mejor forma de conocer Málaga y mi manera de hacerlo.
        </p>
      </div>
    </section>

    <!-- Cómo funciona -->
    <section class="container info">
      <div class="info__item">
        <h3>Reservas gratis</h3>
        <p>Eliges plaza en Freetour o GuruWalk sin pagar nada por adelantado.</p>
      </div>
      <div class="info__item">
        <h3>Disfrutas el tour</h3>
        <p>Nos vemos en el punto de encuentro a la hora indicada.</p>
      </div>
      <div class="info__item">
        <h3>Pagas lo que quieras</h3>
        <p>Al terminar, aportas lo que creas justo. Sin precio fijo.</p>
      </div>
    </section>

    <!-- Free tours -->
    <section class="container grid-wrap">
      <div class="grid">
        <article class="ft" *ngFor="let t of tours">
          <div class="ft__media">
            <img [src]="t.imageUrl" [alt]="t.imageAlt" loading="lazy" />
            <span class="ft__free">Gratis · propina voluntaria</span>
          </div>
          <div class="ft__body">
            <h2 class="ft__title">{{ t.title }}</h2>
            <p class="ft__tagline">{{ t.tagline }}</p>
            <p class="ft__desc">{{ t.description }}</p>

            <ul class="ft__highlights">
              <li *ngFor="let h of t.highlights">{{ h }}</li>
            </ul>

            <dl class="ft__facts">
              <div><dt>Duración</dt><dd>{{ t.duration }}</dd></div>
              <div><dt>Horario</dt><dd>{{ t.schedule }}</dd></div>
              <div><dt>Punto de encuentro</dt><dd>{{ t.meetingPoint }}</dd></div>
              <div><dt>Idiomas</dt><dd>{{ t.languages.join(', ') }}</dd></div>
            </dl>

            <div class="ft__book">
              <a
                *ngIf="t.freetourUrl"
                class="btn btn--ft"
                [href]="t.freetourUrl"
                target="_blank"
                rel="noopener"
              >Reservar en Freetour</a>
              <a
                *ngIf="t.guruwalkUrl"
                class="btn btn--gw"
                [href]="t.guruwalkUrl"
                target="_blank"
                rel="noopener"
              >Reservar en GuruWalk</a>
            </div>
          </div>
        </article>
      </div>
    </section>

    <!-- Embudo hacia rutas privadas -->
    <section class="container upsell">
      <div class="upsell__box">
        <div>
          <h2>¿Quieres algo más a medida?</h2>
          <p>
            Si prefieres un tour privado, con tu grupo y a tu ritmo, echa un
            vistazo a mis rutas. Reserva directa, sin intermediarios.
          </p>
        </div>
        <a routerLink="/rutas" class="btn btn--sol">Ver rutas privadas</a>
      </div>
    </section>
  `,
  styles: [`
    .hero-mini { padding: 3.5rem 0 1rem; }
    .hero-mini h1 { font-size: var(--step-3); max-width: 16ch; }
    .hero-mini__sub { color: var(--tinta-60); max-width: 56ch; font-size: var(--step-1); }

    .info { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.2rem; margin-top: 2rem; }
    .info__item { padding: 1.2rem 1.3rem; background: #fff; border: 1px solid var(--linea); border-radius: var(--radio); border-top: 3px solid var(--mar); }
    .info__item h3 { font-size: var(--step-0); margin: 0 0 .3rem; }
    .info__item p { margin: 0; font-size: var(--step--1); color: var(--tinta-60); }
    @media (max-width: 760px) { .info { grid-template-columns: 1fr; } }

    .grid-wrap { padding-top: 2.5rem; }
    .grid { display: grid; gap: 1.8rem; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); }

    .ft { display: flex; flex-direction: column; background: #fff; border: 1px solid var(--linea); border-radius: var(--radio); overflow: hidden; }
    .ft__media { position: relative; aspect-ratio: 16 / 10; overflow: hidden; }
    .ft__media img { width: 100%; height: 100%; object-fit: cover; }
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

    .upsell { margin-top: 3.5rem; }
    .upsell__box { display: flex; align-items: center; justify-content: space-between; gap: 1.5rem; flex-wrap: wrap; padding: 1.8rem 2rem; background: var(--mar); color: var(--cal); border-radius: var(--radio); }
    .upsell__box h2 { font-size: var(--step-2); margin: 0 0 .3rem; color: var(--cal); }
    .upsell__box p { margin: 0; color: rgba(245,246,244,.85); max-width: 52ch; }
  `],
})
export class FreeToursComponent implements OnInit {
  private readonly seo = inject(SeoService);
  tours: FreeTour[] = FREE_TOURS;

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
