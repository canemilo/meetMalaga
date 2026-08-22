import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Offer, Vertical } from '../../core/models/offer.model';
import { CatalogService } from '../../core/services/catalog.service';
import { SeoService } from '../../core/services/seo.service';
import { OfferCardComponent } from '../../shared/components/offer-card/offer-card.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';

interface VerticalConfig {
  vertical: Vertical;
  eyebrow: string;
  title: string;
  subtitle: string;
}

interface VerticalNavItem {
  vertical: Vertical;
  path: string;
  idx: string;
  label: string;
}

/** Orden fijo de las 5 verticales, el mismo que el índice del catálogo en
 * home — la numeración codifica esa posición real, no es decorativa. */
const VERTICAL_NAV: VerticalNavItem[] = [
  { vertical: 'tours', path: '/tours', idx: '01', label: $localize`:@@vertical.nav.tours:Tours y experiencias` },
  { vertical: 'coches', path: '/coches', idx: '02', label: $localize`:@@vertical.nav.coches:Alquiler de coches` },
  { vertical: 'restaurantes', path: '/restaurantes', idx: '03', label: $localize`:@@vertical.nav.restaurantes:Restaurantes` },
  { vertical: 'ocio', path: '/ocio', idx: '04', label: $localize`:@@vertical.nav.ocio:Ocio y planes` },
  { vertical: 'hoteles', path: '/hoteles', idx: '05', label: $localize`:@@vertical.nav.hoteles:Hoteles` },
];

/**
 * Una sola plantilla para las cinco verticales. La configuración (título,
 * subtítulo, qué vertical mostrar) llega desde `data` en app.routes.ts, así
 * que añadir una nueva sección es solo añadir una ruta.
 *
 * Registro deliberadamente secundario: capa de afiliación, no compite con el
 * storytelling de home/free-tours/rutas. Catálogo limpio y escaneable —
 * rejilla de tarjetas, sin hero a toda pantalla.
 */
