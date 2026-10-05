# Tarjetas HTML

Tarjetas digitales de contacto para negocios: una plantilla, un archivo de datos por cliente.

## Agregar un cliente
1. Crea `clientes/<id>/datos.json` (copia uno existente) y `clientes/<id>/logo.(png|jpg|webp|svg)`.
2. `git push` a `main`. El Action publica `https://<id>-card.pages.dev`.

## Local
- `npm install` una vez.
- `npm run dev`: vista previa en vivo de todas las tarjetas para diseñar (src/Tarjeta.jsx + src/tarjeta.css).
- `npm run build`: genera `dist/<id>/index.html` estático, sin JavaScript.

## Secrets del repo
`CLOUDFLARE_API_TOKEN` (permiso Cloudflare Pages: Edit) y `CLOUDFLARE_ACCOUNT_ID`.
