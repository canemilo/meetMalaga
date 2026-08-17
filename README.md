# Meet Málaga 🌞

Portal turístico de Málaga construido en **Angular 17 + SSR**. Recomienda tours,
alquiler de coches, restaurantes y ocio, y monetiza mediante **enlaces de
afiliado**: ganas una comisión cada vez que un visitante reserva a través del sitio.

El proveedor (Civitatis, DiscoverCars, TheFork...) cobra, gestiona la reserva y
te paga la comisión. Tú no procesas pagos.

## Arranque rápido

```bash
npm install
npm start            # desarrollo en http://localhost:4200
```

```bash
npm run build        # build de producción con SSR + prerender
npm run serve:ssr:meetmalaga   # sirve la versión SSR en el puerto 4000
```

## Lo primero que debes hacer

1. **Pon tus IDs de afiliado** en `src/environments/environment.ts`
   (ver [`docs/AFILIADOS.md`](docs/AFILIADOS.md)).
2. **Cambia el contenido** de ejemplo en `src/app/core/data/*.data.ts`
   (ver [`docs/CONTENIDO.md`](docs/CONTENIDO.md)).
3. **Completa las páginas legales** con tus datos (ver [`docs/LEGAL.md`](docs/LEGAL.md)).
4. **Despliega** en Vercel/Netlify (ver [`docs/DESPLIEGUE.md`](docs/DESPLIEGUE.md)).

## Documentación

| Documento                               | Contenido                                                  |
|-----------------------------------------|------------------------------------------------------------|
| [ARQUITECTURA.md](docs/ARQUITECTURA.md) | Cómo está organizado el código                             |
| [AFILIADOS.md](docs/AFILIADOS.md)       | Alta en programas y configuración de comisiones            |
| [CONTENIDO.md](docs/CONTENIDO.md)       | Añadir ofertas, nuevas verticales y migrar desde WordPress |
| [SETUP.md](docs/SETUP.md)               | Instalación detallada y comandos                           |
| [DESPLIEGUE.md](docs/DESPLIEGUE.md)     | Publicar con SSR, dominio y analítica                      |
| [LEGAL.md](docs/LEGAL.md)               | Checklist legal (RGPD, cookies, afiliados)                 |

## Estructura

```
src/app/
├── core/
│   ├── models/         → tipos (Offer, Vertical, AffiliateProvider)
│   ├── data/           → catálogo por vertical (tours, coches, restaurantes, ocio)
│   └── services/       → AffiliateService, CatalogService, SeoService
├── shared/components/  → OfferCard, Header, Footer, CookieBanner
└── features/
    ├── home/           → portada
    ├── vertical/       → plantilla común de las 4 verticales
    ├── legal/          → aviso legal, privacidad, cookies, afiliados
    └── not-found/      → 404
```
