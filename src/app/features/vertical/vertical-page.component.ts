import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Offer, Vertical } from '../../core/models/offer.model';
import { CatalogService } from '../../core/services/catalog.service';
import { SeoService } from '../../core/services/seo.service';
import { OfferCardComponent } from '../../shared/components/offer-card/offer-card.component';

interface VerticalConfig {
  vertical: Vertical;
  eyebrow: string;
  title: string;
  subtitle: string;
}

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
      <div class="grid" *ngIf="offers.length; else sinOfertas">
        <app-offer-card *ngFor="let offer of offers" [offer]="offer" />
      </div>
      <ng-template #sinOfertas>
        <p class="empty" i18n="@@vertical.vacio">
          Todavía no hay ofertas publicadas en esta sección.
          <a routerLink="/">Vuelve a la portada</a> mientras seguimos ampliando el catálogo.
        </p>
      </ng-template>
    </section>
  `,
  styles: [`
    .hero-mini { padding: 3.5rem 0 1rem; }
    .hero-mini h1 { font-size: var(--step-3); max-width: 16ch; }
    .hero-mini__sub { color: var(--tinta-60); max-width: 52ch; font-size: var(--step-1); }

    .grid-wrap { padding-top: var(--space-section); }
    .grid {
      display: grid; gap: 1.6rem;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    }
  `],
})
export class VerticalPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly catalog = inject(CatalogService);
  private readonly seo = inject(SeoService);

  config!: VerticalConfig;
  offers: Offer[] = [];

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
}
