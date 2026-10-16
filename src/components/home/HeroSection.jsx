import { C, FONT_BODY, primaryBtn } from "../../theme";

export default function HeroSection({ onNavigate }) {
  return (
    <section style={{ position: "relative", overflow: "hidden", background: C.brandDeep, color: C.white }}>
      <style>{`
        .hero { position: relative; min-height: min(88vh, 760px); display: flex; align-items: flex-end; }
        .hero-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: 50% 35%; }
        /* Gradasi hijau gelap supaya teks putih tetap terbaca di atas foto */
        .hero-shade { position: absolute; inset: 0; background:
          linear-gradient(0deg, ${C.brandDeep} 0%, ${C.brandDeep}E6 30%, ${C.brandDeep}66 65%, ${C.brandDeep}33 100%); }
        .hero-body { position: relative; padding-top: 120px; padding-bottom: 56px; }
        @media (min-width: 900px) {
          .hero { align-items: center; }
          .hero-shade { background: linear-gradient(90deg, ${C.brandDeep}F2 0%, ${C.brandDeep}CC 38%, ${C.brandDeep}33 75%, transparent 100%); }
          .hero-body { padding-top: 96px; padding-bottom: 96px; }
        }
        .hero-ghost { background: transparent; color: ${C.white}; border: 1.5px solid #FFFFFF80; }
        .hero-ghost:hover { background: #FFFFFF14; }
      `}</style>

      <div className="hero">
        <img className="hero-img" src="/images/huddle.webp" alt="Pemain Sembilan Basketball melakukan huddle sebelum pertandingan" fetchPriority="high" />
        <div className="hero-shade" />

        <div className="container hero-body">
          <div className="fade-up" style={{ maxWidth: 600 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#FFFFFF1A", border: "1px solid #FFFFFF33", padding: "6px 14px", borderRadius: 99, fontSize: 13, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 24, backdropFilter: "blur(6px)" }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#7FD39A" }} />
              SMAN 9 Surabaya
            </div>
            <h1 style={{ fontSize: "clamp(56px, 11vw, 112px)", fontWeight: 900, lineHeight: 0.86, letterSpacing: "-0.02em", textTransform: "uppercase" }}>
              <span style={{ display: "block" }}>Sembilan</span>
              <span style={{ display: "block", color: C.brandLight }}>Basketball</span>
            </h1>
            <p style={{ fontSize: "clamp(16px, 2vw, 19px)", color: "#FFFFFFD9", maxWidth: 480, margin: "24px 0 36px", lineHeight: 1.6, fontFamily: FONT_BODY }}>
              Platform pelatihan & analisis statistik resmi tim basket SMAN 9 Surabaya — pantau akurasi shooting dan perkembangan fisik pemain dari satu tempat.
            </p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button onClick={() => onNavigate("dashboard")} style={{ ...primaryBtn, background: C.white, color: C.brand, border: `1.5px solid ${C.white}`, padding: "15px 28px" }}>
                Lihat Dashboard →
              </button>
              <button className="hero-ghost" onClick={() => onNavigate("profil")} style={{ ...primaryBtn, background: undefined, border: undefined, color: C.white, padding: "15px 28px" }}>
                Profil Fisik
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
