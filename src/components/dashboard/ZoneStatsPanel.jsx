import { ZONES, getPct, pctColor } from "../../utils/statHelpers";
import { C, card, sectionLabel } from "../../theme";

export default function ZoneStatsPanel({ zoneData }) {
  return (
    <div style={card}>
      <div style={{ ...sectionLabel, marginBottom: 16 }}>
        Statistik per Zona
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {ZONES.map((z) => {
          const d   = zoneData[z.key];
          const pct = getPct(d.made, d.attempt);
          return (
            <div key={z.key}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 5 }}>
                <span style={{ color: C.text, fontWeight: 600 }}>{z.label}</span>
                <span style={{ color: C.textSub }}>
                  {pct === null ? "belum ada data" : <>{d.made}/{d.attempt} · <strong style={{ color: C.text }}>{pct}%</strong></>}
                </span>
              </div>
              <div style={{ height: 8, background: C.lineSoft, borderRadius: 4, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${pct ?? 0}%`, background: pctColor(pct), borderRadius: 4, transition: "width 0.4s" }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
