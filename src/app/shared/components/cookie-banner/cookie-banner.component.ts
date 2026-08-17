import {Component, OnInit, PLATFORM_ID, inject, signal} from '@angular/core';
import {CommonModule, isPlatformBrowser} from '@angular/common';
import {RouterLink} from '@angular/router';
import {AnalyticsService} from '../../../core/services/analytics.service';

const STORAGE_KEY = 'mm_cookie_consent';

/**
 * Banner mínimo de consentimiento de cookies. Guarda la decisión en
 * localStorage. Solo se muestra en navegador (no en el HTML del servidor),
 * para no bloquear el renderizado SSR ni el SEO.
 *
 * Cuando el usuario acepta las analíticas, inicializa Google Analytics a
 * través de AnalyticsService (que solo carga si hay analyticsId configurado).
 */
@Component({
  selector: 'app-cookie-banner',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="cookie" *ngIf="visible()" role="dialog" aria-label="Consentimiento de cookies">
      <p class="cookie__text">
        Usamos cookies propias y de terceros para analítica y afiliación.
        <a routerLink="/cookies">Más información</a>.
      </p>
      <div class="cookie__actions">
        <button class="btn btn--ghost" (click)="reject()">Solo esenciales</button>
        <button class="btn btn--sol" (click)="accept()">Aceptar todas</button>
      </div>
    </div>
  `,
  styles: [`
    .cookie {
      position: fixed; left: 1rem; right: 1rem; bottom: 1rem; z-index: 100;
      max-width: 720px; margin-inline: auto;
      display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between;
      gap: 1rem; padding: 1rem 1.2rem;
      background: var(--tinta); color: var(--cal);
      border-radius: var(--radio); box-shadow: var(--sombra);
    }
    .cookie__text { margin: 0; font-size: var(--step--1); }
    .cookie__text a { color: var(--sol); }
    .cookie__actions { display: flex; gap: .6rem; }
    .btn--ghost { background: transparent; color: var(--cal); border: 1px solid rgba(245,246,244,.4); }
    .btn--ghost:hover { background: rgba(245,246,244,.1); }
  `],
})
export class CookieBannerComponent implements OnInit {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly analytics = inject(AnalyticsService);
  visible = signal(false);

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) this.visible.set(true);
    else if (saved === 'all') this.analytics.enable();
  }

  accept(): void {
    localStorage.setItem(STORAGE_KEY, 'all');
    this.analytics.enable();
    this.visible.set(false);
  }

  reject(): void {
    localStorage.setItem(STORAGE_KEY, 'essential');
    this.visible.set(false);
  }
}
