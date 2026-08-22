import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink, RevealDirective],
  template: `
    <section class="nf container" appReveal="up">
      <p class="eyebrow" i18n="@@notFound.eyebrow">Error 404</p>
      <h1 i18n="@@notFound.title">Esta página se fue de tapas.</h1>
      <p class="nf__lead" i18n="@@notFound.subtitle">
        El enlace no existe o se ha movido. Vuelve al inicio o mira los free tours de hoy.
      </p>
      <div class="nf__actions">
        <a routerLink="/" class="btn btn--sol" i18n="@@notFound.cta">Volver al inicio</a>
        <a routerLink="/free-tours" class="nf__secondary" i18n="@@home.guia.freeTours.link">Ver free tours</a>
      </div>
    </section>
  `,
  styles: [`
    /* 404 simple: mismo lenguaje del sitio (eyebrow mono, h1 serif, cal cálido),
       sin numerales gigantes ni animación de sobra — una entrada sutil y punto. */
    .nf { padding: clamp(4.5rem, 12vw, 7rem) 0; text-align: center; }
    .nf h1 { font-size: var(--step-3); }
    .nf__lead {
      color: var(--tinta-60);
      font-size: var(--step-1);
      max-width: 42ch;
      margin: 0 auto 1.8rem;
    }
    .eyebrow { display: inline-block; }
    .nf__actions {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      gap: 1.4rem;
    }
    .nf__secondary {
      display: inline-block;
      font-weight: 600;
      font-size: var(--step--1);
      color: var(--tinta);
      text-decoration: underline;
      text-decoration-color: var(--sol);
      text-decoration-thickness: 2px;
      text-underline-offset: 3px;
      /* padding + margen negativo: agranda el área táctil (>=44px) sin
         mover el subrayado, que sigue pegado al texto (text-decoration,
         no border-bottom) */
      padding: .8rem .3rem;
      margin: -.8rem -.3rem;
      transition: color .15s ease, text-decoration-color .15s ease;
    }
    .nf__secondary:hover { color: var(--mar); text-decoration-color: var(--mar); }
  `],
})
export class NotFoundComponent {}
