import { Component, OnInit, signal, computed, inject, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { DISPONIBILIDAD } from '../../../core/data/disponibilidad.data';
import { RUTAS } from '../../../core/data/rutas.data';
import { EstadoDia, Franja } from '../../../core/models/disponibilidad.model';

interface Celda {
  day: number;
  iso: string;
  estado: EstadoDia;
  franjas: Franja[];
  esHoy: boolean;
}

const BCP47: Record<string, string> = { es: 'es-ES', en: 'en-GB', fr: 'fr-FR', de: 'de-DE' };

/**
 * Calendario de disponibilidad de tus rutas propias. Deriva el estado de cada
 * día a partir de DISPONIBILIDAD (reglas semanales + excepciones por fecha).
 * Al pulsar un día disponible se muestran sus franjas y un botón para reservar
 * por WhatsApp con la ruta, la fecha y la hora ya escritas.
 *
 * ngSkipHydration: el calendario depende de la fecha actual, así que dejamos
 * que se renderice en el cliente sin conflictos de hidratación con el SSR.
 */
@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [CommonModule],
  host: { ngSkipHydration: 'true' },
  template: `
    <div class="cal">
      <div class="cal__head">
        <button class="cal__nav" (click)="prevMes()" [disabled]="!puedeRetroceder()" aria-label="Mes anterior" i18n-aria-label="@@calendario.mesAnterior">‹</button>
        <h3 class="cal__mes">{{ nombreMes() }} {{ anio() }}</h3>
        <button class="cal__nav" (click)="nextMes()" aria-label="Mes siguiente" i18n-aria-label="@@calendario.mesSiguiente">›</button>
      </div>

      <div class="cal__grid cal__dows">
        <span *ngFor="let d of dows">{{ d }}</span>
      </div>

      <div class="cal__grid">
        <ng-container *ngFor="let c of celdas()">
          <span *ngIf="!c" class="cal__empty"></span>
          <button
            *ngIf="c"
            class="cal__day"
            [class]="'estado-' + c.estado"
            [class.hoy]="c.esHoy"
            [class.sel]="c.iso === seleccion()"
            [disabled]="c.estado !== 'disponible'"
            (click)="elegir(c)"
            [attr.aria-label]="etiqueta(c)"
          >
            <span class="cal__num">{{ c.day }}</span>
            <span class="cal__dot" *ngIf="c.estado === 'disponible'">{{ c.franjas.length }}</span>
          </button>
        </ng-container>
      </div>

      <!-- Leyenda -->
      <ul class="cal__leyenda">
        <li><span class="lg estado-disponible"></span><ng-container i18n="@@calendario.leyenda.disponible">Disponible</ng-container></li>
        <li><span class="lg estado-con-tour"></span><ng-container i18n="@@calendario.leyenda.conTour">Con tour</ng-container></li>
        <li><span class="lg estado-ocupado"></span><ng-container i18n="@@calendario.leyenda.ocupado">Ocupado</ng-container></li>
        <li><span class="lg estado-no-disponible"></span><ng-container i18n="@@calendario.leyenda.noDisponible">No disponible</ng-container></li>
      </ul>

      <!-- Estado vacío: invita a moverse de mes o a escribir directamente -->
      <p class="cal__sinhuecos" *ngIf="!hayDisponibles()" i18n="@@calendario.sinHuecos">
        Este mes no tengo huecos libres.
        <button type="button" class="cal__link" (click)="nextMes()">Mira el mes siguiente</button>
        o
        <a *ngIf="whatsapp" [href]="'https://wa.me/' + whatsapp" target="_blank" rel="noopener">escríbeme por WhatsApp</a>.
      </p>

      <!-- Franjas del día elegido -->
      <div class="cal__franjas" *ngIf="diaElegido() as dia">
        <h4>{{ formatoLargo(dia.iso) }}</h4>
        <p class="cal__pick" i18n="@@calendario.elegirFranja">Elige una franja para reservar:</p>
        <div class="cal__slots">
          <div class="slot" *ngFor="let f of dia.franjas">
            <div class="slot__info">
              <span class="slot__hora">{{ f.hora }}</span>
              <span class="slot__ruta">{{ tituloRuta(f.rutaId) }}</span>
            </div>
            <a
              *ngIf="whatsapp; else sinWa"
              class="btn btn--wa"
              [href]="waLink(dia.iso, f)"
              target="_blank"
              rel="noopener"
              i18n="@@calendario.reservarBtn"
            >Reservar</a>
            <ng-template #sinWa><span class="slot__nowa" i18n="@@calendario.configuraWhatsapp">Configura tu WhatsApp</span></ng-template>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .cal { background: #fff; border: 1px solid var(--linea); border-radius: var(--radio); padding: clamp(1.2rem, 3vw, 1.8rem); }
    .cal__head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.2rem; }
    .cal__mes { font-size: var(--step-2); margin: 0; text-transform: capitalize; }
    .cal__nav { width: 44px; height: 44px; border-radius: 50%; border: 1px solid var(--linea); background: #fff; font-size: 1.3rem; line-height: 1; cursor: pointer; color: var(--tinta); transition: background .15s ease, transform .15s ease; }
    .cal__nav:hover:not(:disabled) { background: var(--cal-hueso); }
    .cal__nav:active:not(:disabled) { background: var(--linea); transform: scale(.94); }
    .cal__nav:disabled { opacity: .35; cursor: not-allowed; }

    .cal__grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 6px; }
    .cal__dows { margin-bottom: 6px; }
    .cal__dows span { text-align: center; font-family: var(--mono); font-size: .7rem; color: var(--tinta-60); text-transform: uppercase; }

    .cal__empty { aspect-ratio: 1; }
    .cal__day {
      position: relative; aspect-ratio: 1; border: 1px solid var(--linea);
      border-radius: 10px; background: #fff; cursor: default; padding: 0;
      display: flex; align-items: center; justify-content: center;
      font-family: var(--body); font-size: var(--step--1); color: var(--tinta);
      transition: background .15s ease, transform .15s ease, box-shadow .15s ease;
    }
    .cal__num { font-weight: 600; }
    .cal__dot { position: absolute; top: 3px; right: 4px; font-family: var(--mono); font-size: .58rem; background: var(--tinta); color: var(--cal); border-radius: 999px; min-width: 14px; height: 14px; display: grid; place-items: center; padding: 0 3px; }

    /* estados */
    .estado-disponible { background: rgba(244,183,64,.16); border-color: var(--sol); cursor: pointer; }
    .estado-disponible:hover { background: rgba(244,183,64,.32); transform: translateY(-1px); box-shadow: var(--sombra); }
    .estado-disponible:active { transform: translateY(0); box-shadow: none; }
    .estado-con-tour { background: rgba(27,122,148,.14); border-color: var(--mar-claro); color: var(--mar); }
    .estado-ocupado { background: var(--cal-hueso); color: var(--tinta-60); }
    .estado-no-disponible { background: rgba(214,51,108,.10); border-color: rgba(214,51,108,.4); color: var(--buganvilla); text-decoration: line-through; }
    .estado-sin-tours { color: var(--tinta-60); }
    .estado-pasado { opacity: .4; }
    .cal__day.hoy { box-shadow: inset 0 0 0 2px var(--tinta); }
    .cal__day.sel { outline: 3px solid var(--sol); outline-offset: 1px; }

    .cal__leyenda { list-style: none; margin: 1.2rem 0 0; padding: 1rem 0 0; border-top: 1px solid var(--linea); display: flex; flex-wrap: wrap; gap: .7rem 1.3rem; }
    .cal__leyenda li {
      display: flex; align-items: center; gap: .45rem;
      font-family: var(--mono); font-size: .68rem; letter-spacing: .04em;
      text-transform: uppercase; color: var(--tinta-60);
    }
    .lg { width: 12px; height: 12px; border-radius: 4px; display: inline-block; border: 1px solid var(--linea); }

    /* Estado vacío del mes: invitación a moverse, no un hueco mudo */
    .cal__sinhuecos {
      margin: 1.1rem 0 0; padding: 1rem 1.1rem; font-size: var(--step--1); color: var(--tinta-60);
      background: var(--cal-hueso); border-radius: var(--radio); border: 1px dashed var(--linea);
    }
    .cal__sinhuecos a { color: var(--mar); font-weight: 600; }
    .cal__link {
      background: none; border: none; padding: 0; font: inherit; font-weight: 600;
      color: var(--mar); cursor: pointer; text-decoration: underline; text-underline-offset: 2px;
    }

    .cal__franjas { margin-top: 1.4rem; padding-top: 1.4rem; border-top: 1px solid var(--linea); }
    .cal__franjas h4 { font-size: var(--step-1); margin: 0 0 .3rem; text-transform: capitalize; }
    .cal__pick { margin: 0 0 .9rem; font-size: var(--step--1); color: var(--tinta-60); }
    .cal__slots { display: flex; flex-direction: column; gap: .6rem; }
    .slot { display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding: .8rem 1rem; border: 1px solid var(--linea); border-radius: var(--radio); transition: box-shadow .15s ease; }
    .slot:hover { box-shadow: var(--sombra); }
    .slot__info { display: flex; flex-direction: column; gap: .1rem; }
    .slot__hora { font-family: var(--mono); font-weight: 700; color: var(--mar); font-size: var(--step-0); }
    .slot__ruta { font-size: var(--step--1); color: var(--tinta-60); }
    .slot__nowa { font-size: .78rem; color: var(--tinta-60); font-style: italic; }
    .btn--wa { background: #25D366; color: #06351f; }
  `],
})
export class CalendarioComponent implements OnInit {
  dows = [
    $localize`:@@calendario.dow.lunes:L`,
    $localize`:@@calendario.dow.martes:M`,
    $localize`:@@calendario.dow.miercoles:X`,
    $localize`:@@calendario.dow.jueves:J`,
    $localize`:@@calendario.dow.viernes:V`,
    $localize`:@@calendario.dow.sabado:S`,
    $localize`:@@calendario.dow.domingo:D`,
  ];
  whatsapp = environment.contacto.whatsapp;
  private readonly locale = inject(LOCALE_ID);
  private readonly bcp47 = BCP47[this.locale] ?? 'es-ES';

