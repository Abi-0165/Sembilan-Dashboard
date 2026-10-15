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

export function pctColor(pct) {
  if (pct === null || pct === undefined) return "#D3DDD5";
  if (pct >= 70) return "#14532D";
  if (pct >= 50) return "#2F7D4A";
  if (pct >= 35) return "#C59A12";
  if (pct >= 20) return "#D9731A";
  return "#B42318";
}

export const PCT_LEGEND = [
  ["≥70%", 70], ["50–69%", 50], ["35–49%", 35], ["20–34%", 20], ["<20%", 0],
];

// Format angka gaya Indonesia: 0,15 · 1.200
export function fmtNum(n, maxFrac = 2) {
  if (n === null || n === undefined || Number.isNaN(n)) return "—";
  return n.toLocaleString("id-ID", { maximumFractionDigits: maxFrac });
}

export function fmtDate(iso) {
  if (!iso) return "—";
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
}
