import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

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
          [attr.aria-expanded]="open()"
        ><span></span><span></span><span></span></button>

        <nav class="nav" [class.nav--open]="open()">
          <a routerLink="/tours" routerLinkActive="active" (click)="close()">Tours</a>
          <a routerLink="/coches" routerLinkActive="active" (click)="close()">Alquiler de coches</a>
          <a routerLink="/restaurantes" routerLinkActive="active" (click)="close()">Restaurantes</a>
          <a routerLink="/ocio" routerLinkActive="active" (click)="close()">Ocio</a>
        </nav>
      </div>
    </header>
  `,
  styles: [`
    .site-header {
      position: sticky; top: 0; z-index: 50;
      background: rgba(245,246,244,.85);
      backdrop-filter: saturate(180%) blur(12px);
    }
    /* Línea de horizonte: separa cabecera de contenido en toda la web,
       sustituye cualquier decoración de fondo suelta en el héroe. */
    .site-header::after {
      content: '';
      display: block;
      height: 3px;
      background: linear-gradient(90deg, var(--mar), var(--sol));
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

    .burger { display: none; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; padding: 8px; }
    .burger span { width: 24px; height: 2px; background: var(--tinta); border-radius: 2px; transition: .2s; }
    .burger--open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
    .burger--open span:nth-child(2) { opacity: 0; }
    .burger--open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

    @media (max-width: 820px) {
      .burger { display: flex; }
      .nav {
        position: absolute; top: 71px; left: 0; right: 0;
        flex-direction: column; gap: 0;
        background: var(--cal); border-bottom: 1px solid var(--linea);
        max-height: 0; overflow: hidden; transition: max-height .25s ease;
      }
      .nav--open { max-height: 320px; }
      .nav a { padding: 1rem clamp(1.2rem,4vw,2.5rem); border-top: 1px solid var(--linea); }
      .nav a.active::after { display: none; }
    }
  `],
})
export class HeaderComponent {
  open = signal(false);
  toggle() { this.open.update((v) => !v); }
  close() { this.open.set(false); }
}
