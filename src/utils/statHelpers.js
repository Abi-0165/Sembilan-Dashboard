import { C } from "../theme";

// Zona tembakan — field name sesuai kolom Google Sheets
export const ZONES = [
  { key: "corner_kiri",   label: "Corner Kiri",  made: "corner_kiri_masuk",   attempt: "corner_kiri_percobaan"  },
  { key: "wing_kiri",     label: "Wing Kiri",    made: "wing_kiri_masuk",     attempt: "wing_kiri_percobaan"    },
  { key: "top",           label: "Top",          made: "top_masuk",           attempt: "top_percobaan"          },
  { key: "wing_kanan",    label: "Wing Kanan",   made: "wing_kanan_masuk",    attempt: "wing_kanan_percobaan"   },
  { key: "corner_kanan",  label: "Corner Kanan", made: "corner_kanan_masuk",  attempt: "corner_kanan_percobaan" },
];

// null = tidak ada data (0/0), bukan 0%
export function getPct(made, attempt) {
  if (!attempt) return null;
  return Math.round((made / attempt) * 100);
}

// Jumlahkan masuk/percobaan per zona. Zona 0/0 di satu sesi otomatis tidak menambah apa-apa.
export function aggregateZones(rows) {
  const agg = {};
  ZONES.forEach((z) => { agg[z.key] = { made: 0, attempt: 0 }; });
  rows.forEach((d) => {
    ZONES.forEach((z) => {
      agg[z.key].made    += d[z.made]    || 0;
      agg[z.key].attempt += d[z.attempt] || 0;
    });
  });
  return agg;
}

// Warna dari token tema (CSS variable), jadi ikut mode gelap/terang
export function pctColor(pct) {
  if (pct === null || pct === undefined) return C.pctNone;
  if (pct >= 70) return C.pct70;
  if (pct >= 50) return C.pct50;
  if (pct >= 35) return C.pct35;
  if (pct >= 20) return C.pct20;
  return C.pct0;
}

export const PCT_LEGEND = [
  ["≥70%", 70], ["50–69%", 50], ["35–49%", 35], ["20–34%", 20], ["<20%", 0],
];

// Format angka gaya Indonesia: 0,15 · 1.200
export function fmtNum(n, maxFrac = 2) {
  if (n === null || n === undefined || Number.isNaN(n)) return "—";
  return n.toLocaleString("id-ID", { maximumFractionDigits: maxFrac });
}

// Tanggal lokal (bukan UTC) n hari lalu → "yyyy-mm-dd"; supaya pagi hari di WIB tidak jadi kemarin
export function isoDaysAgo(n = 0) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function fmtDate(iso) {
  if (!iso) return "—";
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
}
