import { C, primaryBtn } from "../../theme";

export default function HeroSection({ onNavigate }) {
  return (
    <div style={{ position: "relative", minHeight: "86vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "0 16px" }}>
      <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", opacity: 0.07, pointerEvents: "none" }} viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
        <rect x="100" y="50" width="600" height="500" rx="20" fill="none" stroke={C.primary} strokeWidth="3" />
        <circle cx="400" cy="300" r="80" fill="none" stroke={C.primary} strokeWidth="2" />
        <line x1="100" y1="300" x2="700" y2="300" stroke={C.primary} strokeWidth="2" />
      </svg>
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ display: "inline-block", background: C.primary, color: C.onPrimary, padding: "6px 18px", borderRadius: 99, fontSize: 13, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 28, fontFamily: "'Barlow Condensed', sans-serif" }}>
          SMAN 9 Surabaya
        </div>
        <h1 style={{ fontSize: "clamp(42px, 8vw, 100px)", fontWeight: 900, lineHeight: 0.9, margin: "0 0 8px", letterSpacing: "-0.02em", textTransform: "uppercase", fontFamily: "'Barlow Condensed', sans-serif" }}>
          <span style={{ display: "block", color: C.accent }}>SEMBILAN</span>
          <span style={{ display: "block", color: C.primary }}>BASKETBALL</span>
        </h1>
        <p style={{ fontSize: "clamp(15px, 2vw, 18px)", color: C.textSub, maxWidth: 480, margin: "20px auto 40px", lineHeight: 1.6, fontFamily: "'Barlow', sans-serif" }}>
          Platform pelatihan & analisis statistik resmi tim basket SMAN 9 Surabaya.
        </p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={() => onNavigate("dashboard")} style={{ ...primaryBtn, padding: "15px 32px" }}>
            Lihat Dashboard →
          </button>
          <button onClick={() => onNavigate("profil")} style={{ ...primaryBtn, padding: "15px 32px", background: C.surface, color: C.primary, border: `1.5px solid ${C.primary}` }}>
            Profil Fisik
          </button>
        </div>
      </div>
    </div>
  );
}
