import { pctColor } from "../../utils/statHelpers";

export default function SummaryCards({ summary }) {
  const cards = [
    { label: "Field Goal %",   value: `${summary.overallPct}%`,  sub: `${summary.totalMade}/${summary.totalShots} masuk`, color: pctColor(summary.overallPct) },
    { label: "Total Tembakan", value: summary.totalShots,         sub: "percobaan",       color: "#60a5fa" },
    { label: "Total Lari",     value: `${summary.totalKm} km`,   sub: "kumulatif",       color: "#a78bfa" },
    { label: "Avg Pace",       value: summary.avgPace,            sub: "min/km",          color: "#fb923c" },
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 14, marginBottom: 24 }}>
      {cards.map((c, i) => (
        <div key={i} style={{ background: "#0d1f14", border: "1px solid #1f3329", borderRadius: 10, padding: "18px 20px" }}>
          <div style={{ fontSize: 11, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>{c.label}</div>
          <div style={{ fontSize: 30, fontWeight: 900, color: c.color, lineHeight: 1 }}>{c.value}</div>
          <div style={{ fontSize: 12, color: "#4b5563", marginTop: 4 }}>{c.sub}</div>
        </div>
      ))}
    </div>
  );
}