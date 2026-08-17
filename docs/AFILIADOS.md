# Afiliados y comisiones

Esta es la parte que genera el dinero. La idea clave: **no construyes reservas ni
pagos**. Te das de alta en programas de afiliación, pones tu ID en la web y ganas
comisión cuando alguien reserva a través de tus enlaces.

## Cómo funciona técnicamente

1. Cada oferta (`Offer`) tiene una `providerUrl`: la URL limpia del producto en el
   proveedor, **sin** tu ID.
2. `AffiliateService.buildLink()` toma esa URL y le añade tu ID de afiliado como
   parámetro (`?aid=...`, `?partner_id=...`, según el proveedor) más unas etiquetas
   `utm_*` para tu analítica.
3. El visitante pulsa "Ver oferta" → va al proveedor con tu ID → si reserva, el
   proveedor te atribuye la comisión mediante una cookie.

Todo el mapa de parámetros está en `src/app/core/services/affiliate.service.ts`
(constante `PROVIDER_PARAM`). Los IDs están en `src/environments/environment.ts`.

## Programas recomendados para Málaga

| Vertical | Programa | Dónde darte de alta | Comisión orientativa* |
|----------|----------|---------------------|-----------------------|
| Tours y ocio | **Civitatis** | civitatis.com (programa de afiliados) | ~6–8 % |
| Tours y ocio | **GetYourGuide** | partner.getyourguide.com | ~8 % |
| Atracciones | **Tiqets** | tiqets.com/partners | ~6–8 % |
| Coches | **DiscoverCars** | discovercars.com/affiliate | ~ hasta 70 % del margen |
| Coches | **Localrent** | localrent.com (partners) | variable |
| Restaurantes | **TheFork** | vía redes Awin / CJ | por comensal / CPA |
| Alojamiento | **Booking.com** | Booking Affiliate Partner | ~25–40 % de su comisión |

\* Las comisiones cambian; confírmalas en cada panel. No las publiques como fijas.

## Pasos para dar de alta cada programa

1. **Regístrate** en el programa (algunos revisan tu web antes de aprobarte: por eso
   conviene tener contenido publicado primero).
2. Cuando te aprueben, copia tu **ID de afiliado / partner ID**.
3. Pégalo en `src/environments/environment.ts`:

   ```ts
   affiliate: {
     civitatis: '12345',        // tu ID real
     getyourguide: 'ABCDE',
     discovercars: 'xxxxx',
     // ...
   }
   ```

4. **Confirma el nombre del parámetro** que espera cada programa (a veces cambia por
   país o por tipo de enlace). Si no es el que trae por defecto el proyecto, edítalo
   en `PROVIDER_PARAM` dentro de `affiliate.service.ts`.

## Dos formas de enlazar

- **Enlace directo (lo que hace este proyecto):** apuntas a la ficha del producto en
  el proveedor con tu ID. Simple, robusto y suficiente para empezar.
- **Widgets / API:** algunos proveedores (GetYourGuide, DiscoverCars) ofrecen widgets
  embebibles o API para mostrar precios y disponibilidad en vivo dentro de tu web.
  Da más trabajo; hazlo cuando ya tengas tráfico. La `providerUrl` seguiría siendo el
  punto de entrada; solo cambia cómo muestras la oferta.

## Rastrea tus conversiones

`AffiliateService.trackOutbound()` dispara un evento `affiliate_click` a Google
Analytics (GA4) cuando alguien pulsa un enlace. Cruza esos clics con los informes de
comisión de cada panel para saber qué ofertas convierten mejor y priorizarlas.

## Buenas prácticas

- Usa `rel="sponsored noopener"` en los enlaces de afiliado (ya incluido en la tarjeta).
  Google lo pide y evita penalizaciones SEO.
- Sé transparente: la página `/afiliados` y el aviso del pie ya informan al usuario
  (obligatorio, ver `docs/LEGAL.md`).
- No prometas precios exactos: márcalos siempre como "desde" y orientativos.
