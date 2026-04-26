import { parseNum } from "../../utils/statHelpers";

const TIPE_COLOR = { Sprint: "#f97316", Interval: "#eab308", Steady: "#4ade80" };

export default function RunningTable({ data }) {
  return (
    <div style={{ background: "#0d1f14", border: "1px solid #1f3329", borderRadius: 12, overflow: "hidden" }}>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, fontFamily: "'Barlow Condensed', sans-serif" }}>
          <thead>
            <tr>
              {["Tanggal", "Pemain", "Jarak (km)", "Durasi (mnt)", "Pace", "Tipe"].map((h) => (
                <th key={h} style={{ padding: "10px 14px", textAlign: "left", color: "#4ade80", fontWeight: 700, fontSize: 11, borderBottom: "1px solid #1f3329", letterSpacing: "0.06em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr><td colSpan={6} style={{ padding: 28, textAlign: "center", color: "#6b7280" }}>Tidak ada data untuk filter ini</td></tr>
            ) : (
              data.map((row, i) => {
                const tipe  = row.tipe || row.tipe_lari || "—";
                const color = TIPE_COLOR[tipe] || "#9ca3af";
                return (
                  <tr key={i} style={{ borderBottom: "1px solid #0a1a10", background: i % 2 === 0 ? "transparent" : "#0a180f" }}>
                    <td style={{ padding: "9px 14px", color: "#9ca3af" }}>{row.date}</td>
                    {/* Gunakan player_name langsung dari sheet */}
                    <td style={{ padding: "9px 14px", color: "#f0fdf4", fontWeight: 600 }}>{row.player_name || row.player_id}</td>
                    <td style={{ padding: "9px 14px", color: "#86efac", fontWeight: 700 }}>{parseNum(row.jarak_km).toFixed(2)}</td>
                    <td style={{ padding: "9px 14px", color: "#d1d5db" }}>{parseNum(row.durasi_menit).toFixed(0)}</td>
                    <td style={{ padding: "9px 14px", color: "#d1d5db" }}>{row.pace_min_per_km || row.pace || "—"}</td>
                    <td style={{ padding: "9px 14px" }}>
                      {tipe !== "—" ? (
                        <span style={{ background: color + "22", color, padding: "2px 8px", borderRadius: 4, fontSize: 11, fontWeight: 700 }}>{tipe}</span>
                      ) : "—"}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}