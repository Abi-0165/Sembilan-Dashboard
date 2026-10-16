import { C, FONT_HEAD, FONT_BODY, alpha } from "../../theme";

export function PageShell({ children, maxWidth = 1120 }) {
  return (
    <main style={{ minHeight: "calc(100vh - 64px)", background: C.bg, color: C.text, fontFamily: FONT_HEAD }}>
      <div className="page fade-up" style={{ maxWidth }}>
        {children}
      </div>
    </main>
  );
}

// actions = elemen di kanan judul (tombol / select); turun ke bawah judul di layar sempit
export function PageTitle({ kicker, title, accent, sub, actions }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 16, flexWrap: "wrap", marginBottom: 24 }}>
      <div style={{ minWidth: 0, flex: "1 1 320px" }}>
        {kicker && (
          <div style={{ fontSize: 12, color: C.primary, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 6 }}>
            {kicker}
          </div>
        )}
        <h1 style={{ fontSize: "clamp(30px, 6vw, 44px)", fontWeight: 900, textTransform: "uppercase", color: C.accent, margin: 0, lineHeight: 1, letterSpacing: "-0.01em" }}>
          {title} {accent && <span style={{ color: C.primary }}>{accent}</span>}
        </h1>
        {sub && <p style={{ color: C.textSub, fontSize: 15, marginTop: 10, fontFamily: FONT_BODY, lineHeight: 1.6, maxWidth: 560 }}>{sub}</p>}
      </div>
      {actions && <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-end" }}>{actions}</div>}
    </div>
  );
}

// Judul di dalam kartu: judul + keterangan opsional di kiri, kontrol opsional di kanan
export function SectionHeader({ title, sub, right, style }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, flexWrap: "wrap", marginBottom: 16, ...style }}>
      <div style={{ minWidth: 0 }}>
        <h2 style={{ fontSize: 18, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.03em", color: C.accent, lineHeight: 1.1 }}>{title}</h2>
        {sub && <p style={{ fontSize: 13, color: C.textSub, fontFamily: FONT_BODY, marginTop: 4, lineHeight: 1.5 }}>{sub}</p>}
      </div>
      {right}
    </div>
  );
}

export function Loading() {
  return (
    <div style={{ minHeight: "70vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, background: C.bg, fontFamily: FONT_HEAD }}>
      <div style={{ width: 40, height: 40, border: `3px solid ${C.line}`, borderTop: `3px solid ${C.primary}`, borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      <span style={{ color: C.primary, fontWeight: 700, letterSpacing: "0.1em" }}>MEMUAT DATA...</span>
    </div>
  );
}

export function ErrorBanner({ error }) {
  return (
    <div role="alert" style={{ background: C.warnSoft, border: `1px solid ${alpha(C.warn, 27)}`, borderRadius: 12, padding: "12px 16px", marginBottom: 20, fontSize: 14, color: C.warn, fontFamily: FONT_BODY, lineHeight: 1.5 }}>
      <strong>Gagal konek Google Sheets</strong> — menampilkan data lokal. ({error})
    </div>
  );
}
