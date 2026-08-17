import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="site-footer">
      <div class="container">
        <div class="site-footer__grid">
          <div>
            <a routerLink="/" class="brand">
              <span class="brand__mark">◐</span>
              <span class="brand__name">Meet&nbsp;Málaga</span>
            </a>
            <p class="tagline">
              Tu guía para descubrir Málaga: tours, coches, restaurantes y ocio,
              reservados con las mejores plataformas.
            </p>
          </div>

          <nav class="cols">
            <h4>Explora</h4>
            <a routerLink="/tours">Tours</a>
            <a routerLink="/coches">Alquiler de coches</a>
            <a routerLink="/restaurantes">Restaurantes</a>
            <a routerLink="/ocio">Ocio</a>
          </nav>

          <nav class="cols">
            <h4>Legal</h4>
            <a routerLink="/aviso-legal">Aviso legal</a>
            <a routerLink="/privacidad">Privacidad</a>
            <a routerLink="/cookies">Cookies</a>
            <a routerLink="/afiliados">Aviso de afiliados</a>
          </nav>
        </div>

        <p class="disclosure">
          Meet Málaga participa en programas de afiliación. Cuando reservas a
          través de nuestros enlaces podemos recibir una comisión sin coste
          adicional para ti. Los precios son orientativos; el precio final lo
          fija cada plataforma en el momento de la reserva.
        </p>

        <p class="copy">© {{ year }} Meet Málaga. Hecho en Málaga.</p>
      </div>
    </footer>
  `,
  styles: [`
    .site-footer { background: var(--tinta); color: var(--cal); margin-top: 5rem; padding: 3.5rem 0 2rem; }
    .site-footer__grid {
      display: grid; grid-template-columns: 1.6fr 1fr 1fr; gap: 2.5rem;
      padding-bottom: 2.5rem; border-bottom: 1px solid rgba(245,246,244,.15);
    }
    .brand { display: inline-flex; align-items: center; gap: .5rem; text-decoration: none; color: var(--cal); }
    .brand__mark { color: var(--sol); font-size: 1.3rem; transform: rotate(-20deg); }
    .brand__name { font-family: var(--display); font-weight: 900; font-size: 1.25rem; }
    .tagline { color: rgba(245,246,244,.7); font-size: var(--step--1); max-width: 34ch; margin-top: .8rem; }

    .cols { display: flex; flex-direction: column; gap: .6rem; }
    .cols h4 { font-family: var(--mono); font-size: .72rem; letter-spacing: .15em; text-transform: uppercase; color: var(--sol); margin: 0 0 .4rem; }
    .cols a { text-decoration: none; color: rgba(245,246,244,.8); font-size: var(--step--1); }
    .cols a:hover { color: var(--cal); }

    .disclosure { color: rgba(245,246,244,.6); font-size: .8rem; line-height: 1.6; max-width: 70ch; margin: 1.8rem 0 0; }
    .copy { color: rgba(245,246,244,.5); font-size: .78rem; margin: 1.5rem 0 0; }

    @media (max-width: 720px) { .site-footer__grid { grid-template-columns: 1fr; gap: 1.8rem; } }
  `],
})
export class FooterComponent {
  year = new Date().getFullYear();
}
