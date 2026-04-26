// Zona tembakan — field name sesuai kolom Google Sheets
export const ZONES = [
  { key: "corner_kiri",   label: "Corner Kiri",  made: "corner_kiri_masuk",   attempt: "corner_kiri_percobaan"  },
  { key: "wing_kiri",     label: "Wing Kiri",    made: "wing_kiri_masuk",     attempt: "wing_kiri_percobaan"    },
  { key: "top",           label: "Top",          made: "top_masuk",           attempt: "top_percobaan"          },
  { key: "wing_kanan",    label: "Wing Kanan",   made: "wing_kanan_masuk",    attempt: "wing_kanan_percobaan"   },
  { key: "corner_kanan",  label: "Corner Kanan", made: "corner_kanan_masuk",  attempt: "corner_kanan_percobaan" },
];

export function getPct(made, attempt) {
  if (!attempt) return 0;
  return Math.round((made / attempt) * 100);
}

export function pctColor(pct) {
  if (pct >= 70) return "#22c55e";
  if (pct >= 50) return "#84cc16";
  if (pct >= 35) return "#eab308";
  if (pct >= 20) return "#f97316";
  return "#ef4444";
}

export function pctOpacity(pct) {
  return 0.2 + (pct / 100) * 0.75;
}

// Parse angka format Indonesia: "5,01" → 5.01
export function parseNum(val) {
  return parseFloat(String(val ?? 0).replace(",", ".")) || 0;
}

// Parse pace format "5:35" → 5.583 menit, atau desimal biasa
export function parsePace(val) {
  if (!val) return 0;
  const str = String(val).trim();
  if (str.includes(":")) {
    const [min, sec] = str.split(":").map(Number);
    return min + (sec / 60);
  }
  return parseNum(str);
}