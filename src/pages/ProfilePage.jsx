import { useState, useMemo } from "react";
import ProfileHeader  from "../components/profile/ProfileHeader";
import PhysicalRadar  from "../components/profile/PhysicalRadar";
import DeltaCards     from "../components/profile/DeltaCards";
import TestTrendChart from "../components/profile/TestTrendChart";
import { PageShell, Loading, ErrorBanner } from "../components/layout/PageShell";
import { playerRounds, initialAndLatest } from "../utils/physicalScore";
import { fmtDate } from "../utils/statHelpers";
import { C, FONT_BODY, card, sectionLabel, input, fieldLabel } from "../theme";

function Empty({ children }) {
  return <div style={{ ...card, color: C.textSub, fontFamily: FONT_BODY, fontSize: 14, lineHeight: 1.6 }}>{children}</div>;
}

function ScheduleCard({ schedule }) {
  if (!schedule.length) return null;
  return (
    <div style={card}>
      <div style={{ ...sectionLabel, marginBottom: 10 }}>Jadwal Tes Fisik</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {schedule.map((s) => {
          const done = s.status === "selesai";
          return (
            <div key={s.test_round} style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: FONT_BODY, fontSize: 14 }}>
              <span style={{
                width: 26, height: 26, borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 12, fontWeight: 800, background: done ? C.primary : C.surface, color: done ? C.onPrimary : C.textSub,
                border: `1px solid ${done ? C.primary : C.line}`,
              }}>{s.test_round}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, color: C.text }}>{s.nama_tes}</div>
                <div style={{ fontSize: 12, color: C.textSub }}>
                  {s.fase} · {s.tanggal_pelaksanaan ? fmtDate(s.tanggal_pelaksanaan) : s.target_waktu}
                </div>
              </div>
              <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: done ? C.primary : C.textSub }}>
                {done ? "Selesai" : "Belum"}
              </span>
            </div>
          );
        })}
      </div>
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

  return (
    <PageShell maxWidth={900}>
      {error && <ErrorBanner error={error} />}

      <div style={{ marginBottom: 14 }}>
        <label htmlFor="profile-player" style={fieldLabel}>Pemain</label>
        <select id="profile-player" value={player ? String(player.player_id) : ""}
          onChange={(e) => setSelectedId(e.target.value)} style={{ ...input, maxWidth: 320 }}>
          {players.map((p) => <option key={p.player_id} value={String(p.player_id)}>{p.player_name}</option>)}
        </select>
      </div>

      {!player ? (
        <Empty>Belum ada pemain aktif.</Empty>
      ) : (
        <>
          <ProfileHeader player={player} rounds={rounds} />

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {!benchmarks.length ? (
              <Empty>Tab <b>physical_benchmark</b> belum terbaca, jadi skor belum bisa dihitung.</Empty>
            ) : !initial ? (
              <Empty>
                Belum ada hasil tes fisik untuk {player.player_name}. Hasil akan muncul di sini setelah pelatih
                mengisi tab <b>physical_test</b> di spreadsheet.
              </Empty>
            ) : (
              <>
                <PhysicalRadar benchmarks={benchmarks} schedule={schedule} initial={initial} latest={latest} />
                <DeltaCards rounds={rounds} benchmarks={benchmarks} schedule={schedule} />
                <TestTrendChart rounds={rounds} physical={physical} activeIds={activeIds}
                  benchmarks={benchmarks} schedule={schedule} playerName={player.player_name} />
              </>
            )}
            <ScheduleCard schedule={schedule} />
          </div>
        </>
      )}
    </PageShell>
  );
}
