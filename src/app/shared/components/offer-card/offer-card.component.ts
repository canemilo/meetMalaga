import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Offer } from '../../../core/models/offer.model';
import { AffiliateService } from '../../../core/services/affiliate.service';

/**
 * Tarjeta única para CUALQUIER vertical. Recibe una Offer y pinta imagen,
 * datos y un CTA que lleva al proveedor con tu ID de afiliado incrustado.
 */
@Component({
  selector: 'app-offer-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <article class="card">
      <a
        class="card__media corte"
        [href]="link"
        target="_blank"
        rel="sponsored noopener"
        (click)="onClick()"
        [attr.aria-label]="reservarAriaLabel(offer.title)"
      >
        <img [src]="offer.imageUrl" [alt]="offer.imageAlt" loading="lazy" />
        <span class="card__provider">{{ providerLabel }}</span>
      </a>

      <div class="card__body">
        <div class="card__meta">
          <span *ngIf="offer.duration">{{ offer.duration }}</span>
          <span *ngIf="offer.rating" class="card__rating">★ {{ offer.rating }}</span>
        </div>

        <h3 class="card__title">{{ offer.title }}</h3>
        <p class="card__summary">{{ offer.summary }}</p>

        <div class="card__footer">
          <span class="card__price" *ngIf="offer.priceFrom as p">
            <small i18n="@@offerCard.desde">desde</small> {{ p }}&nbsp;€
          </span>
          <a
            class="btn btn--sol"
            [href]="link"
            target="_blank"
            rel="sponsored noopener"
            (click)="onClick()"
            i18n="@@offerCard.verOferta"
          >Ver oferta</a>
        </div>
      </div>
    </article>
  `,
  styles: [`
    .card {
      display: flex;
      flex-direction: column;
      background: #fff;
      border: 1px solid var(--linea);
      border-radius: var(--radio);
      overflow: hidden;
      transition: transform .18s ease, box-shadow .18s ease;
    }
    .card:hover { transform: translateY(-4px); box-shadow: var(--sombra-sol); }
    .card:has(a:focus-visible) { box-shadow: var(--sombra-sol); }

    /* Media con la firma de marca: esquina de azulejo cortada (.corte) */
    .card__media { position: relative; display: block; aspect-ratio: 4 / 3; overflow: hidden; }
    .card__media img { width: 100%; height: 100%; object-fit: cover; transition: transform .4s ease; }
    .card:hover .card__media img { transform: scale(1.05); }

    .card__provider {
      position: absolute; top: .7rem; left: .7rem;
      font-family: var(--mono); font-size: .68rem; letter-spacing: .05em;
      text-transform: uppercase;
      background: rgba(16,34,43,.85); color: var(--cal);
      padding: .25rem .6rem; border-radius: 999px;
    }

    .card__body { display: flex; flex-direction: column; gap: .55rem; padding: 1.1rem 1.2rem 1.3rem; flex: 1; }

    .card__meta {
      display: flex; justify-content: space-between; align-items: center;
      font-family: var(--mono); font-size: .78rem; color: var(--tinta-60);
    }
    .card__rating { color: var(--sol); font-weight: 700; }

    .card__title { font-size: var(--step-1); margin: 0; }
    .card__summary { margin: 0; color: var(--tinta-60); font-size: var(--step--1); flex: 1; }

    .card__footer {
      display: flex; align-items: center; justify-content: space-between;
      gap: 1rem; margin-top: .4rem;
    }
    .card__price { font-family: var(--mono); font-weight: 700; font-size: var(--step-1); color: var(--mar); white-space: nowrap; }
    .card__price small { font-family: var(--body); font-weight: 500; font-size: .7rem; color: var(--tinta-60); display: block; }
  `],
})
export class OfferCardComponent {
  @Input({ required: true }) offer!: Offer;

  private readonly affiliate = inject(AffiliateService);

  get link(): string {
    return this.affiliate.buildLink(this.offer);
  }

  get providerLabel(): string {
    const map: Record<string, string> = {
      civitatis: 'Civitatis',
      getyourguide: 'GetYourGuide',
      tiqets: 'Tiqets',
      discovercars: 'DiscoverCars',
      localrent: 'Localrent',
      thefork: 'TheFork',
      booking: 'Booking',
      tripcom: 'Trip.com',
      directo: '',
    };
    return map[this.offer.provider] ?? '';
  }

  reservarAriaLabel(title: string): string {
    return $localize`:@@offerCard.reserveAriaLabel:Reservar: ${title}`;
  }

  onClick(): void {
    this.affiliate.trackOutbound(this.offer);
  }
}
