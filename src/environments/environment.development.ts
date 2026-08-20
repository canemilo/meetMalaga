/**
 * Configuración de DESARROLLO (ng serve).
 * Usa IDs de prueba o los reales; en local da igual porque no generas tráfico.
 */
export const environment = {
  production: false,

  siteName: 'Meet Málaga (dev)',
  siteUrl: 'http://localhost:4200',

  affiliate: {
    civitatis: 'DEV',
    getyourguide: 'DEV',
    tiqets: 'DEV',
    discovercars: 'DEV',
    localrent: 'DEV',
    thefork: 'DEV',
    booking: 'DEV',
  },

  analyticsId: '',

  contacto: {
    whatsapp: '',
    stripePaymentLink: '',
    paypalLink: '',
    bizum: '',
    iban: '',
  },
};
