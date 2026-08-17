# Arquitectura

Angular 17 con **componentes standalone** (sin NgModules) y **SSR + prerender**
activados. El objetivo de diseño: que añadir ofertas o verticales sea trivial y que
el sitio posicione bien en Google.

## Capas

```
core     → lógica y datos, sin UI (modelos, servicios, catálogo)
shared   → componentes reutilizables (tarjeta, cabecera, pie, banner)
features → páginas enrutables (home, verticales, legales, 404)
```

Regla: `features` usa `shared` y `core`; `shared` usa `core`; `core` no depende de nada
de UI. Así el día que cambies el origen de datos no tocas los componentes.

## Piezas clave

### `Offer` (core/models/offer.model.ts)
El tipo que describe cualquier servicio: título, imagen, precio, proveedor y la
`providerUrl`. Todo el sitio gira en torno a este modelo.

### `AffiliateService` (core/services)
Construye el enlace final con tu ID de afiliado y registra los clics de salida.
Es el corazón del modelo de negocio. Ver `docs/AFILIADOS.md`.

### `CatalogService` (core/services)
Fuente única del catálogo. Hoy lee de arrays locales (`core/data/*.data.ts`). Para
migrar a un CMS solo cambias la implementación de sus tres métodos (por ejemplo, que
hagan `fetch` a la API de WordPress) — los componentes no se enteran.

### `SeoService` (core/services)
Fija `<title>`, `description` y Open Graph por página. Como hay SSR, estas etiquetas
se renderizan en el HTML del servidor y Google las indexa.

### `VerticalPageComponent` (features/vertical)
**Una sola plantilla para las cuatro verticales.** La diferencia (título, subtítulo,
qué vertical mostrar) llega desde `data.config` en `app.routes.ts`. Añadir una
sección nueva es añadir una ruta, no un componente.

### `OfferCardComponent` (shared)
La tarjeta que se repite en toda la web. Recibe una `Offer` y pinta imagen, datos y
el CTA de afiliado. Cámbiala una vez y cambia en todas partes.

## SSR y SEO

- `provideClientHydration()` reutiliza el HTML del servidor en el navegador (no repinta).
- El build genera HTML estático de cada ruta (`prerender: true`): los buscadores ven
  el contenido completo, no una página vacía que se rellena con JS.
- Todo el código es "SSR-safe": los accesos a `window`/`localStorage` están detrás de
  `isPlatformBrowser()` (ver `AffiliateService` y `CookieBannerComponent`).

## Rendimiento

- **Lazy loading** en todas las rutas (`loadComponent`): el bundle inicial es mínimo.
- Imágenes con `loading="lazy"`.
- `scrollPositionRestoration: 'top'` para que cada página empiece arriba.

## Entornos

`environment.ts` (producción) y `environment.development.ts` (desarrollo). El
reemplazo está configurado en `angular.json`; en `ng serve` se usa el de desarrollo.
