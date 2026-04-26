const CARDS = [
  { icon: "🏫", title: "SMAN 9 Surabaya", desc: "Sekolah Menengah Atas Negeri 9 Surabaya, salah satu sekolah terbaik di Kota Pahlawan dengan tradisi olahraga yang kuat." },
  { icon: "🏀", title: "Tim Basket",       desc: "Tim basket putra SMAN 9 yang aktif berkompetisi di berbagai turnamen tingkat kota dan provinsi Jawa Timur." },
  { icon: "📊", title: "Analisis Data",    desc: "Platform monitoring latihan berbasis data untuk membantu pelatih mengambil keputusan taktis dari performa nyata pemain." },
];

export default function AboutSection() {
  return (
    <div style={{ padding: "80px 24px", maxWidth: 1000, margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
        {CARDS.map((c, i) => (
          <div key={i} style={{ background: "#0d1f14", border: "1px solid #1f3329", borderRadius: 12, padding: 28 }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>{c.icon}</div>
            <h3 style={{ fontSize: 20, fontWeight: 800, color: "#f0fdf4", margin: "0 0 10px", textTransform: "uppercase" }}>{c.title}</h3>
            <p style={{ color: "#6b7280", lineHeight: 1.6, fontSize: 14, fontFamily: "'Barlow', sans-serif", margin: 0 }}>{c.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}