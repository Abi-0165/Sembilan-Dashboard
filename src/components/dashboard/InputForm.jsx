import { useState } from "react";

const APPS_SCRIPT_URL = import.meta.env.VITE_APPS_SCRIPT_URL;

const inp = {
  background: "#050d09", border: "1px solid #1f3329", color: "#f0fdf4",
  padding: "10px 14px", borderRadius: 8, fontSize: 14, width: "100%",
  fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, outline: "none",
  boxSizing: "border-box",
};
const lbl = {
  fontSize: 10, color: "#4ade80", fontWeight: 700,
  letterSpacing: "0.1em", textTransform: "uppercase",
  marginBottom: 6, display: "block",
};

function Field({ label, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <span style={lbl}>{label}</span>
      {children}
    </div>
  );
}

// Fleksibel — baca nama dari kolom apapun di sheet players
function getPlayerName(p) {
  return p.name || p.nama || p.player_name || String(p.player_id);
}

const SHOOTING_ZONES = [
  { key: "corner_kiri",  label: "Corner Kiri"  },
  { key: "wing_kiri",   label: "Wing Kiri"    },
  { key: "top",         label: "Top"           },
  { key: "wing_kanan",  label: "Wing Kanan"   },
  { key: "corner_kanan",label: "Corner Kanan" },
];

const DEFAULT_SHOOTING = Object.fromEntries(
  SHOOTING_ZONES.flatMap(z => [
    [`${z.key}_masuk`, ""],
    [`${z.key}_percobaan`, ""],
  ])
);

const DEFAULT_RUNNING = {
  jarak_km: "", durasi_menit: "", pace_min_per_km: "", tipe: "Steady",
};

