# Meet Málaga

Portal turístico de Málaga construido en **Angular 17 + SSR**. Recomienda tours,
alquiler de coches, restaurantes y ocio, y monetiza mediante **enlaces de
afiliado**: se genera una comisión cada vez que un visitante reserva un servicio
a través del sitio. El proveedor (Civitatis, DiscoverCars, TheFork…) cobra,
gestiona la reserva y paga la comisión; el sitio no procesa pagos.

## Requisitos

- Node.js 22 (ver `.nvmrc`)
- npm 9+

## Arranque rápido

```bash
npm install
npm start                       # desarrollo: http://localhost:4200
```

```bash
npm run build                   # producción con SSR + prerender
npm run serve:ssr:meetmalaga    # sirve la versión SSR: http://localhost:4000
```

## Estructura del proyecto

```
meetmalaga/
├── src/
│   ├── app/
│   │   ├── core/               # lógica sin UI
│   │   │   ├── models/         # tipos (Offer, Vertical, AffiliateProvider)
│   │   │   ├── data/           # catálogo por vertical
│   │   │   └── services/       # AffiliateService, CatalogService, SeoService, AnalyticsService
│   │   ├── shared/components/  # OfferCard, Header, Footer, CookieBanner
│   │   └── features/           # home, vertical (plantilla común), legal, not-found
│   └── environments/           # IDs de afiliado (prod / dev)
├── scripts/
│   └── generate-sitemap.mjs    # genera sitemap.xml y robots.txt en cada build
├── docs/                       # documentación (ver abajo)
├── preview/
│   └── index.html              # vista previa estática del diseño (un solo archivo)
├── server.ts                   # servidor SSR (Express)
└── angular.json
```

## Configuración inicial

1. IDs de afiliado en `src/environments/environment.ts` (ver `docs/AFILIADOS.md`).
2. `siteUrl` con tu dominio real en `environment.ts`.
3. Contenido real en `src/app/core/data/*.data.ts`.
4. Datos reales en las páginas legales (`src/app/features/legal/`).
5. `analyticsId` de GA4 si vas a medir (ver `docs/DESPLIEGUE.md`).

## Documentación

| Documento | Contenido |
|-----------|-----------|
| [docs/ARQUITECTURA.md](docs/ARQUITECTURA.md) | Cómo está organizado el código |
| [docs/AFILIADOS.md](docs/AFILIADOS.md) | Alta en programas y configuración de comisiones |
| [docs/CONTENIDO.md](docs/CONTENIDO.md) | Añadir ofertas, verticales y migrar desde WordPress |
| [docs/SETUP.md](docs/SETUP.md) | Instalación detallada y comandos |
| [docs/DESPLIEGUE.md](docs/DESPLIEGUE.md) | Publicar con SSR, dominio y analítica |
| [docs/LEGAL.md](docs/LEGAL.md) | Checklist legal (RGPD, cookies, afiliados) |
| [docs/afiliacion.pdf](docs/afiliacion.pdf) | Guía completa de afiliación (PDF) |

## Vista previa del diseño

`preview/index.html` es una maqueta estática de un solo archivo para enseñar el
diseño sin levantar el proyecto. Ábrela en cualquier navegador o publícala en un
hosting estático. No es la app real (no tiene SSR, SEO ni reservas).

## Licencia

MIT — ver [LICENSE](LICENSE).
