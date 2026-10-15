import { C, FONT_HEAD, FONT_BODY } from "../../theme";

export function PageShell({ children, maxWidth = 1100 }) {
  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: FONT_HEAD }}>
      <div style={{ padding: "24px 16px 48px", maxWidth, margin: "0 auto" }}>
        {children}
      </div>
    </div>
  );
}

export function PageTitle({ kicker, title, accent, sub }) {
  return (
    <div style={{ marginBottom: 20 }}>
      {kicker && (
        <div style={{ fontSize: 11, color: C.primary, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 6 }}>
          {kicker}
        </div>
      )}
      <h1 style={{ fontSize: "clamp(26px, 6vw, 34px)", fontWeight: 900, textTransform: "uppercase", color: C.accent, margin: 0, lineHeight: 1.05 }}>
        {title} {accent && <span style={{ color: C.primary }}>{accent}</span>}
      </h1>
      {sub && <p style={{ color: C.textSub, fontSize: 14, marginTop: 8, fontFamily: FONT_BODY, lineHeight: 1.6 }}>{sub}</p>}
    </div>
  );
}

export function Loading() {
  return (
    <div style={{ minHeight: "70vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, background: C.bg, fontFamily: FONT_HEAD }}>
      <div style={{ width: 40, height: 40, border: `3px solid ${C.line}`, borderTop: `3px solid ${C.primary}`, borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <span style={{ color: C.primary, fontWeight: 700, letterSpacing: "0.1em" }}>MEMUAT DATA...</span>
    </div>
  );
}

export function ErrorBanner({ error }) {
  return (
    <div style={{ background: C.warnSoft, border: `1px solid ${C.warn}44`, borderRadius: 8, padding: "10px 14px", marginBottom: 20, fontSize: 13, color: C.warn, fontFamily: FONT_BODY }}>
      ⚠️ Gagal konek Google Sheets — menampilkan data lokal. ({error})
    </div>
  );
}
