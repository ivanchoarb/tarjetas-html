// Única plantilla de tarjeta. Los datos de cada cliente vienen de clientes/<id>/datos.json.
export default function Tarjeta({ d, logo }) {
  const vcard = ["BEGIN:VCARD", "VERSION:3.0", `FN:${d.nombre}`, d.telefono && `TEL:${d.telefono}`, d.web && `URL:${d.web}`, "END:VCARD"]
    .filter(Boolean).join("\n");
  const enlaces = [
    d.whatsapp && { href: `https://wa.me/${d.whatsapp}`, texto: "WhatsApp", principal: true },
    d.telefono && { href: `tel:${d.telefono}`, texto: "Llamar" },
    d.instagram && { href: `https://instagram.com/${d.instagram}`, texto: "Instagram" },
    d.mapa && { href: d.mapa, texto: "Cómo llegar" },
    d.web && { href: d.web, texto: "Sitio web" },
  ].filter(Boolean);
  const c = d.colores;
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
      <a href={"data:text/vcard;charset=utf-8," + encodeURIComponent(vcard)} download={`${d.nombre}.vcf`}>Guardar contacto</a>
    </main>
  );
}
