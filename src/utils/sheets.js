import { ZONES } from "./statHelpers";

const API_KEY  = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY;
const SHEET_ID = import.meta.env.VITE_SHEET_ID;

export const TABS = {
  players:   "players",
  shooting:  "shooting_data",
  physical:  "physical_test",
  schedule:  "test_schedule",
  benchmark: "physical_benchmark",
};

// ── Parser dasar ────────────────────────────────────────────────

// Angka dari Sheets. UNFORMATTED_VALUE sudah memberi number, tapi sel teks
// berformat in_ID ("3,6" / "1.234,5") tetap ditangani. Kosong/invalid → null.
export function toNumber(val) {
  if (val === null || val === undefined) return null;
  if (typeof val === "number") return Number.isFinite(val) ? val : null;
  let s = String(val).trim().replace(/\s/g, "");
  if (s === "") return null;
  if (s.includes(",")) s = s.replace(/\./g, "").replace(",", ".");
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}

function pad(n) { return String(n).padStart(2, "0"); }

// Tanggal → "yyyy-mm-dd". Menerima serial number Sheets, "yyyy-mm-dd", atau "dd/mm/yyyy".
export function toISODate(val) {
  if (val === null || val === undefined || val === "") return null;
  if (typeof val === "number") {
    const d = new Date(Date.UTC(1899, 11, 30) + Math.round(val * 86400000));
    return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`;
  }
  const s = String(val).trim();
  let m = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
  if (m) return `${m[1]}-${pad(m[2])}-${pad(m[3])}`;
  m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (m) return `${m[3]}-${pad(m[2])}-${pad(m[1])}`;
  return null;
}

function normHeader(h) {
  return String(h ?? "").trim().toLowerCase().replace(/\s+/g, "_");
}

// Baris mentah → array objek berdasarkan nama header baris 1.
// Baris yang semua selnya kosong dibuang.
export function rowsToObjects(rows) {
  if (!rows || rows.length < 2) return [];
  const headers = rows[0].map(normHeader);
  return rows.slice(1)
    .map((row, i) => {
      const obj = { _row: i + 2 }; // nomor baris di sheet, untuk pesan warning
      headers.forEach((h, j) => { if (h) obj[h] = row[j] ?? ""; });
      obj._empty = !row.some((c) => c !== "" && c !== null && c !== undefined);
      return obj;
    })
    .filter((obj) => !obj._empty);
}

// ── Normalizer per tab ──────────────────────────────────────────

export function normalizePlayers(objs) {
  return objs
    .map((o) => ({
      player_id:   toNumber(o.player_id),
      player_name: String(o.player_name ?? "").trim(),
      posisi:      String(o.posisi ?? "").trim(),
      angkatan:    toNumber(o.angkatan),
      pas_foto:    String(o.pas_foto ?? "").trim(),
      status:      String(o.status ?? "").trim().toLowerCase(),
    }))
    .filter((p) => p.player_id !== null && p.player_name);
}

export function isActive(p) {
  return p?.status === "aktif";
}

// Kembalikan { valid, all }. `all` dipakai untuk cek duplikat di form,
// `valid` untuk statistik. Baris invalid dilewati + warning di console.
export function normalizeShooting(objs) {
  const valid = [];
  const all = [];
  objs.forEach((o) => {
    const date = toISODate(o.date);
    const player_id = toNumber(o.player_id);
    const row = { date, player_id, player_name: String(o.player_name ?? "").trim() };
    if (date && player_id !== null) all.push(row);

    const problems = [];
    if (!date) problems.push("tanggal tidak valid");
    if (player_id === null) problems.push("player_id bukan angka");
    ZONES.forEach((z) => {
      const made = toNumber(o[z.made]);
      const att  = toNumber(o[z.attempt]);
      row[z.made] = made;
      row[z.attempt] = att;
      if (made === null || att === null) problems.push(`${z.key}: nilai bukan angka`);
      else if (made < 0 || att < 0) problems.push(`${z.key}: nilai negatif`);
      else if (made > att) problems.push(`${z.key}: masuk (${made}) > percobaan (${att})`);
    });

    if (problems.length) {
      console.warn(
        `[shooting_data] baris ${o._row} dilewati (${row.player_name || "?"}, ${date || o.date}): ${problems.join("; ")}`
      );
      return;
    }
    valid.push(row);
  });
  return { valid, all };
}

export const PHYSICAL_NUMERIC = [
  "yoyo_level", "yoyo_shuttle", "yoyo_jarak_m", "sprint_20m_detik", "lane_agility_detik",
  "vertical_jump_cm", "pushup_1menit_reps", "plank_detik", "tinggi_cm", "berat_kg",
];

// Semua kolom angka diparse; kolom tambahan (header baru) ikut diparse kalau numerik.
export function normalizePhysical(objs) {
  return objs
    .map((o) => {
      const r = { ...o };
      r.test_round = toNumber(o.test_round);
      r.test_date  = toISODate(o.test_date);
      r.player_id  = toNumber(o.player_id);
      r.player_name = String(o.player_name ?? "").trim();
      r.catatan    = String(o.catatan ?? "").trim();
      PHYSICAL_NUMERIC.forEach((k) => { r[k] = toNumber(o[k]); });
      return r;
    })
    .filter((r) => r.test_round !== null && r.player_id !== null);
}

export function normalizeSchedule(objs) {
  return objs
    .map((o) => ({
      test_round: toNumber(o.test_round),
      nama_tes:   String(o.nama_tes ?? "").trim(),
      fase:       String(o.fase ?? "").trim(),
      target_waktu: String(o.target_waktu ?? "").trim(),
      tanggal_pelaksanaan: toISODate(o.tanggal_pelaksanaan),
      status:     String(o.status ?? "").trim().toLowerCase(),
    }))
    .filter((s) => s.test_round !== null)
    .sort((a, b) => a.test_round - b.test_round);
}

export function normalizeBenchmark(objs) {
  return objs
    .map((o) => ({
      test_key: normHeader(o.test_key),
      label:    String(o.label ?? "").trim() || String(o.test_key ?? ""),
      satuan:   String(o.satuan ?? "").trim(),
      arah:     String(o.arah ?? "").trim().toLowerCase(),
      nilai_skor_0:   toNumber(o.nilai_skor_0),
      nilai_skor_100: toNumber(o.nilai_skor_100),
      sumbu_radar:    String(o.sumbu_radar ?? "").trim(),
    }))
    .filter((b) => b.test_key && b.nilai_skor_0 !== null && b.nilai_skor_100 !== null
      && b.nilai_skor_0 !== b.nilai_skor_100);
}

// ── Fetch ───────────────────────────────────────────────────────

// Satu request untuk semua tab. Tanggal diminta sebagai serial number supaya
// tidak bergantung format tampilan sel.
export async function fetchAllTabs() {
  if (!API_KEY || !SHEET_ID) throw new Error("VITE_GOOGLE_SHEETS_API_KEY / VITE_SHEET_ID belum diisi");
  const params = new URLSearchParams({
    key: API_KEY,
    valueRenderOption: "UNFORMATTED_VALUE",
    dateTimeRenderOption: "SERIAL_NUMBER",
  });
  Object.values(TABS).forEach((t) => params.append("ranges", `'${t}'`));
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values:batchGet?${params}`;
  const res = await fetch(url);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(`Sheets API: ${err.error?.message || res.status}`);
  }
  const data = await res.json();
  const byTab = {};
  Object.entries(TABS).forEach(([key, tab], i) => {
    const vr = data.valueRanges?.[i];
    if (!vr || !String(vr.range).replace(/'/g, "").startsWith(tab)) {
      console.warn(`[sheets] tab ${tab} tidak ditemukan di respons`);
    }
    byTab[key] = rowsToObjects(vr?.values || []);
  });
  return byTab;
}
