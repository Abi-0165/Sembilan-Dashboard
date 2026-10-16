import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  Tooltip, ResponsiveContainer,
} from "recharts";
import { radarAxes, axisScores } from "../../utils/physicalScore";
import { C, FONT_HEAD, card } from "../../theme";
import { SectionHeader } from "../layout/PageShell";

function RadarTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: C.surface, border: `1px solid ${C.line}`, borderRadius: 8, padding: "8px 12px", fontSize: 13, fontFamily: FONT_HEAD, color: C.text }}>
      <div style={{ fontWeight: 800, marginBottom: 4 }}>{label}</div>
      {payload.map((p) => (
        <div key={p.dataKey} style={{ display: "flex", justifyContent: "space-between", gap: 14 }}>
          <span style={{ color: p.dataKey === "terbaru" ? C.primary : C.muted }}>{p.name}</span>
          <strong>{p.payload[p.dataKey] ?? "—"}</strong>
        </div>
      ))}
    </div>
  );
}

function scheduleName(schedule, round) {
  return schedule.find((s) => s.test_round === round)?.nama_tes || `Tes ${round}`;
}

// initial = putaran paling awal, latest = putaran terbaru (null kalau baru satu putaran)
export default function PhysicalRadar({ benchmarks, schedule, initial, latest }) {
  const axes = radarAxes(benchmarks);
  const awal    = axisScores(initial, benchmarks);
  const terbaru = latest ? axisScores(latest, benchmarks) : null;

  // Kalau baru satu putaran, satu seri saja (hijau)
  const single = !terbaru;
  const data = axes.map((axis) => ({
    axis,
    awal:    single ? null : awal[axis],
    terbaru: single ? awal[axis] : terbaru[axis],
  }));

  const legend = single
    ? [{ color: C.primary, dashed: false, text: scheduleName(schedule, initial.test_round) }]
    : [
        { color: C.muted,   dashed: true,  text: `Tes awal · ${scheduleName(schedule, initial.test_round)}` },
        { color: C.primary, dashed: false, text: `Tes terbaru · ${scheduleName(schedule, latest.test_round)}` },
      ];

  return (
    <div style={card}>
      <SectionHeader title="Skor Fisik" sub="Skala 0–100 dibanding patokan tim" style={{ marginBottom: 4 }} />
      <ResponsiveContainer width="100%" height={320}>
        <RadarChart data={data} outerRadius="72%" margin={{ top: 10, right: 24, bottom: 10, left: 24 }}>
          <PolarGrid stroke={C.line} />
          <PolarAngleAxis dataKey="axis" tick={{ fill: C.text, fontSize: 12, fontFamily: FONT_HEAD, fontWeight: 700 }} />
          <PolarRadiusAxis domain={[0, 100]} tickCount={5} angle={90} tick={{ fill: C.textSub, fontSize: 9 }} axisLine={false} />
          {!single && (
            <Radar name="Tes awal" dataKey="awal" stroke={C.muted} strokeDasharray="5 4" strokeWidth={2}
              fill={C.muted} fillOpacity={0.08} connectNulls isAnimationActive={false} />
          )}
          <Radar name={single ? "Skor" : "Tes terbaru"} dataKey="terbaru" stroke={C.primary} strokeWidth={2.5}
            fill={C.primary} fillOpacity={0.22} dot={{ r: 3, fill: C.primary }} connectNulls isAnimationActive={false} />
          <Tooltip content={<RadarTooltip />} />
        </RadarChart>
      </ResponsiveContainer>
      <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center", fontSize: 12, color: C.textSub }}>
        {legend.map((l) => (
          <span key={l.text} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <svg width="22" height="8"><line x1="0" y1="4" x2="22" y2="4" stroke={l.color} strokeWidth="2.5" strokeDasharray={l.dashed ? "5 3" : "0"} /></svg>
            {l.text}
          </span>
        ))}
      </div>
    </div>
  );
}
