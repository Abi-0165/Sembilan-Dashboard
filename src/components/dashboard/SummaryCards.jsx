import { C, FONT_HEAD, FONT_BODY, card } from "../../theme";

const fmt = (n) => n.toLocaleString("id-ID");

export default function SummaryCards({ summary }) {
  const { overallPct, totalMade, totalShots, sessionCount, bestZone } = summary;
  const cards = [
    { label: "Field Goal %",   value: overallPct === null ? "—" : `${overallPct}%`, sub: `${fmt(totalMade)} dari ${fmt(totalShots)} masuk`, hero: true, pct: overallPct },
    { label: "Total Tembakan", value: fmt(totalShots),   sub: "percobaan" },
    { label: "Sesi",           value: fmt(sessionCount), sub: "sesi shooting" },
    { label: "Zona Terbaik",   value: bestZone ? `${bestZone.pct}%` : "—", sub: bestZone ? bestZone.label : "belum ada data", accent: true },
  ];

  return (
    <div className="grid-kpi">
      {cards.map((c) => (
        <div key={c.label} style={{
          ...card, padding: "16px 18px", display: "flex", flexDirection: "column",
          ...(c.hero && { background: `linear-gradient(140deg, ${C.brand}, ${C.brandDeep})`, border: `1px solid ${C.brandDeep}`, color: C.white }),
        }}>
          <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: FONT_HEAD, fontWeight: 700, color: c.hero ? "#FFFFFFCC" : C.textSub }}>
            {c.label}
          </div>
          <div style={{ fontSize: "clamp(30px, 5vw, 40px)", fontWeight: 900, lineHeight: 1, fontFamily: FONT_HEAD, marginTop: 10, color: c.hero ? C.white : c.accent ? C.primary : C.text }}>
            {c.value}
          </div>
          <div style={{ fontSize: 13, marginTop: 6, fontFamily: FONT_BODY, color: c.hero ? "#FFFFFFCC" : C.textSub, overflowWrap: "anywhere" }}>
            {c.sub}
          </div>
          {c.hero && (
            <div style={{ height: 6, background: "#FFFFFF26", borderRadius: 3, marginTop: 14, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${c.pct ?? 0}%`, background: C.white, borderRadius: 3, transition: "width 0.4s" }} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
