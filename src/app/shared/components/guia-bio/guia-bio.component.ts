import { Component } from '@angular/core';

@Component({
  selector: 'app-guia-bio',
  standalone: true,
  template: `
    <section class="container guia-bio">
      <div class="guia-bio__photo" aria-hidden="true">
        <span>S</span>
      </div>
      <div class="guia-bio__body">
        <p class="eyebrow" i18n="@@guiaBio.eyebrow">Quién te enseña Málaga</p>
        <h2 class="guia-bio__name">Samuel</h2>
        <p class="guia-bio__text" i18n="@@guiaBio.text">
          Soy Samuel. Nací en Málaga y viví seis años en Inglaterra, así que sé
          bien lo que es llegar a una ciudad sin conocer a nadie ni saber por
          dónde empezar. Volví para estudiar Turismo y dedicarme a esto: enseñar
          mi ciudad como me habría gustado que me la enseñaran a mí. Preparo
          cada ruta a mano, sin prisa, contando lo que de verdad merece la pena
          y callándome lo que no. Que te vayas sintiendo que conociste Málaga,
          no que la viste desde fuera.
        </p>
        <ul class="guia-bio__tags">
          <li i18n="@@guiaBio.tag.malagueno">Malagueño</li>
          <li i18n="@@guiaBio.tag.reinoUnido">6 años en Reino Unido</li>
          <li i18n="@@guiaBio.tag.turismo">Titulado en Turismo</li>
          <li i18n="@@guiaBio.tag.idiomas">Español · Inglés</li>
        </ul>
      </div>
    </section>
  `,
  styles: [`
    .guia-bio {
      display: flex;
      align-items: flex-start;
      gap: clamp(1.6rem, 4vw, 3rem);
      padding: clamp(2.2rem, 5vw, 3.5rem) 0;
    }
    .guia-bio__photo {
      flex: none;
      width: clamp(96px, 14vw, 148px);
      height: clamp(96px, 14vw, 148px);
      border-radius: 50%;
      background: var(--mar);
      display: grid;
      place-items: center;
    }
    .guia-bio__photo span {
      font-family: var(--display);
      font-weight: 900;
      font-size: clamp(2.4rem, 5vw, 3.6rem);
      color: var(--cal);
    }
    .guia-bio__body { max-width: 60ch; }
    .guia-bio__name { font-size: var(--step-3); margin: 0 0 .8rem; }
    .guia-bio__text { margin: 0 0 1.2rem; color: var(--tinta-60); font-size: var(--step-0); }
    .guia-bio__tags {
      display: flex; flex-wrap: wrap; gap: .6rem;
      margin: 0; padding: 0; list-style: none;
    }
    .guia-bio__tags li {
      font-family: var(--mono); font-size: .7rem; letter-spacing: .06em;
      text-transform: uppercase; color: var(--mar);
      border: 1px solid var(--linea); border-radius: 999px;
      padding: .35rem .8rem;
    }
    @media (max-width: 640px) {
      .guia-bio { flex-direction: column; align-items: flex-start; }
    }
  `],
})
export class GuiaBioComponent {}
