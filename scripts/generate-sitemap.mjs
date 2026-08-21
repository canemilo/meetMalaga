/**
 * Genera src/sitemap.xml y src/robots.txt a partir de las rutas públicas.
 * Se ejecuta automáticamente antes de cada build (script "prebuild" en
 * package.json). La URL del sitio se lee de src/environments/environment.ts
 * para no duplicarla.
 *
 * Cuando añadas una vertical nueva, agrégala al array ROUTES de abajo.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

// --- Leer siteUrl de environment.ts (fuente única de verdad) ---
function readSiteUrl() {
  const env = readFileSync(join(root, 'src/environments/environment.ts'), 'utf8');
  const match = env.match(/siteUrl:\s*['"]([^'"]+)['"]/);
  return match ? match[1].replace(/\/$/, '') : 'https://example.com';
}

const SITE_URL = readSiteUrl();
const today = new Date().toISOString().split('T')[0];

// Rutas públicas: [ruta, prioridad, frecuencia de cambio]
const ROUTES = [
  ['/', '1.0', 'weekly'],
  ['/free-tours', '0.9', 'weekly'],
  ['/rutas', '0.9', 'weekly'],
  ['/tours', '0.9', 'weekly'],
  ['/coches', '0.9', 'weekly'],
  ['/restaurantes', '0.9', 'weekly'],
  ['/ocio', '0.9', 'weekly'],
  ['/hoteles', '0.9', 'weekly'],
  ['/aviso-legal', '0.3', 'yearly'],
  ['/privacidad', '0.3', 'yearly'],
  ['/cookies', '0.3', 'yearly'],
  ['/afiliados', '0.3', 'yearly'],
];

// Mismos locales y prefijos que angular.json (i18n.locales) y SeoService.
// Las rutas no se traducen, solo se les antepone el prefijo del idioma.
const LOCALES = ['es', 'en', 'fr', 'de'];
const BASE_HREF = { es: '', en: '/en', fr: '/fr', de: '/de' };
const urlFor = (locale, path) => `${SITE_URL}${BASE_HREF[locale]}${path}`;

// --- sitemap.xml (48 URLs: 12 rutas × 4 idiomas, con hreflang cruzado) ---
const urls = ROUTES.flatMap(([path, priority, freq]) =>
  LOCALES.map((locale) => {
    const alternates = LOCALES.map(
      (l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${urlFor(l, path)}" />`
    ).join('\n');
    const xdefault = `    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}${path}" />`;
    return `  <url>
    <loc>${urlFor(locale, path)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${freq}</changefreq>
    <priority>${priority}</priority>
${alternates}
${xdefault}
  </url>`;
  })
).join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;

// --- robots.txt ---
const robots = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;

writeFileSync(join(root, 'src/sitemap.xml'), sitemap);
writeFileSync(join(root, 'src/robots.txt'), robots);

console.log(`✓ sitemap.xml (${ROUTES.length * LOCALES.length} URLs, ${LOCALES.length} idiomas) y robots.txt generados para ${SITE_URL}`);
