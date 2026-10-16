import { useState, useMemo } from "react";
import ProfileHeader  from "../components/profile/ProfileHeader";
import PhysicalRadar  from "../components/profile/PhysicalRadar";
import DeltaCards     from "../components/profile/DeltaCards";
import TestTrendChart from "../components/profile/TestTrendChart";
import { PageShell, PageTitle, SectionHeader, Loading, ErrorBanner } from "../components/layout/PageShell";
import { playerRounds, initialAndLatest } from "../utils/physicalScore";
import { fmtDate } from "../utils/statHelpers";
import { C, FONT_BODY, card, input, fieldLabel } from "../theme";

function Empty({ children }) {
  return <div style={{ ...card, color: C.textSub, fontFamily: FONT_BODY, fontSize: 15, lineHeight: 1.6 }}>{children}</div>;
}

function ScheduleCard({ schedule }) {
  if (!schedule.length) return null;
  const doneCount = schedule.filter((s) => s.status === "selesai").length;
  return (
    <div style={card}>
      <SectionHeader title="Jadwal Tes Fisik" sub={`${doneCount} dari ${schedule.length} tes selesai`} />
      <ol style={{ listStyle: "none", display: "flex", flexDirection: "column" }}>
        {schedule.map((s, i) => {
          const done = s.status === "selesai";
          const last = i === schedule.length - 1;
          return (
            <li key={s.test_round} style={{ display: "flex", gap: 12, fontFamily: FONT_BODY, fontSize: 14 }}>
              {/* Garis timeline */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <span style={{
                  width: 28, height: 28, borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 13, fontWeight: 800, background: done ? C.primary : C.surface, color: done ? C.onPrimary : C.textSub,
                  border: `1.5px solid ${done ? C.primary : C.line}`,
                }}>{done ? "✓" : s.test_round}</span>
                {!last && <span style={{ flex: 1, width: 2, minHeight: 14, background: done ? C.primary : C.line }} />}
              </div>
              <div style={{ flex: 1, minWidth: 0, paddingBottom: last ? 0 : 14, paddingTop: 3 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                  <span style={{ fontWeight: 700, color: C.text }}>{s.nama_tes}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: done ? C.primary : C.textSub, whiteSpace: "nowrap" }}>
                    {done ? "Selesai" : "Belum"}
                  </span>
                </div>
                <div style={{ fontSize: 13, color: C.textSub }}>
                  {[s.fase, s.tanggal_pelaksanaan ? fmtDate(s.tanggal_pelaksanaan) : s.target_waktu].filter(Boolean).join(" · ")}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

// Hanya menampilkan data satu pemain + rata-rata tim. Tidak ada ranking/perbandingan antar pemain.
// players = pemain aktif saja
export default function ProfilePage({ players = [], physical = [], schedule = [], benchmarks = [], loading, error }) {
  const [selectedId, setSelectedId] = useState("");
  const player = players.find((p) => String(p.player_id) === selectedId) || players[0];

  const activeIds = useMemo(() => new Set(players.map((p) => p.player_id)), [players]);
  const rounds = useMemo(() => (player ? playerRounds(physical, player.player_id) : []), [physical, player]);
  const { initial, latest } = initialAndLatest(rounds, benchmarks);

  if (loading) return <Loading />;

  const picker = players.length > 0 && (
    <div style={{ width: "min(100%, 300px)" }}>
      <label htmlFor="profile-player" style={fieldLabel}>Pemain</label>
      <select id="profile-player" value={player ? String(player.player_id) : ""}
        onChange={(e) => setSelectedId(e.target.value)} style={input}>
        {players.map((p) => <option key={p.player_id} value={String(p.player_id)}>{p.player_name}</option>)}
      </select>
    </div>
  );

  return (
    <PageShell>
      {error && <ErrorBanner error={error} />}

      <PageTitle kicker="Tes Fisik" title="Profil" accent="Pemain"
        sub="Skor fisik dan perkembangan satu pemain dibanding rata-rata tim." actions={picker} />

      {!player ? (
        <Empty>Belum ada pemain aktif.</Empty>
      ) : (
        <div className="stack">
          <ProfileHeader player={player} rounds={rounds} />

          {!benchmarks.length ? (
            <>
              <Empty>Tab <b>physical_benchmark</b> belum terbaca, jadi skor belum bisa dihitung.</Empty>
              <ScheduleCard schedule={schedule} />
            </>
          ) : !initial ? (
            <>
              <Empty>
                Belum ada hasil tes fisik untuk {player.player_name}. Hasil akan muncul di sini setelah pelatih
                mengisi tab <b>physical_test</b> di spreadsheet.
              </Empty>
              <ScheduleCard schedule={schedule} />
            </>
          ) : (
            <>
              <div className={schedule.length ? "grid-split" : undefined}>
                <PhysicalRadar benchmarks={benchmarks} schedule={schedule} initial={initial} latest={latest} />
                <ScheduleCard schedule={schedule} />
              </div>
              <DeltaCards rounds={rounds} benchmarks={benchmarks} schedule={schedule} />
              <TestTrendChart rounds={rounds} physical={physical} activeIds={activeIds}
                benchmarks={benchmarks} schedule={schedule} playerName={player.player_name} />
            </>
          )}
        </div>
      )}
    </PageShell>
  );
}
