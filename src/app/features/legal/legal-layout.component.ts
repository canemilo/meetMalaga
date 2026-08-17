import {Component, Input} from '@angular/core';

/**
 * Marco visual compartido por todas las páginas legales.
 * Usa <app-legal-layout [title]="..."> con el contenido proyectado dentro.
 */
@Component({
  selector: 'app-legal-layout',
  standalone: true,
  template: `
    <section class="legal container">
      <p class="eyebrow">Información legal</p>
      <h1>{{ title }}</h1>
      <div class="legal__body">
        <ng-content />
      </div>
      <p class="legal__note">
        ⚠️ Plantilla orientativa. Sustituye los datos entre corchetes por los
        tuyos y revísala con un profesional antes de publicar.
      </p>
    </section>
  `,
  styles: [`
    .legal { max-width: 760px; padding-top: 3.5rem; padding-bottom: 2rem; }
    .legal h1 { font-size: var(--step-3); }
    .legal__body { margin-top: 1.5rem; }
    .legal__body :is(h2) { font-size: var(--step-1); margin-top: 2rem; }
    .legal__body p, .legal__body li { color: var(--tinta-60); }
    .legal__body ul { padding-left: 1.2rem; }
    .legal__note {
      margin-top: 3rem; padding: 1rem 1.2rem; border-radius: var(--radio);
      background: var(--cal-hueso); font-size: var(--step--1); color: var(--tinta-60);
    }
  `],
})
export class LegalLayoutComponent {
  @Input({required: true}) title!: string;
}
