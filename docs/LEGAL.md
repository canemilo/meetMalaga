# Checklist legal (España / UE)

> Esto es orientación práctica, **no asesoramiento jurídico**. Para un negocio real,
> revísalo con un abogado o asesor. Las páginas del proyecto son plantillas con
> huecos `[entre corchetes]` que debes completar.

## Obligatorio antes de publicar

- [ ] **Aviso legal** (`/aviso-legal`): identifica al titular (nombre/razón social,
      NIF, domicilio, email). Lo exige la **LSSI-CE** para webs con actividad económica.
- [ ] **Política de privacidad** (`/privacidad`): qué datos tratas y por qué (**RGPD**).
- [ ] **Política de cookies** (`/cookies`): tipos de cookies y cómo gestionarlas.
- [ ] **Banner de cookies**: no cargues analítica ni cookies no esenciales hasta que el
      usuario acepte. El proyecto ya trae `CookieBannerComponent`; conecta la carga de
      GA4 a la aceptación (ver `docs/DESPLIEGUE.md`).
- [ ] **Divulgación de afiliados** (`/afiliados` + aviso en el pie): informa de que
      ganas comisión por los enlaces. Lo exigen las normas de consumo, la buena praxis
      y las propias condiciones de los programas.

## Sobre tu responsabilidad

Actúas como **intermediario informativo**: no prestas el servicio ni cobras al
usuario. La reserva, el pago y la atención al cliente son del proveedor final. El
aviso legal del proyecto ya lo deja claro, pero asegúrate de no dar a entender que
tú gestionas las reservas.

## Fiscalidad (habla con tu asesor)

- Las comisiones de afiliación son **ingresos**: normalmente tendrás que darte de alta
  como autónomo o mediante una sociedad, y declararlos.
- Algunos programas pagan desde fuera de España (IVA intracomunitario, modelo 349,
  etc.). Tu asesor te dirá cómo facturar a cada red.

## Requisitos de cada programa

Cada red de afiliación tiene sus **términos**: revisa si te obligan a mostrar un aviso
concreto, si prohíben ciertas prácticas (pujar por su marca en Google Ads, cupones,
etc.) y cómo y cuándo pagan. Incumplirlos puede costarte la cuenta y las comisiones.
