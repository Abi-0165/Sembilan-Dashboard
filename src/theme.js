// Token warna & font — dipakai semua komponen (inline style)
export const C = {
  bg:      "#FBFBF8", // latar off-white
  surface: "#FFFFFF", // kartu
  primary: "#14532D", // hijau tua
  primarySoft: "#14532D14",
  accent:  "#0B0F0D", // hitam aksen
  line:    "#D3DDD5", // garis / border kartu
  lineSoft:"#EEF2EE",
  muted:   "#888780", // seri "tes awal" & rata-rata tim
  text:    "#111613",
  textSub: "#5B625D",
  onPrimary: "#FFFFFF",
  good:    "#14532D",
  bad:     "#B42318",
  badSoft: "#B4231812",
  warn:    "#92400E",
  warnSoft:"#F59E0B1A",
};

export const FONT_HEAD = "'Barlow Condensed', sans-serif";
export const FONT_BODY = "'Barlow', sans-serif";

export const card = {
  background: C.surface,
  border: `1px solid ${C.line}`,
  borderRadius: 12,
  padding: 20,
};

export const sectionLabel = {
  fontSize: 12, color: C.textSub, textTransform: "uppercase",
  letterSpacing: "0.08em", fontFamily: FONT_HEAD, fontWeight: 700,
};

export const input = {
  background: C.surface, border: `1px solid ${C.line}`, color: C.text,
  padding: "10px 12px", borderRadius: 8, fontSize: 15, width: "100%",
  fontFamily: FONT_HEAD, fontWeight: 600, outline: "none", boxSizing: "border-box",
};

export const fieldLabel = {
  fontSize: 11, color: C.primary, fontWeight: 700, letterSpacing: "0.1em",
  textTransform: "uppercase", marginBottom: 6, display: "block", fontFamily: FONT_HEAD,
};

export const primaryBtn = {
  background: C.primary, color: C.onPrimary, border: "none",
  padding: "13px 20px", borderRadius: 8, fontSize: 15, fontWeight: 800,
  letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", fontFamily: FONT_HEAD,
};
