import { getPct, pctColor, PCT_LEGEND } from "../../utils/statHelpers";
import { C, FONT_HEAD, card, sectionLabel } from "../../theme";

const ZONE_SHAPES = [
  { id: "corner_kiri",   label: ["Corner", "Kiri"],   path: "M 30 220 L 30 290 L 115 290 L 115 220 Z", tx: 72,  ty: 252 },
  { id: "wing_kiri",     label: ["Wing", "Kiri"],     path: "M 30 130 L 30 220 L 130 220 L 100 130 Z",  tx: 72,  ty: 178 },
  { id: "top",           label: ["Top"],               path: "M 100 130 L 130 220 L 270 220 L 300 130 Z",tx: 200, ty: 182 },
  { id: "wing_kanan",    label: ["Wing", "Kanan"],    path: "M 270 220 L 300 130 L 370 130 L 370 220 Z",tx: 328, ty: 178 },
  { id: "corner_kanan",  label: ["Corner", "Kanan"],  path: "M 285 220 L 285 290 L 370 290 L 370 220 Z",tx: 328, ty: 252 },
];

export default function CourtHeatmap({ zoneData }) {
  return (
    <div style={card}>
      <div style={{ ...sectionLabel, marginBottom: 12, textAlign: "center" }}>
        Court View — % per Zona
      </div>
      <svg viewBox="0 0 400 310" style={{ width: "100%", maxWidth: 420, display: "block", margin: "0 auto" }}>
        {/* Court bg */}
        <rect x="20" y="10" width="360" height="290" rx="8" fill="#F3F5F1" stroke={C.line} strokeWidth="1.5" />
        {/* 3pt arc */}
        <path d="M 30 290 Q 200 20 370 290" fill="none" stroke="#B9C6BC" strokeWidth="1.5" strokeDasharray="4 3" />
        {/* Paint */}
        <rect x="145" y="165" width="110" height="125" fill="none" stroke="#B9C6BC" strokeWidth="1.5" />
        {/* FT circle */}
        <ellipse cx="200" cy="165" rx="55" ry="28" fill="none" stroke="#B9C6BC" strokeWidth="1.5" />
        {/* Basket */}
        <rect x="184" y="280" width="32" height="5" rx="1" fill="none" stroke={C.accent} strokeWidth="1.5" />
        <circle cx="200" cy="287" r="7" fill="none" stroke={C.accent} strokeWidth="2" />

        {/* Zones — zona tanpa percobaan = tidak ada data, bukan 0% */}
        {ZONE_SHAPES.map((zone) => {
          const d     = zoneData[zone.id] || { made: 0, attempt: 0 };
          const pct   = getPct(d.made, d.attempt);
          const color = pctColor(pct);
          const opac  = pct === null ? 0.35 : 0.3 + (pct / 100) * 0.55;
          const lightText = pct !== null && opac > 0.55;
          return (
            <g key={zone.id}>
              <path d={zone.path} fill={color} fillOpacity={opac} stroke={color} strokeOpacity={0.8} strokeWidth="1.5" style={{ transition: "all 0.4s" }} />
              {zone.label.map((line, i) => (
                <text key={i} x={zone.tx} y={zone.ty + i * 13 - (zone.label.length - 1) * 6}
                  textAnchor="middle" fill={lightText ? "#FFFFFF" : C.text} fontSize="11"
                  fontFamily={FONT_HEAD} fontWeight="600">
                  {line}
                </text>
              ))}
              <text x={zone.tx} y={zone.ty + zone.label.length * 13 - (zone.label.length - 1) * 6 + 1}
                textAnchor="middle" fill={lightText ? "#FFFFFF" : C.text} fontSize="13"
                fontFamily={FONT_HEAD} fontWeight="800">
                {pct === null ? "—" : `${pct}%`}
              </text>
            </g>
          );
        })}
      </svg>
      {/* Legend */}
      <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 14, flexWrap: "wrap" }}>
        {PCT_LEGEND.map(([l, v]) => (
          <div key={l} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: C.textSub }}>
            <div style={{ width: 9, height: 9, borderRadius: 2, background: pctColor(v) }} />
            {l}
          </div>
        ))}
        <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: C.textSub }}>
          <div style={{ width: 9, height: 9, borderRadius: 2, background: pctColor(null) }} />
          — belum ada data
        </div>
      </div>
    </div>
  );
}
