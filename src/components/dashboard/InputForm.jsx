import { useState } from "react";
import { ZONES, getPct, fmtDate } from "../../utils/statHelpers";
import { C, FONT_BODY, card, input, fieldLabel, primaryBtn } from "../../theme";

const APPS_SCRIPT_URL = import.meta.env.VITE_APPS_SCRIPT_URL;

// Tanggal lokal (bukan UTC) — supaya pagi hari di WIB tidak jadi tanggal kemarin
function todayLocal() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

const EMPTY_VALUES = Object.fromEntries(ZONES.flatMap((z) => [[z.made, ""], [z.attempt, ""]]));

// Kosong = 0. Selain itu harus bilangan bulat ≥ 0.
function parseCount(raw) {
  const s = String(raw).trim();
  if (s === "") return 0;
  return /^\d+$/.test(s) ? Number(s) : null;
}

function validate({ date, playerId, values }) {
  const errors = {};
  const counts = {};
  if (!date) errors.date = "Tanggal wajib diisi";
  if (!playerId) errors.player = "Pilih pemain";

  ZONES.forEach((z) => {
    const made = parseCount(values[z.made]);
    const att  = parseCount(values[z.attempt]);
    if (made === null) errors[z.made] = "Bilangan bulat ≥ 0";
    if (att === null)  errors[z.attempt] = "Bilangan bulat ≥ 0";
    if (made !== null && att !== null && made > att) errors[z.made] = "Masuk > percobaan";
    counts[z.made] = made;
    counts[z.attempt] = att;
  });

  const anyZone = ZONES.some((z) => (counts[z.attempt] || 0) > 0);
  if (!anyZone && !ZONES.some((z) => errors[z.made] || errors[z.attempt])) {
    errors.form = "Isi minimal satu zona (percobaan lebih dari 0)";
  }
  return { errors, counts };
}

function FieldError({ msg }) {
  if (!msg) return null;
  return <span role="alert" style={{ color: C.bad, fontSize: 12, fontWeight: 600, marginTop: 4, fontFamily: FONT_BODY }}>{msg}</span>;
}

function Banner({ tone, children }) {
  const tones = {
    error: { bg: C.badSoft,     bd: C.bad,     fg: C.bad },
    ok:    { bg: C.primarySoft, bd: C.primary, fg: C.primary },
    warn:  { bg: C.warnSoft,    bd: C.warn,    fg: C.warn },
  }[tone];
  return (
    <div style={{ background: tones.bg, border: `1px solid ${tones.bd}55`, borderRadius: 8, padding: "10px 14px", marginTop: 14, color: tones.fg, fontSize: 14, fontWeight: 600, fontFamily: FONT_BODY }}>
      {children}
    </div>
  );
}

