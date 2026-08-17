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
        class="card__media"
        [href]="link"
        target="_blank"
        rel="sponsored noopener"
        (click)="onClick()"
        [attr.aria-label]="'Reservar: ' + offer.title"
      >
        <img [src]="offer.imageUrl" [alt]="offer.imageAlt" width="800" height="600" loading="lazy" />
        <span class="card__provider" *ngIf="providerLabel">{{ providerLabel }}</span>
      </a>

      <div class="card__body">
        <div class="card__meta">
          <span *ngIf="offer.duration">{{ offer.duration }}</span>
          <span *ngIf="offer.rating" class="card__rating">
            <svg class="card__star" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
              <path d="M8 .8l1.9 4.6 5 .4-3.8 3.3 1.2 4.9L8 11.4l-4.3 2.6 1.2-4.9L1.1 5.8l5-.4L8 .8z" />
            </svg>
            {{ offer.rating }}
          </span>
        </div>

        <h3 class="card__title">{{ offer.title }}</h3>
        <p class="card__summary">{{ offer.summary }}</p>

        <div class="card__footer">
          <span class="card__price" *ngIf="offer.priceFrom as p">
            <small>desde</small> {{ p }}&nbsp;€
          </span>
          <a
            class="btn btn--sol card__cta"
            [href]="link"
            target="_blank"
            rel="sponsored noopener"
            (click)="onClick()"
          >Ver oferta</a>
        </div>
      </div>
    </article>
  `,
  styles: [`
    /* Reposo: plana, sin sombra, chamfer visible en la imagen. */
    .card {
      display: flex;
      flex-direction: column;
      background: var(--cal-hueso);
      border: 1px solid var(--linea);
      border-radius: var(--radio-sm);
      overflow: hidden;
      transition: transform var(--dur-rapida) var(--ease), box-shadow var(--dur-rapida) var(--ease);
    }
    /* Hover / foco por teclado dentro de la card: se levanta ligeramente,
       la imagen escala un poco y aparece un filete de luz en el corte. */
    .card:hover,
    .card:focus-within {
      transform: translateY(-3px);
      box-shadow: var(--sombra-hover);
    }

    .card__media {
      position: relative; display: block; aspect-ratio: 4 / 3; overflow: hidden;
      clip-path: polygon(0 0, calc(100% - var(--chamfer)) 0, 100% var(--chamfer), 100% 100%, 0 100%);
      -webkit-clip-path: polygon(0 0, calc(100% - var(--chamfer)) 0, 100% var(--chamfer), 100% 100%, 0 100%);
    }
    .card__media img {
      width: 100%; height: 100%; object-fit: cover;
      transition: transform var(--dur-media) var(--ease);
    }
    .card:hover .card__media img,
    .card:focus-within .card__media img { transform: scale(1.03); }

    /* Filete de luz: el canto del corte "capta luz" en la interacción. */
    .card__media::after {
      content: '';
      position: absolute; top: 0; right: 0;
      width: var(--chamfer); height: var(--chamfer);
      background: linear-gradient(135deg, transparent 50%, var(--mar) 50%);
      opacity: 0;
      transition: opacity var(--dur-media) var(--ease);
      pointer-events: none;
    }
    .card:hover .card__media::after,
    .card:focus-within .card__media::after { opacity: 1; }

    .card__provider {
      position: absolute; bottom: .7rem; left: 0;
      font-family: var(--mono); font-size: .68rem; letter-spacing: .05em;
      text-transform: uppercase;
      background: rgba(16,34,43,.85); color: var(--cal);
      padding: .3rem .7rem;
      clip-path: polygon(0 0, calc(100% - var(--chamfer-sm)) 0, 100% var(--chamfer-sm), 100% 100%, 0 100%);
      -webkit-clip-path: polygon(0 0, calc(100% - var(--chamfer-sm)) 0, 100% var(--chamfer-sm), 100% 100%, 0 100%);
    }

    .card__body { display: flex; flex-direction: column; gap: .55rem; padding: 1.1rem 1.2rem 1.3rem; flex: 1; }

    .card__meta {
      display: flex; justify-content: space-between; align-items: center;
      font-family: var(--mono); font-size: .78rem; color: var(--tinta-60);
    }
    .card__rating { display: inline-flex; align-items: center; gap: .3rem; color: var(--sol-oscuro); font-weight: 700; }
    .card__star { width: 13px; height: 13px; fill: currentColor; }

    .card__title { font-family: var(--body); font-weight: 600; font-size: var(--step-1); margin: 0; }
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
      directo: '',
    };
    return map[this.offer.provider] ?? '';
  }

  onClick(): void {
    this.affiliate.trackOutbound(this.offer);
  }
}
