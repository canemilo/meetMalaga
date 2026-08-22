import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SeoService } from '../../core/services/seo.service';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RevealDirective],
  template: `
    <!-- HERO: columna de texto (mensaje + CTA, lo que manda) y una única
         foto con la firma .corte (lo que ya anticipaba el comentario de esa
         clase en styles.css) como apoyo, no protagonista. Sin foto de postal
         genérica: el seed/alt describen la composición real que debe ir aquí
         — Soho urbano fundiéndose con Alcazaba/Catedral, luz de atardecer,
         gente en la calle — a la espera de que Samuel ponga su propia foto,
         igual que el resto del catálogo y de "historia". -->
    <section class="hero">
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
        <div class="hero__media corte">
          <img
            src="https://picsum.photos/seed/malaga-soho-alcazaba-luz-dorada/900/1125"
            alt="Mural de arte urbano del Soho de Málaga fundiéndose con la Alcazaba y la Catedral al fondo, luz dorada de atardecer y gente paseando junto al mar"
            i18n-alt="@@home.hero.imgAlt"
            fetchpriority="high" width="900" height="1125" />
        </div>
      </div>
      <div class="hero__glow" aria-hidden="true"></div>
    </section>

    <!-- LO QUE OFREZCO YO -->
    <section class="container guia">
      <p class="eyebrow" i18n="@@home.guia.eyebrow">Conmigo, guía local</p>
      <h2 class="guia__title" i18n="@@home.guia.title2">Dos formas de recorrer Málaga conmigo</h2>
      <div class="guia__cards">
        <a routerLink="/free-tours" class="guia__card guia__card--free corte" appReveal="up">
          <span class="guia__tag" i18n="@@home.guia.freeTours.tag">Empieza por aquí</span>
          <h3 i18n="@@home.guia.freeTours.title">Free tours</h3>
          <p i18n="@@home.guia.freeTours.text">Reserva gratis y paga al final lo que quieras. La mejor forma de conocerme y de descubrir la ciudad.</p>
          <span class="guia__link" i18n="@@home.guia.freeTours.link">Ver free tours</span>
        </a>
        <a routerLink="/rutas" class="guia__card guia__card--priv corte" appReveal="up" [appRevealDelay]="0.12">
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

        <div class="historia__galeria" appReveal="left">
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
    /* HERO — la audacia tipográfica se gasta aquí y solo aquí. Dos columnas:
       el texto manda (ratio mayor, siempre primero en el DOM y en móvil);
       la foto es apoyo, con la misma firma .corte que las tarjetas — no una
       foto de fondo a sangre con degradado, que es la solución de plantilla
       que cualquier web turística ya usa. */
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
    /* Elemento de confianza: dato real (ver GuiaBioComponent), no un sello
       inventado de "guías oficiales". El trazo usa la buganvilla — el
       acento vibrante que ya tiene el sistema, sin sumar un color nuevo. */
    .hero__trust {
      display: flex; align-items: center; gap: .6rem;
      margin: 1.3rem 0 0;
      font-family: var(--mono); font-size: .72rem; letter-spacing: .06em;
      text-transform: uppercase; color: var(--tinta-60);
    }
    .hero__trust::before { content: ''; width: 1.4rem; height: 2px; background: var(--buganvilla); flex: none; }
    .hero__media { align-self: stretch; aspect-ratio: 4 / 5; overflow: hidden; box-shadow: var(--sombra); }
    .hero__media img { width: 100%; height: 100%; object-fit: cover; }
    .hero__glow {
      position: absolute; z-index: 1; top: -30%; left: -12%;
      width: 46vw; height: 46vw; max-width: 560px; max-height: 560px;
      background: radial-gradient(circle, rgba(244,183,64,.32), transparent 60%);
      pointer-events: none;
    }

    /* Entrada orquestada, una sola vez: la columna de texto se revela en
       cascada y la foto la sigue. Nada de scroll-reveal disperso en el
       resto de la página — la audacia de movimiento se gasta aquí.
       prefers-reduced-motion ya se resuelve de forma global en styles.css
       (acorta la duración a ~0, sin dejar nada oculto). */
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
    .guia__card { display: flex; flex-direction: column; gap: .5rem; padding: 1.8rem 1.8rem 2.2rem; text-decoration: none; color: var(--tinta); background: #fff; border: 1px solid var(--linea); transition: transform .18s ease, box-shadow .18s ease; }
    .guia__card:hover, .guia__card:focus-visible { transform: translateY(-4px); box-shadow: var(--sombra-sol); }
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
    .historia__galeria { display: flex; flex-direction: column; gap: 1.4rem; }
    .historia__img {
      width: 100%; aspect-ratio: 4 / 3; object-fit: cover;
      border-radius: var(--radio);
      box-shadow: var(--sombra);
      transition: transform .35s ease;
    }
    .historia__img:hover { transform: scale(1.02); }
    .historia__img--offset { margin-inline-start: clamp(1rem, 6vw, 3rem); }

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
export class HomeComponent implements OnInit {
  private readonly seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.update({
      title: 'Tours, coches, restaurantes y ocio en Málaga',
      description:
        'Descubre Málaga con las mejores experiencias: tours guiados, alquiler de coches, restaurantes y planes de ocio, reservados con plataformas de confianza.',
      path: '/',
      image: 'https://picsum.photos/seed/malaga-soho-alcazaba-luz-dorada/900/1125',
    });
  }
}