// players = pemain aktif saja; existingRows = semua baris shooting (untuk cek duplikat)
export default function InputForm({ players, existingRows = [], onSaved }) {
  const [playerId, setPlayerId] = useState("");
  const [date,     setDate]     = useState(todayLocal);
  const [values,   setValues]   = useState(EMPTY_VALUES);
  const [errors,   setErrors]   = useState({});
  const [status,   setStatus]   = useState(null); // null | "confirm" | "loading" | "ok" | "error"
  const [errMsg,   setErrMsg]   = useState("");

  const selectedPlayer = players.find((p) => String(p.player_id) === String(playerId));

  function setValue(key, v) {
    setValues((prev) => ({ ...prev, [key]: v }));
    setErrors((prev) => ({ ...prev, [key]: undefined, form: undefined }));
    if (status === "ok" || status === "confirm") setStatus(null);
  }

  function handleSubmit() {
    const { errors: errs } = validate({ date, playerId, values });
    setErrors(errs);
    if (Object.keys(errs).length) { setStatus(null); return; }

    const isDuplicate = existingRows.some((r) => r.date === date && r.player_id === selectedPlayer.player_id);
    if (isDuplicate) { setStatus("confirm"); return; }
    save();
  }

  async function save() {
    const { counts } = validate({ date, playerId, values });
    setStatus("loading");
    setErrMsg("");

    const payload = {
      date,
      player_id:   selectedPlayer.player_id,
      player_name: selectedPlayer.player_name,
      ...counts,
    };

    try {
      if (!APPS_SCRIPT_URL) throw new Error("VITE_APPS_SCRIPT_URL belum diisi");
      // text/plain = simple request, tanpa CORS preflight, tapi respons tetap bisa dibaca
      const res = await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      });
      let result;
      try { result = await res.json(); } catch {
        throw new Error("Respons Apps Script tidak dikenali. Pastikan versi terbaru sudah di-deploy, dan cek sheet sebelum menyimpan ulang.");
      }
      if (!result.ok) throw new Error(result.error || "Gagal menyimpan");

      setValues(EMPTY_VALUES); // tanggal & pemain tetap
      setErrors({});
      if (onSaved) await onSaved(); // muat ulang data supaya heatmap & cek duplikat ikut terbaru
      setStatus("ok");
    } catch (err) {
      setStatus("error");
      setErrMsg(err.message || "Gagal konek ke server");
    }
  }

  const inputStyle = (key) => ({ ...input, borderColor: errors[key] ? C.bad : C.line });

  return (
    <>
      <style>{`
        .form-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        @media (max-width: 480px) { .form-grid-2.stack { grid-template-columns: 1fr; } }
      `}</style>

      <div style={card}>
        {/* Pemain + Tanggal */}
        <div className="form-grid-2 stack" style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor="in-player" style={fieldLabel}>Pemain</label>
            <select id="in-player" value={playerId}
              onChange={(e) => { setPlayerId(e.target.value); setErrors((p) => ({ ...p, player: undefined })); setStatus(null); }}
              style={inputStyle("player")}>
              <option value="">— Pilih Pemain —</option>
              {players.map((p) => (
                <option key={p.player_id} value={String(p.player_id)}>{p.player_name}</option>
              ))}
            </select>
            <FieldError msg={errors.player} />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor="in-date" style={fieldLabel}>Tanggal</label>
            <input id="in-date" type="date" value={date}
              onChange={(e) => { setDate(e.target.value); setErrors((p) => ({ ...p, date: undefined })); setStatus(null); }}
              style={inputStyle("date")} />
            <FieldError msg={errors.date} />
          </div>
        </div>

        {/* Zona */}
        {ZONES.map((z) => {
          const made = parseCount(values[z.made]);
          const att  = parseCount(values[z.attempt]);
          const pct  = made !== null && att !== null && made <= att ? getPct(made, att) : null;
          return (
            <div key={z.key} style={{ border: `1px solid ${C.line}`, borderRadius: 10, padding: 14, marginBottom: 10, background: C.bg }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
                <span style={{ fontSize: 13, color: C.accent, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase" }}>{z.label}</span>
                <span style={{ fontSize: 13, color: pct === null ? C.textSub : C.primary, fontWeight: 700 }}>
                  {pct === null ? "—" : `${pct}% FG`}
                </span>
              </div>
              <div className="form-grid-2">
                {[[z.made, "Masuk"], [z.attempt, "Percobaan"]].map(([key, label]) => (
                  <div key={key} style={{ display: "flex", flexDirection: "column" }}>
                    <label htmlFor={`in-${key}`} style={{ ...fieldLabel, color: C.textSub }}>{label}</label>
                    <input id={`in-${key}`} type="number" inputMode="numeric" min="0" step="1" placeholder="0"
                      value={values[key]} onChange={(e) => setValue(key, e.target.value)}
                      style={inputStyle(key)} />
                    <FieldError msg={errors[key]} />
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {errors.form && <Banner tone="error">✕ {errors.form}</Banner>}
        {status === "error" && <Banner tone="error">✕ {errMsg}</Banner>}
        {status === "ok" && <Banner tone="ok">✓ Data tersimpan ke Google Sheets. Heatmap sudah dimuat ulang.</Banner>}

        {status === "confirm" ? (
          <Banner tone="warn">
            Data {selectedPlayer?.player_name} di tanggal {fmtDate(date)} sudah ada. Tetap simpan?
            <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
              <button onClick={save} style={{ ...primaryBtn, padding: "9px 16px", fontSize: 13 }}>Tetap simpan</button>
              <button onClick={() => setStatus(null)} style={{ ...primaryBtn, padding: "9px 16px", fontSize: 13, background: C.surface, color: C.text, border: `1px solid ${C.line}` }}>Batal</button>
            </div>
          </Banner>
        ) : (
          <button onClick={handleSubmit} disabled={status === "loading"}
            style={{ ...primaryBtn, width: "100%", marginTop: 14, opacity: status === "loading" ? 0.6 : 1, cursor: status === "loading" ? "wait" : "pointer" }}>
            {status === "loading" ? "Menyimpan..." : "Simpan Data Shooting →"}
          </button>
        )}
      </div>
    </>
  );
}
