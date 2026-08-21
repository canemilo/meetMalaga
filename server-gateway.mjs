/**
 * Pasarela SSR multi-idioma. NO forma parte del build de Angular (no se
 * traduce ni se duplica por locale): monta los 4 servidores ya construidos
 * (uno por idioma, cada uno un bundle Angular SSR independiente) bajo sus
 * prefijos de URL. Español vive en la raíz sin prefijo; los demás van bajo
 * /en, /fr, /de. El orden de montaje importa: los prefijos específicos deben
 * registrarse antes que el catch-all raíz, o este último los interceptaría.
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const serverDist = (...p) => path.join(__dirname, 'dist/meetmalaga/server', ...p);

const { app: appEs } = await import(serverDist('es/server.mjs'));
const { app: appEn } = await import(serverDist('en/server.mjs'));
const { app: appFr } = await import(serverDist('fr/server.mjs'));
const { app: appDe } = await import(serverDist('de/server.mjs'));

const gateway = express();
gateway.use('/en', appEn());
gateway.use('/fr', appFr());
gateway.use('/de', appDe());
gateway.use('/', appEs());

const port = process.env.PORT || 4000;
gateway.listen(port, () => {
  console.log(`Pasarela SSR (es/en/fr/de) escuchando en http://localhost:${port}`);
});
