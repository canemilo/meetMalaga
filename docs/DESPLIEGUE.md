# Despliegue

Como el sitio usa **SSR**, necesitas un hosting que ejecute Node, no un simple hosting
de archivos estáticos. Opciones ordenadas por facilidad:

## Opción 1 — Vercel (recomendada)

1. Sube el proyecto a un repositorio de GitHub.
2. En vercel.com → *New Project* → importa el repo.
3. Vercel detecta Angular. Build command: `npm run build`. Framework: Angular.
4. Deploy. Vercel sirve el HTML prerenderizado y ejecuta el SSR bajo demanda.

## Opción 2 — Netlify

Similar a Vercel. Usa el plugin de Angular SSR o despliega la carpeta `browser/` como
estática + una función para el `server.mjs`.

## Opción 3 — Servidor Node propio (VPS)

```bash
npm run build
node dist/meetmalaga/server/server.mjs   # escucha en el puerto 4000
```

Pon **Nginx** o **Caddy** delante como proxy inverso con HTTPS. Usa `pm2` para que el
proceso Node no se caiga:

```bash
npm i -g pm2
pm2 start dist/meetmalaga/server/server.mjs --name meetmalaga
pm2 save
```

## Dominio

1. Compra el dominio (p. ej. `meetmalagatours.com`).
2. Apunta los DNS a tu hosting (Vercel/Netlify te dan los registros; en VPS, un
   registro A a la IP del servidor).
3. Actualiza `siteUrl` en `src/environments/environment.ts` con el dominio final y
   vuelve a desplegar (afecta a las URLs canónicas y Open Graph).

## Analítica (GA4) y consentimiento

1. Crea una propiedad GA4 y copia su ID (`G-XXXXXXX`).
2. Ponlo en `environment.ts` → `analyticsId`.
3. Carga `gtag.js` **solo cuando el usuario acepte cookies analíticas**: implementa
   esa carga en `CookieBannerComponent.enableAnalytics()` (ya hay un hueco preparado).
   Así cumples el RGPD (no rastreas sin consentimiento).

Con eso, `AffiliateService.trackOutbound()` ya envía el evento `affiliate_click` a GA4.

## SEO tras desplegar

- Crea un `sitemap.xml` y un `robots.txt` (puedes generarlos en el build o a mano) y
  colócalos en `src/assets/` para que se publiquen en la raíz.
- Da de alta el sitio en **Google Search Console** y envía el sitemap.
- Comprueba con la herramienta de inspección de URLs que Google ve el contenido
  prerenderizado (no una página en blanco).
