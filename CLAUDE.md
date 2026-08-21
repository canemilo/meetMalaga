# CLAUDE.md

Guía de contexto para Claude Code. Léela antes de trabajar en este repo.

## Qué es

Meet Málaga: portal turístico de Málaga en **Angular 17 + SSR (prerender)**,
guiado por Samuel (guía local). Su fuente de ingresos real son los **free
tours** y las **rutas privadas**; además recomienda tours, coches,
restaurantes, ocio y hoteles de terceros y monetiza esos con **enlaces de
afiliado**. El sitio NO procesa pagos de afiliación ni reservas de terceros:
redirige al proveedor (Civitatis, DiscoverCars, TheFork…), que cobra y paga
la comisión. La jerarquía visual (header y home) refleja esto a propósito:
free tours/rutas primero y destacados, afiliación agrupada y secundaria —
ver "Tres capas de producto".

## Comandos

```bash
npm install
npm start                       # dev: http://localhost:4200 (solo español)
npm run build                   # producción SSR + prerender, 4 idiomas (ejecuta el sitemap antes)
npm run serve:ssr:meetmalaga    # sirve la build SSR (los 4 idiomas): http://localhost:4000
npm run sitemap                 # genera src/sitemap.xml y src/robots.txt
```

Node 22 (ver `.nvmrc`). Tras cambios que afecten al render, ejecuta `npm run build`
y confirma que compila y prerenderiza las **48 rutas** (12 páginas × 4 idiomas:
es/en/fr/de — ver sección "Multiidioma" más abajo).

## Arquitectura

```
src/app/
  core/         lógica sin UI
    models/     Offer, Vertical, AffiliateProvider, Ruta, FreeTour
    data/       catálogo por vertical (*.data.ts) — texto envuelto en $localize
    services/   AffiliateService, CatalogService, SeoService, AnalyticsService
  shared/components/  OfferCard, Header, Footer, CookieBanner, GuiaBio, Calendario
  features/     home, vertical (plantilla común de las 5 verticales), free-tours,
                rutas, legal, not-found
src/environments/   IDs de afiliado y siteUrl (prod / dev)
src/locale/   messages.xlf (fuente es) + messages.{en,fr,de}.xlf (traducciones)
scripts/generate-sitemap.mjs   sitemap + robots multiidioma (corre en cada build)
server.ts             servidor SSR Angular (Express) — se compila 1 vez por idioma
server-gateway.mjs     pasarela que monta los 4 servidores SSR bajo /es /en /fr /de
```

Piezas clave:
- **AffiliateService**: toma la `providerUrl` limpia y le inyecta tu ID de afiliado
  (parámetro por proveedor en `PROVIDER_PARAM`). Es el núcleo del negocio.
- **CatalogService**: fuente única del catálogo (hoy arrays locales; migrable a CMS
  cambiando solo sus métodos).
- **SeoService**: title, description, Open Graph, canonical y `hreflang`/`og:locale`
  por página (los `<link>` de canonical/hreflang se insertan a mano en el DOM —
  `Meta.updateTag` de Angular solo gestiona `<meta>`, no `<link>`, no lo uses para eso).
- **VerticalPageComponent**: una sola plantilla para tours/coches/restaurantes/ocio/
  hoteles; su copy llega desde `data.config` en `app.routes.ts` (envuelto en `$localize`).
- **GuiaBioComponent** (`shared/components/guia-bio`): bio de Samuel (el guía), hoy
  solo se usa en `/rutas`.
- **HeaderComponent**: nav en dos niveles a propósito. `.nav__primary` (Free tours,
  Rutas privadas) son botones `.btn`, mismo tratamiento que el CTA del hero — es lo
  principal. Las 5 verticales de afiliación viven agrupadas en `.nav__catalog`, un
  `<details>/<summary>` nativo (accesible por teclado sin JS de apertura/cierre) con
  el rótulo "Catálogo" — secundario pero a un clic, en toda página. Si añades un
  enlace de nav nuevo, decide primero a qué grupo pertenece.
