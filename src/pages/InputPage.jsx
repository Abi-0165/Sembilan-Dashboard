import InputForm from "../components/dashboard/InputForm";

export default function InputPage({ players }) {
  return (
    <div style={{ minHeight: "100vh", background: "#050d09", color: "white", fontFamily: "'Barlow Condensed', sans-serif" }}>
      <div style={{ padding: "32px 24px", maxWidth: 680, margin: "0 auto" }}>
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 11, color: "#4ade80", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 8 }}>
            Input Data Latihan
          </div>
          <h1 style={{ fontSize: 32, fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.01em", color: "#f0fdf4", margin: 0 }}>
            Tambah <span style={{ color: "#4ade80" }}>Sesi</span>
          </h1>
          <p style={{ color: "#6b7280", fontSize: 14, marginTop: 8, fontFamily: "'Barlow', sans-serif", lineHeight: 1.6 }}>
            Pilih tipe latihan, isi data, lalu simpan langsung ke Google Sheets.
          </p>
        </div>

        <InputForm players={players} />
      </div>
    </div>
  );
}