  private hoy = new Date();
  private hoyIso = this.iso(this.hoy.getFullYear(), this.hoy.getMonth(), this.hoy.getDate());

  anio = signal(this.hoy.getFullYear());
  mes = signal(this.hoy.getMonth()); // 0-11
  seleccion = signal<string | null>(null);

  celdas = computed<(Celda | null)[]>(() => this.construir(this.anio(), this.mes()));
  diaElegido = computed<Celda | null>(() => {
    const sel = this.seleccion();
    return sel ? this.celdas().find((c) => c && c.iso === sel) ?? null : null;
  });
  hayDisponibles = computed<boolean>(() =>
    this.celdas().some((c) => c?.estado === 'disponible')
  );

  ngOnInit(): void {}

  // --- Navegación ---
  puedeRetroceder(): boolean {
    return this.anio() > this.hoy.getFullYear() ||
      (this.anio() === this.hoy.getFullYear() && this.mes() > this.hoy.getMonth());
  }
  prevMes(): void {
    if (!this.puedeRetroceder()) return;
    this.mover(-1);
  }
  nextMes(): void { this.mover(1); }
  private mover(delta: number): void {
    let m = this.mes() + delta, y = this.anio();
    if (m < 0) { m = 11; y--; }
    if (m > 11) { m = 0; y++; }
    this.mes.set(m); this.anio.set(y); this.seleccion.set(null);
  }

