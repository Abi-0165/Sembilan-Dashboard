import { testDeltas, unitShort } from "../../utils/physicalScore";
import { fmtNum } from "../../utils/statHelpers";
import { C, FONT_BODY, card, sectionLabel } from "../../theme";

function fmtDelta(d) {
  const sign = d > 0 ? "+" : d < 0 ? "−" : "±";
  return `${sign}${fmtNum(Math.abs(d))}`;
}

// Selisih nilai mentah: terbaru − tes awal. Untuk lower_better, negatif = membaik.
export default function DeltaCards({ rounds, benchmarks, schedule }) {
  const deltas = testDeltas(rounds, benchmarks);
  const roundName = (r) => schedule.find((s) => s.test_round === r)?.nama_tes || `Tes ${r}`;

  return (
    <div style={card}>
      <div style={{ ...sectionLabel, marginBottom: 12 }}>Perubahan sejak Tes Awal</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 150px), 1fr))", gap: 10 }}>
        {deltas.map(({ bench, delta, first, last, improved }) => {
          const unit = unitShort(bench.satuan);
          const tone = improved === true ? C.good : improved === false ? C.bad : C.textSub;
          const icon = improved === true ? "▲" : improved === false ? "▼" : "•";
          return (
            <div key={bench.test_key} style={{ border: `1px solid ${C.line}`, borderRadius: 10, padding: "10px 12px", background: improved === true ? C.primarySoft : C.bg }}>
              <div style={{ fontSize: 12, color: C.textSub, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>{bench.label}</div>
              {delta === null ? (
                <>
                  <div style={{ fontSize: 20, fontWeight: 900, color: C.textSub, marginTop: 2 }}>—</div>
                  <div style={{ fontSize: 12, color: C.textSub, fontFamily: FONT_BODY }}>
                    {first ? `${fmtNum(first[bench.test_key])} ${unit} · belum ada pembanding` : "belum ada data"}
                  </div>
                </>
              ) : (
                <>
                  <div style={{ fontSize: 22, fontWeight: 900, color: tone, marginTop: 2, display: "flex", alignItems: "baseline", gap: 6 }}>
                    <span aria-hidden style={{ fontSize: 13 }}>{icon}</span>
                    {fmtDelta(delta)} {unit}
                  </div>
                  <div style={{ fontSize: 12, color: C.textSub, fontFamily: FONT_BODY }}>
                    {fmtNum(first[bench.test_key])} → {fmtNum(last[bench.test_key])} {unit}
                    <span style={{ display: "block", fontSize: 11 }}>{roundName(first.test_round)} → {roundName(last.test_round)}</span>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
      <div style={{ fontSize: 11, color: C.textSub, marginTop: 10, fontFamily: FONT_BODY }}>
        ▲ hijau = membaik. Untuk sprint dan lane agility, waktu lebih kecil berarti membaik.
      </div>
    </div>
  );
}
