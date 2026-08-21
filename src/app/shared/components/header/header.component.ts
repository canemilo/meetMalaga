import { Component, signal, inject, LOCALE_ID } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

// Mismos locales y prefijos que angular.json (i18n.locales), SeoService y
// generate-sitemap.mjs. Las rutas no se traducen, solo llevan el prefijo.
const LOCALES = ['es', 'en', 'fr', 'de'] as const;
type Locale = (typeof LOCALES)[number];
const BASE_HREF: Record<Locale, string> = { es: '', en: '/en', fr: '/fr', de: '/de' };
const LABEL: Record<Locale, string> = { es: 'ES', en: 'EN', fr: 'FR', de: 'DE' };

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <header class="site-header">
      <div class="container site-header__inner">
        <a routerLink="/" class="brand" (click)="close()">
          <span class="brand__mark">◐</span>
          <span class="brand__name">Meet&nbsp;Málaga</span>
        </a>

        <button
          class="burger"
          [class.burger--open]="open()"
          (click)="toggle()"
          aria-label="Abrir menú"
          i18n-aria-label="@@header.openMenu"
          [attr.aria-expanded]="open()"
        ><span></span><span></span><span></span></button>

        <nav class="nav" [class.nav--open]="open()">
          <a routerLink="/free-tours" routerLinkActive="active" (click)="close()" i18n="@@header.nav.freeTours">Free tours</a>
          <a routerLink="/rutas" routerLinkActive="active" (click)="close()" i18n="@@header.nav.rutas">Rutas privadas</a>
          <a routerLink="/tours" routerLinkActive="active" (click)="close()" i18n="@@header.nav.tours">Tours</a>
          <a routerLink="/coches" routerLinkActive="active" (click)="close()" i18n="@@header.nav.coches">Alquiler de coches</a>
          <a routerLink="/restaurantes" routerLinkActive="active" (click)="close()" i18n="@@header.nav.restaurantes">Restaurantes</a>
          <a routerLink="/ocio" routerLinkActive="active" (click)="close()" i18n="@@header.nav.ocio">Ocio</a>
          <a routerLink="/hoteles" routerLinkActive="active" (click)="close()" i18n="@@header.nav.hoteles">Hoteles</a>

          <div class="nav__lang" aria-label="Idioma" i18n-aria-label="@@header.lang.label">
            <a
              *ngFor="let l of locales"
              [href]="hrefFor(l)"
              [hreflang]="l"
              [class.active]="l === locale"
              [attr.aria-current]="l === locale ? 'true' : null"
              (click)="close()"
            >{{ label[l] }}</a>
          </div>
        </nav>
      </div>
    </header>
  `,
  styles: [`
    .site-header {
      position: sticky; top: 0; z-index: 50;
      background: var(--glass-bg);
      backdrop-filter: var(--glass-blur);
      -webkit-backdrop-filter: var(--glass-blur);
      border-bottom: 1px solid var(--linea);
    }
    .site-header__inner { display: flex; align-items: center; justify-content: space-between; height: 68px; }

    .brand { display: flex; align-items: center; gap: .5rem; text-decoration: none; font-weight: 700; }
    .brand__mark { color: var(--sol); font-size: 1.4rem; transform: rotate(-20deg); }
    .brand__name { font-family: var(--display); font-weight: 900; font-size: 1.3rem; letter-spacing: -.02em; }

    .nav { display: flex; gap: 1.6rem; }
    .nav a {
      text-decoration: none; font-weight: 500; font-size: var(--step--1);
      color: var(--tinta-60); padding: .3rem 0; position: relative;
    }
    .nav a:hover, .nav a.active { color: var(--tinta); }
    .nav a.active::after {
      content: ''; position: absolute; left: 0; right: 0; bottom: -2px; height: 2px;
      background: var(--sol); border-radius: 2px;
    }

    .nav__lang {
      display: flex; align-items: center; gap: .7rem;
      margin-left: auto; padding-left: 1.6rem; border-left: 1px solid var(--linea);
    }
    .nav__lang a {
      font-family: var(--mono); font-size: .74rem; letter-spacing: .04em;
      color: var(--tinta-60); padding: .2rem 0;
    }
    .nav__lang a:hover { color: var(--tinta); }
    .nav__lang a.active { color: var(--mar); font-weight: 700; }
    .nav__lang a.active::after { display: none; }

    .burger { display: none; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; padding: 8px; }
    .burger span { width: 24px; height: 2px; background: var(--tinta); border-radius: 2px; transition: .2s; }
    .burger--open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
    .burger--open span:nth-child(2) { opacity: 0; }
    .burger--open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

    @media (max-width: 820px) {
      .burger { display: flex; }
      .nav {
        position: absolute; top: 68px; left: 0; right: 0;
        flex-direction: column; gap: 0;
        background: var(--cal); border-bottom: 1px solid var(--linea);
        max-height: 0; overflow: hidden; transition: max-height .25s ease;
      }
      .nav--open { max-height: 420px; }
      .nav a { padding: 1rem clamp(1.2rem,4vw,2.5rem); border-top: 1px solid var(--linea); }
      .nav a.active::after { display: none; }

      .nav__lang {
        margin-left: 0; padding: 1rem clamp(1.2rem,4vw,2.5rem);
        border-left: none; border-top: 1px solid var(--linea); gap: 1.1rem;
      }
    }
  `],
})
export class HeaderComponent {
  open = signal(false);

  private readonly location = inject(Location);
  private readonly rawLocale = inject(LOCALE_ID);

  readonly locales = LOCALES;
  readonly label = LABEL;
  readonly locale: Locale = (LOCALES as readonly string[]).includes(this.rawLocale)
    ? (this.rawLocale as Locale)
    : 'es';

  toggle() { this.open.update((v) => !v); }
  close() { this.open.set(false); }

  /** URL absoluta de la página actual en otro idioma (misma ruta, otro prefijo). */
  hrefFor(l: Locale): string {
    const path = this.location.path() || '/';
    return `${BASE_HREF[l]}${path}`;
  }
}
