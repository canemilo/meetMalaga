# Instalación y comandos

## Requisitos

- **Node.js 18.13+** (recomendado 20 o 22).
- **npm 9+**.

## Instalación

```bash
npm install
```

## Comandos

| Comando                        | Qué hace                                                                   |
|--------------------------------|----------------------------------------------------------------------------|
| `npm start`                    | Servidor de desarrollo en `http://localhost:4200` con recarga en caliente. |
| `npm run build`                | Build de producción con SSR + prerender en `dist/meetmalaga/`.             |
| `npm run serve:ssr:meetmalaga` | Sirve la versión SSR ya construida (Node/Express) en el puerto 4000.       |
| `npm run watch`                | Build en modo desarrollo que recompila al guardar.                         |

## Estructura de salida del build

```
dist/meetmalaga/
├── browser/     → HTML/JS/CSS que ve el usuario (incluye HTML prerenderizado por ruta)
└── server/      → server.mjs, el servidor SSR de Node
```

## Configuración inicial (checklist)

- [ ] IDs de afiliado en `src/environments/environment.ts`.
- [ ] `siteUrl` con tu dominio real en `environment.ts` (afecta al SEO y a las URLs canónicas).
- [ ] Contenido real en `src/app/core/data/*.data.ts`.
- [ ] Imágenes propias en `src/assets/img/`.
- [ ] Datos reales en las páginas legales (`src/app/features/legal/`).
- [ ] `analyticsId` de GA4 si vas a medir (ver `docs/DESPLIEGUE.md`).

## Notas técnicas

- El inlining de fuentes de Google está **desactivado** en `angular.json` para que el
  build no dependa de la red. Las fuentes se cargan con un `<link>` en `index.html`.
  Si prefieres inlinarlas (mejor rendimiento), pon `"fonts": true` en
  `optimization` de la configuración `production` — necesitarás acceso a
  `fonts.googleapis.com` al compilar.
- El proyecto usa el nuevo *application builder* de Angular 17.
