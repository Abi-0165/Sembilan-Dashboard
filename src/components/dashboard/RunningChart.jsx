import { useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { parseNum, parsePace } from "../../utils/statHelpers";

// Format pace desimal → "mm:ss" untuk label
function fmtPace(val) {
  if (!val) return "—";
  const min = Math.floor(val);
  const sec = Math.round((val - min) * 60);
  return `${min}:${String(sec).padStart(2, "0")}`;
}

// Custom tooltip
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#0d1f14", border: "1px solid #1f3329", borderRadius: 8, padding: "10px 14px", fontSize: 13, fontFamily: "'Barlow Condensed', sans-serif" }}>
      <div style={{ color: "#4ade80", fontWeight: 700, marginBottom: 6 }}>{label}</div>
      {payload.map((p) => (
        <div key={p.dataKey} style={{ color: p.color, marginBottom: 2 }}>
          {p.name}: <strong>
            {p.dataKey === "pace" ? fmtPace(p.value) : p.value}
            {p.dataKey === "jarak_km" ? " km" : p.dataKey === "durasi_menit" ? " mnt" : ""}
          </strong>
        </div>
      ))}
    </div>
  );
}

// Tab button
function Tab({ active, onClick, children }) {
  return (
    <button onClick={onClick} style={{
      background: active ? "#16a34a22" : "none",
      border: active ? "1px solid #16a34a55" : "1px solid transparent",
      color: active ? "#4ade80" : "#6b7280",
      padding: "5px 14px", borderRadius: 6,
      fontSize: 12, fontWeight: 700, letterSpacing: "0.06em",
      textTransform: "uppercase", cursor: "pointer",
    }}>
      {children}
    </button>
  );
}

// Warna per pemain
const PLAYER_COLORS = ["#4ade80","#60a5fa","#f472b6","#fb923c","#a78bfa","#34d399","#fbbf24"];

export default function RunningChart({ data, selectedPlayer }) {
  const [metric, setMetric] = useState("jarak_km");

  const METRICS = [
    { key: "jarak_km",      label: "Jarak (km)" },
    { key: "durasi_menit",  label: "Durasi (mnt)" },
    { key: "pace",          label: "Pace (min/km)" },
  ];

  // Siapkan data: parse angka, tambah field pace desimal
  const parsed = data.map((d) => ({
    ...d,
    jarak_km:     parseNum(d.jarak_km),
    durasi_menit: parseNum(d.durasi_menit),
    pace:         parsePace(d.pace_min_per_km),
  }));

  // Kalau filter "Semua Pemain" → tampilkan tiap pemain sebagai line terpisah
  // Kalau filter individual → satu line saja
  const isAll = selectedPlayer === "ALL";

  // Ambil semua tanggal unik, sorted
  const dates = [...new Set(parsed.map((d) => d.date))].sort();

  // Ambil semua pemain unik dari data
  const playerNames = [...new Set(parsed.map((d) => d.player_name || String(d.player_id)))];

  // Pivot data: per tanggal, tiap pemain jadi kolom
  const chartData = dates.map((date) => {
    const row = { date };
    if (isAll) {
      playerNames.forEach((name) => {
        const match = parsed.find((d) => d.date === date && (d.player_name || String(d.player_id)) === name);
        row[name] = match ? match[metric] : null;
      });
    } else {
      const match = parsed.find((d) => d.date === date);
      row["value"] = match ? match[metric] : null;
    }
    return row;
  });

  // Format label sumbu Y untuk pace
  const yFormatter = metric === "pace" ? fmtPace : (v) => v;

  return (
    <div style={{ background: "#0d1f14", border: "1px solid #1f3329", borderRadius: 12, padding: 24 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18, flexWrap: "wrap", gap: 10 }}>
        <div style={{ fontSize: 13, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.08em" }}>
          Tren Lari {!isAll && `— ${parsed[0]?.player_name || ""}`}
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {METRICS.map((m) => (
            <Tab key={m.key} active={metric === m.key} onClick={() => setMetric(m.key)}>{m.label}</Tab>
          ))}
        </div>
      </div>

      {/* Chart */}
      {chartData.length === 0 ? (
        <div style={{ height: 200, display: "flex", alignItems: "center", justifyContent: "center", color: "#6b7280", fontSize: 14 }}>
          Tidak ada data untuk filter ini
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={chartData} margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f3329" />
            <XAxis dataKey="date" tick={{ fill: "#6b7280", fontSize: 11, fontFamily: "'Barlow Condensed', sans-serif" }} tickLine={false} axisLine={{ stroke: "#1f3329" }} />
            <YAxis tickFormatter={yFormatter} tick={{ fill: "#6b7280", fontSize: 11, fontFamily: "'Barlow Condensed', sans-serif" }} tickLine={false} axisLine={false} width={42} />
            <Tooltip content={<CustomTooltip />} />
            {isAll && <Legend wrapperStyle={{ fontSize: 12, fontFamily: "'Barlow Condensed', sans-serif", paddingTop: 8 }} />}

            {isAll
              ? playerNames.map((name, i) => (
                  <Line key={name} type="monotone" dataKey={name} stroke={PLAYER_COLORS[i % PLAYER_COLORS.length]}
                    strokeWidth={2} dot={{ r: 3, fill: PLAYER_COLORS[i % PLAYER_COLORS.length] }}
                    activeDot={{ r: 5 }} connectNulls={false} />
                ))
              : <Line type="monotone" dataKey="value" name={METRICS.find(m => m.key === metric)?.label}
                  stroke="#4ade80" strokeWidth={2.5} dot={{ r: 4, fill: "#4ade80" }}
                  activeDot={{ r: 6 }} />
            }
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}