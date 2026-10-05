// Genera dist/<cliente>/index.html (autocontenido) desde plantilla.html + clientes/<cliente>/datos.json + logo.
import fs from "node:fs";
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const plantilla = fs.readFileSync("plantilla.html", "utf8");
fs.mkdirSync("dist", { recursive: true });

export function render(d, logo) {
  const vcard = ["BEGIN:VCARD", "VERSION:3.0", `FN:${d.nombre}`, d.telefono && `TEL:${d.telefono}`, d.web && `URL:${d.web}`, "END:VCARD"].filter(Boolean).join("\n");
  const enlaces = [
    d.whatsapp && ["principal", `https://wa.me/${d.whatsapp}`, "WhatsApp"],
    d.telefono && ["", `tel:${d.telefono}`, "Llamar"],
    d.instagram && ["", `https://instagram.com/${d.instagram}`, "Instagram"],
    d.mapa && ["", d.mapa, "Cómo llegar"],
    d.web && ["", d.web, "Sitio web"],
    ["", "data:text/vcard;charset=utf-8," + encodeURIComponent(vcard), "Guardar contacto"],
  ].filter(Boolean).map(([cls, href, txt]) => `<a class="${cls}" href="${esc(href)}"${txt === "Guardar contacto" ? ` download="${esc(d.nombre)}.vcf"` : ' target="_blank" rel="noopener"'}>${txt}</a>`).join("\n");
  const vars = { ...d, ...d.colores, logo, enlaces };
  return plantilla.replace(/{{(\w+)}}/g, (_, k) => (k === "enlaces" || k === "logo" ? vars[k] : esc(vars[k] ?? "")));
}

for (const id of fs.readdirSync("clientes")) {
  const dir = `clientes/${id}`;
  const d = JSON.parse(fs.readFileSync(`${dir}/datos.json`, "utf8"));
  const f = fs.readdirSync(dir).find(n => /^logo\.(jpe?g|png|webp|svg)$/.test(n));
  const mime = { jpg: "jpeg", jpeg: "jpeg", png: "png", webp: "webp", svg: "svg+xml" }[f.split(".")[1]];
  const logo = `data:image/${mime};base64,` + fs.readFileSync(`${dir}/${f}`).toString("base64");
  const html = render(d, logo);
  if (html.includes("{{")) throw new Error(`${id}: placeholder sin reemplazar`);
  fs.mkdirSync(`dist/${id}`, { recursive: true });
  fs.writeFileSync(`dist/${id}/index.html`, html);
  console.log(`dist/${id}/index.html`);
}
