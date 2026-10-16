import { useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from "recharts";
import { ZONES, getPct, aggregateZones, fmtDate } from "../../utils/statHelpers";
import { C, FONT_HEAD, FONT_BODY, card, alpha } from "../../theme";
import { SectionHeader } from "../layout/PageShell";

const ZONE_COLORS = {
  overall:      C.primary,
  corner_kiri:  C.zone1,
  wing_kiri:    C.zone2,
  top:          C.zone3,
  wing_kanan:   C.zone4,
  corner_kanan: C.zone5,
};

const tick = { fill: C.textSub, fontSize: 11, fontFamily: FONT_HEAD };

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: C.surface, border: `1px solid ${C.line}`, borderRadius: 8, padding: "10px 14px", fontSize: 13, fontFamily: FONT_HEAD, minWidth: 160, color: C.text }}>
      <div style={{ fontWeight: 700, marginBottom: 6 }}>{fmtDate(label)}</div>
      {payload.map((p) => (
        <div key={p.dataKey} style={{ color: p.color, marginBottom: 2, display: "flex", justifyContent: "space-between", gap: 16 }}>
          <span>{p.name}</span>
          <strong>{p.value !== null && p.value !== undefined ? `${p.value}%` : "—"}</strong>
        </div>
      ))}
    </div>
  );
}

function ZoneToggle({ label, active, color, onClick }) {
  return (
    <button onClick={onClick} aria-pressed={active} style={{
      display: "flex", alignItems: "center", gap: 6,
      background: active ? alpha(color, 10) : C.surface,
      border: `1px solid ${active ? color : C.line}`,
      color: active ? color : C.textSub,
      padding: "6px 12px", borderRadius: 99, minHeight: 32,
      fontSize: 13, fontWeight: 700, letterSpacing: "0.04em",
      textTransform: "uppercase", cursor: "pointer",
      fontFamily: FONT_HEAD, transition: "all 0.15s",
    }}>
      <div style={{ width: 8, height: 8, borderRadius: "50%", background: active ? color : C.line, flexShrink: 0 }} />
      {label}
    </button>
  );
}

const TOGGLE_ITEMS = [
  { key: "overall", label: "Overall" },
  ...ZONES.map((z) => ({ key: z.key, label: z.label })),
];

export default function ShootingChart({ data }) {
  const [activeZones, setActiveZones] = useState(new Set(["overall"]));

  function toggleZone(key) {
    setActiveZones((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        if (next.size === 1) return prev; // minimal 1 aktif
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }

  // Agregasi per tanggal → % per zona (null kalau zona tidak dilatih hari itu)
  const dates = [...new Set(data.map((d) => d.date))].sort();
  const chartData = dates.map((date) => {
    const agg = aggregateZones(data.filter((d) => d.date === date));
    const point = { date };
    let made = 0, attempt = 0;
    ZONES.forEach((z) => {
      made += agg[z.key].made;
      attempt += agg[z.key].attempt;
      point[z.key] = getPct(agg[z.key].made, agg[z.key].attempt);
    });
    point.overall = getPct(made, attempt);
    return point;
  });

  return (
    <div style={card}>
      <div style={{ marginBottom: 18 }}>
        <SectionHeader title="Tren Field Goal %" sub="Rata-rata per tanggal latihan. Pilih zona untuk dibandingkan." style={{ marginBottom: 12 }} />
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {TOGGLE_ITEMS.map(({ key, label }) => (
            <ZoneToggle key={key} label={label} active={activeZones.has(key)}
              color={ZONE_COLORS[key]} onClick={() => toggleZone(key)} />
          ))}
        </div>
      </div>

      {chartData.length === 0 ? (
        <div style={{ height: 260, display: "flex", alignItems: "center", justifyContent: "center", color: C.textSub, fontSize: 14, fontFamily: FONT_BODY, background: C.bg, borderRadius: 12, border: `1px dashed ${C.line}` }}>
          Tidak ada data untuk filter ini
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={chartData} margin={{ top: 4, right: 12, left: -8, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.lineSoft} />
            <XAxis dataKey="date" tickFormatter={(d) => d.slice(5).split("-").reverse().join("/")}
              tick={tick} tickLine={false} axisLine={{ stroke: C.line }} />
            <YAxis domain={[0, 100]} tickFormatter={(v) => `${v}%`} tick={tick}
              tickLine={false} axisLine={false} width={40} />
            <Tooltip content={<CustomTooltip />} />
            {TOGGLE_ITEMS.filter(({ key }) => activeZones.has(key)).map(({ key, label }) => (
              <Line key={key} type="monotone" dataKey={key} name={label}
                stroke={ZONE_COLORS[key]}
                strokeWidth={key === "overall" ? 2.5 : 1.8}
                strokeDasharray={key === "overall" ? "0" : "4 2"}
                dot={{ r: 3, fill: ZONE_COLORS[key] }} activeDot={{ r: 5 }}
                connectNulls={false} isAnimationActive={false} />
            ))}
          </LineChart>
        </ResponsiveContainer>
      )}

      <div style={{ marginTop: 12, fontSize: 12, color: C.textSub, fontFamily: FONT_BODY }}>
        Overall = garis solid · Zona = garis putus-putus · Zona yang tidak dilatih (0/0) tidak digambar
      </div>
    </div>
  );
}
