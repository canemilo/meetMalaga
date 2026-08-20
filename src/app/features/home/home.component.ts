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
        <p class="eyebrow">Costa del Sol · Andalucía</p>
        <h1 class="hero__title">
          Vive <em>Málaga</em><br />sin perderte nada.
        </h1>
        <p class="hero__lead">
          Reserva los mejores tours, alquila tu coche, encuentra dónde comer
          y llena tus días de ocio. Todo en un sitio, con las plataformas de
          confianza.
        </p>
        <div class="hero__cta">
          <a routerLink="/free-tours" class="btn btn--sol">Free tours por Málaga</a>
          <a routerLink="/rutas" class="btn btn--primary">Rutas privadas</a>
        </div>
      </div>
      <div class="hero__glow" aria-hidden="true"></div>
    </section>

    <!-- LO QUE OFREZCO YO -->
    <section class="container guia">
      <p class="eyebrow">Conmigo, guía local</p>
      <h2 class="guia__title">Vive Málaga con un guía de aquí</h2>
      <div class="guia__cards">
        <a routerLink="/free-tours" class="guia__card guia__card--free">
          <span class="guia__tag">Empieza por aquí</span>
          <h3>Free tours</h3>
          <p>Reserva gratis y paga al final lo que quieras. La mejor forma de conocerme y de descubrir la ciudad.</p>
          <span class="guia__link">Ver free tours</span>
        </a>
        <a routerLink="/rutas" class="guia__card guia__card--priv">
          <span class="guia__tag">A tu medida</span>
          <h3>Rutas privadas</h3>
          <p>Tu grupo, tu ritmo y una experiencia personalizada. Reserva directa, sin intermediarios.</p>
          <span class="guia__link">Ver rutas privadas</span>
        </a>
      </div>
    </section>

    <!-- RECOMENDACIONES (AFILIACIÓN) -->
    <div class="container"><p class="eyebrow section-eyebrow">Para completar tu viaje</p></div>
    <!-- VERTICALES -->
    <section class="container verticals">
      <a routerLink="/tours" class="vertical vertical--mar">
        <span class="vertical__icon">🏛️</span>
        <h3>Tours y experiencias</h3>
        <p>Alcazaba, Caminito del Rey, catamarán y mucho más.</p>
      </a>
      <a routerLink="/coches" class="vertical vertical--sol">
        <span class="vertical__icon">🚗</span>
        <h3>Alquiler de coches</h3>
        <p>Compara precios con recogida en aeropuerto o centro.</p>
      </a>
      <a routerLink="/restaurantes" class="vertical vertical--bug">
        <span class="vertical__icon">🍽️</span>
        <h3>Mejores restaurantes</h3>
        <p>Del pescaíto a la estrella Michelin, reserva mesa.</p>
      </a>
      <a routerLink="/ocio" class="vertical vertical--mar2">
        <span class="vertical__icon">🎭</span>
        <h3>Ocio y planes</h3>
        <p>Flamenco, baños árabes, kayak y actividades.</p>
      </a>
      <a routerLink="/hoteles" class="vertical vertical--mar">
        <span class="vertical__icon">🛎️</span>
        <h3>Hoteles</h3>
        <p>Del centro a la playa, compara y reserva con Trip.com.</p>
      </a>
    </section>

    <!-- DESTACADOS -->
    <section class="container featured">
      <div class="featured__head">
        <p class="eyebrow">Lo más reservado</p>
        <h2>Destacados de la semana</h2>
      </div>
      <div class="grid">
        <app-offer-card *ngFor="let offer of featured" [offer]="offer" />
      </div>
    </section>
  `,
  styles: [`
    /* HERO */
    .hero { position: relative; overflow: hidden; padding: clamp(3rem, 8vw, 6rem) 0 clamp(2.5rem, 6vw, 4rem); }
    .hero__inner { position: relative; z-index: 2; max-width: 46rem; }
    .hero__title { font-size: var(--step-4); margin: .3rem 0 1rem; }
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
    .vertical:hover { transform: translateY(-4px); box-shadow: var(--sombra); }
    .vertical__icon { font-size: 1.8rem; }
    .vertical h3 { font-size: var(--step-1); margin: .4rem 0 .2rem; }
    .vertical p { margin: 0; font-size: var(--step--1); color: var(--tinta-60); }
    .vertical--mar { border-top: 3px solid var(--mar); }
    .vertical--sol { border-top: 3px solid var(--sol); }
    .vertical--bug { border-top: 3px solid var(--buganvilla); }
    .vertical--mar2 { border-top: 3px solid var(--mar-claro); }

    /* DESTACADOS */
    /* Con guía local */
    .guia { margin-top: 3.5rem; }
    .guia__title { font-size: var(--step-2); margin: 0 0 1.4rem; }
    .guia__cards { display: grid; grid-template-columns: 1fr 1fr; gap: 1.2rem; }
    .guia__card { display: flex; flex-direction: column; gap: .5rem; padding: 1.8rem; border-radius: var(--radio); text-decoration: none; color: var(--tinta); border: 1px solid var(--linea); transition: transform .18s ease, box-shadow .18s ease; }
    .guia__card:hover { transform: translateY(-4px); box-shadow: var(--sombra); }
    .guia__card--free { background: var(--mar); color: var(--cal); border-color: transparent; }
    .guia__card--free h3, .guia__card--free .guia__link { color: var(--cal); }
    .guia__card--free p { color: rgba(245,246,244,.85); }
    .guia__card--priv { background: #fff; }
    .guia__tag { font-family: var(--mono); font-size: .68rem; letter-spacing: .12em; text-transform: uppercase; color: var(--sol); }
    .guia__card--priv .guia__tag { color: var(--mar-claro); }
    .guia__card h3 { font-size: var(--step-2); margin: .1rem 0 .1rem; }
    .guia__card p { margin: 0; font-size: var(--step--1); flex: 1; }
    .guia__link { font-weight: 600; font-size: var(--step--1); border-bottom: 2px solid var(--sol); align-self: flex-start; padding-bottom: 1px; margin-top: .4rem; }
    .section-eyebrow { margin-top: 3.5rem; }
    @media (max-width: 640px) { .guia__cards { grid-template-columns: 1fr; } }

    .featured { margin-top: 4.5rem; }
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
