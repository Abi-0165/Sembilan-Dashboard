// Token warna & font — dipakai semua komponen (inline style).
// Nilai C adalah CSS variable (var(--c-…)), jadi warna ikut tema aktif
// (atribut data-theme di <html>) tanpa render ulang. Palet asli ada di PALETTES.

const LIGHT = {
  bg:      "#F5F6F2", // latar
  surface: "#FFFFFF", // kartu
  surface2:"#F5F6F2", // kotak di dalam kartu
  primary: "#14532D", // hijau tua — teks aksen & tombol
  primaryDark: "#0C3A1F",
  primarySoft: "#14532D14",
  primaryTint: "#E9F1EB",
  accent:  "#0B0F0D", // judul
  line:    "#DCE3DD", // garis / border kartu
  lineSoft:"#EEF2EE",
  muted:   "#888780", // seri "tes awal" & rata-rata tim
  text:    "#111613",
  textBody:"#3F4642", // paragraf panjang
  textSub: "#5B625D",
  onPrimary: "#FFFFFF",
  good:    "#14532D",
  bad:     "#B42318",
  badSoft: "#B4231812",
  warn:    "#92400E",
  warnSoft:"#F59E0B1A",
  shadow:  "0 1px 2px rgba(17, 22, 19, 0.04), 0 4px 16px rgba(17, 22, 19, 0.04)",
  // Lapangan heatmap
  court:     "#F3F5F1",
  courtLine: "#B9C6BC",
  heatOn:    "#FFFFFF", // teks di atas zona yang warnanya pekat
  // Skala % tembakan (pctColor)
  pct70: "#14532D", pct50: "#2F7D4A", pct35: "#C59A12", pct20: "#D9731A", pct0: "#B42318", pctNone: "#D3DDD5",
  // Seri grafik per zona
  zone1: "#2563EB", zone2: "#C2410C", zone3: "#7C3AED", zone4: "#0E7490", zone5: "#BE185D",
};

const DARK = {
  bg:      "#0A0F0C",
  surface: "#111915",
  surface2:"#0D1410",
  primary: "#4CC27A",
  primaryDark: "#2E8B55",
  primarySoft: "#4CC27A1F",
  primaryTint: "#14261B",
  accent:  "#F2F5F3",
  line:    "#24302A",
  lineSoft:"#19221D",
  muted:   "#7D857F",
  text:    "#E6EBE7",
  textBody:"#C3CBC5",
  textSub: "#98A39C",
  onPrimary: "#04130A",
  good:    "#4CC27A",
  bad:     "#F87171",
  badSoft: "#F871711A",
  warn:    "#FBBF24",
  warnSoft:"#FBBF241A",
  shadow:  "0 1px 2px rgba(0, 0, 0, 0.3), 0 8px 24px rgba(0, 0, 0, 0.25)",
  court:     "#16201A",
  courtLine: "#34443A",
  heatOn:    "#04130A",
  pct70: "#3DCB78", pct50: "#2F9A5C", pct35: "#D9AE32", pct20: "#E5822F", pct0: "#EF5350", pctNone: "#2A3630",
  zone1: "#60A5FA", zone2: "#FB923C", zone3: "#A78BFA", zone4: "#22D3EE", zone5: "#F472B6",
};

export const PALETTES = { light: LIGHT, dark: DARK };
export const DEFAULT_THEME = "dark";

export const C = {
  ...Object.fromEntries(Object.keys(LIGHT).map((k) => [k, `var(--c-${k})`])),
  // Warna merek tetap (dipakai di atas foto & kartu hijau) — sama di kedua tema
  brand:      "#14532D",
  brandDeep:  "#0C3A1F",
  brandLight: "#9BE0B0",
  white:      "#FFFFFF",
};

// Transparansi untuk token CSS variable (pengganti akhiran hex "…22")
export const alpha = (color, pct) => `color-mix(in srgb, ${color} ${pct}%, transparent)`;

// CSS variable kedua tema. Tanpa data-theme → tema default (gelap).
export function themeCss() {
  const vars = (p) => Object.entries(p).map(([k, v]) => `--c-${k}: ${v};`).join(" ");
  return `
    :root, :root[data-theme="dark"] { ${vars(DARK)} color-scheme: dark; }
    :root[data-theme="light"] { ${vars(LIGHT)} color-scheme: light; }
  `;
}

export const FONT_HEAD = "'Barlow Condensed', sans-serif";
export const FONT_BODY = "'Barlow', sans-serif";

export const SHADOW = C.shadow;

export const card = {
  background: C.surface,
  border: `1px solid ${C.line}`,
  borderRadius: 16,
  padding: 20,
  boxShadow: SHADOW,
  minWidth: 0,
};

export const sectionLabel = {
  fontSize: 12, color: C.textSub, textTransform: "uppercase",
  letterSpacing: "0.08em", fontFamily: FONT_HEAD, fontWeight: 700,
};

export const input = {
  background: C.surface, border: `1px solid ${C.line}`, color: C.text,
  padding: "10px 12px", borderRadius: 10, fontSize: 15, width: "100%", minHeight: 42,
  fontFamily: FONT_HEAD, fontWeight: 600, outline: "none", boxSizing: "border-box",
};

export const fieldLabel = {
  fontSize: 11, color: C.textSub, fontWeight: 700, letterSpacing: "0.1em",
  textTransform: "uppercase", marginBottom: 6, display: "block", fontFamily: FONT_HEAD,
};

export const primaryBtn = {
  background: C.primary, color: C.onPrimary, border: `1.5px solid ${C.primary}`,
  padding: "13px 20px", borderRadius: 10, fontSize: 15, fontWeight: 800,
  letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", fontFamily: FONT_HEAD,
  display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, textDecoration: "none",
};

export const secondaryBtn = {
  ...primaryBtn,
  background: C.surface, color: C.primary, border: `1.5px solid ${C.line}`,
};
