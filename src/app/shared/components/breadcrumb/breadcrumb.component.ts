import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

export interface BreadcrumbItem {
  label: string;
  /** Ausente en el último elemento: es la página actual, sin enlace. */
  path?: string;
}

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <nav class="breadcrumb" aria-label="Migas de pan" i18n-aria-label="@@breadcrumb.ariaLabel">
      <ol>
        <li *ngFor="let item of items; let last = last">
          <a *ngIf="item.path && !last" [routerLink]="item.path">{{ item.label }}</a>
          <span *ngIf="!item.path || last" aria-current="page">{{ item.label }}</span>
        </li>
      </ol>
    </nav>
  `,
  styles: [`
    /* Mono: el mismo rol de utilidad/dato que ya cumple en el eyebrow, el
       índice del catálogo y el selector de idioma — una miga de pan es
       información de posición, no prosa. */
    .breadcrumb ol {
      display: flex; flex-wrap: wrap; align-items: baseline; gap: .5rem;
      list-style: none; padding: 0; margin: 0 0 1.4rem;
      font-family: var(--mono); font-size: .74rem; letter-spacing: .02em;
      color: var(--tinta-60);
    }
    .breadcrumb li { display: flex; align-items: baseline; gap: .5rem; }
    .breadcrumb li:not(:last-child)::after { content: '·'; color: var(--linea); }
    .breadcrumb a { color: var(--tinta-60); text-decoration: none; transition: color .15s ease; }
    .breadcrumb a:hover, .breadcrumb a:focus-visible { color: var(--mar); text-decoration: underline; }
    .breadcrumb span[aria-current] { color: var(--tinta); font-weight: 700; }
  `],
})
export class BreadcrumbComponent {
  @Input({ required: true }) items!: BreadcrumbItem[];
}
