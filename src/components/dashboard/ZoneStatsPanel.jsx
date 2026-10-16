import { ZONES, getPct, pctColor } from "../../utils/statHelpers";
import { C, FONT_BODY, card } from "../../theme";
import { SectionHeader } from "../layout/PageShell";

export default function ZoneStatsPanel({ zoneData }) {
  return (
    <div style={card}>
      <SectionHeader title="Statistik per Zona" sub="Masuk / percobaan di setiap zona" />

      <div style={{ display: "flex", flexDirection: "column" }}>
        {ZONES.map((z, i) => {
          const d   = zoneData[z.key];
          const pct = getPct(d.made, d.attempt);
          return (
            <div key={z.key} style={{ padding: "12px 0", borderTop: i ? `1px solid ${C.lineSoft}` : "none" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, marginBottom: 8 }}>
                <div style={{ minWidth: 0 }}>
                  <div style={{ color: C.text, fontWeight: 700, fontSize: 16, textTransform: "uppercase", letterSpacing: "0.03em" }}>{z.label}</div>
                  <div style={{ color: C.textSub, fontSize: 13, fontFamily: FONT_BODY }}>
                    {pct === null ? "belum ada data" : `${d.made.toLocaleString("id-ID")} / ${d.attempt.toLocaleString("id-ID")} masuk`}
                  </div>
                </div>
                <div style={{ fontSize: 24, fontWeight: 900, color: pct === null ? C.line : pctColor(pct), lineHeight: 1 }}>
                  {pct === null ? "—" : `${pct}%`}
                </div>
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
