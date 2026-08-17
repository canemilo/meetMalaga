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
  ['/tours', '0.9', 'weekly'],
  ['/coches', '0.9', 'weekly'],
  ['/restaurantes', '0.9', 'weekly'],
  ['/ocio', '0.9', 'weekly'],
  ['/aviso-legal', '0.3', 'yearly'],
  ['/privacidad', '0.3', 'yearly'],
  ['/cookies', '0.3', 'yearly'],
  ['/afiliados', '0.3', 'yearly'],
];

// --- sitemap.xml ---
const urls = ROUTES.map(
  ([path, priority, freq]) => `  <url>
    <loc>${SITE_URL}${path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${freq}</changefreq>
    <priority>${priority}</priority>
  </url>`
).join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
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

console.log(`✓ sitemap.xml (${ROUTES.length} URLs) y robots.txt generados para ${SITE_URL}`);
