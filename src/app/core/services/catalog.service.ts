import { Injectable } from '@angular/core';
import { Offer, Vertical } from '../models/offer.model';
import { TOURS } from '../data/tours.data';
import { COCHES } from '../data/coches.data';
import { RESTAURANTES } from '../data/restaurantes.data';
import { OCIO } from '../data/ocio.data';
import { HOTELES } from '../data/hoteles.data';

/**
 * Fuente única de datos del catálogo. Hoy lee de arrays locales; el día que
 * quieras un CMS (WordPress headless, Strapi...) solo cambias la implementación
 * de estos métodos para que hagan fetch a la API, sin tocar los componentes.
 */
@Injectable({ providedIn: 'root' })
export class CatalogService {
  private readonly all: Offer[] = [...TOURS, ...COCHES, ...RESTAURANTES, ...OCIO, ...HOTELES];

  getByVertical(vertical: Vertical): Offer[] {
    return this.all.filter((o) => o.vertical === vertical);
  }

  getFeatured(limit = 6): Offer[] {
    return this.all.filter((o) => o.featured).slice(0, limit);
  }

  getById(id: string): Offer | undefined {
    return this.all.find((o) => o.id === id);
  }
}