@Component({
  selector: 'app-vertical-page',
  standalone: true,
  imports: [CommonModule, RouterLink, OfferCardComponent, RevealDirective],
  template: `
    <section class="hero-mini">
      <div class="container">
        <p class="eyebrow">{{ config.eyebrow }}</p>
        <h1>{{ config.title }}</h1>
        <p class="hero-mini__sub">{{ config.subtitle }}</p>
        <p class="hero-mini__count" *ngIf="offers.length" i18n="@@vertical.count">{offers.length, plural, =1 {1 oferta disponible} other {{{offers.length}} ofertas disponibles}}</p>

        <nav
          class="vertical-nav"
          aria-label="Otras categorías del catálogo"
          i18n-aria-label="@@vertical.nav.ariaLabel"
        >
          <a
            *ngFor="let item of verticalNav"
            [routerLink]="item.path"
            class="vertical-nav__item"
            [class.active]="item.vertical === config.vertical"
            [attr.aria-current]="item.vertical === config.vertical ? 'page' : null"
          >
            <span class="vertical-nav__idx" aria-hidden="true">{{ item.idx }}</span>
            <span>{{ item.label }}</span>
          </a>
        </nav>
      </div>
    </section>

    <section class="container grid-wrap">
      <ul class="grid" *ngIf="offers.length; else sinOfertas">
        <li *ngFor="let offer of offers; let i = index" appReveal="up" [appRevealDelay]="revealDelay(i)">
          <app-offer-card [offer]="offer" />
        </li>
      </ul>
      <ng-template #sinOfertas>
        <div class="empty">
          <p i18n="@@vertical.vacio">
            Todavía no hay ofertas publicadas en esta sección.
            <a routerLink="/">Vuelve a la portada</a> mientras seguimos ampliando el catálogo.
          </p>
          <p class="empty__label" i18n="@@vertical.vacio.otras">Otras categorías</p>
          <ul class="empty__alt">
            <li *ngFor="let item of otrasVerticales">
              <a [routerLink]="item.path">{{ item.label }}</a>
            </li>
          </ul>
        </div>
      </ng-template>
    </section>
  `,
  styles: [`
    .hero-mini { padding: 3.5rem 0 0; }
    .hero-mini h1 { font-size: var(--step-3); max-width: 16ch; }
    .hero-mini__sub { color: var(--tinta-60); max-width: 52ch; font-size: var(--step-1); }
    .hero-mini__count {
      margin: .6rem 0 0;
      font-family: var(--mono); font-size: .78rem; letter-spacing: .03em;
      color: var(--tinta-60);
    }

    /* Selector de vertical: mismo lenguaje visual que el índice del catálogo
       de home (hairlines + numeración real), en formato de pestañas para
       saltar entre las 5 categorías sin volver al header. Continuidad de
       recorrido dentro de la capa de afiliación, sin competir con ella. */
    .vertical-nav {
      display: flex;
      margin-top: 2.2rem;
      border-top: 1px solid var(--linea);
      border-bottom: 1px solid var(--linea);
      overflow-x: auto;
      scrollbar-width: thin;
    }
    .vertical-nav__item {
      display: flex; align-items: center; gap: .5rem;
      padding: .9rem 1.2rem;
      min-height: 44px;
      white-space: nowrap;
      text-decoration: none;
      color: var(--tinta-60);
      font-size: var(--step--1);
      border-right: 1px solid var(--linea);
      transition: color .15s ease;
    }
    .vertical-nav__item:last-child { border-right: none; }
    .vertical-nav__item:hover,
    .vertical-nav__item:focus-visible { color: var(--tinta); }
    .vertical-nav__item.active { color: var(--tinta); font-weight: 600; }
    .vertical-nav__item.active .vertical-nav__idx { color: var(--mar); }
    .vertical-nav__idx {
      font-family: var(--mono); font-size: .74rem; font-weight: 700;
      letter-spacing: .04em; color: var(--tinta-60);
    }

    .grid-wrap { padding-top: var(--space-section); }
    .grid {
      display: grid; gap: 1.6rem;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      list-style: none; margin: 0; padding: 0;
    }

    .empty__label {
      margin: 1.6rem 0 .8rem;
      font-family: var(--mono); font-size: .72rem; letter-spacing: .1em;
      text-transform: uppercase; color: var(--tinta-60);
    }
    .empty__alt {
      display: flex; flex-wrap: wrap; justify-content: center; gap: 1rem 1.6rem;
      list-style: none; margin: 0; padding: 0;
    }
    .empty__alt a {
      font-weight: 600; color: var(--mar);
      text-decoration: none; border-bottom: 2px solid var(--sol);
      padding-bottom: 1px;
    }
    .empty__alt a:hover, .empty__alt a:focus-visible { color: var(--mar-claro); }

    @media (max-width: 640px) {
      .vertical-nav__item { padding: .8rem .9rem; }
    }
  `],
})
export class VerticalPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly catalog = inject(CatalogService);
  private readonly seo = inject(SeoService);

  readonly verticalNav = VERTICAL_NAV;

  config!: VerticalConfig;
  offers: Offer[] = [];

  get otrasVerticales(): VerticalNavItem[] {
    return this.verticalNav.filter((item) => item.vertical !== this.config?.vertical);
  }

  ngOnInit(): void {
    // La config puede cambiar al navegar entre verticales sin recargar.
    this.route.data.subscribe((data) => {
      this.config = data['config'] as VerticalConfig;
      this.offers = this.catalog.getByVertical(this.config.vertical);
      this.seo.update({
        title: this.config.title,
        description: this.config.subtitle,
        path: '/' + this.config.vertical,
        image: this.offers[0]?.imageUrl,
      });
    });
  }

  /** Entrada escalonada de la rejilla, con techo para que no se note en
   * catálogos grandes. */
  revealDelay(index: number): number {
    return Math.min(index * 0.05, 0.3);
  }
}
