import Avatar from "./Avatar";
import { fmtDate, fmtNum } from "../../utils/statHelpers";
import { C, FONT_BODY } from "../../theme";

const POSISI = { G: "Guard", F: "Forward", C: "Center" };

// Nilai terakhir yang terisi untuk satu kolom
function lastValue(rounds, key) {
  for (let i = rounds.length - 1; i >= 0; i--) {
    const v = rounds[i][key];
    if (v !== null && v !== undefined && v !== "") return v;
  }
  return null;
}

export default function ProfileHeader({ player, rounds }) {
  const tinggi = lastValue(rounds, "tinggi_cm");
  const berat  = lastValue(rounds, "berat_kg");
  const tglTes = lastValue(rounds, "test_date");

  const facts = [
    ["Posisi",   POSISI[player.posisi] || player.posisi || "—"],
    ["Angkatan", player.angkatan ?? "—"],
    ["Tinggi",   tinggi !== null ? `${fmtNum(tinggi, 1)} cm` : "—"],
    ["Berat",    berat  !== null ? `${fmtNum(berat, 1)} kg`  : "—"],
    ["Tes terakhir", fmtDate(tglTes)],
  ];

  return (
    <div style={{ position: "relative", overflow: "hidden", background: `linear-gradient(135deg, ${C.brand}, ${C.brandDeep})`, color: C.white, borderRadius: 20, padding: "24px 20px" }}>
      {/* Garis lapangan dekoratif */}
      <svg aria-hidden viewBox="0 0 200 200" style={{ position: "absolute", right: -40, top: -40, width: 240, height: 240, opacity: 0.12, pointerEvents: "none" }}>
        <circle cx="100" cy="100" r="60" fill="none" stroke="#fff" strokeWidth="3" />
        <circle cx="100" cy="100" r="96" fill="none" stroke="#fff" strokeWidth="3" />
        <line x1="0" y1="100" x2="200" y2="100" stroke="#fff" strokeWidth="3" />
      </svg>

      <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
        <Avatar key={player.player_id} name={player.player_name} src={player.pas_foto} size={76} />
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", opacity: 0.8, fontWeight: 700 }}>
            {POSISI[player.posisi] || "Pemain"}{player.angkatan ? ` · Angkatan ${player.angkatan}` : ""}
          </div>
          <h2 style={{ fontSize: "clamp(28px, 7vw, 42px)", fontWeight: 900, textTransform: "uppercase", margin: 0, lineHeight: 1, overflowWrap: "anywhere" }}>
            {player.player_name}
          </h2>
        </div>
      </div>
      <div style={{ position: "relative", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))", gap: 10 }}>
        {facts.map(([label, value]) => (
          <div key={label} style={{ background: "#FFFFFF14", border: "1px solid #FFFFFF1F", borderRadius: 12, padding: "10px 12px" }}>
            <div style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.75, fontWeight: 700 }}>{label}</div>
            <div style={{ fontSize: 18, fontWeight: 700, fontFamily: FONT_BODY, marginTop: 2 }}>{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
