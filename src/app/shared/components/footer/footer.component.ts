import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, RevealDirective],
  template: `
    <footer class="site-footer">
      <div class="container">
        <div class="site-footer__grid" appReveal="up">
          <div>
            <a routerLink="/" class="brand">
              <span class="brand__mark">◐</span>
              <span class="brand__name">Meet&nbsp;Málaga</span>
            </a>
            <p class="tagline" i18n="@@footer.tagline">
              Tu guía para descubrir Málaga: tours, coches, restaurantes y ocio,
              reservados con las mejores plataformas.
            </p>
          </div>

          <nav class="cols">
            <h4 i18n="@@footer.col.explora">Explora</h4>
            <a routerLink="/tours"><span class="cols__idx">01</span><span i18n="@@footer.link.tours">Tours</span></a>
            <a routerLink="/coches"><span class="cols__idx">02</span><span i18n="@@footer.link.coches">Alquiler de coches</span></a>
            <a routerLink="/restaurantes"><span class="cols__idx">03</span><span i18n="@@footer.link.restaurantes">Restaurantes</span></a>
            <a routerLink="/ocio"><span class="cols__idx">04</span><span i18n="@@footer.link.ocio">Ocio</span></a>
          </nav>

          <nav class="cols">
            <h4 i18n="@@footer.col.legal">Legal</h4>
            <a routerLink="/aviso-legal" i18n="@@footer.link.avisoLegal">Aviso legal</a>
            <a routerLink="/privacidad" i18n="@@footer.link.privacidad">Privacidad</a>
            <a routerLink="/cookies" i18n="@@footer.link.cookies">Cookies</a>
            <a routerLink="/afiliados" i18n="@@footer.link.afiliados">Aviso de afiliados</a>
          </nav>
        </div>

        <p class="disclosure" i18n="@@footer.disclosure">
          Meet Málaga participa en programas de afiliación. Cuando reservas a
          través de nuestros enlaces podemos recibir una comisión sin coste
          adicional para ti. Los precios son orientativos; el precio final lo
          fija cada plataforma en el momento de la reserva.
        </p>

        <p class="copy" i18n="@@footer.copyright">© {{ year }} Meet Málaga. Hecho en Málaga.</p>
      </div>
    </footer>
  `,
  styles: [`
    /* Registro editorial: más aire arriba (alineado con el ritmo entre
       secciones del resto del sitio) y jerarquía tipográfica más marcada. */
    .site-footer { background: var(--tinta); color: var(--cal); margin-top: var(--space-section); padding: clamp(3rem, 6vw, 5rem) 0 2.2rem; }
    .site-footer__grid {
      display: grid; grid-template-columns: 1.6fr 1fr 1fr; gap: clamp(2rem, 4vw, 3.2rem);
      padding-bottom: 2.6rem; border-bottom: 1px solid color-mix(in srgb, var(--cal) 15%, transparent);
    }
    .brand { display: inline-flex; align-items: center; gap: .5rem; text-decoration: none; color: var(--cal); }
    .brand__mark { color: var(--sol); font-size: 1.4rem; display: inline-block; transform: rotate(-20deg); transition: transform .4s ease; }
    .brand:hover .brand__mark, .brand:focus-visible .brand__mark { transform: rotate(160deg); }
    .brand__name { font-family: var(--display); font-weight: 900; font-size: var(--step-1); letter-spacing: -.02em; }
    .tagline { color: color-mix(in srgb, var(--cal) 70%, transparent); font-size: var(--step--1); max-width: 34ch; line-height: 1.6; margin-top: 1rem; }

    .cols { display: flex; flex-direction: column; gap: .7rem; }
    .cols h4 {
      font-family: var(--mono); font-size: .72rem; letter-spacing: .18em; text-transform: uppercase;
      color: var(--sol); margin: 0 0 .6rem; font-weight: 700;
    }
    .cols a {
      display: flex; align-items: baseline; gap: .55rem;
      text-decoration: none; color: color-mix(in srgb, var(--cal) 80%, transparent); font-size: var(--step--1);
      transition: color .15s ease;
    }
    .cols a:hover, .cols a:focus-visible { color: var(--cal); }
    /* Mismo tratamiento numérico que el catálogo del header: no decora,
       repite el índice real de las 4 verticales agrupadas ahí. */
    .cols__idx { font-family: var(--mono); font-size: .7rem; color: color-mix(in srgb, var(--cal) 45%, transparent); }

    .disclosure {
      color: color-mix(in srgb, var(--cal) 60%, transparent); font-size: var(--step--1);
      line-height: 1.65; max-width: 70ch; margin: 2rem 0 0;
    }
    .copy { color: color-mix(in srgb, var(--cal) 45%, transparent); font-family: var(--mono); font-size: .72rem; letter-spacing: .02em; margin: 1.6rem 0 0; }

    @media (max-width: 720px) { .site-footer__grid { grid-template-columns: 1fr; gap: 2rem; } }
  `],
})
export class FooterComponent {
  year = new Date().getFullYear();
}
