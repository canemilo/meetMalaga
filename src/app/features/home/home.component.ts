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
          <a routerLink="/tours" class="btn btn--sol">Ver tours</a>
          <a routerLink="/coches" class="btn btn--primary">Alquilar coche</a>
        </div>
      </div>
      <div class="hero__glow" aria-hidden="true"></div>
    </section>

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
      grid-template-columns: repeat(4, 1fr);
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