export default function InputForm({ players, onSuccess }) {
  const [formType,  setFormType]  = useState("shooting");
  const [playerId,  setPlayerId]  = useState("");
  const [date,      setDate]      = useState(() => new Date().toISOString().slice(0, 10));
  const [shooting,  setShooting]  = useState(DEFAULT_SHOOTING);
  const [running,   setRunning]   = useState(DEFAULT_RUNNING);
  const [status,    setStatus]    = useState(null); // null | "loading" | "ok" | "error"
  const [errMsg,    setErrMsg]    = useState("");

  const selectedPlayer = players.find(p => String(p.player_id) === String(playerId));

  // Support kolom "name" atau "nama" di sheet players
  function getPlayerName(p) {
    return p?.name || p?.nama || p?.player_name || String(p?.player_id || "");
  }

  function resetForm() {
    setPlayerId("");
    setDate(new Date().toISOString().slice(0, 10));
    setShooting(DEFAULT_SHOOTING);
    setRunning(DEFAULT_RUNNING);
    setStatus(null);
  }

  async function handleSubmit() {
    if (!playerId) { setErrMsg("Pilih pemain dulu"); setStatus("error"); return; }
    if (!date)     { setErrMsg("Tanggal wajib diisi"); setStatus("error"); return; }

    // Validasi shooting — field kosong = 0, boleh. Hanya cek masuk <= percobaan
    if (formType === "shooting") {
      for (const z of SHOOTING_ZONES) {
        const masuk     = Number(shooting[`${z.key}_masuk`])     || 0;
        const percobaan = Number(shooting[`${z.key}_percobaan`]) || 0;
        if (masuk > percobaan && percobaan > 0) {
          setErrMsg(`${z.label}: masuk (${masuk}) tidak boleh lebih dari percobaan (${percobaan})`);
          setStatus("error");
          return;
        }
      }
    }

    // Validasi running
    if (formType === "running") {
      if (!running.jarak_km || !running.durasi_menit || !running.pace_min_per_km) {
        setErrMsg("Semua field lari wajib diisi"); setStatus("error"); return;
      }
    }

    setStatus("loading");
    setErrMsg("");

    const payload = formType === "shooting"
      ? {
          type: "shooting",
          date,
          player_name: selectedPlayer.name || selectedPlayer.nama || selectedPlayer.player_name || String(selectedPlayer.player_id),
          player_id:   selectedPlayer.player_id,
          ...Object.fromEntries(
            Object.entries(shooting).map(([k, v]) => [k, Number(v) || 0])
          ),
        }
      : {
          type: "running",
          date,
          player_name:     selectedPlayer.name || selectedPlayer.nama || selectedPlayer.player_name || String(selectedPlayer.player_id),
          player_id:       selectedPlayer.player_id,
          jarak_km:        running.jarak_km,
          durasi_menit:    running.durasi_menit,
          pace_min_per_km: running.pace_min_per_km,
          tipe:            running.tipe,
        };

    try {
      // Apps Script tidak support CORS preflight — pakai no-cors
      // Response tidak bisa dibaca, tapi data tetap masuk ke Sheets
      await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(payload),
      });
      // Dengan no-cors, selalu anggap sukses kalau tidak throw
      setStatus("ok");
      if (onSuccess) onSuccess(formType);
      setTimeout(resetForm, 2000);
    } catch (err) {
      setStatus("error");
      setErrMsg(err.message || "Gagal konek ke server");
    }
  }

  return (
    <>
      <style>{`
        .form-wrap { background: #0d1f14; border: 1px solid #1f3329; border-radius: 12px; padding: 28px; }
        .type-tabs { display: flex; gap: 8px; margin-bottom: 24px; }
        .type-tab  { flex: 1; padding: 10px; border-radius: 8px; font-size: 14px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; cursor: pointer; font-family: 'Barlow Condensed', sans-serif; border: 1px solid #1f3329; background: none; color: #6b7280; transition: all 0.15s; }
        .type-tab.active { background: #16a34a22; border-color: #16a34a55; color: #4ade80; }
        .form-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px; }
        .form-grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin-bottom: 14px; }
        .zone-section { background: #050d09; border: 1px solid #1f3329; border-radius: 10px; padding: 16px; margin-bottom: 14px; }
        .zone-label { font-size: 11px; color: #4ade80; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 12px; font-family: 'Barlow Condensed', sans-serif; }
        .submit-btn { width: 100%; background: linear-gradient(135deg, #16a34a, #15803d); color: white; border: none; padding: 14px; border-radius: 8px; font-size: 15px; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; font-family: 'Barlow Condensed', sans-serif; margin-top: 8px; transition: opacity 0.2s; }
        .submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        @media (max-width: 600px) {
          .form-grid-2 { grid-template-columns: 1fr; }
          .form-grid-3 { grid-template-columns: 1fr 1fr; }
          .form-wrap { padding: 20px 16px; }
        }
        @media (max-width: 380px) {
          .form-grid-3 { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="form-wrap">
        {/* Type selector */}
        <div className="type-tabs">
          {[{ id: "shooting", label: "🏀 Shooting" }, { id: "running", label: "🏃 Lari" }].map(t => (
            <button key={t.id} className={`type-tab ${formType === t.id ? "active" : ""}`}
              onClick={() => { setFormType(t.id); setStatus(null); setErrMsg(""); }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Player + Date */}
        <div className="form-grid-2">
          <Field label="Pemain">
            <select value={playerId} onChange={e => setPlayerId(e.target.value)} style={inp}>
              <option value="">— Pilih Pemain —</option>
              {players.map(p => (
                <option key={p.player_id} value={String(p.player_id)}>{getPlayerName(p)}</option>
              ))}
            </select>
          </Field>
          <Field label="Tanggal">
            <input type="date" value={date} onChange={e => setDate(e.target.value)} style={inp} />
          </Field>
        </div>

        {/* ── SHOOTING FORM ── */}
        {formType === "shooting" && (
          <div>
            {SHOOTING_ZONES.map(z => (
              <div key={z.key} className="zone-section">
                <div className="zone-label">{z.label}</div>
                <div className="form-grid-2">
                  <Field label="Masuk">
                    <input type="number" min="0" placeholder="0"
                      value={shooting[`${z.key}_masuk`]}
                      onChange={e => setShooting(prev => ({ ...prev, [`${z.key}_masuk`]: e.target.value }))}
                      style={inp} />
                  </Field>
                  <Field label="Percobaan">
                    <input type="number" min="0" placeholder="0"
                      value={shooting[`${z.key}_percobaan`]}
                      onChange={e => setShooting(prev => ({ ...prev, [`${z.key}_percobaan`]: e.target.value }))}
                      style={inp} />
                  </Field>
                </div>
                {/* Preview % */}
                {shooting[`${z.key}_percobaan`] > 0 && (
                  <div style={{ fontSize: 12, color: "#4ade80", marginTop: 4, fontWeight: 700 }}>
                    {Math.round((shooting[`${z.key}_masuk`] / shooting[`${z.key}_percobaan`]) * 100) || 0}% FG
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ── RUNNING FORM ── */}
        {formType === "running" && (
          <div>
            <div className="form-grid-3">
              <Field label="Jarak (km)">
                <input type="text" placeholder="5,01"
                  value={running.jarak_km}
                  onChange={e => setRunning(prev => ({ ...prev, jarak_km: e.target.value }))}
                  style={inp} />
              </Field>
              <Field label="Durasi (mnt)">
                <input type="text" placeholder="28,03"
                  value={running.durasi_menit}
                  onChange={e => setRunning(prev => ({ ...prev, durasi_menit: e.target.value }))}
                  style={inp} />
              </Field>
              <Field label="Pace (mm:ss)">
                <input type="text" placeholder="5:35"
                  value={running.pace_min_per_km}
                  onChange={e => setRunning(prev => ({ ...prev, pace_min_per_km: e.target.value }))}
                  style={inp} />
              </Field>
            </div>
            <Field label="Tipe Lari">
              <select value={running.tipe} onChange={e => setRunning(prev => ({ ...prev, tipe: e.target.value }))} style={inp}>
                <option value="Steady">Steady</option>
                <option value="Interval">Interval</option>
                <option value="Sprint">Sprint</option>
              </select>
            </Field>
          </div>
        )}

        {/* Status */}
        {status === "error" && (
          <div style={{ background: "#ef444422", border: "1px solid #ef444455", borderRadius: 8, padding: "10px 14px", marginTop: 14, color: "#f87171", fontSize: 13, fontWeight: 600 }}>
            ✕ {errMsg}
          </div>
        )}
        {status === "ok" && (
          <div style={{ background: "#16a34a22", border: "1px solid #16a34a55", borderRadius: 8, padding: "10px 14px", marginTop: 14, color: "#4ade80", fontSize: 13, fontWeight: 600 }}>
            ✓ Data berhasil disimpan ke Google Sheets!
          </div>
        )}

        {/* Submit */}
        <button
          className="submit-btn"
          onClick={handleSubmit}
          disabled={status === "loading" || status === "ok"}
        >
          {status === "loading" ? "Menyimpan..." : status === "ok" ? "✓ Tersimpan!" : `Simpan Data ${formType === "shooting" ? "Shooting" : "Lari"} →`}
        </button>
      </div>
    </>
  );
}