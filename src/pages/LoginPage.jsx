import { useState } from "react";

export default function LoginPage({ onLogin, onBack }) {
  const [pw, setPw]       = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  function handleSubmit() {
    if (pw === "songowani") {
      onLogin();
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  }

  function handleKey(e) {
    if (e.key === "Enter") handleSubmit();
  }

  return (
    <div style={{ minHeight: "100vh", background: "#050d09", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Barlow Condensed', sans-serif", padding: 24 }}>
      <style>{`
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          20%      { transform: translateX(-8px); }
          40%      { transform: translateX(8px); }
          60%      { transform: translateX(-6px); }
          80%      { transform: translateX(6px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div style={{ width: "100%", maxWidth: 380, animation: "fadeIn 0.4s ease" }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🏀</div>
          <h1 style={{ fontSize: 36, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.05em", color: "white", margin: 0 }}>
            <span style={{ color: "#4ade80" }}>NAGA</span> HIJAU
          </h1>
          <p style={{ color: "#6b7280", fontSize: 14, marginTop: 6, fontFamily: "'Barlow', sans-serif" }}>
            SMAN 9 Surabaya · Dashboard Latihan
          </p>
        </div>

        {/* Card */}
        <div style={{ background: "#0d1f14", border: "1px solid #1f3329", borderRadius: 14, padding: 32, animation: shake ? "shake 0.5s ease" : "none" }}>
          <div style={{ fontSize: 11, color: "#4ade80", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10 }}>
            Password
          </div>

          <input
            type="password"
            value={pw}
            onChange={(e) => { setPw(e.target.value); setError(false); }}
            onKeyDown={handleKey}
            placeholder="Masukkan password..."
            autoFocus
            style={{
              width: "100%", background: "#050d09",
              border: `1px solid ${error ? "#ef4444" : "#1f3329"}`,
              color: "#f0fdf4", padding: "12px 16px", borderRadius: 8,
              fontSize: 15, fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 600, outline: "none", marginBottom: 8,
              transition: "border-color 0.2s",
            }}
          />

          {error && (
            <div style={{ color: "#ef4444", fontSize: 12, fontWeight: 600, marginBottom: 12, letterSpacing: "0.04em" }}>
              ✕ Password salah
            </div>
          )}

          <button
            onClick={handleSubmit}
            style={{
              width: "100%", background: "linear-gradient(135deg, #16a34a, #15803d)",
              color: "white", border: "none", padding: "13px 0",
              borderRadius: 8, fontSize: 15, fontWeight: 800,
              letterSpacing: "0.1em", textTransform: "uppercase",
              cursor: "pointer", marginTop: error ? 0 : 8,
              boxShadow: "0 0 24px #16a34a33",
            }}
          >
            Masuk →
          </button>
        </div>

        <p style={{ textAlign: "center", color: "#374151", fontSize: 12, marginTop: 20 }}>
          Hanya untuk anggota tim basket SMAN 9
        </p>

        {onBack && (
          <div style={{ textAlign: "center", marginTop: 14 }}>
            <button onClick={onBack} style={{ background: "none", border: "none", color: "#6b7280", fontSize: 13, cursor: "pointer", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, letterSpacing: "0.05em" }}>
              ← Kembali ke Beranda
            </button>
          </div>
        )}
      </div>
    </div>
  );
}