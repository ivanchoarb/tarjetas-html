# Tarjetas HTML

Tarjetas digitales de contacto para negocios: una plantilla, un archivo de datos por cliente.

## Agregar un cliente
1. Crea `clientes/<id>/datos.json` (copia uno existente) y `clientes/<id>/logo.(png|jpg|webp|svg)`.
2. `git push` a `main`. El Action publica `https://<id>-card.pages.dev`.

## Local
`node build.mjs` genera `dist/<id>/index.html`. Sin dependencias.

## Secrets del repo
`CLOUDFLARE_API_TOKEN` (permiso Cloudflare Pages: Edit) y `CLOUDFLARE_ACCOUNT_ID`.
