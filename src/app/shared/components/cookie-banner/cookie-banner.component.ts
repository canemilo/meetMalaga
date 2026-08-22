import { Component, OnInit, PLATFORM_ID, inject, signal } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AnalyticsService } from '../../../core/services/analytics.service';

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
    <div class="cookie" *ngIf="visible()" role="dialog" aria-label="Consentimiento de cookies" i18n-aria-label="@@cookieBanner.ariaLabel">
      <p class="cookie__text" i18n="@@cookieBanner.text">
        Usamos cookies propias y de terceros para analítica y afiliación.
        <a routerLink="/cookies">Más información</a>.
      </p>
      <div class="cookie__actions">
        <button class="btn btn--ghost" (click)="reject()" i18n="@@cookieBanner.rejectBtn">Solo esenciales</button>
        <button class="btn btn--sol" (click)="accept()" i18n="@@cookieBanner.acceptBtn">Aceptar todas</button>
      </div>
    </div>
  `,
  styles: [`
    .cookie {
      position: fixed; left: 1rem; right: 1rem; bottom: 1rem; z-index: 100;
      max-width: 720px; margin-inline: auto;
      display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between;
      gap: 1.1rem; padding: 1.1rem 1.3rem;
      background: var(--tinta); color: var(--cal);
      border: 1px solid color-mix(in srgb, var(--cal) 12%, transparent);
      border-radius: var(--radio); box-shadow: var(--sombra);
      animation: cookie-in .45s cubic-bezier(.16,1,.3,1);
    }
    @keyframes cookie-in {
      from { opacity: 0; transform: translateY(16px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .cookie__text { margin: 0; font-size: var(--step--1); line-height: 1.6; }
    .cookie__text a { color: var(--sol); }
    .cookie__actions { display: flex; gap: .6rem; }
    .btn--ghost { background: transparent; color: var(--cal); border: 1px solid color-mix(in srgb, var(--cal) 40%, transparent); }
    .btn--ghost:hover { background: color-mix(in srgb, var(--cal) 10%, transparent); }
    .btn--ghost:active { background: color-mix(in srgb, var(--cal) 18%, transparent); }
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
