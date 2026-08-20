# CLAUDE.md

Guía de contexto para Claude Code. Léela antes de trabajar en este repo.

## Qué es

Meet Málaga: portal turístico de Málaga en **Angular 17 + SSR (prerender)**.
Recomienda tours, alquiler de coches, restaurantes y ocio, y monetiza con
**enlaces de afiliado**. El sitio NO procesa pagos ni reservas: redirige al
proveedor (Civitatis, DiscoverCars, TheFork…), que cobra y paga la comisión.

## Comandos

```bash
npm install
npm start                       # dev: http://localhost:4200
npm run build                   # producción SSR + prerender (ejecuta el sitemap antes)
npm run serve:ssr:meetmalaga    # sirve la build SSR: http://localhost:4000
npm run sitemap                 # genera src/sitemap.xml y src/robots.txt
```

Node 22 (ver `.nvmrc`). Tras cambios que afecten al render, ejecuta `npm run build`
y confirma que compila y prerenderiza las 9 rutas.

## Arquitectura

```
src/app/
  core/         lógica sin UI
    models/     Offer, Vertical, AffiliateProvider
    data/       catálogo por vertical (*.data.ts)
    services/   AffiliateService, CatalogService, SeoService, AnalyticsService
  shared/components/  OfferCard, Header, Footer, CookieBanner
  features/     home, vertical (plantilla común de las 4 verticales), legal, not-found
src/environments/   IDs de afiliado y siteUrl (prod / dev)
scripts/generate-sitemap.mjs   sitemap + robots (corre en cada build)
server.ts     servidor SSR (Express)
```

Piezas clave:
- **AffiliateService**: toma la `providerUrl` limpia y le inyecta tu ID de afiliado
  (parámetro por proveedor en `PROVIDER_PARAM`). Es el núcleo del negocio.
- **CatalogService**: fuente única del catálogo (hoy arrays locales; migrable a CMS
  cambiando solo sus métodos).
- **SeoService**: title, description, Open Graph y canonical por página.
- **VerticalPageComponent**: una sola plantilla para tours/coches/restaurantes/ocio;
  su copy llega desde `data.config` en `app.routes.ts`.

## Convenciones

- **Componentes standalone**, sin NgModules. Rutas con `loadComponent` (lazy).
- **Todo debe ser SSR-safe**: cualquier acceso a `window`/`document`/`localStorage`
  va detrás de `isPlatformBrowser(this.platformId)`.
- Estilos con las variables CSS de `src/styles.css` (paleta y tipografía). No
  hardcodees colores.
- Español en la UI y en el contenido.
- Formato de precios: "18 €"; decimales con coma ("4,8").

## Reglas que no se deben romper

- **Enlaces de afiliado**: mantener `rel="sponsored noopener"`. Nunca quitarlo.
- **Rutas nuevas**: añadirlas también al array `ROUTES` de
  `scripts/generate-sitemap.mjs`, o quedan fuera del sitemap.
- **IDs de afiliado y `siteUrl`**: viven en `src/environments/environment.ts`.
  No hardcodear en componentes.
- **No commitear**: `node_modules/`, `dist/`, `.angular/`, `src/sitemap.xml`,
  `src/robots.txt` (ya en `.gitignore`).
- **No inventar datos** de valoraciones, reseñas o precios que no estén en el
  contenido real (importa para el SEO y para el marcado JSON-LD).
- El inlining de fuentes está desactivado a propósito en `angular.json` (build sin
  dependencia de red); las fuentes se cargan por `<link>` en `index.html`.

## Tres capas de producto (importante)

El negocio tiene tres cosas distintas; no las mezcles:

1. **Free tours** (`/free-tours`): tours gratuitos (con propina) publicados en
   Freetour y GuruWalk. Es la principal fuente de clientes. Modelo `FreeTour`
   (`core/models/free-tour.model.ts`), datos en `core/data/free-tours.data.ts`.
   La reserva se hace en la plataforma externa: solo enlazamos (`freetourUrl`,
   `guruwalkUrl`). No hay cobro ni afiliación.
2. **Rutas privadas** (`/rutas`): tours privados que guía el dueño. Modelo `Ruta`.
   Reserva propia por WhatsApp; cobro por Stripe/PayPal o Bizum/transferencia.
   Incluye un **calendario de disponibilidad** (`shared/components/calendario`)
   que deriva el estado de cada día de `core/data/disponibilidad.data.ts`
   (reglas semanales evergreen + excepciones por fecha). Es `ngSkipHydration`
   porque depende de la fecha actual.
3. **Afiliación** (tours/coches/restaurantes/ocio/hoteles): producto de terceros.
   Modelo `Offer`, solo enlace con `rel="sponsored"`. No se cobra aquí.

Embudo: el free tour capta, la ruta privada monetiza, la afiliación redondea.

## Añadir contenido

- **Un free tour**: nuevo objeto en `core/data/free-tours.data.ts`.
- **Una ruta privada**: nuevo objeto en `core/data/rutas.data.ts`.
- **Disponibilidad del calendario**: edita `core/data/disponibilidad.data.ts`
  (reglas semanales + fechas de excepción). Los `rutaId` deben existir en rutas.
- **Una oferta de afiliación**: nuevo objeto en el `*.data.ts` de su vertical.
- **Una vertical nueva**: ver `docs/CONTENIDO.md` (tipo `Vertical`, nuevo data,
  registrarla en `CatalogService`, ruta en `app.routes.ts`, enlaces en header/home
  y añadir al sitemap).

## Documentación y agentes

- Docs detalladas en `docs/` (ARQUITECTURA, AFILIADOS, CONTENIDO, DESPLIEGUE, LEGAL).
- Agente de SEO disponible en `.claude/agents/seo.md` para auditar y mejorar el SEO.
