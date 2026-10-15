import { useState, useMemo } from "react";
import { useFilteredStats } from "../hooks/useFilteredStats";
import FilterBar      from "../components/dashboard/FilterBar";
import SummaryCards   from "../components/dashboard/SummaryCards";
import CourtHeatmap   from "../components/dashboard/CourtHeatmap";
import ZoneStatsPanel from "../components/dashboard/ZoneStatsPanel";
import ShootingChart  from "../components/dashboard/ShootingChart";
import { PageShell, Loading, ErrorBanner, PageTitle } from "../components/layout/PageShell";

// players = pemain aktif saja
export default function DashboardPage({ players = [], shootingData = [], loading = false, error = null }) {
  const [filters, setFilters] = useState({
    selectedPlayer: "ALL",
    dateFrom: "2026-01-01",
    dateTo:   `${new Date().getFullYear() + 1}-12-31`,
  });

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

      <PageTitle kicker="Dashboard Latihan" title="Shooting" accent="Heatmap" />

      <FilterBar
        players={players}
        selectedPlayer={filters.selectedPlayer}
        dateFrom={filters.dateFrom}
        dateTo={filters.dateTo}
        sessionCount={summary.sessionCount}
        onChange={(key, val) => setFilters((prev) => ({ ...prev, [key]: val }))}
      />

      <SummaryCards summary={summary} />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))", gap: 16, marginBottom: 16 }}>
        <CourtHeatmap   zoneData={zoneData} />
        <ZoneStatsPanel zoneData={zoneData} />
      </div>
      <ShootingChart data={filteredShooting} />
    </PageShell>
  );
}
