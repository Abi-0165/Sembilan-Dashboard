import { C, FONT_HEAD, card, input, fieldLabel } from "../../theme";

const inp = { ...input, width: "auto", minWidth: 150 };

export default function FilterBar({ players, selectedPlayer, dateFrom, dateTo, sessionCount, onChange }) {
  return (
    <div style={{ ...card, padding: "16px 18px", marginBottom: 20, display: "flex", gap: 14, flexWrap: "wrap", alignItems: "flex-end" }}>
      <div style={{ flex: "1 1 150px" }}>
        <label htmlFor="filter-player" style={fieldLabel}>Pemain</label>
        <select id="filter-player" value={selectedPlayer} onChange={(e) => onChange("selectedPlayer", e.target.value)} style={{ ...inp, width: "100%" }}>
          <option value="ALL">Semua Pemain</option>
          {players.map((p) => (
            <option key={p.player_id} value={String(p.player_id)}>{p.player_name}</option>
          ))}
        </select>
      </div>
      <div style={{ flex: "1 1 140px" }}>
        <label htmlFor="filter-from" style={fieldLabel}>Dari Tanggal</label>
        <input id="filter-from" type="date" value={dateFrom} onChange={(e) => onChange("dateFrom", e.target.value)} style={{ ...inp, width: "100%" }} />
      </div>
      <div style={{ flex: "1 1 140px" }}>
        <label htmlFor="filter-to" style={fieldLabel}>Sampai Tanggal</label>
        <input id="filter-to" type="date" value={dateTo} onChange={(e) => onChange("dateTo", e.target.value)} style={{ ...inp, width: "100%" }} />
      </div>
      <div style={{ marginLeft: "auto", textAlign: "right" }}>
        <div style={{ fontSize: 11, color: C.textSub }}>Sesi ditemukan</div>
        <div style={{ fontSize: 28, fontWeight: 900, color: C.primary, fontFamily: FONT_HEAD, lineHeight: 1 }}>{sessionCount}</div>
      </div>
    </div>
  );
}
