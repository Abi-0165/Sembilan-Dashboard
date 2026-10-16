import { useState } from "react";
import { BrandMark } from "../components/layout/Navbar";
import { C, FONT_HEAD, FONT_BODY, card, input, fieldLabel, primaryBtn } from "../theme";

export default function LoginPage({ onLogin, onBack }) {
  const [pw, setPw]       = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (pw === "songowani") {
      onLogin();
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  }

  return (
    <main className="login" style={{ fontFamily: FONT_HEAD, background: C.bg }}>
      <style>{`
        .login { min-height: 100vh; display: grid; grid-template-columns: minmax(0, 1fr); }
        .login-photo { display: none; position: relative; overflow: hidden; background: ${C.brandDeep}; }
        .login-photo img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: 45% 30%; }
        .login-photo::after { content: ""; position: absolute; inset: 0; background: linear-gradient(0deg, ${C.brandDeep}F2 0%, ${C.brandDeep}40 55%, transparent 100%); }
        .login-form { display: flex; align-items: center; justify-content: center; padding: 16px; background: radial-gradient(900px 420px at 50% -10%, ${C.primaryTint}, transparent 70%), ${C.bg}; }
        @media (min-width: 900px) {
          .login { grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr); }
          .login-photo { display: block; }
        }
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          20%      { transform: translateX(-8px); }
          40%      { transform: translateX(8px); }
          60%      { transform: translateX(-6px); }
          80%      { transform: translateX(6px); }
        }
      `}</style>

      <div className="login-photo" aria-hidden>
        <img src="/images/free-throw.webp" alt="" />
        <div style={{ position: "absolute", left: 40, right: 40, bottom: 40, zIndex: 1, color: C.white }}>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", opacity: 0.8 }}>Dashboard Latihan</div>
          <div style={{ fontSize: 44, fontWeight: 900, textTransform: "uppercase", lineHeight: 0.95, marginTop: 8 }}>Tekadku hanya<br /><span style={{ color: C.brandLight }}>prestasi.</span></div>
        </div>
      </div>

      <div className="login-form">
        <div className="fade-up" style={{ width: "100%", maxWidth: 400 }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ display: "inline-flex", marginBottom: 16 }}><BrandMark size={56} /></div>
            <h1 style={{ fontSize: 34, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.03em", color: C.accent, lineHeight: 1 }}>
              <span style={{ color: C.primary }}>Sembilan</span> Basketball
            </h1>
            <p style={{ color: C.textSub, fontSize: 15, marginTop: 8, fontFamily: FONT_BODY }}>
              SMAN 9 Surabaya · Dashboard Latihan
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ ...card, padding: 28, animation: shake ? "shake 0.5s ease" : "none" }}>
            <label htmlFor="login-pw" style={fieldLabel}>Password</label>
            <input
              id="login-pw"
              type="password"
              value={pw}
              onChange={(e) => { setPw(e.target.value); setError(false); }}
              placeholder="Masukkan password..."
              autoFocus
              aria-invalid={error}
              style={{ ...input, padding: "12px 14px", minHeight: 48, borderColor: error ? C.bad : C.line }}
            />

            {error && (
              <div role="alert" style={{ color: C.bad, fontSize: 13, fontWeight: 600, marginTop: 8, fontFamily: FONT_BODY }}>
                Password salah, coba lagi.
              </div>
            )}

            <button type="submit" style={{ ...primaryBtn, width: "100%", marginTop: 16, minHeight: 48 }}>
              Masuk →
            </button>
          </form>

          <p style={{ textAlign: "center", color: C.textSub, fontSize: 13, marginTop: 20, fontFamily: FONT_BODY }}>
            Hanya untuk anggota tim basket SMAN 9
          </p>

          {onBack && (
            <div style={{ textAlign: "center", marginTop: 12 }}>
              <button onClick={onBack} style={{ background: "none", border: "none", color: C.primary, fontSize: 14, cursor: "pointer", fontFamily: FONT_HEAD, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", padding: 8 }}>
                ← Kembali ke Beranda
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
