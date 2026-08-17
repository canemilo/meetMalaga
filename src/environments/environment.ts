/**
 * Configuración de PRODUCCIÓN.
 *
 * Sustituye cada "TU_ID_..." por el identificador real que te da cada
 * programa de afiliados cuando te aprueban. NO subas claves privadas a Git:
 * estos IDs de afiliado son públicos (viajan en la URL), pero si algún
 * programa te diera un token secreto de API, guárdalo en el servidor, nunca
 * en este archivo del frontend.
 */
export const environment = {
  production: true,

  siteName: 'Meet Málaga',
  siteUrl: 'https://meetmalagatours.com',

  // --- IDs de afiliado por proveedor ---
  affiliate: {
    civitatis: 'TU_ID_CIVITATIS',      // ?aid=XXXX
    getyourguide: 'TU_ID_GYG',         // ?partner_id=XXXX
    tiqets: 'TU_ID_TIQETS',            // ?partner=XXXX
    discovercars: 'TU_ID_DISCOVERCARS',// ?a_aid=XXXX
    localrent: 'TU_ID_LOCALRENT',      // ?ref=XXXX
    thefork: 'TU_ID_THEFORK',          // varía según red (Awin/CJ)
    booking: 'TU_ID_BOOKING',          // ?aid=XXXX
  },

  // ID de medición de analítica (GA4), opcional.
  analyticsId: '',
};
