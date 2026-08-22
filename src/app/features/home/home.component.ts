import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  QueryList,
  ViewChild,
  ViewChildren,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SeoService } from '../../core/services/seo.service';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { TiltDirective } from '../../shared/directives/tilt.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RevealDirective, TiltDirective],
  template: `
    <!-- HERO-SCROLL: columna de texto (mensaje + CTA, lo que manda, se
         mantiene fija mientras dura el efecto) y una única pieza visual con
         la firma .corte que, a medida que se baja, se disuelve de la foto
         actual (placeholder, a la espera de que Samuel ponga la suya) al
         mapa ilustrado en line-art del centro histórico. Sobre el mapa solo
         hay dos marcadores — free tours y rutas privadas, el mismo peso
         visual entre ambos — ninguno para el catálogo de afiliación, que
         sigue secundario y más abajo. Sin JS o con "reduc(e) movimiento" el
         estado final es igual de legible: la foto se sustituye por el mapa
         ya trazado, sin depender de que la animación llegue a completarse
         (ver reglas en :root y el bloque de estilos de esta sección). -->
    <section class="hero" #heroSection>
      <div class="container hero__inner">
        <div class="hero__copy">
          <p class="eyebrow" i18n="@@home.hero.eyebrow">Costa del Sol · Andalucía</p>
          <h1 class="hero__title" i18n="@@home.hero.title2">
            Un guía <em>de aquí</em>,<br />no una guía turística.
          </h1>
          <p class="hero__lead" i18n="@@home.hero.lead2">
            Empieza gratis con un free tour por el centro o reserva una ruta
            privada a tu ritmo.
          </p>
          <div class="hero__cta">
            <a routerLink="/free-tours" class="btn btn--sol" i18n="@@home.guia.freeTours.link">Ver free tours</a>
            <a routerLink="/rutas" class="btn btn--primary" i18n="@@home.guia.rutas.link">Ver rutas privadas</a>
          </div>
          <p class="hero__trust" i18n="@@home.hero.trust">Guía local · titulado en Turismo</p>
        </div>

        <figure class="hero__media corte">
          <img
            class="hero__photo"
            src="https://picsum.photos/seed/malaga-soho-alcazaba-luz-dorada/900/1125"
            alt="Mural de arte urbano del Soho de Málaga fundiéndose con la Alcazaba y la Catedral al fondo, luz dorada de atardecer y gente paseando junto al mar"
            i18n-alt="@@home.hero.imgAlt"
            fetchpriority="high" width="900" height="1125" />

          <svg class="hero__map" viewBox="0 0 400 500" aria-hidden="true" focusable="false">
            <line #mapPath class="hero__mapLine hero__mapLine--ground" x1="20" y1="430" x2="380" y2="430" />
            <path #mapPath class="hero__mapLine hero__mapLine--route"
              d="M110,414 C160,400 200,404 240,406 C280,408 300,404 345,412" />
            <path #mapPath class="hero__mapLine hero__mapLine--building"
              d="M50,430 L50,382 L62,382 L62,370 L74,370 L74,382 L86,382 L86,368 L98,368 L98,382 L110,382
                 L110,344 L124,344 L124,330 L138,330 L138,344 L152,344 L152,382 L164,382 L164,370 L176,370
                 L176,382 L188,382 L188,430 Z" />
            <path #mapPath class="hero__mapLine hero__mapLine--building"
              d="M205,430 L205,398 L226,398 L226,430
                 M226,430 L226,412 L246,412 L246,430
                 M270,430 L270,318 L280,318 L280,300 L288,300 L288,318 L296,318 L296,430" />
            <path #mapPath class="hero__mapLine hero__mapLine--building"
              d="M330,430 L330,352 L346,352 L346,430
                 M330,352 L338,332 L346,352
                 M338,332 L338,322
                 M300,444 Q310,437 320,444 Q330,451 340,444
                 M355,438 L372,438 L367,424 L360,424 Z
                 M350,440 L378,440 L372,448 L356,448 Z" />
          </svg>

          <div class="hero__markers">
            <a routerLink="/free-tours" class="hero__marker hero__marker--free" #markerFree
              style="left: 33%; top: 60%">
              <span class="hero__markerDot" aria-hidden="true"></span>
              <span class="hero__markerLabel" i18n="@@home.guia.freeTours.title">Free tours</span>
            </a>
            <a routerLink="/rutas" class="hero__marker hero__marker--rutas" #markerRutas
              style="left: 84.5%; top: 60%">
              <span class="hero__markerDot" aria-hidden="true"></span>
              <span class="hero__markerLabel" i18n="@@home.guia.rutas.title">Rutas privadas</span>
            </a>
          </div>
          <figcaption class="visually-hidden" i18n="@@home.hero.mapCaption">
            Mapa del centro histórico de Málaga con la Alcazaba, la Catedral y el puerto
          </figcaption>
        </figure>
      </div>
      <div class="hero__glow" aria-hidden="true"></div>
    </section>

    <!-- LO QUE OFREZCO YO -->
    <section class="container guia">
      <p class="eyebrow" i18n="@@home.guia.eyebrow">Conmigo, guía local</p>
      <h2 class="guia__title" i18n="@@home.guia.title2">Dos formas de recorrer Málaga conmigo</h2>
      <div class="guia__cards">
        <a routerLink="/free-tours" class="guia__card guia__card--free corte" appReveal="up" appTilt [appTiltMax]="6">
          <span class="guia__tag" i18n="@@home.guia.freeTours.tag">Empieza por aquí</span>
          <h3 i18n="@@home.guia.freeTours.title">Free tours</h3>
          <p i18n="@@home.guia.freeTours.text">Reserva gratis y paga al final lo que quieras. La mejor forma de conocerme y de descubrir la ciudad.</p>
          <span class="guia__link" i18n="@@home.guia.freeTours.link">Ver free tours</span>
        </a>
        <a routerLink="/rutas" class="guia__card guia__card--priv corte" appReveal="up" [appRevealDelay]="0.12" appTilt [appTiltMax]="6">
          <span class="guia__tag" i18n="@@home.guia.rutas.tag">A tu medida</span>
          <h3 i18n="@@home.guia.rutas.title">Rutas privadas</h3>
          <p i18n="@@home.guia.rutas.text">Tu grupo, tu ritmo y una experiencia personalizada. Reserva directa, sin intermediarios.</p>
          <span class="guia__link" i18n="@@home.guia.rutas.link">Ver rutas privadas</span>
        </a>
      </div>
    </section>

    <!-- HISTORIA: un relato breve de la ciudad, no un itinerario lugar por
         lugar (eso ya vive en las tarjetas de "guia" y en el catálogo).
         Las fotos son vistas generales — skyline, bahía, atardecer desde
         Gibralfaro — no fachadas de monumentos concretos. Un único CTA al
         final, porque esto es una narrativa y no una lista de paradas.
         Sin la firma .corte a propósito: ya se usa en "guia" y en el hero;
         repetirla aquí la convertiría en un adorno en vez de una firma
         reconocible. -->
    <section class="container historia" aria-labelledby="historia-eyebrow">
      <p id="historia-eyebrow" class="eyebrow" i18n="@@home.historia.eyebrow">Antes de la ruta</p>
      <h2 class="historia__title" i18n="@@home.historia.title">Una ciudad fenicia, romana y andalusí antes de ser turística</h2>

      <div class="historia__grid">
        <div class="historia__texto" appReveal="right">
          <p i18n="@@home.historia.p1">
            Los fenicios fundaron Malaka en el siglo VIII antes de Cristo, junto a la
            desembocadura del Guadalmedina, como puesto comercial en la ruta del
            Mediterráneo. El nombre apenas ha cambiado en más de 2.700 años.
          </p>
          <p i18n="@@home.historia.p2">
            Con los romanos, la ciudad ganó estatus de municipio y un teatro que hoy
            sigue asomando a los pies de la Alcazaba. Restos de aquella época
            continúan apareciendo bajo el centro cada vez que se abre una zanja.
          </p>
          <p i18n="@@home.historia.p3">
            Durante casi 800 años formó parte de al-Ándalus. La Alcazaba, construida
            en el siglo XI, y el trazado estrecho del casco antiguo son la huella
            más visible de esa etapa, que terminó con la conquista de los Reyes
            Católicos en 1487.
          </p>
          <p i18n="@@home.historia.p4">
            En el siglo XIX vivió una revolución industrial impulsada por el
            comercio del vino y la industria del hierro. La nueva burguesía abrió
            la Calle Larios en 1891 como su gran bulevar, y en ese mismo ambiente
            nació Pablo Picasso en 1881, en una casa de la Plaza de la Merced.
          </p>
          <p i18n="@@home.historia.p5">
            Aquella Málaga industrial dio paso, ya en el siglo XX, a la que recibe
            hoy a millones de visitantes: puerta de la Costa del Sol, con un puerto
            renovado y un casco histórico que se recorre en una tarde. Es el
            resultado de todas las etapas anteriores, no solo de la última.
          </p>
        </div>

        <div class="historia__galeria" appReveal="left" appTilt [appTiltMax]="4">
          <img
            class="historia__img"
            src="https://picsum.photos/seed/malaga-gibralfaro-atardecer/800/600"
            alt="Vista de Málaga desde el mirador de Gibralfaro al atardecer"
            i18n-alt="@@home.historia.foto1.imgAlt"
            loading="lazy" width="800" height="600" />
          <img
            class="historia__img historia__img--offset"
            src="https://picsum.photos/seed/malaga-bahia-puerto-mar/800/600"
            alt="Bahía y puerto de Málaga desde el mar"
            i18n-alt="@@home.historia.foto2.imgAlt"
            loading="lazy" width="800" height="600" />
          <img
            class="historia__img"
            src="https://picsum.photos/seed/malaga-skyline-catedral-mediterraneo/800/600"
            alt="Skyline de Málaga con la Catedral y el Mediterráneo al fondo"
            i18n-alt="@@home.historia.foto3.imgAlt"
            loading="lazy" width="800" height="600" />
        </div>
      </div>

      <div class="historia__cta">
        <p i18n="@@home.historia.ctaLead">Esta es la Málaga que recorremos juntos, a pie y con guía local.</p>
        <div class="historia__ctaLinks">
          <a routerLink="/free-tours" class="historia__link" i18n="@@home.guia.freeTours.link">Ver free tours</a>
          <a routerLink="/rutas" class="historia__link" i18n="@@home.guia.rutas.link">Ver rutas privadas</a>
        </div>
      </div>
    </section>

    <!-- CATÁLOGO (AFILIACIÓN): secundario y compacto a propósito. Se lee como
         un índice, no como una vitrina — el negocio principal es free tours
         y rutas privadas, arriba. Numerado porque es el índice real del
         catálogo, igual que el menú "Catálogo" del header. -->
    <section class="container catalogo" aria-labelledby="catalogo-eyebrow">
      <p id="catalogo-eyebrow" class="eyebrow section-eyebrow" i18n="@@home.verticals.eyebrow">Para completar tu viaje</p>
      <ul class="catalogo__list">
        <li><a routerLink="/tours" routerLinkActive="active"><span class="catalogo__idx">01</span><span i18n="@@home.vertical.tours.title">Tours y experiencias</span></a></li>
        <li><a routerLink="/coches" routerLinkActive="active"><span class="catalogo__idx">02</span><span i18n="@@home.vertical.coches.title">Alquiler de coches</span></a></li>
        <li><a routerLink="/restaurantes" routerLinkActive="active"><span class="catalogo__idx">03</span><span i18n="@@home.vertical.restaurantes.title">Mejores restaurantes</span></a></li>
        <li><a routerLink="/ocio" routerLinkActive="active"><span class="catalogo__idx">04</span><span i18n="@@home.vertical.ocio.title">Ocio y planes</span></a></li>
        <li><a routerLink="/hoteles" routerLinkActive="active"><span class="catalogo__idx">05</span><span i18n="@@home.vertical.hoteles.title">Hoteles</span></a></li>
      </ul>
    </section>
  `,
  styles: [`
    /* HERO — audacia tipográfica reservada a esta sección. El texto manda
       (siempre primero en el DOM y en móvil); la foto/mapa es apoyo. */
    .hero { position: relative; overflow: hidden; padding: clamp(3rem, 8vw, 6rem) 0 clamp(2.5rem, 6vw, 4rem); }
    .hero__inner {
      position: relative; z-index: 2;
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(220px, 380px);
      gap: clamp(2rem, 5vw, 3.5rem);
      align-items: center;
    }
    .hero__copy { max-width: 46rem; }
    .hero__title { font-size: var(--step-5); margin: .3rem 0 1rem; }
    .hero__title em { font-style: normal; color: var(--mar); }
    .hero__lead { font-size: var(--step-1); color: var(--tinta-60); max-width: 44ch; }
    .hero__cta { display: flex; flex-wrap: wrap; gap: .8rem; margin-top: 1.8rem; }
    /* Dato real (ver GuiaBioComponent), trazo en buganvilla, sin color nuevo. */
    .hero__trust {
      display: flex; align-items: center; gap: .6rem;
      margin: 1.3rem 0 0;
      font-family: var(--mono); font-size: .72rem; letter-spacing: .06em;
      text-transform: uppercase; color: var(--tinta-60);
    }
    .hero__trust::before { content: ''; width: 1.4rem; height: 2px; background: var(--buganvilla); flex: none; }
    .hero__media {
      position: relative; align-self: stretch; aspect-ratio: 4 / 5;
      overflow: hidden; box-shadow: var(--sombra); margin: 0;
    }
    .hero__glow {
      position: absolute; z-index: 1; top: -30%; left: -12%;
      width: 46vw; height: 46vw; max-width: 560px; max-height: 560px;
      background: radial-gradient(circle, rgba(244,183,64,.32), transparent 60%);
      pointer-events: none;
    }

    /* Foto y mapa apilados en la misma caja. Sin JS se ve la foto: el mapa
       entra en juego cuando ngAfterViewInit liga su opacidad y el trazado
       de sus líneas al scroll (sin dasharray inline pinta la línea entera). */
    .hero__photo, .hero__map, .hero__markers { position: absolute; inset: 0; }
    .hero__photo, .hero__map { width: 100%; height: 100%; }
    .hero__photo { object-fit: cover; }
    .hero__map { opacity: 0; }
    .hero__mapLine { fill: none; stroke-linecap: round; stroke-linejoin: round; }
    .hero__mapLine--building { stroke: var(--mar); stroke-width: 3; }
    .hero__mapLine--route { stroke: var(--sol); stroke-width: 2.5; }
    .hero__mapLine--ground { stroke: var(--linea); stroke-width: 2; }

    /* Free tours y rutas privadas: mismo trato y misma altura sobre el
       mapa, sin un tercer marcador para el catálogo de afiliación. */
    .hero__marker {
      position: absolute; transform: translate(-50%, -50%) scale(.7);
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      gap: .35rem; min-height: 44px;
      text-decoration: none; color: var(--tinta); opacity: 0; visibility: hidden;
    }
    .hero__markerDot {
      width: 12px; height: 12px; border-radius: 50%;
      background: var(--sol); border: 2px solid var(--cal);
      box-shadow: var(--sombra); transition: transform .2s ease;
    }
    .hero__marker:is(:hover, :focus-visible) .hero__markerDot { transform: scale(1.2); }
    .hero__markerLabel {
      font: .66rem var(--mono); letter-spacing: .06em; text-transform: uppercase;
      white-space: nowrap; background: var(--cal); color: var(--tinta);
      padding: .25rem .55rem; border-radius: 999px;
    }

    /* Sin animación (sin JS o reduce-motion): estado final legible ya. */
    @media (prefers-reduced-motion: reduce) {
      .hero__photo { opacity: 0; }
      .hero__map { opacity: 1; }
      .hero__marker { opacity: 1; visibility: visible; transform: translate(-50%, -50%) scale(1); }
    }

    /* Entrada en cascada, una sola vez; reduce-motion ya se resuelve en
       styles.css (duración ~0, sin dejar nada oculto). */
    @keyframes hero-in { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
    .hero__copy > * { opacity: 0; animation: hero-in .6s ease forwards; }
    .hero__copy > .eyebrow { animation-delay: .05s; }
    .hero__copy > .hero__title { animation-delay: .16s; }
    .hero__copy > .hero__lead { animation-delay: .28s; }
    .hero__copy > .hero__cta { animation-delay: .4s; }
    .hero__copy > .hero__trust { animation-delay: .5s; }
    .hero__media { opacity: 0; animation: hero-in .7s ease .22s forwards; }

    @media (max-width: 720px) {
      .hero__inner { grid-template-columns: 1fr; }
      .hero__media { order: 2; aspect-ratio: 4 / 3; max-width: 26rem; margin-inline: auto; }
    }

    /* CATÁLOGO: franja compacta, deliberadamente secundaria. Se lee como un
       índice (numeración real de las 5 verticales), no como una vitrina de
       tarjetas — evita competir con la sección "guia" de arriba. */
    .catalogo__list {
      display: flex; flex-wrap: wrap; gap: 0; margin-top: 1.2rem;
      list-style: none; padding: 0;
      border-top: 1px solid var(--linea); border-bottom: 1px solid var(--linea);
    }
    .catalogo__list li { display: flex; }
    .catalogo__list a {
      display: flex; align-items: baseline; gap: .5rem;
      padding: .9rem 1.2rem .9rem 0; margin-right: 1.2rem;
      text-decoration: none; color: var(--tinta-60); font-size: var(--step--1);
      border-right: 1px solid var(--linea);
    }
    .catalogo__list li:last-child a { border-right: none; margin-right: 0; }
    .catalogo__list a:hover, .catalogo__list a:focus-visible, .catalogo__list a.active { color: var(--tinta); }
    .catalogo__list a.active .catalogo__idx { color: var(--mar); }
    .catalogo__idx {
      font-family: var(--mono); font-size: .74rem; font-weight: 700;
      letter-spacing: .04em; color: var(--tinta-60);
    }

    @media (max-width: 640px) {
      .catalogo__list { flex-direction: column; }
      .catalogo__list a { width: 100%; border-right: none; margin-right: 0; padding: .9rem 0; }
      .catalogo__list li:not(:last-child) a { border-bottom: 1px solid var(--linea); }
    }

    /* Con guía local — las tarjetas llevan la firma de marca (.corte).
       Free tours y rutas privadas quedan al mismo nivel visual a propósito:
       son dos puertas de entrada equivalentes, no una oferta y un extra. */
    .guia { margin-top: var(--space-section); }
    .guia__title { font-size: var(--step-2); margin: 0 0 1.4rem; }
    .guia__cards { display: grid; grid-template-columns: 1fr 1fr; gap: 1.2rem; }
    .guia__card {
      display: flex; flex-direction: column; gap: .5rem; padding: 1.8rem 1.8rem 2.2rem;
      text-decoration: none; color: var(--tinta); background: #fff; border: 1px solid var(--linea);
      transition: box-shadow .18s ease;
      /* La rotación 3D la aporta [appTilt] (perspective+rotateX/rotateY inline);
         aquí solo se resuelve el realce de sombra al hover. */
    }
    .guia__card:hover, .guia__card:focus-visible { box-shadow: var(--sombra-sol); }
    .guia__tag { font-family: var(--mono); font-size: .68rem; letter-spacing: .12em; text-transform: uppercase; color: var(--mar-claro); }
    .guia__card h3 { font-size: var(--step-2); margin: .1rem 0 .1rem; }
    .guia__card p { margin: 0; font-size: var(--step--1); flex: 1; }
    .guia__link { font-weight: 600; font-size: var(--step--1); border-bottom: 2px solid var(--sol); align-self: flex-start; padding-bottom: 1px; margin-top: .4rem; }
    .section-eyebrow { margin-top: var(--space-section); }
    @media (max-width: 640px) { .guia__cards { grid-template-columns: 1fr; } }

    /* HISTORIA: relato general de la ciudad + vistas panorámicas, no un
       itinerario. El texto va a la izquierda; las fotos, en columna a la
       derecha, con la del medio ligeramente desplazada — una única cesura
       de ritmo, sin numerar (aquí no hay un orden que seguir a pie).
       Cierra con un único CTA compartido, no uno por foto. */
    .historia { margin-top: var(--space-section); }
    .historia__title { font-size: var(--step-2); margin: 0 0 2rem; max-width: 30ch; }
    .historia__grid {
      display: grid;
      grid-template-columns: 1.3fr 1fr;
      gap: clamp(2rem, 5vw, 4rem);
      align-items: start;
    }
    .historia__texto { display: flex; flex-direction: column; gap: 1.1rem; max-width: 62ch; }
    .historia__texto p { margin: 0; color: var(--tinta-60); font-size: var(--step-0); }
    /* Fotos apiladas en el espacio (profundidad 3D fija) + appTilt añade una
       leve inclinación de grupo que sigue al puntero. */
    .historia__galeria { display: flex; flex-direction: column; gap: 1.4rem; perspective: 1400px; }
    .historia__img {
      width: 100%; aspect-ratio: 4 / 3; object-fit: cover;
      border-radius: var(--radio);
      box-shadow: var(--sombra);
      transition: transform .35s ease;
      transform: rotateY(-3deg) translateZ(0);
    }
    .historia__img:hover { transform: rotateY(-3deg) translateZ(0) scale(1.02); }
    .historia__img--offset {
      margin-inline-start: clamp(1rem, 6vw, 3rem);
      transform: rotateY(3deg) translateZ(36px) scale(1.04);
      box-shadow: var(--sombra-sol);
    }
    .historia__img--offset:hover { transform: rotateY(3deg) translateZ(36px) scale(1.07); }

    .historia__cta {
      margin-top: var(--space-section);
      padding-top: 2rem;
      border-top: 1px solid var(--linea);
      display: flex; flex-wrap: wrap; align-items: baseline; justify-content: space-between; gap: 1.2rem;
    }
    .historia__cta p { margin: 0; font-family: var(--display); font-weight: 700; font-size: var(--step-1); max-width: 34ch; color: var(--tinta); }
    .historia__ctaLinks { display: flex; flex-wrap: wrap; gap: 1.4rem; }
    .historia__link {
      font-weight: 600; font-size: var(--step--1); color: var(--mar);
      text-decoration: none; border-bottom: 2px solid var(--sol); padding-bottom: 1px;
      white-space: nowrap;
    }
    .historia__link:hover, .historia__link:focus-visible { color: var(--mar-claro); }

    @media (max-width: 780px) {
      .historia__grid { grid-template-columns: 1fr; }
      .historia__img--offset { margin-inline-start: 0; }
    }
    @media (max-width: 640px) {
      .historia__cta { flex-direction: column; align-items: flex-start; }
    }
  `],
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly seo = inject(SeoService);
  private readonly platformId = inject(PLATFORM_ID);

  @ViewChild('heroSection') private heroSection?: ElementRef<HTMLElement>;
  @ViewChildren('mapPath') private mapPaths?: QueryList<ElementRef<SVGGeometryElement>>;
  @ViewChild('markerFree') private markerFree?: ElementRef<HTMLElement>;
  @ViewChild('markerRutas') private markerRutas?: ElementRef<HTMLElement>;

  private heroScrollTrigger?: ScrollTrigger;

  ngOnInit(): void {
    this.seo.update({
      title: 'Tours, coches, restaurantes y ocio en Málaga',
      description:
        'Descubre Málaga con las mejores experiencias: tours guiados, alquiler de coches, restaurantes y planes de ocio, reservados con plataformas de confianza.',
      path: '/',
      image: 'https://picsum.photos/seed/malaga-soho-alcazaba-luz-dorada/900/1125',
    });
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    // Con "reduce motion" el estado final ya lo resuelve la media query en
    // los estilos de este componente — no hace falta orquestar nada por JS.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const heroEl = this.heroSection?.nativeElement;
    const paths = this.mapPaths?.toArray().map((ref) => ref.nativeElement) ?? [];
    const markerFreeEl = this.markerFree?.nativeElement;
    const markerRutasEl = this.markerRutas?.nativeElement;
    const [ground, route, alcazaba, catedral, farola] = paths;
    if (!heroEl || paths.length < 5 || !markerFreeEl || !markerRutasEl) return;

    gsap.registerPlugin(ScrollTrigger);

    // Técnica estándar de "dibujado" sin DrawSVGPlugin: se oculta cada línea
    // tras su propia longitud (stroke-dasharray/-dashoffset) y se anima el
    // offset a 0. Sin esto, el navegador ya pinta la línea completa (así
    // degrada sin JS, ver media query prefers-reduced-motion).
    for (const path of paths) {
      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroEl,
        // 68px: alto fijo de .site-header (sticky), para que no tape el
        // hero pineado mientras dura el efecto.
        start: 'top 68px',
        end: '+=100%',
        scrub: 0.5,
        pin: true,
      },
    });

    tl.to(heroEl.querySelector('.hero__photo'), { opacity: 0, ease: 'none' }, 0)
      .to(heroEl.querySelector('.hero__map'), { opacity: 1, ease: 'none' }, 0)
      .to(ground, { strokeDashoffset: 0, duration: 0.15, ease: 'none' }, 0)
      .to(route, { strokeDashoffset: 0, duration: 0.35, ease: 'none' }, 0.1)
      .to(alcazaba, { strokeDashoffset: 0, duration: 0.25, ease: 'none' }, 0.35)
      .to(catedral, { strokeDashoffset: 0, duration: 0.25, ease: 'none' }, 0.5)
      .to(farola, { strokeDashoffset: 0, duration: 0.25, ease: 'none' }, 0.65)
      .fromTo(markerFreeEl, { autoAlpha: 0, scale: 0.7 }, { autoAlpha: 1, scale: 1, duration: 0.15, ease: 'none' }, 0.8)
      .fromTo(markerRutasEl, { autoAlpha: 0, scale: 0.7 }, { autoAlpha: 1, scale: 1, duration: 0.15, ease: 'none' }, 0.88);

    this.heroScrollTrigger = tl.scrollTrigger;
  }

  ngOnDestroy(): void {
    this.heroScrollTrigger?.kill();
  }
}
