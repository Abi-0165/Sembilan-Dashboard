import { isoDaysAgo } from "../../utils/statHelpers";
import { C, FONT_HEAD, SHADOW, card, input, fieldLabel } from "../../theme";

// Rentang dihitung saat render supaya "hari ini" selalu tanggal lokal terbaru
function presets() {
  const today = isoDaysAgo(0);
  return [
    { id: "all", label: "Semua",   from: "",             to: ""    },
    { id: "30",  label: "30 Hari", from: isoDaysAgo(29), to: today },
    { id: "7",   label: "7 Hari",  from: isoDaysAgo(6),  to: today },
  ];
}

export default function FilterBar({ players, selectedPlayer, dateFrom, dateTo, onChange, onReset, isDefault }) {
  const ranges = presets();
  const activePreset = ranges.find((r) => r.from === dateFrom && r.to === dateTo)?.id;

  return (
    <div style={{ ...card, padding: 16 }}>
      <style>{`
        .filter-grid { display: grid; gap: 14px; grid-template-columns: minmax(0, 1fr); align-items: end; }
        .filter-dates { display: grid; gap: 10px; grid-template-columns: 1fr 1fr; }
        @media (min-width: 900px) { .filter-grid { grid-template-columns: minmax(180px, 1fr) auto minmax(300px, 1.3fr) auto; } }
        .preset { display: flex; gap: 4px; padding: 4px; background: ${C.lineSoft}; border-radius: 12px; }
        .preset-btn { flex: 1; background: none; border: none; padding: 8px 14px; border-radius: 9px; font-family: ${FONT_HEAD}; font-size: 14px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; color: ${C.textSub}; cursor: pointer; white-space: nowrap; min-height: 34px; }
        .preset-btn.active { background: ${C.surface}; color: ${C.primary}; box-shadow: ${SHADOW}; }
      `}</style>

      <div className="filter-grid">
        <div>
          <label htmlFor="filter-player" style={fieldLabel}>Pemain</label>
          <select id="filter-player" value={selectedPlayer} onChange={(e) => onChange({ selectedPlayer: e.target.value })} style={input}>
            <option value="ALL">Semua Pemain</option>
            {players.map((p) => (
              <option key={p.player_id} value={String(p.player_id)}>{p.player_name}</option>
            ))}
          </select>
        </div>

        <div>
          <span style={fieldLabel}>Periode</span>
          <div className="preset" role="group" aria-label="Periode">
            {ranges.map((r) => (
              <button key={r.id} className={`preset-btn ${activePreset === r.id ? "active" : ""}`}
                aria-pressed={activePreset === r.id} onClick={() => onChange({ dateFrom: r.from, dateTo: r.to })}>
                {r.label}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-dates">
          <div>
            <label htmlFor="filter-from" style={fieldLabel}>Dari</label>
            <input id="filter-from" type="date" value={dateFrom} max={dateTo || undefined}
              onChange={(e) => onChange({ dateFrom: e.target.value })} style={input} />
          </div>
          <div>
            <label htmlFor="filter-to" style={fieldLabel}>Sampai</label>
            <input id="filter-to" type="date" value={dateTo} min={dateFrom || undefined}
              onChange={(e) => onChange({ dateTo: e.target.value })} style={input} />
          </div>
        </div>

        <button onClick={onReset} disabled={isDefault}
          style={{ background: "none", border: "none", color: isDefault ? C.line : C.primary, fontFamily: FONT_HEAD, fontSize: 14, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", cursor: isDefault ? "default" : "pointer", padding: "10px 4px", justifySelf: "start" }}>
          Reset
        </button>
      </div>
    </div>
  );
}
