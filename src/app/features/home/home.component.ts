import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <!-- HERO -->
    <section class="hero">
      <div class="container hero__inner">
        <p class="eyebrow" i18n="@@home.hero.eyebrow">Costa del Sol · Andalucía</p>
        <h1 class="hero__title" i18n="@@home.hero.title2">
          Un guía de aquí<br />para <em>Málaga</em>.
        </h1>
        <p class="hero__lead" i18n="@@home.hero.lead2">
          Empieza con un free tour por el centro o resérvame una ruta privada
          a tu ritmo. Si quieres completar el viaje, también comparo tours,
          coches, restaurantes, ocio y hoteles de confianza.
        </p>
        <div class="hero__cta">
          <a routerLink="/free-tours" class="btn btn--sol" i18n="@@home.hero.ctaFreeTours">Free tours por Málaga</a>
          <a routerLink="/rutas" class="btn btn--primary" i18n="@@home.hero.ctaRutas">Rutas privadas</a>
        </div>
      </div>
      <div class="hero__glow" aria-hidden="true"></div>
    </section>

    <!-- LO QUE OFREZCO YO -->
    <section class="container guia">
      <p class="eyebrow" i18n="@@home.guia.eyebrow">Conmigo, guía local</p>
      <h2 class="guia__title" i18n="@@home.guia.title2">Dos formas de recorrer Málaga conmigo</h2>
      <div class="guia__cards">
        <a routerLink="/free-tours" class="guia__card guia__card--free corte">
          <span class="guia__tag" i18n="@@home.guia.freeTours.tag">Empieza por aquí</span>
          <h3 i18n="@@home.guia.freeTours.title">Free tours</h3>
          <p i18n="@@home.guia.freeTours.text">Reserva gratis y paga al final lo que quieras. La mejor forma de conocerme y de descubrir la ciudad.</p>
          <span class="guia__link" i18n="@@home.guia.freeTours.link">Ver free tours</span>
        </a>
        <a routerLink="/rutas" class="guia__card guia__card--priv corte">
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
        <div class="historia__texto">
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

        <div class="historia__galeria">
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
    /* HERO — la audacia tipográfica se gasta aquí y solo aquí */
    .hero { position: relative; overflow: hidden; padding: clamp(3rem, 8vw, 6rem) 0 clamp(2.5rem, 6vw, 4rem); }
    .hero__inner { position: relative; z-index: 2; max-width: 46rem; }
    .hero__title { font-size: var(--step-5); margin: .3rem 0 1rem; }
    .hero__title em { font-style: normal; color: var(--mar); }
    .hero__lead { font-size: var(--step-1); color: var(--tinta-60); max-width: 44ch; }
    .hero__cta { display: flex; flex-wrap: wrap; gap: .8rem; margin-top: 1.8rem; }
    .hero__glow {
      position: absolute; z-index: 1; top: -30%; right: -10%;
      width: 60vw; height: 60vw; max-width: 720px; max-height: 720px;
      background: radial-gradient(circle, rgba(244,183,64,.35), transparent 60%);
      pointer-events: none;
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
      image: 'https://picsum.photos/seed/malaga-gibralfaro-atardecer/800/600',
    });
  }
}
