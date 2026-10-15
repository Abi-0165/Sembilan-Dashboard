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
    <div style={{ background: C.primary, color: C.onPrimary, borderRadius: 14, padding: "20px 18px", marginBottom: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
        <Avatar key={player.player_id} name={player.player_name} src={player.pas_foto} />
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.8, fontWeight: 700 }}>Profil Fisik</div>
          <h1 style={{ fontSize: "clamp(26px, 7vw, 36px)", fontWeight: 900, textTransform: "uppercase", margin: 0, lineHeight: 1.05, overflowWrap: "anywhere" }}>
            {player.player_name}
          </h1>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(96px, 1fr))", gap: 10 }}>
        {facts.map(([label, value]) => (
          <div key={label} style={{ background: "#FFFFFF14", borderRadius: 8, padding: "8px 10px" }}>
            <div style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.8, fontWeight: 700 }}>{label}</div>
            <div style={{ fontSize: 17, fontWeight: 800, fontFamily: FONT_BODY }}>{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