- **Home ya NO tiene** sección de "Destacados" (ofertas de afiliación en portada) —
  se quitó a propósito para no competir con free tours/rutas. No la reintroduzcas
  sin que te lo pidan. En su lugar hay una sección **"historia"** (`home.historia.*`,
  entre "guía local" y el catálogo de verticales): una narrativa breve y real de la
  historia de Málaga como ciudad (fenicia → romana → andalusí → industrial s. XIX →
  turística), NO un listado de paradas concretas — eso ya se probó y se sustituyó a
  propósito por esto. 3 fotos placeholder de vistas generales de la ciudad (no de
  monumentos), `picsum.photos/seed/<slug>`, a la espera de fotos reales del dueño.
  Cierra con un único CTA a `/free-tours` y `/rutas` (reutiliza los ids
  `home.guia.freeTours.link`/`home.guia.rutas.link`, no crees botones nuevos para
  eso). No inventes cifras, citas ni datos históricos que no sean verificables.
- Las dos tarjetas de "guía local" (Free tours / Rutas privadas) usan **el mismo
  tratamiento visual** (fondo blanco, mismo borde/hover) — no le devuelvas a la de
  Free tours un fondo de color aparte sin que te lo pidan, fue un cambio explícito.

## Convenciones

- **Componentes standalone**, sin NgModules. Rutas con `loadComponent` (lazy).
- **Todo debe ser SSR-safe**: cualquier acceso a `window`/`document`/`localStorage`
  va detrás de `isPlatformBrowser(this.platformId)`.
- Estilos con las variables CSS de `src/styles.css` (paleta y tipografía). No
  hardcodees colores.
- Español en la UI y en el contenido (es el idioma **fuente**; ver "Multiidioma").
- Formato de precios: "18 €"; decimales con coma ("4,8").
- **Todo texto visible nuevo o modificado debe marcarse para traducción**:
  `i18n="@@id.estable"` en templates (o `i18n-<attr>` en atributos estáticos),
  `$localize`:@@id.estable:Texto`` en TypeScript (rutas, `Record<string,string>`,
  datos de catálogo). Ver "Multiidioma" antes de tocar copy.

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
- **Ids de `$localize`/`i18n` estables**: siempre `:@@id:` explícito, nunca dejar que
  Angular autogenere el id por hash (se rompe con cualquier reformateo). Si borras
  contenido con id propio, borra también su `<trans-unit>` en los 4 XLIFF o quedará
  huérfano (no rompe el build, pero ensucia las traducciones).
- **Mensaje de WhatsApp precargado** (`rutas.component.ts`, `calendario.component.ts`):
  NO usa `$localize` a propósito — es un `if (locale === 'es') / else` con dos
  literales fijos (español / inglés), porque Samuel solo lee esos dos idiomas. No lo
  traduzcas a fr/de aunque el resto de la página sí esté en esos idiomas.
- **Nunca ejecutes `git checkout`/`reset`/`clean` sobre `src/locale/*.xlf`** (ni sobre
  ningún archivo) para "deshacer" cambios de `ng extract-i18n` u otra herramienta:
  esos archivos casi siempre tienen traducciones sin commitear a medio hacer, de esta
  sesión o de otra en paralelo, y un `checkout` las descarta sin aviso y sin
  posibilidad de recuperarlas (ya pasó una vez). Si `messages.{en,fr,de}.xlf` quedan
  desincronizados de `messages.xlf` tras un cambio, la solución es **añadir/editar**
  los `<trans-unit>` que faltan o sobran a mano (o con un script propio), nunca
  revertir el archivo entero.

## Tres capas de producto (importante)

El negocio tiene tres cosas distintas; no las mezcles:

1. **Free tours** (`/free-tours`): tours gratuitos (con propina) publicados en
   Freetour y GuruWalk. Es la principal fuente de clientes. Modelo `FreeTour`
   (`core/models/free-tour.model.ts`), datos en `core/data/free-tours.data.ts`.
   La reserva se hace en la plataforma externa: solo enlazamos (`freetourUrl`,
   `guruwalkUrl`). No hay cobro ni afiliación.
2. **Rutas privadas** (`/rutas`): tours privados que guía el dueño. Modelo `Ruta`.
   Reserva propia por WhatsApp; cobro por Bizum, PayPal o efectivo.
   Incluye un **calendario de disponibilidad** (`shared/components/calendario`)
   que deriva el estado de cada día de `core/data/disponibilidad.data.ts`
   (reglas semanales evergreen + excepciones por fecha). Es `ngSkipHydration`
   porque depende de la fecha actual.
3. **Afiliación** (tours/coches/restaurantes/ocio/hoteles): producto de terceros.
   Modelo `Offer`, solo enlace con `rel="sponsored"`. No se cobra aquí.

