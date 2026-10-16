import { C, FONT_BODY } from "../../theme";

const PHOTOS = [
  { src: "/images/layup.webp",      alt: "Pemain nomor 7 melakukan layup melewati dua pemain lawan", caption: "Layup",      cls: "g-main", pos: "55% 30%" },
  { src: "/images/free-throw.webp", alt: "Pemain nomor 8 bersiap melakukan free throw",               caption: "Free Throw", cls: "",       pos: "50% 25%" },
  { src: "/images/bench.webp",      alt: "Pemain cadangan merayakan tembakan tiga angka dari bench",    caption: "Bench",      cls: "",       pos: "40% 30%" },
];

export default function GallerySection() {
  return (
    <section className="container" style={{ paddingTop: 72, paddingBottom: 8 }}>
      <style>{`
        .gallery { display: grid; gap: 12px; grid-template-columns: repeat(2, minmax(0, 1fr)); grid-auto-rows: 160px; }
        .gallery .g-main { grid-column: 1 / -1; grid-row: span 2; }
        @media (min-width: 900px) {
          .gallery { gap: 16px; grid-template-columns: minmax(0, 3fr) minmax(0, 2fr); grid-auto-rows: 220px; }
          .gallery .g-main { grid-column: 1; grid-row: span 2; }
        }
        .g-item { position: relative; overflow: hidden; border-radius: 20px; background: ${C.line}; margin: 0; }
        .g-item img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.6s ease; }
        .g-item:hover img { transform: scale(1.04); }
        .g-item figcaption { position: absolute; left: 0; right: 0; bottom: 0; padding: 32px 16px 14px; background: linear-gradient(0deg, #000000B3, transparent); color: #fff; font-size: 15px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; }
        @media (prefers-reduced-motion: reduce) { .g-item img { transition: none; } }
      `}</style>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 16, flexWrap: "wrap", marginBottom: 24 }}>
        <div>
          <div style={{ fontSize: 12, color: C.primary, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 10 }}>
            Di Lapangan
          </div>
          <h2 style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 900, textTransform: "uppercase", lineHeight: 0.95, letterSpacing: "-0.01em", color: C.accent }}>
            Momen <span style={{ color: C.primary }}>Pertandingan</span>
          </h2>
        </div>
        <p style={{ fontFamily: FONT_BODY, fontSize: 15, color: C.textSub, maxWidth: 360, lineHeight: 1.6 }}>
          Sembilan Basketball di lapangan — dari bench sampai garis free throw.
        </p>
      </div>

      <div className="gallery">
        {PHOTOS.map((p) => (
          <figure key={p.src} className={`g-item ${p.cls}`}>
            <img src={p.src} alt={p.alt} loading="lazy" style={{ objectPosition: p.pos }} />
            <figcaption>{p.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
