import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Offer, Vertical } from '../../core/models/offer.model';
import { CatalogService } from '../../core/services/catalog.service';
import { SeoService } from '../../core/services/seo.service';
import { JsonLdService } from '../../core/services/json-ld.service';
import { OfferCardComponent } from '../../shared/components/offer-card/offer-card.component';
import { environment } from '../../../environments/environment';

interface VerticalConfig {
  vertical: Vertical;
  eyebrow: string;
  title: string;
  subtitle: string;
  metaDescription: string;
  offersHeading: string;
}

// Tipo de schema.org más adecuado para las entidades de cada vertical.
const SCHEMA_TYPE_BY_VERTICAL: Record<Vertical, string> = {
  tours: 'TouristTrip',
  coches: 'Product',
  restaurantes: 'Restaurant',
  ocio: 'TouristAttraction',
};

// Enlazado interno: cada vertical enlaza a las otras tres.
const VERTICAL_LINKS: Record<Vertical, { path: string; label: string }> = {
  tours: { path: '/tours', label: 'Tours y visitas guiadas' },
  coches: { path: '/coches', label: 'Alquiler de coches' },
  restaurantes: { path: '/restaurantes', label: 'Restaurantes' },
  ocio: { path: '/ocio', label: 'Ocio y actividades' },
};

/**
 * Una sola plantilla para las cuatro verticales. La configuración (título,
 * subtítulo, qué vertical mostrar) llega desde `data` en app.routes.ts, así
 * que añadir una nueva sección es solo añadir una ruta.
 */
@Component({
  selector: 'app-vertical-page',
  standalone: true,
  imports: [CommonModule, RouterLink, OfferCardComponent],
  template: `
    <section class="hero-mini">
      <div class="container">
        <p class="eyebrow">{{ config.eyebrow }}</p>
        <h1>{{ config.title }}</h1>
        <p class="hero-mini__sub">{{ config.subtitle }}</p>
      </div>
    </section>

    <section class="container grid-wrap">
      <h2 class="grid-wrap__title">{{ config.offersHeading }}</h2>
      <div class="grid">
        <app-offer-card *ngFor="let offer of offers" [offer]="offer" />
      </div>
    </section>

    <section class="container related">
      <h2 class="related__title">Explora también en Málaga</h2>
      <div class="related__links">
        <a *ngFor="let link of otherVerticals" [routerLink]="link.path" class="related__link">{{ link.label }}</a>
      </div>
    </section>
  `,
  styles: [`
    .hero-mini { padding: 3.5rem 0 1rem; }
    .hero-mini h1 { font-size: var(--step-3); max-width: 16ch; }
    .hero-mini__sub { color: var(--tinta-60); max-width: 52ch; font-size: var(--step-1); }

    .grid-wrap { padding-top: 2.5rem; }
    .grid-wrap__title { font-size: var(--step-2); margin: 0 0 1.4rem; }
    .grid {
      display: grid; gap: 1.6rem;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    }

    .related { padding: 3rem 0 4rem; border-top: 1px solid var(--linea); margin-top: 3rem; }
    .related__title { font-size: var(--step-1); margin: 0 0 1rem; }
    .related__links { display: flex; flex-wrap: wrap; gap: .8rem; }
    .related__link {
      padding: .5rem 1rem; border-radius: 999px; border: 1px solid var(--linea);
      text-decoration: none; color: var(--tinta); font-size: var(--step--1);
    }
    .related__link:hover { border-color: var(--mar); color: var(--mar); }
  `],
})
export class VerticalPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly catalog = inject(CatalogService);
  private readonly seo = inject(SeoService);
  private readonly jsonLd = inject(JsonLdService);

  config!: VerticalConfig;
  offers: Offer[] = [];
  otherVerticals: Array<{ path: string; label: string }> = [];

  ngOnInit(): void {
    // La config puede cambiar al navegar entre verticales sin recargar.
    this.route.data.subscribe((data) => {
      this.config = data['config'] as VerticalConfig;
      this.offers = this.catalog.getByVertical(this.config.vertical);
      this.otherVerticals = (Object.keys(VERTICAL_LINKS) as Vertical[])
        .filter((v) => v !== this.config.vertical)
        .map((v) => VERTICAL_LINKS[v]);
      const path = '/' + this.config.vertical;

      this.seo.update({
        title: this.config.title,
        description: this.config.metaDescription,
        path,
        image: this.offers[0]?.imageUrl,
      });

      this.jsonLd.set([
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: environment.siteName, item: environment.siteUrl },
            { '@type': 'ListItem', position: 2, name: this.config.title, item: environment.siteUrl + path },
          ],
        },
        {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          itemListElement: this.offers.map((offer, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
              '@type': SCHEMA_TYPE_BY_VERTICAL[this.config.vertical],
              name: offer.title,
              description: offer.summary,
              image: offer.imageUrl,
              url: offer.providerUrl,
              ...(offer.priceFrom != null
                ? { offers: { '@type': 'Offer', price: offer.priceFrom, priceCurrency: 'EUR', url: offer.providerUrl } }
                : {}),
              // Sin reviewCount real no marcamos aggregateRating completo, para no
              // inventar datos que Meet Málaga no tiene (ver reglas del agente SEO).
            },
          })),
        },
      ]);
    });
  }
}
