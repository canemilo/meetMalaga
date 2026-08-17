# Contenido: ofertas, verticales y migración desde WordPress

## Añadir una oferta

Abre el archivo de la vertical correspondiente en `src/app/core/data/` y añade un
objeto al array:

```ts
{
  id: 'tour-teleferico-benalmadena',   // único, en minúsculas con guiones
  vertical: 'tours',
  provider: 'civitatis',
  title: 'Teleférico de Benalmádena',
  summary: 'Sube al monte Calamorro con vistas de toda la bahía.',
  imageUrl: '/assets/img/teleferico.jpg',   // o una URL externa
  imageAlt: 'Cabina del teleférico sobre la montaña',
  priceFrom: 17,
  rating: 4.5,
  duration: 'Medio día',
  providerUrl: 'https://www.civitatis.com/es/benalmadena/teleferico/', // SIN tu ID
  tags: ['vistas', 'familia'],
  featured: true,   // opcional: aparece en la portada
}
```

Guarda y listo: la tarjeta se genera sola y el enlace de afiliado se construye solo.

## Imágenes

Las de ejemplo usan `picsum.photos` (marcadores de posición). Sustitúyelas por fotos
propias: colócalas en `src/assets/img/` y referencia `/assets/img/tu-foto.jpg`.
Optimiza el peso (WebP, < 200 KB) para no penalizar la velocidad.

## Añadir una vertical nueva (p. ej. "Alojamiento")

1. Añade el valor al tipo en `core/models/offer.model.ts`:
   ```ts
   export type Vertical = 'tours' | 'coches' | 'restaurantes' | 'ocio' | 'alojamiento';
   ```
2. Crea `core/data/alojamiento.data.ts` con sus ofertas.
3. Inclúyelo en `CatalogService` (`core/services/catalog.service.ts`):
   ```ts
   import { ALOJAMIENTO } from '../data/alojamiento.data';
   private readonly all = [...TOURS, ...COCHES, ...RESTAURANTES, ...OCIO, ...ALOJAMIENTO];
   ```
4. Añade la ruta en `app.routes.ts` copiando un bloque de vertical y cambiando `config`.
5. Añade el enlace en la cabecera (`shared/components/header`) y en la portada
   (`features/home`).

No hace falta crear un componente nuevo: la plantilla `VerticalPageComponent` sirve.

## Migrar el contenido desde tu WordPress

Tienes tres caminos, de más rápido a más potente:

### A) Copiar a mano (lo más simple para empezar)

Coge los textos y fotos de tu WordPress actual y vuélcalos en los `*.data.ts`. Para
pocas decenas de servicios es lo más rápido.

### B) WordPress como *headless CMS* (recomendado si ya tienes mucho contenido)

Tu WordPress expone una API REST en `https://tudominio.com/wp-json/wp/v2/`. Puedes
seguir editando en el panel de WordPress que ya conoces y que Angular consuma esos
datos. Cambia `CatalogService` para que haga `fetch` en lugar de leer arrays:

```ts
// Ejemplo conceptual
getByVertical(vertical: Vertical) {
  return this.http.get<Offer[]>(
    `https://tudominio.com/wp-json/wp/v2/posts?categories=${vertical}`
  ).pipe(map(posts => posts.map(toOffer)));
}
```

Tendrías que mapear los campos de WordPress a tu modelo `Offer` (una función
`toOffer`). Los componentes no cambian.

### C) Un CMS headless nuevo (Strapi, Contentful)

Si quieres separarte de WordPress. Más trabajo inicial, más control. Igualmente solo
tocas `CatalogService`.

> Consejo: empieza por (A) para lanzar rápido y pásate a (B) cuando el volumen de
> contenido lo justifique.
