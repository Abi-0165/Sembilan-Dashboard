import { useState, useMemo } from "react";
import { useFilteredStats } from "../hooks/useFilteredStats";
import FilterBar      from "../components/dashboard/FilterBar";
import SummaryCards   from "../components/dashboard/SummaryCards";
import CourtHeatmap   from "../components/dashboard/CourtHeatmap";
import ZoneStatsPanel from "../components/dashboard/ZoneStatsPanel";
import ShootingChart  from "../components/dashboard/ShootingChart";
import { PageShell, Loading, ErrorBanner, PageTitle } from "../components/layout/PageShell";

// Tanggal kosong = semua tanggal
const DEFAULT_FILTERS = { selectedPlayer: "ALL", dateFrom: "", dateTo: "" };

// players = pemain aktif saja
export default function DashboardPage({ players = [], shootingData = [], loading = false, error = null }) {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  const activeIds = useMemo(() => new Set(players.map((p) => p.player_id)), [players]);

  const { filteredShooting, zoneData, summary } = useFilteredStats({
    shootingData,
    activeIds,
    ...filters,
  });

  if (loading) return <Loading />;

  return (
    <PageShell>
      {error && <ErrorBanner error={error} />}

      <PageTitle
        kicker="Dashboard Latihan"
        title="Shooting"
        accent="Heatmap"
        sub="Persentase tembakan masuk per zona dari sesi latihan. Pilih pemain dan rentang tanggal untuk menyaring."
      />

      <div className="stack">
        <FilterBar
          players={players}
          {...filters}
          onChange={(patch) => setFilters((prev) => ({ ...prev, ...patch }))}
          onReset={() => setFilters(DEFAULT_FILTERS)}
          isDefault={filters.selectedPlayer === "ALL" && !filters.dateFrom && !filters.dateTo}
        />

        <SummaryCards summary={summary} />

        <div className="grid-split">
          <CourtHeatmap   zoneData={zoneData} />
          <ZoneStatsPanel zoneData={zoneData} />
        </div>

        <ShootingChart data={filteredShooting} />
      </div>
    </PageShell>
  );
}
