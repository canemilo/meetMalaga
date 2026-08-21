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
    .breadcrumb ol {
      display: flex; flex-wrap: wrap; gap: .4rem;
      list-style: none; padding: 0; margin: 0 0 1rem;
      font-size: var(--step--1); color: var(--tinta-60);
    }
    .breadcrumb li:not(:last-child)::after { content: '/'; margin-left: .4rem; }
    .breadcrumb a { color: var(--tinta-60); text-decoration: none; }
    .breadcrumb a:hover { color: var(--mar); text-decoration: underline; }
    .breadcrumb span[aria-current] { color: var(--tinta); }
  `],
})
export class BreadcrumbComponent {
  @Input({ required: true }) items!: BreadcrumbItem[];
}
