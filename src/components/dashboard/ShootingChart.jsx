import { useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { ZONES, getPct } from "../../utils/statHelpers";

const ZONE_COLORS = {
  corner_kiri:  "#4ade80",
  wing_kiri:    "#60a5fa",
  top:          "#f472b6",
  wing_kanan:   "#fb923c",
  corner_kanan: "#a78bfa",
  overall:      "#fbbf24",
};

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#0d1f14", border: "1px solid #1f3329", borderRadius: 8, padding: "10px 14px", fontSize: 13, fontFamily: "'Barlow Condensed', sans-serif", minWidth: 160 }}>
      <div style={{ color: "#4ade80", fontWeight: 700, marginBottom: 6 }}>{label}</div>
      {payload.map((p) => (
        <div key={p.dataKey} style={{ color: p.color, marginBottom: 2, display: "flex", justifyContent: "space-between", gap: 16 }}>
          <span>{p.name}</span>
          <strong>{p.value !== null ? `${p.value}%` : "—"}</strong>
        </div>
      ))}
    </div>
  );
}

function ZoneToggle({ zoneKey, label, active, color, onClick }) {
  return (
    <button onClick={onClick} style={{
      display: "flex", alignItems: "center", gap: 6,
      background: active ? color + "22" : "none",
      border: `1px solid ${active ? color + "66" : "#1f3329"}`,
      color: active ? color : "#4b5563",
      padding: "4px 10px", borderRadius: 6,
      fontSize: 11, fontWeight: 700, letterSpacing: "0.05em",
      textTransform: "uppercase", cursor: "pointer",
      fontFamily: "'Barlow Condensed', sans-serif",
      transition: "all 0.15s",
    }}>
      <div style={{ width: 8, height: 8, borderRadius: "50%", background: active ? color : "#4b5563", flexShrink: 0 }} />
      {label}
    </button>
  );
}

export default function ShootingChart({ data }) {
  // Semua zona + overall aktif by default
  const allKeys = ["overall", ...ZONES.map(z => z.key)];
  const [activeZones, setActiveZones] = useState(new Set(["overall"]));

  function toggleZone(key) {
    setActiveZones(prev => {
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

  // Agregasi data per tanggal → % per zona
  const dates = [...new Set(data.map(d => d.date))].sort();

  const chartData = dates.map(date => {
    const rows = data.filter(d => d.date === date);
    const point = { date };

    // Overall FG%
    let totalMade = 0, totalAttempt = 0;
    ZONES.forEach(z => {
      totalMade    += rows.reduce((s, d) => s + (Number(d[z.made])    || 0), 0);
      totalAttempt += rows.reduce((s, d) => s + (Number(d[z.attempt]) || 0), 0);
    });
    point.overall = totalAttempt ? getPct(totalMade, totalAttempt) : null;

    // Per zona
    ZONES.forEach(z => {
      const made    = rows.reduce((s, d) => s + (Number(d[z.made])    || 0), 0);
      const attempt = rows.reduce((s, d) => s + (Number(d[z.attempt]) || 0), 0);
      point[z.key]  = attempt ? getPct(made, attempt) : null;
    });

    return point;
  });

  const TOGGLE_ITEMS = [
    { key: "overall", label: "Overall" },
    ...ZONES.map(z => ({ key: z.key, label: z.label })),
  ];

  return (
    <div style={{ background: "#0d1f14", border: "1px solid #1f3329", borderRadius: 12, padding: 24 }}>
      {/* Header */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 12, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>
          Tren Field Goal % per Sesi
        </div>
        {/* Zone toggles */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {TOGGLE_ITEMS.map(({ key, label }) => (
            <ZoneToggle
              key={key}
              zoneKey={key}
              label={label}
              active={activeZones.has(key)}
              color={ZONE_COLORS[key]}
              onClick={() => toggleZone(key)}
            />
          ))}
        </div>
      </div>

      {/* Chart */}
      {chartData.length === 0 ? (
        <div style={{ height: 220, display: "flex", alignItems: "center", justifyContent: "center", color: "#6b7280", fontSize: 14 }}>
          Tidak ada data untuk filter ini
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={chartData} margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f3329" />
            <XAxis
              dataKey="date"
              tick={{ fill: "#6b7280", fontSize: 11, fontFamily: "'Barlow Condensed', sans-serif" }}
              tickLine={false}
              axisLine={{ stroke: "#1f3329" }}
            />
            <YAxis
              domain={[0, 100]}
              tickFormatter={v => `${v}%`}
              tick={{ fill: "#6b7280", fontSize: 11, fontFamily: "'Barlow Condensed', sans-serif" }}
              tickLine={false}
              axisLine={false}
              width={40}
            />
            <Tooltip content={<CustomTooltip />} />
            {TOGGLE_ITEMS.filter(({ key }) => activeZones.has(key)).map(({ key, label }) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                name={label}
                stroke={ZONE_COLORS[key]}
                strokeWidth={key === "overall" ? 2.5 : 1.8}
                strokeDasharray={key === "overall" ? "0" : "4 2"}
                dot={{ r: 3, fill: ZONE_COLORS[key] }}
                activeDot={{ r: 5 }}
                connectNulls={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      )}

      {/* Legend hint */}
      <div style={{ marginTop: 10, fontSize: 11, color: "#374151", fontFamily: "'Barlow Condensed', sans-serif" }}>
        Overall = garis solid · Zona = garis putus-putus · Klik toggle untuk tampil/sembunyikan
      </div>
    </div>
  );
}