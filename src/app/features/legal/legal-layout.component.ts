import { Component, Input } from '@angular/core';

/**
 * Marco visual compartido por todas las páginas legales.
 * Usa <app-legal-layout [title]="..."> con el contenido proyectado dentro.
 */
@Component({
  selector: 'app-legal-layout',
  standalone: true,
  template: `
    <section class="legal container">
      <header class="legal__head">
        <p class="eyebrow" i18n="@@legal.eyebrow">Información legal</p>
        <h1>{{ title }}</h1>
      </header>
      <article class="legal__body">
        <ng-content />
      </article>
      <p class="legal__note" i18n="@@legal.nota">
        <strong>Aviso.</strong> Plantilla orientativa. Sustituye los datos entre corchetes por los
        tuyos y revísala con un profesional antes de publicar.
      </p>
    </section>
  `,
  styles: [`
    /* Página utilitaria de bajo tráfico: mismo lenguaje tipográfico que el
       resto del sitio, sin storytelling ni animación — solo jerarquía y
       una columna cómoda de leer. */
    .legal { max-width: 42rem; padding-top: 3rem; padding-bottom: 4rem; }

    .legal__head { padding-bottom: 1.6rem; border-bottom: 1px solid var(--linea); }
    .legal h1 { font-size: var(--step-3); margin: 0; }

    .legal__body { margin-top: 2rem; max-width: 62ch; counter-reset: legal-sec; }
    .legal__body p { margin: 0 0 1.1em; color: var(--tinta-60); }
    .legal__body strong { color: var(--tinta); }

    /* Numeración real de apartados del documento (no decorativa: cada
       h2 es, literalmente, la siguiente sección del texto legal). */
    .legal__body h2 {
      counter-increment: legal-sec;
      display: flex;
      align-items: baseline;
      gap: .7rem;
      font-size: var(--step-1);
      margin: 2.4rem 0 1rem;
      padding-top: 1.3rem;
      border-top: 1px solid var(--linea);
    }
    .legal__body h2::before {
      content: counter(legal-sec, decimal-leading-zero);
      font-family: var(--mono);
      font-size: var(--step--1);
      font-weight: 400;
      color: var(--mar-claro);
      letter-spacing: .04em;
    }
    .legal__body ul { list-style: none; padding: 0; margin: 0 0 1.1em; display: flex; flex-direction: column; gap: .6rem; }
    .legal__body li { position: relative; padding-left: 1.3rem; color: var(--tinta-60); }
    .legal__body li::before {
      content: ''; position: absolute; left: 0; top: .65em;
      width: 8px; height: 2px; background: var(--sol);
    }

    .legal__note {
      margin-top: 3.5rem; padding: 1.1rem 1.3rem;
      border-left: 3px solid var(--sol);
      border-radius: 0 var(--radio) var(--radio) 0;
      background: var(--cal-hueso); font-size: var(--step--1); color: var(--tinta-60);
    }
    .legal__note strong { color: var(--tinta); }
  `],
})
export class LegalLayoutComponent {
  @Input({ required: true }) title!: string;
}
