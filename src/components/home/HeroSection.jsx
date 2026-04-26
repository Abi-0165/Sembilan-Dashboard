export default function HeroSection({ onNavigate }) {
  return (
    <div style={{ position: "relative", minHeight: "92vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "0 24px" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% 40%, #0d4a2344 0%, transparent 70%)", pointerEvents: "none" }} />
      <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", opacity: 0.04, pointerEvents: "none" }} viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
        <rect x="100" y="50" width="600" height="500" rx="20" fill="none" stroke="white" strokeWidth="3" />
        <circle cx="400" cy="300" r="80" fill="none" stroke="white" strokeWidth="2" />
        <line x1="100" y1="300" x2="700" y2="300" stroke="white" strokeWidth="2" />
      </svg>
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ display: "inline-block", background: "#16a34a22", border: "1px solid #16a34a55", color: "#4ade80", padding: "6px 18px", borderRadius: 99, fontSize: 13, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 28, fontFamily: "'Barlow Condensed', sans-serif" }}>
          SMAN 9 Surabaya 
        </div>
        <h1 style={{ fontSize: "clamp(42px, 8vw, 100px)", fontWeight: 900, lineHeight: 0.9, margin: "0 0 8px", letterSpacing: "-0.02em", textTransform: "uppercase", fontFamily: "'Barlow Condensed', sans-serif" }}>
          <span style={{ display: "block", color: "#f0fdf4" }}>SEMBILAN</span>
          <span style={{ display: "block", background: "linear-gradient(90deg, #4ade80, #16a34a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontFamily: "'Barlow Condensed', sans-serif" }}>BASKETBALL</span>
        </h1>
        <p style={{ fontSize: "clamp(14px, 2vw, 18px)", color: "#6b7280", maxWidth: 480, margin: "20px auto 48px", lineHeight: 1.6, fontFamily: "'Barlow', sans-serif" }}>
          Platform pelatihan & analisis statistik resmi tim basket SMAN 9 Surabaya.
        </p>
        <button onClick={() => onNavigate("dashboard")} style={{ background: "linear-gradient(135deg, #16a34a, #15803d)", color: "white", border: "none", padding: "16px 48px", borderRadius: 8, fontSize: 16, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", boxShadow: "0 0 40px #16a34a44" }}>
          Lihat Dashboard →
        </button>
      </div>
    </div>
  );
}