  nombreMes(): string {
    return new Date(this.anio(), this.mes(), 1)
      .toLocaleDateString(this.bcp47, { month: 'long' });
  }

  // --- Construcción del mes ---
  private construir(y: number, m: number): (Celda | null)[] {
    const primero = new Date(y, m, 1);
    const offset = (primero.getDay() + 6) % 7; // lunes primero
    const dias = new Date(y, m + 1, 0).getDate();
    const celdas: (Celda | null)[] = [];
    for (let i = 0; i < offset; i++) celdas.push(null);
    for (let d = 1; d <= dias; d++) {
      const iso = this.iso(y, m, d);
      const franjas = this.franjasDe(y, m, d, iso);
      celdas.push({
        day: d, iso, franjas,
        estado: this.estadoDe(iso, franjas),
        esHoy: iso === this.hoyIso,
      });
    }
    return celdas;
  }

  private estadoDe(iso: string, franjas: Franja[]): EstadoDia {
    if (iso < this.hoyIso) return 'pasado';
    if (DISPONIBILIDAD.noDisponibles?.includes(iso)) return 'no-disponible';
    if (DISPONIBILIDAD.ocupados?.includes(iso)) return 'ocupado';
    if (DISPONIBILIDAD.conTour?.includes(iso)) return 'con-tour';
    if (franjas.length > 0) return 'disponible';
    return 'sin-tours';
  }

  private franjasDe(y: number, m: number, d: number, iso: string): Franja[] {
    const semana = DISPONIBILIDAD.semanal[new Date(y, m, d).getDay()] ?? [];
    const extra = DISPONIBILIDAD.extra?.[iso] ?? [];
    return [...semana, ...extra];
  }

  // --- Interacción ---
  elegir(c: Celda): void {
    if (c.estado !== 'disponible') return;
    this.seleccion.set(this.seleccion() === c.iso ? null : c.iso);
  }

  tituloRuta(id: string): string {
    return RUTAS.find((r) => r.id === id)?.title ?? 'Ruta';
  }

  waLink(iso: string, f: Franja): string {
    const fecha = this.formatoLargo(iso);
    const titulo = this.tituloRuta(f.rutaId);
    const msg = this.locale === 'es'
      ? `Hola, quiero reservar la ruta "${titulo}" el ${fecha} a las ${f.hora}. ¿Confirmamos?`
      : `Hi, I'd like to book the "${titulo}" route on ${fecha} at ${f.hora}. Can you confirm?`;
    return `https://wa.me/${this.whatsapp}?text=${encodeURIComponent(msg)}`;
  }

  etiqueta(c: Celda): string {
    const map: Record<EstadoDia, string> = {
      'disponible': $localize`:@@calendario.estado.disponible:disponible`,
      'con-tour': $localize`:@@calendario.estado.conTour:con tour`,
      'ocupado': $localize`:@@calendario.estado.ocupado:ocupado`,
      'no-disponible': $localize`:@@calendario.estado.noDisponible:no disponible`,
      'sin-tours': $localize`:@@calendario.estado.sinTours:sin tours`,
      'pasado': $localize`:@@calendario.estado.pasado:pasado`,
    };
    return `${c.day}: ${map[c.estado]}`;
  }

  formatoLargo(iso: string): string {
    const [y, m, d] = iso.split('-').map(Number);
    return new Date(y, m - 1, d)
      .toLocaleDateString(this.bcp47, { weekday: 'long', day: 'numeric', month: 'long' });
  }

  private iso(y: number, m: number, d: number): string {
    return `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
  }
}
