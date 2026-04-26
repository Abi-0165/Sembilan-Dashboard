import { ZONES, getPct, pctColor } from "../../utils/statHelpers";

export default function ZoneStatsPanel({ zoneData }) {
  const max = Math.max(...ZONES.map((z) => getPct(zoneData[z.key].made, zoneData[z.key].attempt)), 1);

  return (
    <div style={{ background: "#0d1f14", border: "1px solid #1f3329", borderRadius: 12, padding: 24 }}>
      <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.08em" }}>
        Statistik per Zona
      </div>

      {/* Mini bar chart */}
      <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 64, marginBottom: 20 }}>
        {ZONES.map((z) => {
          const pct = getPct(zoneData[z.key].made, zoneData[z.key].attempt);
          return (
            <div key={z.key} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
              <span style={{ fontSize: 10, color: "#86efac", fontWeight: 700 }}>{pct}%</span>
              <div style={{ width: "100%", borderRadius: "3px 3px 0 0", height: `${(pct / max) * 40}px`, background: pctColor(pct), minHeight: 3, transition: "height 0.4s" }} />
              <span style={{ fontSize: 9, color: "#6b7280", textAlign: "center", lineHeight: 1.1 }}>{z.label}</span>
            </div>
          );
        })}
      </div>

      {/* Progress bars */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {ZONES.map((z) => {
          const d   = zoneData[z.key];
          const pct = getPct(d.made, d.attempt);
          return (
            <div key={z.key} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ width: 88, fontSize: 12, color: "#d1d5db", fontWeight: 600, flexShrink: 0 }}>{z.label}</span>
              <div style={{ flex: 1, height: 7, background: "#0f1f15", borderRadius: 4, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${pct}%`, background: pctColor(pct), borderRadius: 4, transition: "width 0.4s" }} />
              </div>
              <span style={{ width: 82, fontSize: 11, color: "#9ca3af", textAlign: "right", flexShrink: 0 }}>
                {d.made}/{d.attempt} ({pct}%)
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}