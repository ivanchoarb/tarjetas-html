// Única plantilla de tarjeta. Los datos de cada cliente vienen de clientes/<id>/datos.json.
const porDefecto = { fondo: "#ffffff", texto: "#111111", acento: "#111111", borde: "#dddddd" };
const esc = s => String(s).replace(/[\\,;]/g, "\\$&").replace(/\r?\n/g, "\\n");

// vCard 3.0 (CRLF, valores escapados). Se usa para el .vcf del build y como respaldo en la vista previa.
export const vcard = d => ["BEGIN:VCARD", "VERSION:3.0", `FN:${esc(d.nombre)}`, `ORG:${esc(d.nombre)}`,
  d.telefono && `TEL;TYPE=CELL:${d.telefono}`, d.email && `EMAIL:${esc(d.email)}`, d.web && `URL:${d.web}`,
  d.ciudad && `ADR;TYPE=WORK:;;;${esc(d.ciudad)};;;`, "END:VCARD"].filter(Boolean).join("\r\n") + "\r\n";

export default function Tarjeta({ d, logo, vcfHref }) {
  const insta = d.instagram?.replace(/^.*instagram\.com\//, "").replace(/^@/, "").replace(/[/?].*$/, "");
  const enlaces = [
    d.whatsapp && { href: `https://wa.me/${d.whatsapp}`, texto: "WhatsApp", principal: true },
    d.telefono && { href: `tel:${d.telefono}`, texto: "Llamar" },
    insta && { href: `https://instagram.com/${insta}`, texto: "Instagram" },
    d.mapa && { href: d.mapa, texto: "Cómo llegar" },
    d.web && { href: d.web, texto: "Sitio web" },
  ].filter(Boolean);
  const c = { ...porDefecto, ...d.colores };
  const vars = { "--fondo": c.fondo, "--texto": c.texto, "--acento": c.acento, "--acento-texto": c.acentoTexto ?? c.texto, "--borde": c.borde };

  return (
    <main className="tarjeta" style={vars}>
      <img src={logo} alt={`Logo de ${d.nombre}`} />
      <h1>{d.nombre}</h1>
      <p className="sub">{d.lema} · {d.ciudad}</p>
      {d.horario && <p className="horario">{d.horario}</p>}
      {enlaces.map(e => (
        <a key={e.texto} className={e.principal ? "principal" : undefined} href={e.href} target="_blank" rel="noopener">{e.texto}</a>
      ))}
      <a href={vcfHref ?? "data:text/vcard;charset=utf-8," + encodeURIComponent(vcard(d))} download={`${d.nombre}.vcf`}>Guardar contacto</a>
    </main>
  );
}