Embudo: el free tour capta, la ruta privada monetiza, la afiliación redondea.
Esto ya no es solo conceptual: la home (`home.component.ts`) y el header
(`header.component.ts`) están diseñados para reflejarlo — free tours y rutas
privadas primero y con más peso visual, afiliación agrupada y secundaria (ver
"HeaderComponent" en Piezas clave). Si añades contenido o secciones nuevas,
mantén ese orden de prioridad; no le devuelvas a afiliación el mismo peso que
free tours/rutas sin que te lo pidan explícitamente.

## Añadir contenido

- **Un free tour**: nuevo objeto en `core/data/free-tours.data.ts`, campos de texto
  envueltos en `$localize` (id `@@freetour.<id>.<campo>`) + traducir en los 3 XLIFF.
- **Una ruta privada**: nuevo objeto en `core/data/rutas.data.ts`, mismo patrón con
  prefijo `@@ruta.<id>.<campo>`.
- **Disponibilidad del calendario**: edita `core/data/disponibilidad.data.ts`
  (reglas semanales + fechas de excepción). Los `rutaId` deben existir en rutas.
- **Una oferta de afiliación**: nuevo objeto en el `*.data.ts` de su vertical, mismo
  patrón con prefijo `@@offer.<id>.<campo>`.
- **Una vertical nueva**: ver `docs/CONTENIDO.md` (tipo `Vertical`, nuevo data,
  registrarla en `CatalogService`, ruta en `app.routes.ts`, enlaces en header/home
  y añadir al sitemap — el script ya multiplica por los 4 idiomas automáticamente).

## Multiidioma (ES/EN/FR/DE)

Angular i18n **nativo** (build-time, no una librería runtime). Español es el idioma
fuente y vive en la raíz sin prefijo (preserva las URLs ya indexadas); inglés,
francés y alemán van bajo `/en`, `/fr`, `/de`. Las rutas (slugs) NO se traducen,
solo llevan el prefijo de idioma — `/en/coches`, no `/en/cars`.

- **Un solo `npm run build`** genera los 4 idiomas a la vez (`"localize": true` en
  `angular.json`), en `dist/meetmalaga/browser/{es,en,fr,de}/` y
  `dist/meetmalaga/server/{es,en,fr,de}/` — 48 páginas prerenderizadas.
- **`server-gateway.mjs`** (raíz del repo, fuera del build de Angular) es lo que hay
  que ejecutar en producción — monta los 4 servidores SSR ya compilados bajo su
  prefijo. `server.ts` (el que sí compila Angular) detecta su propio idioma por el
  nombre de su carpeta de salida; no lo ejecutes suelto en producción salvo para un
  único idioma de prueba.
- **Traducciones** en `src/locale/`: `messages.xlf` es la fuente (español, se
  regenera con `npx ng extract-i18n --output-path src/locale`), y
  `messages.en.xlf` / `messages.fr.xlf` / `messages.de.xlf` llevan la traducción en
  cada `<target>`. Al añadir texto nuevo: extrae, localiza los `<trans-unit>` nuevos
  (sin `<target>` en los 3 archivos de traducción) y tradúcelos ahí — sin traducción,
  el build no falla (usa el texto fuente como fallback con un warning), pero la
  página queda a medio traducir.
- **`SeoService`** añade `hreflang` (4 idiomas + `x-default`) y `og:locale` por
  página automáticamente a partir de `LOCALE_ID` — no hace falta tocarlo al añadir
  contenido nuevo, solo si cambia la lista de idiomas o los prefijos de URL.
- **Si cambias la lista de idiomas o los prefijos** (`BASE_HREF`), hazlo a la vez en
  los 4 sitios que lo repiten: `angular.json` (bloque `i18n`), `SeoService`,
  `scripts/generate-sitemap.mjs` y `HeaderComponent` (selector de idioma) — no hay
  una única fuente de verdad para esto todavía.
- Selector de idioma: `HeaderComponent`, clase `.nav__lang` — recalcula la URL
  equivalente en cada idioma a partir de la ruta actual (`Location.path()`), así que
  cambiar de idioma mantiene al usuario en la misma página.

## Documentación y agentes

- Docs detalladas en `docs/` (ARQUITECTURA, AFILIADOS, CONTENIDO, DESPLIEGUE, LEGAL).
- Agente de SEO disponible en `.claude/agents/seo.md` para auditar y mejorar el SEO.
- Agente de diseño disponible en `.claude/agents/design.md` para rediseños de UI/UX.
