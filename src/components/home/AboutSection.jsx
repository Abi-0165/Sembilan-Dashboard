import { C, FONT_BODY, primaryBtn } from "../../theme";

const WA_NUMBER = "6282167911911";
const WA_URL    = `https://wa.me/${WA_NUMBER}`;

export default function AboutSection() {
  return (
    <section className="container" style={{ paddingTop: 64, paddingBottom: 88 }}>
      <style>{`
        .about-grid { display: grid; gap: 32px; grid-template-columns: minmax(0, 1fr); align-items: center; }
        @media (min-width: 900px) { .about-grid { grid-template-columns: minmax(0, 6fr) minmax(0, 5fr); gap: 56px; } }
        .about-photo { position: relative; margin: 0; border-radius: 24px; overflow: hidden; aspect-ratio: 3 / 2; background: ${C.line}; }
        .about-photo img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .wa-btn { transition: transform 0.2s; }
        .wa-btn:hover { transform: translateY(-2px); }
      `}</style>

      <div className="about-grid">
        <figure className="about-photo">
          <img src="/images/tim-round2.webp" alt="Tim Sembilan Basketball bersama tim dance berfoto di tengah lapangan dengan papan Goes to Round 2" loading="lazy" />
          <figcaption style={{ position: "absolute", left: 16, bottom: 16, background: C.primary, color: C.onPrimary, padding: "8px 14px", borderRadius: 10, fontSize: 14, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Goes to Round 2
          </figcaption>
        </figure>

        <div>
          <div style={{ fontSize: 12, color: C.primary, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 16 }}>
            Tentang Kami
          </div>
          <h2 style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 900, textTransform: "uppercase", lineHeight: 0.95, letterSpacing: "-0.02em", color: C.accent, marginBottom: 24 }}>
            Tekadku hanya<br />
            <span style={{ color: C.primary }}>prestasi.</span>
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, fontFamily: FONT_BODY, fontSize: 16, color: C.textBody, lineHeight: 1.75 }}>
            <p>
              Sembilan Basketball merupakan tim basket resmi <strong style={{ color: C.text }}>SMAN 9 Surabaya</strong> yang aktif berpartisipasi dalam berbagai turnamen tingkat kota maupun provinsi di Jawa Timur.
            </p>
            <p>
              Tim ini menjalankan latihan secara teratur dengan menekankan penguatan mental, kedisiplinan, serta kerja sama tim sebagai dasar dalam meningkatkan performa pemain.
            </p>
            <p>
              Platform ini disediakan sebagai media informasi dan dokumentasi kegiatan tim, sehingga perkembangan serta aktivitas tim dapat diakses secara lebih terstruktur.
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap", marginTop: 28, paddingTop: 24, borderTop: `1px solid ${C.line}` }}>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="wa-btn"
              style={{ ...primaryBtn, padding: "13px 26px", fontSize: 14 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Hubungi Kami
            </a>
            <span style={{ color: C.textSub, fontSize: 14, fontFamily: FONT_BODY }}>
              Narahubung: <strong style={{ color: C.text }}>Abizar</strong>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
