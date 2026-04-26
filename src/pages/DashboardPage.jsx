import { useState } from "react";
import { useFilteredStats } from "../hooks/useFilteredStats";
import FilterBar      from "../components/dashboard/FilterBar";
import SummaryCards   from "../components/dashboard/SummaryCards";
import CourtHeatmap   from "../components/dashboard/CourtHeatmap";
import ZoneStatsPanel from "../components/dashboard/ZoneStatsPanel";
import ShootingChart  from "../components/dashboard/ShootingChart";
import RunningChart   from "../components/dashboard/RunningChart";
import RunningTable   from "../components/dashboard/RunningTable";

export default function DashboardPage({ players = [], shootingData = [], runningData = [], loading = false, error = null }) {
  const [filters, setFilters] = useState({
    selectedPlayer: "ALL",
    dateFrom: "2026-01-01",
    dateTo:   "2026-12-31",
  });

  const { filteredShooting, filteredRunning, zoneData, summary } = useFilteredStats({
    shootingData,
    runningData,
    ...filters,
  });

  if (loading) return (
    <div style={{ minHeight: "70vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, background: "#050d09", fontFamily: "'Barlow Condensed', sans-serif" }}>
      <div style={{ width: 40, height: 40, border: "3px solid #1f3329", borderTop: "3px solid #4ade80", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <span style={{ color: "#4ade80", fontWeight: 700, letterSpacing: "0.1em" }}>MEMUAT DATA...</span>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#050d09", color: "white", fontFamily: "'Barlow Condensed', sans-serif" }}>
      <div style={{ padding: "24px", maxWidth: 1200, margin: "0 auto" }}>

        {/* Error banner — muncul hanya kalau API gagal */}
        {error && (
          <div style={{ background: "#f9731622", border: "1px solid #f9731655", borderRadius: 8, padding: "10px 16px", marginBottom: 20, fontSize: 13, color: "#fb923c", display: "flex", gap: 10, alignItems: "center" }}>
            <span>⚠️</span>
            <span>Gagal konek Google Sheets — menampilkan data lokal. ({error})</span>
          </div>
        )}

        <FilterBar
          players={players}
          selectedPlayer={filters.selectedPlayer}
          dateFrom={filters.dateFrom}
          dateTo={filters.dateTo}
          sessionCount={summary.sessionCount}
          onChange={(key, val) => setFilters((prev) => ({ ...prev, [key]: val }))}
        />

        <SummaryCards summary={summary} />

        <h2 style={{ fontSize: 22, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.05em", margin: "8px 0 16px", color: "white" }}>
          🏀 <span style={{ color: "#4ade80" }}>Shooting</span> Heatmap
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20, marginBottom: 20 }}>
          <CourtHeatmap   zoneData={zoneData} />
          <ZoneStatsPanel zoneData={zoneData} />
        </div>
        <div style={{ marginBottom: 32 }}>
          <ShootingChart data={filteredShooting} />
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.05em", margin: "8px 0 16px", color: "white" }}>
          🏃 <span style={{ color: "#4ade80" }}>Running</span> Log
        </h2>
        <div style={{ marginBottom: 20 }}>
          <RunningChart data={filteredRunning} selectedPlayer={filters.selectedPlayer} />
        </div>
        <RunningTable data={filteredRunning} />

      </div>
    </div>
  );
}