import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="nf container">
      <p class="eyebrow">Error 404</p>
      <h1>Esta página se fue de tapas.</h1>
      <p class="nf__lead">No encontramos lo que buscabas, pero Málaga tiene mucho que ofrecer.</p>
      <a routerLink="/" class="btn btn--sol">Volver al inicio</a>
    </section>
  `,
  styles: [`
    .nf { padding: 6rem 0; text-align: center; }
    .nf h1 { font-size: var(--step-3); }
    .nf__lead { color: var(--tinta-60); font-size: var(--step-1); margin-bottom: 1.5rem; }
    .eyebrow { display: inline-block; }
  `],
})
export class NotFoundComponent {
}
