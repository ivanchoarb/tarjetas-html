// Genera dist/<cliente>/index.html estático (sin JavaScript) renderizando src/Tarjeta.jsx con los datos de cada cliente.
import fs from "node:fs";
import { createServer } from "vite";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

const vite = await createServer({ server: { middlewareMode: true }, appType: "custom", optimizeDeps: { noDiscovery: true }, logLevel: "error" });
const { default: Tarjeta, vcard } = await vite.ssrLoadModule("/src/Tarjeta.jsx");
await vite.close();
const css = fs.readFileSync("src/tarjeta.css", "utf8");
const esc = s => s.replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const mimes = { jpg: "jpeg", jpeg: "jpeg", png: "png", webp: "webp", svg: "svg+xml" };

for (const id of fs.readdirSync("clientes")) {
  const dir = `clientes/${id}`;
  const d = JSON.parse(fs.readFileSync(`${dir}/datos.json`, "utf8"));
  const f = fs.readdirSync(dir).find(n => /^logo\.(jpe?g|png|webp|svg)$/.test(n));
  if (!f) throw new Error(`${id}: falta logo`);
  const logo = `data:image/${mimes[f.split(".")[1]]};base64,` + fs.readFileSync(`${dir}/${f}`).toString("base64");
  const cuerpo = renderToStaticMarkup(createElement(Tarjeta, { d, logo, vcfHref: "contacto.vcf" }));
  const html = `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(d.nombre)}</title><style>${css}</style></head><body>${cuerpo}</body></html>`;
  fs.mkdirSync(`dist/${id}`, { recursive: true });
  fs.writeFileSync(`dist/${id}/index.html`, html);
  fs.writeFileSync(`dist/${id}/contacto.vcf`, vcard(d));
  console.log(`dist/${id}/index.html`);
}
