import { pctColor } from "../../utils/statHelpers";
import { C, FONT_HEAD, card } from "../../theme";

export default function SummaryCards({ summary }) {
  const { overallPct, totalMade, totalShots, sessionCount, bestZone } = summary;
  const cards = [
    { label: "Field Goal %",   value: overallPct === null ? "—" : `${overallPct}%`, sub: `${totalMade}/${totalShots} masuk`, color: pctColor(overallPct) },
    { label: "Total Tembakan", value: totalShots,   sub: "percobaan",     color: C.text },
    { label: "Sesi",           value: sessionCount, sub: "sesi shooting", color: C.text },
    { label: "Zona Terbaik",   value: bestZone ? `${bestZone.pct}%` : "—", sub: bestZone ? bestZone.label : "belum ada data", color: C.primary },
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12, marginBottom: 24 }}>
      {cards.map((c) => (
        <div key={c.label} style={{ ...card, padding: "16px 18px" }}>
          <div style={{ fontSize: 11, color: C.textSub, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8, fontFamily: FONT_HEAD, fontWeight: 700 }}>{c.label}</div>
          <div style={{ fontSize: 30, fontWeight: 900, color: c.color, lineHeight: 1, fontFamily: FONT_HEAD }}>{c.value}</div>
          <div style={{ fontSize: 12, color: C.textSub, marginTop: 4 }}>{c.sub}</div>
        </div>
      ))}
    </div>
  );
}
