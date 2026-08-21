import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Offer } from '../../core/models/offer.model';
import { CatalogService } from '../../core/services/catalog.service';
import { SeoService } from '../../core/services/seo.service';
import { OfferCardComponent } from '../../shared/components/offer-card/offer-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, OfferCardComponent],
  template: `
    <!-- HERO -->
    <section class="hero">
      <div class="container hero__inner">
        <p class="eyebrow" i18n="@@home.hero.eyebrow">Costa del Sol · Andalucía</p>
        <h1 class="hero__title" i18n="@@home.hero.title">
          Vive <em>Málaga</em><br />sin perderte nada.
        </h1>
        <p class="hero__lead" i18n="@@home.hero.lead">
          Reserva los mejores tours, alquila tu coche, encuentra dónde comer
          y llena tus días de ocio. Todo en un sitio, con las plataformas de
          confianza.
        </p>
        <div class="hero__cta">
          <a routerLink="/free-tours" class="btn btn--sol" i18n="@@home.hero.ctaFreeTours">Free tours por Málaga</a>
          <a routerLink="/rutas" class="btn btn--primary" i18n="@@home.hero.ctaRutas">Rutas privadas</a>
        </div>
      </div>
      <div class="hero__glow" aria-hidden="true"></div>
    </section>

    <!-- LO QUE OFREZCO YO -->
    <section class="container guia">
      <p class="eyebrow" i18n="@@home.guia.eyebrow">Conmigo, guía local</p>
      <h2 class="guia__title" i18n="@@home.guia.title">Vive Málaga con un guía de aquí</h2>
      <div class="guia__cards">
        <a routerLink="/free-tours" class="guia__card guia__card--free corte">
          <span class="guia__tag" i18n="@@home.guia.freeTours.tag">Empieza por aquí</span>
          <h3 i18n="@@home.guia.freeTours.title">Free tours</h3>
          <p i18n="@@home.guia.freeTours.text">Reserva gratis y paga al final lo que quieras. La mejor forma de conocerme y de descubrir la ciudad.</p>
          <span class="guia__link" i18n="@@home.guia.freeTours.link">Ver free tours</span>
        </a>
        <a routerLink="/rutas" class="guia__card guia__card--priv corte">
          <span class="guia__tag" i18n="@@home.guia.rutas.tag">A tu medida</span>
          <h3 i18n="@@home.guia.rutas.title">Rutas privadas</h3>
          <p i18n="@@home.guia.rutas.text">Tu grupo, tu ritmo y una experiencia personalizada. Reserva directa, sin intermediarios.</p>
          <span class="guia__link" i18n="@@home.guia.rutas.link">Ver rutas privadas</span>
        </a>
      </div>
    </section>

    <!-- RECOMENDACIONES (AFILIACIÓN) -->
    <div class="container"><p class="eyebrow section-eyebrow" i18n="@@home.verticals.eyebrow">Para completar tu viaje</p></div>
    <!-- VERTICALES: numeradas porque son el índice real del catálogo -->
    <section class="container verticals">
      <a routerLink="/tours" class="vertical vertical--mar">
        <span class="vertical__index">01</span>
        <h3 i18n="@@home.vertical.tours.title">Tours y experiencias</h3>
        <p i18n="@@home.vertical.tours.text">Alcazaba, Caminito del Rey, catamarán y mucho más.</p>
      </a>
      <a routerLink="/coches" class="vertical vertical--sol">
        <span class="vertical__index">02</span>
        <h3 i18n="@@home.vertical.coches.title">Alquiler de coches</h3>
        <p i18n="@@home.vertical.coches.text">Compara precios con recogida en aeropuerto o centro.</p>
      </a>
      <a routerLink="/restaurantes" class="vertical vertical--bug">
        <span class="vertical__index">03</span>
        <h3 i18n="@@home.vertical.restaurantes.title">Mejores restaurantes</h3>
        <p i18n="@@home.vertical.restaurantes.text">Del pescaíto a la estrella Michelin, reserva mesa.</p>
      </a>
      <a routerLink="/ocio" class="vertical vertical--mar2">
        <span class="vertical__index">04</span>
        <h3 i18n="@@home.vertical.ocio.title">Ocio y planes</h3>
        <p i18n="@@home.vertical.ocio.text">Flamenco, baños árabes, kayak y actividades.</p>
      </a>
      <a routerLink="/hoteles" class="vertical vertical--mar">
        <span class="vertical__index">05</span>
        <h3 i18n="@@home.vertical.hoteles.title">Hoteles</h3>
        <p i18n="@@home.vertical.hoteles.text">Del centro a la playa, compara y reserva con Trip.com.</p>
      </a>
    </section>

    <!-- DESTACADOS -->
    <section class="container featured">
      <div class="featured__head">
        <p class="eyebrow" i18n="@@home.destacados.eyebrow">Lo más reservado</p>
        <h2 i18n="@@home.destacados.title">Destacados de la semana</h2>
      </div>
      <div class="grid" *ngIf="featured.length; else sinDestacados">
        <app-offer-card *ngFor="let offer of featured" [offer]="offer" />
      </div>
      <ng-template #sinDestacados>
        <p class="empty" i18n="@@home.destacados.vacio">
          Todavía no hay destacados esta semana.
          <a routerLink="/tours">Mira los tours disponibles</a>.
        </p>
      </ng-template>
    </section>
  `,
  styles: [`
    /* HERO — la audacia tipográfica se gasta aquí y solo aquí */
    .hero { position: relative; overflow: hidden; padding: clamp(3rem, 8vw, 6rem) 0 clamp(2.5rem, 6vw, 4rem); }
    .hero__inner { position: relative; z-index: 2; max-width: 46rem; }
    .hero__title { font-size: var(--step-5); margin: .3rem 0 1rem; }
    .hero__title em { font-style: normal; color: var(--mar); }
    .hero__lead { font-size: var(--step-1); color: var(--tinta-60); max-width: 44ch; }
    .hero__cta { display: flex; flex-wrap: wrap; gap: .8rem; margin-top: 1.8rem; }
    .hero__glow {
      position: absolute; z-index: 1; top: -30%; right: -10%;
      width: 60vw; height: 60vw; max-width: 720px; max-height: 720px;
      background: radial-gradient(circle, rgba(244,183,64,.35), transparent 60%);
      pointer-events: none;
    }

    /* VERTICALES */
    .verticals {
      display: grid; gap: 1.2rem; margin-top: 1rem;
      grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
    }
    .vertical {
      display: flex; flex-direction: column; gap: .3rem;
      padding: 1.6rem 1.4rem; border-radius: var(--radio);
      text-decoration: none; color: var(--tinta);
      border: 1px solid var(--linea); background: #fff;
      transition: transform .18s ease, box-shadow .18s ease;
    }
    .vertical:hover { transform: translateY(-4px); box-shadow: var(--sombra-sol); }
    .vertical:focus-visible { transform: translateY(-4px); box-shadow: var(--sombra-sol); }
    .vertical__index {
      font-family: var(--mono); font-size: .8rem; font-weight: 700;
      letter-spacing: .06em; color: var(--tinta-60);
    }
    .vertical h3 { font-size: var(--step-1); margin: .4rem 0 .2rem; }
    .vertical p { margin: 0; font-size: var(--step--1); color: var(--tinta-60); }
    .vertical--mar { border-top: 3px solid var(--mar); }
    .vertical--sol { border-top: 3px solid var(--sol); }
    .vertical--bug { border-top: 3px solid var(--buganvilla); }
    .vertical--mar2 { border-top: 3px solid var(--mar-claro); }

    /* DESTACADOS */
    /* Con guía local — las tarjetas llevan la firma de marca (.corte) */
    .guia { margin-top: var(--space-section); }
    .guia__title { font-size: var(--step-2); margin: 0 0 1.4rem; }
    .guia__cards { display: grid; grid-template-columns: 1fr 1fr; gap: 1.2rem; }
    .guia__card { display: flex; flex-direction: column; gap: .5rem; padding: 1.8rem 1.8rem 2.2rem; text-decoration: none; color: var(--tinta); border: 1px solid var(--linea); transition: transform .18s ease, box-shadow .18s ease; }
    .guia__card:hover, .guia__card:focus-visible { transform: translateY(-4px); box-shadow: var(--sombra-sol); }
    .guia__card--free { background: var(--mar); color: var(--cal); border-color: transparent; }
    .guia__card--free h3, .guia__card--free .guia__link { color: var(--cal); }
    .guia__card--free p { color: rgba(245,246,244,.85); }
    .guia__card--priv { background: #fff; }
    .guia__tag { font-family: var(--mono); font-size: .68rem; letter-spacing: .12em; text-transform: uppercase; color: var(--sol); }
    .guia__card--priv .guia__tag { color: var(--mar-claro); }
    .guia__card h3 { font-size: var(--step-2); margin: .1rem 0 .1rem; }
    .guia__card p { margin: 0; font-size: var(--step--1); flex: 1; }
    .guia__link { font-weight: 600; font-size: var(--step--1); border-bottom: 2px solid var(--sol); align-self: flex-start; padding-bottom: 1px; margin-top: .4rem; }
    .section-eyebrow { margin-top: var(--space-section); }
    @media (max-width: 640px) { .guia__cards { grid-template-columns: 1fr; } }

    .featured { margin-top: var(--space-section); }
    .featured__head { margin-bottom: 1.8rem; }
    .featured__head h2 { font-size: var(--step-2); }
    .grid {
      display: grid; gap: 1.6rem;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    }
    @media (max-width: 900px) { .verticals { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 520px) { .verticals { grid-template-columns: 1fr; } }
  `],
})
export class HomeComponent implements OnInit {
  private readonly catalog = inject(CatalogService);
  private readonly seo = inject(SeoService);

  featured: Offer[] = [];

  ngOnInit(): void {
    this.featured = this.catalog.getFeatured();
    this.seo.update({
      title: 'Tours, coches, restaurantes y ocio en Málaga',
      description:
        'Descubre Málaga con las mejores experiencias: tours guiados, alquiler de coches, restaurantes y planes de ocio, reservados con plataformas de confianza.',
      path: '/',
      image: this.featured[0]?.imageUrl,
    });
  }
}
