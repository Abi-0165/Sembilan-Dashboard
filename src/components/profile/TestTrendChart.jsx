import { useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { teamAverageByRound, unitShort } from "../../utils/physicalScore";
import { fmtNum } from "../../utils/statHelpers";
import { C, FONT_HEAD, FONT_BODY, card, sectionLabel, input } from "../../theme";

const tick = { fill: C.textSub, fontSize: 11, fontFamily: FONT_HEAD };

function TrendTooltip({ active, payload, label, unit }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: C.surface, border: `1px solid ${C.line}`, borderRadius: 8, padding: "8px 12px", fontSize: 13, fontFamily: FONT_HEAD, color: C.text }}>
      <div style={{ fontWeight: 800, marginBottom: 4 }}>{label}</div>
      {payload.map((p) => (
        <div key={p.dataKey} style={{ display: "flex", justifyContent: "space-between", gap: 14 }}>
          <span style={{ color: p.dataKey === "pemain" ? C.primary : C.muted }}>{p.name}</span>
          <strong>{p.value === null || p.value === undefined ? "—" : `${fmtNum(p.value)} ${unit}`}</strong>
        </div>
      ))}
    </div>
  );
}

// Sumbu X = putaran tes (nama_tes), sumbu Y = nilai mentah.
// lower_better → sumbu Y dibalik, jadi garis naik selalu berarti membaik.
export default function TestTrendChart({ rounds, physical, activeIds, benchmarks, schedule, playerName }) {
  const [testKey, setTestKey] = useState(benchmarks[0]?.test_key);
  const bench = benchmarks.find((b) => b.test_key === testKey) || benchmarks[0];
  if (!bench) return null;

  const unit = unitShort(bench.satuan);
  const reversed = bench.arah === "lower_better";
  const teamAvg = teamAverageByRound(physical, activeIds, bench.test_key);

  // Putaran dari test_schedule; kalau kosong, pakai putaran yang muncul di data
  const roundList = schedule.length
    ? schedule.map((s) => ({ round: s.test_round, name: s.nama_tes || `Tes ${s.test_round}` }))
    : [...new Set(physical.map((r) => r.test_round))].sort((a, b) => a - b).map((r) => ({ round: r, name: `Tes ${r}` }));

  const data = roundList.map(({ round, name }) => ({
    name,
    pemain: rounds.find((r) => r.test_round === round)?.[bench.test_key] ?? null,
    tim:    teamAvg[round] ?? null,
  }));

  return (
    <div style={card}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 12, flexWrap: "wrap", marginBottom: 14 }}>
        <div>
          <div style={sectionLabel}>Perkembangan per Tes</div>
          <div style={{ fontSize: 12, color: C.textSub, fontFamily: FONT_BODY, marginTop: 2 }}>
            Garis naik = membaik{reversed && " (sumbu waktu dibalik: makin cepat makin atas)"}
          </div>
        </div>
        <select aria-label="Pilih tes" value={bench.test_key} onChange={(e) => setTestKey(e.target.value)}
          style={{ ...input, width: "auto", minWidth: 180 }}>
          {benchmarks.map((b) => <option key={b.test_key} value={b.test_key}>{b.label}</option>)}
        </select>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={C.lineSoft} />
          <XAxis dataKey="name" tick={tick} tickLine={false} axisLine={{ stroke: C.line }}
            interval={0} angle={-20} textAnchor="end" height={52} />
          <YAxis reversed={reversed} domain={["auto", "auto"]} tick={tick} tickLine={false} axisLine={false}
            width={48} tickFormatter={(v) => fmtNum(v)}
            label={{ value: unit, angle: -90, position: "insideLeft", fill: C.textSub, fontSize: 11, dy: 20 }} />
          <Tooltip content={<TrendTooltip unit={unit} />} />
          <Line type="monotone" dataKey="tim" name="Rata-rata tim" stroke={C.muted} strokeDasharray="5 4"
            strokeWidth={2} dot={{ r: 3, fill: C.muted }} connectNulls={false} isAnimationActive={false} />
          <Line type="monotone" dataKey="pemain" name={playerName} stroke={C.primary} strokeWidth={3}
            dot={{ r: 4, fill: C.primary }} activeDot={{ r: 6 }} connectNulls={false} isAnimationActive={false} />
        </LineChart>
      </ResponsiveContainer>

      <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center", fontSize: 12, color: C.textSub, marginTop: 4 }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <svg width="22" height="8"><line x1="0" y1="4" x2="22" y2="4" stroke={C.primary} strokeWidth="3" /></svg>{playerName}
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <svg width="22" height="8"><line x1="0" y1="4" x2="22" y2="4" stroke={C.muted} strokeWidth="2" strokeDasharray="5 3" /></svg>Rata-rata tim (pemain aktif)
        </span>
      </div>
    </div>
  );
}
