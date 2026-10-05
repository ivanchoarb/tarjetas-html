// Vista previa para diseñar: todas las tarjetas lado a lado en marcos de teléfono, con recarga en vivo.
import { createRoot } from "react-dom/client";
import Tarjeta from "./Tarjeta.jsx";
import "./tarjeta.css";

const datos = import.meta.glob("/clientes/*/datos.json", { eager: true, import: "default" });
const logos = import.meta.glob("/clientes/*/logo.*", { eager: true, query: "?url", import: "default" });
const id = p => p.split("/")[2];
const logoDe = cid => Object.entries(logos).find(([p]) => id(p) === cid)?.[1];

createRoot(document.getElementById("root")).render(
  <div style={{ display: "flex", flexWrap: "wrap", gap: 24, padding: 24 }}>
    {Object.entries(datos).map(([p, d]) => (
      <figure key={p} style={{ margin: 0, width: 390, height: 844, overflow: "auto", borderRadius: 32, boxShadow: "0 8px 30px #0003" }}>
        <Tarjeta d={d} logo={logoDe(id(p))} />
      </figure>
    ))}
  </div>
);
