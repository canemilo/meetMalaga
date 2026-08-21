import { Component, signal, inject, LOCALE_ID, ViewChild, ElementRef, HostListener } from '@angular/core';
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
          <div class="nav__primary">
            <a routerLink="/free-tours" routerLinkActive="active" (click)="close()" class="nav__primary-link" i18n="@@header.nav.freeTours">Free tours</a>
            <a routerLink="/rutas" routerLinkActive="active" (click)="close()" class="nav__primary-link" i18n="@@header.nav.rutas">Rutas privadas</a>
          </div>

          <!-- Catálogo: afiliación (tours/coches/restaurantes/ocio/hoteles), agrupada
               y secundaria pero a un clic. Numerada porque es el índice real del
               catálogo, igual que en home. <details> nativo: accesible por teclado
               sin JS de por medio para abrir/cerrar. -->
          <details class="nav__catalog" #catalogo>
            <summary i18n="@@header.nav.catalogo">Catálogo</summary>
            <div class="nav__catalog-panel">
              <a routerLink="/tours" routerLinkActive="active" (click)="close()"><span class="nav__idx">01</span><span i18n="@@header.nav.tours">Tours</span></a>
              <a routerLink="/coches" routerLinkActive="active" (click)="close()"><span class="nav__idx">02</span><span i18n="@@header.nav.coches">Alquiler de coches</span></a>
              <a routerLink="/restaurantes" routerLinkActive="active" (click)="close()"><span class="nav__idx">03</span><span i18n="@@header.nav.restaurantes">Restaurantes</span></a>
              <a routerLink="/ocio" routerLinkActive="active" (click)="close()"><span class="nav__idx">04</span><span i18n="@@header.nav.ocio">Ocio</span></a>
              <a routerLink="/hoteles" routerLinkActive="active" (click)="close()"><span class="nav__idx">05</span><span i18n="@@header.nav.hoteles">Hoteles</span></a>
            </div>
          </details>

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

    .nav { display: flex; align-items: center; gap: 1.6rem; }
    .nav a {
      text-decoration: none; font-weight: 500; font-size: var(--step--1);
      color: var(--tinta-60); padding: .3rem 0; position: relative;
    }
    .nav a:hover, .nav a.active { color: var(--tinta); }

    /* Free tours / Rutas privadas: lo principal del negocio. Sin relleno de
       color (queda para los CTA del hero) — aquí se marcan por peso y color
       de texto, como el resto del nav pero más firmes. */
    .nav__primary { display: flex; gap: 1.4rem; }
    .nav__primary-link {
      font-weight: 700; color: var(--tinta);
    }
    .nav__primary-link:hover, .nav__primary-link.active { color: var(--mar); }
    .nav__primary a.active::after {
      content: ''; position: absolute; left: 50%; bottom: -7px;
      width: 5px; height: 5px; border-radius: 50%;
      background: var(--mar); transform: translateX(-50%);
    }

    /* Catálogo: afiliación agrupada, secundaria, a un clic. Tipografía y
       tamaño discretos frente a los botones primarios; sin la firma .corte,
       que se reserva a hero y media de tarjeta. */
    .nav__catalog { position: relative; }
    .nav__catalog summary {
      list-style: none; cursor: pointer; user-select: none;
      display: flex; align-items: center; gap: .4rem;
      font-weight: 500; font-size: var(--step--1); color: var(--tinta-60);
      padding: .3rem 0;
    }
    .nav__catalog summary::-webkit-details-marker { display: none; }
    .nav__catalog summary::after {
      content: ''; width: 0; height: 0; margin-top: 2px;
      border: 4px solid transparent; border-top-color: currentColor;
      transition: transform .2s ease;
    }
    .nav__catalog[open] summary::after { transform: rotate(180deg); }
    .nav__catalog:hover summary, .nav__catalog[open] summary { color: var(--tinta); }
    .nav__catalog:has(.active) summary { color: var(--mar); }

    .nav__catalog-panel {
      position: absolute; top: calc(100% + .8rem); left: 50%; transform: translateX(-50%);
      min-width: 230px; background: #fff; border: 1px solid var(--linea);
      border-radius: var(--radio); box-shadow: var(--sombra); padding: .4rem;
      display: flex; flex-direction: column;
    }
    .nav__catalog-panel a {
      display: flex; align-items: baseline; gap: .6rem;
      padding: .6rem .7rem; border-radius: calc(var(--radio) - 8px);
      color: var(--tinta); font-size: var(--step--1);
    }
    .nav__catalog-panel a:hover, .nav__catalog-panel a:focus-visible { background: var(--cal-hueso); }
    .nav__catalog-panel a.active { color: var(--mar); }
    .nav__idx {
      font-family: var(--mono); font-size: .74rem; font-weight: 700;
      letter-spacing: .04em; color: var(--tinta-60); min-width: 1.4rem;
    }
    .nav__catalog-panel a.active .nav__idx { color: var(--mar); }

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
      .nav--open { max-height: 720px; }

      .nav__primary {
        flex-direction: column; gap: .7rem;
        padding: 1.1rem clamp(1.2rem,4vw,2.5rem);
      }

      .nav__catalog { border-top: 1px solid var(--linea); }
      .nav__catalog summary { padding: 1rem clamp(1.2rem,4vw,2.5rem); justify-content: space-between; }
      .nav__catalog-panel {
        position: static; transform: none; margin: 0 clamp(1.2rem,4vw,2.5rem) .8rem;
        box-shadow: none; border-color: var(--linea);
      }

      .nav__lang {
        margin-left: 0; padding: 1rem clamp(1.2rem,4vw,2.5rem);
        border-left: none; border-top: 1px solid var(--linea); gap: 1.1rem;
      }
    }
  `],
})
export class HeaderComponent {
  open = signal(false);

  @ViewChild('catalogo') private readonly catalogo?: ElementRef<HTMLDetailsElement>;

  private readonly location = inject(Location);
  private readonly rawLocale = inject(LOCALE_ID);

  readonly locales = LOCALES;
  readonly label = LABEL;
  readonly locale: Locale = (LOCALES as readonly string[]).includes(this.rawLocale)
    ? (this.rawLocale as Locale)
    : 'es';

  toggle() { this.open.update((v) => !v); }

  close() {
    this.open.set(false);
    if (this.catalogo) this.catalogo.nativeElement.open = false;
  }

  /** Cierra el desplegable de catálogo al hacer clic fuera de él. */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const el = this.catalogo?.nativeElement;
    if (!el || !el.open) return;
    if (!el.contains(event.target as Node)) el.open = false;
  }

  /** URL absoluta de la página actual en otro idioma (misma ruta, otro prefijo). */
  hrefFor(l: Locale): string {
    const path = this.location.path() || '/';
    return `${BASE_HREF[l]}${path}`;
  }
}
