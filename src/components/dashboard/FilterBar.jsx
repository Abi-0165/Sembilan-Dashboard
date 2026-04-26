const inp = { background: "#0d1f14", border: "1px solid #1f3329", color: "#f0fdf4", padding: "9px 14px", borderRadius: 8, fontSize: 14, fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, outline: "none" };
const lbl = { fontSize: 10, color: "#4ade80", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 };

export default function FilterBar({ players, selectedPlayer, dateFrom, dateTo, sessionCount, onChange }) {
  return (
    <div style={{ background: "#0a180f", border: "1px solid #1f3329", borderRadius: 12, padding: "18px 22px", marginBottom: 24, display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
      <div>
        <div style={lbl}>Pemain</div>
        <select id="filter-player" name="filter-player" value={selectedPlayer} onChange={(e) => onChange("selectedPlayer", e.target.value)} style={inp}>
          <option value="ALL">Semua Pemain</option>
          {players.map((p) => (
            <option key={p.player_id} value={String(p.player_id)}>{p.player_name}</option>
          ))}
        </select>
      </div>
      <div>
        <div style={lbl}>Dari Tanggal</div>
        <input id="filter-from" name="filter-from" type="date" value={dateFrom} onChange={(e) => onChange("dateFrom", e.target.value)} style={inp} />
      </div>
      <div>
        <div style={lbl}>Sampai Tanggal</div>
        <input id="filter-to" name="filter-to" type="date" value={dateTo} onChange={(e) => onChange("dateTo", e.target.value)} style={inp} />
      </div>
      <div style={{ marginLeft: "auto", textAlign: "right" }}>
        <div style={{ fontSize: 11, color: "#6b7280" }}>Sesi ditemukan</div>
        <div style={{ fontSize: 28, fontWeight: 900, color: "#4ade80" }}>{sessionCount}</div>
      </div>
    </div>
  );
}